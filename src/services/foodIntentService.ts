/**
 * Food Intent Detection Service
 * Parses user queries to extract food preferences, cuisine filters, and budget constraints
 */

export interface FoodIntent {
  keywords: string[];
  cuisines: string[];
  dishes: string[];
  priceConstraint?: 'cheap' | 'moderate' | 'expensive';
  maxPriceLevel?: number;
  minPriceLevel?: number;
}

// Keyword to cuisine/dish mapping
const FOOD_INTENT_MAP: Record<string, { cuisines: string[]; dishes: string[] }> = {
  cheesy: {
    dishes: ['Pizza', 'Lasagna', 'Mac and Cheese', 'Quesadillas', 'Paneer Tikka'],
    cuisines: ['Italian', 'American', 'Mexican', 'Indian'],
  },
  cheese: {
    dishes: ['Pizza', 'Lasagna', 'Mac and Cheese', 'Quesadillas'],
    cuisines: ['Italian', 'American', 'Mexican'],
  },
  comfort: {
    dishes: ['Butter Chicken', 'Biryani', 'Ramen', 'Mac and Cheese', 'Dal Makhani'],
    cuisines: ['Indian', 'Japanese', 'American', 'Thai'],
  },
  spicy: {
    dishes: ['Kung Pao Chicken', 'Green Curry', 'Tacos al Pastor', 'Kimchi Jjigae'],
    cuisines: ['Chinese', 'Thai', 'Mexican', 'Korean', 'Indian'],
  },
  hot: {
    dishes: ['Green Curry', 'Tom Yum', 'Tteokbokki', 'Dan Dan Noodles'],
    cuisines: ['Thai', 'Korean', 'Chinese', 'Indian'],
  },
  sweet: {
    dishes: ['Tiramisu', 'Mango Sticky Rice', 'Churros', 'Crème Brûlée'],
    cuisines: ['Italian', 'Thai', 'Mexican', 'French'],
  },
  healthy: {
    dishes: ['Poke Bowl', 'Greek Salad', 'Sushi', 'Falafel Platter'],
    cuisines: ['Japanese', 'Mediterranean', 'Thai', 'Vietnamese'],
  },
  light: {
    dishes: ['Sashimi', 'Greek Salad', 'Som Tum', 'Spring Rolls'],
    cuisines: ['Japanese', 'Mediterranean', 'Thai', 'Vietnamese'],
  },
  heavy: {
    dishes: ['Biryani', 'BBQ Ribs', 'Lasagna', 'Korean BBQ'],
    cuisines: ['Indian', 'American', 'Italian', 'Korean'],
  },
  filling: {
    dishes: ['Biryani', 'Burrito', 'Ramen', 'Hot Pot'],
    cuisines: ['Indian', 'Mexican', 'Japanese', 'Chinese'],
  },
  noodles: {
    dishes: ['Ramen', 'Pad Thai', 'Pho', 'Dan Dan Noodles', 'Udon'],
    cuisines: ['Japanese', 'Thai', 'Vietnamese', 'Chinese'],
  },
  rice: {
    dishes: ['Biryani', 'Fried Rice', 'Bibimbap', 'Risotto'],
    cuisines: ['Indian', 'Chinese', 'Korean', 'Italian'],
  },
  meat: {
    dishes: ['Korean BBQ', 'BBQ Ribs', 'Carnitas', 'Beef Bourguignon'],
    cuisines: ['Korean', 'American', 'Mexican', 'French'],
  },
  vegetarian: {
    dishes: ['Paneer Tikka', 'Falafel', 'Margherita Pizza', 'Masala Dosa'],
    cuisines: ['Indian', 'Mediterranean', 'Italian', 'Thai'],
  },
  vegan: {
    dishes: ['Falafel', 'Som Tum', 'Tabbouleh', 'Spring Rolls'],
    cuisines: ['Mediterranean', 'Thai', 'Vietnamese', 'Indian'],
  },
  soup: {
    dishes: ['Tom Yum', 'Pho', 'Ramen', 'French Onion Soup', 'Clam Chowder'],
    cuisines: ['Thai', 'Vietnamese', 'Japanese', 'French', 'American'],
  },
  curry: {
    dishes: ['Green Curry', 'Butter Chicken', 'Massaman Curry', 'Khao Soi'],
    cuisines: ['Thai', 'Indian', 'Japanese'],
  },
  crispy: {
    dishes: ['Tempura', 'Fried Chicken', 'Spring Rolls', 'Pakora'],
    cuisines: ['Japanese', 'Korean', 'Chinese', 'Indian'],
  },
  fried: {
    dishes: ['Fried Chicken', 'Tempura', 'Spring Rolls', 'Samosa'],
    cuisines: ['Korean', 'Japanese', 'Chinese', 'Indian', 'American'],
  },
  grilled: {
    dishes: ['Korean BBQ', 'Souvlaki', 'Tandoori Chicken', 'Satay'],
    cuisines: ['Korean', 'Mediterranean', 'Indian', 'Thai'],
  },
  bbq: {
    dishes: ['Korean BBQ', 'BBQ Ribs', 'Carnitas', 'Pulled Pork'],
    cuisines: ['Korean', 'American', 'Mexican'],
  },
  seafood: {
    dishes: ['Sushi', 'Lobster Roll', 'Tom Yum', 'Paella'],
    cuisines: ['Japanese', 'American', 'Thai', 'Mediterranean'],
  },
  pizza: {
    dishes: ['Margherita Pizza', 'Pepperoni Pizza', 'Neapolitan Pizza'],
    cuisines: ['Italian'],
  },
  pasta: {
    dishes: ['Carbonara', 'Lasagna', 'Gnocchi', 'Penne Arrabbiata'],
    cuisines: ['Italian'],
  },
  sushi: {
    dishes: ['Sushi Omakase', 'Sashimi Platter', 'Nigiri'],
    cuisines: ['Japanese'],
  },
  ramen: {
    dishes: ['Tonkotsu Ramen', 'Miso Ramen', 'Shoyu Ramen'],
    cuisines: ['Japanese'],
  },
  tacos: {
    dishes: ['Tacos al Pastor', 'Fish Tacos', 'Carnitas Tacos'],
    cuisines: ['Mexican'],
  },
  burger: {
    dishes: ['Smash Burger', 'Classic Burger', 'Cheese Burger'],
    cuisines: ['American'],
  },
  indian: {
    dishes: ['Butter Chicken', 'Biryani', 'Masala Dosa', 'Dal Makhani'],
    cuisines: ['Indian'],
  },
  chinese: {
    dishes: ['Kung Pao Chicken', 'Dim Sum', 'Fried Rice', 'Mapo Tofu'],
    cuisines: ['Chinese'],
  },
  japanese: {
    dishes: ['Sushi', 'Ramen', 'Tempura', 'Wagyu'],
    cuisines: ['Japanese'],
  },
  thai: {
    dishes: ['Pad Thai', 'Green Curry', 'Tom Yum', 'Mango Sticky Rice'],
    cuisines: ['Thai'],
  },
  italian: {
    dishes: ['Pizza', 'Pasta', 'Lasagna', 'Risotto'],
    cuisines: ['Italian'],
  },
  mexican: {
    dishes: ['Tacos', 'Burritos', 'Enchiladas', 'Guacamole'],
    cuisines: ['Mexican'],
  },
  korean: {
    dishes: ['Korean BBQ', 'Bibimbap', 'Kimchi Jjigae', 'Tteokbokki'],
    cuisines: ['Korean'],
  },
  french: {
    dishes: ['Croissant', 'Coq au Vin', 'Crème Brûlée', 'Duck Confit'],
    cuisines: ['French'],
  },
  mediterranean: {
    dishes: ['Falafel', 'Hummus', 'Shawarma', 'Greek Salad'],
    cuisines: ['Mediterranean'],
  },
  american: {
    dishes: ['Burger', 'BBQ Ribs', 'Mac and Cheese', 'Buffalo Wings'],
    cuisines: ['American'],
  },
};

