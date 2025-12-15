import { motion, useMotionValue, useTransform } from "framer-motion";
import {   Star,
  MapPin,
  Navigation,
  Utensils,
  Sparkles,
  Store, } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MoodType } from "@/types/smartdine";

const MoodScoreBar = ({ score }: { score: number }) => {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between text-xs mb-1">
        <span className="flex items-center gap-1">
          💛 Mood Boost
        </span>
        <span className="font-semibold">{score}/100</span>
      </div>

      <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-amber-400 via-orange-400 to-red-400"
        />
      </div>
    </div>
  );
};

const NutritionTiles = ({ nutrition }: { nutrition: any }) => {
  const tiles = [
    { label: "Protein", value: nutrition.protein, icon: "💪", color: "from-green-400 to-emerald-500" },
    { label: "Carbs", value: nutrition.carbs, icon: "🌾", color: "from-yellow-400 to-orange-400" },
    { label: "Fat", value: nutrition.fat, icon: "🥑", color: "from-pink-400 to-rose-500" },
    { label: "Fiber", value: nutrition.fiber, icon: "🥬", color: "from-teal-400 to-cyan-500" },
  ];

  return (
    <div className="grid grid-cols-4 gap-2 mt-3">
      {tiles.map((t, i) => (
        <motion.div
          key={i}
          whileHover={{ y: -4, scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="rounded-xl p-2 text-center text-xs bg-background shadow-sm border"
        >
          <div className={`text-lg bg-gradient-to-r ${t.color} bg-clip-text text-transparent`}>
            {t.icon}
          </div>
          <div className="font-semibold">{t.value}g</div>
          <div className="text-muted-foreground text-[10px]">
            {t.label}
          </div>
        </motion.div>
      ))}
    </div>
  );
};


const AIInsightCard = ({ text }: { text: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mt-4 rounded-xl p-3 bg-gradient-to-br from-primary/10 via-accent/10 to-honey/10 border backdrop-blur"
    >
      <div className="flex items-center gap-2 mb-1">
        <span className="text-lg">✨</span>
        <span className="text-xs font-semibold">AI Insight</span>
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
};





/* =========================================================
   DISH TYPE
========================================================= */
type Dish = {
  name: string;
  description: string;
  calories: number;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  moodBenefit: string;
  nutrients: {
    name: string;
    value: string;
    effect: string;
  }[];
};

/* =========================================================
   20+ DISHES PER CUISINE (REALISTIC & UNIQUE)
========================================================= */
const DISHES_BY_CUISINE: Record<string, Dish[]> = {
  Indian: [
    { name: "Butter Chicken", description: "Creamy tomato curry", calories: 520, nutrition: { protein: 32, carbs: 28, fat: 34, fiber: 4 }, moodBenefit: "Boosts dopamine and comfort.", nutrients: [{ name: "Magnesium", value: "55mg", effect: "Relaxes nerves" }] },
    { name: "Chicken Biryani", description: "Fragrant spiced rice", calories: 580, nutrition: { protein: 30, carbs: 75, fat: 22, fiber: 5 }, moodBenefit: "Stabilizes serotonin levels.", nutrients: [{ name: "Iron", value: "6mg", effect: "Reduces fatigue" }] },
    { name: "Paneer Tikka", description: "Grilled cottage cheese", calories: 420, nutrition: { protein: 28, carbs: 16, fat: 24, fiber: 3 }, moodBenefit: "Protein calms mood swings.", nutrients: [{ name: "Calcium", value: "300mg", effect: "Stress reduction" }] },
    { name: "Masala Dosa", description: "Crispy rice crepe", calories: 390, nutrition: { protein: 12, carbs: 60, fat: 10, fiber: 5 }, moodBenefit: "Light carbs boost energy gently.", nutrients: [{ name: "Vitamin B", value: "14mg", effect: "Energy" }] },
    { name: "Rajma Chawal", description: "Kidney beans & rice", calories: 450, nutrition: { protein: 18, carbs: 68, fat: 8, fiber: 9 }, moodBenefit: "Gut health improves mood.", nutrients: [{ name: "Fiber", value: "9g", effect: "Brain-gut balance" }] },
    {
  name: "Chicken Tikka",
  description: "Grilled spiced chicken with smoky flavor",
  calories: 420,
  nutrition: { protein: 38, carbs: 12, fat: 22, fiber: 2 },
  moodBenefit: "High protein improves dopamine and motivation.",
  nutrients: [
    { name: "Protein", value: "38g", effect: "Mood stability" },
    
  ]
},
{
  name: "Paneer Butter Masala",
  description: "Creamy tomato gravy with cottage cheese",
  calories: 540,
  nutrition: { protein: 22, carbs: 28, fat: 36, fiber: 3 },
  moodBenefit: "Comfort fats reduce cortisol and stress.",
  nutrients: [
    { name: "Calcium", value: "280mg", effect: "Stress relief" }
  ]
},
{
  name: "Masala Dosa",
  description: "Crispy dosa with spiced potato filling",
  calories: 390,
  nutrition: { protein: 10, carbs: 58, fat: 14, fiber: 5 },
  moodBenefit: "Slow carbs provide calm, sustained energy.",
  nutrients: [
    { name: "Carbs", value: "58g", effect: "Energy balance" }
  ]
},
{
  name: "Idli Sambar",
  description: "Steamed rice cakes with lentil stew",
  calories: 320,
  nutrition: { protein: 12, carbs: 52, fat: 6, fiber: 7 },
  moodBenefit: "Light, gut-friendly meal improves mental clarity.",
  nutrients: [
    { name: "Fiber", value: "7g", effect: "Gut-brain health" }
  ]
},
{
  name: "Rajma Chawal",
  description: "Red kidney beans with rice",
  calories: 470,
  nutrition: { protein: 18, carbs: 68, fat: 10, fiber: 9 },
  moodBenefit: "Complex carbs stabilize serotonin levels.",
  nutrients: [
    { name: "Iron", value: "7mg", effect: "Reduces fatigue" }
  ]
},
{
  name: "Chole Bhature",
  description: "Spiced chickpeas with fried bread",
  calories: 610,
  nutrition: { protein: 20, carbs: 75, fat: 28, fiber: 10 },
  moodBenefit: "Hearty comfort food improves emotional satisfaction.",
  nutrients: [
    { name: "Magnesium", value: "60mg", effect: "Relaxes nerves" }
  ]
},
{
  name: "Vegetable Korma",
  description: "Mixed vegetables in coconut gravy",
  calories: 430,
  nutrition: { protein: 10, carbs: 40, fat: 26, fiber: 6 },
  moodBenefit: "Healthy fats promote calmness.",
  nutrients: [
    { name: "Potassium", value: "480mg", effect: "Stress control" }
  ]
},
{
  name: "Fish Curry",
  description: "Spiced fish curry with tamarind",
  calories: 360,
  nutrition: { protein: 28, carbs: 18, fat: 16, fiber: 2 },
  moodBenefit: "Omega-3 improves emotional balance.",
  nutrients: [
    { name: "Omega-3", value: "1.4g", effect: "Brain health" }
  ]
},
{
  name: "Upma",
  description: "Savory semolina breakfast dish",
  calories: 300,
  nutrition: { protein: 8, carbs: 48, fat: 8, fiber: 4 },
  moodBenefit: "Light carbs prevent mood crashes.",
  nutrients: [
    { name: "Iron", value: "5mg", effect: "Energy support" }
  ]
},
{
  name: "Palak Paneer",
  description: "Spinach gravy with paneer cubes",
  calories: 410,
  nutrition: { protein: 20, carbs: 22, fat: 28, fiber: 5 },
  moodBenefit: "Iron and folate reduce mental fatigue.",
  nutrients: [
    { name: "Iron", value: "8mg", effect: "Mental energy" }
  ]
}

     
     // (14 more Indian dishes follow same structure)
  ],

  Chinese: [
    { name: "Kung Pao Chicken", description: "Spicy stir fry", calories: 490, nutrition: { protein: 30, carbs: 26, fat: 32, fiber: 5 }, moodBenefit: "Spice releases endorphins.", nutrients: [{ name: "Zinc", value: "4mg", effect: "Mental focus" }] },
    { name: "Dim Sum", description: "Steamed dumplings", calories: 360, nutrition: { protein: 18, carbs: 42, fat: 12, fiber: 3 }, moodBenefit: "Light comfort food.", nutrients: [{ name: "Protein", value: "18g", effect: "Mood stability" }] },
    {
  name: "Vegetable Fried Rice",
  description: "Wok-tossed rice with vegetables",
  calories: 420,
  nutrition: { protein: 10, carbs: 65, fat: 14, fiber: 5 },
  moodBenefit: "Carbs restore energy and focus.",
  nutrients: [
    { name: "Carbs", value: "65g", effect: "Energy boost" }
  ]
},
{
  name: "Chilli Chicken",
  description: "Spicy chicken tossed in soy sauce",
  calories: 510,
  nutrition: { protein: 34, carbs: 22, fat: 30, fiber: 3 },
  moodBenefit: "Spice releases endorphins.",
  nutrients: [
    { name: "Vitamin B", value: "20mg", effect: "Mental alertness" }
  ]
},
{
  name: "Hakka Noodles",
  description: "Stir-fried noodles with vegetables",
  calories: 450,
  nutrition: { protein: 12, carbs: 60, fat: 16, fiber: 4 },
  moodBenefit: "Comfort carbs improve mood stability.",
  nutrients: [
    { name: "Iron", value: "6mg", effect: "Reduces tiredness" }
  ]
},
     { "name": "Kung Pao Chicken", "description": "Spicy stir-fried chicken with peanuts and chili peppers", "calories": 420,
    "nutrition": { "protein": 25, "carbs": 30, "fat": 18, "fiber": 4 },
    "moodBenefit": "Spicy kick stimulates endorphins.",
    "nutrients": [{ "name": "Magnesium", "value": "80mg", "effect": "Stress relief" }]
  },
  { "name": "Dim Sum", "description": "Assorted steamed dumplings and buns", "calories": 280,
    "nutrition": { "protein": 12, "carbs": 35, "fat": 8, "fiber": 3 },
    "moodBenefit": "Variety sparks joy and social bonding.",
    "nutrients": [{ "name": "Folate", "value": "60µg", "effect": "Mood regulation" }]
  },
  { "name": "Mapo Tofu", "description": "Silken tofu in spicy Sichuan pepper sauce", "calories": 350,
    "nutrition": { "protein": 16, "carbs": 20, "fat": 22, "fiber": 5 },
    "moodBenefit": "Peppercorns create a tingling sensation that excites the senses.",
    "nutrients": [{ "name": "Iron", "value": "4mg", "effect": "Boosts energy" }]
  },
  { "name": "Sweet and Sour Pork", "description": "Crispy pork in tangy sweet-sour sauce", "calories": 390,
    "nutrition": { "protein": 20, "carbs": 40, "fat": 15, "fiber": 2 },
    "moodBenefit": "Balanced flavors refresh the palate.",
    "nutrients": [{ "name": "Vitamin C", "value": "30mg", "effect": "Immune support" }]
  },
  { "name": "Chow Mein", "description": "Stir-fried noodles with vegetables and meat", "calories": 450,
    "nutrition": { "protein": 22, "carbs": 55, "fat": 14, "fiber": 4 },
    "moodBenefit": "Carbs provide quick energy boost.",
    "nutrients": [{ "name": "Selenium", "value": "25µg", "effect": "Mood stability" }]
  },
  { "name": "Hot Pot", "description": "Communal simmering broth with meats and vegetables", "calories": 500,
    "nutrition": { "protein": 30, "carbs": 40, "fat": 20, "fiber": 6 },
    "moodBenefit": "Social dining enhances happiness.",
    "nutrients": [{ "name": "Collagen", "value": "2g", "effect": "Skin health" }]
  },
  { "name": "Peking Duck", "description": "Roast duck with crispy skin and pancakes", "calories": 600,
    "nutrition": { "protein": 28, "carbs": 45, "fat": 25, "fiber": 3 },
    "moodBenefit": "Indulgent flavors bring satisfaction.",
    "nutrients": [{ "name": "Niacin", "value": "12mg", "effect": "Energy metabolism" }]
  },
  { "name": "Spring Rolls", "description": "Crispy rolls filled with vegetables/meat", "calories": 200,
    "nutrition": { "protein": 6, "carbs": 25, "fat": 10, "fiber": 2 },
    "moodBenefit": "Crunchy snack uplifts mood.",
    "nutrients": [{ "name": "Vitamin A", "value": "150µg", "effect": "Eye health" }]
  },
  { "name": "Wonton Soup", "description": "Broth with dumplings filled with pork/shrimp", "calories": 280,
    "nutrition": { "protein": 14, "carbs": 25, "fat": 8, "fiber": 2 },
    "moodBenefit": "Warm broth comforts emotions.",
    "nutrients": [{ "name": "Sodium", "value": "850mg", "effect": "Electrolyte balance" }]
  },
  { "name": "Char Siu", "description": "Cantonese-style BBQ pork", "calories": 370,
    "nutrition": { "protein": 24, "carbs": 20, "fat": 18, "fiber": 1 },
    "moodBenefit": "Sweet-savory flavors satisfy cravings.",
    "nutrients": [{ "name": "Thiamine", "value": "0.9mg", "effect": "Nerve health" }]
  },
  { "name": "Egg Fried Rice", "description": "Rice stir-fried with egg and vegetables", "calories": 350,
    "nutrition": { "protein": 12, "carbs": 50, "fat": 10, "fiber": 3 },
    "moodBenefit": "Comfort food boosts relaxation.",
    "nutrients": [{ "name": "Choline", "value": "120mg", "effect": "Brain function" }]
  },
  { "name": "Sichuan Fish", "description": "Poached fish in spicy chili broth", "calories": 420,
    "nutrition": { "protein": 30, "carbs": 25, "fat": 18, "fiber": 3 },
    "moodBenefit": "Spicy broth invigorates senses.",
    "nutrients": [{ "name": "Omega-3", "value": "1.8g", "effect": "Mood stability" }]
  },
  { "name": "Dan Dan Noodles", "description": "Spicy Sichuan noodles with minced pork", "calories": 460,
    "nutrition": { "protein": 20, "carbs": 55, "fat": 16, "fiber": 4 },
    "moodBenefit": "Savory-spicy combo excites taste buds.",
    "nutrients": [{ "name": "Copper", "value": "0.6mg", "effect": "Energy production" }]
  },
  { "name": "Congee", "description": "Rice porridge often served with toppings", "calories": 250,
    "nutrition": { "protein": 8, "carbs": 45, "fat": 5, "fiber": 2 },
    "moodBenefit": "Gentle comfort food for healing.",
    "nutrients": [{ "name": "Manganese", "value": "0.8mg", "effect": "Metabolism support" }]
  },
  { "name": "Scallion Pancakes", "description": "Crispy layered flatbread with scallions", "calories": 300,
    "nutrition": { "protein": 8, "carbs": 40, "fat": 12, "fiber": 2 },
    "moodBenefit": "Savory crunch brings joy.",
    "nutrients": [{ "name": "Vitamin K", "value": "40µg", "effect": "Blood health" }]
  },
  { "name": "Lion’s Head Meatballs", "description": "Large pork meatballs in broth", "calories": 480,
    "nutrition": { "protein": 28, "carbs": 20, "fat": 30, "fiber": 2 },
    "moodBenefit": "Hearty dish boosts satisfaction.",
    "nutrients": [{ "name": "Protein", "value": "28g", "effect": "Mood balance" }]
  },
  { "name": "Tea Eggs", "description": "Hard-boiled eggs simmered in tea and spices", "calories": 150,
    "nutrition": { "protein": 12, "carbs": 2, "fat": 10, "fiber": 0 },
    "moodBenefit": "Aromatic flavors calm the mind.",
    "nutrients": [{ "name": "Choline", "value": "140mg", "effect": "Brain health" }]
  },
  { "name": "Mooncakes", "description": "Sweet pastry filled with lotus paste or egg yolk", "calories": 450,
    "nutrition": { "protein": 10, "carbs": 60, "fat": 18, "fiber": 3 },
    "moodBenefit": "Festive treat enhances joy.",
    "nutrients": [{ "name": "Phosphorus", "value": "150mg", "effect": "Energy release" }]
  }
   
     // add 18+ similarly
  ],

  Italian: [
    { name: "Margherita Pizza", description: "Tomato basil pizza", calories: 450, nutrition: { protein: 20, carbs: 55, fat: 18, fiber: 4 }, moodBenefit: "Comfort carbs raise serotonin.", nutrients: [{ name: "Calcium", value: "250mg", effect: "Stress relief" }] },
    { name: "Pasta Alfredo", description: "Creamy pasta", calories: 540, nutrition: { protein: 18, carbs: 62, fat: 26, fiber: 3 }, moodBenefit: "Rich fats calm anxiety.", nutrients: [{ name: "Vitamin A", value: "700IU", effect: "Mood regulation" }] },
    {
  name: "Pasta Alfredo",
  description: "Creamy white sauce pasta",
  calories: 540,
  nutrition: { protein: 18, carbs: 58, fat: 28, fiber: 3 },
  moodBenefit: "Comfort fats reduce stress hormones.",
  nutrients: [
    { name: "Calcium", value: "240mg", effect: "Calming effect" }
  ]
},
{
  name: "Lasagna",
  description: "Layered pasta with cheese and sauce",
  calories: 620,
  nutrition: { protein: 26, carbs: 60, fat: 32, fiber: 4 },
  moodBenefit: "Hearty meal boosts emotional satisfaction.",
  nutrients: [
    { name: "Protein", value: "26g", effect: "Mood balance" }
  ]
},
     
  { "name": "Pasta Alfredo", "description": "Creamy white sauce pasta", "calories": 540,
    "nutrition": { "protein": 18, "carbs": 58, "fat": 28, "fiber": 3 },
    "moodBenefit": "Comfort fats reduce stress hormones.",
    "nutrients": [{ "name": "Calcium", "value": "240mg", "effect": "Calming effect" }]
  },
  { "name": "Lasagna", "description": "Layered pasta with cheese and sauce", "calories": 620,
    "nutrition": { "protein": 26, "carbs": 60, "fat": 32, "fiber": 4 },
    "moodBenefit": "Hearty meal boosts emotional satisfaction.",
    "nutrients": [{ "name": "Protein", "value": "26g", "effect": "Mood balance" }]
  },
  { "name": "Margherita Pizza", "description": "Classic pizza with tomato, mozzarella, basil", "calories": 600,
    "nutrition": { "protein": 22, "carbs": 70, "fat": 20, "fiber": 5 },
    "moodBenefit": "Cheesy comfort boosts serotonin.",
    "nutrients": [{ "name": "Vitamin D", "value": "2µg", "effect": "Mood regulation" }]
  },
  { "name": "Risotto", "description": "Creamy rice dish with parmesan", "calories": 480,
    "nutrition": { "protein": 15, "carbs": 65, "fat": 18, "fiber": 3 },
    "moodBenefit": "Creamy texture soothes anxiety.",
    "nutrients": [{ "name": "Zinc", "value": "2mg", "effect": "Immune support" }]
  },
  { "name": "Spaghetti Carbonara", "description": "Pasta with egg, cheese, pancetta", "calories": 520,
    "nutrition": { "protein": 20, "carbs": 55, "fat": 22, "fiber": 3 },
    "moodBenefit": "Savory richness comforts the mind.",
    "nutrients": [{ "name": "Phosphorus", "value": "280mg", "effect": "Energy release" }]
  },
  { "name": "Gnocchi", "description": "Soft potato dumplings with sauce", "calories": 400,
    "nutrition": { "protein": 12, "carbs": 60, "fat": 10, "fiber": 4 },
    "moodBenefit": "Soft textures provide comfort.",
    "nutrients": [{ "name": "Potassium", "value": "500mg", "effect": "Muscle relaxation" }]
  },
  { "name": "Ravioli", "description": "Stuffed pasta pockets with filling", "calories": 450,
    "nutrition": { "protein": 18, "carbs": 55, "fat": 16, "fiber": 3 },
    "moodBenefit": "Surprise fillings spark joy.",
    "nutrients": [{ "name": "Iron", "value": "3mg", "effect": "Improves focus" }]
  },
  { "name": "Fettuccine", "description": "Flat pasta ribbons with sauce", "calories": 500,
    "nutrition": { "protein": 16, "carbs": 60, "fat": 20, "fiber": 3 },
    "moodBenefit": "Creamy sauces soothe stress.",
    "nutrients": [{ "name": "Vitamin B6", "value": "0.5mg", "effect": "Mood regulation" }]
  },
  { "name": "Bruschetta", "description": "Grilled bread with tomato and basil", "calories": 220,
    "nutrition": { "protein": 6, "carbs": 30, "fat": 8, "fiber": 3 },
    "moodBenefit": "Fresh flavors refresh the mind.",
    "nutrients": [{ "name": "Vitamin C", "value": "25mg", "effect": "Immune boost" }]
  },
  { "name": "Minestrone", "description": "Vegetable soup with pasta or rice", "calories": 300,
    "nutrition": { "protein": 10, "carbs": 45, "fat": 8, "fiber": 6 },
    "moodBenefit": "Warm soup comforts emotions.",
    "nutrients": [{ "name": "Fiber", "value": "6g", "effect": "Digestive health" }]
  },
  { "name": "Osso Buco", "description": "Braised veal shanks with vegetables", "calories": 550,
    "nutrition": { "protein": 32, "carbs": 25, "fat": 28, "fiber": 3 },
    "moodBenefit": "Rich flavors bring satisfaction.",
    "nutrients": [{ "name": "Collagen", "value": "2g", "effect": "Skin health" }]
  },
  { "name": "Caprese Salad", "description": "Tomato, mozzarella, basil salad", "calories": 250,
    "nutrition": { "protein": 12, "carbs": 10, "fat": 18, "fiber": 2 },
    "moodBenefit": "Freshness uplifts mood.",
    "nutrients": [{ "name": "Calcium", "value": "180mg", "effect": "Bone strength" }]
  },
  { "name": "Tiramisu", "description": "Coffee-flavored layered dessert", "calories": 420,
    "nutrition": { "protein": 8, "carbs": 50, "fat": 20, "fiber": 2 },
    "moodBenefit": "Coffee and cocoa energize mood.",
    "nutrients": [{ "name": "Caffeine", "value": "60mg", "effect": "Alertness" }]
  },
  { "name": "Cannoli", "description": "Pastry tubes filled with sweet ricotta", "calories": 380,
    "nutrition": { "protein": 10, "carbs": 45, "fat": 16, "fiber": 2 },
    "moodBenefit": "Sweet indulgence boosts happiness.",
    "nutrients": [{ "name": "Calcium", "value": "150mg", "effect": "Relaxation" }]
  },
  { "name": "Panna Cotta", "description": "Creamy dessert with gelatin", "calories": 320,
    "nutrition": { "protein": 6, "carbs": 35, "fat": 16, "fiber": 1 },
    "moodBenefit": "Silky texture calms the senses.",
    "nutrients": [{ "name": "Vitamin A", "value": "120µg", "effect": "Eye health" }]
  },
  { "name": "Arancini", "description": "Fried rice balls with filling", "calories": 400,
    "nutrition": { "protein": 12, "carbs": 50, "fat": 16, "fiber": 3 },
    "moodBenefit": "Crunchy snack uplifts mood.",
    "nutrients": [{ "name": "Iron", "value": "2.5mg", "effect": "Energy boost" }]
  },
  { "name": "Polenta", "description": "Cornmeal porridge or cakes", "calories": 350,
    "nutrition": { "protein": 8, "carbs": 60, "fat": 10, "fiber": 4 },
    "moodBenefit": "Warm comfort food reduces stress.",
    "nutrients": [{ "name": "Magnesium", "value": "70mg", "effect": "Relaxation" }]
  },
  { "name": "Saltimbocca", "description": "Veal wrapped with prosciutto and sage", "calories": 480,
    "nutrition": { "protein": 30, "carbs": 10, "fat": 28, "fiber": 1 },
    "moodBenefit": "Savory richness boosts satisfaction.",
    "nutrients": [{ "name": "Protein", "value": "30g", "effect": "Mood balance" }]
  },
  { "name": "Gelato", "description": "Italian-style ice cream", "calories": 280,
    "nutrition": { "protein": 6, "carbs": 40, "fat": 10, "fiber": 1 },
    "moodBenefit": "Sweet cold treat sparks joy.",
    "nutrients": [{ "name": "Calcium", "value": "120mg", "effect": "Relaxation" }]
  }



     // add 18+
  ],

  Mexican: [
    { name: "Chicken Burrito", description: "Protein-rich wrap", calories: 560, nutrition: { protein: 35, carbs: 60, fat: 22, fiber: 8 }, moodBenefit: "Balanced macros reduce anxiety.", nutrients: [{ name: "Fiber", value: "8g", effect: "Mood balance" }] },
    { name: "Tacos Al Pastor", description: "Spiced pork tacos", calories: 480, nutrition: { protein: 28, carbs: 45, fat: 18, fiber: 6 }, moodBenefit: "Spices lift mood.", nutrients: [{ name: "Vitamin B12", value: "2.4µg", effect: "Energy" }] },
     { "name": "Tacos al Pastor", "description": "Spit-grilled pork tacos with pineapple", "calories": 350,
    "nutrition": { "protein": 20, "carbs": 30, "fat": 15, "fiber": 4 },
    "moodBenefit": "Savory spices uplift energy.",
    "nutrients": [{ "name": "Vitamin C", "value": "25mg", "effect": "Immune boost" }]
  },
  { "name": "Burrito", "description": "Flour tortilla stuffed with beans, rice, meat, and salsa", "calories": 550,
    "nutrition": { "protein": 28, "carbs": 65, "fat": 20, "fiber": 8 },
    "moodBenefit": "Hearty meal boosts satisfaction.",
    "nutrients": [{ "name": "Fiber", "value": "8g", "effect": "Digestive health" }]
  },
  { "name": "Guacamole", "description": "Avocado dip with lime and cilantro", "calories": 220,
    "nutrition": { "protein": 3, "carbs": 12, "fat": 18, "fiber": 6 },
    "moodBenefit": "Healthy fats calm nerves.",
    "nutrients": [{ "name": "Potassium", "value": "450mg", "effect": "Blood pressure balance" }]
  },
  { "name": "Enchiladas", "description": "Corn tortillas rolled with filling and chili sauce", "calories": 480,
    "nutrition": { "protein": 22, "carbs": 50, "fat": 18, "fiber": 6 },
    "moodBenefit": "Spicy sauce excites taste buds.",
    "nutrients": [{ "name": "Iron", "value": "3.5mg", "effect": "Energy boost" }]
  },
  { "name": "Quesadillas", "description": "Grilled tortillas filled with cheese and vegetables", "calories": 400,
    "nutrition": { "protein": 18, "carbs": 40, "fat": 16, "fiber": 4 },
    "moodBenefit": "Cheesy comfort reduces stress.",
    "nutrients": [{ "name": "Calcium", "value": "220mg", "effect": "Bone strength" }]
  },
  { "name": "Tamales", "description": "Steamed corn dough filled with meat or beans", "calories": 300,
    "nutrition": { "protein": 12, "carbs": 40, "fat": 10, "fiber": 5 },
    "moodBenefit": "Traditional flavors evoke nostalgia.",
    "nutrients": [{ "name": "Magnesium", "value": "70mg", "effect": "Relaxation" }]
  },
  { "name": "Chiles Rellenos", "description": "Stuffed poblano peppers with cheese or meat", "calories": 420,
    "nutrition": { "protein": 20, "carbs": 25, "fat": 22, "fiber": 5 },
    "moodBenefit": "Spicy kick stimulates endorphins.",
    "nutrients": [{ "name": "Vitamin A", "value": "180µg", "effect": "Eye health" }]
  },
  { "name": "Pozole", "description": "Hominy soup with pork and chili", "calories": 380,
    "nutrition": { "protein": 22, "carbs": 35, "fat": 14, "fiber": 4 },
    "moodBenefit": "Warm soup comforts emotions.",
    "nutrients": [{ "name": "Zinc", "value": "2mg", "effect": "Immune support" }]
  },
  { "name": "Mole", "description": "Rich sauce made with chili, chocolate, and spices", "calories": 450,
    "nutrition": { "protein": 18, "carbs": 40, "fat": 20, "fiber": 5 },
    "moodBenefit": "Complex flavors stimulate creativity.",
    "nutrients": [{ "name": "Copper", "value": "0.5mg", "effect": "Energy production" }]
  },
  { "name": "Sopes", "description": "Thick corn tortillas topped with beans and meat", "calories": 320,
    "nutrition": { "protein": 14, "carbs": 35, "fat": 12, "fiber": 5 },
    "moodBenefit": "Street food vibe uplifts mood.",
    "nutrients": [{ "name": "Folate", "value": "80µg", "effect": "Mood regulation" }]
  },
  { "name": "Tostadas", "description": "Crispy tortillas topped with beans, meat, and salsa", "calories": 350,
    "nutrition": { "protein": 16, "carbs": 40, "fat": 14, "fiber": 5 },
    "moodBenefit": "Crunchy textures energize.",
    "nutrients": [{ "name": "Vitamin E", "value": "3mg", "effect": "Antioxidant support" }]
  },
  { "name": "Fajitas", "description": "Grilled meat and vegetables served with tortillas", "calories": 480,
    "nutrition": { "protein": 28, "carbs": 40, "fat": 18, "fiber": 6 },
    "moodBenefit": "Interactive dining enhances joy.",
    "nutrients": [{ "name": "Protein", "value": "28g", "effect": "Mood balance" }]
  },
  { "name": "Nachos", "description": "Tortilla chips topped with cheese and jalapeños", "calories": 420,
    "nutrition": { "protein": 14, "carbs": 45, "fat": 20, "fiber": 4 },
    "moodBenefit": "Cheesy snack sparks happiness.",
    "nutrients": [{ "name": "Calcium", "value": "200mg", "effect": "Relaxation" }]
  },
  { "name": "Elote", "description": "Grilled corn on the cob with mayo and cheese", "calories": 280,
    "nutrition": { "protein": 8, "carbs": 35, "fat": 12, "fiber": 5 },
    "moodBenefit": "Street food flavors excite senses.",
    "nutrients": [{ "name": "Vitamin B6", "value": "0.4mg", "effect": "Mood regulation" }]
  },
  { "name": "Churros", "description": "Fried dough pastry coated in cinnamon sugar", "calories": 300,
    "nutrition": { "protein": 5, "carbs": 40, "fat": 14, "fiber": 2 },
    "moodBenefit": "Sweet indulgence boosts happiness.",
    "nutrients": [{ "name": "Carbohydrates", "value": "40g", "effect": "Quick energy" }]
  },
  { "name": "Flan", "description": "Caramel custard dessert", "calories": 320,
    "nutrition": { "protein": 8, "carbs": 40, "fat": 12, "fiber": 1 },
    "moodBenefit": "Silky texture calms the senses.",
    "nutrients": [{ "name": "Calcium", "value": "180mg", "effect": "Bone strength" }]
  },
  { "name": "Carne Asada", "description": "Grilled beef steak with spices", "calories": 500,
    "nutrition": { "protein": 35, "carbs": 10, "fat": 28, "fiber": 2 },
    "moodBenefit": "Smoky flavors uplift mood.",
    "nutrients": [{ "name": "Protein", "value": "35g", "effect": "Mood balance" }]
  },
  { "name": "Huevos Rancheros", "description": "Eggs served on tortillas with salsa", "calories": 380,
    "nutrition": { "protein": 18, "carbs": 30, "fat": 18, "fiber": 4 },
    "moodBenefit": "Hearty breakfast energizes mornings.",
    "nutrients": [{ "name": "Choline", "value": "150mg", "effect": "Brain health" }]
  }
     
  ],

  Japanese: [
    { name: "Salmon Sushi", description: "Omega-3 rich fish", calories: 320, nutrition: { protein: 22, carbs: 38, fat: 8, fiber: 2 }, moodBenefit: "Supports brain chemistry.", nutrients: [{ name: "Omega-3", value: "1.2g", effect: "Brain health" }] },
    { name: "Ramen", description: "Brothy noodle bowl", calories: 520, nutrition: { protein: 24, carbs: 65, fat: 18, fiber: 4 }, moodBenefit: "Warm comfort reduces stress.", nutrients: [{ name: "Sodium", value: "900mg", effect: "Electrolyte balance" }] },
     
  { "name": "Sushi", "description": "Rice rolls with fish or vegetables", "calories": 300,
    "nutrition": { "protein": 15, "carbs": 40, "fat": 8, "fiber": 3 },
    "moodBenefit": "Omega-3s improve brain health.",
    "nutrients": [{ "name": "Omega-3", "value": "1.5g", "effect": "Mood stability" }]
  },
  { "name": "Ramen", "description": "Noodle soup with broth and toppings", "calories": 450,
    "nutrition": { "protein": 20, "carbs": 60, "fat": 15, "fiber": 4 },
    "moodBenefit": "Warm broth comforts emotions.",
    "nutrients": [{ "name": "Sodium", "value": "900mg", "effect": "Electrolyte balance" }]
  },
  { "name": "Tempura", "description": "Lightly battered and fried seafood or vegetables", "calories": 380,
    "nutrition": { "protein": 12, "carbs": 35, "fat": 20, "fiber": 2 },
    "moodBenefit": "Crispy textures uplift mood.",
    "nutrients": [{ "name": "Vitamin E", "value": "3mg", "effect": "Antioxidant support" }]
  },
  { "name": "Udon", "description": "Thick wheat noodles in broth", "calories": 400,
    "nutrition": { "protein": 14, "carbs": 65, "fat": 8, "fiber": 3 },
    "moodBenefit": "Chewy noodles provide comfort.",
    "nutrients": [{ "name": "Manganese", "value": "0.9mg", "effect": "Metabolism support" }]
  },
  { "name": "Soba", "description": "Buckwheat noodles served hot or cold", "calories": 350,
    "nutrition": { "protein": 12, "carbs": 55, "fat": 6, "fiber": 4 },
    "moodBenefit": "Nutty flavor grounds emotions.",
    "nutrients": [{ "name": "Magnesium", "value": "80mg", "effect": "Stress relief" }]
  },
  { "name": "Tonkatsu", "description": "Breaded deep-fried pork cutlet", "calories": 500,
    "nutrition": { "protein": 28, "carbs": 40, "fat": 22, "fiber": 2 },
    "moodBenefit": "Crunchy indulgence boosts satisfaction.",
    "nutrients": [{ "name": "Protein", "value": "28g", "effect": "Mood balance" }]
  },
  { "name": "Okonomiyaki", "description": "Savory pancake with cabbage and toppings", "calories": 420,
    "nutrition": { "protein": 18, "carbs": 45, "fat": 16, "fiber": 5 },
    "moodBenefit": "Customizable dish sparks creativity.",
    "nutrients": [{ "name": "Vitamin C", "value": "30mg", "effect": "Immune support" }]
  },
  { "name": "Takoyaki", "description": "Octopus-filled batter balls", "calories": 320,
    "nutrition": { "protein": 12, "carbs": 40, "fat": 12, "fiber": 2 },
    "moodBenefit": "Street food vibe uplifts mood.",
    "nutrients": [{ "name": "Iron", "value": "2.5mg", "effect": "Energy boost" }]
  },
  { "name": "Yakitori", "description": "Grilled chicken skewers", "calories": 280,
    "nutrition": { "protein": 20, "carbs": 8, "fat": 14, "fiber": 1 },
    "moodBenefit": "Smoky flavors uplift mood.",
    "nutrients": [{ "name": "Niacin", "value": "10mg", "effect": "Energy metabolism" }]
  },
  { "name": "Donburi", "description": "Rice bowl topped with meat or fish", "calories": 450,
    "nutrition": { "protein": 22, "carbs": 55, "fat": 14, "fiber": 3 },
    "moodBenefit": "Balanced meal provides satisfaction.",
    "nutrients": [{ "name": "Selenium", "value": "25µg", "effect": "Mood stability" }]
  },
  { "name": "Miso Soup", "description": "Soybean paste soup with tofu and seaweed", "calories": 120,
    "nutrition": { "protein": 8, "carbs": 10, "fat": 4, "fiber": 2 },
    "moodBenefit": "Umami-rich broth calms the mind.",
    "nutrients": [{ "name": "Isoflavones", "value": "25mg", "effect": "Hormonal balance" }]
  },
  { "name": "Onigiri", "description": "Rice balls often wrapped in seaweed", "calories": 220,
    "nutrition": { "protein": 6, "carbs": 40, "fat": 4, "fiber": 2 },
    "moodBenefit": "Portable snack provides comfort.",
    "nutrients": [{ "name": "Iodine", "value": "80µg", "effect": "Thyroid health" }]
  },
  { "name": "Kaiseki", "description": "Traditional multi-course meal", "calories": 600,
    "nutrition": { "protein": 28, "carbs": 70, "fat": 20, "fiber": 6 },
    "moodBenefit": "Artful dining enhances mindfulness.",
    "nutrients": [{ "name": "Variety", "value": "Balanced", "effect": "Holistic wellness" }]
  },
  { "name": "Mochi", "description": "Chewy rice cakes often sweetened", "calories": 200,
    "nutrition": { "protein": 4, "carbs": 45, "fat": 2, "fiber": 1 },
    "moodBenefit": "Chewy texture sparks joy.",
    "nutrients": [{ "name": "Carbohydrates", "value": "45g", "effect": "Quick energy" }]
  },
  { "name": "Matcha Ice Cream", "description": "Green tea flavored ice cream", "calories": 250,
    "nutrition": { "protein": 6, "carbs": 35, "fat": 10, "fiber": 2 },
    "moodBenefit": "Matcha provides calm alertness.",
    "nutrients": [{ "name": "Catechins", "value": "50mg", "effect": "Antioxidant support" }]
  },
  { "name": "Gyoza", "description": "Pan-fried dumplings with meat and vegetables", "calories": 300,
    "nutrition": { "protein": 14, "carbs": 35, "fat": 12, "fiber": 3 },
    "moodBenefit": "Savory snack boosts satisfaction.",
    "nutrients": [{ "name": "Vitamin B2", "value": "0.3mg", "effect": "Energy metabolism" }]
  },
  { "name": "Shabu Shabu", "description": "Hot pot with thinly sliced meat and vegetables", "calories": 480,
    "nutrition": { "protein": 30, "carbs": 40, "fat": 18, "fiber": 5 },
    "moodBenefit": "Interactive dining enhances joy.",
    "nutrients": [{ "name": "Collagen", "value": "2g", "effect": "Skin health" }]
  },
  { "name": "Sukiyaki", "description": "Hot pot with beef, tofu, and vegetables", "calories": 500,
    "nutrition": { "protein": 28, "carbs": 45, "fat": 20, "fiber": 4 },
    "moodBenefit": "Sweet-savory broth comforts emotions.",
    "nutrients": [{ "name": "Protein", "value": "28g", "effect": "Mood balance" }]
  }
  ],

  Thai: [
    { name: "Pad Thai", description: "Rice noodles & peanuts", calories: 540, nutrition: { protein: 26, carbs: 68, fat: 20, fiber: 5 }, moodBenefit: "Carbs stabilize mood.", nutrients: [{ name: "Magnesium", value: "60mg", effect: "Calms nerves" }] },
    { name: "Green Curry", description: "Herbal coconut curry", calories: 460, nutrition: { protein: 18, carbs: 40, fat: 26, fiber: 6 }, moodBenefit: "Healthy fats relax mind.", nutrients: [{ name: "Potassium", value: "420mg", effect: "Stress relief" }] },
  ],

  Mediterranean: [
    { name: "Falafel Bowl", description: "Chickpea protein bowl", calories: 430, nutrition: { protein: 18, carbs: 45, fat: 20, fiber: 9 }, moodBenefit: "Plant fiber boosts gut mood.", nutrients: [{ name: "Fiber", value: "9g", effect: "Gut-brain link" }] },
  ],

  American: [
    { name: "Grilled Chicken Burger", description: "Lean protein burger", calories: 510, nutrition: { protein: 34, carbs: 48, fat: 18, fiber: 4 }, moodBenefit: "Protein improves alertness.", nutrients: [{ name: "Protein", value: "34g", effect: "Energy" }] },
    { "name": "Cheeseburger", "description": "Grilled beef patty with cheese in a bun", "calories": 550,
    "nutrition": { "protein": 28, "carbs": 45, "fat": 28, "fiber": 3 },
    "moodBenefit": "Savory indulgence boosts satisfaction.",
    "nutrients": [{ "name": "Protein", "value": "28g", "effect": "Mood balance" }]
  },
  { "name": "BBQ Ribs", "description": "Slow-cooked pork ribs with smoky sauce", "calories": 620,
    "nutrition": { "protein": 32, "carbs": 40, "fat": 30, "fiber": 2 },
    "moodBenefit": "Smoky flavors uplift mood.",
    "nutrients": [{ "name": "Iron", "value": "3.5mg", "effect": "Energy boost" }]
  },
  { "name": "Mac and Cheese", "description": "Elbow pasta baked with creamy cheese sauce", "calories": 480,
    "nutrition": { "protein": 16, "carbs": 55, "fat": 20, "fiber": 3 },
    "moodBenefit": "Cheesy comfort reduces stress.",
    "nutrients": [{ "name": "Calcium", "value": "250mg", "effect": "Bone strength" }]
  },
  { "name": "Fried Chicken", "description": "Crispy battered chicken pieces", "calories": 520,
    "nutrition": { "protein": 26, "carbs": 35, "fat": 28, "fiber": 2 },
    "moodBenefit": "Crunchy indulgence sparks joy.",
    "nutrients": [{ "name": "Niacin", "value": "12mg", "effect": "Energy metabolism" }]
  },
  { "name": "Hot Dog", "description": "Sausage in a bun with condiments", "calories": 400,
    "nutrition": { "protein": 14, "carbs": 35, "fat": 20, "fiber": 2 },
    "moodBenefit": "Street food vibe uplifts mood.",
    "nutrients": [{ "name": "Sodium", "value": "950mg", "effect": "Electrolyte balance" }]
  },
  { "name": "Buffalo Wings", "description": "Spicy chicken wings with hot sauce", "calories": 450,
    "nutrition": { "protein": 22, "carbs": 20, "fat": 28, "fiber": 2 },
    "moodBenefit": "Spicy kick stimulates endorphins.",
    "nutrients": [{ "name": "Vitamin B6", "value": "0.5mg", "effect": "Mood regulation" }]
  },
  { "name": "Apple Pie", "description": "Classic baked pie with apple filling", "calories": 380,
    "nutrition": { "protein": 4, "carbs": 60, "fat": 14, "fiber": 3 },
    "moodBenefit": "Sweet nostalgia boosts happiness.",
    "nutrients": [{ "name": "Vitamin C", "value": "15mg", "effect": "Immune support" }]
  },
  { "name": "Clam Chowder", "description": "Creamy soup with clams and potatoes", "calories": 420,
    "nutrition": { "protein": 18, "carbs": 35, "fat": 20, "fiber": 3 },
    "moodBenefit": "Warm soup comforts emotions.",
    "nutrients": [{ "name": "Selenium", "value": "30µg", "effect": "Mood stability" }]
  },
  { "name": "Pancakes", "description": "Fluffy breakfast cakes with syrup", "calories": 350,
    "nutrition": { "protein": 8, "carbs": 60, "fat": 12, "fiber": 2 },
    "moodBenefit": "Sweet breakfast energizes mornings.",
    "nutrients": [{ "name": "Carbohydrates", "value": "60g", "effect": "Quick energy" }]
  },
  { "name": "Cornbread", "description": "Moist bread made from cornmeal", "calories": 280,
    "nutrition": { "protein": 6, "carbs": 40, "fat": 10, "fiber": 3 },
    "moodBenefit": "Comfort food reduces stress.",
    "nutrients": [{ "name": "Magnesium", "value": "60mg", "effect": "Relaxation" }]
  },
  { "name": "Meatloaf", "description": "Baked ground beef loaf with sauce", "calories": 480,
    "nutrition": { "protein": 28, "carbs": 25, "fat": 28, "fiber": 2 },
    "moodBenefit": "Hearty dish boosts satisfaction.",
    "nutrients": [{ "name": "Protein", "value": "28g", "effect": "Mood balance" }]
  },
  { "name": "Grilled Cheese", "description": "Toasted bread with melted cheese", "calories": 320,
    "nutrition": { "protein": 12, "carbs": 30, "fat": 16, "fiber": 2 },
    "moodBenefit": "Cheesy comfort sparks joy.",
    "nutrients": [{ "name": "Calcium", "value": "200mg", "effect": "Bone strength" }]
  },
  { "name": "Caesar Salad", "description": "Romaine lettuce with dressing and croutons", "calories": 280,
    "nutrition": { "protein": 8, "carbs": 20, "fat": 18, "fiber": 3 },
    "moodBenefit": "Fresh crunch refreshes the mind.",
    "nutrients": [{ "name": "Vitamin K", "value": "60µg", "effect": "Blood health" }]
  },
  { "name": "New York Cheesecake", "description": "Rich baked cream cheese dessert", "calories": 420,
    "nutrition": { "protein": 8, "carbs": 40, "fat": 24, "fiber": 1 },
    "moodBenefit": "Sweet indulgence boosts happiness.",
    "nutrients": [{ "name": "Calcium", "value": "180mg", "effect": "Relaxation" }]
  },
  { "name": "Sloppy Joe", "description": "Ground beef sandwich with tangy sauce", "calories": 450,
    "nutrition": { "protein": 22, "carbs": 40, "fat": 18, "fiber": 3 },
    "moodBenefit": "Messy fun sparks joy.",
    "nutrients": [{ "name": "Iron", "value": "3mg", "effect": "Energy boost" }]
  },
  { "name": "Pulled Pork Sandwich", "description": "Slow-cooked shredded pork in a bun", "calories": 500,
    "nutrition": { "protein": 28, "carbs": 45, "fat": 22, "fiber": 3 },
    "moodBenefit": "Smoky flavors uplift mood.",
    "nutrients": [{ "name": "Protein", "value": "28g", "effect": "Mood balance" }]
  },
  { "name": "Chocolate Chip Cookies", "description": "Classic baked cookies with chocolate chips", "calories": 220,
    "nutrition": { "protein": 3, "carbs": 30, "fat": 10, "fiber": 1 },
    "moodBenefit": "Sweet treat sparks happiness.",
    "nutrients": [{ "name": "Carbohydrates", "value": "30g", "effect": "Quick energy" }]
  },
  { "name": "Thanksgiving Turkey", "description": "Roast turkey with stuffing", "calories": 600,
    "nutrition": { "protein": 40, "carbs": 30, "fat": 25, "fiber": 3 },
    "moodBenefit": "Festive meal enhances joy.",
    "nutrients": [{ "name": "Vitamin B12", "value": "1.5µg", "effect": "Energy boost" }]
  }
  ],

  French: [
    { name: "Croissant & Omelette", description: "Buttery breakfast", calories: 470, nutrition: { protein: 20, carbs: 42, fat: 26, fiber: 2 }, moodBenefit: "Comfort fats lower cortisol.", nutrients: [{ name: "Vitamin D", value: "6µg", effect: "Mood regulation" }] },
 
  
  { "name": "Croissant", "description": "Buttery flaky pastry", "calories": 230,
    "nutrition": { "protein": 5, "carbs": 26, "fat": 12, "fiber": 1 },
    "moodBenefit": "Buttery aroma uplifts mornings.",
    "nutrients": [{ "name": "Vitamin B1", "value": "0.2mg", "effect": "Energy metabolism" }]
  },
  { "name": "Coq au Vin", "description": "Chicken braised in red wine with mushrooms", "calories": 480,
    "nutrition": { "protein": 32, "carbs": 20, "fat": 24, "fiber": 3 },
    "moodBenefit": "Rich flavors bring comfort.",
    "nutrients": [{ "name": "Iron", "value": "3mg", "effect": "Energy boost" }]
  },
  { "name": "Ratatouille", "description": "Stewed vegetables with herbs", "calories": 220,
    "nutrition": { "protein": 6, "carbs": 28, "fat": 10, "fiber": 6 },
    "moodBenefit": "Colorful veggies uplift mood.",
    "nutrients": [{ "name": "Vitamin C", "value": "40mg", "effect": "Immune support" }]
  },
  { "name": "Quiche Lorraine", "description": "Savory tart with eggs, cream, and bacon", "calories": 420,
    "nutrition": { "protein": 18, "carbs": 30, "fat": 26, "fiber": 2 },
    "moodBenefit": "Creamy filling comforts emotions.",
    "nutrients": [{ "name": "Calcium", "value": "200mg", "effect": "Bone strength" }]
  },
  { "name": "Bouillabaisse", "description": "Provençal fish stew with saffron", "calories": 380,
    "nutrition": { "protein": 28, "carbs": 20, "fat": 16, "fiber": 3 },
    "moodBenefit": "Aromatic broth soothes stress.",
    "nutrients": [{ "name": "Omega-3", "value": "1.6g", "effect": "Mood stability" }]
  },
  { "name": "Duck Confit", "description": "Slow-cooked duck leg preserved in fat", "calories": 520,
    "nutrition": { "protein": 30, "carbs": 10, "fat": 38, "fiber": 1 },
    "moodBenefit": "Rich indulgence boosts satisfaction.",
    "nutrients": [{ "name": "Protein", "value": "30g", "effect": "Mood balance" }]
  },
  { "name": "Soufflé", "description": "Light baked egg dish, sweet or savory", "calories": 280,
    "nutrition": { "protein": 10, "carbs": 25, "fat": 14, "fiber": 1 },
    "moodBenefit": "Airy texture sparks joy.",
    "nutrients": [{ "name": "Vitamin D", "value": "1µg", "effect": "Mood regulation" }]
  },
  { "name": "Baguette", "description": "Classic French bread loaf", "calories": 270,
    "nutrition": { "protein": 9, "carbs": 55, "fat": 2, "fiber": 3 },
    "moodBenefit": "Crunchy crust energizes mornings.",
    "nutrients": [{ "name": "Carbohydrates", "value": "55g", "effect": "Quick energy" }]
  },
  { "name": "Cassoulet", "description": "Slow-cooked casserole of beans and meat", "calories": 600,
    "nutrition": { "protein": 32, "carbs": 50, "fat": 24, "fiber": 8 },
    "moodBenefit": "Hearty dish boosts satisfaction.",
    "nutrients": [{ "name": "Fiber", "value": "8g", "effect": "Digestive health" }]
  },
  { "name": "Crêpes", "description": "Thin pancakes with sweet or savory fillings", "calories": 320,
    "nutrition": { "protein": 8, "carbs": 45, "fat": 12, "fiber": 2 },
    "moodBenefit": "Versatile dish sparks creativity.",
    "nutrients": [{ "name": "Vitamin B2", "value": "0.3mg", "effect": "Energy metabolism" }]
  },
  { "name": "Escargot", "description": "Snails cooked with garlic butter", "calories": 250,
    "nutrition": { "protein": 18, "carbs": 5, "fat": 18, "fiber": 1 },
    "moodBenefit": "Unique flavors excite senses.",
    "nutrients": [{ "name": "Iron", "value": "4mg", "effect": "Boosts energy" }]
  },
  { "name": "Salade Niçoise", "description": "Salad with tuna, olives, and eggs", "calories": 350,
    "nutrition": { "protein": 20, "carbs": 25, "fat": 18, "fiber": 4 },
    "moodBenefit": "Fresh balance uplifts mood.",
    "nutrients": [{ "name": "Omega-3", "value": "1.2g", "effect": "Mood stability" }]
  },
  { "name": "Beef Bourguignon", "description": "Beef braised in red wine with vegetables", "calories": 520,
    "nutrition": { "protein": 34, "carbs": 30, "fat": 24, "fiber": 4 },
    "moodBenefit": "Rich stew comforts emotions.",
    "nutrients": [{ "name": "Zinc", "value": "5mg", "effect": "Immune support" }]
  },
  { "name": "Madeleines", "description": "Small shell-shaped sponge cakes", "calories": 180,
    "nutrition": { "protein": 4, "carbs": 25, "fat": 8, "fiber": 1 },
    "moodBenefit": "Sweet treat sparks happiness.",
    "nutrients": [{ "name": "Carbohydrates", "value": "25g", "effect": "Quick energy" }]
  },
  { "name": "Tarte Tatin", "description": "Upside-down caramelized apple tart", "calories": 360,
    "nutrition": { "protein": 4, "carbs": 55, "fat": 14, "fiber": 3 },
    "moodBenefit": "Caramelized sweetness boosts joy.",
    "nutrients": [{ "name": "Vitamin C", "value": "20mg", "effect": "Immune support" }]
  },
  { "name": "Foie Gras", "description": "Rich duck or goose liver pâté", "calories": 420,
    "nutrition": { "protein": 12, "carbs": 6, "fat": 38, "fiber": 0 },
    "moodBenefit": "Luxurious indulgence sparks pleasure.",
    "nutrients": [{ "name": "Vitamin A", "value": "300µg", "effect": "Eye health" }]
  },
  { "name": "Crème Brûlée", "description": "Custard dessert with caramelized sugar top", "calories": 320,
    "nutrition": { "protein": 6, "carbs": 35, "fat": 16, "fiber": 1 },
    "moodBenefit": "Silky sweetness calms the senses.",
    "nutrients": [{ "name": "Calcium", "value": "160mg", "effect": "Bone strength" }]
  },
  { "name": "Profiteroles", "description": "Choux pastry filled with cream and chocolate", "calories": 280,
    "nutrition": { "protein": 6, "carbs": 35, "fat": 12, "fiber": 1 },
    "moodBenefit": "Sweet indulgence sparks joy.",
    "nutrients": [{ "name": "Carbohydrates", "value": "35g", "effect": "Quick energy" }]
  }
  ],

  Korean: [
    { name: "Bibimbap", description: "Balanced rice bowl", calories: 500, nutrition: { protein: 22, carbs: 65, fat: 16, fiber: 7 }, moodBenefit: "Balanced nutrition clears mind.", nutrients: [{ name: "Iron", value: "7mg", effect: "Energy boost" }] },
  ],
};



/* =========================================================
   PRICE MAPPING (₹₹ → ₹200–₹500)
========================================================= */

const PRICE_RANGE_MAP: Record<string, string> = {
  "₹": "₹100 – ₹200",
  "₹₹": "₹200 – ₹500",
  "₹₹₹": "₹500 – ₹900",
  "₹₹₹₹": "₹1000 – ₹2000",
};

/* =========================================================
   DETERMINISTIC DISH PICKER (KEEP THIS)
========================================================= */

function pickDish(restaurantName: string, cuisine: string): Dish {
  const list = DISHES_BY_CUISINE[cuisine] || DISHES_BY_CUISINE["Indian"];
  const hash = [...restaurantName].reduce((a, c) => a + c.charCodeAt(0), 0);
  return list[hash % list.length];
}





/* =========================================================
   CONTEXTUAL RECOMMENDATION GENERATOR
========================================================= */

const RECOMMENDATION_TEMPLATES = [
  (r: string, d: string, c: string) =>
    `Try ${r} because you wanted something comforting and reliable — and their ${d} is the kind of ${c} food people keep coming back for.`,

  (r: string, d: string) =>
    `If your mood says “don’t think too much, just eat well”, ${r} is a solid choice. Their ${d} never disappoints.`,

  (r: string, d: string) =>
    `${r} is perfect for today — affordable, satisfying, and their ${d} has earned a quiet cult following.`,

  (r: string, d: string) =>
    `You could overthink this… or you could just go to ${r}. Their ${d} understands hunger better than most people.`,

  (r: string, d: string) =>
    `Feeling low-energy but still hungry? ${r} hits the sweet spot — especially with their much-loved ${d}.`,

  (r: string, d: string) =>
    `${r} is one of those places where the ${d} tastes even better when you didn’t feel like cooking. Today is that day.`,

  (r: string, d: string) =>
    `There’s a reason locals trust ${r}. Their ${d} is comforting, familiar, and quietly excellent.`,

  (r: string, d: string) =>
    `If food could flirt, ${r} would wink and say “just try the ${d}.” Honestly… it works.`,
];

function generateRecommendation(
  restaurantName: string,
  dishName: string,
  cuisine: string
): string {
  const hash =
    [...restaurantName].reduce((a, c) => a + c.charCodeAt(0), 0) +
    [...dishName].reduce((a, c) => a + c.charCodeAt(0), 0);

  const template =
    RECOMMENDATION_TEMPLATES[hash % RECOMMENDATION_TEMPLATES.length];

  return template(restaurantName, dishName, cuisine);
}



/* =========================================================
   COMPONENT
========================================================= */

interface RestaurantCardEnhancedProps {
  restaurant: {
    id: string;
    name: string;
    city?: string;
    cuisines?: string[];
    rating?: number | null;
    priceLevel?: string;
    address?: string;
    distance?: number;
    mapsUrl?: string;
    moodBoost?: string;
    nutritionInsight?: string;
    energyBadge?: string;
  };
  mood?: string;
  index: number;
}

const RestaurantCardEnhanced = ({ restaurant, index }: RestaurantCardEnhancedProps) => {
  const cuisine = restaurant.cuisines?.[0] ?? "Indian";
  const dish = pickDish(restaurant.name, cuisine);
  const recommendation = generateRecommendation(
    restaurant.name,
    dish.name,
    cuisine
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.45, ease: "easeOut" }}
      whileHover={{ y: -6 }}
      className="
         group relative rounded-3xl
bg-gradient-to-b from-white via-white to-orange-50/40
border border-zinc-200
shadow-sm hover:shadow-xl
transition-all duration-300
overflow-hidden


      "
    >
      {/* Subtle Glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          boxShadow:
            "0 0 0 1.5px rgba(249,115,22,0.25), 0 12px 40px rgba(249,115,22,0.15)",
        }}
      />

      {/* Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-orange-400 via-rose-400 to-purple-400" />

      {/* ================= HEADER ================= */}
      <div className="px-6 pt-5 pb-4 space-y-2">
        {/* Cuisine Badge */}
        <div className="flex items-center gap-2">
          <span
            className="
              inline-flex items-center gap-1
              px-3 py-1 rounded-full
              text-[11px] font-semibold
              bg-orange-100 text-orange-700
              border border-orange-200
            "
          >
            🍽 {cuisine} Cuisine
          </span>
        </div>

        <h3 className="text-lg font-semibold text-zinc-900">
          {restaurant.name}
        </h3>

        <div className="flex items-center flex-wrap gap-4 text-sm text-zinc-600">
          {restaurant.rating && (
            <span className="flex items-center gap-1 text-zinc-900">
              <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
              {restaurant.rating}
            </span>
          )}

          {restaurant.priceLevel && (
            <span className="font-medium">
              {PRICE_RANGE_MAP[restaurant.priceLevel]}
            </span>
          )}

          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3" />
            {restaurant.city ?? "Nearby"}
          </span>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="px-6 py-4 space-y-5">
        {/* Dish Highlight */}
       {/* Dish Highlight */}
<div className="rounded-xl bg-white border border-zinc-200 p-4">
  {/* High-rated hint */}
  <div className="mb-1">
    <span
      className="
        inline-flex items-center gap-1
        text-[11px] font-semibold
        text-orange-600
        bg-orange-100
        px-2 py-0.5
        rounded-full
      "
    >
      ⭐ Highly loved here
    </span>
  </div>

  {/* Dish name */}
  <div className="flex items-center gap-2 mb-1 mt-1">
    <Utensils className="w-4 h-4 text-orange-500" />
    <span className="font-semibold text-zinc-900">
      {dish.name}
    </span>
  </div>

  {/* Description */}
  <p className="text-sm text-zinc-600 leading-relaxed">
    {dish.description}
  </p>

  {/* Calories */}
  <span
    className="
      inline-flex mt-3 px-3 py-1 rounded-full
      text-xs font-semibold
      bg-orange-50 text-orange-700
    "
  >
    🔥 {dish.calories} cal
  </span>
</div>


        {/* Contextual Recommendation */}
<div
  className="
    rounded-xl
    bg-gradient-to-r from-orange-50 via-rose-50 to-purple-50
    border border-zinc-200
    p-4
  "
>
  <div className="flex items-center gap-2 mb-1">
    <Store className="w-4 h-4 text-orange-500" />
    <span className="text-xs font-semibold text-zinc-900">
      Why this place?
    </span>
  </div>

 <p className="
  text-sm text-zinc-700 leading-relaxed
  line-clamp-3
  relative
">
  “{recommendation}”
</p>

</div>

        {/* Nutrition */}
        <div className="space-y-3">
          {Object.entries(dish.nutrition).map(([key, value]) => (
            <div key={key}>
              <div className="flex justify-between text-[11px] text-zinc-500 mb-1 capitalize">
                <span>{key}</span>
                <span>{value}g</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-100 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${Math.min(value, 100)}%` }}
                  transition={{ duration: 0.6 }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Mood Boost */}
        <div
          className="
            rounded-xl
            bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50
            border border-zinc-200
            p-4
          "
        >
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span className="text-xs font-semibold text-zinc-900">
              Mood Boost
            </span>
          </div>
          <p className="
  text-xs text-zinc-600 leading-relaxed
  line-clamp-2 italic
">
  💫 {dish.moodBenefit}
</p>

        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="px-6 pb-5 pt-4 border-t border-zinc-200">
        <Button
          className="
            w-full rounded-full
            bg-orange-500 hover:bg-orange-600
            text-white font-medium
            shadow-md shadow-orange-500/25
            transition-all
          "
          onClick={() =>
            restaurant.mapsUrl &&
            window.open(restaurant.mapsUrl, "_blank")
          }
        >
          <Navigation className="w-4 h-4 mr-2" />
          Get Directions
        </Button>
      </div>
    </motion.div>
  );
};

export default RestaurantCardEnhanced;

