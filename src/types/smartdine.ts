export type MoodType = 
  | 'happy' 
  | 'calm' 
  | 'stressed' 
  | 'tired' 
  | 'energetic' 
  | 'pms'
  | 'anxious'
  | 'sad';

export type CuisineType = 
  | 'Indian'
  | 'Chinese'
  | 'Italian'
  | 'Mexican'
  | 'Japanese'
  | 'Thai'
  | 'Mediterranean'
  | 'American'
  | 'French'
  | 'Korean';

export type DietType = 
  | 'vegetarian'
  | 'vegan'
  | 'gluten-free'
  | 'dairy-free'
  | 'keto'
  | 'paleo'
  | 'none';

export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'extra-hot';

export interface Location {
  city: string;
  lat: number;
  lon: number;
}

export interface UserPreferences {
  moods: MoodType[];
  cuisines: CuisineType[];
  budget: number;
  spice: SpiceLevel;
  diets: DietType[];
  location: Location | null;
  text?: string;
}

export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber: number;
  magnesium?: number;
  omega3?: number;
  vitamin_b?: number;
  tryptophan?: number;
}

export interface RecommendedDish {
  name: string;
  why: string;
  nutrition: NutritionInfo;
  mood_boost: string;
  estimated_calories: number;
  portion: string;
  cuisine?: string;
  image_prompt?: string;
}

export interface RestaurantWithDishes {
  name: string;
  rating: number | null;
  price_level: number | null;
  address: string;
  distance_meters: number;
  lat: number;
  lon: number;
  maps_url: string;
  cuisine: string;
  dishes: RecommendedDish[];
}

// Restaurant interface - unified for all sources
export interface Restaurant {
  fsq_id?: string | null;
  name: string;
  cuisine?: string;
  city: string;
  address?: string;
  lat?: number;
  lon?: number;
  categories?: string[];
  cuisine_tags?: string[];
  rating?: number | null;
  price?: number | null;
  price_level?: string | number | null;
  distance_meters?: number;
  why?: string;
  maps_url: string;
  source?: 'foursquare' | 'overpass' | 'nominatim' | 'local' | 'opentripmap';

}


export interface RecommendationResponse {
  scientific_reasoning: string;
  recommended_restaurants: RestaurantWithDishes[];
  mood_tips?: string[];
}

export interface EmotionAnalysis {
  emotion: string;
  scores: Record<string, number>;
  advice: string[];
  recommended_restaurants: RestaurantWithDishes[];
}

export interface MoodHistoryEntry {
  id: string;
  timestamp: string;
  moods: MoodType[];
  cuisines: CuisineType[];
  recommendations: RecommendedDish[];
}

export const MOOD_INFO: Record<MoodType, { emoji: string; color: string; description: string }> = {
  happy: { emoji: '😊', color: 'mood-happy', description: 'Feeling joyful and content' },
  calm: { emoji: '😌', color: 'mood-calm', description: 'Relaxed and peaceful' },
  stressed: { emoji: '😰', color: 'mood-stressed', description: 'Tense and overwhelmed' },
  tired: { emoji: '😴', color: 'mood-tired', description: 'Low energy, need a boost' },
  energetic: { emoji: '⚡', color: 'mood-energetic', description: 'Full of energy' },
  pms: { emoji: '🌸', color: 'mood-pms', description: 'Hormonal changes' },
  anxious: { emoji: '😟', color: 'mood-stressed', description: 'Worried or nervous' },
  sad: { emoji: '😢', color: 'mood-tired', description: 'Feeling down' },
};

export const CUISINE_INFO: Record<CuisineType, { emoji: string; popular: string[] }> = {
  Indian: { emoji: '🍛', popular: ['Butter Chicken', 'Biryani', 'Dal Makhani'] },
  Chinese: { emoji: '🥡', popular: ['Kung Pao Chicken', 'Dim Sum', 'Fried Rice'] },
  Italian: { emoji: '🍝', popular: ['Pasta', 'Pizza', 'Risotto'] },
  Mexican: { emoji: '🌮', popular: ['Tacos', 'Burritos', 'Guacamole'] },
  Japanese: { emoji: '🍣', popular: ['Sushi', 'Ramen', 'Tempura'] },
  Thai: { emoji: '🍜', popular: ['Pad Thai', 'Green Curry', 'Tom Yum'] },
  Mediterranean: { emoji: '🥙', popular: ['Falafel', 'Hummus', 'Shawarma'] },
  American: { emoji: '🍔', popular: ['Burgers', 'BBQ', 'Mac & Cheese'] },
  French: { emoji: '🥐', popular: ['Croissant', 'Coq au Vin', 'Crêpes'] },
  Korean: { emoji: '🥘', popular: ['Bibimbap', 'Korean BBQ', 'Kimchi'] },
};
