import { Restaurant } from "@/types/smartdine";

// ---------- LOCAL FALLBACK DATASET (DO NOT MODIFY STRUCTURE) ----------
export interface FallbackRestaurant {
  id: number;
  name: string;
  location: string;
  cuisine: string[];
  diet: "Veg" | "Non-Veg" | "Vegan";
  budget: "Low" | "Medium" | "High";
  rating: number;
  description: string;
}

export const localFallbackRestaurants: FallbackRestaurant[] = [
  // ========== CHENNAI ==========
  {
    id: 1,
    name: "Sangeetha Veg Restaurant",
    location: "Chennai",
    cuisine: ["South Indian", "Vegetarian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.3,
    description: "Famous vegetarian chain serving authentic South Indian tiffin.",
  },
  {
    id: 2,
    name: "Murugan Idli Shop",
    location: "Chennai",
    cuisine: ["South Indian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.4,
    description: "Popular spot for soft idlis and traditional chutneys.",
  },
  {
    id: 3,
    name: "Coal Barbecues",
    location: "Chennai",
    cuisine: ["BBQ", "North Indian"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.5,
    description: "Live grill buffet with wide BBQ options.",
  },
  {
    id: 4,
    name: "Absolute Barbecue (AB's)",
    location: "Chennai",
    cuisine: ["BBQ", "Continental"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.6,
    description: "Build-your-own-grill concept with unlimited starters.",
  },
  {
    id: 5,
    name: "Annalakshmi Restaurant",
    location: "Chennai",
    cuisine: ["South Indian", "Veg Thali"],
    diet: "Veg",
    budget: "High",
    rating: 4.7,
    description: "Premium vegetarian fine dining run by a charitable trust.",
  },
  {
    id: 6,
    name: "Kebapci",
    location: "Chennai",
    cuisine: ["Mediterranean", "Turkish"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.4,
    description: "Authentic kebabs and Middle Eastern platters.",
  },
  {
    id: 7,
    name: "A2B - Adyar Ananda Bhavan",
    location: "Chennai",
    cuisine: ["South Indian", "North Indian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.2,
    description: "All-day veg meals and snacks.",
  },
  {
    id: 8,
    name: "Palmshore Restaurant",
    location: "Chennai",
    cuisine: ["Arabian", "BBQ"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Best known for Arabian grills and mandi biriyani.",
  },
  {
    id: 9,
    name: "Pind",
    location: "Chennai",
    cuisine: ["North Indian", "Punjabi"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.4,
    description: "Authentic North Indian food with dhaba-style flavors.",
  },
  {
    id: 10,
    name: "Crimson Chakra",
    location: "Chennai",
    cuisine: ["Continental", "Fusion"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Known for biriyani, continental dishes, and desserts.",
  },
  {
    id: 11,
    name: "Maplai",
    location: "Chennai",
    cuisine: ["South Indian", "Chettinad"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.5,
    description: "Traditional Chettinad flavours and unlimited meals.",
  },
  {
    id: 12,
    name: "Toscano",
    location: "Chennai",
    cuisine: ["Italian", "Continental"],
    diet: "Veg",
    budget: "High",
    rating: 4.6,
    description: "Premium pizzas, pastas and Italian desserts.",
  },
  {
    id: 13,
    name: "Sushi In A Box",
    location: "Chennai",
    cuisine: ["Japanese", "Asian"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.6,
    description: "Japanese bento and maki rolls.",
  },
  {
    id: 14,
    name: "Kaidi Kitchen",
    location: "Chennai",
    cuisine: ["North Indian", "Italian", "Mexican"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.2,
    description: "Unique prison-themed veg restaurant.",
  },
  {
    id: 15,
    name: "Junior Kuppanna",
    location: "Chennai",
    cuisine: ["South Indian", "Chettinad"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Famous for chicken meals and mutton biriyani.",
  },
  // Chennai - Italian/Cafe additions
  {
    id: 46,
    name: "Little Italy",
    location: "Chennai",
    cuisine: ["Italian"],
    diet: "Veg",
    budget: "High",
    rating: 4.5,
    description: "Premium veg Italian dining with authentic wood-fired pizzas.",
  },
  {
    id: 47,
    name: "Amethyst Cafe",
    location: "Chennai",
    cuisine: ["Cafe", "Continental"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.4,
    description: "Heritage cafe with gourmet sandwiches and cheese platters.",
  },
  {
    id: 48,
    name: "Chamiers Cafe",
    location: "Chennai",
    cuisine: ["Cafe", "Continental"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Artsy cafe known for cheesy pasta and quiche.",
  },
  {
    id: 49,
    name: "La Boulangerie",
    location: "Chennai",
    cuisine: ["French", "Cafe"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.4,
    description: "Authentic French bakery with croissants and cheese tarts.",
  },
  {
    id: 50,
    name: "Ciclo Cafe",
    location: "Chennai",
    cuisine: ["Cafe", "Italian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.2,
    description: "Cycling-themed cafe with affordable cheesy pastas.",
  },
  {
    id: 51,
    name: "Flying Elephant",
    location: "Chennai",
    cuisine: ["Continental", "Mediterranean"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.6,
    description: "Park Hyatt's upscale restaurant with Mediterranean cheese boards.",
  },
  {
    id: 52,
    name: "Enrique's",
    location: "Chennai",
    cuisine: ["Mexican", "Continental"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Famous for loaded nachos and cheesy quesadillas.",
  },
  // ========== BANGALORE ==========
  {
    id: 16,
    name: "Truffles",
    location: "Bangalore",
    cuisine: ["Cafe", "Continental"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.7,
    description: "Iconic burgers, steaks, and shakes.",
  },
  {
    id: 17,
    name: "Vidyaranya Bhavan",
    location: "Bangalore",
    cuisine: ["South Indian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.4,
    description: "Classic dosas and breakfast combos.",
  },
  {
    id: 18,
    name: "Empire Restaurant",
    location: "Bangalore",
    cuisine: ["Arabian", "Indian"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Late-night biriyani and grilled chicken.",
  },
  {
    id: 19,
    name: "The Only Place",
    location: "Bangalore",
    cuisine: ["Continental", "Steakhouse"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.5,
    description: "Premium steaks and American platters.",
  },
  {
    id: 20,
    name: "MTR - Mavalli Tiffin Rooms",
    location: "Bangalore",
    cuisine: ["South Indian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.6,
    description: "Historic spot for traditional meals.",
  },
  {
    id: 21,
    name: "CTR - Central Tiffin Room",
    location: "Bangalore",
    cuisine: ["South Indian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.7,
    description: "Famous for Benne Masala Dosa.",
  },
  {
    id: 22,
    name: "Farzi Cafe",
    location: "Bangalore",
    cuisine: ["Modern Indian", "Fusion"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.5,
    description: "Indian cuisine with contemporary twist.",
  },
  {
    id: 23,
    name: "Byg Brewski Brewing Company",
    location: "Bangalore",
    cuisine: ["Continental", "Asian"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.6,
    description: "Massive microbrewery with global food.",
  },
  {
    id: 24,
    name: "Meghana Foods",
    location: "Bangalore",
    cuisine: ["Andhra", "South Indian"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.6,
    description: "Best spicy Andhra biriyani.",
  },
  {
    id: 25,
    name: "Brahmin's Coffee Bar",
    location: "Bangalore",
    cuisine: ["South Indian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.6,
    description: "Classic idli-vada with filter coffee.",
  },
  {
    id: 26,
    name: "Toit",
    location: "Bangalore",
    cuisine: ["Continental", "Italian"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.7,
    description: "Brewpub with pizzas, pastas, and grills.",
  },
  {
    id: 27,
    name: "Sattvam",
    location: "Bangalore",
    cuisine: ["Pure Veg", "Indian"],
    diet: "Veg",
    budget: "High",
    rating: 4.5,
    description: "Premium sattvic vegetarian buffet.",
  },
  {
    id: 28,
    name: "Onesta",
    location: "Bangalore",
    cuisine: ["Italian", "Pizza"],
    diet: "Veg",
    budget: "Low",
    rating: 4.1,
    description: "Affordable pizzas and desserts.",
  },
  {
    id: 29,
    name: "Mainland China",
    location: "Bangalore",
    cuisine: ["Chinese", "Asian"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.4,
    description: "Premium Chinese cuisine.",
  },
  {
    id: 30,
    name: "Beijing Bites",
    location: "Bangalore",
    cuisine: ["Chinese"],
    diet: "Non-Veg",
    budget: "Low",
    rating: 4.1,
    description: "Affordable Indo-Chinese meals.",
  },
  // Bangalore - Italian/Cafe/Japanese/French additions
  {
    id: 53,
    name: "The Big Chill",
    location: "Bangalore",
    cuisine: ["Italian", "Cafe"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.5,
    description: "Legendary cakes and cheesy Italian comfort food.",
  },
  {
    id: 54,
    name: "Fenny's Lounge & Kitchen",
    location: "Bangalore",
    cuisine: ["Italian", "Continental"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Cozy Italian bistro with wood-fired cheese pizzas.",
  },
  {
    id: 55,
    name: "Third Wave Coffee",
    location: "Bangalore",
    cuisine: ["Cafe"],
    diet: "Veg",
    budget: "Low",
    rating: 4.2,
    description: "Specialty coffee with cheesy bagels and sandwiches.",
  },
  {
    id: 56,
    name: "Glen's Bakehouse",
    location: "Bangalore",
    cuisine: ["Cafe", "French"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.4,
    description: "French pastries and cheese croissants.",
  },
  {
    id: 57,
    name: "Harima",
    location: "Bangalore",
    cuisine: ["Japanese"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.5,
    description: "Authentic Japanese with fresh sushi and ramen.",
  },
  {
    id: 58,
    name: "Sushi Time",
    location: "Bangalore",
    cuisine: ["Japanese", "Asian"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.2,
    description: "Affordable Japanese rolls and bento boxes.",
  },
  {
    id: 59,
    name: "Le Cirque Signature",
    location: "Bangalore",
    cuisine: ["French", "Continental"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.6,
    description: "Fine French dining at Leela Palace.",
  },
  {
    id: 60,
    name: "Smoke House Deli",
    location: "Bangalore",
    cuisine: ["Continental", "Italian"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.4,
    description: "Artisanal sandwiches and cheese-loaded pasta.",
  },
  {
    id: 61,
    name: "Chianti",
    location: "Bangalore",
    cuisine: ["Italian"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.5,
    description: "Upscale Italian with truffle pasta and risottos.",
  },
  // ========== COIMBATORE ==========
  {
    id: 31,
    name: "Haribhavanam",
    location: "Coimbatore",
    cuisine: ["South Indian", "Chettinad"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.5,
    description: "Famous for mutton biriyani and spicy gravies.",
  },
  {
    id: 32,
    name: "Annapoorna Gowrishankar",
    location: "Coimbatore",
    cuisine: ["South Indian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.5,
    description: "Iconic vegetarian chain known for dosa and coffee.",
  },
  {
    id: 33,
    name: "Sree Annapoorna Sree Gowrishankar",
    location: "Coimbatore",
    cuisine: ["South Indian", "North Indian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.4,
    description: "Vegetarian meals, combo meals, and snacks.",
  },
  {
    id: 34,
    name: "Barbeque Nation",
    location: "Coimbatore",
    cuisine: ["BBQ", "North Indian"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.5,
    description: "Live grills with unlimited buffet menu.",
  },
  {
    id: 35,
    name: "Bird on Tree",
    location: "Coimbatore",
    cuisine: ["Continental", "Asian"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.6,
    description: "Premium fine dining with global cuisine.",
  },
  {
    id: 36,
    name: "That's Y Food",
    location: "Coimbatore",
    cuisine: ["Continental"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Steakhouse-style continental dishes.",
  },
  {
    id: 37,
    name: "Cream Centre",
    location: "Coimbatore",
    cuisine: ["North Indian", "Italian"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.2,
    description: "Veg global cuisine with sizzlers.",
  },
  {
    id: 38,
    name: "Kari Theory",
    location: "Coimbatore",
    cuisine: ["South Indian"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.4,
    description: "Local favourite for spicy non-veg meals.",
  },
  {
    id: 39,
    name: "Rayappa's",
    location: "Coimbatore",
    cuisine: ["South Indian", "Chettinad"],
    diet: "Non-Veg",
    budget: "Low",
    rating: 4.1,
    description: "Budget-friendly non-veg meals spot.",
  },
  {
    id: 40,
    name: "The French Door",
    location: "Coimbatore",
    cuisine: ["Continental", "Cafe"],
    diet: "Veg",
    budget: "High",
    rating: 4.7,
    description: "Chic café with brunch, pastries, and global food.",
  },
  {
    id: 41,
    name: "AB's - Absolute Barbecue",
    location: "Coimbatore",
    cuisine: ["BBQ", "Mandi"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.4,
    description: "Live grill buffet with exotic starters.",
  },
  {
    id: 42,
    name: "Geetha Canteen",
    location: "Coimbatore",
    cuisine: ["South Indian"],
    diet: "Veg",
    budget: "Low",
    rating: 4.3,
    description: "Famous for ghee roast and coffee.",
  },
  {
    id: 43,
    name: "Benitos",
    location: "Coimbatore",
    cuisine: ["Italian", "Pizza"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.2,
    description: "Wood-fired pizzas and pasta.",
  },
  {
    id: 44,
    name: "Red Pearl",
    location: "Coimbatore",
    cuisine: ["Chinese"],
    diet: "Non-Veg",
    budget: "Low",
    rating: 4.0,
    description: "Affordable Indo-Chinese dishes.",
  },
  {
    id: 45,
    name: "Junior Kuppanna",
    location: "Coimbatore",
    cuisine: ["South Indian", "Chettinad"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Loved for chicken meals and mutton fry.",
  },
  // Coimbatore - Italian/French/Mexican/Japanese/Cafe additions
  {
    id: 62,
    name: "Pizza Corner",
    location: "Coimbatore",
    cuisine: ["Italian", "Pizza"],
    diet: "Veg",
    budget: "Low",
    rating: 4.1,
    description: "Budget-friendly pizzas and garlic bread.",
  },
  {
    id: 63,
    name: "The Residency Towers Cafe",
    location: "Coimbatore",
    cuisine: ["Cafe", "Continental"],
    diet: "Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Hotel cafe with cheese sandwiches and pasta.",
  },
  {
    id: 64,
    name: "Barberito's",
    location: "Coimbatore",
    cuisine: ["Mexican"],
    diet: "Veg",
    budget: "Low",
    rating: 4.0,
    description: "Quick Mexican burritos and nachos.",
  },
  {
    id: 65,
    name: "Brew Code Cafe",
    location: "Coimbatore",
    cuisine: ["Cafe", "Continental"],
    diet: "Veg",
    budget: "Low",
    rating: 4.2,
    description: "Trendy cafe with cheese sandwiches and waffles.",
  },
  {
    id: 66,
    name: "Zaitoon Restaurant",
    location: "Coimbatore",
    cuisine: ["Mediterranean", "Arabian"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.3,
    description: "Arabic grills and Mediterranean mezze.",
  },
  {
    id: 67,
    name: "Le Baroque",
    location: "Coimbatore",
    cuisine: ["French", "Continental"],
    diet: "Non-Veg",
    budget: "High",
    rating: 4.5,
    description: "French bistro with crepes and cheese fondue.",
  },
  {
    id: 68,
    name: "Nobu Express",
    location: "Coimbatore",
    cuisine: ["Japanese"],
    diet: "Non-Veg",
    budget: "Medium",
    rating: 4.1,
    description: "Japanese sushi and ramen bowls.",
  },
  {
    id: 69,
    name: "Domino's Pizza",
    location: "Coimbatore",
    cuisine: ["Italian", "Pizza"],
    diet: "Veg",
    budget: "Low",
    rating: 4.0,
    description: "Cheese-burst pizzas and cheesy dips.",
  },
  {
    id: 70,
    name: "Taco Bell",
    location: "Coimbatore",
    cuisine: ["Mexican"],
    diet: "Veg",
    budget: "Low",
    rating: 4.0,
    description: "Quick-service Mexican with loaded nachos.",
  },
];

// Budget mapping
const BUDGET_MAP: Record<string, { min: number; max: number }> = {
  Low: { min: 0, max: 500 },
  Medium: { min: 501, max: 1000 },
  High: { min: 1001, max: 5000 },
};

// Convert fallback restaurant to Restaurant interface
export function convertToRestaurant(
  fallback: FallbackRestaurant,
  userCity?: string
): Restaurant {
  const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(userCity || fallback.location)}&destination=${encodeURIComponent(`${fallback.name} ${fallback.cuisine[0]} restaurant ${fallback.location}`)}&travelmode=driving`;

  return {
    name: fallback.name,
    cuisine: fallback.cuisine[0],
    city: fallback.location,
    address: fallback.location,
    rating: fallback.rating,
    price_level: fallback.budget === "Low" ? "₹" : fallback.budget === "Medium" ? "₹₹" : "₹₹₹",
    cuisine_tags: fallback.cuisine,
    categories: fallback.cuisine,
    why: fallback.description,
    maps_url: mapsUrl,
    source: "local",
  };
}

// Search fallback restaurants with filters
export function searchFallbackRestaurants(
  filters: {
    location?: string;
    cuisines?: string[];
    budget?: number;
    diet?: string[];
    limit?: number;
  }
): FallbackRestaurant[] {
  let results = [...localFallbackRestaurants];

  // Filter by location (city match or nearby)
  if (filters.location) {
    const locationLower = filters.location.toLowerCase();
    const exactMatches = results.filter(
      (r) => r.location.toLowerCase() === locationLower
    );
    if (exactMatches.length > 0) {
      results = exactMatches;
    }
    // If no exact matches, keep all (nearby cities)
  }

  // Filter by cuisine
  if (filters.cuisines && filters.cuisines.length > 0) {
    const cuisineLower = filters.cuisines.map((c) => c.toLowerCase());
    results = results.filter((r) =>
      r.cuisine.some((c) =>
        cuisineLower.some(
          (fc) => c.toLowerCase().includes(fc) || fc.includes(c.toLowerCase())
        )
      )
    );
  }

  // Filter by budget
  if (filters.budget) {
    results = results.filter((r) => {
      const budgetRange = BUDGET_MAP[r.budget];
      return filters.budget! <= budgetRange.max;
    });
  }

  // Filter by diet
  if (filters.diet && filters.diet.length > 0 && !filters.diet.includes("none")) {
    results = results.filter((r) => {
      const isVeg = filters.diet!.includes("vegetarian") || filters.diet!.includes("vegan");
      if (isVeg && r.diet === "Veg") return true;
      if (!isVeg) return true;
      return false;
    });
  }

  // Sort by rating
  results.sort((a, b) => b.rating - a.rating);

  // Limit results
  return results.slice(0, filters.limit || 10);
}
