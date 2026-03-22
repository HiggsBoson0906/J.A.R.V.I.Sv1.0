import React, { useState, useRef, useEffect } from 'react';
import { 
  Zap, FlaskConical, Microscope, Sigma, BookOpen, Image as ImageIcon, 
  Bookmark, Mic, Send, Loader2
} from 'lucide-react';
import Layout from './Layout';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content?: string;
  explanation?: string;
  hint?: string;
  exam_tip?: string;
};

export default function EnhancedAITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'ai',
      explanation: "Hello! I am your JARVIS AI Tutor. What concept would you like me to explain today?",
      hint: "I specialize in JEE/NEET subjects.",
      exam_tip: "Ask me specific questions or drop a topic name."
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (question: string = input) => {
    if (!question.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('http://localhost:3001/api/ask-doubt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question })
      });
      const data = await res.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        explanation: data.explanation,
        hint: data.hint,
        exam_tip: data.exam_tip
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
       setMessages(prev => [...prev, {
         id: (Date.now() + 1).toString(),
         role: 'ai',
         explanation: "Failed to connect to the AI engine. Please check if the server is running."
       }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="p-8 lg:p-12 max-w-6xl mx-auto w-full pb-48">
        {/* Editorial Header */}
        <header className="mb-12">
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-slate-900 dark:text-slate-50 mb-2">AI Tutor</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl font-body leading-relaxed">
            Ask doubts and get accurate answers from trusted <span className="text-cyan-600 dark:text-cyan-400 font-semibold">JEE/NEET</span> resources including NCERT, HC Verma, and more.
          </p>
        </header>



        {/* Chat Interface Area */}
        <div className="max-w-4xl mx-auto space-y-8 mb-8 w-full">
          {messages.map((msg, idx) => (
            msg.role === 'user' ? (
              <div key={msg.id} className="flex flex-col items-end animate-[fadeUp_0.3s_ease-out_forwards]">
                <div className="bg-cyan-600 text-white px-6 py-4 rounded-2xl rounded-tr-none max-w-md shadow-lg">
                  <p className="text-sm font-body leading-relaxed">{msg.content}</p>
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex flex-col items-start gap-4 animate-[fadeUp_0.3s_ease-out_forwards]">
                <div className="w-full bg-white dark:bg-slate-900 rounded-lg p-8 shadow-sm ring-1 ring-slate-200 dark:ring-slate-800">
                  {/* Concept Badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-400 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Tutor Response</div>
                    <span className="font-headline font-bold text-slate-900 dark:text-slate-50">Explanation</span>
                  </div>

                  {/* Main Explanation */}
                  <div className="space-y-6 text-slate-900 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                    <p className="text-sm">{msg.explanation}</p>
                    
                    {msg.hint && (
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl">
                        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mb-2 uppercase tracking-tight">Hint / Core Rule</p>
                        <p className="text-sm text-slate-900 dark:text-slate-200">{msg.hint}</p>
                      </div>
                    )}
                    
                    {msg.exam_tip && (
                      <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 italic">
                          <BookOpen className="w-4 h-4 text-sm shrink-0" />
                          Exam Tip
                        </div>
                        <div className="flex items-center gap-1 text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase text-right">
                          {msg.exam_tip}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          ))}
          {isLoading && (
            <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-medium p-4 animate-pulse">
              <Loader2 className="w-5 h-5 animate-spin" />
              Thinking...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Section (Fixed Bottom Sticky) */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 p-4 md:p-8 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 z-40">
          <div className="max-w-4xl mx-auto">
            {/* Input Field Container */}
            <div className="relative group">
              <div className="relative flex items-center bg-white dark:bg-slate-900 rounded-2xl border-2 border-slate-200 dark:border-slate-700 px-6 py-4 shadow-sm transition-all group-focus-within:border-cyan-500 dark:group-focus-within:border-cyan-500">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 font-body outline-none" 
                  placeholder="Ask your doubt (e.g., Explain work-energy theorem)" 
                  type="text"
                />
                <div className="flex items-center gap-4">
                  <label className="text-slate-400 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer" title="Upload Image">
                    <input type="file" accept="image/*" className="hidden" />
                    <ImageIcon className="w-5 h-5" />
                  </label>
                  <button className="text-slate-400 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors cursor-pointer" title="Voice Input">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleSend()}
                    disabled={isLoading || !input.trim()}
                    className="w-10 h-10 rounded-full bg-cyan-600 text-white disabled:opacity-50 flex items-center justify-center transition-transform active:scale-95 cursor-pointer shadow-md hover:shadow-lg"
                  >
                    <Send className="w-5 h-5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
