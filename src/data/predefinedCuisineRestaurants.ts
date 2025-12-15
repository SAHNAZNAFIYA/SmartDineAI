/**
 * PREDEFINED CUISINE RESTAURANTS
 * Guaranteed fallback data organized by cuisine type
 * Used when APIs fail or for specific intent-based queries
 */

export interface CuisineRestaurant {
  id: string;
  name: string;
  city: string;
  cuisines: string[];
  rating: number;
  priceLevel: string;
  description: string;
  moodTags: string[];
  bestFor: string[];
}

// CHEESY RESTAURANTS - Italian, French, Mexican, Continental, Cafe, American ONLY
export const CHEESY_RESTAURANTS: CuisineRestaurant[] = [
  // Italian
  {
    id: 'cheesy_1',
    name: 'Little Italy',
    city: 'Chennai',
    cuisines: ['Italian'],
    rating: 4.5,
    priceLevel: '₹₹₹',
    description: 'Premium veg Italian with wood-fired cheese pizzas and creamy pastas.',
    moodTags: ['happy', 'calm'],
    bestFor: ['cheesy', 'comfort', 'pizza', 'pasta'],
  },
  {
    id: 'cheesy_2',
    name: 'Toscano',
    city: 'Chennai',
    cuisines: ['Italian', 'Continental'],
    rating: 4.6,
    priceLevel: '₹₹₹',
    description: 'Upscale Italian with truffle pasta, risottos, and tiramisu.',
    moodTags: ['happy', 'calm'],
    bestFor: ['cheesy', 'comfort', 'pasta'],
  },
  {
    id: 'cheesy_3',
    name: 'Onesta',
    city: 'Bangalore',
    cuisines: ['Italian', 'Pizza'],
    rating: 4.1,
    priceLevel: '₹',
    description: 'Affordable pizzas with extra cheese options and pasta.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'cheap', 'pizza'],
  },
  {
    id: 'cheesy_4',
    name: 'Toit',
    city: 'Bangalore',
    cuisines: ['Continental', 'Italian'],
    rating: 4.7,
    priceLevel: '₹₹₹',
    description: 'Brewpub with wood-fired pizzas and cheesy loaded fries.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'pizza'],
  },
  {
    id: 'cheesy_5',
    name: 'The Big Chill',
    city: 'Bangalore',
    cuisines: ['Italian', 'Cafe'],
    rating: 4.5,
    priceLevel: '₹₹',
    description: 'Legendary cakes and cheesy Italian comfort food.',
    moodTags: ['happy', 'calm'],
    bestFor: ['cheesy', 'comfort', 'pasta'],
  },
  {
    id: 'cheesy_6',
    name: 'Chianti',
    city: 'Bangalore',
    cuisines: ['Italian'],
    rating: 4.5,
    priceLevel: '₹₹₹',
    description: 'Fine Italian dining with truffle risotto and four-cheese pasta.',
    moodTags: ['happy', 'calm'],
    bestFor: ['cheesy', 'pasta'],
  },
  // French
  {
    id: 'cheesy_7',
    name: 'La Boulangerie',
    city: 'Chennai',
    cuisines: ['French', 'Cafe'],
    rating: 4.4,
    priceLevel: '₹₹',
    description: 'Authentic French bakery with croissants and cheese tarts.',
    moodTags: ['calm', 'happy'],
    bestFor: ['cheesy', 'comfort'],
  },
  {
    id: 'cheesy_8',
    name: 'Le Baroque',
    city: 'Coimbatore',
    cuisines: ['French', 'Continental'],
    rating: 4.5,
    priceLevel: '₹₹₹',
    description: 'French bistro with crepes and cheese fondue.',
    moodTags: ['calm', 'happy'],
    bestFor: ['cheesy', 'comfort'],
  },
  {
    id: 'cheesy_9',
    name: "Glen's Bakehouse",
    city: 'Bangalore',
    cuisines: ['Cafe', 'French'],
    rating: 4.4,
    priceLevel: '₹₹',
    description: 'French pastries and cheese croissants.',
    moodTags: ['calm', 'happy'],
    bestFor: ['cheesy', 'comfort'],
  },
  // Mexican
  {
    id: 'cheesy_10',
    name: "Enrique's",
    city: 'Chennai',
    cuisines: ['Mexican', 'Continental'],
    rating: 4.3,
    priceLevel: '₹₹',
    description: 'Famous for loaded nachos and cheesy quesadillas.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'comfort', 'spicy'],
  },
  {
    id: 'cheesy_11',
    name: 'Taco Bell',
    city: 'Coimbatore',
    cuisines: ['Mexican'],
    rating: 4.0,
    priceLevel: '₹',
    description: 'Quick-service Mexican with loaded cheesy nachos.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'cheap'],
  },
  {
    id: 'cheesy_12',
    name: "Barberito's",
    city: 'Coimbatore',
    cuisines: ['Mexican'],
    rating: 4.0,
    priceLevel: '₹',
    description: 'Quick Mexican burritos with extra cheese.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'cheap'],
  },
  // Cafes
  {
    id: 'cheesy_13',
    name: 'Amethyst Cafe',
    city: 'Chennai',
    cuisines: ['Cafe', 'Continental'],
    rating: 4.4,
    priceLevel: '₹₹',
    description: 'Heritage cafe with gourmet sandwiches and cheese platters.',
    moodTags: ['calm', 'happy'],
    bestFor: ['cheesy', 'comfort'],
  },
  {
    id: 'cheesy_14',
    name: 'Chamiers Cafe',
    city: 'Chennai',
    cuisines: ['Cafe', 'Continental'],
    rating: 4.3,
    priceLevel: '₹₹',
    description: 'Artsy cafe known for cheesy pasta and quiche.',
    moodTags: ['calm', 'happy'],
    bestFor: ['cheesy', 'comfort'],
  },
  {
    id: 'cheesy_15',
    name: 'Ciclo Cafe',
    city: 'Chennai',
    cuisines: ['Cafe', 'Italian'],
    rating: 4.2,
    priceLevel: '₹',
    description: 'Cycling-themed cafe with affordable cheesy pastas.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'cheap', 'pasta'],
  },
  {
    id: 'cheesy_16',
    name: 'Third Wave Coffee',
    city: 'Bangalore',
    cuisines: ['Cafe'],
    rating: 4.2,
    priceLevel: '₹',
    description: 'Specialty coffee with cheesy bagels and sandwiches.',
    moodTags: ['calm', 'energetic'],
    bestFor: ['cheesy', 'cheap'],
  },
  // Continental/American
  {
    id: 'cheesy_17',
    name: 'Flying Elephant',
    city: 'Chennai',
    cuisines: ['Continental', 'Mediterranean'],
    rating: 4.6,
    priceLevel: '₹₹₹',
    description: "Park Hyatt's upscale restaurant with cheese boards.",
    moodTags: ['happy', 'calm'],
    bestFor: ['cheesy', 'comfort'],
  },
  {
    id: 'cheesy_18',
    name: 'Smoke House Deli',
    city: 'Bangalore',
    cuisines: ['Continental', 'Italian'],
    rating: 4.4,
    priceLevel: '₹₹',
    description: 'Artisanal sandwiches and cheese-loaded pasta.',
    moodTags: ['happy', 'calm'],
    bestFor: ['cheesy', 'comfort', 'pasta'],
  },
  {
    id: 'cheesy_19',
    name: 'Truffles',
    city: 'Bangalore',
    cuisines: ['Cafe', 'Continental'],
    rating: 4.7,
    priceLevel: '₹₹',
    description: 'Iconic burgers with melted cheese and loaded fries.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'comfort', 'burger'],
  },
  {
    id: 'cheesy_20',
    name: 'The Only Place',
    city: 'Bangalore',
    cuisines: ['Continental', 'American'],
    rating: 4.5,
    priceLevel: '₹₹₹',
    description: 'Premium steaks with mac and cheese sides.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'comfort'],
  },
  // Pizza chains (budget-friendly cheesy options)
  {
    id: 'cheesy_21',
    name: "Domino's Pizza",
    city: 'Chennai',
    cuisines: ['Italian', 'Pizza'],
    rating: 4.0,
    priceLevel: '₹',
    description: 'Cheese-burst pizzas with extra mozzarella.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'cheap', 'pizza'],
  },
  {
    id: 'cheesy_22',
    name: 'Pizza Hut',
    city: 'Chennai',
    cuisines: ['Italian', 'Pizza'],
    rating: 4.0,
    priceLevel: '₹',
    description: 'Pan pizzas with stuffed crust cheese option.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'cheap', 'pizza'],
  },
  {
    id: 'cheesy_23',
    name: 'Pizza Corner',
    city: 'Coimbatore',
    cuisines: ['Italian', 'Pizza'],
    rating: 4.1,
    priceLevel: '₹',
    description: 'Budget-friendly pizzas and cheesy garlic bread.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['cheesy', 'cheap', 'pizza'],
  },
  {
    id: 'cheesy_24',
    name: 'Benitos',
    city: 'Coimbatore',
    cuisines: ['Italian', 'Pizza'],
    rating: 4.2,
    priceLevel: '₹₹',
    description: 'Wood-fired pizzas with premium cheese toppings.',
    moodTags: ['happy', 'calm'],
    bestFor: ['cheesy', 'pizza', 'pasta'],
  },
];