// Price keywords
const PRICE_KEYWORDS = {
  cheap: ['cheap', 'budget', 'affordable', 'inexpensive', 'low cost', 'economical', 'value'],
  moderate: ['moderate', 'mid-range', 'reasonable'],
  expensive: ['expensive', 'fancy', 'upscale', 'fine dining', 'luxury', 'premium', 'high-end'],
};

/**
 * Parse user text to extract food intent
 */
export function parseFoodIntent(text: string): FoodIntent {
  const lowerText = text.toLowerCase();
  const words = lowerText.split(/\s+/);
  
  const matchedKeywords: string[] = [];
  const cuisines = new Set<string>();
  const dishes = new Set<string>();
  let priceConstraint: FoodIntent['priceConstraint'] = undefined;
  
  // Check for food keywords
  for (const [keyword, mapping] of Object.entries(FOOD_INTENT_MAP)) {
    if (lowerText.includes(keyword)) {
      matchedKeywords.push(keyword);
      mapping.cuisines.forEach(c => cuisines.add(c));
      mapping.dishes.forEach(d => dishes.add(d));
    }
  }
  
  // Check for price constraints
  for (const [constraint, keywords] of Object.entries(PRICE_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        priceConstraint = constraint as FoodIntent['priceConstraint'];
        break;
      }
    }
    if (priceConstraint) break;
  }
  
  // Also check for "not expensive" or "not too expensive"
  if (lowerText.includes('not expensive') || lowerText.includes('not too expensive')) {
    priceConstraint = 'cheap';
  }
  
  return {
    keywords: matchedKeywords,
    cuisines: Array.from(cuisines),
    dishes: Array.from(dishes),
    priceConstraint,
    maxPriceLevel: priceConstraint === 'cheap' ? 2 : priceConstraint === 'moderate' ? 3 : undefined,
    minPriceLevel: priceConstraint === 'expensive' ? 3 : undefined,
  };
}

