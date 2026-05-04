import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send, Sparkles, Loader2 } from 'lucide-react';
import { aiService, type AIMessage, type AIResponse } from '@/lib/services/ai-service';
import config from '@/lib/config/env';

export function GlassAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize with welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: AIMessage = {
        id: 'welcome',
        role: 'assistant',
        content: '👋 Welcome to SmileFlow AI. Ask me about our services, pricing, or dentists. (RAG Context Loaded)',
        timestamp: Date.now(),
        metadata: {
          confidence: 1.0,
          model: config.ai.model,
        }
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response: AIResponse = await aiService.sendMessage(message, 'dental_services');
      
      const assistantMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.message,
        timestamp: Date.now(),
        metadata: {
          confidence: response.confidence,
          sources: response.sources,
          model: config.ai.model,
        }
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI Service Error:', error);
      
      const errorMessage: AIMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'I apologize, but I\'m having trouble connecting right now. Please try again later or contact our office directly.',
        timestamp: Date.now(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          onClick={toggleChat}
          className="h-16 w-16 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 shadow-2xl hover:shadow-3xl border-2 border-white/20 backdrop-blur-md relative overflow-hidden"
          size="icon"
        >
          {/* Pulsing Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-teal-400 to-teal-500 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {isOpen ? (
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <X className="h-6 w-6 text-white relative z-10" />
            </motion.div>
          ) : (
            <motion.div
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="relative z-10">
                <Sparkles className="h-6 w-6 text-white" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full flex items-center justify-center">
                  <div className="h-2 w-2 bg-teal-600 rounded-full animate-pulse"></div>
                </div>
              </div>
            </motion.div>
          )}
        </Button>
      </motion.div>

      {/* Glass Chat Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-32 right-8 w-96 bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden z-50"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 text-white p-4 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <motion.div
                    className="h-10 w-10 bg-white/20 rounded-xl flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  >
                    <Sparkles className="h-5 w-5 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">SmileFlow AI</h3>
                    <p className="text-xs text-white/80">Always here to help</p>
                  </div>
                </div>
                <Button
                  onClick={toggleChat}
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4 bg-white/5">
              {/* Welcome Message */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="h-8 w-8 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles className="h-4 w-4 text-teal-600" />
                </motion.div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 max-w-[80%] border border-white/20">
                  <p className="text-sm text-white">
                    👋 Welcome to SmileFlow AI. Ask me about our services, pricing, or dentists. 
                    (RAG Context Loaded)
                  </p>
                </div>
              </motion.div>

              {/* Sample Response */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <motion.div
                  className="h-8 w-8 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0"
                  whileHover={{ scale: 1.1, rotate: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sparkles className="h-4 w-4 text-teal-600" />
                </motion.div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 max-w-[80%] space-y-2 border border-white/20">
                  <p className="text-sm text-white font-medium">I can help you with:</p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li>• 🦷 Service information and pricing</li>
                    <li>• 👨‍⚕️ Dentist availability and specialties</li>
                    <li>• 📅 Appointment scheduling</li>
                    <li>• 💳 Insurance and payment options</li>
                  </ul>
                </div>
              </motion.div>

              {/* Typing Indicator */}
              <motion.div
                className="flex gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                <div className="h-8 w-8 bg-teal-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-4 w-4 text-teal-600" />
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-3 border border-white/20">
                  <div className="flex gap-1">
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-white rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Chat Input */}
            <div className="border-t border-white/20 p-4 bg-white/10 backdrop-blur-sm">
              <div className="flex gap-2">
                <motion.input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask SmileFlow AI anything..."
                  className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent backdrop-blur-sm"
                  whileFocus={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white rounded-2xl"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
