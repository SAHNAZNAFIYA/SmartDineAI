import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Brain, Heart, MapPin, Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import FloatingFoodIcons from "@/components/FloatingFoodIcons";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Analysis",
      description: "Our AI understands your mood and recommends scientifically-backed foods.",
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      icon: Heart,
      title: "Mood-Food Science",
      description: "Discover how nutrients like serotonin and magnesium affect your emotions.",
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      icon: MapPin,
      title: "Local Restaurants",
      description: "Find nearby restaurants serving your recommended dishes.",
      color: "text-honey",
      bg: "bg-honey/10",
    },
    {
      icon: Mic,
      title: "Voice Food Coach",
      description: "Talk to our AI coach and get personalized meal suggestions.",
      color: "text-mint",
      bg: "bg-mint/10",
    },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      <FloatingFoodIcons />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-secondary px-4 py-2 rounded-full"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">
                AI-Powered Food Recommendations
              </span>
            </motion.div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground leading-tight">
              Eat Better,{" "}
              <span className="gradient-text">Feel Better</span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              SmartDine AI uses mood science and artificial intelligence to recommend
              the perfect meals for how you're feeling right now.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-4"
            >
              <Link to="/preferences">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/coach">
                <Button variant="glass" size="xl" className="gap-2 w-full sm:w-auto">
                  <Mic className="w-5 h-5" />
                  Talk to AI Coach
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Hero visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-3xl">
              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-coral opacity-20 blur-3xl rounded-full" />
              
              {/* Card preview */}
              <div className="relative glass-card rounded-3xl p-8 md:p-12">
                <div className="flex flex-wrap justify-center gap-6">
                  {["😊", "😴", "😰", "⚡", "😌"].map((emoji, i) => (
                    <motion.div
                      key={i}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-secondary flex items-center justify-center text-3xl md:text-4xl"
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    >
                      {emoji}
                    </motion.div>
                  ))}
                </div>
                <p className="text-center mt-6 text-muted-foreground">
                  Select your mood → Get personalized dish recommendations
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Surprise Me Section */}
<section className="py-20 px-4">
  <div className="container mx-auto max-w-4xl">
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card rounded-3xl p-8 md:p-12 text-center"
    >
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-6xl mb-4"
      >
        🎰
      </motion.div>

      <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
        Can’t Decide What to Eat?
      </h2>

      <p className="text-muted-foreground max-w-xl mx-auto mt-4">
        Let SmartDine decide for you. Spin the food jackpot and discover a
        perfectly matched meal based on your mood, cuisine preference, and budget.
      </p>

      <div className="mt-8 flex justify-center">
        <Link to="/surprise">
          <Button variant="hero" size="xl" className="gap-2">
            🎲 Try Surprise Me
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </motion.div>
  </div>
</section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              How SmartDine Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Combining mood science with AI to transform how you choose what to eat.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 hover-lift"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-xl flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mood-Food Science Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-8 md:p-12"
          >
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1 space-y-4">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                  The Science Behind Mood Food
                </h2>
                <p className="text-muted-foreground">
                  Your gut and brain are connected through the vagus nerve. 
                  Certain foods trigger the release of neurotransmitters like 
                  serotonin and dopamine that directly affect your mood.
                </p>
                <ul className="space-y-3">
                  {[
                    "🍫 Dark chocolate boosts serotonin and endorphins",
                    "🥑 Avocados provide mood-stabilizing healthy fats",
                    "🍌 Bananas contain tryptophan for better sleep",
                    "🍣 Fatty fish reduces inflammation and anxiety",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-2 text-sm"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="flex-shrink-0">
                <motion.div
                  className="text-8xl"
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  🧠
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              Ready to Eat Smarter?
            </h2>
            <p className="text-muted-foreground">
              Join thousands of people who've transformed their relationship with food.
            </p>
            <Link to="/preferences">
              <Button variant="hero" size="xl" className="gap-2">
                Start Your Journey
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer padding for mobile nav */}
      <div className="h-20 md:h-0" />
    </div>
  );
};

export default Index;