/**
 * Generate a ChefMood response based on intent and emotion
 */
export function generateChefMoodResponse(intent: FoodIntent, emotion: string): string {
  const { keywords, priceConstraint } = intent;
  
  // Responses based on detected keywords
  if (keywords.includes('cheesy') && priceConstraint === 'cheap') {
    return `Ohhh, cheesy AND budget-friendly? 🧀💛\nYou're speaking my love language!\n\nLet's melt stress without melting your wallet 👇`;
  }
  
  if (keywords.includes('cheesy')) {
    return `Someone's got a cheese craving! 🧀✨\nI totally get it – cheese makes everything better.\n\nHere are my top cheesy picks 👇`;
  }
  
  if (keywords.includes('comfort')) {
    return `Comfort food coming right up! 🤗🍲\nSometimes we just need food that feels like a warm hug.\n\nLet me find you the coziest spots 👇`;
  }
  
  if (keywords.includes('spicy') || keywords.includes('hot')) {
    return `Feeling adventurous? 🌶️🔥\nLet's turn up the heat!\n\nHere are spots that'll light you up 👇`;
  }
  
  if (keywords.includes('healthy') || keywords.includes('light')) {
    return `Keeping it fresh and light! 🥗💚\nYour body will thank you for this.\n\nHere are my healthiest picks 👇`;
  }
  
  if (keywords.includes('sweet')) {
    return `Sweet tooth calling! 🍰🍫\nLife is short, eat dessert first!\n\nHere are my sweetest recommendations 👇`;
  }
  
  // Emotion-based responses
  switch (emotion) {
    case 'tired':
      return `Hey, I can tell you're running low on energy 🔋💙\nLet's get you something that'll recharge those batteries.\n\nHere's some comfort coming your way 👇`;
    case 'stressed':
      return `Take a deep breath... 💆✨\nFood is my favorite form of therapy.\n\nLet me find you something calming 👇`;
    case 'sad':
      return `Hey, sending you a warm foodie hug 🤗💛\nFood can't fix everything, but it helps!\n\nHere's some soul-soothing goodness 👇`;
    case 'happy':
      return `Love your energy today! 🌟🎉\nLet's celebrate with something delicious!\n\nHere are my top picks for you 👇`;
    case 'anxious':
      return `It's okay, let's find you something soothing 🌊💙\nGood food has a way of calming the mind.\n\nHere are some peaceful options 👇`;
    default:
      return `I've got just the thing for you! 🍽️✨\nLet me work my magic...\n\nHere are my recommendations 👇`;
  }
}
