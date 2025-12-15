import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, lat, lon, radius = 5000 } = await req.json();
    
    console.log("Searching restaurants:", { query, lat, lon, radius });

    if (!query || !lat || !lon) {
      return new Response(
        JSON.stringify({ error: "Missing required parameters: query, lat, lon" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Try OpenTripMap first
    const OPENTRIPMAP_KEY = Deno.env.get("OPENTRIPMAP_KEY");
    let restaurants: any[] = [];
    
    if (OPENTRIPMAP_KEY) {
      try {
        restaurants = await searchOpenTripMap(query, lat, lon, radius, OPENTRIPMAP_KEY);
        console.log(`OpenTripMap found ${restaurants.length} restaurants`);
      } catch (otmError) {
        console.error("OpenTripMap error:", otmError);
      }
    }

    // Fallback to Nominatim if OpenTripMap fails or returns no results
    if (restaurants.length === 0) {
      try {
        restaurants = await searchNominatim(query, lat, lon);
        console.log(`Nominatim found ${restaurants.length} restaurants`);
      } catch (nomError) {
        console.error("Nominatim error:", nomError);
      }
    }

    // Final fallback to sample data
    if (restaurants.length === 0) {
      console.log("Using sample restaurant data");
      return new Response(
        JSON.stringify({
          restaurants: getSampleRestaurants(query, lat, lon),
          source: "sample",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Limit to 10 restaurants
    const limitedRestaurants = restaurants.slice(0, 10);

    return new Response(
      JSON.stringify({ restaurants: limitedRestaurants, source: OPENTRIPMAP_KEY ? "opentripmap" : "nominatim" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in search-restaurants:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || "An error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function searchOpenTripMap(query: string, lat: number, lon: number, radius: number, apiKey: string): Promise<any[]> {
  // OpenTripMap radius search for restaurants
  const radiusUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=${radius}&lon=${lon}&lat=${lat}&kinds=cafes,restaurants,fast_food&rate=3&limit=15&apikey=${apiKey}`;
  
  const response = await fetch(radiusUrl);
  
  if (!response.ok) {
    throw new Error(`OpenTripMap error: ${response.status}`);
  }

  const data = await response.json();
  
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  // Get detailed info for each place
  const restaurants = await Promise.all(
    data.slice(0, 10).map(async (place: any) => {
      try {
        // Fetch detailed info
        const detailUrl = `https://api.opentripmap.com/0.1/en/places/xid/${place.xid}?apikey=${apiKey}`;
        const detailResponse = await fetch(detailUrl);
        const details = detailResponse.ok ? await detailResponse.json() : {};
        
        const placeLat = place.point?.lat || lat;
        const placeLon = place.point?.lon || lon;
        const distance = calculateDistance(lat, lon, placeLat, placeLon);
        
        return {
          name: details.name || place.name || "Restaurant",
          rating: place.rate ? Math.min(5, place.rate + 1) : null,
          price_level: null,
          address: details.address?.road 
            ? `${details.address.road}, ${details.address.city || details.address.town || ""}`
            : `Near ${lat.toFixed(4)}, ${lon.toFixed(4)}`,
          distance_meters: Math.round(distance),
          lat: placeLat,
          lon: placeLon,
          maps_url: `https://www.google.com/maps/dir/?api=1&destination=${placeLat},${placeLon}`,
          source: "opentripmap",
          cuisine: details.kinds?.split(",")[0]?.replace(/_/g, " ") || "Restaurant",
        };
      } catch (e) {
        return null;
      }
    })
  );

  return restaurants.filter(r => r !== null);
}

async function searchNominatim(query: string, lat: number, lon: number): Promise<any[]> {
  const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
    query + " restaurant"
  )}&format=json&limit=15&lat=${lat}&lon=${lon}&bounded=1&viewbox=${lon - 0.1},${lat + 0.1},${lon + 0.1},${lat - 0.1}`;

  const response = await fetch(searchUrl, {
    headers: {
      "User-Agent": "SmartDineAI/1.0 (https://smartdine.ai)",
    },
  });

  if (!response.ok) {
    throw new Error(`Nominatim error: ${response.status}`);
  }

  const results = await response.json();
  
  return results.map((place: any) => {
    const placeLat = parseFloat(place.lat);
    const placeLon = parseFloat(place.lon);
    const distance = calculateDistance(lat, lon, placeLat, placeLon);
    
    return {
      name: place.display_name.split(",")[0],
      rating: null,
      price_level: null,
      address: place.display_name,
      distance_meters: Math.round(distance),
      lat: placeLat,
      lon: placeLon,
      maps_url: `https://www.google.com/maps/dir/?api=1&destination=${placeLat},${placeLon}`,
      source: "nominatim",
    };
  });
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371e3; // Earth's radius in meters
  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

function getSampleRestaurants(query: string, lat: number, lon: number) {
  const sampleNames = [
    `${query} Kitchen`,
    `The ${query} Place`,
    `${query} Express`,
    `Royal ${query}`,
    `Fresh ${query} Cafe`,
    `${query} Delight`,
    `${query} Paradise`,
    `The ${query} House`,
    `${query} Corner`,
    `Authentic ${query}`,
  ];

  return sampleNames.map((name, index) => {
    const offsetLat = lat + (Math.random() - 0.5) * 0.02;
    const offsetLon = lon + (Math.random() - 0.5) * 0.02;
    const distance = 300 + index * 200 + Math.floor(Math.random() * 100);
    
    return {
      name,
      rating: (4 + Math.random() * 0.8).toFixed(1),
      price_level: Math.floor(Math.random() * 2) + 2,
      address: `${100 + index * 50} Main Street, Near City Center`,
      distance_meters: distance,
      lat: offsetLat,
      lon: offsetLon,
      maps_url: `https://www.google.com/maps/dir/?api=1&destination=${offsetLat},${offsetLon}`,
      source: "sample",
    };
  });
}
