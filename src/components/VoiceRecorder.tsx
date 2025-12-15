import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Loader2, Volume2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface VoiceRecorderProps {
  onTranscript: (text: string) => void;
  isProcessing?: boolean;
}

const VoiceRecorder = ({ onTranscript, isProcessing = false }: VoiceRecorderProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Check for browser support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      setTranscript(finalTranscript || interimTranscript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      if (transcript) {
        onTranscript(transcript);
      }
    } else {
      setTranscript("");
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center p-6 bg-muted rounded-2xl">
        <MicOff className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground">
          Voice input is not supported in your browser.
          Please try Chrome or Edge.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-display font-semibold text-foreground">
          Talk to Your Food Coach
        </h2>
        <p className="text-muted-foreground">
          Tell me how you're feeling, and I'll suggest the perfect meal
        </p>
      </div>

      <div className="flex flex-col items-center gap-6">
        {/* Voice button with animation */}
        <motion.div className="relative">
          {/* Pulsing rings when listening */}
          <AnimatePresence>
            {isListening && (
              <>
                <motion.div
                  initial={{ scale: 1, opacity: 0.5 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute inset-0 bg-primary rounded-full"
                />
                <motion.div
                  initial={{ scale: 1, opacity: 0.3 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="absolute inset-0 bg-primary rounded-full"
                />
              </>
            )}
          </AnimatePresence>

          <Button
            variant={isListening ? "coral" : "glass"}
            size="icon"
            className={cn(
              "w-24 h-24 rounded-full relative z-10",
              isListening && "animate-pulse"
            )}
            onClick={toggleListening}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="w-10 h-10 animate-spin" />
            ) : isListening ? (
              <Volume2 className="w-10 h-10" />
            ) : (
              <Mic className="w-10 h-10" />
            )}
          </Button>
        </motion.div>

        {/* Status text */}
        <motion.p
          key={isListening ? "listening" : "ready"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-muted-foreground text-sm"
        >
          {isProcessing
            ? "Analyzing your emotions..."
            : isListening
            ? "Listening... Tap again when done"
            : "Tap the microphone to start"}
        </motion.p>

        {/* Transcript display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md"
            >
              <div className="glass-card rounded-2xl p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  You said:
                </p>
                <p className="text-foreground">{transcript}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default VoiceRecorder;
