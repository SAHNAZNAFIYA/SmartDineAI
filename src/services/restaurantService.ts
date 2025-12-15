import { MoodType } from "@/types/smartdine";
import { supabase } from "@/integrations/supabase/client";

export interface NormalizedRestaurant {
  id: string;
  name: string;
  city: string;
  normalizedCity: string;
  cuisines: string[];
  rating: number | null;
  avgCost: number;
  priceLevel: string;
  address: string;
  lat: number;
  lon: number;
  distance?: number;
  source: 'kaggle' | 'foursquare' | 'opentripmap';
  mapsUrl?: string;
  dishes?: { name: string; description: string }[];
  moodBoost?: string;
  nutritionInsight?: string;
  energyBadge?: string;
}

// Kaggle JSON data
let kaggleData: NormalizedRestaurant[] = [];
let kaggleLoaded = false;

const normalizeCity = (city: string): string => {
  return city
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/[\s,]+/)
    .filter(Boolean)
    .sort()
    .join(' ');
};

const cityMatches = (restaurantCity: string, userCity: string): boolean => {
  const normalizedRestaurant = normalizeCity(restaurantCity);
  const normalizedUser = normalizeCity(userCity);
  
  const restaurantTokens = normalizedRestaurant.split(' ');
  const userTokens = normalizedUser.split(' ');
  
  return restaurantTokens.some(token => 
    userTokens.some(userToken => 
      token.includes(userToken) || userToken.includes(token)
    )
  );
};

const cuisineMatches = (restaurantCuisines: string[], selectedCuisines: string[]): boolean => {
  if (selectedCuisines.length === 0) return true;
  
  const normalizedRestaurantCuisines = restaurantCuisines.map(c => c.toLowerCase().trim());
  const normalizedSelected = selectedCuisines.map(c => c.toLowerCase().trim());
  
  return normalizedSelected.some(selected => 
    normalizedRestaurantCuisines.some(restaurant => 
      restaurant.includes(selected) || selected.includes(restaurant)
    )
  );
};

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3;
  const φ1 = lat1 * Math.PI / 180;
  const φ2 = lat2 * Math.PI / 180;
  const Δφ = (lat2 - lat1) * Math.PI / 180;
  const Δλ = (lon2 - lon1) * Math.PI / 180;

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
};

const generateMapsUrl = (restaurant: NormalizedRestaurant, userCity: string, userLat: number, userLon: number): string => {
  const destination = encodeURIComponent(`${restaurant.name} ${restaurant.cuisines[0] || ''} restaurant ${userCity}`);
  const origin = encodeURIComponent(`${userLat},${userLon}`);
  return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
};

// ============================================
// CUISINE-SPECIFIC DISH DATABASE
// Each cuisine has unique, authentic dishes
// ============================================