// INDIAN RESTAURANTS - For Surprise Me feature
export const INDIAN_RESTAURANTS: CuisineRestaurant[] = [
  // South Indian
  {
    id: 'indian_1',
    name: 'Sangeetha Veg Restaurant',
    city: 'Chennai',
    cuisines: ['South Indian', 'Vegetarian'],
    rating: 4.3,
    priceLevel: '₹',
    description: 'Famous vegetarian chain with authentic South Indian tiffin.',
    moodTags: ['calm', 'happy'],
    bestFor: ['dosa', 'idli', 'vegetarian'],
  },
  {
    id: 'indian_2',
    name: 'Murugan Idli Shop',
    city: 'Chennai',
    cuisines: ['South Indian'],
    rating: 4.4,
    priceLevel: '₹',
    description: 'Soft idlis and traditional chutneys since 1950.',
    moodTags: ['calm', 'happy'],
    bestFor: ['idli', 'dosa', 'breakfast'],
  },
  {
    id: 'indian_3',
    name: 'A2B - Adyar Ananda Bhavan',
    city: 'Chennai',
    cuisines: ['South Indian', 'North Indian'],
    rating: 4.2,
    priceLevel: '₹',
    description: 'All-day veg meals with South Indian specialties.',
    moodTags: ['happy', 'calm'],
    bestFor: ['thali', 'dosa', 'sweets'],
  },
  {
    id: 'indian_4',
    name: 'Maplai',
    city: 'Chennai',
    cuisines: ['South Indian', 'Chettinad'],
    rating: 4.5,
    priceLevel: '₹₹',
    description: 'Traditional Chettinad flavours and unlimited meals.',
    moodTags: ['energetic', 'happy'],
    bestFor: ['chettinad', 'biryani', 'spicy'],
  },
  {
    id: 'indian_5',
    name: 'Junior Kuppanna',
    city: 'Chennai',
    cuisines: ['South Indian', 'Chettinad'],
    rating: 4.3,
    priceLevel: '₹₹',
    description: 'Famous for chicken meals and mutton biryani.',
    moodTags: ['energetic', 'happy'],
    bestFor: ['biryani', 'chicken', 'spicy'],
  },
  {
    id: 'indian_6',
    name: 'MTR - Mavalli Tiffin Rooms',
    city: 'Bangalore',
    cuisines: ['South Indian'],
    rating: 4.6,
    priceLevel: '₹',
    description: 'Historic spot for traditional Karnataka meals.',
    moodTags: ['calm', 'happy'],
    bestFor: ['dosa', 'idli', 'filter coffee'],
  },
  {
    id: 'indian_7',
    name: 'CTR - Central Tiffin Room',
    city: 'Bangalore',
    cuisines: ['South Indian'],
    rating: 4.7,
    priceLevel: '₹',
    description: 'Famous for Benne Masala Dosa.',
    moodTags: ['calm', 'happy'],
    bestFor: ['dosa', 'butter', 'breakfast'],
  },
  {
    id: 'indian_8',
    name: "Brahmin's Coffee Bar",
    city: 'Bangalore',
    cuisines: ['South Indian'],
    rating: 4.6,
    priceLevel: '₹',
    description: 'Classic idli-vada with filter coffee since 1965.',
    moodTags: ['calm', 'happy'],
    bestFor: ['idli', 'coffee', 'breakfast'],
  },
  {
    id: 'indian_9',
    name: 'Meghana Foods',
    city: 'Bangalore',
    cuisines: ['Andhra', 'South Indian'],
    rating: 4.6,
    priceLevel: '₹₹',
    description: 'Best spicy Andhra biryani in the city.',
    moodTags: ['energetic', 'happy'],
    bestFor: ['biryani', 'spicy', 'andhra'],
  },
  {
    id: 'indian_10',
    name: 'Vidyaranya Bhavan',
    city: 'Bangalore',
    cuisines: ['South Indian'],
    rating: 4.4,
    priceLevel: '₹',
    description: 'Classic dosas and breakfast combos.',
    moodTags: ['calm', 'happy'],
    bestFor: ['dosa', 'breakfast'],
  },
  // North Indian
  {
    id: 'indian_11',
    name: 'Pind',
    city: 'Chennai',
    cuisines: ['North Indian', 'Punjabi'],
    rating: 4.4,
    priceLevel: '₹₹',
    description: 'Authentic Punjabi food with dhaba-style flavors.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['butter chicken', 'naan', 'lassi'],
  },
  {
    id: 'indian_12',
    name: 'Annalakshmi Restaurant',
    city: 'Chennai',
    cuisines: ['South Indian', 'Veg Thali'],
    rating: 4.7,
    priceLevel: '₹₹₹',
    description: 'Premium vegetarian fine dining run by a charitable trust.',
    moodTags: ['calm', 'happy'],
    bestFor: ['thali', 'vegetarian', 'fine dining'],
  },
  {
    id: 'indian_13',
    name: 'Haribhavanam',
    city: 'Coimbatore',
    cuisines: ['South Indian', 'Chettinad'],
    rating: 4.5,
    priceLevel: '₹₹',
    description: 'Famous for mutton biryani and spicy gravies.',
    moodTags: ['energetic', 'happy'],
    bestFor: ['biryani', 'mutton', 'spicy'],
  },
  {
    id: 'indian_14',
    name: 'Annapoorna Gowrishankar',
    city: 'Coimbatore',
    cuisines: ['South Indian'],
    rating: 4.5,
    priceLevel: '₹',
    description: 'Iconic vegetarian chain for dosa and filter coffee.',
    moodTags: ['calm', 'happy'],
    bestFor: ['dosa', 'coffee', 'vegetarian'],
  },
  {
    id: 'indian_15',
    name: 'Farzi Cafe',
    city: 'Bangalore',
    cuisines: ['Modern Indian', 'Fusion'],
    rating: 4.5,
    priceLevel: '₹₹₹',
    description: 'Indian cuisine with contemporary molecular twist.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['fusion', 'modern', 'cocktails'],
  },
  {
    id: 'indian_16',
    name: 'Sattvam',
    city: 'Bangalore',
    cuisines: ['Pure Veg', 'Indian'],
    rating: 4.5,
    priceLevel: '₹₹₹',
    description: 'Premium sattvic vegetarian buffet.',
    moodTags: ['calm', 'happy'],
    bestFor: ['vegetarian', 'thali', 'buffet'],
  },
  // BBQ/Grill Indian
  {
    id: 'indian_17',
    name: 'Coal Barbecues',
    city: 'Chennai',
    cuisines: ['BBQ', 'North Indian'],
    rating: 4.5,
    priceLevel: '₹₹',
    description: 'Live grill buffet with wide BBQ options.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['bbq', 'grill', 'buffet'],
  },
  {
    id: 'indian_18',
    name: 'Absolute Barbecue',
    city: 'Chennai',
    cuisines: ['BBQ', 'Continental'],
    rating: 4.6,
    priceLevel: '₹₹',
    description: 'Build-your-own-grill with unlimited starters.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['bbq', 'grill', 'unlimited'],
  },
  {
    id: 'indian_19',
    name: 'Barbeque Nation',
    city: 'Coimbatore',
    cuisines: ['BBQ', 'North Indian'],
    rating: 4.5,
    priceLevel: '₹₹₹',
    description: 'Live grills with unlimited buffet menu.',
    moodTags: ['happy', 'energetic'],
    bestFor: ['bbq', 'buffet', 'family'],
  },
  {
    id: 'indian_20',
    name: 'Empire Restaurant',
    city: 'Bangalore',
    cuisines: ['Arabian', 'Indian'],
    rating: 4.3,
    priceLevel: '₹₹',
    description: 'Late-night biryani and grilled chicken.',
    moodTags: ['tired', 'happy'],
    bestFor: ['biryani', 'late night', 'chicken'],
  },
];

