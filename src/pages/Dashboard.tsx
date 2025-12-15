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
        nutrition: {
          calories: 200,
          protein: 5,
          carbs: 25,
          fat: 10,
          fiber: 3,
          magnesium: 95,
        },
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
        nutrition: {
          calories: 300,
          protein: 20,
          carbs: 35,
          fat: 8,
          fiber: 2,
          omega3: 2.5,
        },
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
        nutrition: {
          calories: 250,
          protein: 8,
          carbs: 15,
          fat: 18,
          fiber: 4,
        },
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
        nutrition: {
          calories: 0,
          protein: 0,
          carbs: 0,
          fat: 0,
          fiber: 0,
        },
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
        nutrition: {
          calories: 150,
          protein: 2,
          carbs: 10,
          fat: 12,
          fiber: 7,
        },
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
        nutrition: {
          calories: 180,
          protein: 6,
          carbs: 20,
          fat: 8,
          fiber: 5,
        },
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
        nutrition: {
          calories: 450,
          protein: 18,
          carbs: 60,
          fat: 15,
          fiber: 8,
        },
        mood_boost: "Satisfying and nutritious",
        estimated_calories: 450,
        portion: "1 bowl",
      },
    ],
  },
];

const Dashboard = () => {
  const [history, setHistory] = useState<MoodHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading and use sample data
    // In production, this would fetch from the database
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
      
      setIsLoading(false);
    };

    loadHistory();
  }, []);

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
      whileHover={{ scale: 1.03, rotateZ: 0.5 }}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="glass-card rounded-xl p-5 flex items-center gap-5 cursor-pointer"
    >
      <motion.div
        className="text-3xl"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {entry.moods[0] === "happy" ? "😊" :
         entry.moods[0] === "stressed" ? "😰" :
         entry.moods[0] === "tired" ? "😴" :
         entry.moods[0] === "calm" ? "😌" :
         entry.moods[0] === "energetic" ? "⚡" : "🤔"}
      </motion.div>

      <div className="flex-1">
        <p className="font-semibold capitalize">
          Feeling {entry.moods[0]} & craving comfort
        </p>
        <p className="text-sm text-muted-foreground">
          You matched with <span className="font-medium">{entry.recommendations[0]?.name}</span> 💘
        </p>
      </div>

      <div className="text-xs text-muted-foreground">
        {new Date(entry.timestamp).toLocaleDateString()}
      </div>
    </motion.div>
  ))}
</div>

          </motion.div>
        )}

        {/* Tips section */}
        <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="mt-12 glass-card rounded-3xl p-8"
>
  <h2 className="text-2xl font-semibold mb-6">
    💡 SmartDine Knows You Pretty Well 😏
  </h2>

  <div className="grid md:grid-cols-2 gap-6">
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-yellow-100 to-amber-200"
    >
      <h3 className="text-lg font-semibold mb-2">🌅 Morning Mood Hack</h3>
      <p className="text-sm">
        Protein breakfasts = fewer mood swings.  
        Basically, eggs before emails 🥚📧
      </p>
    </motion.div>

    <motion.div
      whileHover={{ scale: 1.05 }}
      className="p-6 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-200"
    >
      <h3 className="text-lg font-semibold mb-2">🍫 Stress Therapy</h3>
      <p className="text-sm">
        Dark chocolate helped you survive tough days.  
        Emotional support, but edible 💖
      </p>
    </motion.div>
  </div>
</motion.div>

      </div>
    </div>
  );
};

export default Dashboard;