const CUISINE_DISHES: Record<string, { name: string; description: string }[]> = {
  indian: [
    { name: 'Butter Chicken', description: 'Creamy tomato curry with tender chicken' },
    { name: 'Dal Makhani', description: 'Slow-cooked black lentils in cream' },
    { name: 'Paneer Tikka', description: 'Grilled cottage cheese with aromatic spices' },
    { name: 'Biryani', description: 'Fragrant layered rice with meat and spices' },
    { name: 'Chole Bhature', description: 'Spiced chickpeas with fluffy fried bread' },
    { name: 'Masala Dosa', description: 'Crispy crepe with spiced potato filling' },
    { name: 'Palak Paneer', description: 'Cottage cheese in spinach gravy' },
    { name: 'Tandoori Chicken', description: 'Smoky clay oven roasted chicken' },
  ],
  chinese: [
    { name: 'Kung Pao Chicken', description: 'Spicy stir-fried chicken with peanuts' },
    { name: 'Dim Sum', description: 'Assorted steamed dumplings' },
    { name: 'Mapo Tofu', description: 'Silky tofu in spicy bean sauce' },
    { name: 'Sweet & Sour Pork', description: 'Crispy pork in tangy glaze' },
    { name: 'Hot Pot', description: 'Interactive simmering broth experience' },
    { name: 'Peking Duck', description: 'Crispy duck with pancakes and hoisin' },
    { name: 'Dan Dan Noodles', description: 'Spicy Sichuan sesame noodles' },
    { name: 'Spring Rolls', description: 'Crispy vegetable-filled rolls' },
  ],
  japanese: [
    { name: 'Sushi Omakase', description: 'Chef\'s selection of premium nigiri' },
    { name: 'Tonkotsu Ramen', description: 'Rich pork bone broth noodles' },
    { name: 'Tempura', description: 'Light, crispy battered vegetables and seafood' },
    { name: 'Wagyu Steak', description: 'Premium marbled beef, grilled to perfection' },
    { name: 'Sashimi Platter', description: 'Fresh sliced raw fish selection' },
    { name: 'Udon', description: 'Thick wheat noodles in savory broth' },
    { name: 'Okonomiyaki', description: 'Savory Japanese pancake' },
    { name: 'Gyoza', description: 'Pan-fried pork dumplings' },
  ],
  italian: [
    { name: 'Margherita Pizza', description: 'Classic tomato, mozzarella, fresh basil' },
    { name: 'Carbonara', description: 'Creamy egg and pancetta pasta' },
    { name: 'Osso Buco', description: 'Braised veal shanks in white wine' },
    { name: 'Risotto ai Funghi', description: 'Creamy rice with wild mushrooms' },
    { name: 'Lasagna', description: 'Layered pasta with meat ragù and béchamel' },
    { name: 'Tiramisu', description: 'Coffee-soaked ladyfingers with mascarpone' },
    { name: 'Gnocchi', description: 'Pillowy potato pasta with sage butter' },
    { name: 'Bruschetta', description: 'Toasted bread with fresh tomatoes' },
  ],
  mexican: [
    { name: 'Tacos al Pastor', description: 'Marinated pork with pineapple' },
    { name: 'Mole Poblano', description: 'Complex chocolate chili sauce' },
    { name: 'Carnitas', description: 'Slow-braised pulled pork' },
    { name: 'Enchiladas Suizas', description: 'Chicken enchiladas in creamy sauce' },
    { name: 'Guacamole', description: 'Fresh avocado dip with lime and cilantro' },
    { name: 'Churros', description: 'Fried dough with chocolate sauce' },
    { name: 'Pozole', description: 'Traditional hominy soup' },
    { name: 'Quesadillas', description: 'Grilled tortillas with melted cheese' },
  ],
  thai: [
    { name: 'Pad Thai', description: 'Stir-fried rice noodles with tamarind' },
    { name: 'Green Curry', description: 'Coconut curry with Thai basil' },
    { name: 'Tom Yum', description: 'Spicy sour soup with lemongrass' },
    { name: 'Massaman Curry', description: 'Rich peanut curry with potatoes' },
    { name: 'Mango Sticky Rice', description: 'Sweet coconut rice with fresh mango' },
    { name: 'Som Tum', description: 'Spicy green papaya salad' },
    { name: 'Khao Soi', description: 'Northern Thai coconut noodle soup' },
    { name: 'Satay', description: 'Grilled skewers with peanut sauce' },
  ],
  mediterranean: [
    { name: 'Falafel Platter', description: 'Crispy chickpea fritters with tahini' },
    { name: 'Shawarma', description: 'Spiced meat carved from vertical spit' },
    { name: 'Hummus', description: 'Creamy chickpea dip with olive oil' },
    { name: 'Greek Salad', description: 'Fresh vegetables with feta cheese' },
    { name: 'Moussaka', description: 'Layered eggplant and meat casserole' },
    { name: 'Souvlaki', description: 'Grilled meat skewers with tzatziki' },
    { name: 'Tabbouleh', description: 'Fresh parsley and bulgur salad' },
    { name: 'Lamb Kofta', description: 'Spiced ground lamb kebabs' },
  ],
  american: [
    { name: 'Smash Burger', description: 'Crispy-edged beef patty with cheese' },
    { name: 'BBQ Ribs', description: 'Slow-smoked pork ribs with sauce' },
    { name: 'Mac & Cheese', description: 'Creamy baked pasta with cheddar' },
    { name: 'Buffalo Wings', description: 'Crispy wings in spicy butter sauce' },
    { name: 'Philly Cheesesteak', description: 'Sliced beef with melted cheese' },
    { name: 'Lobster Roll', description: 'Maine lobster in buttered bun' },
    { name: 'Clam Chowder', description: 'Creamy New England style soup' },
    { name: 'Apple Pie', description: 'Classic cinnamon apple dessert' },
  ],
  french: [
    { name: 'Coq au Vin', description: 'Braised chicken in red wine' },
    { name: 'Beef Bourguignon', description: 'Slow-cooked beef stew' },
    { name: 'Croissant', description: 'Buttery flaky pastry' },
    { name: 'Crème Brûlée', description: 'Vanilla custard with caramelized top' },
    { name: 'Duck Confit', description: 'Slow-cooked duck leg in its fat' },
    { name: 'French Onion Soup', description: 'Caramelized onion soup with gruyère' },
    { name: 'Ratatouille', description: 'Provençal vegetable medley' },
    { name: 'Escargot', description: 'Garlic butter baked snails' },
  ],
  korean: [
    { name: 'Korean BBQ', description: 'Grilled meats at your table' },
    { name: 'Bibimbap', description: 'Mixed rice with vegetables and egg' },
    { name: 'Kimchi Jjigae', description: 'Spicy fermented cabbage stew' },
    { name: 'Bulgogi', description: 'Marinated sliced beef' },
    { name: 'Japchae', description: 'Sweet potato glass noodles' },
    { name: 'Tteokbokki', description: 'Spicy rice cakes' },
    { name: 'Samgyeopsal', description: 'Grilled pork belly' },
    { name: 'Fried Chicken', description: 'Double-fried crispy chicken' },
  ],
  vietnamese: [
    { name: 'Pho', description: 'Aromatic beef or chicken noodle soup' },
    { name: 'Banh Mi', description: 'Crispy baguette with pickled vegetables' },
    { name: 'Spring Rolls', description: 'Fresh rice paper rolls with herbs' },
    { name: 'Bun Cha', description: 'Grilled pork with vermicelli' },
    { name: 'Com Tam', description: 'Broken rice with grilled pork' },
    { name: 'Ca Kho To', description: 'Caramelized fish in clay pot' },
  ],
  cafe: [
    { name: 'Avocado Toast', description: 'Smashed avocado on artisan bread' },
    { name: 'Eggs Benedict', description: 'Poached eggs with hollandaise' },
    { name: 'Pancake Stack', description: 'Fluffy pancakes with maple syrup' },
    { name: 'Acai Bowl', description: 'Superfood smoothie bowl with toppings' },
    { name: 'Club Sandwich', description: 'Triple-decker with chicken and bacon' },
  ],
  bakery: [
    { name: 'Sourdough Bread', description: 'Naturally leavened artisan loaf' },
    { name: 'Cinnamon Roll', description: 'Swirled pastry with cream cheese icing' },
    { name: 'Chocolate Croissant', description: 'Flaky pastry with dark chocolate' },
    { name: 'Fruit Tart', description: 'Buttery crust with fresh fruits' },
  ],
};

