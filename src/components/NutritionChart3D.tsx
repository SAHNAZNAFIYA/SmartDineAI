import { motion } from "framer-motion";
import { NutritionInfo } from "@/types/smartdine";

interface NutritionChart3DProps {
  nutrition: NutritionInfo;
  index?: number;
}

const NutritionChart3D = ({ nutrition, index = 0 }: NutritionChart3DProps) => {
  const nutrients = [
    { key: "protein", label: "Protein", value: nutrition.protein, unit: "g", color: "from-coral to-coral-light", maxValue: 50, icon: "💪" },
    { key: "carbs", label: "Carbs", value: nutrition.carbs, unit: "g", color: "from-honey to-honey-light", maxValue: 80, icon: "🌾" },
    { key: "fat", label: "Fat", value: nutrition.fat, unit: "g", color: "from-teal to-mint", maxValue: 40, icon: "🥑" },
    { key: "fiber", label: "Fiber", value: nutrition.fiber, unit: "g", color: "from-mint to-teal-light", maxValue: 20, icon: "🥬" },
  ];

  const moodNutrients = [
    { key: "magnesium", label: "Magnesium", value: nutrition.magnesium, unit: "mg", color: "from-lavender to-purple-300", icon: "✨", maxValue: 150, description: "Calms nerves" },
    { key: "omega3", label: "Omega-3", value: nutrition.omega3, unit: "g", color: "from-blue-400 to-teal", icon: "🐟", maxValue: 5, description: "Brain health" },
    { key: "vitamin_b", label: "Vitamin B", value: nutrition.vitamin_b, unit: "mg", color: "from-honey to-coral", icon: "⚡", maxValue: 60, description: "Energy" },
    { key: "tryptophan", label: "Tryptophan", value: nutrition.tryptophan, unit: "g", color: "from-pink-400 to-lavender", icon: "😴", maxValue: 1, description: "Serotonin" },
  ].filter(n => n.value !== undefined && n.value > 0);

  return (
    <div className="space-y-6">
      {/* Main macros - 3D animated bars */}
      <div className="space-y-4">
        <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <span className="text-lg">📊</span> Nutrition Breakdown
        </h5>
        
        <div className="grid grid-cols-2 gap-4">
          {nutrients.map((nutrient, i) => {
            const percentage = Math.min((nutrient.value / nutrient.maxValue) * 100, 100);
            
            return (
              <motion.div
                key={nutrient.key}
                initial={{ opacity: 0, rotateX: -20, y: 20 }}
                animate={{ opacity: 1, rotateX: 0, y: 0 }}
                transition={{ delay: index * 0.1 + i * 0.1, type: "spring", stiffness: 100 }}
                className="relative group"
                style={{ perspective: "1000px" }}
              >
                <motion.div
                  className="relative bg-secondary/50 rounded-xl p-3 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05, 
                    rotateY: 5,
                    boxShadow: "0 10px 30px -10px rgba(0,0,0,0.2)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* 3D depth effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xl" style={{ transform: "translateZ(10px)" }}>{nutrient.icon}</span>
                    <motion.span 
                      className="text-sm font-bold text-foreground"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 + i * 0.1 + 0.2 }}
                    >
                      {nutrient.value}{nutrient.unit}
                    </motion.span>
                  </div>
                  
                  <span className="text-xs text-muted-foreground block mb-2">{nutrient.label}</span>
                  
                  {/* 3D progress bar */}
                  <div className="h-2 bg-muted rounded-full overflow-hidden relative">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${nutrient.color} rounded-full relative`}
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ delay: index * 0.1 + i * 0.1 + 0.3, duration: 0.8, ease: "easeOut" }}
                    >
                      {/* Shine effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                        animate={{ x: ["-100%", "200%"] }}
                        transition={{ repeat: Infinity, duration: 2, delay: i * 0.3 }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mood-boosting nutrients - floating 3D cards */}
      {moodNutrients.length > 0 && (
        <div className="space-y-3">
          <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <span className="text-lg">🧠</span> Mood-Boosting Nutrients
          </h5>
          
          <div className="flex flex-wrap gap-2">
            {moodNutrients.map((nutrient, i) => (
              <motion.div
                key={nutrient.key}
                initial={{ opacity: 0, scale: 0.5, rotateY: -180 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                transition={{ 
                  delay: index * 0.1 + i * 0.15 + 0.5,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.1, 
                  rotateZ: [-2, 2, -2, 0],
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)"
                }}
                className="relative group cursor-pointer"
                style={{ perspective: "500px" }}
              >
                <div className={`relative px-4 py-3 rounded-xl bg-gradient-to-br ${nutrient.color} text-white overflow-hidden`}>
                  {/* 3D surface effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-white/20 pointer-events-none" />
                  
                  {/* Floating icon */}
                  <motion.span 
                    className="text-lg block text-center mb-1"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                  >
                    {nutrient.icon}
                  </motion.span>
                  
                  <div className="text-center relative z-10">
                    <div className="text-xs opacity-90">{nutrient.label}</div>
                    <div className="font-bold text-sm">
                      {nutrient.value}{nutrient.unit}
                    </div>
                  </div>
                  
                  {/* Tooltip on hover */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none z-20"
                  >
                    {nutrient.description}
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Calorie indicator - 3D ring */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 + 0.8 }}
        className="flex items-center gap-4 p-4 bg-gradient-to-r from-secondary/50 to-muted/30 rounded-xl"
      >
        <motion.div 
          className="relative w-16 h-16"
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.6 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front */}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gradient-coral rounded-full"
            style={{ backfaceVisibility: "hidden" }}
          >
            <span className="text-2xl">🔥</span>
          </div>
          {/* Back */}
          <div 
            className="absolute inset-0 flex items-center justify-center bg-gradient-teal rounded-full text-white font-bold text-sm"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            {nutrition.calories}
          </div>
        </motion.div>
        
        <div>
          <div className="text-2xl font-bold text-foreground">{nutrition.calories} cal</div>
          <div className="text-sm text-muted-foreground">Total calories per serving</div>
        </div>
      </motion.div>
    </div>
  );
};

export default NutritionChart3D;
