import { useState, useEffect } from "react";
import { useLocation as useRouterLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, RefreshCw, Sparkles, MapPin, Brain, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import RestaurantCardEnhanced from "@/components/RestaurantCardEnhanced";
import LoadingState from "@/components/LoadingState";
import FloatingFoodIcons from "@/components/FloatingFoodIcons";
import { MoodType } from "@/types/smartdine";
import { useLocation } from "@/contexts/LocationContext";
import { NormalizedRestaurant } from "@/services/restaurantService";

interface RecommendationsData {
  scientific_reasoning?: string;
  mood_tips?: string[];
  recommended_restaurants?: NormalizedRestaurant[];
}

const Results = () => {
  const routerLocation = useRouterLocation();
  const navigate = useNavigate();
  const { location } = useLocation();
  
  const [recommendations, setRecommendations] = useState<RecommendationsData | null>(
    routerLocation.state?.recommendations || null
  );
  const [preferences] = useState<{ moods?: string[] } | null>(
    routerLocation.state?.preferences || null
  );

  useEffect(() => {
    if (!recommendations) {
      navigate("/preferences");
    }
  }, [recommendations, navigate]);

  if (!recommendations) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <LoadingState />
      </div>
    );
  }

  const primaryMood = (preferences?.moods?.[0] || "happy") as MoodType;

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 relative">
      <FloatingFoodIcons />
      
      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <Link to="/preferences">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Your Restaurant Recommendations
              </h1>
              <p className="text-muted-foreground flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {location?.city || "Your location"}
              </p>
            </div>
          </div>

          {/* Scientific reasoning - ENHANCED VISIBILITY */}
          {recommendations.scientific_reasoning && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 mb-6 border-2 border-primary/30 bg-gradient-to-r from-primary/5 to-accent/5"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-coral flex items-center justify-center flex-shrink-0">
                  <Brain className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-2 flex items-center gap-2">
                    🧠 The Science Behind Your Recommendations
                  </h3>
                  <p className="text-foreground font-medium leading-relaxed">
                    {recommendations.scientific_reasoning}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Mood tips - ENHANCED VISIBILITY */}
          {recommendations.mood_tips && recommendations.mood_tips.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-2xl p-6 border-2 border-accent/30 bg-gradient-to-r from-accent/5 to-honey/5"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Lightbulb className="w-5 h-5 text-accent" />
                </div>
                <h3 className="font-bold text-lg text-foreground">
                  ✨ Quick Mood-Boosting Tips
                </h3>
              </div>
              <ul className="space-y-3">
                {recommendations.mood_tips.map((tip, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-secondary/50 rounded-xl"
                  >
                    <span className="text-primary font-bold text-lg">→</span>
                    <span className="text-foreground font-medium">{tip}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>

        {/* Restaurant count */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            🍽️ {recommendations.recommended_restaurants?.length || 0} Restaurants Near You
          </h2>
        </div>

        {/* Restaurant recommendations */}
        <div className="grid lg:grid-cols-2 gap-6">
          {recommendations.recommended_restaurants?.map((restaurant, index) => (
            <RestaurantCardEnhanced
              key={`${restaurant.name}-${index}`}
              restaurant={restaurant}
              mood={primaryMood}
              index={index}
            />
          ))}
        </div>

        {/* Try again button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link to="/preferences">
            <Button variant="glass" className="gap-2">
              <RefreshCw className="w-4 h-4" />
              Try Different Preferences
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Results;
