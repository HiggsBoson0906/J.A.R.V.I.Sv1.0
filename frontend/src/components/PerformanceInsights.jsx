import React, { useState, useEffect } from 'react'; 
import Layout from './Layout';
import { ArrowRight, HelpCircle, Sparkles, TrendingDown } from 'lucide-react';

export default function PerformanceInsights() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [perfData, setPerfData] = useState(null);
  const [dashData, setDashData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3001/api/performance', { headers: { 'x-user-id': user.userId || '' } })
      .then(r => r.json())
      .then(d => { if (d.success) setPerfData(d.data); })
      .catch(e => console.error(e));

    fetch('http://localhost:3001/api/dashboard', { headers: { 'x-user-id': user.userId || '' } })
      .then(r => r.json())
      .then(d => { if (d.success) setDashData(d.data); })
      .catch(e => console.error("Error fetching dashboard", e));
  }, []);

  const totalFocus = perfData ? perfData.focus_hours.reduce((a, c) => a + c.hours, 0).toFixed(1) : "0.0";
  const m = perfData ? perfData.metrics : { accuracy: 0, retention: 0, streak: 0 };
  
  return (
    <Layout>
      <div className="p-8 w-full max-w-7xl mx-auto space-y-10">
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-2 font-headline">Performance Insights</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-lg">Advanced metrics analyzing your cognitive patterns and study efficiency.</p>
          </div>
          <div className="flex gap-3">
             <button onClick={() => window.location.href = '/planner'} className="bg-cyan-600 text-white px-8 py-3 rounded-full font-bold text-sm shadow-md hover:bg-cyan-700 transition-colors cursor-pointer">Generate AI Plan</button>
          </div>
        </header>

        <div className="grid grid-cols-12 gap-6">
          {/* Learning Curve & Retention Graph */}
          <section className="col-span-12 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-center mb-10">
              <div>
                <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-slate-50">Learning Curve & Retention</h3>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1">Track how your memory evolves and when revision is needed</p>
              </div>
              <div className="flex gap-2">
                 <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 px-3 py-1 bg-emerald-50 dark:bg-emerald-900/40 rounded-full"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> Revision Marker</span>
              </div>
            </div>
            
            <div className="relative h-64 w-full flex items-end justify-between px-2 group/graph">
               <svg className="absolute inset-0 w-full h-full cursor-crosshair" preserveAspectRatio="none" viewBox="0 0 700 200">
                 <line stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" x1="0" x2="700" y1="40" y2="40"></line>
                 <line stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" x1="0" x2="700" y1="80" y2="80"></line>
                 <line stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" x1="0" x2="700" y1="120" y2="120"></line>
                 <line stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeWidth="1" x1="0" x2="700" y1="160" y2="160"></line>
                 
                 <path d="M0,20 Q100,120 200,140 L200,20 Q350,80 500,100 L500,20 Q600,40 700,50" fill="none" stroke="#0ea5e9" strokeLinecap="round" strokeWidth="4"></path>
                 <path d="M0,20 Q100,120 200,140 L200,20 Q350,80 500,100 L500,20 Q600,40 700,50 V200 H0 Z" fill="url(#grad-retention)" opacity="0.15"></path>
                 
                 {/* Revision Markers */}
                 <circle cx="200" cy="20" r="6" fill="#10b981" stroke="#fff" strokeWidth="2" className="transition-transform hover:scale-150 cursor-pointer"></circle>
                 <circle cx="500" cy="20" r="6" fill="#10b981" stroke="#fff" strokeWidth="2" className="transition-transform hover:scale-150 cursor-pointer"></circle>
                 
                 <defs>
                   <linearGradient id="grad-retention" x1="0%" x2="0%" y1="0%" y2="100%">
                     <stop offset="0%" style={{stopColor: "#0ea5e9", stopOpacity: 1}}></stop>
                     <stop offset="100%" style={{stopColor: "#0ea5e9", stopOpacity: 0}}></stop>
                   </linearGradient>
                 </defs>
               </svg>
               
               {/* Tooltips layer */}
               <div className="absolute top-[5px] left-[270px] opacity-0 group-hover/graph:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-white text-[10px] p-2 rounded shadow-xl pointer-events-none">
                  <p className="font-bold">Wednesday</p>
                  <p className="text-emerald-400">Retention: 95%</p>
                  <p className="text-slate-400">Topic: Linear Algebra</p>
               </div>
               <div className="absolute top-[10px] right-[20px] opacity-0 group-hover/graph:opacity-100 transition-opacity bg-slate-900 border border-slate-700 text-white text-[10px] p-2 rounded shadow-xl pointer-events-none">
                  <p className="font-bold">Sunday</p>
                  <p className="text-emerald-400">Retention: 90%</p>
                  <p className="text-slate-400">Topic: Quantum Physics</p>
               </div>
               
               <div className="absolute bottom-[-30px] w-full flex justify-between text-[10px] font-bold text-slate-500">
                 <span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span><span>SUN</span>
               </div>
            </div>
          </section>

          <section className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg flex flex-col gap-4 shadow-sm border border-slate-200 dark:border-slate-800">
               <h4 className="font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500"></div>Due Today</h4>
               <ul className="space-y-3 mt-2">
                 {dashData?.today_plan && dashData.today_plan.length > 0 ? (
                   dashData.today_plan.slice(0, 3).map((taskText, idx) => (
                     <li key={idx} className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                       <span className="text-slate-700 dark:text-slate-300 font-medium truncate pr-2" title={taskText}>{taskText}</span>
                       <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 px-2 py-0.5 rounded font-bold whitespace-nowrap">Priority</span>
                     </li>
                   ))
                 ) : (
                   <p className="text-sm text-slate-500 dark:text-slate-400">No immediate tasks scheduled.</p>
                 )}
               </ul>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg flex flex-col gap-4 shadow-sm border border-slate-200 dark:border-slate-800">
               <h4 className="font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-orange-500"></div>At Risk Topics</h4>
               <ul className="space-y-3 mt-2">
                 {dashData?.weak_topics && dashData.weak_topics.filter(t => t.accuracy < 60).length > 0 ? (
                   dashData.weak_topics.filter(t => t.accuracy < 60).slice(0, 3).map((t, idx) => (
                     <li key={idx} className="flex justify-between items-center text-sm border-b border-slate-100 dark:border-slate-800 pb-2">
                       <span className="text-slate-700 dark:text-slate-300 font-medium">{t.topic_name}</span>
                       <span className="text-xs font-bold text-slate-500">{t.accuracy}% Retained</span>
                     </li>
                   ))
                 ) : (
                   <p className="text-sm text-slate-500">Great job! No topics currently at risk.</p>
                 )}
               </ul>
            </div>
            
            <div className="bg-white dark:bg-slate-900 p-6 rounded-lg flex flex-col justify-center items-center gap-2 shadow-sm border border-slate-200 dark:border-slate-800 h-full">
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest text-center mt-2">Retention Score</p>
               <div className="text-5xl font-black font-headline text-emerald-600 dark:text-emerald-400 my-2">{m.retention}%</div>
               <p className="text-xs font-bold text-emerald-600/70 dark:text-emerald-400/70 text-center mb-2">Steady retention curve</p>
            </div>
          </section>

          <section className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-lg flex flex-col items-center shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="w-full mb-6">
              <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-slate-50 text-left">Subject Mastery</h3>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-wider mt-1 text-left">Multi-dimensional skill map</p>
            </div>
            
            <div className="relative w-48 h-48 mt-4 flex items-center justify-center">
              {/* 5-axis pentagon spider chart */}
              <svg className="w-full h-full text-slate-200 dark:text-slate-700" viewBox="0 0 100 100">
                {/* Grid rings (pentagon) */}
                <polygon fill="none" points="50,8 87,30 74,72 26,72 13,30" stroke="currentColor" strokeWidth="0.5"></polygon>
                <polygon fill="none" points="50,22 76,38 67,62 33,62 24,38" stroke="currentColor" strokeWidth="0.5"></polygon>
                <polygon fill="none" points="50,36 65,46 60,60 40,60 35,46" stroke="currentColor" strokeWidth="0.5"></polygon>
                {/* Axis lines */}
                <line stroke="currentColor" strokeWidth="0.5" x1="50" y1="8" x2="50" y2="50"></line>
                <line stroke="currentColor" strokeWidth="0.5" x1="87" y1="30" x2="50" y2="50"></line>
                <line stroke="currentColor" strokeWidth="0.5" x1="74" y1="72" x2="50" y2="50"></line>
                <line stroke="currentColor" strokeWidth="0.5" x1="26" y1="72" x2="50" y2="50"></line>
                <line stroke="currentColor" strokeWidth="0.5" x1="13" y1="30" x2="50" y2="50"></line>
                {/* Data polygon */}
                <polygon fill="rgba(79, 70, 229, 0.2)" points="50,14 82,33 68,68 32,68 18,33" stroke="#4f46e5" strokeWidth="2"></polygon>
              </svg>
              {/* Labels */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 text-[9px] font-bold text-cyan-600 dark:text-cyan-400 whitespace-nowrap">MATH</div>
              <div className="absolute top-[22%] -right-6 text-[9px] font-bold text-slate-500 whitespace-nowrap">PHY</div>
              <div className="absolute bottom-[5%] right-[0%] text-[9px] font-bold text-slate-500 whitespace-nowrap">ORGANIC</div>
              <div className="absolute bottom-[5%] left-[0%] text-[9px] font-bold text-slate-500 whitespace-nowrap">INORG</div>
              <div className="absolute top-[22%] -left-6 text-[9px] font-bold text-slate-500 whitespace-nowrap">PHYSICAL</div>
            </div>
            
            <div className="mt-12 w-full grid grid-cols-2 gap-4">
               <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest text-left">Accuracy</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50 text-left">{m.accuracy}%</p>
               </div>
               <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
                  <p className="text-[10px] font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest text-left">Retention Rate</p>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-50 text-left">{m.retention}%</p>
               </div>
            </div>
          </section>



          <section className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <h3 className="text-xl font-bold font-headline mb-6 text-slate-900 dark:text-slate-50">Efficiency Metrics</h3>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-slate-500">Retention Rate</span>
                  <span className="text-cyan-600 dark:text-cyan-400">{m.retention}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-600 rounded-full" style={{ width: `${m.retention}%` }}></div>
                </div>
              </div>
            </div>
            <div className="mt-10 pt-10 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-8">
              <div>
                <p className="text-3xl font-black font-headline text-slate-900 dark:text-slate-50">{totalFocus}h</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Focus Time (WK)</p>
              </div>
              <div>
                <p className="text-3xl font-black font-headline text-slate-900 dark:text-slate-50">{m.streak}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">Streaks Kept</p>
              </div>
            </div>
          </section>
          
          <section className="col-span-12 lg:col-span-4 bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col space-y-4 relative overflow-hidden">
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
