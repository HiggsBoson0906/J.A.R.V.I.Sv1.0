import React, { useState, useEffect } from 'react'; 
import Layout from './Layout';
import { BookOpen, ChevronRight, ExternalLink, Play, Sparkles } from 'lucide-react';

const EXTERNAL_COURSES = [
  { 
    name: 'Physics Wallah', short: 'PW', url: 'https://pw.live', 
    logo: 'https://www.pw.live/favicon.ico',
    color: 'bg-orange-500', desc: 'India\'s most loved ed-tech'
  },
  { 
    name: 'Vedantu', short: 'V', url: 'https://vedantu.com', 
    logo: 'https://www.vedantu.com/favicon.ico',
    color: 'bg-cyan-500', desc: 'Live interactive classes'
  },
  { 
    name: 'Unacademy', short: 'U', url: 'https://unacademy.com', 
    logo: 'https://unacademy.com/favicon.ico',
    color: 'bg-green-500', desc: 'Structured prep courses'
  },
  { 
    name: 'Mathongo', short: 'M', url: 'https://mathongo.com', 
    logo: 'https://www.mathongo.com/favicon.ico',
    color: 'bg-blue-600', desc: 'Maths & JEE preparation'
  },
];

export default function Resources() {
  const tabs = ["Thermodynamics", "Calculus", "Organic Chemistry"];
  const [topic, setTopic] = useState(tabs[0]);
  const [resource, setResource] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setResource(null);
    fetch(`http://localhost:3001/api/resources?topic=${encodeURIComponent(topic)}`)
      .then(r => r.json())
      .then(d => { if (d.success) setResource(d.data); })
      .catch(e => console.error(e))
      .finally(() => setLoading(false));
  }, [topic]);

  return (
    <Layout>
      <div className="p-8 w-full max-w-7xl mx-auto space-y-10">

        {/* Hero Banner */}
        <section>
          <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 p-10 rounded-xl text-white flex justify-between items-center overflow-hidden relative shadow-lg shadow-cyan-600/20">
            <div className="relative z-10 max-w-xl">
              <span className="text-xs font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur-md uppercase tracking-widest border border-white/10">Personalized Selection</span>
              <h2 className="text-4xl font-headline font-extrabold mt-4 mb-3 tracking-tight">Curated Learning Path</h2>
              <p className="text-cyan-100 text-lg font-medium leading-relaxed">
                {loading ? "Analyzing your recent attempts..." : resource ? resource.reason : "Select a subject tab to load your personalized resources."}
              </p>
            </div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-white/5 skew-x-12 translate-x-10 pointer-events-none"></div>
            <Sparkles className="text-[120px] opacity-10 absolute right-8 bottom-[-20px]" />
          </div>
        </section>

        {/* Topic Tabs */}
        <div className="flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {tabs.map((t, idx) => (
            <button 
              key={idx} onClick={() => setTopic(t)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all border whitespace-nowrap ${topic === t ? 'bg-cyan-600 text-white border-cyan-600 shadow-md shadow-cyan-600/20' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >{t}</button>
          ))}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-12 gap-8">
          
          {/* Featured Video Card */}
          <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 rounded-xl overflow-hidden group shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="relative h-[360px]">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80" 
                alt="Topic visual"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'; }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/95 via-slate-900/40 to-transparent flex flex-col justify-end p-8">
                <div className="flex gap-3 mb-4">
                  <span className="bg-cyan-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Recommended</span>
                  <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider border border-white/20">Video</span>
                </div>
                <h3 className="text-white text-3xl font-headline font-bold mb-2 drop-shadow-lg">{topic} — Deep Dive</h3>
                <p className="text-slate-300 text-sm max-w-lg mb-6 line-clamp-2">
                  {loading ? "Fetching best resource for you..." : resource ? resource.video_link : "Select a topic to load your recommended video."}
                </p>
                <button className="inline-flex items-center gap-2 bg-white text-cyan-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-100 active:scale-95 transition-all w-fit shadow-md">
                  <Play className="w-4 h-4" fill="currentColor" /> Watch Recommended
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">

            {/* Focus Area Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="bg-red-500 px-5 py-3 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-xs font-black text-white">!</span>
                <span className="text-xs font-bold text-white uppercase tracking-widest">Focus Area</span>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-extrabold font-headline text-slate-900 dark:text-slate-50 mb-1">Struggling with {topic}?</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                  You've missed 4 practice questions in this topic this week.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">Core Concepts</span>
                  <span className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700">Problem Solving</span>
                </div>
              </div>
            </div>

            {/* Quick Practice Card */}
            <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm p-5 flex-1">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 mb-4">Quick Practice</h4>
              <div className="space-y-3">
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-100 dark:border-slate-700">
                  <div className="w-11 h-11 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 flex-shrink-0">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">10-Min Quiz</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{topic} Equations</p>
                  </div>
                  <ChevronRight className="text-slate-400 w-4 h-4" />
                </div>
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-xl cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors border border-slate-100 dark:border-slate-700">
                  <div className="w-11 h-11 rounded-xl bg-purple-100 dark:bg-purple-500/20 flex items-center justify-center text-purple-600 dark:text-purple-400 flex-shrink-0">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Concept Sketch</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Infinite Wells</p>
                  </div>
                  <ChevronRight className="text-slate-400 w-4 h-4" />
                </div>
              </div>
            </div>


          </div>

          {/* External Courses Section — just above Interactive Practice */}
          <div className="col-span-12">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-extrabold font-headline text-slate-900 dark:text-slate-50">External Courses</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Jump into top platforms directly from J.A.R.V.I.S.</p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {EXTERNAL_COURSES.map((c, i) => (
                <a key={i} href={c.url} target="_blank" rel="noopener noreferrer"
                  className="group bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-4 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 shadow border border-slate-100 dark:border-slate-700 bg-white flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img 
                      src={c.logo} 
                      alt={c.name}
                      className="w-8 h-8 object-contain"
                      onError={e => {
                        e.target.style.display = 'none';
                        e.target.parentNode.classList.add(c.color);
                        e.target.parentNode.innerHTML = `<span class="text-white font-black text-lg">${c.short}</span>`;
                      }}
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-slate-900 dark:text-slate-50 text-sm truncate">{c.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{c.desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-cyan-500 transition-colors flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* Interactive Practice Banner */}
          <div className="col-span-12 bg-cyan-600 text-white p-8 rounded-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg shadow-cyan-600/20">
            <div className="relative z-10">
              <h4 className="text-2xl font-headline font-extrabold mb-2 leading-tight">Interactive Practice: {topic}</h4>
              <p className="text-cyan-100 text-sm leading-relaxed max-w-lg">
                Your assigned practice module:{' '}
                <span className="font-bold underline">
                  {loading ? "Loading..." : resource ? resource.practice : "Select a topic"}
                </span>
              </p>
            </div>
            <button className="z-10 inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-cyan-700 px-8 py-3 rounded-full font-bold text-sm transition-all active:scale-95 shadow-sm whitespace-nowrap cursor-pointer">
              Begin Practice Module <ChevronRight className="w-4 h-4" />
            </button>
            <BookOpen className="text-[140px] opacity-10 absolute -right-6 -bottom-6 rotate-12" />
          </div>

        </div>
      </div>
    </Layout>
  );
}
