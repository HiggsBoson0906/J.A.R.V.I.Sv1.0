import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Play, Link, Zap, Sparkles, AlertCircle, CheckCircle, ListPlus, Loader2, Copy, Download, Highlighter } from 'lucide-react';

export default function VideoProcessor() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  // Scroll Reveal for animations
  useEffect(() => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, observerOptions);

    const revealSections = document.querySelectorAll('.section-enter');
    revealSections.forEach(section => {
        observer.observe(section);
    });

    return () => observer.disconnect();
  }, [results, isLoading, hasStarted]);

  const handleGenerate = async () => {
    if (!url) return;
    setIsLoading(true);
    setHasStarted(true);
    setError('');
    
    // Auto-scroll slightly to focus on video
    window.scrollTo({ top: 150, behavior: 'smooth' });

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://j-a-r-v-i-sv1-0.onrender.com/api'}/process-video`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await response.json();
      if (data.success) {
        setResults(data.data);
      } else {
        setError(data.message || 'Failed to process video');
      }
    } catch (err) {
      setError('Error connecting to server');
    } finally {
      setIsLoading(false);
    }
  };

  const getVideoId = (link) => {
    const match = link.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
    return match ? match[1] : null;
  };
  
  const videoId = getVideoId(url);
  const thumbnailUrl = videoId 
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : "https://lh3.googleusercontent.com/aida-public/AB6AXuDRYutpMfQdh74ij-b__JFMomXq0W2uTYha7jNUJpXTE3AtAVMamIx61hGGRISjPnFrmb_FgH2swCKGuHegv9aG7Ebj4Wbv9SecJMjipoIV7rY5KO9b9Qz9Xla1DDEiUUJ4wbSHXuSMhHboU1REQMPDcA6cHfy-nwbQ1AbVg5qSE5r9cNdfofpjZP8KAXWIGXa_9ry075iai_We_vtBbHCI9oBj-NBjsUhb3nlJxSrKjsWFrV8PbFnBA6TStleL9NOd5H7HOitkBWyo";

  return (
    <Layout>
      <div className="p-8 w-full max-w-7xl mx-auto min-h-screen">
        <div className="max-w-7xl mx-auto space-y-10">
          
          {/* Header Section */}
          <header className="space-y-2">
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface dark:text-slate-50 font-headline">Video Learning Assistant</h2>
            <p className="text-on-surface-variant dark:text-slate-400 opacity-70">Convert complex lectures into structured, actionable study notes with AI.</p>
          </header>

          {/* Input Section */}
          <section className="bg-surface-container-low dark:bg-slate-900/50 p-8 rounded-2xl shadow-sm border border-outline-variant/10 dark:border-slate-800">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Link className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-400 w-5 h-5" />
                <input 
                  className="w-full bg-white dark:bg-slate-800 dark:text-white border border-transparent dark:border-slate-700 rounded-xl pl-14 pr-6 py-5 text-base shadow-sm focus:ring-2 focus:ring-cyan-500/50 placeholder:text-outline-variant dark:placeholder-slate-400 outline-none transition-all" 
                  placeholder="Paste YouTube video link..." 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isLoading || !url}
                className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg shadow-cyan-200/50 dark:shadow-cyan-900/50 hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer disabled:opacity-50 flex items-center gap-2 justify-center"
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : null}
                {isLoading ? 'Processing...' : 'Generate Notes'}
              </button>
            </div>
            {error && <p className="text-red-500 dark:text-red-400 text-sm mt-3">{error}</p>}
          </section>

          {/* Main Workspace - Adaptive Layout */}
          <div className={`transition-all duration-700 ease-in-out ${hasStarted ? 'flex flex-col gap-10' : 'grid grid-cols-1 lg:grid-cols-12 gap-8 items-start'}`}>
            
            {/* Video Player Section */}
            <div className={`transition-all duration-700 w-full ${hasStarted ? 'w-full' : 'lg:col-span-12'} section-enter ${hasStarted || videoId ? 'section-visible' : ''}`}>
              <div className={`w-full bg-slate-900 rounded-2xl overflow-hidden relative shadow-2xl group transition-all duration-700 border border-slate-200 dark:border-slate-800 ${hasStarted ? 'aspect-video lg:h-[70vh] max-h-[800px]' : 'aspect-video max-h-[500px]'}`}>
                {hasStarted && videoId ? (
                  <iframe 
                    className="w-full h-full border-0 absolute inset-0"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                ) : videoId ? (
                  <>
                    <img 
                      alt="Video Thumbnail" 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                      src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors cursor-pointer" 
                      onClick={handleGenerate}
                    >
                      <button className="w-24 h-24 bg-white/95 dark:bg-slate-900/95 backdrop-blur rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform text-cyan-600 dark:text-cyan-400 cursor-pointer">
                        <Play className="w-10 h-10 ml-2" fill="currentColor" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black gap-4">
                    <div className="w-20 h-20 rounded-full border-2 border-slate-700 flex items-center justify-center">
                      <Play className="w-8 h-8 ml-1 text-slate-600" fill="currentColor" />
                    </div>
                    <p className="text-slate-600 text-sm font-medium tracking-wide">Paste a YouTube link above to begin</p>
                  </div>
                )}
              </div>
            </div>

            {/* AI Notes Section Below Video */}
            {hasStarted && (
              <div className="w-full section-enter animate-[fadeUp_0.8s_ease-out_forwards]">
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 lg:p-12 shadow-xl shadow-cyan-500/5 dark:shadow-cyan-900/10 border border-outline-variant/10 dark:border-slate-800 min-h-full">
                  
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10 pb-6 border-b border-outline-variant/10 dark:border-slate-800">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/50 rounded-xl flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <h3 className="text-2xl font-bold font-headline text-slate-900 dark:text-slate-50">
                        {results?.title || "AI Structured Notes"}
                      </h3>
                    </div>
                    
                    {/* Extra Features Buttons */}
                    <div className="flex items-center gap-3">
                      <button className="p-3 bg-surface-container-low dark:bg-slate-800 hover:bg-cyan-50 hover:dark:bg-cyan-900/50 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-xl text-slate-500 dark:text-slate-400 transition-colors border border-outline-variant/20 dark:border-slate-700 shadow-sm" title="Copy Notes">
                        <Copy size={18} />
                      </button>
                      <button className="p-3 bg-surface-container-low dark:bg-slate-800 hover:bg-cyan-50 hover:dark:bg-cyan-900/50 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-xl text-slate-500 dark:text-slate-400 transition-colors border border-outline-variant/20 dark:border-slate-700 shadow-sm" title="Download PDF">
                        <Download size={18} />
                      </button>
                      <button className="p-3 bg-surface-container-low dark:bg-slate-800 hover:bg-cyan-50 hover:dark:bg-cyan-900/50 hover:text-cyan-600 dark:hover:text-cyan-400 rounded-xl text-slate-500 dark:text-slate-400 transition-colors border border-outline-variant/20 dark:border-slate-700 shadow-sm" title="Highlight Important Lines">
                        <Highlighter size={18} />
                      </button>
                    </div>
                  </div>
                  
                  {isLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6">
                       <div className="relative">
                         <div className="w-16 h-16 border-4 border-cyan-100 dark:border-slate-800 rounded-full"></div>
                         <div className="w-16 h-16 border-4 border-cyan-500 rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
                       </div>
                       <p className="text-slate-500 dark:text-slate-400 text-lg font-medium animate-pulse">Extracting transcript & restructuring knowledge...</p>
                    </div>
                  ) : results ? (
                    <div className="space-y-12">
                      {/* Summary */}
                      <div className="space-y-4">
                        <h4 className="flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">
                          <Zap size={14} className="text-cyan-500" /> Executive Summary
                        </h4>
                        <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-base bg-surface-container-low dark:bg-slate-800/50 p-6 rounded-2xl border border-outline-variant/10 dark:border-slate-700">
                          {results.summary}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
                        {/* Key Concepts */}
                        <div className="space-y-4">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 border-b border-outline-variant/20 dark:border-slate-800 pb-2">Key Concepts</h4>
                          <ul className="space-y-4">
                            {results.concepts?.map((c, i) => (
                              <li key={i} className="flex items-start gap-4 p-4 hover:bg-surface-container-low dark:hover:bg-slate-800/80 rounded-xl transition-colors border border-transparent hover:border-outline-variant/10 dark:hover:border-slate-700">
                                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-cyan-100 dark:bg-cyan-900/60 text-cyan-700 dark:text-cyan-300 text-xs font-bold mt-0.5 shrink-0">{i + 1}</span>
                                <span className="font-semibold text-slate-800 dark:text-slate-200">{c}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Important Points */}
                        <div className="space-y-4">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 border-b border-outline-variant/20 dark:border-slate-800 pb-2">Important Points</h4>
                          <ul className="space-y-4">
                            {results.key_points?.map((p, i) => (
                              <li key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-sm leading-relaxed border border-outline-variant/10 dark:border-slate-700">
                                <CheckCircle className="text-cyan-500 dark:text-cyan-400 min-w-[20px] w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span className="text-slate-700 dark:text-slate-300">{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      {/* Formulas (if any) */}
                      {results.formulas && results.formulas.length > 0 && (
                        <div className="space-y-4 pt-6">
                          <h4 className="text-[11px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400 border-b border-outline-variant/20 dark:border-slate-800 pb-2">Key Formulas</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {results.formulas.map((f, i) => (
                              <div key={i} className="bg-slate-900 border border-slate-700 text-cyan-300 p-5 rounded-xl font-mono text-sm shadow-inner">
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Footer Action */}
                      <div className="mt-12 pt-8 border-t border-outline-variant/10 dark:border-slate-800">
                        <button className="w-full md:w-auto px-10 py-4 bg-slate-50 dark:bg-slate-800 hover:bg-cyan-600 hover:dark:bg-cyan-600 hover:text-white dark:hover:text-white text-slate-900 dark:text-slate-50 font-bold rounded-full transition-all flex items-center justify-center gap-3 border border-outline-variant/10 dark:border-slate-700 shadow-sm cursor-pointer mx-auto">
                          <ListPlus className="w-5 h-5" />
                          Add to Study Plan
                        </button>
                      </div>
                    </div>
                  ) : null}
                  
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
}
