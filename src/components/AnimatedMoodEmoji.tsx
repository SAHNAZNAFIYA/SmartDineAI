/**
 * ANIMATED MOOD EMOJI COMPONENT
 * Large, animated 3D-style emojis for AI Coach
 * Replaces static GIF-based mood display
 */

import { motion } from "framer-motion";
import { MoodType } from "@/types/smartdine";

interface AnimatedMoodEmojiProps {
  mood: MoodType;
  keywords?: string[];
  size?: 'sm' | 'md' | 'lg';
}

// Mood to emoji mapping with secondary emojis
const MOOD_EMOJI_MAP: Record<MoodType, { primary: string; secondary: string; bg: string }> = {
  happy: { primary: '😄', secondary: '✨', bg: 'from-yellow-400/20 to-orange-400/20' },
  calm: { primary: '😌', secondary: '🌿', bg: 'from-green-400/20 to-teal-400/20' },
  stressed: { primary: '😣', secondary: '💥', bg: 'from-red-400/20 to-orange-400/20' },
  tired: { primary: '😴', secondary: '☕', bg: 'from-blue-400/20 to-purple-400/20' },
  energetic: { primary: '⚡', secondary: '🔥', bg: 'from-yellow-400/20 to-red-400/20' },
  pms: { primary: '🌸', secondary: '💜', bg: 'from-pink-400/20 to-purple-400/20' },
  anxious: { primary: '😟', secondary: '🌊', bg: 'from-blue-400/20 to-indigo-400/20' },
  sad: { primary: '😢', secondary: '💙', bg: 'from-blue-400/20 to-gray-400/20' },
};

// Special keyword overrides
const KEYWORD_EMOJI_MAP: Record<string, { primary: string; secondary: string; bg: string }> = {
  cheesy: { primary: '🧀', secondary: '🤤', bg: 'from-yellow-400/30 to-orange-400/30' },
  cheese: { primary: '🧀', secondary: '😋', bg: 'from-yellow-400/30 to-orange-400/30' },
  pizza: { primary: '🍕', secondary: '🧀', bg: 'from-red-400/20 to-yellow-400/20' },
  pasta: { primary: '🍝', secondary: '🧀', bg: 'from-yellow-400/20 to-red-400/20' },
  spicy: { primary: '🌶️', secondary: '🔥', bg: 'from-red-400/30 to-orange-400/30' },
  comfort: { primary: '🤗', secondary: '🍲', bg: 'from-orange-400/20 to-yellow-400/20' },
  healthy: { primary: '🥗', secondary: '💚', bg: 'from-green-400/30 to-teal-400/30' },
  sweet: { primary: '🍰', secondary: '🍫', bg: 'from-pink-400/20 to-purple-400/20' },
};

export const AnimatedMoodEmoji = ({ mood, keywords = [], size = 'lg' }: AnimatedMoodEmojiProps) => {
  // Check for keyword overrides first
  let emojiConfig = MOOD_EMOJI_MAP[mood] || MOOD_EMOJI_MAP.happy;
  
  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase();
    if (KEYWORD_EMOJI_MAP[keywordLower]) {
      emojiConfig = KEYWORD_EMOJI_MAP[keywordLower];
      break;
    }
  }
  
  const sizeClasses = {
    sm: 'text-4xl',
    md: 'text-6xl',
    lg: 'text-7xl md:text-8xl',
  };
  
  const containerSizes = {
    sm: 'w-20 h-20',
    md: 'w-28 h-28',
    lg: 'w-36 h-36 md:w-44 md:h-44',
  };

  return (
    <motion.div
      className={`relative ${containerSizes[size]} flex items-center justify-center`}
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", bounce: 0.5, duration: 0.8 }}
    >
      {/* Glow background */}
      <motion.div
        className={`absolute inset-0 rounded-full bg-gradient-to-br ${emojiConfig.bg} blur-xl`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Primary emoji */}
      <motion.span
        className={`${sizeClasses[size]} drop-shadow-lg relative z-10`}
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
          textShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}
      >
        {emojiConfig.primary}
      </motion.span>
      
      {/* Secondary emoji - orbiting */}
      <motion.span
        className={`absolute ${size === 'lg' ? 'text-4xl' : size === 'md' ? 'text-3xl' : 'text-2xl'}`}
        animate={{
          x: [30, -30, 30],
          y: [-20, 20, -20],
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
        }}
      >
        {emojiConfig.secondary}
      </motion.span>
      
      {/* Sparkle effects */}
      {[...Array(4)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-xl"
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1.2, 0],
            x: Math.cos((i * Math.PI) / 2) * 50,
            y: Math.sin((i * Math.PI) / 2) * 50,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.3,
            ease: "easeOut",
          }}
        >
          ✨
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedMoodEmoji;
