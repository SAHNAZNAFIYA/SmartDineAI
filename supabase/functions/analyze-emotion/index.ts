import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

/* =========================================================
   CORS
========================================================= */

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

/* =========================================================
   UTILITIES
========================================================= */

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;
  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function dedupeRestaurants(list: any[]) {
  const seen = new Set<string>();
  return list.filter((r) => {
    const key = `${r.name?.toLowerCase()}-${r.lat?.toFixed(4)}-${r.lon?.toFixed(4)}`;
    if (!r.name || !isFinite(r.lat) || !isFinite(r.lon)) return false;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildMapsUrl(name: string, city: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${name} ${city}`
  )}`;
}

/* =========================================================
   DATA SOURCES
========================================================= */

/* ---------- 1. FOURSQUARE ---------- */
async function fetchFSQ(lat: number, lon: number) {
  const key = Deno.env.get("FSQ_API_KEY");
  if (!key) return [];

  try {
    const res = await fetch(
      `https://api.foursquare.com/v3/places/search?ll=${lat},${lon}&radius=5000&categories=13065&limit=25`,
      {
        headers: {
          Authorization: key,
          Accept: "application/json",
        },
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return (data.results || []).map((p: any) => ({
      name: p.name,
      lat: p.geocodes?.main?.latitude,
      lon: p.geocodes?.main?.longitude,
      city: p.location?.locality || "",
      categories: p.categories?.map((c: any) => c.name) || [],
      source: "foursquare",
    }));
  } catch {
    return [];
  }
}

/* ---------- 2. OPENTRIPMAP ---------- */
async function fetchOTM(lat: number, lon: number) {
  const key = Deno.env.get("OPENTRIPMAP_API_KEY");
  if (!key) return [];

  try {
    const res = await fetch(
      `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${lon}&lat=${lat}&kinds=restaurants&limit=20&apikey=${key}`
    );

    if (!res.ok) return [];
    const data = await res.json();

    return (data.features || []).map((f: any) => ({
      name: f.properties?.name,
      lat: f.geometry?.coordinates?.[1],
      lon: f.geometry?.coordinates?.[0],
      city: "",
      categories: ["Restaurant"],
      source: "opentripmap",
    }));
  } catch {
    return [];
  }
}

/* ---------- 3. OVERPASS ---------- */
async function fetchOverpass(lat: number, lon: number) {
  const query = `
  [out:json][timeout:25];
  (
    node["amenity"="restaurant"](around:4000,${lat},${lon});
    way["amenity"="restaurant"](around:4000,${lat},${lon});
  );
  out center 20;
  `;

  try {
    const res = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    });
    if (!res.ok) return [];

    const json = await res.json();
    return (json.elements || []).map((e: any) => ({
      name: e.tags?.name,
      lat: e.lat || e.center?.lat,
      lon: e.lon || e.center?.lon,
      city: e.tags?.["addr:city"] || "",
      categories: e.tags?.cuisine?.split(";") || [],
      source: "overpass",
    }));
  } catch {
    return [];
  }
}

/* ---------- 4. LOCAL/FALLBACK DATA ---------- */
// Note: Local JSON import removed - use API sources instead

function fetchLocal(_lat: number, _lon: number): any[] {
  // Return empty array - we rely on FSQ, OTM, and Overpass
  return [];
}

/* =========================================================
   SERVER
========================================================= */

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { text, location } = await req.json();

    if (!text || !location?.lat || !location?.lon) {
      return new Response(
        JSON.stringify({ error: "Text & location required" }),
        { status: 400, headers: corsHeaders }
      );
    }

    /* === Fetch ALL sources in parallel === */
    const [fsq, otm, overpass] = await Promise.all([
      fetchFSQ(location.lat, location.lon),
      fetchOTM(location.lat, location.lon),
      fetchOverpass(location.lat, location.lon),
    ]);

    const local = fetchLocal(location.lat, location.lon);

    let restaurants = dedupeRestaurants([
      ...fsq,
      ...local,
      ...otm,
      ...overpass,
    ]);

    restaurants = restaurants
      .map((r) => ({
        ...r,
        distance: calculateDistance(location.lat, location.lon, r.lat, r.lon),
        maps_url: buildMapsUrl(r.name, r.city || location.city),
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 20);

    /* === Send REAL restaurants to AI === */
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    const aiRes = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content:
                "You are an empathetic food coach. Respond ONLY with JSON.",
            },
            {
              role: "user",
              content: `
User says: "${text}"

Nearby restaurants:
${restaurants.map((r, i) => `${i + 1}. ${r.name}`).join("\n")}

Recommend 5 restaurants with dishes.
`,
            },
          ],
        }),
      }
    );

    const ai = await aiRes.json();
    const content = ai.choices?.[0]?.message?.content || "{}";
    const parsed = JSON.parse(content.replace(/```json|```/g, ""));

    parsed.recommended_restaurants = parsed.recommended_restaurants?.map(
      (r: any) => {
        const real = restaurants.find(
          (x) => x.name.toLowerCase() === r.name.toLowerCase()
        );
        return real
          ? { ...r, ...real }
          : null;
      }
    ).filter(Boolean);

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: "Server error", details: String(e) }),
      { status: 500, headers: corsHeaders }
    );
  }
});
