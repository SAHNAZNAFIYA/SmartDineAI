import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocation } from "@/contexts/LocationContext";
import { useToast } from "@/hooks/use-toast";
import { getRandomSurpriseResponse, getMoodExplanation } from "@/constants/eiCopy";
import { getUnifiedRestaurants, loadKaggleData, PipelineRestaurant } from "@/services/restaurantPipeline";
import RestaurantCardEnhanced from "@/components/RestaurantCardEnhanced";
import { MoodType } from "@/types/smartdine";

const MOODS: { value: MoodType; emoji: string; label: string }[] = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'calm', emoji: '😌', label: 'Calm' },
  { value: 'stressed', emoji: '😰', label: 'Stressed' },
  { value: 'tired', emoji: '😴', label: 'Tired' },
  { value: 'energetic', emoji: '⚡', label: 'Energetic' },
  { value: 'pms', emoji: '🌸', label: 'PMS' },
  { value: 'anxious', emoji: '😟', label: 'Anxious' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
];

const CUISINES: { value: string; emoji: string }[] = [
  { value: 'Indian', emoji: '🍛' },
  { value: 'Chinese', emoji: '🥡' },
  { value: 'Italian', emoji: '🍝' },
  { value: 'Mexican', emoji: '🌮' },
  { value: 'Japanese', emoji: '🍣' },
  { value: 'Thai', emoji: '🍜' },
  { value: 'Mediterranean', emoji: '🥙' },
  { value: 'American', emoji: '🍔' },
  { value: 'French', emoji: '🥐' },
  { value: 'Korean', emoji: '🥘' },
];

const BUDGETS = ['₹', '₹₹', '₹₹₹'];

// Flirty/emotional quotes for the surprise reveal
const SURPRISE_QUOTES = [
  "The universe just whispered your dinner plans! 💫",
  "Fate has delicious taste! 😍",
  "Your tummy's destiny awaits! 🌟",
  "The stars aligned for this combo! ✨",
  "Love at first bite incoming! 💕",
  "This is YOUR moment! 🎉",
  "The food gods have spoken! 👑",
  "Destiny tastes amazing! 🔮",
];

