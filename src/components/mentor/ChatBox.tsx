import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { MessageBubble } from './MessageBubble';
import { SuggestionCard } from './SuggestionCard';
import { ChatMessage, sendChatMessage } from '../../services/gemini/gemini';

const SUGGESTIONS = [
  "How do I prepare for placements?",
  "Explain object-oriented programming.",
  "Explain data structures and algorithms.",
  "Help me prepare for Python interviews.",
  "Generate a study roadmap."
];

export function ChatBox() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setError(null);

    try {
      const responseText = await sendChatMessage(text, messages);
      const aiMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError('Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-50 dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden shadow-sm">
      {/* Chat History */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-2xl font-semibold text-neutral-800 dark:text-neutral-200">
                Hi there, I'm your AI Mentor
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400">
                Ask me anything about engineering, computer science, or your career.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
              {SUGGESTIONS.map((suggestion, i) => (
                <SuggestionCard key={i} text={suggestion} onClick={handleSendMessage} />
              ))}
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            
            {isLoading && (
              <div className="flex gap-4 mb-6">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300 flex items-center justify-center">
                  <Loader2 size={18} className="animate-spin" />
                </div>
                <div className="px-4 py-3 bg-white border border-neutral-200 rounded-2xl rounded-tl-none dark:bg-neutral-800 dark:border-neutral-700 flex items-center">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            
            {error && (
              <div className="text-center p-3 mb-6 bg-red-50 text-red-600 rounded-lg dark:bg-red-900/20 dark:text-red-400 text-sm">
                {error}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-neutral-200 dark:bg-neutral-900 dark:border-neutral-800">
        <form onSubmit={onSubmit} className="max-w-3xl mx-auto relative flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
            className="w-full pl-4 pr-12 py-3 md:py-4 bg-neutral-100 border-transparent rounded-full focus:bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:bg-neutral-900 dark:focus:border-indigo-500 dark:focus:ring-indigo-900/50 transition-all outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
