/**
 * SHARED RECOMMENDATION ENGINE
 * Single source of truth for ALL restaurant recommendations
 * Used by: General Recommendations, AI Coach, Surprise Me
 */

import { supabase } from "@/integrations/supabase/client";
import { MoodType } from "@/types/smartdine";
import { 
  localFallbackRestaurants, 
  searchFallbackRestaurants, 
  FallbackRestaurant 
} from "@/data/localFallbackRestaurants";
import { getCuisineAppropriateDishes } from "./dishIntelligence";

// ============================================
// TYPES
// ============================================

export interface RecommendationParams {
  lat: number;
  lon: number;
  city: string;
  cuisines?: string[];
  mood?: MoodType;
  budget?: number;
  maxPriceLevel?: number;
  keywords?: string[];
  dietaryRestrictions?: string[];
  dishIntent?: string;
  limit?: number;
}

export interface EnrichedRestaurant {
  id: string;
  name: string;
  city: string;
  cuisines: string[];
  rating: number;
  avgCost: number;
  priceLevel: string;
  address: string;
  lat: number;
  lon: number;
  distance?: number;
  source: 'fallback' | 'api' | 'kaggle';
  mapsUrl: string;
  dishes: { name: string; description: string }[];
  moodBoost: string;
  nutritionInsight: string;
  energyBadge: string;
  whyThisPlace: string;
  playfulReason?: string;
}

// ============================================
// STRICT CHEESY INTENT RULES (HIGHEST PRIORITY)
// ============================================

// FORBIDDEN cuisines for cheesy intent
const CHEESY_FORBIDDEN_CUISINES = [
  'south indian', 'north indian', 'chettinad', 'andhra', 
  'punjabi', 'indian', 'arabian', 'bbq', 'chinese', 'thai',
  'korean', 'japanese', 'vietnamese'
];

// ALLOWED cuisines for cheesy intent
const CHEESY_ALLOWED_CUISINES = [
  'italian', 'continental', 'french', 'mexican', 'cafe',
  'pizza', 'american'
];

// Cheesy dishes
const CHEESY_DISHES = [
  'pizza', 'pasta', 'lasagna', 'mac and cheese', 'quesadilla',
  'nachos', 'grilled cheese', 'cheese sandwich', 'risotto',
  'fondue', 'cheese burst', 'panini', 'croissant'
];

/**
 * Check if intent is cheesy-related
 */
function isCheesyIntent(keywords: string[], dishIntent?: string): boolean {
  const cheesyKeywords = ['cheesy', 'cheese', 'pizza', 'pasta', 'lasagna', 'nachos', 'quesadilla'];
  const lowerKeywords = keywords.map(k => k.toLowerCase());
  const lowerIntent = dishIntent?.toLowerCase() || '';
  
  return cheesyKeywords.some(ck => 
    lowerKeywords.includes(ck) || lowerIntent.includes(ck)
  );
}

/**
 * Check if restaurant is valid for cheesy intent
 */