// Fallback for cuisines not in our database
const FALLBACK_DISHES = [
  { name: "Chef's Signature", description: 'House specialty prepared with care' },
  { name: 'Seasonal Special', description: 'Fresh ingredients, creative preparation' },
  { name: 'Comfort Platter', description: 'Satisfying classics done right' },
];

/**
 * DETERMINISTIC dish selection: same restaurant always gets same dish
 * Uses hash of restaurant name to pick from cuisine-appropriate dishes
 */
export function generateDishesForCuisine(cuisines: string[], restaurantName: string = ''): { name: string; description: string }[] {
  // Try to find matching cuisine dishes
  for (const cuisine of cuisines) {
    const key = cuisine.toLowerCase().replace(/[^\w]/g, '');
    
    for (const [cuisineKey, dishes] of Object.entries(CUISINE_DISHES)) {
      if (key.includes(cuisineKey) || cuisineKey.includes(key)) {
        // DETERMINISTIC: Use hash of restaurant name to pick dish
        const hash = [...restaurantName].reduce((acc, char) => acc + char.charCodeAt(0), 0);
        const dishIndex = hash % dishes.length;
        const secondDishIndex = (hash + 7) % dishes.length; // Offset for second dish
        
        // Return 1-2 dishes deterministically
        if (dishes.length > 1 && hash % 3 === 0) {
          return [dishes[dishIndex], dishes[secondDishIndex !== dishIndex ? secondDishIndex : (dishIndex + 1) % dishes.length]];
        }
        return [dishes[dishIndex]];
      }
    }
  }
  
  // Fallback with deterministic selection
  const hash = [...restaurantName].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return [FALLBACK_DISHES[hash % FALLBACK_DISHES.length]];
}

