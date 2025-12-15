import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Sparkles, ChefHat } from "lucide-react";
import VoiceRecorder from "@/components/VoiceRecorder";
import RestaurantCardEnhanced from "@/components/RestaurantCardEnhanced";
import FloatingFoodIcons from "@/components/FloatingFoodIcons";
import AnimatedMoodEmoji from "@/components/AnimatedMoodEmoji";
import { MoodType } from "@/types/smartdine";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "@/contexts/LocationContext";
import { detectMoodFromText } from "@/constants/eiCopy";
import { getSharedRecommendations, EnrichedRestaurant } from "@/services/sharedRecommendationEngine";
import { parseFoodIntent, generateChefMoodResponse } from "@/services/foodIntentService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatMessage {
  id: string;
  type: 'user' | 'chef';
  content: string;
  emotion?: MoodType;
  keywords?: string[];
  restaurants?: EnrichedRestaurant[];
  timestamp: Date;
}

const MOOD_EMOJIS: Record<MoodType, string> = {
  happy: '😊',
  calm: '😌',
  stressed: '😰',
  tired: '😴',
  energetic: '⚡',
  pms: '🌸',
  anxious: '😟',
  sad: '😢',
};

const Coach = () => {
  const { toast } = useToast();
  const { location } = useLocation();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [textInput, setTextInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showVoice, setShowVoice] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const responseStartRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  // Scroll to the START of the AI response, not the bottom
  const scrollToResponse = useCallback(() => {
    if (responseStartRef.current) {
      responseStartRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  // Keep input visible when voice expands
  useEffect(() => {
    if (showVoice && inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [showVoice]);

  const processInput = async (text: string) => {
    if (!text.trim()) {
      toast({
        title: "Please enter something",
        variant: "destructive",
      });
      return;
    }

    if (!location) {
      toast({
        title: "Location Required",
        description: "Please set your location in the navbar first.",
        variant: "destructive",
      });
      return;
    }

    // Add user message
    const userMessage: ChatMessage = {
      id: `user_${Date.now()}`,
      type: 'user',
      content: text,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setTextInput("");
    setIsTyping(true);

    try {
      // Parse food intent from user text
      const intent = parseFoodIntent(text);
      console.log('Detected food intent:', intent);

      // Detect mood
      const detectedMood = detectMoodFromText(text);
      
      // Generate chef response
      const chefResponse = generateChefMoodResponse(intent, detectedMood);

      // Use the SHARED recommendation engine with strict cheesy filtering
      const restaurants = await getSharedRecommendations({
        lat: location.lat,
        lon: location.lon,
        city: location.city,
        cuisines: intent.cuisines.slice(0, 5),
        mood: detectedMood,
        keywords: intent.keywords,
        maxPriceLevel: intent.maxPriceLevel,
        dishIntent: text,
      });

      // Simulate typing delay
      await new Promise(resolve => setTimeout(resolve, 1200));

      // Add chef response with restaurants
      const chefMessage: ChatMessage = {
        id: `chef_${Date.now()}`,
        type: 'chef',
        content: chefResponse,
        emotion: detectedMood,
        keywords: intent.keywords,
        restaurants: restaurants.slice(0, 6),
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, chefMessage]);
      
      // Scroll to response START after a brief delay
      setTimeout(scrollToResponse, 100);
    } catch (err) {
      console.error("Error processing input:", err);
      
      const errorMessage: ChatMessage = {
        id: `chef_${Date.now()}`,
        type: 'chef',
        content: "Oops! Something went wrong in my kitchen 🍳\nLet me try that again - please send your message once more!",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processInput(textInput);
  };

  const handleVoiceInput = (text: string) => {
    setShowVoice(false);
    processInput(text);
  };

  const handleExampleClick = (example: string) => {
    setTextInput(example);
  };

  const loadMoreRestaurants = async (emotion: MoodType) => {
    if (!location) return;
    
    setIsTyping(true);
    try {
      const restaurants = await getSharedRecommendations({
        lat: location.lat,
        lon: location.lon,
        city: location.city,
        cuisines: [],
        mood: emotion,
        limit: 12,
      });

      const moreMessage: ChatMessage = {
        id: `chef_${Date.now()}`,
        type: 'chef',
        content: "Here are more delicious options for you! 🍽️✨",
        emotion,
        restaurants: restaurants.slice(6, 12),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, moreMessage]);
      
      setTimeout(scrollToResponse, 100);
    } catch (err) {
      console.error("Error loading more:", err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-4 relative flex flex-col">
      <FloatingFoodIcons />
      
      <div className="container mx-auto max-w-4xl flex-1 flex flex-col relative z-10 px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-6 flex-shrink-0"
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-coral mb-3"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChefHat className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            ChefMood 🍽️💬
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tell me what you're craving – I'll find the perfect spot!
          </p>
          {location && (
            <p className="text-xs text-primary mt-1">
              📍 {location.city}
            </p>
          )}
        </motion.div>

        {/* Chat Container */}
        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-[300px] max-h-[calc(100vh-320px)]"
        >
          {/* Welcome message */}
          {messages.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Chef intro with GIF */}
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-coral flex items-center justify-center flex-shrink-0">
                  <ChefHat className="w-5 h-5 text-primary-foreground" />
                </div>
                <div className="glass-card rounded-2xl rounded-tl-md p-4 max-w-[85%]">
                  <p className="text-foreground">
                    Hey there! 👋 I'm ChefMood, your personal food companion!
                  </p>
                  <p className="text-muted-foreground text-sm mt-2">
                    Tell me how you're feeling or what you're craving, and I'll find the perfect restaurants for you! 🍕🍜🍔
                  </p>
                  
                  {/* Animated Mood Emoji as intro visual */}
                  <div className="mt-4 flex justify-center">
                    <AnimatedMoodEmoji mood="happy" size="md" />
                  </div>
                </div>
              </div>

              {/* Example prompts */}
              <div className="pl-12">
                <p className="text-xs text-muted-foreground mb-3">Try saying:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Something cheesy but not too expensive",
                    "I need comfort food, feeling tired",
                    "Spicy Thai or Korean",
                    "Light and healthy options",
                    "I'm stressed and need pizza",
                  ].map((example, index) => (
                    <button
                      key={index}
                      onClick={() => handleExampleClick(example)}
                      className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                    >
                      {example}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Chat messages */}
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Scroll anchor for AI responses - placed at the START */}
                {message.type === 'chef' && index === messages.length - 1 && (
                  <div ref={responseStartRef} className="absolute -mt-20" />
                )}
                
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-primary/20' 
                    : 'bg-gradient-coral'
                }`}>
                  {message.type === 'user' ? (
                    <span className="text-lg">👤</span>
                  ) : (
                    <ChefHat className="w-5 h-5 text-primary-foreground" />
                  )}
                </div>

                {/* Message content */}
                <div className={`max-w-[85%] space-y-3 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`rounded-2xl p-4 ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground rounded-tr-md'
                      : 'glass-card rounded-tl-md'
                  }`}>
                    {/* Emotion badge for chef messages */}
                    {message.type === 'chef' && message.emotion && (
                      <div className="flex items-center gap-2 mb-2 text-xs text-muted-foreground">
                        <span>Detected mood:</span>
                        <span className="px-2 py-0.5 bg-accent/20 rounded-full capitalize">
                          {MOOD_EMOJIS[message.emotion]} {message.emotion}
                        </span>
                      </div>
                    )}
                    
                    <p className={`whitespace-pre-line ${message.type === 'user' ? '' : 'text-foreground'}`}>
                      {message.content}
                    </p>
                    
                    {/* Animated Mood Emoji instead of static GIF */}
                    {message.type === 'chef' && message.emotion && (
                      <div className="mt-4 flex justify-center">
                        <AnimatedMoodEmoji 
                          mood={message.emotion} 
                          keywords={message.keywords}
                          size="md"
                        />
                      </div>
                    )}
                  </div>

                  {/* Restaurant cards */}
                  {message.restaurants && message.restaurants.length > 0 && (
                    <div className="space-y-3 w-full">
                      <div className="grid gap-4">
                        {message.restaurants.map((restaurant, idx) => (
                          <RestaurantCardEnhanced
                            key={`${restaurant.id}-${idx}`}
                            restaurant={restaurant}
                            mood={message.emotion}
                            index={idx}
                          />
                        ))}
                      </div>
                      
                      {/* Explore More button */}
                      <button
                        onClick={() => message.emotion && loadMoreRestaurants(message.emotion)}
                        className="text-sm text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        <Sparkles className="w-4 h-4" />
                        Explore more options
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-coral flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="glass-card rounded-2xl rounded-tl-md px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">ChefMood is cooking</span>
                  <motion.span
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🍳
                  </motion.span>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Input area - Fixed at bottom, always visible */}
        <div ref={inputRef} className="flex-shrink-0 glass-card rounded-2xl p-3 sticky bottom-4">
          {showVoice ? (
            <div className="space-y-3">
              <VoiceRecorder
                onTranscript={handleVoiceInput}
                isProcessing={isTyping}
              />
              <button
                onClick={() => setShowVoice(false)}
                className="text-sm text-muted-foreground hover:text-foreground w-full text-center"
              >
                Switch to text
              </button>
            </div>
          ) : (
            <form onSubmit={handleTextSubmit} className="flex gap-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowVoice(true)}
                className="flex-shrink-0"
              >
                <Mic className="w-5 h-5" />
              </Button>
              <Input
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Tell me what you're craving..."
                className="flex-1"
                disabled={isTyping}
              />
              <Button 
                type="submit" 
                variant="coral" 
                size="icon"
                disabled={!textInput.trim() || !location || isTyping}
              >
                <Send className="w-5 h-5" />
              </Button>
            </form>
          )}
          
          {!location && (
            <p className="text-xs text-destructive mt-2 text-center">
              📍 Please set your location in the navbar first
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Coach;
