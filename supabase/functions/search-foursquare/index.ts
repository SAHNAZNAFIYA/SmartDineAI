import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lat, lon, cuisines, limit = 20 } = await req.json();
    
    console.log('📍 Foursquare search request:', { lat, lon, cuisines, limit });
    
    const FSQ_API_KEY = Deno.env.get('FSQ_API_KEY');
    
    if (!FSQ_API_KEY) {
      console.error('❌ FSQ_API_KEY not configured!');
      return new Response(JSON.stringify({ 
        restaurants: [], 
        source: 'none',
        error: 'FSQ_API_KEY not configured' 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    console.log('✅ FSQ_API_KEY is configured');

    // Build query for Foursquare
    const categories = '13065'; // Restaurant category ID
    const cuisineQuery = cuisines && cuisines.length > 0 ? cuisines.join(' ') : 'restaurant';
    
    const url = new URL('https://api.foursquare.com/v3/places/search');
    url.searchParams.set('ll', `${lat},${lon}`);
    url.searchParams.set('query', cuisineQuery);
    url.searchParams.set('categories', categories);
    url.searchParams.set('limit', String(limit));
    url.searchParams.set('radius', '5000'); // 5km radius
    url.searchParams.set('sort', 'RELEVANCE');

    console.log('Foursquare API URL:', url.toString());

    const response = await fetch(url.toString(), {
      headers: {
        'Authorization': FSQ_API_KEY,
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Foursquare API error:', response.status, errorText);
      return new Response(JSON.stringify({ 
        restaurants: [], 
        source: 'error',
        status: response.status,
        error: errorText
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('✅ Foursquare returned', data.results?.length || 0, 'places');

    const restaurants = (data.results || []).map((place: any) => {
      const categories = place.categories?.map((c: any) => c.name) || [];
      const priceLevel = place.price ? '₹'.repeat(place.price) : '₹₹';
      
      return {
        name: place.name,
        address: place.location?.formatted_address || place.location?.address || 'Address not available',
        lat: place.geocodes?.main?.latitude || lat,
        lon: place.geocodes?.main?.longitude || lon,
        rating: place.rating ? place.rating / 2 : 4.0, // FSQ uses 0-10, normalize to 0-5
        price_level: priceLevel,
        cuisines: categories,
        distance_meters: place.distance || 0,
        source: 'foursquare',
      };
    });

    return new Response(JSON.stringify({ restaurants, source: 'foursquare' }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in search-foursquare:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ restaurants: [], source: 'error', error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