// ============================================
// MOOD-BASED CONTENT
// ============================================

const MOOD_BOOSTS: Record<MoodType, string[]> = {
  happy: ['Perfect for celebrating!', 'Keep the joy flowing!', 'Match your happy vibes!'],
  calm: ['Peaceful ambiance', 'Relaxing atmosphere', 'Zen dining experience'],
  stressed: ['Stress-melting comfort', 'Unwind here', 'Calm your mind'],
  tired: ['Energy-boosting menu', 'Revitalizing options', 'Recharge station'],
  energetic: ['Fuel your fire!', 'Power-up spot', 'High-energy vibes'],
  pms: ['Comfort & care', 'Iron-rich options', 'Self-care dining'],
  anxious: ['Calming atmosphere', 'Soothing choices', 'Peace on a plate'],
  sad: ['Mood-lifting treats', 'Comfort food therapy', 'Feel-good flavors'],
};

const NUTRITION_INSIGHTS: Record<MoodType, string[]> = {
  tired: ['Rich in iron & B12', 'Complex carbs for sustained energy', 'Protein-packed'],
  stressed: ['High in magnesium', 'Omega-3 rich', 'Vitamin B complex'],
  sad: ['Tryptophan boost', 'Vitamin D support', 'Serotonin-friendly'],
  happy: ['Balanced nutrition', 'Vibrant ingredients', 'Feel-good foods'],
  anxious: ['Gut-friendly probiotics', 'Anti-inflammatory', 'Calming herbs'],
  calm: ['Light & balanced', 'Gentle on digestion', 'Mindful portions'],
  energetic: ['High protein', 'Performance fuel', 'Muscle-supporting'],
  pms: ['Iron-rich', 'Magnesium boost', 'Hormone-balancing'],
};

const ENERGY_BADGES: Record<MoodType, string[]> = {
  tired: ['⚡ Energy Boost', '🔋 Recharge', '💪 Power Up'],
  stressed: ['🧘 Calming', '💆 De-stress', '🌿 Soothing'],
  sad: ['🌈 Mood Lift', '💙 Comfort', '🤗 Warming'],
  happy: ['🌟 Celebration', '✨ Joyful', '🎉 Festive'],
  anxious: ['🌊 Calming', '🕊️ Peaceful', '🍃 Gentle'],
  calm: ['☯️ Balanced', '🧘 Zen', '🌸 Tranquil'],
  energetic: ['🔥 Power', '⚡ Fuel', '🚀 Momentum'],
  pms: ['🌸 Care', '💜 Comfort', '🍫 Indulgent'],
};

function getMoodBoost(mood: MoodType): string {
  const boosts = MOOD_BOOSTS[mood] || MOOD_BOOSTS.happy;
  return boosts[Math.floor(Math.random() * boosts.length)];
}