const SurpriseMe = () => {
  const { location } = useLocation();
  const { toast } = useToast();
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<{ mood: typeof MOODS[0]; cuisine: typeof CUISINES[0]; budget: string } | null>(null);
  const [restaurants, setRestaurants] = useState<PipelineRestaurant[]>([]);
  const [eiResponse, setEiResponse] = useState("");
  const [moodExplanation, setMoodExplanation] = useState("");
  const [surpriseQuote, setSurpriseQuote] = useState("");
  const [reelPositions, setReelPositions] = useState([0, 0, 0]);

  useEffect(() => {
    loadKaggleData();
  }, []);

  const spin = useCallback(async () => {
    if (!location) {
      toast({
        title: "Location Required",
        description: "Please set your location in the navigation bar first!",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    setResult(null);
    setRestaurants([]);

    // Animate reels
    const animationDuration = 3000;
    const startTime = Date.now();
    
    const animateReels = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);
      
      // Each reel stops at different times
      const reel1Stop = progress > 0.5;
      const reel2Stop = progress > 0.7;
      const reel3Stop = progress > 0.9;
      
      setReelPositions([
        reel1Stop ? 0 : Math.floor(Math.random() * MOODS.length),
        reel2Stop ? 0 : Math.floor(Math.random() * CUISINES.length),
        reel3Stop ? 0 : Math.floor(Math.random() * BUDGETS.length),
      ]);
      
      if (progress < 1) {
        requestAnimationFrame(animateReels);
      }
    };
    
    animateReels();

    // Wait for animation
    await new Promise(resolve => setTimeout(resolve, animationDuration));

    // Random selections
    const randomMood = MOODS[Math.floor(Math.random() * MOODS.length)];
    const randomCuisine = CUISINES[Math.floor(Math.random() * CUISINES.length)];
    const randomBudget = BUDGETS[Math.floor(Math.random() * BUDGETS.length)];

    setResult({ mood: randomMood, cuisine: randomCuisine, budget: randomBudget });
    
    // Set surprise quote FIRST (most important visual)
    setSurpriseQuote(SURPRISE_QUOTES[Math.floor(Math.random() * SURPRISE_QUOTES.length)]);
    
    // Get EI response
    const tone = ['happy', 'energetic'].includes(randomMood.value) ? 'hype' : 
                 ['sad', 'tired', 'stressed', 'anxious'].includes(randomMood.value) ? 'comforting' : 'playful';
    setEiResponse(getRandomSurpriseResponse(tone as any));
    setMoodExplanation(getMoodExplanation(randomMood.value));

    // Use unified pipeline for restaurants
    const fetchedRestaurants = await getUnifiedRestaurants({
      lat: location.lat,
      lon: location.lon,
      city: location.city,
      cuisines: [randomCuisine.value],
      mood: randomMood.value as MoodType,
      maxPriceLevel: randomBudget.length,
    });

    setRestaurants(fetchedRestaurants);
    setIsSpinning(false);
  }, [location, toast]);

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            className="text-6xl mb-4"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            🎰
          </motion.div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Surprise Me!
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Spin the food slot machine and let fate decide your next delicious adventure!
          </p>
        </motion.div>

        {/* Location Check */}
        {!location && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card rounded-2xl p-6 text-center mb-8"
          >
            <MapPin className="w-12 h-12 text-primary mx-auto mb-3" />
            <h3 className="font-semibold text-lg mb-2">Set Your Location First!</h3>
            <p className="text-muted-foreground text-sm">
              Click the location button in the navbar to set your location before spinning.
            </p>
          </motion.div>
        )}

        {/* Slot Machine */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative mb-8"
        >
          {/* Machine Frame */}
          <div className="relative max-w-xl mx-auto">
            {/* Machine Body */}
            <div className="bg-gradient-to-b from-amber-600 via-amber-700 to-amber-800 rounded-3xl p-6 shadow-2xl border-4 border-amber-500">
              {/* Top decoration */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                🍔 FOOD JACKPOT 🍕
              </div>

              {/* Reels Container */}
              <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-4 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  {/* Mood Reel */}
                  <div className="bg-card rounded-xl p-4 text-center border-2 border-primary/30 overflow-hidden">
                    <div className="text-xs text-muted-foreground mb-2 font-medium">MOOD</div>
                    <motion.div
                      className="text-4xl"
                      animate={isSpinning ? { y: [0, -20, 0] } : {}}
                      transition={{ duration: 0.1, repeat: isSpinning ? Infinity : 0 }}
                    >
                      {result ? result.mood.emoji : (isSpinning ? MOODS[reelPositions[0]].emoji : '❓')}
                    </motion.div>
                    <div className="text-sm mt-1 font-medium">
                      {result ? result.mood.label : '?'}
                    </div>
                  </div>

                  {/* Cuisine Reel */}
                  <div className="bg-card rounded-xl p-4 text-center border-2 border-accent/30 overflow-hidden">
                    <div className="text-xs text-muted-foreground mb-2 font-medium">CUISINE</div>
                    <motion.div
                      className="text-4xl"
                      animate={isSpinning ? { y: [0, -20, 0] } : {}}
                      transition={{ duration: 0.12, repeat: isSpinning ? Infinity : 0 }}
                    >
                      {result ? result.cuisine.emoji : (isSpinning ? CUISINES[reelPositions[1]].emoji : '❓')}
                    </motion.div>
                    <div className="text-sm mt-1 font-medium">
                      {result ? result.cuisine.value : '?'}
                    </div>
                  </div>

                  {/* Budget Reel */}
                  <div className="bg-card rounded-xl p-4 text-center border-2 border-honey/30 overflow-hidden">
                    <div className="text-xs text-muted-foreground mb-2 font-medium">BUDGET</div>
                    <motion.div
                      className="text-3xl font-bold"
                      animate={isSpinning ? { y: [0, -20, 0] } : {}}
                      transition={{ duration: 0.14, repeat: isSpinning ? Infinity : 0 }}
                    >
                      {result ? result.budget : (isSpinning ? BUDGETS[reelPositions[2]] : '❓')}
                    </motion.div>
                    <div className="text-sm mt-1 font-medium">
                      {result ? 'Budget' : '?'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Spin Button */}
              <div className="mt-6 text-center">
                <Button
                  variant="hero"
                  size="xl"
                  className="gap-2 shadow-lg"
                  onClick={spin}
                  disabled={isSpinning || !location}
                >
                  {isSpinning ? (
                    <>
                      <RefreshCw className="w-5 h-5 animate-spin" />
                      Spinning...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      SPIN TO WIN!
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {result && !isSpinning && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="space-y-6"
            >
              {/* FLIRTY QUOTE - FIRST AND MOST PROMINENT */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
                className="text-center py-6"
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: 2,
                    ease: "easeInOut"
                  }}
                  className="text-6xl md:text-7xl mb-4"
                >
                  🎉
                </motion.div>
                <motion.p 
                  className="text-2xl md:text-3xl font-display font-bold text-primary mb-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {surpriseQuote}
                </motion.p>
              </motion.div>

              {/* EI Response Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="glass-card rounded-2xl p-6 text-center"
              >
                <p className="text-lg font-medium text-foreground mb-3">{eiResponse}</p>
                <div className="flex items-center justify-center gap-4 text-2xl mb-4">
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    {result.mood.emoji}
                  </motion.span>
                  <span className="text-muted-foreground">+</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    {result.cuisine.emoji}
                  </motion.span>
                  <span className="text-muted-foreground">+</span>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                  >
                    {result.budget}
                  </motion.span>
                </div>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  {moodExplanation}
                </p>
              </motion.div>

              {/* Restaurants */}
              {restaurants.length > 0 && (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold text-foreground text-center">
                    🍽️ Your Surprise Restaurants ({restaurants.length})
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {restaurants.map((restaurant, index) => (
                      <RestaurantCardEnhanced
                        key={restaurant.id}
                        restaurant={restaurant}
                        index={index}
                        mood={result.mood.value}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Spin Again */}
              <div className="text-center pt-4">
                <Button variant="glass" size="lg" className="gap-2" onClick={spin}>
                  <RefreshCw className="w-4 h-4" />
                  Spin Again!
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SurpriseMe;
