import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { chatWithAssistant } from '../services/geminiService';

interface Message {
    role: 'user' | 'model';
    text: string;
}

export const SustainabilityAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "Hello! I'm your GreenSME Assistant. How can I help you with your sustainability assessment today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const startListening = () => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert('Speech recognition is not supported in this browser.');
            return;
        }

        const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setInput(transcript);
        };
        recognition.onerror = (event: any) => {
            console.error('Speech recognition error', event.error);
            setIsListening(false);
        };

        recognition.start();
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = input;
        setInput('');
        setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
        setIsLoading(true);

        const history = messages.map(m => ({
            role: m.role,
            parts: [{ text: m.text }]
        }));

        const response = await chatWithAssistant(userMessage, history);
        
        setMessages(prev => [...prev, { role: 'model', text: response || "I'm sorry, I couldn't process that." }]);
        setIsLoading(false);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[200]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-80 sm:w-96 mb-4 overflow-hidden flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-indigo-600 p-4 flex items-center justify-between text-white">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                                    <i className="fa-solid fa-robot text-sm"></i>
                                </div>
                                <div>
                                    <h4 className="text-sm font-black uppercase tracking-wider">GreenSME Assistant</h4>
                                    <div className="flex items-center gap-1.5 mt-0.5">
                                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                                        <span className="text-[10px] opacity-70 font-bold uppercase">Online Now</span>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1.5 rounded-lg transition-colors">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>

                        {/* Messages */}
                        <div 
                            ref={scrollRef}
                            className="flex-grow p-4 overflow-y-auto space-y-4 bg-gray-50/50"
                        >
                            {messages.map((m, idx) => (
                                <div 
                                    key={idx} 
                                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                                        m.role === 'user' 
                                            ? 'bg-indigo-600 text-white rounded-tr-none shadow-md' 
                                            : 'bg-white text-gray-700 border border-gray-100 rounded-tl-none shadow-sm'
                                    }`}>
                                        {m.text}
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                                        <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask anything about sustainability..."
                                    className="w-full bg-gray-50 border-2 border-gray-100 rounded-2xl py-3 pl-4 pr-24 text-sm font-medium focus:border-indigo-200 focus:ring-4 focus:ring-indigo-50 outline-none transition-all placeholder:text-gray-400"
                                />
                                <div className="absolute right-2 flex items-center gap-1.5">
                                    <button 
                                        onClick={startListening}
                                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                                            isListening ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-gray-100 text-gray-400 hover:text-indigo-600'
                                        }`}
                                        title="Voice Input"
                                    >
                                        <i className="fa-solid fa-microphone text-xs"></i>
                                    </button>
                                    <button 
                                        onClick={handleSend}
                                        disabled={isLoading || !input.trim()}
                                        className="w-8 h-8 bg-indigo-600 text-white rounded-xl flex items-center justify-center hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-md active:scale-95"
                                    >
                                        <i className="fa-solid fa-paper-plane text-xs"></i>
                                    </button>
                                </div>
                            </div>
                            <p className="text-[9px] text-center text-gray-400 mt-2 font-black uppercase tracking-widest">
                                Powered by Gemini AI
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bubble */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl transition-all ${
                    isOpen ? 'bg-indigo-50 text-indigo-600' : 'bg-indigo-600'
                }`}
            >
                <i className={`fa-solid ${isOpen ? 'fa-minus' : 'fa-robot'} text-xl`}></i>
                {!isOpen && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                )}
            </motion.button>
        </div>
    );
};