function getNutritionInsight(mood: MoodType): string {
  const insights = NUTRITION_INSIGHTS[mood] || NUTRITION_INSIGHTS.happy;
  return insights[Math.floor(Math.random() * insights.length)];
}

function getEnergyBadge(mood: MoodType): string {
  const badges = ENERGY_BADGES[mood] || ENERGY_BADGES.happy;
  return badges[Math.floor(Math.random() * badges.length)];
}

// ============================================
// DATA LOADING
// ============================================

export const loadKaggleData = async (): Promise<void> => {
  if (kaggleLoaded) return;
  
  try {
    const response = await fetch('/data/kaggle_restaurants.json');
    const rawData = await response.json();
    
    kaggleData = rawData.map((item: any, index: number) => {
      const priceRange = parseInt(item['Price range']) || 2;
      const priceLevel = priceRange <= 1 ? '₹' : priceRange === 2 ? '₹₹' : priceRange === 3 ? '₹₹₹' : '₹₹₹₹';
      
      return {
        id: `kaggle_${item['Restaurant ID'] || index}`,
        name: item['Restaurant Name'] || 'Unknown Restaurant',
        city: item['City'] || '',
        normalizedCity: normalizeCity(item['City'] || ''),
        cuisines: (item['Cuisines'] || '').split(',').map((c: string) => c.trim()).filter(Boolean),
        rating: parseFloat(item['Aggregate rating']) || null,
        avgCost: parseInt(item['Average Cost for two']) || 500,
        priceLevel,
        address: item['Address'] || item['Locality'] || '',
        lat: parseFloat(item['Latitude']) || 0,
        lon: parseFloat(item['Longitude']) || 0,
        source: 'kaggle' as const,
      };
    }).filter((r: NormalizedRestaurant) => r.lat !== 0 && r.lon !== 0);
    
    kaggleLoaded = true;
    console.log(`Loaded ${kaggleData.length} restaurants from Kaggle dataset`);
  } catch (error) {
    console.error('Error loading Kaggle data:', error);
    kaggleData = [];
  }
};

// ============================================
// MAIN RESTAURANT FETCHING
// ============================================

export const getRestaurants = async (params: {
  lat: number;
  lon: number;
  city: string;
  cuisines: string[];
  mood?: MoodType;
  budget?: number;
}): Promise<NormalizedRestaurant[]> => {
  const { lat, lon, city, cuisines, mood = 'happy' } = params;
  
  // Load Kaggle data if not loaded
  await loadKaggleData();
  
  // Get from all sources in parallel
  const [foursquareResult, kaggleResults] = await Promise.all([
    fetchFoursquareRestaurants(lat, lon, cuisines),
    getKaggleRestaurants(lat, lon, city, cuisines),
  ]);
  
  // Merge all restaurants
  const allRestaurants = [...foursquareResult, ...kaggleResults];
  
  // Deduplicate by name
  const seen = new Set<string>();
  const unique: NormalizedRestaurant[] = [];
  
  for (const r of allRestaurants) {
    const key = r.name.toLowerCase().replace(/[^\w]/g, '');
    if (!seen.has(key)) {
      seen.add(key);
      
      // Add DETERMINISTIC dishes based on cuisine + restaurant name
      const dishes = generateDishesForCuisine(r.cuisines, r.name);
      const mapsUrl = generateMapsUrl(r, city, lat, lon);
      
      unique.push({
        ...r,
        dishes,
        moodBoost: getMoodBoost(mood),
        nutritionInsight: getNutritionInsight(mood),
        energyBadge: getEnergyBadge(mood),
        mapsUrl,
        distance: r.distance || calculateDistance(lat, lon, r.lat, r.lon),
      });
    }
  }
  
  // Sort by rating then distance
  const sorted = unique
    .sort((a, b) => {
      const ratingDiff = (b.rating || 0) - (a.rating || 0);
      if (ratingDiff !== 0) return ratingDiff;
      return (a.distance || Infinity) - (b.distance || Infinity);
    })
  .slice(0, 20);

  // GUARANTEE: Always return restaurants
  // If we got real data, return it
  if (sorted.length > 0) {
    console.log(`Returning ${sorted.length} real restaurants`);
    return sorted;
  }

  // Only use fallback if absolutely no data
  console.warn('No real restaurants found, using fallback data');
  return generateFallbackRestaurants(city, lat, lon, cuisines, mood);
};

