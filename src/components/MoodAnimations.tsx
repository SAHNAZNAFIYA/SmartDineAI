import { motion, AnimatePresence } from "framer-motion";
import { MoodType } from "@/types/smartdine";

interface MoodAnimationsProps {
  mood: MoodType;
  size?: "sm" | "md" | "lg";
}

const MoodAnimations = ({ mood, size = "md" }: MoodAnimationsProps) => {
  const sizeClasses = {
    sm: "text-6xl",
    md: "text-8xl",
    lg: "text-[12rem]",
  };

  const moodAnimations = {
    happy: {
      emoji: "🌞",
      particles: ["✨", "🌟", "💛", "🌈"],
      animation: {
        y: [0, -20, 0],
        rotate: [0, 10, -10, 0],
        scale: [1, 1.1, 1],
      },
    },
    calm: {
      emoji: "🧘‍♀️",
      particles: ["🍃", "💚", "🌿", "☮️"],
      animation: {
        y: [0, -10, 0],
        rotate: [0, 5, -5, 0],
        scale: [1, 1.05, 1],
      },
    },
    stressed: {
      emoji: "🌡️",
      particles: ["💢", "⚡", "🔥", "😰"],
      animation: {
        x: [-5, 5, -5, 5, 0],
        rotate: [-10, 10, -10, 10, 0],
      },
    },
    tired: {
      emoji: "😴",
      particles: ["💤", "🌙", "⭐", "☁️"],
      animation: {
        y: [0, 5, 0, 5, 0],
        opacity: [1, 0.8, 1, 0.8, 1],
      },
    },
    energetic: {
      emoji: "⚡",
      particles: ["🔋", "💪", "🌟", "✨"],
      animation: {
        y: [0, -30, 0],
        scale: [1, 1.2, 1],
        rotate: [0, 360],
      },
    },
    pms: {
      emoji: "🌸",
      particles: ["💗", "🌺", "🍫", "☕"],
      animation: {
        y: [0, -15, 0],
        scale: [1, 1.1, 1],
      },
    },
    anxious: {
      emoji: "😰",
      particles: ["💭", "🌪️", "😟", "💙"],
      animation: {
        x: [-3, 3, -3, 3, 0],
        y: [-3, 3, -3, 3, 0],
      },
    },
    sad: {
      emoji: "💙",
      particles: ["💙", "🌧️", "☁️", "🫂"],
      animation: {
        y: [0, 10, 0],
        opacity: [1, 0.7, 1],
      },
    },
  };

  const config = moodAnimations[mood];

  return (
    <div className="relative flex items-center justify-center">
      {/* Main emoji */}
      <motion.div
        className={`${sizeClasses[size]} z-10`}
        animate={config.animation}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {config.emoji}
      </motion.div>

      {/* Floating particles */}
      <AnimatePresence>
        {config.particles.map((particle, index) => {
          const angle = (index * 360) / config.particles.length;
          const radius = size === "lg" ? 120 : size === "md" ? 80 : 60;
          
          return (
            <motion.div
              key={`${mood}-${particle}-${index}`}
              className="absolute text-2xl"
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0,
              }}
              animate={{
                x: Math.cos((angle * Math.PI) / 180) * radius,
                y: Math.sin((angle * Math.PI) / 180) * radius,
                opacity: [0, 1, 1, 0],
                scale: [0, 1, 1, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
            >
              {particle}
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl opacity-30"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          background: mood === "happy" ? "hsl(var(--honey))" :
                     mood === "calm" ? "hsl(var(--teal))" :
                     mood === "stressed" ? "hsl(var(--coral))" :
                     mood === "tired" ? "hsl(var(--lavender))" :
                     mood === "energetic" ? "hsl(var(--mint))" :
                     mood === "pms" ? "hsl(var(--mood-pms))" :
                     "hsl(var(--accent))",
        }}
      />
    </div>
  );
};

export default MoodAnimations;
