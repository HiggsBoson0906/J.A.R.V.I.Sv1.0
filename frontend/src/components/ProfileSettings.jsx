import React, { useState, useEffect } from 'react'; 
import Layout from './Layout';
import { BarChart2, CheckCircle, ChevronRight, Edit2, Mail, Phone, Save, Target, User, X } from 'lucide-react';

const TARGET_EXAMS = ['JEE', 'NEET', 'UPSC', 'CAT', 'GATE', 'Other'];

export default function ProfileSettings() {
  const user = JSON.parse(localStorage.getItem('user')) || {};
  const [editing, setEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name || 'Alex Carter',
    email: user.email || 'alex.c@example.com',
    targetExam: user.course || 'JEE',
    bio: `Passionate about AI ethics and distributed systems. Target: ${user.exam_year || '2026'}.`,
  });
  const [draft, setDraft] = useState(profile);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if(user.userId) {
      fetch(`${import.meta.env.VITE_API_URL || 'https://j-a-r-v-i-sv1-0.onrender.com/api'}/profile-stats`, { headers: { 'x-user-id': user.userId } })
      .then(r => r.json())
      .then(d => { if(d.success) setStats(d.data); })
      .catch(console.error);
    }
  }, [user.userId]);

  const handleSave = () => {
    setProfile(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft(profile);
    setEditing(false);
  };

  const Field = ({ icon, label, fieldKey, type = 'text', isSelect }) => (
    <div className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-700">
      <div className="w-9 h-9 rounded-xl bg-cyan-100 dark:bg-cyan-500/20 flex items-center justify-center text-cyan-600 dark:text-cyan-400 flex-shrink-0 mt-0.5">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">{label}</p>
        {editing ? (
          isSelect ? (
            <select
              value={draft[fieldKey]}
              onChange={e => setDraft({ ...draft, [fieldKey]: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold text-cyan-600 dark:text-cyan-400 outline-none focus:ring-2 focus:ring-cyan-500/30 cursor-pointer"
            >
              {TARGET_EXAMS.map(e => (
                <option key={e} value={e}>{e}</option>
              ))}
            </select>
          ) : (
            <input
              type={type}
              value={draft[fieldKey]}
              onChange={e => setDraft({ ...draft, [fieldKey]: e.target.value })}
              className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 dark:text-slate-100 outline-none focus:ring-2 focus:ring-cyan-500/30"
            />
          )
        ) : (
          <p className={`text-sm font-bold ${fieldKey === 'targetExam' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-900 dark:text-slate-100'}`}>
            {profile[fieldKey]}
          </p>
        )}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="p-8 w-full max-w-7xl mx-auto">
        <div className="max-w-6xl mx-auto space-y-8">

          {/* Header Row */}
          <div className="grid grid-cols-12 gap-8 items-stretch">

            {/* User Info Card */}
            <div className="col-span-12 lg:col-span-8 bg-white dark:bg-slate-900 p-10 rounded-xl flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm border border-slate-200 dark:border-slate-800">
              <div className="relative group flex-shrink-0">
                <div className="w-28 h-28 rounded-2xl ring-4 ring-cyan-500/30 overflow-hidden shadow-lg">
                  <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC1qh2-OrycgKHi2zdWbygbOpwaIE2Q99z_4QvySvXGoAL1_FnwORFC-SKfVjR88FOUN8TNyirhQgRebk41ceBKmpu1Vm88zLZJiFV_qfo17nHQWb1j-pGc1KoY-X0RW-0rLqNf-uCFZVy2t2QGXTMrljtbjXG-f4UFumt7H2i_1Av4lLUR3M5VAh-AdpBEHhtTcxnZIN_0wVdPogoClLFMatOLoxN6E1BGj4s6QTu0u73GevcXiGQv_aq8RK88iwVFXwV_a-p-Td1g" alt="Avatar"/>
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 font-headline">{profile.name}</h2>
                    <p className="text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-widest text-xs mt-1.5">
                      {profile.targetExam} Aspirant
                    </p>
                  </div>
                  {!editing ? (
                    <button onClick={() => setEditing(true)} className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-cyan-700 active:scale-95 transition-all shadow-md shadow-cyan-600/20 cursor-pointer">
                      <Edit2 className="w-4 h-4" /> Edit Profile
                    </button>
                  ) : (
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="inline-flex items-center gap-2 bg-cyan-600 text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-cyan-700 transition-all cursor-pointer shadow-md">
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button onClick={handleCancel} className="inline-flex items-center gap-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-5 py-2.5 rounded-full font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer">
                        <X className="w-4 h-4" /> Cancel
                      </button>
                    </div>
                  )}
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-4 leading-relaxed max-w-lg">{profile.bio}</p>
              </div>
            </div>

            {/* Stats Card */}
            <div className="col-span-12 lg:col-span-4 bg-gradient-to-br from-cyan-600 to-cyan-800 text-white p-8 rounded-xl flex flex-col justify-between shadow-lg shadow-cyan-600/20">
              <div>
                <h3 className="text-sm font-bold opacity-70 uppercase tracking-widest">Academic Rank</h3>
                <p className="text-3xl font-black mt-1 font-headline">Elite Learner</p>
              </div>
              <div className="space-y-5 mt-8">
                <div>
                  <div className="flex justify-between text-sm font-bold mb-2">
                    <span>Current Streak</span><span>14 Days</span>
                  </div>
                  <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full bg-white w-3/4 rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                  <BarChart2 className="w-5 h-5 opacity-80" />
                  <span className="text-xs font-semibold opacity-90">Top 5% of active students this month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-12 gap-8">

            {/* Editable Details Card */}
            <div className="col-span-12 lg:col-span-5">
              <div className="bg-white dark:bg-slate-900 rounded-xl p-7 shadow-sm border border-slate-200 dark:border-slate-800 h-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold font-headline text-slate-900 dark:text-slate-50">Personal Details</h3>
                  {editing && <span className="text-[10px] text-cyan-500 font-bold uppercase tracking-widest bg-cyan-50 dark:bg-cyan-500/10 px-2 py-1 rounded-full">Editing</span>}
                </div>
                <div className="space-y-3">
                  <Field icon={<User className="w-4 h-4"/>} label="Full Name" fieldKey="name" />
                  <Field icon={<Mail className="w-4 h-4"/>} label="Email Address" fieldKey="email" type="email" />
                  <Field icon={<Target className="w-4 h-4"/>} label="Target Exam" fieldKey="targetExam" isSelect />
                </div>
              </div>
            </div>

            {/* Learning Analytics */}
            <div className="col-span-12 lg:col-span-7 space-y-6">
              <h3 className="text-lg font-bold font-headline text-slate-900 dark:text-slate-50">Learning Analytics</h3>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white dark:bg-slate-900 p-7 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <BarChart2 className="text-cyan-600 dark:text-cyan-400 w-7 h-7" />
                    {stats?.strongest && (
                      <span className="text-[10px] font-bold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-500/20 truncate max-w-[120px]">
                        Strongest: {stats.strongest.topic_name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Focus Time</p>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-slate-50 mt-1">{(stats?.focus_time ? (stats.focus_time/60).toFixed(1) : "0.0")} <span className="text-base font-normal text-slate-400">hrs</span></h4>
                </div>
                <div className="bg-white dark:bg-slate-900 p-7 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-3">
                    <CheckCircle className="text-cyan-600 dark:text-cyan-400 w-7 h-7" />
                    {stats?.weakest && (
                      <span className="text-[10px] font-bold bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 px-2.5 py-1 rounded-full border border-red-100 dark:border-red-500/20 truncate max-w-[120px]">
                        Weakest: {stats.weakest.topic_name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Tests Attempted</p>
                  <h4 className="text-3xl font-black text-slate-900 dark:text-slate-50 mt-1">{stats?.tests || 0} <span className="text-base font-normal text-slate-400">Q's</span></h4>
                </div>
              </div>

              {/* Revision Table */}
              <div className="bg-white dark:bg-slate-900 rounded-xl p-7 shadow-sm border border-slate-200 dark:border-slate-800 mt-6">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Urgent Revision Needed</h3>
                <div className="space-y-3 mt-4">
                  {stats?.revisions && stats.revisions.length > 0 ? stats.revisions.map((rev, i) => (
                    <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-red-50 dark:bg-red-500/5 border border-red-100 dark:border-red-500/10">
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-slate-200">{rev.topic_name}</p>
                        <p className="text-[10px] uppercase font-bold text-red-400 tracking-wider font-semibold">{rev.subject_name}</p>
                      </div>
                      <span className="text-xs font-bold text-red-600 dark:text-red-400">{rev.accuracy}% Acc</span>
                    </div>
                  )) : (
                     <p className="text-sm text-slate-500 italic">No critically weak topics detected yet. Keep up the good work!</p>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Layout>
  );
}