function isValidForCheesy(restaurant: FallbackRestaurant): boolean {
  const cuisineLower = restaurant.cuisine.map(c => c.toLowerCase());
  
  // Check if any cuisine is forbidden
  const hasForbidden = cuisineLower.some(c => 
    CHEESY_FORBIDDEN_CUISINES.some(fc => c.includes(fc) || fc.includes(c))
  );
  
  if (hasForbidden) return false;
  
  // Check if at least one cuisine is allowed
  const hasAllowed = cuisineLower.some(c =>
    CHEESY_ALLOWED_CUISINES.some(ac => c.includes(ac) || ac.includes(c))
  );
  
  return hasAllowed;
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

const PLAYFUL_REASONS = [
  "Your taste buds called and said YES! 📞",
  "The food gods have spoken favorably! 👑",
  "This one hits different, trust us! 💫",
  "Your stomach will send you a thank-you note! 📝",
  "Destiny brought you here for a reason! ✨",
  "We have a good feeling about this one! 🔮",
  "Warning: May cause extreme satisfaction! ⚠️",
  "Happiness served on a plate! 🍽️",
];

function getMoodContent(mood: MoodType) {
  const boosts = MOOD_BOOSTS[mood] || MOOD_BOOSTS.happy;
  const insights = NUTRITION_INSIGHTS[mood] || NUTRITION_INSIGHTS.happy;
  const badges = ENERGY_BADGES[mood] || ENERGY_BADGES.happy;
  
  return {
    moodBoost: boosts[Math.floor(Math.random() * boosts.length)],
    nutritionInsight: insights[Math.floor(Math.random() * insights.length)],
    energyBadge: badges[Math.floor(Math.random() * badges.length)],
  };
}

function generateWhyThisPlace(
  restaurant: FallbackRestaurant,
  mood: MoodType,
  keywords: string[]
): string {
  const moodReasons: Record<MoodType, string> = {
    tired: 'Energy-boosting menu with iron-rich options',
    stressed: 'Calming ambiance perfect for unwinding',
    sad: 'Comfort food that lifts your spirits',
    happy: 'Celebratory vibes to match your mood',
    anxious: 'Peaceful setting with soothing flavors',
    calm: 'Balanced menu for mindful dining',
    energetic: 'High-protein options to fuel your energy',
    pms: 'Iron-rich comfort food for self-care',
  };
  
  const keywordReasons: Record<string, string> = {
    cheesy: 'Known for amazing cheese-loaded dishes 🧀',
    spicy: 'Perfect for spice lovers seeking heat 🌶️',
    healthy: 'Fresh, nutritious options made daily 🥗',
    comfort: 'Hearty portions of soul-satisfying food 🤗',
    light: 'Light, refreshing options perfect for you 🌿',
  };
  
  let reason = moodReasons[mood] || 'Great for your current mood';
  
  for (const keyword of keywords) {
    if (keywordReasons[keyword.toLowerCase()]) {
      reason = keywordReasons[keyword.toLowerCase()];
      break;
    }
  }
  
  const ratingText = restaurant.rating >= 4.5 ? 'Highly rated' : 'Well reviewed';
  return `${reason}. ${ratingText} ${restaurant.cuisine[0]} spot.`;
}

// ============================================
// BUDGET MAPPING
// ============================================

const BUDGET_TO_LEVEL: Record<string, number> = {
  'Low': 1,
  'Medium': 2,
  'High': 3,
};

function getBudgetLevel(budget: "Low" | "Medium" | "High"): number {
  return BUDGET_TO_LEVEL[budget] || 2;
}

// ============================================
// MAIN RECOMMENDATION ENGINE
// ============================================

/**
 * Get recommendations using the shared engine
 * FILTER ORDER: Location -> Cuisine -> Budget -> Diet -> Dish Intent -> Mood
 */
export async function getSharedRecommendations(params: RecommendationParams): Promise<EnrichedRestaurant[]> {
  const {
    lat,
    lon,
    city,
    cuisines = [],
    mood = 'happy',
    budget,
    maxPriceLevel,
    keywords = [],
    dietaryRestrictions = [],
    dishIntent,
    limit = 10,
  } = params;

  console.log('🍽️ Shared Engine: Starting recommendation with params:', { city, cuisines, keywords, dishIntent, budget, maxPriceLevel });

  // Determine if this is a cheesy intent
  const cheesy = isCheesyIntent(keywords, dishIntent);
  
  // STEP 1: Get from local fallback FIRST (PRIMARY SOURCE)
  let fallbackResults = searchFallbackRestaurants({
    location: city,
    cuisines: cheesy ? [] : cuisines, // Ignore selected cuisines if cheesy
    budget: budget,
    diet: dietaryRestrictions,
    limit: 50, // Get more for filtering
  });

  console.log(`📍 Found ${fallbackResults.length} restaurants in ${city}`);

  // STEP 2: Apply STRICT cheesy filter if applicable
  if (cheesy) {
    console.log('🧀 Cheesy intent detected - applying strict filtering');
    fallbackResults = fallbackResults.filter(r => isValidForCheesy(r));
    console.log(`🧀 After cheesy filter: ${fallbackResults.length} restaurants`);
  }

  // STEP 3: Apply cuisine filter (if not cheesy)
  if (!cheesy && cuisines.length > 0) {
    const cuisineLower = cuisines.map(c => c.toLowerCase());
    const cuisineFiltered = fallbackResults.filter(r =>
      r.cuisine.some(c =>
        cuisineLower.some(fc => 
          c.toLowerCase().includes(fc) || fc.includes(c.toLowerCase())
        )
      )
    );
    if (cuisineFiltered.length > 0) {
      fallbackResults = cuisineFiltered;
    }
  }

  // STEP 4: Apply budget filter
  if (maxPriceLevel) {
    const budgetFiltered = fallbackResults.filter(r => 
      getBudgetLevel(r.budget) <= maxPriceLevel
    );
    if (budgetFiltered.length > 0) {
      fallbackResults = budgetFiltered;
    }
  }

  // STEP 5: Apply diet filter
  if (dietaryRestrictions.length > 0 && !dietaryRestrictions.includes('none')) {
    const isVeg = dietaryRestrictions.includes('vegetarian') || dietaryRestrictions.includes('vegan');
    if (isVeg) {
      fallbackResults = fallbackResults.filter(r => r.diet === 'Veg');
    }
  }

  // STEP 6: Sort by rating
  fallbackResults.sort((a, b) => b.rating - a.rating);

  // STEP 7: Limit results
  fallbackResults = fallbackResults.slice(0, limit);

  // STEP 8: Enrich results
  const moodContent = getMoodContent(mood);
  
  const enrichedResults: EnrichedRestaurant[] = fallbackResults.map((r, index) => {
    const dishes = getCuisineAppropriateDishes(r.cuisine, keywords, r.name);
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(r.name + ' ' + city)}`;
    
    return {
      id: `fallback_${r.id}`,
      name: r.name,
      city: r.location,
      cuisines: r.cuisine,
      rating: r.rating,
      avgCost: r.budget === 'Low' ? 400 : r.budget === 'Medium' ? 800 : 1500,
      priceLevel: r.budget === 'Low' ? '₹' : r.budget === 'Medium' ? '₹₹' : '₹₹₹',
      address: `${r.location} Center`,
      lat: lat + (index * 0.002),
      lon: lon + (index * 0.002),
      source: 'fallback' as const,
      mapsUrl,
      dishes,
      ...moodContent,
      whyThisPlace: generateWhyThisPlace(r, mood, keywords),
      playfulReason: PLAYFUL_REASONS[Math.floor(Math.random() * PLAYFUL_REASONS.length)],
    };
  });

  console.log(`✅ Shared Engine: Returning ${enrichedResults.length} restaurants`);
  
  // STEP 9: Try to enrich with API data (optional, non-blocking)
  try {
    const apiResults = await fetchFromAPIs(lat, lon, cuisines);
    if (apiResults.length > 0) {
      // Merge API results but keep fallback as primary
      const existingNames = new Set(enrichedResults.map(r => r.name.toLowerCase()));
      const newFromAPI = apiResults
        .filter(r => !existingNames.has(r.name.toLowerCase()))
        .slice(0, 3);
      
      // Add a few API results at the end
      enrichedResults.push(...newFromAPI.map((r, i) => ({
        ...r,
        ...moodContent,
        whyThisPlace: `Discovered nearby! ${r.cuisines[0] || 'Restaurant'} with great reviews.`,
        playfulReason: PLAYFUL_REASONS[(enrichedResults.length + i) % PLAYFUL_REASONS.length],
      })));
    }
  } catch (err) {
    console.log('⚠️ API enrichment failed, using fallback data only');
  }

  return enrichedResults.slice(0, limit);
}

/**
 * Fetch from external APIs (Foursquare + OpenTripMap)
 */
async function fetchFromAPIs(lat: number, lon: number, cuisines: string[]): Promise<EnrichedRestaurant[]> {
  try {
    const { data, error } = await supabase.functions.invoke("search-foursquare", {
      body: { lat, lon, cuisines, limit: 10 },
    });
    
    if (error || !data?.restaurants) return [];
    
    return data.restaurants.map((r: any) => ({
      id: r.id || `api_${Date.now()}_${Math.random()}`,
      name: r.name,
      city: r.city || '',
      cuisines: r.cuisines || ['Restaurant'],
      rating: r.rating || 4.0,
      avgCost: r.avgCost || 600,
      priceLevel: r.priceLevel || '₹₹',
      address: r.address || '',
      lat: r.lat || lat,
      lon: r.lon || lon,
      source: 'api' as const,
      mapsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(r.name)}`,
      dishes: [],
      moodBoost: '',
      nutritionInsight: '',
      energyBadge: '',
      whyThisPlace: '',
    }));
  } catch {
    return [];
  }
}

