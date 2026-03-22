import React, { useState } from 'react';
import Layout from './Layout';
import { Play, Link, Zap, Sparkles, AlertCircle, CheckCircle, ListPlus, Loader2 } from 'lucide-react';

export default function VideoProcessor() {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (!url) return;
    setIsLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:3001/api/process-video', {
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

  // Helper to extract video ID for thumbnail
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
            <h2 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">Video Learning Assistant</h2>
            <p className="text-on-surface-variant opacity-70">Convert complex lectures into structured, actionable study notes with AI.</p>
          </header>

          {/* Input Section */}
          <section className="bg-surface-container-low p-8 rounded-2xl shadow-sm border border-outline-variant/10">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Link className="absolute left-5 top-1/2 -translate-y-1/2 text-cyan-600 w-5 h-5" />
                <input 
                  className="w-full bg-white border-none rounded-xl pl-14 pr-6 py-5 text-base shadow-sm focus:ring-2 focus:ring-cyan-500/20 placeholder:text-outline-variant outline-none" 
                  placeholder="Paste YouTube video link..." 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <button 
                onClick={handleGenerate}
                disabled={isLoading || !url}
                className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg shadow-cyan-200/50 hover:scale-[1.02] active:scale-95 transition-all outline-none cursor-pointer disabled:opacity-50 flex items-center gap-2 justify-center"
              >
                {isLoading ? <Loader2 className="animate-spin w-5 h-5" /> : null}
                {isLoading ? 'Processing...' : 'Generate Notes'}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
          </section>

          {/* Main Workspace Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Video Player */}
            <div className="lg:col-span-7 space-y-6">
              <div className="aspect-video w-full bg-slate-200 rounded-2xl overflow-hidden relative shadow-xl shadow-slate-200/50 group">
                <img 
                  alt="Video Thumbnail" 
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700" 
                  src={thumbnailUrl} 
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/5 transition-colors cursor-pointer">
                  <button className="w-20 h-20 bg-white/95 backdrop-blur rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-transform text-cyan-600 cursor-pointer">
                    <Play className="w-8 h-8 ml-1" fill="currentColor" />
                  </button>
                </div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-black/40 backdrop-blur-md p-4 rounded-xl text-white">
                    <h3 className="font-bold">{videoId ? 'Selected YouTube Video' : 'Physics 201: Rotational Dynamics'}</h3>
                    <p className="text-xs opacity-80">{videoId ? 'Video Loaded' : 'MIT OpenCourseWare • 45:12'}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-outline-variant/10">
                <div className="flex items-center gap-4">
                  <div className="bg-cyan-50 dark:bg-cyan-900/20 p-2 rounded-xl">
                    <Zap className="text-cyan-600 dark:text-cyan-400 w-5 h-5" />
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">Processing Speed: 1.5x</span>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-cyan-600 hover:text-white transition-colors border border-outline-variant/20 cursor-pointer">CC Available</button>
                  <button className="px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-cyan-600 hover:text-white transition-colors border border-outline-variant/20 cursor-pointer">High Def</button>
                </div>
              </div>
            </div>

            {/* Right: AI Notes Card */}
            <div className="lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl shadow-cyan-500/5 border border-outline-variant/10 min-h-full">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 bg-cyan-100 dark:bg-cyan-900/30 rounded-xl flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-slate-50">AI Structured Notes</h3>
                </div>
                
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-64 space-y-4">
                     <Loader2 className="w-10 h-10 text-cyan-600 animate-spin" />
                     <p className="text-slate-500 text-sm font-medium">Extracting transcript & generating notes...</p>
                  </div>
                ) : results ? (
                  <div className="space-y-10">
                    {/* Summary */}
                    <div className="space-y-3">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Executive Summary</h4>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                        {results.summary}
                      </p>
                    </div>
                    
                    {/* Key Concepts */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Key Concepts</h4>
                      <ul className="space-y-3">
                        {results.concepts?.map((c, i) => (
                          <li key={i} className="flex items-start gap-3 group">
                            <span className="w-2 h-2 mt-2 rounded-full bg-cyan-500 group-hover:scale-125 transition-transform"></span>
                            <span className="font-bold text-slate-900 dark:text-slate-50 text-sm">{c}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Important Points */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-cyan-600 dark:text-cyan-400">Important Points</h4>
                      <ul className="space-y-4">
                        {results.key_points?.map((p, i) => (
                          <li key={i} className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm leading-relaxed border border-outline-variant/10">
                            {i % 2 === 0 ? 
                              <AlertCircle className="text-cyan-600 dark:text-cyan-400 w-5 h-5 flex-shrink-0 mt-0.5" /> : 
                              <CheckCircle className="text-cyan-600 dark:text-cyan-400 w-5 h-5 flex-shrink-0 mt-0.5" />
                            }
                            <span className="text-slate-600 dark:text-slate-300">{p}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Footer Action */}
                    <div className="mt-12 pt-8 border-t border-slate-100 dark:border-slate-800">
                      <button className="w-full py-4 bg-slate-50 dark:bg-slate-800 hover:bg-cyan-600 hover:dark:bg-cyan-600 hover:text-white text-slate-900 dark:text-slate-50 font-bold rounded-full transition-all flex items-center justify-center gap-2 border border-outline-variant/10 shadow-sm cursor-pointer">
                        <ListPlus className="w-5 h-5" />
                        Add to Study Plan
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-center space-y-3 opacity-50">
                     <AlertCircle className="w-10 h-10 text-slate-400" />
                     <p className="text-slate-500 text-sm font-medium">Paste a YouTube link and click "Generate Notes" to start.</p>
                  </div>
                )}
                
              </div>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
}
