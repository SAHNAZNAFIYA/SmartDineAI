/**
 * Dish Intelligence Layer
 * Deterministic mapping of keywords to cuisine-appropriate dishes
 */

// Keyword to dish type mapping
export const KEYWORD_DISH_MAP: Record<string, string[]> = {
  cheesy: ['pizza', 'lasagna', 'mac and cheese', 'quesadillas', 'grilled cheese', 'pasta', 'risotto', 'nachos', 'cheesy fries'],
  comfort: ['dosa', 'rajma chawal', 'biryani', 'pasta', 'thali', 'ramen', 'mac and cheese', 'butter chicken', 'dal makhani'],
  spicy: ['biryani', 'chettinad', 'korean bbq', 'thai curry', 'kimchi jjigae', 'tteokbokki', 'green curry', 'vindaloo'],
  light: ['salads', 'idli', 'upma', 'soup', 'sashimi', 'poke bowl', 'spring rolls', 'greek salad'],
  healthy: ['bowls', 'grilled items', 'salads', 'sushi', 'falafel', 'hummus', 'grilled chicken'],
  crispy: ['tempura', 'fried chicken', 'pakora', 'spring rolls', 'samosa', 'fries'],
  sweet: ['tiramisu', 'mango sticky rice', 'churros', 'creme brulee', 'ice cream', 'pancakes'],
  savory: ['steak', 'bbq ribs', 'burger', 'shawarma', 'kebab', 'grilled meats'],
};

// Cuisine to valid dish mapping (prevents cross-cuisine dish errors)
export const CUISINE_VALID_DISHES: Record<string, string[]> = {
  indian: ['butter chicken', 'dal makhani', 'paneer tikka', 'biryani', 'chole bhature', 'masala dosa', 'palak paneer', 'tandoori chicken', 'naan', 'samosa', 'thali', 'rajma chawal', 'idli', 'upma', 'vindaloo'],
  italian: ['margherita pizza', 'carbonara', 'lasagna', 'risotto', 'tiramisu', 'gnocchi', 'bruschetta', 'pasta', 'osso buco', 'pizza', 'mac and cheese'],
  chinese: ['kung pao chicken', 'dim sum', 'mapo tofu', 'sweet and sour pork', 'hot pot', 'peking duck', 'dan dan noodles', 'spring rolls', 'fried rice', 'dumplings'],
  japanese: ['sushi', 'ramen', 'tempura', 'wagyu', 'sashimi', 'udon', 'okonomiyaki', 'gyoza', 'tonkotsu ramen', 'miso soup'],
  mexican: ['tacos al pastor', 'mole', 'carnitas', 'enchiladas', 'guacamole', 'churros', 'pozole', 'quesadillas', 'burritos', 'nachos'],
  thai: ['pad thai', 'green curry', 'tom yum', 'massaman curry', 'mango sticky rice', 'som tum', 'khao soi', 'satay', 'thai basil chicken'],
  korean: ['korean bbq', 'bibimbap', 'kimchi jjigae', 'bulgogi', 'japchae', 'tteokbokki', 'samgyeopsal', 'fried chicken'],
  mediterranean: ['falafel', 'shawarma', 'hummus', 'greek salad', 'moussaka', 'souvlaki', 'tabbouleh', 'lamb kofta', 'pita'],
  american: ['smash burger', 'bbq ribs', 'mac and cheese', 'buffalo wings', 'philly cheesesteak', 'lobster roll', 'clam chowder', 'apple pie', 'grilled cheese', 'burger', 'fries'],
  french: ['coq au vin', 'beef bourguignon', 'croissant', 'creme brulee', 'duck confit', 'french onion soup', 'ratatouille', 'escargot', 'quiche'],
  vietnamese: ['pho', 'banh mi', 'spring rolls', 'bun cha', 'com tam', 'ca kho to', 'vermicelli bowl'],
  cafe: ['avocado toast', 'eggs benedict', 'pancakes', 'acai bowl', 'club sandwich', 'croissant', 'latte', 'smoothie', 'salad'],
  bakery: ['sourdough bread', 'cinnamon roll', 'chocolate croissant', 'fruit tart', 'pastries', 'cookies', 'cake'],
};

/**
 * Get cuisine-appropriate dishes based on keywords
 * CRITICAL: Never recommend dishes that don't belong to the restaurant's cuisine
 */
