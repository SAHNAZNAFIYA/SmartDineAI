import { motion } from "framer-motion";
import { Zap, Beef, Wheat, Droplet, Apple, Brain } from "lucide-react";
import { NutritionInfo } from "@/types/smartdine";

interface NutritionChartProps {
  nutrition: NutritionInfo;
  index?: number;
}

const NutritionChart = ({ nutrition, index = 0 }: NutritionChartProps) => {
  const nutrients = [
    { label: "Calories", value: nutrition.calories, max: 800, icon: Zap, color: "text-coral", bgColor: "bg-coral/20" },
    { label: "Protein", value: nutrition.protein, max: 50, icon: Beef, color: "text-teal", bgColor: "bg-teal/20", unit: "g" },
    { label: "Carbs", value: nutrition.carbs, max: 100, icon: Wheat, color: "text-honey", bgColor: "bg-honey/20", unit: "g" },
    { label: "Fat", value: nutrition.fat, max: 30, icon: Droplet, color: "text-mint", bgColor: "bg-mint/20", unit: "g" },
    { label: "Fiber", value: nutrition.fiber, max: 15, icon: Apple, color: "text-lavender", bgColor: "bg-lavender/20", unit: "g" },
  ];

  const specialNutrients = [];
  if (nutrition.magnesium) {
    specialNutrients.push({ label: "Magnesium", value: nutrition.magnesium, icon: "🍫", benefit: "Stress relief" });
  }
  if (nutrition.omega3) {
    specialNutrients.push({ label: "Omega-3", value: nutrition.omega3, icon: "🐟", benefit: "Brain health" });
  }
  if (nutrition.vitamin_b) {
    specialNutrients.push({ label: "Vitamin B", value: nutrition.vitamin_b, icon: "🥬", benefit: "Energy boost" });
  }
  if (nutrition.tryptophan) {
    specialNutrients.push({ label: "Tryptophan", value: nutrition.tryptophan, icon: "😴", benefit: "Sleep aid" });
  }

  return (
    <div className="space-y-4">
      {/* Main macros */}
      <div className="space-y-3">
        {nutrients.map((nutrient, i) => {
          const percentage = Math.min((nutrient.value / nutrient.max) * 100, 100);
          const Icon = nutrient.icon;
          
          return (
            <motion.div
              key={nutrient.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: (index * 0.1) + (i * 0.05) }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className={`w-6 h-6 rounded-lg ${nutrient.bgColor} flex items-center justify-center`}>
                    <Icon className={`w-4 h-4 ${nutrient.color}`} />
                  </div>
                  <span className="font-medium text-foreground">{nutrient.label}</span>
                </div>
                <span className="font-semibold text-foreground">
                  {nutrient.value}{nutrient.unit || ''}
                </span>
              </div>
              
              <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ delay: (index * 0.1) + (i * 0.05) + 0.2, duration: 0.6, ease: "easeOut" }}
                  className={`absolute inset-y-0 left-0 ${nutrient.bgColor} rounded-full`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent to-white/30`} />
                </motion.div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Special mood-boosting nutrients */}
      {specialNutrients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: (index * 0.1) + 0.5 }}
          className="pt-3 border-t border-border"
        >
          <div className="flex items-center gap-2 mb-2">
            <Brain className="w-4 h-4 text-accent" />
            <span className="text-sm font-medium text-accent">Mood Boosters</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {specialNutrients.map((nutrient, i) => (
              <motion.div
                key={nutrient.label}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (index * 0.1) + 0.6 + (i * 0.1) }}
                className="bg-accent/10 rounded-lg p-2"
              >
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-lg">{nutrient.icon}</span>
                  <span className="text-xs font-semibold text-foreground">{nutrient.label}</span>
                </div>
                <p className="text-xs text-muted-foreground">{nutrient.benefit}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NutritionChart;
