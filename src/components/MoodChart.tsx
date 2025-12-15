import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { MoodHistoryEntry, MOOD_INFO, MoodType } from "@/types/smartdine";

interface MoodChartProps {
  history: MoodHistoryEntry[];
}

const MOOD_COLORS: Record<string, string> = {
  happy: "#f59e0b",
  calm: "#14b8a6",
  stressed: "#ef6461",
  tired: "#a78bfa",
  energetic: "#34d399",
  pms: "#f472b6",
  anxious: "#fb923c",
  sad: "#818cf8",
};

const MoodChart = ({ history }: MoodChartProps) => {
  // Process data for pie chart (mood distribution)
  const moodCounts = history.reduce((acc, entry) => {
    entry.moods.forEach((mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
    });
    return acc;
  }, {} as Record<string, number>);

  const pieData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood,
    value: count,
    emoji: MOOD_INFO[mood as MoodType]?.emoji || "😊",
  }));

  // Process data for area chart (mood over time)
  const timelineData = history.slice(-14).map((entry) => ({
    date: new Date(entry.timestamp).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    mood: entry.moods[0] || "happy",
    moodScore:
      entry.moods[0] === "happy"
        ? 5
        : entry.moods[0] === "energetic"
        ? 4
        : entry.moods[0] === "calm"
        ? 3
        : entry.moods[0] === "tired"
        ? 2
        : 1,
  }));

  if (history.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 space-y-4"
      >
        <div className="text-6xl">📊</div>
        <h3 className="text-xl font-display font-semibold text-foreground">
          No Mood Data Yet
        </h3>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Start getting recommendations to build your mood history and see
          insights here.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Your Mood Journey
        </h2>
        <p className="text-muted-foreground">
          Track how your mood and food choices evolve over time
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Mood Distribution Pie Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Mood Distribution</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, emoji }) => `${emoji} ${name}`}
                  labelLine={false}
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={MOOD_COLORS[entry.name] || "#94a3b8"}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-medium">
                          <p className="text-sm font-medium">
                            {data.emoji} {data.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {data.value} times
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Mood Timeline Area Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card rounded-2xl p-6"
        >
          <h3 className="font-semibold text-foreground mb-4">Mood Timeline</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timelineData}>
                <defs>
                  <linearGradient id="moodGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef6461" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef6461" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 5]}
                  tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  tickFormatter={(value) => {
                    const labels = ["😢", "😰", "😌", "⚡", "😊"];
                    return labels[value - 1] || "";
                  }}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-medium">
                          <p className="text-sm font-medium">{data.date}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                            Mood: {data.mood}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="moodScore"
                  stroke="#ef6461"
                  strokeWidth={2}
                  fill="url(#moodGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Fun Animated Stats */}
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  className="grid md:grid-cols-4 gap-6 mb-12"
>
  {[
    {
      title: "Food Dates Logged 🍽️",
      value: history.length,
      caption: "You & food? Going strong 😌",
      gradient: "from-pink-400 to-rose-500",
    },
    {
      title: "Mood Personalities 😌",
      value: new Set(history.flatMap(h => h.moods)).size,
      caption: "Yes, you're emotionally rich",
      gradient: "from-teal-400 to-emerald-500",
    },
    {
      title: "Dishes Discovered 🔥",
      value: history.reduce((a, e) => a + e.recommendations.length, 0),
      caption: "Taste buds well travelled",
      gradient: "from-amber-400 to-orange-500",
    },
    {
      title: "Current Vibe 😏",
      value: "😰",
      caption: "Stress, but make it stylish",
      gradient: "from-purple-400 to-indigo-500",
    },
  ].map((stat, i) => (
    <motion.div
      key={i}
      whileHover={{ scale: 1.06, rotateX: 8, rotateY: -8 }}
      className={`rounded-2xl p-6 text-white bg-gradient-to-br ${stat.gradient} shadow-xl`}
    >
      <div className="text-4xl font-bold">{stat.value}</div>
      <p className="font-semibold mt-1">{stat.title}</p>
      <p className="text-sm opacity-90 mt-1">{stat.caption}</p>
    </motion.div>
  ))}
</motion.div>

    </div>
  );
};

export default MoodChart;
