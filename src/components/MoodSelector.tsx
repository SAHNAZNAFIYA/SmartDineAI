import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { MoodType, MOOD_INFO } from "@/types/smartdine";

interface MoodSelectorProps {
  selectedMoods: MoodType[];
  onMoodToggle: (mood: MoodType) => void;
}

const moodColors: Record<MoodType, string> = {
  happy: "from-yellow-400 to-orange-400",
  calm: "from-teal to-mint",
  stressed: "from-coral to-red-400",
  tired: "from-lavender to-purple-400",
  energetic: "from-mint to-emerald-400",
  pms: "from-pink-400 to-rose-400",
  anxious: "from-orange-400 to-coral",
  sad: "from-blue-400 to-indigo-400",
};

const MoodSelector = ({ selectedMoods, onMoodToggle }: MoodSelectorProps) => {
  const moods = Object.keys(MOOD_INFO) as MoodType[];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          How are you feeling?
        </h2>
        <p className="text-muted-foreground">
          Select one or more moods that match your current state
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {moods.map((mood, index) => {
          const info = MOOD_INFO[mood];
          const isSelected = selectedMoods.includes(mood);

          return (
            <motion.button
              key={mood}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => onMoodToggle(mood)}
              className={cn(
                "relative group p-4 rounded-2xl transition-all duration-300",
                "border-2 overflow-hidden",
                isSelected
                  ? "border-primary shadow-glow scale-105"
                  : "border-border hover:border-primary/50 hover:shadow-soft"
              )}
            >
              {/* Background gradient */}
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300",
                  moodColors[mood],
                  isSelected ? "opacity-20" : "group-hover:opacity-10"
                )}
              />

              {/* Floating emoji */}
              <motion.div
                className="relative z-10"
                animate={
                  isSelected
                    ? {
                        y: [0, -5, 0],
                        rotate: [0, 5, -5, 0],
                      }
                    : {}
                }
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.2,
                  rotate: [0, -10, 10, 0],
                  transition: { duration: 0.5 },
                }}
              >
                <span className="text-4xl block mb-2">{info.emoji}</span>
              </motion.div>

              <div className="relative z-10 space-y-1">
                <span className="font-medium text-foreground capitalize block">
                  {mood}
                </span>
                <span className="text-xs text-muted-foreground block">
                  {info.description}
                </span>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default MoodSelector;
