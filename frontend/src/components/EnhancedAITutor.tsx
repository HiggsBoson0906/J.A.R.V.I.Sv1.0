import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Bot, User } from 'lucide-react';
import Layout from './Layout';

type Message = {
  id: string;
  role: 'user' | 'ai';
  content?: string;
  explanation?: string;
  hint?: string;
  exam_tip?: string;
};

const QUICK_PROMPTS = [
  "Explain Newton's 3rd law",
  "What is Hess's law?",
  "Differentiate log(x)",
  "What is Le Chatelier's principle?",
];

export default function EnhancedAITutor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'ai',
      explanation: "Hi! I'm your JARVIS AI Tutor. Ask me anything about Physics, Chemistry, or Mathematics.",
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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
      const payload = data.data || data;

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        explanation: payload.explanation,
        hint: payload.hint,
        exam_tip: payload.exam_tip
      }]);
    } catch {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        explanation: 'Could not reach the AI engine. Please check if the server is running.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col w-full max-w-4xl mx-auto px-4 pt-6 pb-24">

        {/* Header */}
        <div className="mb-6 flex-shrink-0">
          <h2 className="text-3xl font-extrabold font-headline tracking-tight text-slate-900 dark:text-slate-50">AI Tutor</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">JEE / NEET doubt solver powered by Gemini</p>
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="flex flex-wrap gap-2 mb-6 flex-shrink-0">
            {QUICK_PROMPTS.map(q => (
              <button
                key={q}
                onClick={() => handleSend(q)}
                className="text-xs px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-cyan-50 dark:hover:bg-cyan-900/30 hover:text-cyan-700 dark:hover:text-cyan-300 border border-slate-200 dark:border-slate-700 transition-colors font-medium"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto space-y-4 pb-4 pr-1" style={{ minHeight: 0 }}>
          {messages.map(msg => (
            msg.role === 'user' ? (
              <div key={msg.id} className="flex items-end justify-end gap-2">
                <div className="bg-cyan-600 text-white px-4 py-3 rounded-2xl rounded-br-sm max-w-sm text-sm leading-relaxed shadow-sm">
                  {msg.content}
                </div>
                <div className="w-7 h-7 rounded-full bg-cyan-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-3.5 h-3.5 text-white" />
                </div>
              </div>
            ) : (
              <div key={msg.id} className="flex items-start gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-bl-sm px-5 py-4 max-w-2xl shadow-sm">
                  <p className="text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
                    {msg.explanation}
                  </p>
                </div>
              </div>
            )
          ))}

          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-bl-sm px-5 py-4 shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar — fixed to bottom, respects sidebar */}
        <div className="fixed bottom-0 left-0 md:left-64 right-0 z-40 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 px-4 py-3">
          <div className="max-w-4xl mx-auto flex items-center gap-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl px-4 py-3 shadow-sm focus-within:border-cyan-500 dark:focus-within:border-cyan-500 transition-colors">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && handleSend()}
              className="flex-1 bg-transparent border-none focus:ring-0 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
              placeholder="Ask a doubt (e.g. Explain work-energy theorem)…"
              type="text"
            />
            <button
              onClick={() => handleSend()}
              disabled={isLoading || !input.trim()}
              className="w-8 h-8 rounded-full bg-cyan-600 text-white disabled:opacity-40 flex items-center justify-center transition-all active:scale-90 hover:bg-cyan-700 flex-shrink-0"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </Layout>
  );
}
