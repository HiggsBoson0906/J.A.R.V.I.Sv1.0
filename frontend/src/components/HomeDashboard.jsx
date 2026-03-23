import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import { Brain, CalendarDays, CheckCircle, Clock, Microscope, Play, Plus, RefreshCw, Sparkles, Timer, TrendingDown } from 'lucide-react';
import { useTimer } from './TimerContext';

export default function HomeDashboard() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const navigate = useNavigate();
  const { setTopic } = useTimer();

  const [loadingPlan, setLoadingPlan] = useState(false);
  const [dashboardData, setDashboardData] = useState(null);
  const [perfData, setPerfData] = useState(null);

  const [todayPlan, setTodayPlan] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [customTask, setCustomTask] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/dashboard?t=${Date.now()}`, { headers: { 'x-user-id': user.userId || '' }, cache: 'no-store' })
      .then(r => r.json())
      .then(d => { 
        if (d.success) {
          setDashboardData(d.data);
          const cachedPlan = JSON.parse(localStorage.getItem('syncedPlan'));
          if (cachedPlan && cachedPlan.length > 0) {
              setTodayPlan(cachedPlan.map(t => ({ 
                  text: `${(t.time||'').split(' - ')[0]} | ${t.task}`, 
                  rawTopic: t.task, 
                  completed: false 
              })));
          } else {
              setTodayPlan(d.data.today_plan.map(t => ({ text: `Revise foundational concepts in ${t}`, rawTopic: t, completed: false })));
          }
        } 
      })
      .catch(e => console.error("Failed dashboard fetch", e));
      
    fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/performance?t=${Date.now()}`, { headers: { 'x-user-id': user.userId || '' }, cache: 'no-store' })
      .then(r => r.json())
      .then(d => { if (d.success) setPerfData(d.data); })
      .catch(e => console.error("Failed metrics fetch", e));
  }, []);

  const handleRegeneratePlan = async () => {
    setLoadingPlan(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/generate-plan`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-id': user.userId || ''
        },
        body: JSON.stringify({ performance_data: dashboardData ? dashboardData.weak_topics : [] })
      });
      const data = await res.json();
      if (data.success) navigate('/planner');
    } catch(e) {
      alert("Error: " + e.message);
    }
    setLoadingPlan(false);
  };

  const handleStartSession = () => {
    if(todayPlan.length > 0) setTopic(todayPlan[0].text);
    navigate('/timer');
  };

    const toggleTask = async (idx) => {
    const fresh = [...todayPlan];
    const isNowCompleted = !fresh[idx].completed;
    fresh[idx].completed = isNowCompleted;
    setTodayPlan(fresh);

    if (isNowCompleted) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/study-session`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-user-id': user.userId || ''
            },
            body: JSON.stringify({
                subject_name: 'Task Completion',
                topic: fresh[idx].rawTopic || fresh[idx].text,
                duration: 90
            })
        });
        
        // Live refresh so the metric visibly increments (Bypass Browser GET Cache)
        const pRes = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001/api'}/performance?t=${Date.now()}`, { 
            headers: { 'x-user-id': user.userId || '' },
            cache: 'no-store' 
        });
        const pData = await pRes.json();
        if (pData.success) {
            setPerfData(pData.data);
        }
        
        // Remove from UI after a short delay to allow the animation to play
        setTimeout(() => {
           setTodayPlan(prev => {
               const newPlan = prev.filter((_, i) => i !== idx);
               // Also sync deletion with LocalStorage so it doesn't resurrect on refresh
               const cachedPlan = JSON.parse(localStorage.getItem('syncedPlan'));
               if (cachedPlan) {
                   const updatedCache = cachedPlan.filter(ct => ct.task !== (fresh[idx].rawTopic || fresh[idx].text));
                   localStorage.setItem('syncedPlan', JSON.stringify(updatedCache));
               }
               return newPlan;
           });
        }, 800);
      } catch(e) { console.error("Failed to sync task time", e); }
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    if(customTask.trim()) {
      setTodayPlan([...todayPlan, { text: customTask, completed: false }]);
      setCustomTask('');
      setShowModal(false);
    }
  };

  const totalFocus = perfData ? perfData.focus_hours.reduce((acc, c) => acc + c.hours, 0) : 0;
  const accuracy = perfData ? perfData.metrics.accuracy : 0;
  const timeMgmt = perfData ? perfData.metrics.time_management : 0;

  return (
    <Layout>
      <div className="p-8 w-full max-w-7xl mx-auto relative">
        <section className="mb-10">
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-slate-900 dark:text-slate-50 mb-2">
            Good evening, {user.name || "Student"}
          </h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">Let’s make today productive</p>
        </section>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 rounded-lg p-8 relative overflow-hidden group shadow-sm border border-slate-200 dark:border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3">
                  <Sparkles className="text-cyan-600 dark:text-cyan-400" />
                  <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-slate-50">Today’s Plan</h3>
                </div>
                <span className="text-xs font-bold text-cyan-700 dark:text-cyan-300 uppercase tracking-widest bg-cyan-50 dark:bg-cyan-900/40 px-3 py-1 rounded-full">AI Generated</span>
              </div>
              
              <div className="space-y-4">
                {todayPlan && todayPlan.length > 0 ? todayPlan.map((task, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <button onClick={() => toggleTask(i)} className={`mt-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer ${task.completed ? 'bg-cyan-600 border-cyan-600' : 'border-cyan-200 dark:border-cyan-700'}`}>
                      {task.completed && <CheckCircle className="w-4 h-4 text-white" />}
                    </button>
                    <div>
                      <p className={`font-bold transition-all ${task.completed ? 'text-slate-400 dark:text-slate-600 line-through' : 'text-slate-900 dark:text-slate-200'}`}>{task.text}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Focus Session • Suggested Sequence</p>
                    </div>
                  </div>
                )) : (
                  <p className="text-slate-500">No priority tasks generated yet.</p>
                )}
              </div>
              
              <div className="mt-10 flex flex-wrap gap-4">
                <button onClick={handleStartSession} className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-bold transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-cyan-600/30 cursor-pointer">
                  <Play className="w-4 h-4" fill="currentColor" /> Start First Task
                </button>
                <button onClick={() => setShowModal(true)} className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-full font-bold transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm border border-slate-200 dark:border-slate-700">
                  <Plus className="w-4 h-4" /> Custom Plan
                </button>
                <button onClick={handleRegeneratePlan} disabled={loadingPlan} className="bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-full font-bold transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-sm border border-slate-200 dark:border-slate-700">
                  <RefreshCw className={`w-4 h-4 ${loadingPlan ? 'animate-spin' : ''}`} />
                  {loadingPlan ? 'Generating...' : 'Regenerate Plan'}
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold font-headline mb-4 text-slate-900 dark:text-slate-50">Quick Actions</h3>
              <div className="grid grid-cols-1 gap-3">
                <button onClick={() => navigate('/resources')} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors text-left group">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                    <Brain className="w-5 h-5"/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200">Ask Doubt</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Instant AI Tutoring</p>
                  </div>
                </button>
                <button onClick={() => navigate('/timer')} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors text-left group">
                  <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-500/20 flex items-center justify-center text-orange-600 dark:text-orange-400 group-hover:scale-110 transition-transform">
                    <Timer className="w-5 h-5"/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200">Start Focus Session</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Deep concentration mode</p>
                  </div>
                </button>
                <button onClick={() => navigate('/planner')} className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors text-left group">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                    <CalendarDays className="w-5 h-5"/>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-slate-200">Open Planner</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">View schedule</p>
                  </div>
                </button>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-800">
              <h3 className="font-bold font-headline mb-4 flex items-center gap-2 text-slate-900 dark:text-slate-50">
                <TrendingDown className="text-red-500 w-5 h-5" /> Weak Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {dashboardData && dashboardData.weak_topics.length > 0 ? dashboardData.weak_topics.map((t, idx) => (
                  <span key={idx} className="px-4 py-2 rounded-full bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 text-xs font-bold border border-red-100 dark:border-red-500/20">
                    {t.topic_name} ({t.accuracy}%)
                  </span>
                )) : (
                  <p className="text-slate-500 text-sm">You have no weak learning areas right now!</p>
                )}
              </div>
            </div>
          </div>

          <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 flex items-center justify-between shadow-sm border border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Focus Hours (Wk)</p>
                <p className="text-3xl font-black font-headline text-slate-900 dark:text-slate-50">{totalFocus.toFixed(1)}<span className="text-lg font-medium text-slate-400 ml-1">h</span></p>
              </div>
              <div className="w-12 h-12 bg-cyan-50 dark:bg-cyan-500/20 rounded-full flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                <Clock className="w-6 h-6"/>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg p-6 flex items-center justify-between shadow-sm border border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Total Accuracy</p>
                <p className="text-3xl font-black font-headline text-slate-900 dark:text-slate-50">{accuracy}<span className="text-lg font-medium text-slate-400 ml-1">%</span></p>
              </div>
              <div className="w-12 h-12 bg-amber-50 dark:bg-amber-500/20 rounded-full flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Microscope className="w-6 h-6"/>
              </div>
            </div>
          </div>
        </div>

        {/* Custom Plan Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl shadow-2xl w-[400px] border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-bold font-headline text-slate-900 dark:text-slate-50 mb-4">Add Custom Task</h3>
              <form onSubmit={handleAddCustom}>
                <input 
                  autoFocus
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-sm focus:ring-2 focus:ring-cyan-500/50 outline-none text-slate-900 dark:text-slate-50 mb-6" 
                  placeholder="e.g. Read Physics Chapter 4..." 
                  value={customTask}
                  onChange={e => setCustomTask(e.target.value)}
                />
                <div className="flex gap-4">
                  <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-3 text-slate-600 dark:text-slate-400 font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
                  <button type="submit" className="flex-1 py-3 bg-cyan-600 text-white font-bold rounded-lg hover:bg-cyan-700 transition-colors shadow-md shadow-cyan-600/20">Add Task</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
