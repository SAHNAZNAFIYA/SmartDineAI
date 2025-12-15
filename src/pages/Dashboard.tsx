import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MoodChart from "@/components/MoodChart";
import LoadingState from "@/components/LoadingState";
import { MoodHistoryEntry } from "@/types/smartdine";

// Sample data for demonstration
const SAMPLE_HISTORY: MoodHistoryEntry[] = [
  {
    id: "1",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    moods: ["stressed"],
    cuisines: ["Indian"],
    recommendations: [
      {
        name: "Dark Chocolate Mousse",
        why: "Rich in antioxidants",
        nutrition: { calories: 200, protein: 5, carbs: 25, fat: 10, fiber: 3, magnesium: 95 },
        mood_boost: "Releases endorphins",
        estimated_calories: 200,
        portion: "1 cup",
      },
    ],
  },
  {
    id: "2",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    moods: ["tired"],
    cuisines: ["Japanese"],
    recommendations: [
      {
        name: "Salmon Sushi",
        why: "Omega-3 for brain health",
        nutrition: { calories: 300, protein: 20, carbs: 35, fat: 8, fiber: 2, omega3: 2.5 },
        mood_boost: "Boosts energy",
        estimated_calories: 300,
        portion: "6 pieces",
      },
    ],
  },
  {
    id: "3",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    moods: ["happy"],
    cuisines: ["Italian"],
    recommendations: [
      {
        name: "Caprese Salad",
        why: "Fresh and light",
        nutrition: { calories: 250, protein: 8, carbs: 15, fat: 18, fiber: 4 },
        mood_boost: "Maintains good mood",
        estimated_calories: 250,
        portion: "1 plate",
      },
    ],
  },
  {
    id: "4",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    moods: ["anxious"],
    cuisines: ["Thai"],
    recommendations: [
      {
        name: "Green Tea",
        why: "L-theanine for calm",
        nutrition: { calories: 0, protein: 0, carbs: 0, fat: 0, fiber: 0 },
        mood_boost: "Reduces anxiety",
        estimated_calories: 0,
        portion: "2 cups",
      },
    ],
  },
  {
    id: "5",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    moods: ["energetic"],
    cuisines: ["Mexican"],
    recommendations: [
      {
        name: "Guacamole",
        why: "Healthy fats",
        nutrition: { calories: 150, protein: 2, carbs: 10, fat: 12, fiber: 7 },
        mood_boost: "Sustained energy",
        estimated_calories: 150,
        portion: "1/2 cup",
      },
    ],
  },
  {
    id: "6",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    moods: ["calm"],
    cuisines: ["Mediterranean"],
    recommendations: [
      {
        name: "Hummus with Veggies",
        why: "Fiber and protein",
        nutrition: { calories: 180, protein: 6, carbs: 20, fat: 8, fiber: 5 },
        mood_boost: "Maintains calm",
        estimated_calories: 180,
        portion: "1 serving",
      },
    ],
  },
  {
    id: "7",
    timestamp: new Date().toISOString(),
    moods: ["happy"],
    cuisines: ["Korean"],
    recommendations: [
      {
        name: "Bibimbap",
        why: "Balanced nutrition",
        nutrition: { calories: 450, protein: 18, carbs: 60, fat: 15, fiber: 8 },
        mood_boost: "Satisfying and nutritious",
        estimated_calories: 450,
        portion: "1 bowl",
      },
    ],
  },
];

// Wellness tips that rotate dynamically
const WELLNESS_TIPS = [
  { icon: '🌅', title: 'Morning Mood Pattern', tip: 'Starting the day with protein-rich foods helps maintain stable energy levels.' },
  { icon: '🍫', title: 'Stress Relief Foods', tip: 'Dark chocolate and nuts have helped improve mood on stressful days. Keep them handy!' },
  { icon: '💧', title: 'Stay Hydrated', tip: 'Drinking water before meals can improve digestion and reduce overeating.' },
  { icon: '🥗', title: 'Colorful Plates', tip: 'Eating a variety of colorful vegetables ensures diverse nutrient intake.' },
  { icon: '😴', title: 'Sleep & Digestion', tip: 'Avoid heavy meals 2-3 hours before bed for better sleep quality.' },
  { icon: '🏃', title: 'Post-Meal Activity', tip: 'A short walk after meals can aid digestion and boost mood.' },
];

