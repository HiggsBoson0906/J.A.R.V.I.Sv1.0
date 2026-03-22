import React from 'react'; 
import Layout from './Layout';
import { ArrowRight, BarChart2, Bell, BookOpen, Bot, Brain, Calendar, CalendarDays, CheckCircle, ChevronLeft, ChevronRight, Clock, Home, Microscope, Play, RefreshCw, Search, Sparkles, Timer, TrendingDown, User } from 'lucide-react';

export default function JARVISAiStudyPlatform() {
  return (
    <Layout>
      {/*  SideNavBar Shell  */}

{/*  TopNavBar Shell  */}

{/*  Main Content Canvas  */}
<div className="p-8 w-full max-w-7xl mx-auto">
{/*  Welcome Section  */}
<section className="mb-10">
<h2 className="text-4xl font-extrabold font-headline tracking-tight text-on-background mb-2">Good evening, Alex</h2>
<p className="text-lg text-on-surface-variant font-medium">Let’s make today productive</p>
</section>
{/*  Bento Layout  */}
<div className="grid grid-cols-12 gap-6">
{/*  AI Today's Plan Card (Focus Area)  */}
<div className="col-span-12 lg:col-span-8 bg-surface-container-lowest rounded-lg p-8 relative overflow-hidden group">
{/*  Abstract AI Pattern Decoration  */}
<div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl transition-all group-hover:bg-primary/10"></div>
<div className="relative z-10">
<div className="flex justify-between items-center mb-8">
<div className="flex items-center gap-3">
<Sparkles className="text-primary" />
<h3 className="text-xl font-bold font-headline">Today’s Plan</h3>
</div>
<span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary-fixed px-3 py-1 rounded-full">AI Generated</span>
</div>
<div className="space-y-6">
<div className="flex items-start gap-4">
<div className="mt-1 w-6 h-6 rounded-full border-2 border-primary-fixed flex items-center justify-center">
<div className="w-2.5 h-2.5 bg-primary rounded-full"></div>
</div>
<div>
<p className="font-bold text-on-surface">Quantum Mechanics: Wave-Particle Duality</p>
<p className="text-sm text-on-surface-variant mt-1">Focus Session • 45 mins • Deep Work</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="mt-1 w-6 h-6 rounded-full border-2 border-surface-container-highest flex items-center justify-center"></div>
<div>
<p className="font-medium text-on-surface-variant">Review: Differential Equations</p>
<p className="text-sm text-on-surface-variant mt-1">Revision • 20 mins • Quick Recall</p>
</div>
</div>
<div className="flex items-start gap-4">
<div className="mt-1 w-6 h-6 rounded-full border-2 border-surface-container-highest flex items-center justify-center"></div>
<div>
<p className="font-medium text-on-surface-variant">Lab Report: Superconductivity</p>
<p className="text-sm text-on-surface-variant mt-1">Assignment • 60 mins • Moderate</p>
</div>
</div>
</div>
<div className="mt-10 flex gap-4">
<button className="bg-gradient-to-r from-primary to-primary-container text-white px-8 py-3 rounded-full font-bold transition-transform active:scale-95 flex items-center gap-2">
<Play />
                            Start Session
                        </button>
<button className="bg-surface-container-high text-on-surface px-6 py-3 rounded-full font-bold transition-transform active:scale-95 flex items-center gap-2">
<RefreshCw className="text-sm" />
                            Regenerate Plan
                        </button>
</div>
</div>
</div>
{/*  Quick Actions Sidebar  */}
<div className="col-span-12 lg:col-span-4 space-y-6">
<div className="bg-surface-container-lowest rounded-lg p-6">
<h3 className="font-bold font-headline mb-4">Quick Actions</h3>
<div className="grid grid-cols-1 gap-3">
<button className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left group">
<div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
<Brain />
</div>
<div>
<p className="text-sm font-bold">Ask Doubt</p>
<p className="text-xs text-on-surface-variant">Instant AI Tutoring</p>
</div>
</button>
<button className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left group">
<div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center text-tertiary group-hover:scale-110 transition-transform">
<Timer />
</div>
<div>
<p className="text-sm font-bold">Start Focus Session</p>
<p className="text-xs text-on-surface-variant">Deep concentration mode</p>
</div>
</button>
<button className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-low hover:bg-surface-container-high transition-colors text-left group">
<div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
<CalendarDays />
</div>
<div>
<p className="text-sm font-bold">Open Planner</p>
<p className="text-xs text-on-surface-variant">View full schedule</p>
</div>
</button>
</div>
</div>
{/*  Weak Topics Section  */}
<div className="bg-surface-container-lowest rounded-lg p-6">
<h3 className="font-bold font-headline mb-4 flex items-center gap-2">
<TrendingDown className="text-error text-xl" />
                        Weak Topics
                    </h3>
<div className="flex flex-wrap gap-2">
<span className="px-4 py-2 rounded-full bg-error-container text-on-error-container text-xs font-bold border border-transparent">Thermodynamics</span>
<span className="px-4 py-2 rounded-full bg-error-container text-on-error-container text-xs font-bold border border-transparent">Organic Synthesis</span>
<span className="px-4 py-2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold border border-transparent">Linear Algebra</span>
<span className="px-4 py-2 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant text-xs font-bold border border-transparent">Macroeconomics</span>
</div>
<button className="mt-6 text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                        Generate Practice Quiz <ArrowRight className="text-sm" />
</button>
</div>
</div>
{/*  Stats Overview - Horizontal Bento  */}
<div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
<div className="bg-surface-container-lowest rounded-lg p-6 flex items-center justify-between transition-all hover:bg-surface-bright border border-transparent hover:border-outline-variant/10">
<div>
<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Focus Hours</p>
<p className="text-3xl font-black font-headline">32.4<span className="text-lg font-medium text-on-surface-variant ml-1">h</span></p>
</div>
<div className="w-12 h-12 bg-primary-fixed rounded-full flex items-center justify-center text-primary">
<Clock />
</div>
</div>
<div className="bg-surface-container-lowest rounded-lg p-6 flex items-center justify-between transition-all hover:bg-surface-bright border border-transparent hover:border-outline-variant/10">
<div>
<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Sessions Completed</p>
<p className="text-3xl font-black font-headline">128</p>
</div>
<div className="w-12 h-12 bg-secondary-fixed rounded-full flex items-center justify-center text-secondary">
<CheckCircle />
</div>
</div>
<div className="bg-surface-container-lowest rounded-lg p-6 flex items-center justify-between transition-all hover:bg-surface-bright border border-transparent hover:border-outline-variant/10">
<div>
<p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-1">Accuracy %</p>
<p className="text-3xl font-black font-headline">84<span className="text-lg font-medium text-on-surface-variant">%</span></p>
</div>
<div className="w-12 h-12 bg-tertiary-fixed rounded-full flex items-center justify-center text-tertiary">
<Microscope />
</div>
</div>
</div>
{/*  Performance Chart Area (Visual Filler for Premium look)  */}
<div className="col-span-12 bg-surface-container-lowest rounded-lg p-8">
<div className="flex justify-between items-end mb-8">
<div>
<h3 className="text-xl font-bold font-headline mb-1">Weekly Learning Momentum</h3>
<p className="text-sm text-on-surface-variant">You're 12% more active than last week</p>
</div>
<div className="flex gap-2">
<div className="h-8 w-8 rounded bg-surface-container-high flex items-center justify-center cursor-pointer">
<ChevronLeft className="text-sm" />
</div>
<div className="h-8 w-8 rounded bg-surface-container-high flex items-center justify-center cursor-pointer">
<ChevronRight className="text-sm" />
</div>
</div>
</div>
{/*  Mock Chart Visualization  */}
<div className="flex items-end justify-between h-48 gap-4 px-4">
<div className="flex-1 bg-primary/10 rounded-t-lg relative group h-24 hover:h-32 transition-all duration-500">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Mon</span>
</div>
<div className="flex-1 bg-primary/20 rounded-t-lg relative group h-36 hover:h-40 transition-all duration-500">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Tue</span>
</div>
<div className="flex-1 bg-primary rounded-t-lg relative group h-44 hover:h-48 transition-all duration-500">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Wed</span>
</div>
<div className="flex-1 bg-primary/40 rounded-t-lg relative group h-28 hover:h-36 transition-all duration-500">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Thu</span>
</div>
<div className="flex-1 bg-primary/60 rounded-t-lg relative group h-32 hover:h-40 transition-all duration-500">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Fri</span>
</div>
<div className="flex-1 bg-primary-fixed-dim rounded-t-lg relative group h-16 hover:h-24 transition-all duration-500">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Sat</span>
</div>
<div className="flex-1 bg-primary-fixed-dim rounded-t-lg relative group h-12 hover:h-20 transition-all duration-500">
<span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Sun</span>
</div>
</div>
</div>
</div>
</div>
    </Layout>
  );
}