export function getCuisineAppropriateDishes(
  cuisines: string[],
  keywords: string[],
  restaurantName: string
): { name: string; description: string }[] {
  const normalizedCuisines = cuisines.map(c => c.toLowerCase().replace(/[^\w]/g, ''));
  
  // Find all valid dishes for this restaurant's cuisines
  let validDishes: string[] = [];
  for (const cuisine of normalizedCuisines) {
    for (const [key, dishes] of Object.entries(CUISINE_VALID_DISHES)) {
      if (cuisine.includes(key) || key.includes(cuisine)) {
        validDishes = [...validDishes, ...dishes];
      }
    }
  }
  
  // If no specific cuisine match, use fallback
  if (validDishes.length === 0) {
    validDishes = ['chef\'s signature', 'seasonal special', 'house specialty'];
  }
  
  // Filter by keywords if provided
  let matchedDishes: string[] = [];
  if (keywords.length > 0) {
    for (const keyword of keywords) {
      const keywordDishes = KEYWORD_DISH_MAP[keyword.toLowerCase()] || [];
      for (const dish of keywordDishes) {
        if (validDishes.some(vd => vd.toLowerCase().includes(dish.toLowerCase()) || dish.toLowerCase().includes(vd.toLowerCase()))) {
          matchedDishes.push(dish);
        }
      }
    }
  }
  
  // If no keyword matches, use cuisine dishes
  if (matchedDishes.length === 0) {
    matchedDishes = validDishes;
  }
  
  // Deterministic selection based on restaurant name
  const hash = [...restaurantName].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selectedIndex = hash % matchedDishes.length;
  const secondIndex = (hash + 7) % matchedDishes.length;
  
  const selectedDishes = [
    matchedDishes[selectedIndex],
    matchedDishes[secondIndex !== selectedIndex ? secondIndex : (selectedIndex + 1) % matchedDishes.length]
  ].filter((d, i, arr) => d && arr.indexOf(d) === i);
  
  return selectedDishes.slice(0, 2).map(dish => ({
    name: dish.charAt(0).toUpperCase() + dish.slice(1),
    description: generateDishDescription(dish, normalizedCuisines)
  }));
}

/**
 * Generate contextual dish description
 */
function generateDishDescription(dish: string, cuisines: string[]): string {
  const descriptions: Record<string, string> = {
    'pizza': 'Wood-fired perfection with premium toppings',
    'lasagna': 'Layered pasta with rich cheese and sauce',
    'mac and cheese': 'Creamy, cheesy comfort classic',
    'pasta': 'Al dente perfection with signature sauce',
    'risotto': 'Creamy arborio rice, perfectly cooked',
    'biryani': 'Fragrant basmati with aromatic spices',
    'butter chicken': 'Tender chicken in rich tomato cream',
    'dal makhani': 'Slow-cooked lentils in creamy gravy',
    'paneer tikka': 'Grilled cottage cheese with spices',
    'ramen': 'Rich broth with perfectly chewy noodles',
    'sushi': 'Fresh, expertly prepared nigiri',
    'tacos': 'Authentic fillings, handmade tortillas',
    'burger': 'Juicy patty, premium toppings',
    'salad': 'Fresh, crisp, nutritious greens',
    'green curry': 'Aromatic coconut curry with Thai basil',
    'korean bbq': 'Premium meats, grilled tableside',
    'bibimbap': 'Colorful rice bowl with vegetables and egg',
  };
  
  const lowerDish = dish.toLowerCase();
  for (const [key, desc] of Object.entries(descriptions)) {
    if (lowerDish.includes(key)) {
      return desc;
    }
  }
  
  return 'House specialty, prepared with care';
}

/**
 * Validate dish belongs to cuisine (prevents Cafe serving Chicken Tikka etc.)
 */
export function isDishValidForCuisine(dish: string, cuisines: string[]): boolean {
  const normalizedDish = dish.toLowerCase();
  const normalizedCuisines = cuisines.map(c => c.toLowerCase().replace(/[^\w]/g, ''));
  
  for (const cuisine of normalizedCuisines) {
    for (const [key, dishes] of Object.entries(CUISINE_VALID_DISHES)) {
      if (cuisine.includes(key) || key.includes(cuisine)) {
        if (dishes.some(d => normalizedDish.includes(d) || d.includes(normalizedDish))) {
          return true;
        }
      }
    }
  }
  
  return false;
}