/**
 * Get scientific reasoning for recommendations
 */
export function getScientificReasoning(mood: MoodType, keywords: string[]): string {
  const moodScience: Record<MoodType, string> = {
    happy: "Dopamine-rich foods enhance your already positive mood. We've selected restaurants with vibrant, satisfying options that maintain your feel-good state.",
    calm: "L-theanine and magnesium-rich foods promote relaxation. Our picks feature balanced, gentle flavors that support your peaceful state.",
    stressed: "Omega-3s and B-vitamins help reduce cortisol levels. We've chosen places known for comfort foods with stress-reducing nutrients.",
    tired: "Iron and B12 boost energy production at the cellular level. These restaurants offer revitalizing meals rich in energy-boosting nutrients.",
    energetic: "Complex carbs and protein sustain your high energy. We've matched you with places that fuel performance without the crash.",
    pms: "Magnesium and iron help alleviate PMS symptoms. Our selections feature comfort foods with hormone-balancing properties.",
    anxious: "Gut-brain axis research shows probiotics reduce anxiety. We've picked places with calming, gut-friendly options.",
    sad: "Tryptophan converts to serotonin, the 'happiness hormone'. These comfort-food spots are chosen to naturally boost your mood.",
  };
  
  let reasoning = moodScience[mood] || moodScience.happy;
  
  if (keywords.includes('cheesy')) {
    reasoning += " Plus, cheese contains casomorphins that provide that cozy, satisfied feeling!";
  }
  
  return reasoning;
}