// Generate fallback restaurants ONLY when no real data available
function generateFallbackRestaurants(
  city: string, 
  lat: number, 
  lon: number, 
  cuisines: string[], 
  mood: MoodType
): NormalizedRestaurant[] {
  console.warn('⚠️ Using fallback restaurants - no real data from APIs');
  
  const sampleCuisines = cuisines.length > 0 ? cuisines : ['Indian', 'Chinese', 'Italian', 'Thai', 'Mexican'];
  
  return sampleCuisines.slice(0, 5).map((cuisine, index) => {
    const restaurantName = `${cuisine} Kitchen`;
    const dishes = generateDishesForCuisine([cuisine], restaurantName);
    return {
      id: `fallback_${index}`,
      name: restaurantName,
      city,
      normalizedCity: normalizeCity(city),
      cuisines: [cuisine],
      rating: 4.0 + (index * 0.1),
      avgCost: 500 + index * 200,
      priceLevel: index < 2 ? '₹' : index < 4 ? '₹₹' : '₹₹₹',
      address: `Near ${city} Center`,
      lat: lat + (index * 0.001),
      lon: lon + (index * 0.001),
      source: 'kaggle' as const,
      dishes,
      moodBoost: getMoodBoost(mood),
      nutritionInsight: getNutritionInsight(mood),
      energyBadge: getEnergyBadge(mood),
      mapsUrl: `https://www.google.com/maps/search/${encodeURIComponent(cuisine + ' restaurant ' + city)}`,
      distance: 500 + index * 300,
    };
  });
}

// Foursquare API via edge function
async function fetchFoursquareRestaurants(
  lat: number,
  lon: number,
  cuisines: string[]
): Promise<NormalizedRestaurant[]> {
  try {
    console.log('Calling Foursquare API via edge function...', { lat, lon, cuisines });
    
    const { data, error } = await supabase.functions.invoke("search-foursquare", {
      body: { lat, lon, cuisines, limit: 20 },
    });
    
    if (error) {
      console.error("❌ Foursquare API error:", error);
      return [];
    }
    
    if (!data?.restaurants || data.restaurants.length === 0) {
      console.warn("⚠️ Foursquare returned no restaurants");
      return [];
    }
    
    console.log(`✅ Foursquare returned ${data.restaurants.length} restaurants`);
    
    return data.restaurants.map((r: any, index: number) => ({
      id: `fsq_${r.name?.replace(/\s/g, '_')}_${index}`,
      name: r.name || 'Unknown Restaurant',
      city: r.city || '',
      normalizedCity: '',
      cuisines: r.cuisines || ['Restaurant'],
      rating: typeof r.rating === 'number' ? r.rating : null,
      avgCost: 500,
      priceLevel: r.price_level || '₹₹',
      address: r.address || 'Address not available',
      lat: r.lat,
      lon: r.lon,
      distance: r.distance_meters,
      source: 'foursquare' as const,
    }));
  } catch (err) {
    console.error("❌ Error fetching Foursquare restaurants:", err);
    return [];
  }
}

// Get Kaggle restaurants filtered by location and cuisine
function getKaggleRestaurants(
  lat: number,
  lon: number,
  city: string,
  cuisines: string[]
): NormalizedRestaurant[] {
  if (!kaggleLoaded || kaggleData.length === 0) {
    return [];
  }
  
  return kaggleData
    .filter(r => cityMatches(r.city, city))
    .filter(r => cuisineMatches(r.cuisines, cuisines))
    .map(r => ({
      ...r,
      distance: calculateDistance(lat, lon, r.lat, r.lon),
    }))
    .slice(0, 15);
}
