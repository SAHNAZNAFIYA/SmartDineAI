import { motion } from "framer-motion";
import { Flame, Heart, Info, Utensils } from "lucide-react";
import { RecommendedDish } from "@/types/smartdine";
import { cn } from "@/lib/utils";

interface DishCardProps {
  dish: RecommendedDish;
  index: number;
  onViewRestaurants?: (dishName: string) => void;
}

const DishCard = ({ dish, index, onViewRestaurants }: DishCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      className="food-card group"
    >
      {/* Image placeholder with gradient */}
      <div className="relative h-48 bg-gradient-to-br from-coral/20 via-honey/20 to-teal/20 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2 }}
            className="text-6xl"
          >
            🍽️
          </motion.div>
        </div>
        
        {/* Mood boost badge */}
        <div className="absolute top-3 left-3">
          <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Heart className="w-3 h-3" />
            Mood Boost
          </div>
        </div>

        {/* Calories badge */}
        <div className="absolute top-3 right-3">
          <div className="bg-card/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Flame className="w-3 h-3 text-coral" />
            {dish.estimated_calories} cal
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-xl font-display font-semibold text-foreground mb-1">
            {dish.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {dish.why}
          </p>
        </div>

        {/* Mood boost explanation */}
        <div className="bg-secondary/50 rounded-xl p-3 space-y-2">
          <div className="flex items-center gap-2 text-accent text-sm font-medium">
            <Heart className="w-4 h-4" />
            Why it helps
          </div>
          <p className="text-xs text-muted-foreground">{dish.mood_boost}</p>
        </div>

        {/* Nutrition info */}
        <div className="bg-secondary/50 rounded-xl p-3">
          <div className="flex items-center gap-2 text-accent text-sm font-medium mb-2">
            <Info className="w-4 h-4" />
            Nutrition per serving
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-muted-foreground">Protein:</span>{" "}
              <span className="font-semibold">{dish.nutrition.protein}g</span>
            </div>
            <div>
              <span className="text-muted-foreground">Carbs:</span>{" "}
              <span className="font-semibold">{dish.nutrition.carbs}g</span>
            </div>
            <div>
              <span className="text-muted-foreground">Fat:</span>{" "}
              <span className="font-semibold">{dish.nutrition.fat}g</span>
            </div>
            <div>
              <span className="text-muted-foreground">Fiber:</span>{" "}
              <span className="font-semibold">{dish.nutrition.fiber}g</span>
            </div>
          </div>
        </div>

        {/* Portion size */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Utensils className="w-4 h-4" />
          <span>{dish.portion}</span>
        </div>

        {/* Find restaurants button */}
        {onViewRestaurants && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onViewRestaurants(dish.name)}
            className={cn(
              "w-full py-3 rounded-xl font-medium text-sm",
              "bg-gradient-coral text-primary-foreground",
              "shadow-soft hover:shadow-glow transition-all"
            )}
          >
            Find Restaurants Nearby
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default DishCard;
