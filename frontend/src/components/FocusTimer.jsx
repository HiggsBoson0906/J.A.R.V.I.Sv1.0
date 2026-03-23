import React, { useState, useEffect } from 'react'; 
import Layout from './Layout';
import { Play, Pause, RefreshCw, Save } from 'lucide-react';
import { useTimer } from './TimerContext';

export default function FocusTimer() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const { timeLeft, isActive, topic, mode, sessionSavedTick, setTopic, toggleTimer, resetTimer, handleSaveSessionManually } = useTimer();
  const [totalFocus, setTotalFocus] = useState(0);

  useEffect(() => {
    if(user.userId) {
       fetch('http://localhost:3001/api/performance', { headers: { 'x-user-id': user.userId } })
         .then(r => r.json())
         .then(d => {
             if(d.success && d.data.focus_hours) {
                 const total = d.data.focus_hours.reduce((acc, curr) => acc + curr.hours, 0);
                 setTotalFocus(total);
             }
         }).catch(console.error);
    }
  }, [user.userId, sessionSavedTick]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const totalModeSeconds = parseInt(mode) * 60;
  const circularProgress = ((totalModeSeconds - timeLeft) / totalModeSeconds) * 1320;

  return (
    <Layout>
      <div className="p-8 w-full max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
        <section className="flex-1 flex flex-col items-center justify-center space-y-12">
          <div className="text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight mb-2 text-slate-900 dark:text-slate-50">Focus Session</h2>
            <input 
              className="text-center text-cyan-600 dark:text-cyan-400 font-bold bg-transparent border-b-2 border-cyan-200 dark:border-cyan-800 focus:outline-none focus:border-cyan-500 transition-colors w-72" 
              value={topic} 
              onChange={e => setTopic(e.target.value)} 
              placeholder="What are you studying?"
            />
          </div>

          <div className="relative flex items-center justify-center w-[450px] h-[450px] bg-white dark:bg-slate-900 rounded-full shadow-2xl shadow-cyan-500/10 border-4 border-slate-50 dark:border-slate-800">
            <svg className="absolute w-full h-full transform -rotate-90 text-cyan-100 dark:text-cyan-900/30">
              <circle cx="225" cy="225" fill="transparent" r="210" stroke="currentColor" strokeWidth="12"></circle>
              <circle className="text-cyan-500 transition-all duration-1000 ease-linear" cx="225" cy="225" fill="transparent" r="210" stroke="currentColor" strokeDasharray="1320" strokeDashoffset={1320 - circularProgress} strokeLinecap="round" strokeWidth="12"></circle>
            </svg>
            <div className="text-center z-10">
              <span className="block font-headline text-8xl font-black tracking-tighter text-slate-900 dark:text-slate-50">{formatTime(timeLeft)}</span>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 mt-4 bg-cyan-50 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 rounded-full font-bold text-xs uppercase tracking-widest border border-cyan-100 dark:border-cyan-500/20">
                <span className={`w-2 h-2 rounded-full bg-cyan-600 ${isActive ? 'animate-ping' : ''}`}></span>
                {isActive ? 'Deep Work Active' : 'Paused'}
              </span>
            </div>
          </div>

          <div className="flex gap-4 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700">
            <button onClick={() => resetTimer(25)} className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${mode === '25' ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>25m</button>
            <button onClick={() => resetTimer(50)} className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${mode === '50' ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>50m</button>
            <button onClick={() => resetTimer(15)} className={`px-8 py-2.5 rounded-full font-bold text-sm transition-all ${mode === '15' ? 'bg-white dark:bg-slate-900 text-cyan-600 dark:text-cyan-400 shadow-sm' : 'text-slate-500 dark:text-slate-400'}`}>15m</button>
          </div>

          <div className="flex items-center gap-8">
            <button onClick={() => resetTimer(parseInt(mode))} className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm active:scale-95">
              <RefreshCw className="w-6 h-6" />
            </button>
            <button onClick={toggleTimer} className="w-24 h-24 rounded-full flex items-center justify-center bg-cyan-600 text-white hover:bg-cyan-700 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-cyan-600/30 cursor-pointer">
              {isActive ? <Pause className="w-10 h-10" /> : <Play className="w-10 h-10 ml-2" />}
            </button>
            <button onClick={handleSaveSessionManually} className="w-16 h-16 rounded-full flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-slate-700 cursor-pointer shadow-sm active:scale-95">
              <Save className="w-6 h-6" />
            </button>
          </div>
        </section>

        <section className="w-full lg:w-[420px] flex flex-col gap-6 mt-12 lg:mt-0">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-slate-50">Stanford Alchemists</h3>
                <p className="text-xs text-slate-500 font-medium mt-1">12 active members in focus mode</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 py-3 bg-cyan-600 text-white rounded-full text-xs font-bold hover:bg-cyan-700 transition-colors cursor-pointer">Invite Friend</button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-lg flex flex-col flex-1 overflow-hidden shadow-sm border border-slate-200 dark:border-slate-800 h-96">
            <div className="px-8 pt-8 pb-4 flex justify-between items-center">
              <h4 className="font-headline font-bold text-slate-900 dark:text-slate-50">Your Focus Stats</h4>
            </div>
            <div className="flex-1 overflow-y-auto px-4 pb-8 space-y-2">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-100 dark:border-cyan-500/20">
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{user.name || 'Student'} (You)</p>
                  <p className="text-[10px] text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest">Total Time Focused</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black font-headline text-slate-900 dark:text-slate-50">{totalFocus.toFixed(1)}h</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
