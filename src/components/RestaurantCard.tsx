import { motion } from "framer-motion";
import { MapPin, Navigation, Star, DollarSign } from "lucide-react";
import { Restaurant } from "@/types/smartdine";
import { Button } from "@/components/ui/button";

interface RestaurantCardProps {
  restaurant: Restaurant;
  index: number;
}

const RestaurantCard = ({ restaurant, index }: RestaurantCardProps) => {
  const formatDistance = (meters: number) => {
    if (meters < 1000) {
      return `${Math.round(meters)}m away`;
    }
    return `${(meters / 1000).toFixed(1)}km away`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-xl p-4 hover-lift"
    >
      <div className="flex gap-4">
        {/* Restaurant icon/placeholder */}
        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-teal/20 to-mint/20 flex items-center justify-center flex-shrink-0">
          <span className="text-2xl">🍴</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate">
            {restaurant.name}
          </h4>
          
          <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
            {restaurant.rating && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-honey fill-honey" />
                <span>{restaurant.rating}</span>
              </div>
            )}
            {restaurant.price_level && (
              <div className="flex items-center gap-0.5">
                {Array.from({ length: typeof restaurant.price_level === 'number' ? restaurant.price_level : (parseInt(String(restaurant.price_level)) || 2) }).map((_, i) => (
                  <DollarSign key={i} className="w-3 h-3 text-mint" />
                ))}
              </div>
            )}
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              <span>{formatDistance(restaurant.distance_meters)}</span>
            </div>
          </div>

          <p className="text-xs text-muted-foreground mt-1 truncate">
            {restaurant.address}
          </p>
        </div>

        {/* Directions button */}
        <Button
          variant="teal"
          size="icon"
          className="flex-shrink-0"
          onClick={() => window.open(restaurant.maps_url, "_blank")}
        >
          <Navigation className="w-4 h-4" />
        </Button>
      </div>
    </motion.div>
  );
};

export default RestaurantCard;