const Dashboard = () => {
  const [history, setHistory] = useState<MoodHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayedTips, setDisplayedTips] = useState<typeof WELLNESS_TIPS>([]);
  const [animatedStats, setAnimatedStats] = useState({ sessions: 0, moods: 0, cuisines: 0 });

  useEffect(() => {
    // Simulate loading and use sample data
    const loadHistory = async () => {
      setIsLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Try to load from localStorage or use sample data
      const savedHistory = localStorage.getItem("smartdine_mood_history");
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch {
          setHistory(SAMPLE_HISTORY);
        }
      } else {
        setHistory(SAMPLE_HISTORY);
      }
      
      // Rotate tips dynamically
      const shuffledTips = [...WELLNESS_TIPS].sort(() => Math.random() - 0.5);
      setDisplayedTips(shuffledTips.slice(0, 2));
      
      setIsLoading(false);
    };

    loadHistory();
  }, []);

  // Animate numbers on load
  useEffect(() => {
    if (!isLoading && history.length > 0) {
      const targetStats = {
        sessions: history.length,
        moods: new Set(history.flatMap(h => h.moods)).size,
        cuisines: new Set(history.flatMap(h => h.cuisines)).size,
      };
      
      // Animate each stat
      let frame = 0;
      const totalFrames = 30;
      const animate = () => {
        frame++;
        const progress = frame / totalFrames;
        const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
        
        setAnimatedStats({
          sessions: Math.round(targetStats.sessions * eased),
          moods: Math.round(targetStats.moods * eased),
          cuisines: Math.round(targetStats.cuisines * eased),
        });
        
        if (frame < totalFrames) {
          requestAnimationFrame(animate);
        }
      };
      
      animate();
    }
  }, [isLoading, history]);

  // Generate randomized timestamps for recent activity
  const getRandomizedTime = (baseTimestamp: string, index: number) => {
    const date = new Date(baseTimestamp);
    // Add small random variation (up to 2 hours)
    date.setMinutes(date.getMinutes() + Math.floor(Math.random() * 120) - 60);
    return date.toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 px-4">
        <LoadingState message="Loading your mood history..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Your Wellness Dashboard
          </h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Track your mood patterns and food choices over time to 
            understand your emotional eating habits.
          </p>
        </motion.div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="glass-card rounded-2xl p-6 text-center">
            <motion.div 
              className="text-4xl font-bold text-primary"
              key={animatedStats.sessions}
            >
              {animatedStats.sessions}
            </motion.div>
            <p className="text-sm text-muted-foreground mt-1">Sessions</p>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <motion.div 
              className="text-4xl font-bold text-accent"
              key={animatedStats.moods}
            >
              {animatedStats.moods}
            </motion.div>
            <p className="text-sm text-muted-foreground mt-1">Moods Tracked</p>
          </div>
          <div className="glass-card rounded-2xl p-6 text-center">
            <motion.div 
              className="text-4xl font-bold text-honey"
              key={animatedStats.cuisines}
            >
              {animatedStats.cuisines}
            </motion.div>
            <p className="text-sm text-muted-foreground mt-1">Cuisines Explored</p>
          </div>
        </motion.div>

        {/* Charts */}
        <MoodChart history={history} />

        {/* Recent activity */}
        {history.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12"
          >
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {history.slice(-5).reverse().map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card rounded-xl p-4 flex items-center gap-4"
                >
                  <motion.div 
                    className="text-2xl"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ delay: index * 0.2, duration: 0.5 }}
                  >
                    {entry.moods[0] === "happy" ? "😊" :
                     entry.moods[0] === "stressed" ? "😰" :
                     entry.moods[0] === "tired" ? "😴" :
                     entry.moods[0] === "calm" ? "😌" :
                     entry.moods[0] === "energetic" ? "⚡" : "🤔"}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground capitalize">
                      {entry.moods.join(", ")}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {entry.recommendations[0]?.name || "No recommendations"}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {getRandomizedTime(entry.timestamp, index)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Tips section - Dynamic rotation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 glass-card rounded-2xl p-6"
        >
          <h2 className="text-xl font-semibold text-foreground mb-4">
            💡 Wellness Tips Based on Your Data
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            {displayedTips.map((tip, index) => (
              <motion.div 
                key={tip.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="p-4 bg-secondary/50 rounded-xl"
              >
                <h3 className="font-medium text-foreground mb-2 flex items-center gap-2">
                  <span className="text-xl">{tip.icon}</span>
                  {tip.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {tip.tip}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
