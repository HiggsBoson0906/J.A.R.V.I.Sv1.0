import React, { useState, useEffect } from 'react'; 
import Layout from './Layout';
import { Check, ChevronDown, HelpCircle, MoreVertical, Pencil, Plus, Sparkles, X } from 'lucide-react';

const StylishSelect = ({ value, onChange, options, className }) => (
  <div className={`relative ${className}`}>
    <select 
      value={value} 
      onChange={onChange} 
      className="w-full bg-slate-100 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 text-cyan-700 dark:text-cyan-400 rounded-lg py-2 pl-4 pr-9 focus:ring-2 focus:ring-cyan-500/50 outline-none appearance-none cursor-pointer text-sm font-bold transition-all hover:bg-white dark:hover:bg-slate-800"
    >
       {options.map(o => {
         const val = typeof o === 'object' ? o.value : o;
         const lab = typeof o === 'object' ? o.label : o;
         return (
           <option key={val} value={val} className="text-slate-800 dark:text-slate-200 font-medium">
             {lab}
           </option>
         );
       })}
    </select>
    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-cyan-500/70">
       <ChevronDown className="w-4 h-4" />
    </div>
  </div>
);

const TimeBlockEditor = ({ timeStr, onChange }) => (
    <input 
      type="text" 
      value={timeStr} 
      onChange={e => onChange(e.target.value)} 
      className="w-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-sm font-bold text-cyan-600 dark:text-cyan-400 py-1 px-3 rounded text-center outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all mt-2"
    />
);

