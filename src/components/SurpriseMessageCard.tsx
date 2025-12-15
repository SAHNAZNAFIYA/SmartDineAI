/**
 * SURPRISE MESSAGE CARD
 * Highlighted card with gradient, 3D tilt effect, and animations
 * Used in Surprise Me page above restaurant results
 */

import { motion } from "framer-motion";
import { Sparkles, PartyPopper, Star } from "lucide-react";
import { MoodType } from "@/types/smartdine";

interface SurpriseMessageCardProps {
  quote: string;
  mood: { value: MoodType; emoji: string; label: string };
  budget: string;
  eiResponse: string;
  moodExplanation: string;
}

export const SurpriseMessageCard = ({
  quote,
  mood,
  budget,
  eiResponse,
  moodExplanation,
}: SurpriseMessageCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: 20 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      whileHover={{ 
        scale: 1.02, 
        rotateY: 5,
        rotateX: -5,
        transition: { duration: 0.3 }
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      className="relative overflow-hidden rounded-3xl"
    >
      {/* Gradient background with animation */}
      <motion.div
  className="
    absolute inset-0
    bg-gradient-to-br
    from-orange-500
    via-orange-400
    to-rose-400
    opacity-95
  "
  animate={{
    backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
  }}
  transition={{
    duration: 12,
    repeat: Infinity,
    ease: "linear",
  }}
/>

      
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 p-6 md:p-8 text-white">
        {/* Floating emojis */}
        <div className="absolute -top-2 -right-2">
          <motion.span
            className="text-5xl"
            animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🍛
          </motion.span>
        </div>
        <div className="absolute top-4 left-4">
          <motion.span
            className="text-3xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
          >
            ✨
          </motion.span>
        </div>
        
        {/* Main quote */}
        <motion.div
          className="text-center mb-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div
            className="flex items-center justify-center gap-3 mb-4"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <PartyPopper className="w-8 h-8" />
            <span className="text-5xl">{mood.emoji}</span>
            <Sparkles className="w-8 h-8" />
          </motion.div>
          
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-2 drop-shadow-lg">
            {quote}
          </h2>
          
          <p className="text-lg opacity-90">
            Your mood: <span className="font-semibold">{mood.label}</span> • 
            Budget: <span className="font-semibold">{budget}</span>
          </p>
        </motion.div>
        
        {/* EI Response */}
        <motion.div
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-lg font-medium text-center">
            {eiResponse}
          </p>
        </motion.div>
        
        {/* Mood explanation */}
        <motion.p
          className="text-sm text-center opacity-80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.6 }}
        >
          {moodExplanation}
        </motion.p>
        
        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-white/0 via-white/50 to-white/0" />
        
        {/* Star decorations */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 20}%`,
            }}
            animate={{
              opacity: [0.3, 0.8, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            <Star className="w-3 h-3 fill-white/30 text-white/30" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SurpriseMessageCard;
