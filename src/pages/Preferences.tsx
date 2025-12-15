import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import MoodSelector from "@/components/MoodSelector";
import CuisinePicker from "@/components/CuisinePicker";
import BudgetSlider from "@/components/BudgetSlider";
import DietFilters from "@/components/DietFilters";
import LoadingState from "@/components/LoadingState";
import { UserPreferences, MoodType, CuisineType, DietType } from "@/types/smartdine";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/contexts/LocationContext";
import { getRestaurants } from "@/services/restaurantService";
import { getEIResponse } from "@/data/eiCopy";

const STEPS = ["mood", "cuisine", "diet", "budget"] as const;
type Step = typeof STEPS[number];

const Preferences = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { location } = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>("mood");
  const [isLoading, setIsLoading] = useState(false);
  
  const [preferences, setPreferences] = useState<UserPreferences>({
    moods: [],
    cuisines: [],
    budget: 500,
    spice: "medium",
    diets: ["none"],
    location: null,
  });

  const currentStepIndex = STEPS.indexOf(currentStep);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;
  const hasLocation = location !== null;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(STEPS[currentStepIndex + 1]);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(STEPS[currentStepIndex - 1]);
    }
  };

  const handleMoodToggle = (mood: MoodType) => {
    setPreferences((prev) => ({
      ...prev,
      moods: prev.moods.includes(mood)
        ? prev.moods.filter((m) => m !== mood)
        : [...prev.moods, mood],
    }));
  };

  const handleCuisineToggle = (cuisine: CuisineType) => {
    setPreferences((prev) => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter((c) => c !== cuisine)
        : [...prev.cuisines, cuisine],
    }));
  };

  const handleDietToggle = (diet: DietType) => {
    setPreferences((prev) => {
      if (diet === "none") {
        return { ...prev, diets: ["none"] };
      }
      const newDiets = prev.diets.filter((d) => d !== "none");
      return {
        ...prev,
        diets: newDiets.includes(diet)
          ? newDiets.filter((d) => d !== diet)
          : [...newDiets, diet],
      };
    });
  };

  const handleSubmit = async () => {
    if (preferences.moods.length === 0) {
      toast({
        title: "Please select at least one mood",
        variant: "destructive",
      });
      setCurrentStep("mood");
      return;
    }

    if (!hasLocation) {
      toast({
        title: "Location Required",
        description: "Please set your location in the navbar first.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Get restaurants using the global location
      const restaurants = await getRestaurants({
        lat: location.lat,
        lon: location.lon,
        city: location.city,
        cuisines: preferences.cuisines,
        mood: preferences.moods[0],
        budget: preferences.budget,
      });

      // Get EI response for mood
      const moodTips = getEIResponse("coach", preferences.moods[0]);

      const recommendations = {
        scientific_reasoning: `Based on your ${preferences.moods.join(", ")} mood, we've found restaurants that serve dishes rich in mood-boosting nutrients like omega-3s, magnesium, and tryptophan.`,
        mood_tips: moodTips,
        recommended_restaurants: restaurants.slice(0, 20),
      };

      navigate("/results", { state: { recommendations, preferences } });
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Error getting recommendations",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case "mood":
        return preferences.moods.length > 0;
      default:
        return true;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <LoadingState message="Finding perfect restaurants for your mood..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Location indicator */}
        {location && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4"
          >
            <span className="inline-flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
              <MapPin className="w-4 h-4" />
              {location.city}
            </span>
          </motion.div>
        )}

        {!location && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-4 p-3 bg-destructive/10 rounded-xl"
          >
            <p className="text-sm text-destructive">
              Please set your location in the navbar to get recommendations
            </p>
          </motion.div>
        )}

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {STEPS.map((step, index) => (
              <motion.div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index <= currentStepIndex
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                animate={{ scale: index === currentStepIndex ? 1.1 : 1 }}
              >
                {index + 1}
              </motion.div>
            ))}
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-coral rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentStepIndex + 1) / STEPS.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[400px]"
          >
            {currentStep === "mood" && (
              <MoodSelector
                selectedMoods={preferences.moods}
                onMoodToggle={handleMoodToggle}
              />
            )}
            {currentStep === "cuisine" && (
              <CuisinePicker
                selectedCuisines={preferences.cuisines}
                onCuisineToggle={handleCuisineToggle}
              />
            )}
            {currentStep === "diet" && (
              <DietFilters
                selectedDiets={preferences.diets}
                spiceLevel={preferences.spice}
                onDietToggle={handleDietToggle}
                onSpiceChange={(spice) => setPreferences((p) => ({ ...p, spice }))}
              />
            )}
            {currentStep === "budget" && (
              <BudgetSlider
                value={preferences.budget}
                onChange={(budget) => setPreferences((p) => ({ ...p, budget }))}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8">
          <Button
            variant="ghost"
            onClick={handleBack}
            disabled={isFirstStep}
            className="gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>

          {isLastStep ? (
            <Button
              variant="hero"
              onClick={handleSubmit}
              disabled={!canProceed() || !hasLocation}
              className="gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Get Recommendations
            </Button>
          ) : (
            <Button
              variant="coral"
              onClick={handleNext}
              disabled={!canProceed()}
              className="gap-2"
            >
              Next
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preferences;
