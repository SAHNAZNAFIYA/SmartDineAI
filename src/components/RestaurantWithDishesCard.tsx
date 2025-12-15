import { motion } from "framer-motion";
import { MapPin, Navigation, Star, ChefHat, TrendingUp, ExternalLink } from "lucide-react";
import { RestaurantWithDishes } from "@/types/smartdine";
import { Button } from "@/components/ui/button";
import NutritionChart3D from "./NutritionChart3D";
import { useState } from "react";

interface RestaurantWithDishesCardProps {
  restaurant: RestaurantWithDishes;
  index: number;
}

const RestaurantWithDishesCard = ({ restaurant, index }: RestaurantWithDishesCardProps) => {
  const [expandedDish, setExpandedDish] = useState<number | null>(null);

  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m away`;
    }
    return `${(meters / 1000).toFixed(1)}km away`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ 
        delay: index * 0.1, 
        type: "spring", 
        stiffness: 100,
        damping: 15
      }}
      whileHover={{ 
        y: -5,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
      }}
      className="food-card group"
      style={{ perspective: "1000px" }}
    >
      {/* Restaurant Header with 3D effect */}
      <motion.div 
        className="relative bg-gradient-to-br from-teal/20 via-mint/20 to-honey/20 p-6 overflow-hidden"
        whileHover={{ backgroundColor: "rgba(var(--teal), 0.25)" }}
      >
        {/* Animated background particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-accent/20"
              animate={{
                x: [0, 100, 0],
                y: [0, -50, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 3 + i,
                repeat: Infinity,
                delay: i * 0.5,
              }}
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
            />
          ))}
        </div>

        <div className="flex items-start justify-between relative z-10">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChefHat className="w-5 h-5 text-accent" />
              </motion.div>
              <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                {restaurant.cuisine}
              </span>
            </div>
            <h3 className="text-2xl font-display font-bold text-foreground mb-2">
              {restaurant.name}
            </h3>
            
            <div className="flex items-center gap-3 text-sm text-muted-foreground flex-wrap">
              {restaurant.rating && (
                <motion.div 
                  className="flex items-center gap-1"
                  whileHover={{ scale: 1.1 }}
                >
                  <Star className="w-4 h-4 text-honey fill-honey" />
                  <span className="font-medium">{restaurant.rating}</span>
                </motion.div>
              )}
              {restaurant.price_level && (
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: restaurant.price_level }).map((_, i) => (
                    <motion.span 
                      key={i} 
                      className="text-mint font-bold"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 }}
                    >
                      ₹
                    </motion.span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{formatDistance(restaurant.distance_meters)}</span>
              </div>
            </div>
          </div>

          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              variant="teal"
              size="icon"
              className="flex-shrink-0 shadow-lg"
              onClick={() => window.open(restaurant.maps_url, "_blank")}
            >
              <Navigation className="w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <motion.p 
          className="text-xs text-muted-foreground mt-3 line-clamp-1 flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 + 0.2 }}
        >
          <MapPin className="w-3 h-3" />
          {restaurant.address}
        </motion.p>

        {/* Quick directions link */}
        <motion.a
          href={restaurant.maps_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 mt-2 text-xs text-accent hover:text-accent/80 transition-colors"
          whileHover={{ x: 5 }}
        >
          <ExternalLink className="w-3 h-3" />
          Get Directions
        </motion.a>
      </motion.div>

      {/* Dishes with 3D cards */}
      <div className="p-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingUp className="w-4 h-4 text-primary" />
          </motion.div>
          <h4 className="font-semibold text-foreground">Mood-Boosting Dishes</h4>
        </div>

        <div className="space-y-3">
          {restaurant.dishes.map((dish, dishIndex) => (
            <motion.div
              key={dish.name}
              initial={{ opacity: 0, x: -20, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: index * 0.1 + dishIndex * 0.1 + 0.3 }}
              className="border border-border rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300"
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.button
                onClick={() => setExpandedDish(expandedDish === dishIndex ? null : dishIndex)}
                className="w-full p-4 text-left hover:bg-secondary/50 transition-colors"
                whileHover={{ backgroundColor: "rgba(var(--secondary), 0.7)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h5 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: dishIndex * 0.5 }}
                      >
                        🍽️
                      </motion.span>
                      {dish.name}
                    </h5>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {dish.why}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 flex-shrink-0">
                    <motion.div 
                      className="bg-coral/10 text-coral px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                      whileHover={{ scale: 1.05 }}
                    >
                      {dish.estimated_calories} cal
                    </motion.div>
                    <motion.div
                      animate={{ rotate: expandedDish === dishIndex ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-muted-foreground text-sm"
                    >
                      ▼
                    </motion.div>
                  </div>
                </div>
              </motion.button>

              {/* Expanded nutrition details with 3D chart */}
              <motion.div
                initial={false}
                animate={{
                  height: expandedDish === dishIndex ? "auto" : 0,
                  opacity: expandedDish === dishIndex ? 1 : 0,
                }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="p-4 pt-0 border-t border-border/50 bg-secondary/30">
                  {/* Mood boost explanation */}
                  <motion.div 
                    className="mb-4 p-4 bg-accent/10 rounded-xl"
                    initial={{ scale: 0.95 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <motion.span 
                        className="text-xl"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        💚
                      </motion.span>
                      <span className="text-xs font-semibold text-accent uppercase tracking-wide">
                        Mood Benefit
                      </span>
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">
                      {dish.mood_boost}
                    </p>
                  </motion.div>

                  {/* 3D Nutrition chart */}
                  <NutritionChart3D nutrition={dish.nutrition} index={index + dishIndex} />

                  {/* Portion info */}
                  <motion.div 
                    className="mt-4 flex items-center gap-2 text-sm text-muted-foreground p-3 bg-muted/50 rounded-lg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-lg">🍽️</span>
                    <span>Serving size: {dish.portion}</span>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RestaurantWithDishesCard;
