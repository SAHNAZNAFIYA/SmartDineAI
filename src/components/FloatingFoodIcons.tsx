import { motion } from "framer-motion";

const FOOD_EMOJIS = [
  "🍕", "🍔", "🍣", "🥗", "🍜",
  "🥘", "🍛", "🥙", "🍝", "🌮",
  "🍱", "🥐", "🍰", "🥑", "🍤",
  "🍕", "🍔", "🍣", "🥗", "🍜",
  "🥘", "🍛", "🥙", "🍝", "🌮",
  "🍱", "🥐", "🍰", "🥑", "🍤"
];

// All icons same size for clean visual consistency
const ICON_SIZE = 45; // Increase or decrease as needed

// Pre-defined, aesthetic layout (5 rows × 6 columns)
const POSITIONS = [
  // row 1
  { top: "8%", left: "10%" },
  { top: "8%", left: "30%" },
  { top: "8%", left: "50%" },
  { top: "8%", left: "70%" },
  { top: "8%", left: "90%" },

  // row 2
  { top: "26%", left: "15%" },
  { top: "26%", left: "35%" },
  { top: "26%", left: "55%" },
  { top: "26%", left: "75%" },

  // row 3
  { top: "45%", left: "10%" },
  { top: "45%", left: "30%" },
  { top: "45%", left: "50%" },
  { top: "45%", left: "70%" },
  { top: "45%", left: "90%" },

  // row 4
  { top: "64%", left: "15%" },
  { top: "64%", left: "35%" },
  { top: "64%", left: "55%" },
  { top: "64%", left: "75%" },

  // row 5
  { top: "82%", left: "10%" },
  { top: "82%", left: "30%" },
  { top: "82%", left: "50%" },
  { top: "82%", left: "70%" },
  { top: "82%", left: "90%" },
];

const FloatingFoodIcons = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {POSITIONS.slice(0, FOOD_EMOJIS.length).map((pos, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: pos.top,
            left: pos.left,
            fontSize: `${ICON_SIZE}px`,
            opacity: 0.5, // 70% visibility
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.3, 0.3],
            y: [0, -18, 0],
            x: [0, 14, -10, 0],
            rotate: [0, 6, -4, 0],
          }}
          transition={{
            duration: 6 + Math.random() * 6, // medium speed
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {FOOD_EMOJIS[i]}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingFoodIcons;
