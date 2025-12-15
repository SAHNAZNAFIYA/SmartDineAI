import { motion } from "framer-motion";

interface LoadingStateProps {
  message?: string;
}

const LoadingState = ({ message = "Finding perfect dishes for you..." }: LoadingStateProps) => {
  const foodEmojis = ["🍕", "🍔", "🍣", "🥗", "🍜"];

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-8">
      {/* Animated food emojis */}
      <div className="flex gap-4">
        {foodEmojis.map((emoji, index) => (
          <motion.span
            key={index}
            className="text-4xl"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: index * 0.15,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.span>
        ))}
      </div>

      {/* Loading bar */}
      <div className="w-64 h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-coral rounded-full"
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Message */}
      <motion.p
        className="text-muted-foreground text-center"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </div>
  );
};

export default LoadingState;