/**
 * Get mood-boosting tips
 */
export function getMoodTips(mood: MoodType): string[] {
  const tips: Record<MoodType, string[]> = {
    happy: [
      "🌟 Share your meal with friends to amplify the joy!",
      "📸 Capture the moment - food photos boost happiness hormones!",
      "🎵 Play upbeat music while eating to enhance the experience.",
    ],
    calm: [
      "🧘 Practice mindful eating - savor each bite slowly.",
      "🌿 Choose a quiet corner for a peaceful dining experience.",
      "💧 Stay hydrated - water complements calm digestion.",
    ],
    stressed: [
      "🫁 Take 3 deep breaths before your first bite.",
      "📵 Put your phone away and be present with your food.",
      "🍫 Dark chocolate post-meal can help reduce cortisol.",
    ],
    tired: [
      "☀️ Eat near a window - natural light boosts energy.",
      "🚶 A short walk after eating improves digestion and alertness.",
      "🍌 Pair your meal with potassium-rich sides for energy.",
    ],
    energetic: [
      "💪 Protein within 30 minutes sustains your momentum!",
      "🥗 Balance with greens to avoid the energy crash.",
      "⏰ Regular meal timing maintains peak energy levels.",
    ],
    pms: [
      "🍫 A small dark chocolate treat is scientifically beneficial!",
      "💧 Extra hydration helps with bloating and mood.",
      "🥬 Iron-rich leafy greens replenish what you're losing.",
    ],
    anxious: [
      "🫖 Warm beverages like tea have calming effects.",
      "🌸 Lavender or chamomile after meals aid relaxation.",
      "🧠 Fermented foods support the gut-brain connection.",
    ],
    sad: [
      "☀️ Vitamin D from eggs or fortified foods lifts mood.",
      "🤗 Comfort food is okay - nourishing yourself is self-care.",
      "🍊 Citrus scents while eating can boost serotonin.",
    ],
  };
  
  return tips[mood] || tips.happy;
}
