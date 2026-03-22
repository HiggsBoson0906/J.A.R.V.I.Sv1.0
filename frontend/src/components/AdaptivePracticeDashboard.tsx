import React from 'react';
import { 
  Bot, Zap, FlaskConical, Sigma, ArrowRight, 
  ChevronRight, CircleDot, TrendingDown, Activity, BadgeCheck, 
  Sparkles, Calendar 
} from 'lucide-react';
import Layout from './Layout';

export default function AdaptivePracticeDashboard() {
  return (
    <Layout>
      <div className="bg-slate-50 dark:bg-slate-950 flex flex-col min-h-screen">
        <div className="p-8 max-w-7xl mx-auto w-full">
          {/* Hero Header */}
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight mb-2 font-headline">Adaptive Practice</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium opacity-80">Practice smarter with AI-driven PYQ-based questions</p>
          </div>

          <div className="grid grid-cols-12 gap-8">
            {/* Main Flow (Left Column) */}
            <div className="col-span-12 lg:col-span-8 space-y-12">
              
              {/* 1. Subject Cards */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-cyan-600 dark:bg-cyan-500 rounded-full"></span>
                    Choose Your Subject
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Physics */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border dark:border-slate-800 border-transparent hover:border-cyan-600/10 dark:hover:border-cyan-500/20 transition-all group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4 relative">
                      <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                        <Zap className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40 px-2 py-1 rounded-md">82% Mastery</span>
                    </div>
                    <h4 className="text-lg font-bold mb-1 relative text-slate-900 dark:text-slate-100">Physics</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 relative">1,240 questions available</p>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full relative">
                      <div className="h-full bg-blue-600 dark:bg-blue-500 rounded-full w-[82%]"></div>
                    </div>
                  </div>

                  {/* Chemistry */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border border-cyan-600/20 dark:border-cyan-500/30 transition-all ring-2 ring-cyan-600/5 cursor-pointer relative overflow-hidden">
                     <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4 relative">
                      <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                        <FlaskConical className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-1 rounded-md">64% Mastery</span>
                    </div>
                    <h4 className="text-lg font-bold mb-1 relative text-slate-900 dark:text-slate-100">Chemistry</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 relative">980 questions available</p>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full relative">
                      <div className="h-full bg-emerald-600 dark:bg-emerald-500 rounded-full w-[64%]"></div>
                    </div>
                  </div>

                  {/* Maths */}
                  <div className="bg-white dark:bg-slate-900 p-6 rounded-lg shadow-sm border dark:border-slate-800 border-transparent hover:border-cyan-600/10 dark:hover:border-cyan-500/20 transition-all group cursor-pointer relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start mb-4 relative">
                      <div className="p-3 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl">
                        <Sigma className="w-6 h-6" />
                      </div>
                      <span className="text-xs font-bold text-purple-600 dark:text-purple-300 bg-purple-50 dark:bg-purple-900/40 px-2 py-1 rounded-md">45% Mastery</span>
                    </div>
                    <h4 className="text-lg font-bold mb-1 relative text-slate-900 dark:text-slate-100">Mathematics</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mb-4 relative">1,500 questions available</p>
                    <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full relative">
                      <div className="h-full bg-purple-600 dark:bg-purple-500 rounded-full w-[45%]"></div>
                    </div>
                  </div>
                </div>
              </section>

              {/* 2. Chapter Selection */}
              <section className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">Select Chapter: Chemistry</h3>
                  <button className="text-cyan-600 dark:text-cyan-400 text-sm font-bold flex items-center gap-1 hover:underline">
                    View syllabus <ArrowRight className="w-4 h-4 text-sm" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl text-left hover:scale-[1.01] transition-transform shadow-sm group border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Organic Chemistry: Basic Principles</span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                  <button className="flex items-center justify-between p-4 bg-cyan-600 text-white rounded-2xl text-left shadow-lg shadow-cyan-600/20 ring-4 ring-cyan-600/10 cursor-pointer">
                    <span className="font-semibold">Chemical Bonding</span>
                    <CircleDot className="w-5 h-5" />
                  </button>
                  <button className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl text-left hover:scale-[1.01] transition-transform shadow-sm group border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Thermodynamics</span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                  <button className="flex items-center justify-between p-4 bg-white dark:bg-slate-900 rounded-2xl text-left hover:scale-[1.01] transition-transform shadow-sm group border border-slate-200 dark:border-slate-700">
                    <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">Equilibrium</span>
                    <ChevronRight className="w-5 h-5 text-slate-400" />
                  </button>
                </div>
              </section>

              {/* 3. Concept List */}
              <section>
                <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-6">Mastery Breakdown</h3>
                <div className="space-y-4">
                  
                  {/* Weak */}
                  <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-red-500 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/30 flex items-center justify-center text-red-500 dark:text-red-400">
                        <TrendingDown className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">VSEPR Theory</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">3 PYQs solved • 20% accuracy</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-xs font-bold uppercase tracking-wider">Weak</span>
                  </div>

                  {/* Moderate */}
                  <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-amber-400 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-amber-50 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400">
                        <Activity className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">Hybridization</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">12 PYQs solved • 58% accuracy</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">Moderate</span>
                  </div>

                  {/* Strong */}
                  <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 rounded-2xl border-l-4 border-emerald-500 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-50 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                        <BadgeCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100">Ionic Bonding</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">45 PYQs solved • 94% accuracy</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">Strong</span>
                  </div>

                </div>
              </section>

            </div>

            {/* Side Panel (Right Column) */}
            <aside className="col-span-12 lg:col-span-4 space-y-6">
              {/* Performance Insights */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 shadow-sm sticky top-24">
                <h4 className="text-lg font-bold mb-6 text-slate-900 dark:text-slate-100">Performance Insights</h4>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Accuracy</p>
                    <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">68%</p>
                  </div>
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl text-center">
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase mb-1">Avg Time</p>
                    <p className="text-2xl font-black text-cyan-600 dark:text-cyan-400">1.2m</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Current Weak Spots</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[11px] font-bold px-3 py-1.5 rounded-full">Molecular Geometry</span>
                    <span className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[11px] font-bold px-3 py-1.5 rounded-full">Dipole Moment</span>
                    <span className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[11px] font-bold px-3 py-1.5 rounded-full">Fajan's Rule</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-2xl border border-cyan-100 dark:border-cyan-800/30">
                  <p className="text-sm text-cyan-700 dark:text-cyan-400 font-bold mb-2 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    AI Recommendation
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    You tend to lose marks in "Bond Angles" questions when lone pairs are present. I suggest starting a focused session on <b>Lone Pair repulsion</b>.
                  </p>
                  <button className="w-full mt-4 bg-cyan-600 text-white py-2.5 rounded-xl font-bold text-xs transition-transform hover:bg-cyan-700 active:scale-95 cursor-pointer shadow-sm">
                    Start Recommended Drill
                  </button>
                </div>
              </div>

              {/* Upcoming Schedule / Quick Links */}
              <div className="bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg p-6 shadow-sm">
                <h4 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
                  <Calendar className="w-4 h-4" />
                  Next Scheduled
                </h4>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="bg-white dark:bg-slate-900 shadow-sm border border-slate-200 dark:border-slate-700 p-2 rounded-lg text-center h-fit min-w-[3rem]">
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">OCT</p>
                      <p className="text-lg font-black text-cyan-600 dark:text-cyan-400">12</p>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Mock Test #4 (Full)</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">09:00 AM • 180 Minutes</p>
                    </div>
                  </div>
                </div>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </Layout>
  );
}
