import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CuisineType, CUISINE_INFO } from "@/types/smartdine";

interface CuisinePickerProps {
  selectedCuisines: CuisineType[];
  onCuisineToggle: (cuisine: CuisineType) => void;
}

const CuisinePicker = ({ selectedCuisines, onCuisineToggle }: CuisinePickerProps) => {
  const cuisines = Object.keys(CUISINE_INFO) as CuisineType[];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          What cuisines are you craving?
        </h2>
        <p className="text-muted-foreground">
          Pick your favorite cuisines for personalized recommendations
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {cuisines.map((cuisine, index) => {
          const info = CUISINE_INFO[cuisine];
          const isSelected = selectedCuisines.includes(cuisine);

          return (
            <motion.button
              key={cuisine}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              onClick={() => onCuisineToggle(cuisine)}
              className={cn(
                "relative group p-4 rounded-xl transition-all duration-300",
                "border-2 text-center",
                isSelected
                  ? "border-accent bg-accent/10 shadow-soft"
                  : "border-border hover:border-accent/50 bg-card"
              )}
            >
              <motion.span
                className="text-3xl block mb-2"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {info.emoji}
              </motion.span>
              <span className="font-medium text-foreground text-sm block">
                {cuisine}
              </span>
              
              {/* Popular dishes tooltip on hover */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                <div className="bg-foreground text-background text-xs px-3 py-2 rounded-lg whitespace-nowrap shadow-medium">
                  <p className="font-semibold mb-1">Popular:</p>
                  <p>{info.popular.slice(0, 2).join(", ")}</p>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
                </div>
              </div>

              {/* Selection checkmark */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-accent rounded-full flex items-center justify-center"
                >
                  <svg
                    className="w-3 h-3 text-accent-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
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

export default CuisinePicker;
