import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, X, Send } from 'lucide-react';

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      // TODO: Implement RAG/LLM logic here
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        onClick={toggleChat}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all duration-200 z-40"
        size="icon"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <div className="relative">
            <MessageCircle className="h-6 w-6 text-white" />
            <div className="absolute -top-1 -right-1 h-3 w-3 bg-white rounded-full flex items-center justify-center">
              <div className="h-2 w-2 bg-teal-600 rounded-full"></div>
            </div>
          </div>
        )}
      </Button>

      {/* Chat Drawer */}
      <div className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 transition-all duration-300 z-50 ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {/* Chat Header */}
        <div className="bg-teal-600 text-white p-4 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-white" />
              </div>
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
        <div className="h-96 overflow-y-auto p-4 space-y-4">
          {/* Welcome Message */}
          <div className="flex gap-3">
            <div className="h-8 w-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-4 w-4 text-teal-600" />
            </div>
            <div className="bg-slate-100 rounded-xl p-3 max-w-[80%]">
              <p className="text-sm text-slate-700">
                Welcome to SmileFlow AI. Ask me about our services, pricing, or dentists. 
                (RAG implementation ready)
              </p>
            </div>
          </div>

          {/* Sample Response */}
          <div className="flex gap-3">
            <div className="h-8 w-8 bg-teal-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MessageCircle className="h-4 w-4 text-teal-600" />
            </div>
            <div className="bg-slate-100 rounded-xl p-3 max-w-[80%] space-y-2">
              <p className="text-sm text-slate-700">
                I can help you with:
              </p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>• Service information and pricing</li>
                <li>• Dentist availability and specialties</li>
                <li>• Appointment scheduling</li>
                <li>• Insurance and payment options</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="border-t border-slate-200 p-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
