import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { DietType, SpiceLevel } from "@/types/smartdine";

interface DietFiltersProps {
  selectedDiets: DietType[];
  spiceLevel: SpiceLevel;
  onDietToggle: (diet: DietType) => void;
  onSpiceChange: (spice: SpiceLevel) => void;
}

const DIET_OPTIONS: { value: DietType; label: string; emoji: string }[] = [
  { value: "none", label: "No Restrictions", emoji: "🍽️" },
  { value: "vegetarian", label: "Vegetarian", emoji: "🥬" },
  { value: "vegan", label: "Vegan", emoji: "🌱" },
  { value: "gluten-free", label: "Gluten-Free", emoji: "🌾" },
  { value: "dairy-free", label: "Dairy-Free", emoji: "🥛" },
  { value: "keto", label: "Keto", emoji: "🥑" },
  { value: "paleo", label: "Paleo", emoji: "🥩" },
];

const SPICE_LEVELS: { value: SpiceLevel; label: string; emoji: string; color: string }[] = [
  { value: "mild", label: "Mild", emoji: "🌶️", color: "from-green-400 to-green-500" },
  { value: "medium", label: "Medium", emoji: "🌶️🌶️", color: "from-yellow-400 to-orange-400" },
  { value: "hot", label: "Hot", emoji: "🌶️🌶️🌶️", color: "from-orange-400 to-red-400" },
  { value: "extra-hot", label: "Extra Hot", emoji: "🔥", color: "from-red-500 to-red-600" },
];

const DietFilters = ({
  selectedDiets,
  spiceLevel,
  onDietToggle,
  onSpiceChange,
}: DietFiltersProps) => {
  return (
    <div className="space-y-8">
      {/* Diet preferences */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Dietary Preferences
          </h2>
          <p className="text-muted-foreground">
            Select any dietary restrictions or preferences
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {DIET_OPTIONS.map((diet, index) => {
            const isSelected = selectedDiets.includes(diet.value);
            return (
              <motion.button
                key={diet.value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => onDietToggle(diet.value)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                  "border-2",
                  isSelected
                    ? "border-accent bg-accent/10 text-foreground shadow-soft"
                    : "border-border bg-card text-muted-foreground hover:border-accent/50"
                )}
              >
                <span className="text-lg">{diet.emoji}</span>
                <span className="font-medium text-sm">{diet.label}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Spice level */}
      <div className="space-y-4">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-display font-semibold text-foreground">
            Spice Tolerance
          </h2>
          <p className="text-muted-foreground">
            How much heat can you handle?
          </p>
        </div>

        <div className="flex gap-3 justify-center flex-wrap">
          {SPICE_LEVELS.map((spice, index) => {
            const isSelected = spiceLevel === spice.value;
            return (
              <motion.button
                key={spice.value}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => onSpiceChange(spice.value)}
                className={cn(
                  "relative overflow-hidden px-5 py-3 rounded-xl transition-all duration-300",
                  "border-2 min-w-[100px]",
                  isSelected
                    ? "border-primary shadow-glow"
                    : "border-border hover:border-primary/50"
                )}
              >
                {/* Background gradient for selected */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={cn(
                      "absolute inset-0 bg-gradient-to-r opacity-20",
                      spice.color
                    )}
                  />
                )}
                <div className="relative z-10">
                  <span className="text-xl block mb-1">{spice.emoji}</span>
                  <span className="font-medium text-sm text-foreground">
                    {spice.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DietFilters;