/**
 * Get cheesy restaurants filtered by budget
 */
export function getCheesyRestaurants(maxPriceLevel?: number, city?: string): CuisineRestaurant[] {
  let results = [...CHEESY_RESTAURANTS];
  
  // Filter by city if provided
  if (city) {
    const cityLower = city.toLowerCase();
    const cityMatches = results.filter(r => r.city.toLowerCase().includes(cityLower));
    if (cityMatches.length >= 5) {
      results = cityMatches;
    }
    // If not enough city matches, include all for variety
  }
  
  // Filter by budget
  if (maxPriceLevel) {
    const budgetFiltered = results.filter(r => r.priceLevel.length <= maxPriceLevel);
    if (budgetFiltered.length >= 5) {
      results = budgetFiltered;
    }
    // If not enough budget matches, relax the filter
  }
  
  // Sort by rating
  results.sort((a, b) => b.rating - a.rating);
  
  return results;
}

/**
 * Get Indian restaurants for Surprise Me
 */
export function getIndianRestaurants(maxPriceLevel?: number, city?: string): CuisineRestaurant[] {
  let results = [...INDIAN_RESTAURANTS];
  
  // Filter by city if provided
  if (city) {
    const cityLower = city.toLowerCase();
    const cityMatches = results.filter(r => r.city.toLowerCase().includes(cityLower));
    if (cityMatches.length >= 5) {
      results = cityMatches;
    }
  }
  
  // Filter by budget
  if (maxPriceLevel) {
    const budgetFiltered = results.filter(r => r.priceLevel.length <= maxPriceLevel);
    if (budgetFiltered.length >= 5) {
      results = budgetFiltered;
    }
  }
  
  // Shuffle for variety in Surprise Me
  results = results.sort(() => Math.random() - 0.5);
  
  return results;
}