export default function AiStudyPlanner() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [plannerTasks, setPlannerTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  
  // Custom Subject Selection
  const [availableSubjects, setAvailableSubjects] = useState(['Mathematics', 'Physics', 'Chemistry']);
  const [selectedSubjects, setSelectedSubjects] = useState(['Mathematics']);
  const [addingSub, setAddingSub] = useState(false);
  const [newSubText, setNewSubText] = useState("");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001/api' : 'https://j-a-r-v-i-sv1-0.onrender.com/api')}/planner`, { headers: { 'x-user-id': user.userId || '' } })
      .then(r => r.json())
      .then(d => { 
          if (d.success && d.data.plan) {
             const structuredTasks = d.data.plan.map((t, i) => ({
                 id: Date.now() + i,
                 task: t.title,
                 time: t.time,
                 description: t.description
             }));
             setPlannerTasks(structuredTasks);
          }
      })
      .catch(e => console.error("Error fetching planner", e));
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3001/api' : 'https://j-a-r-v-i-sv1-0.onrender.com/api')}/generate-plan`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'x-user-id': user.userId || '' 
        },
        body: JSON.stringify({ 
           subjects: selectedSubjects
        })
      });
      const data = await res.json();
      if (data.success && data.data.plan) {
         const structuredTasks = data.data.plan.map((t, i) => ({
             id: Date.now() + i,
             task: t.title,
             time: t.time,
             description: t.description
         }));
         setPlannerTasks(structuredTasks);
      }
    } catch(e) {
      alert("Gen Error: " + e.message);
    }
    setLoading(false);
  };

  const toggleSubject = (sub) => {
      if(selectedSubjects.includes(sub)) {
          setSelectedSubjects(selectedSubjects.filter(s => s !== sub));
      } else {
          setSelectedSubjects([...selectedSubjects, sub]);
      }
  };

  const submitNewSubject = (e) => {
      e.preventDefault();
      if(newSubText.trim() && !availableSubjects.includes(newSubText)) {
          setAvailableSubjects([...availableSubjects, newSubText]);
          setSelectedSubjects([...selectedSubjects, newSubText]);
      }
      setNewSubText("");
      setAddingSub(false);
  };

  const updateTask = (id, field, value) => {
      setPlannerTasks(plannerTasks.map(t => t.id === id ? { ...t, [field]: value } : t));
  };
  
  const deleteTask = (id) => {
      setPlannerTasks(plannerTasks.filter(t => t.id !== id));
  };

  const handleSync = async () => {
    try {
      localStorage.setItem('syncedPlan', JSON.stringify(plannerTasks));
      window.location.href = '/dashboard';
    } catch(e) { console.error(e); }
  };

  return (
    <Layout>
      <div className="p-8 w-full max-w-7xl mx-auto">
        <div className="mb-12">
          <h2 className="font-headline text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 mb-2">AI Study Planner</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg">Optimizing your learning trajectory with neural schedule generation.</p>
        </div>

        <div className="grid grid-cols-12 gap-8">
          <section className="col-span-12 lg:col-span-4 space-y-8">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-lg shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 mb-6">
                <HelpCircle className="text-cyan-600 dark:text-cyan-400" />
                <h3 className="font-headline text-xl font-bold text-slate-900 dark:text-slate-50">Parameters</h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block font-label text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Select Subjects</label>
                  <div className="flex flex-wrap gap-2 items-center">
                    {availableSubjects.map((sub, idx) => (
                       <button 
                         key={idx} 
                         onClick={() => toggleSubject(sub)}
                         className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${selectedSubjects.includes(sub) ? 'bg-cyan-600 text-white shadow-md' : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'}`}
                       >
                         {sub}
                       </button>
                    ))}
                    {addingSub ? (
                        <form onSubmit={submitNewSubject} className="inline-flex">
                            <input 
                              autoFocus
                              type="text" 
                              value={newSubText} 
                              onChange={e => setNewSubText(e.target.value)} 
                              onBlur={submitNewSubject}
                              placeholder="Add topic..." 
                              className="px-4 py-2 rounded-full text-sm bg-white dark:bg-slate-950 border border-cyan-500 outline-none w-32" 
                            />
                        </form>
                    ) : (
                       <button onClick={() => setAddingSub(true)} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 flex items-center justify-center transition-colors">
                         <Plus className="w-4 h-4" />
                       </button>
                    )}
                  </div>
                </div>

                <button onClick={handleGenerate} disabled={loading} className="w-full py-4 mt-6 rounded-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-cyan-600/30 hover:shadow-cyan-600/50 active:scale-95 transition-all">
                  <Sparkles className={`text-xl ${loading ? 'animate-spin' : ''}`} />
                  {loading ? 'Processing...' : 'Generate AI Plan'}
                </button>
              </div>
            </div>

            <div className="bg-slate-900 text-cyan-100 p-8 rounded-lg relative overflow-hidden border border-slate-800">
              <div className="relative z-10">
                <h4 className="font-bold text-lg mb-2 text-white">Did you know?</h4>
                <p className="text-sm text-cyan-200/80 leading-relaxed">Spaced repetition plans are 40% more effective. Your AI is currently weighting your plan for maximum retention and minimum burnout.</p>
              </div>
              <HelpCircle className="absolute -right-4 -bottom-4 text-8xl text-cyan-500/10 rotate-12" />
            </div>
          </section>

          <section className="col-span-12 lg:col-span-8">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-8 shadow-sm border border-slate-200 dark:border-slate-800 h-full flex flex-col">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-50 dark:bg-cyan-500/10 px-3 py-1 rounded-full mb-3 inline-block border border-cyan-100 dark:border-cyan-500/20">Draft Schedule v1.2</span>
                  <h3 className="font-headline text-3xl font-bold text-slate-900 dark:text-slate-50">Today's Optimized Flow</h3>
                </div>
              </div>

              <div className="space-y-4 flex-1">
                {plannerTasks && plannerTasks.length > 0 ? (
                  plannerTasks.map((task, idx) => (
                    <div key={task.id} className="grid grid-cols-12 gap-4">
                      
                      {/* Time Block */}
                      <div className="col-span-4 flex flex-col justify-center items-start pl-6 pr-4 py-4 bg-slate-50 dark:bg-slate-800/50 rounded-lg border border-slate-100 dark:border-slate-800 relative shadow-inner">
                         <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Time Block</span>
                         {editingId === task.id ? (
                           <TimeBlockEditor timeStr={task.time} onChange={(v) => updateTask(task.id, 'time', v)} />
                         ) : (
                           <p className="text-sm font-bold text-cyan-600 dark:text-cyan-400">{task.time}</p>
                         )}
                      </div>
                      
                      {/* Task Block */}
                      <div className="col-span-8 p-6 rounded-lg border-l-4 border-cyan-500 bg-cyan-50 dark:bg-cyan-500/5 flex justify-between items-center group relative">
                        <div className="flex-1 mr-4">
                          <span className="text-[10px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest mb-1 block">AI Priority Recommendation</span>
                          {editingId === task.id ? (
                            <StylishSelect 
                              className="w-full max-w-sm mb-2"
                              value={task.task} 
                              onChange={(e) => updateTask(task.id, 'task', e.target.value)}
                              options={[
                                  {value: task.task, label: task.task},
                                  ...availableSubjects.map(sub => ({value: `Focus: ${sub}`, label: `Focus: ${sub}`})),
                                  {value: 'Self-Directed Review', label: 'Self-Directed Review'}, 
                                  {value: 'Mock Exam Session', label: 'Mock Exam Session'}
                              ]}
                            />
                          ) : (
                            <h4 className="text-lg font-bold text-slate-900 dark:text-slate-200 mb-1">{task.task}</h4>
                          )}
                          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{task.description || "Time boxed session configured dynamically."}</p>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          {editingId === task.id ? (
                            <button onClick={() => setEditingId(null)} className="w-8 h-8 rounded-full bg-cyan-600 flex items-center justify-center text-white hover:bg-cyan-700 shadow-sm cursor-pointer" title="Done">
                              <Check className="w-4 h-4" />
                            </button>
                          ) : (
                            <button onClick={() => setEditingId(task.id)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer" title="Edit">
                              <Pencil className="w-4 h-4" />
                            </button>
                          )}
                          <button onClick={() => deleteTask(task.id)} className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 opacity-0 group-hover:opacity-100 transition-all shadow-sm border border-slate-200 dark:border-slate-700 cursor-pointer" title="Delete">
                             <X className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                    <p className="text-slate-500 dark:text-slate-400 font-medium">No active plan detected.</p>
                    <p className="text-sm text-slate-400 mt-2">Adjust your parameters and click Generate to build a customized study flow.</p>
                  </div>
                )}
              </div>

              <div className="mt-12 flex justify-between items-center pt-8 border-t border-slate-100 dark:border-slate-800 auto-mt">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <img alt="Study Buddy 1" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCcTRFXmAXXsuX2mTlJTxh4A2KMeq5xufqlQg4ztxb-zu-nwzdfweEXhr56n4pNetXhrcA8L8gXq3rqNmi2QMd09Je5MtVg_UkZTixSONQVBuOX8_HwU3qXphSAHR8S2F8aCQg4FxzD0CES_wJ7OOZ4p6rXP6ppsp96WkJt8IIM5-McFFQ-3jtTD4RL3ZltPpksXrvGFGmlKRPoHwdeKjWItxbCeYTFKJl7gnLpUEHdkB_Iv57fUyC_pd-DB5QtUCU0qiPDsP6aWEkh"/>
                    <img alt="Study Buddy 2" className="w-8 h-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJVt1YmacxAD0rqe2bxP-gQKUzbcd5pmNvh2AdQ-m7qGR9WU-EYCm3kJ7YguutcP_Zlb8K2b3i4-y_m9w59nnNPnP6CUeUykhku5GnFPu2liD-pFp9nU-PDV5-lqfmfb3oTZmVKDrvH53FDW4uRYSagtieZwgfQGAIgMvDPKXPDv1VPtFmMQmIMt3IG96A0wiZcOCh0UCZ_9tw3zLLlmRE_1bbGIxmHon0d0izaqBnS16TgpyjGsPI14HdJOOT358qk9-vmRQ7Fcum"/>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">3 friends are studying right now.</p>
                </div>
                <div className="flex gap-4">
                  <button className="text-cyan-600 dark:text-cyan-400 font-bold text-sm px-6 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-full transition-colors cursor-pointer">Discard Draft</button>
                  <button onClick={handleSync} className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold text-sm px-8 py-3 rounded-full shadow-lg shadow-cyan-600/30 hover:scale-[1.02] active:scale-95 transition-all cursor-pointer">Accept &amp; Sync to Calendar</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
