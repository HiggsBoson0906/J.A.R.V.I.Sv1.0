import React, { useState, useEffect } from 'react'; 
import Layout from './Layout';
import { ArrowRight, HelpCircle, Sparkles, TrendingDown } from 'lucide-react';

export default function PerformanceInsights() {
  const [perfData, setPerfData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/performance')
      .then(r => r.json())
      .then(d => { if (d.success) setPerfData(d.data); })
      .catch(e => console.error(e));
  }, []);

  const totalFocus = perfData ? perfData.focus_hours.reduce((a, c) => a + c.hours, 0).toFixed(1) : "0.0";
  const m = perfData ? perfData.metrics : { accuracy: 0, time_management: 0, revision: 0, coverage: 0 };
  
  return (
    <Layout>
      <div className="p-8 w-full max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-2 font-headline">Performance Insights</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg">Advanced metrics analyzing your cognitive patterns and study efficiency.</p>
          </div>
          <div className="flex gap-3">
             <button className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 px-6 py-3 rounded-full font-bold text-sm hover:bg-slate-200 transition-colors shadow-sm">Export Report</button>
             <button className="bg-cyan-600 text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:opacity-90 transition-opacity">Generate AI Plan</button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* SVG Curve Graph */}
          <section className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-slate-50">Focus Hours Trend</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Daily deep-work activity mapping</p>
              </div>
              <div className="flex gap-2">
                 <span className="flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 px-3 py-1 bg-cyan-50 dark:bg-cyan-900/40 rounded-full"><span className="w-2 h-2 bg-cyan-600 rounded-full"></span> This Week</span>
                 <span className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full"><span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full"></span> Last Week</span>
              </div>
            </div>
            
            <div className="relative h-64 w-full flex items-end justify-between px-2">
               <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 700 200">
                 <line stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" x1="0" x2="700" y1="40" y2="40"></line>
                 <line stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" x1="0" x2="700" y1="80" y2="80"></line>
                 <line stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" x1="0" x2="700" y1="120" y2="120"></line>
                 <line stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" x1="0" x2="700" y1="160" y2="160"></line>
                 
                 <path d="M0,160 Q100,140 150,80 T300,40 T450,120 T600,60 T700,90" fill="none" stroke="#4f46e5" strokeLinecap="round" strokeWidth="4"></path>
                 <path d="M0,160 Q100,140 150,80 T300,40 T450,120 T600,60 T700,90 V200 H0 Z" fill="url(#grad1)" opacity="0.15"></path>
                 <defs>
                   <linearGradient id="grad1" x1="0%" x2="0%" y1="0%" y2="100%">
                     <stop offset="0%" style={{stopColor: "#4f46e5", stopOpacity: 1}}></stop>
                     <stop offset="100%" style={{stopColor: "#4f46e5", stopOpacity: 0}}></stop>
                   </linearGradient>
                 </defs>
               </svg>
               <div className="absolute bottom-[-30px] w-full flex justify-between text-[10px] font-bold text-slate-500">
                 <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
               </div>
            </div>
          </section>

          {/* SVG Spider Chart */}
          <section className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-lg flex flex-col items-center shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="w-full mb-6">
              <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-slate-50 text-left">Subject Mastery</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 text-left">Multi-dimensional skill map</p>
            </div>
            
            <div className="relative w-48 h-48 mt-4 flex items-center justify-center">
              <svg className="w-full h-full text-slate-200 dark:text-slate-700" viewBox="0 0 100 100">
                <polygon fill="none" points="50,5 90,25 90,75 50,95 10,75 10,25" stroke="currentColor" strokeWidth="0.5"></polygon>
                <polygon fill="none" points="50,20 80,35 80,65 50,80 20,65 20,35" stroke="currentColor" strokeWidth="0.5"></polygon>
                <polygon fill="none" points="50,35 70,45 70,55 50,65 30,55 30,45" stroke="currentColor" strokeWidth="0.5"></polygon>
                <line stroke="currentColor" strokeWidth="0.5" x1="50" x2="50" y1="5" y2="95"></line>
                <line stroke="currentColor" strokeWidth="0.5" x1="10" x2="90" y1="25" y2="75"></line>
                <line stroke="currentColor" strokeWidth="0.5" x1="10" x2="90" y1="75" y2="25"></line>
                <polygon fill="rgba(79, 70, 229, 0.2)" points="50,15 85,30 75,70 50,85 15,60 25,30" stroke="#4f46e5" strokeWidth="2"></polygon>
              </svg>
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-cyan-600 dark:text-cyan-400">MATH</div>
              <div className="absolute top-1/4 -right-10 text-[10px] font-bold text-slate-500">SCIENCE</div>
              <div className="absolute bottom-1/4 -right-8 text-[10px] font-bold text-slate-500">HIST</div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-bold text-slate-500">ECON</div>
              <div className="absolute bottom-1/4 -left-10 text-[10px] font-bold text-slate-500">CS</div>
              <div className="absolute top-1/4 -left-10 text-[10px] font-bold text-slate-500">LIT</div>
            </div>
            
            <div className="mt-12 w-full grid grid-cols-2 gap-4">
               <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest text-left">Highest</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50 text-left">Mathematics</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest text-left">Growth</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50 text-left">Comp Science</p>
               </div>
            </div>
          </section>

          <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg flex flex-col gap-4 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-red-50 dark:bg-red-500/10 rounded-2xl flex items-center justify-center text-red-600 dark:text-red-400">
                <TrendingDown />
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-50">Fatigue Alert</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Your accuracy drops significantly after study sessions exceeding 90 minutes.</p>
              </div>
              <button className="mt-auto text-cyan-600 dark:text-cyan-400 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer">
                Optimize Schedule <ArrowRight className="w-3 h-3" />
              </button>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg flex flex-col gap-4 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400">
                <HelpCircle />
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-50">Peak Morning Focus</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">Data indicates your highest cognitive retention occurs between 8:00 AM - 10:30 AM.</p>
              </div>
              <button className="mt-auto text-cyan-600 dark:text-cyan-400 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer">
                Reschedule Tasks <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg flex flex-col gap-4 shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="w-12 h-12 bg-cyan-600 rounded-2xl flex items-center justify-center text-white">
                <Sparkles />
              </div>
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-50">Knowledge Gap Found</h4>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">"Linear Algebra" concepts are missing in 40% of your physics problems. 3 targeted resources added to your library.</p>
              </div>
              <button className="mt-auto text-cyan-600 dark:text-cyan-400 text-xs font-bold flex items-center gap-1 hover:underline cursor-pointer">
                Review Materials <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          <section className="col-span-12 lg:col-span-7 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold font-headline mb-6 text-slate-900 dark:text-slate-50">Efficiency Metrics</h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-500">Task Completion Rate</span>
                  <span className="text-cyan-600 dark:text-cyan-400">{m.time_management ? m.time_management : 84}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${m.time_management ? m.time_management : 84}%` }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-500">Recall Accuracy</span>
                  <span className="text-cyan-600 dark:text-cyan-400">{m.accuracy ? m.accuracy : 91}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${m.accuracy ? m.accuracy : 91}%` }}></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-500">Study Stamina</span>
                  <span className="text-cyan-600 dark:text-cyan-400">{m.coverage ? m.coverage : 62}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${m.coverage ? m.coverage : 62}%` }}></div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-black font-headline text-slate-900 dark:text-slate-50">{totalFocus}h</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Focus Time (WK)</p>
              </div>
              <div>
                <p className="text-3xl font-black font-headline text-slate-900 dark:text-slate-50">14</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Streaks Kept</p>
              </div>
            </div>
          </section>
          
          <section className="col-span-12 lg:col-span-5 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col space-y-4 relative overflow-hidden">
            <h3 className="text-xl font-bold font-headline mb-4 text-slate-900 dark:text-slate-50">Recent Wins</h3>
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 z-10">
              <div className="w-10 h-10 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center"><HelpCircle className="w-5 h-5" /></div>
              <div className="flex-1">
                 <p className="text-sm font-bold text-slate-900 dark:text-slate-50">Concept Mastered</p>
                 <p className="text-[10px] text-slate-500">Passed Physics Mock with 95% accuracy</p>
              </div>
              <span className="text-[10px] text-slate-400">2h ago</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 z-10">
              <div className="w-10 h-10 bg-cyan-50 text-cyan-400 rounded-full flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
              <div className="flex-1">
                 <p className="text-sm font-bold text-slate-900 dark:text-slate-50">Deep Work Streak</p>
                 <p className="text-[10px] text-slate-500">Completed 4 consecutive 45-min sessions</p>
              </div>
              <span className="text-[10px] text-slate-400">Yesterday</span>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 z-10">
              <div className="w-10 h-10 bg-orange-50 text-orange-400 rounded-full flex items-center justify-center"><HelpCircle className="w-5 h-5" /></div>
              <div className="flex-1">
                 <p className="text-sm font-bold text-slate-900 dark:text-slate-50">Library Milestone</p>
                 <p className="text-[10px] text-slate-500">Finished all "Calculus II" practice sets</p>
              </div>
              <span className="text-[10px] text-slate-400">3 days ago</span>
            </div>
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-cyan-600/5 rounded-full blur-3xl z-0"></div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
