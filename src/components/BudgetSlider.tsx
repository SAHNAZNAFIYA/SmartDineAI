import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

interface BudgetSliderProps {
  value: number;
  onChange: (value: number) => void;
  currency?: string;
  min?: number;
  max?: number;
}

const BudgetSlider = ({
  value,
  onChange,
  currency = "₹",
  min = 100,
  max = 2000,
}: BudgetSliderProps) => {
  const getBudgetLabel = (val: number) => {
    if (val < 300) return "Budget Friendly";
    if (val < 600) return "Moderate";
    if (val < 1000) return "Premium";
    return "Luxurious";
  };

  const getBudgetEmoji = (val: number) => {
    if (val < 300) return "🪙";
    if (val < 600) return "💵";
    if (val < 1000) return "💰";
    return "💎";
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          What's your budget?
        </h2>
        <p className="text-muted-foreground">
          Set your spending limit per meal
        </p>
      </div>

      <div className="max-w-md mx-auto space-y-8">
        {/* Budget display */}
        <motion.div
          key={value}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="inline-flex items-center gap-3 bg-secondary px-6 py-4 rounded-2xl">
            <motion.span
              className="text-4xl"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
            >
              {getBudgetEmoji(value)}
            </motion.span>
            <div className="text-left">
              <p className="text-3xl font-bold text-foreground">
                {currency}{value}
              </p>
              <p className="text-sm text-muted-foreground">
                {getBudgetLabel(value)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Slider */}
        <div className="px-4">
          <Slider
            value={[value]}
            onValueChange={(vals) => onChange(vals[0])}
            min={min}
            max={max}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between mt-2 text-sm text-muted-foreground">
            <span>{currency}{min}</span>
            <span>{currency}{max}+</span>
          </div>
        </div>

        {/* Quick select buttons */}
        <div className="flex gap-2 justify-center flex-wrap">
          {[200, 500, 800, 1200].map((preset) => (
            <motion.button
              key={preset}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onChange(preset)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                value === preset
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {currency}{preset}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BudgetSlider;
