import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { ChevronRight, RotateCcw, ArrowLeft, CheckCircle, XCircle, Target, Beaker, BookOpen, Calculator, Flame, Award, Zap, ChevronLeft } from 'lucide-react';

const API = 'http://localhost:3001/api';

function AccuracyBadge({ accuracy }) {
  if (accuracy === null || accuracy === undefined) {
    return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">UNTESTED</span>;
  }
  if (accuracy < 50) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">WEAK</span>;
  if (accuracy <= 75) return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400">MODERATE</span>;
  return <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">STRONG</span>;
}

// ─── STEP 1: Subject Selection ─────────────────────────────────────────────
function SubjectView({ onSelect }) {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/practice/subjects`)
      .then(r => r.json())
      .then(d => { if (d.success) setSubjects(d.data.subjects); })
      .catch(() => setSubjects(['Physics', 'Chemistry', 'Mathematics']))
      .finally(() => setLoading(false));
  }, []);

  const getSubjectIcon = (name) => {
    if (name.toLowerCase().includes('phys')) return <Zap className="w-6 h-6 text-indigo-500" />;
    if (name.toLowerCase().includes('chem')) return <Beaker className="w-6 h-6 text-emerald-500" />;
    if (name.toLowerCase().includes('math')) return <Calculator className="w-6 h-6 text-purple-500" />;
    return <BookOpen className="w-6 h-6 text-cyan-500" />;
  };
  
  const getSubjectDesc = (name) => {
    if (name.toLowerCase().includes('phys')) return "Master mechanics, optics, and quantum theory through adaptive problem sets.";
    if (name.toLowerCase().includes('chem')) return "Explore organic synthesis, thermodynamics, and periodic trends.";
    if (name.toLowerCase().includes('math')) return "From calculus to statistics, sharpen your analytical precision.";
    return "Explore this subject to master its core concepts.";
  }

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h2 className="text-4xl font-extrabold font-headline tracking-tight text-slate-900 dark:text-slate-50">Practice Zone</h2>
        <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">Sharpen your concepts with targeted practice.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">{[1,2,3].map(i => <div key={i} className="h-56 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />)}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {subjects.map(s => (
            <div
              key={s}
              onClick={() => onSelect(s)}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-8 hover:shadow-xl transition-all cursor-pointer group hover:-translate-y-1 relative overflow-hidden"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center mb-6">
                {getSubjectIcon(s)}
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">{s}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-8 h-12">{getSubjectDesc(s)}</p>
              
              <div className="flex items-center text-indigo-600 dark:text-indigo-400 text-sm font-semibold group-hover:gap-2 transition-all gap-1">
                Start practicing {s} <ArrowLeft className="w-4 h-4 rotate-180" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Weak Topics Reminder */}
      <div className="pt-6 mb-12">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">Focus Areas</h3>
          <span className="text-xs text-slate-400">Based on recent performance</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">WEAK</span>
                 <RotateCcw className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Rotational Dynamics</h4>
              <p className="text-xs text-slate-500">Physics • Suggest review</p>
           </div>
           
           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">MODERATE</span>
                 <Zap className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Organic Synthesis</h4>
              <p className="text-xs text-slate-500">Chemistry • Needs more practice</p>
           </div>

           <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6">
              <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-600">WEAK</span>
                 <Award className="w-4 h-4 text-slate-400" />
              </div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1">Integration</h4>
              <p className="text-xs text-slate-500">Mathematics • High priority</p>
           </div>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 2: Topic Selection ───────────────────────────────────────────────
function TopicView({ subject, onStart, onBack }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/practice/topics?subject=${encodeURIComponent(subject)}`)
      .then(r => r.json())
      .then(d => { if (d.success) setTopics(d.data.topics); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [subject]);

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10">
      <div className="flex-1 space-y-8">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 mb-4">
             <button onClick={onBack} className="hover:text-indigo-600 transition-colors">Practice</button>
             <ChevronRight className="w-3 h-3" />
             <span className="text-slate-600 dark:text-slate-200">{subject}</span>
          </div>
          <h2 className="text-4xl font-extrabold font-headline tracking-tight text-slate-900 dark:text-slate-50">{subject} Practice</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-base">Select a topic to start your session.</p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{[1,2,3,4].map(i => <div key={i} className="h-48 rounded-3xl bg-slate-100 dark:bg-slate-800 animate-pulse" />)}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topics.map(t => (
              <div
                key={t.topic_name}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 flex flex-col justify-between hover:shadow-xl hover:border-indigo-100 transition-all group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-indigo-500">
                       <Zap className="w-5 h-5" />
                    </div>
                    <AccuracyBadge accuracy={t.accuracy} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">{t.topic_name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[40px]">
                    Practice questions covering essential concepts on {t.topic_name}.
                  </p>
                  
                  <div className="mt-4 mb-6">
                    <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                       <span>ACCURACY</span>
                       <span className={t.accuracy >= 75 ? 'text-emerald-500' : t.accuracy < 50 ? 'text-red-500' : 'text-yellow-600'}>{t.accuracy || 0}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className={`h-full rounded-full ${t.accuracy >= 75 ? 'bg-emerald-500' : t.accuracy < 50 ? 'bg-red-500' : 'bg-yellow-500'}`} style={{ width: `${t.accuracy || 0}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={() => onStart(t.topic_name)}
                  className="w-full py-3 rounded-2xl bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 font-bold text-sm hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  Start Practice
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Sidebar */}
      <div className="w-full lg:w-80 space-y-6 pt-12 lg:pt-0">
        <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6">
           <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Subject Stats</h3>
           <div className="space-y-4 text-sm font-semibold text-slate-600 dark:text-slate-300">
               <div className="flex justify-between"><span className="text-slate-400">Total Problems</span><span className="text-slate-900 dark:text-white font-bold">1,248</span></div>
               <div className="flex justify-between"><span className="text-slate-400">Avg. Accuracy</span><span className="text-slate-900 dark:text-white font-bold">62%</span></div>
               <div className="flex justify-between"><span className="text-slate-400">Time Spent</span><span className="text-slate-900 dark:text-white font-bold">18.2 hrs</span></div>
           </div>
        </div>

        <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-3xl p-6 border border-indigo-100 dark:border-indigo-900/30 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
           <p className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-widest uppercase mb-2">Recommended for you</p>
           <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-3 leading-tight">Focused Newton's Laws Session</h3>
           <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 relative z-10">
              J.A.R.V.I.S. noticed your accuracy dropped mechanics. A quick 15-minute review could improve your standing.
           </p>
           <button disabled className="w-full py-3 rounded-2xl bg-indigo-600 text-white font-bold text-sm shadow-lg shadow-indigo-500/25">
              Boost My Weakness
           </button>
        </div>
      </div>
    </div>
  );
}

// ─── STEP 3: MCQ Test ─────────────────────────────────────────────────────
function TestView({ subject, topic, onComplete, onBack }) {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch(`${API}/practice/questions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic })
    })
      .then(r => r.json())
      .then(d => {
        if (d.success && d.data.questions?.length) setQuestions(d.data.questions);
        else setError('Could not load questions. Try again.');
      })
      .catch(() => setError('Failed to connect to server.'))
      .finally(() => setLoading(false));
  }, [topic]);

  const q = questions[current];
  const progress = questions.length ? ((current) / questions.length) * 100 : 0;

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(c => c + 1);
    } else {
      const answersArray = questions.map((q, i) => ({
        question: q.question,
        selected: answers[i] || '',
        correct: q.correct_answer
      }));
      onComplete(answersArray);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(c => c - 1);
  };

  if (loading) return (
    <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-32 gap-6">
      <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      <p className="text-slate-500 dark:text-slate-400 text-base font-medium">Generating intelligent questions for <span className="text-indigo-600 dark:text-indigo-400 font-bold">{topic}</span>…</p>
    </div>
  );

  if (error) return (
    <div className="max-w-2xl mx-auto text-center py-24 space-y-4">
      <p className="text-red-500 font-medium">{error}</p>
      <button onClick={onBack} className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 mx-auto">
        <ArrowLeft className="w-4 h-4" /> Back to Topics
      </button>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto flex flex-col min-h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white dark:bg-slate-800 border border-slate-200 flex items-center justify-center shadow-sm">
             <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{subject}</p>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white leading-none">{topic}</h2>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
           <div className="w-48">
              <div className="flex justify-between text-xs font-bold text-slate-500 mb-1.5">
                <span>Question {current + 1} of {questions.length}</span>
                <span className="text-indigo-600">{Math.round(progress)}% Complete</span>
              </div>
              <div className="h-2 w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600 rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
           </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
          <div className="flex gap-8 items-start mb-12 max-w-3xl">
             <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center flex-shrink-0 text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                Q{current + 1}
             </div>
             <p className="text-2xl font-semibold text-slate-800 dark:text-slate-100 leading-relaxed pt-2">
                {q.question}
             </p>
          </div>

          <div className="space-y-4 max-w-2xl ml-0 md:ml-22 px-4 md:px-0">
            {q.options.map((opt, i) => {
              const isSelected = answers[current] === opt;
              return (
                <button
                  key={i}
                  onClick={() => setAnswers(prev => ({ ...prev, [current]: opt }))}
                  className={`w-full text-left px-8 py-5 rounded-full border-2 text-base font-medium transition-all
                    ${isSelected
                      ? 'bg-indigo-50/60 dark:bg-indigo-900/20 border-indigo-500 text-indigo-800 dark:text-indigo-200 shadow-sm'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700'
                    }`}
                >
                  <div className="flex items-center gap-4">
                     <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors
                        ${isSelected ? 'border-indigo-500' : 'border-slate-300 dark:border-slate-600'}`}>
                        {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />}
                     </div>
                     <span>{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
      </div>

      {/* Footer controls */}
      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 flex justify-between items-center pb-8 border-dashed">
         <button 
           onClick={handlePrev}
           disabled={current === 0}
           className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-semibold hover:text-slate-700 dark:hover:text-slate-200 disabled:opacity-30 transition-colors"
         >
            <ChevronLeft className="w-5 h-5" /> Previous
         </button>
         
         <div className="flex gap-4">
            <button className="px-6 py-3 rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
               Mark for Review
            </button>
            <button
              onClick={handleNext}
              disabled={!answers[current]}
              className="px-8 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm disabled:opacity-50 transition-colors shadow-md shadow-indigo-500/20 flex items-center gap-2"
            >
              {current < questions.length - 1 ? 'Next Question' : 'Finish Session'}
              {current < questions.length - 1 && <ChevronRight className="w-4 h-4" />}
            </button>
         </div>
      </div>
    </div>
  );
}

// ─── STEP 4: Result View ───────────────────────────────────────────────────
function ResultView({ subject, topic, answersArray, onRetry, onBack }) {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API}/practice/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, subject, answers: answersArray })
    })
      .then(r => r.json())
      .then(d => { if (d.success) setResult(d.data); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
       <div className="flex justify-center items-center h-96">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
       </div>
    );
  }

  if (!result) return null;

  const isStrong = result.label === 'Strong';
  const isModerate = result.label === 'Moderate';
  const strokeColor = isStrong ? '#10b981' : isModerate ? '#eab308' : '#ef4444';

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (result.accuracy / 100) * circumference;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Side: Score Card */}
        <div className="w-full lg:w-[400px] flex-shrink-0 space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-10 flex flex-col items-center justify-center shadow-xl shadow-slate-200/20 text-center relative overflow-hidden">
             
             <div className="relative w-40 h-40 mb-8">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 140 140">
                   <circle cx="70" cy="70" r={radius} className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="12" fill="none" />
                   <circle cx="70" cy="70" r={radius} stroke={strokeColor} strokeWidth="12" fill="none" strokeLinecap="round" 
                     style={{ strokeDasharray: circumference, strokeDashoffset, transition: 'stroke-dashoffset 1.5s ease-out' }} />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                   <span className="text-4xl font-black text-slate-800 dark:text-slate-100">{result.score}<span className="text-xl text-slate-400">/{result.total}</span></span>
                </div>
             </div>
             
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Session Complete</h2>
             <p className="text-slate-500 dark:text-slate-400 text-sm mb-8">Great progress on {topic}!</p>
             
             <div className="w-full flex justify-between gap-6 relative before:absolute before:inset-0 before:top-1/2 before:-translate-y-1/2 before:h-8 before:w-px before:bg-slate-200 before:left-1/2">
                <div className="flex-1 text-right pr-6">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
                   <p className="text-xl font-bold text-slate-800 dark:text-slate-200">{result.accuracy}%</p>
                </div>
                <div className="flex-1 text-left pl-6">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                   <p className={`text-xl font-bold ${isStrong ? 'text-emerald-500' : isModerate ? 'text-yellow-500' : 'text-red-500'}`}>{result.label}</p>
                </div>
             </div>
          </div>
          
          <div className="flex gap-4">
            <button onClick={onRetry} className="flex-1 py-4 rounded-full bg-indigo-50 text-indigo-700 font-bold hover:bg-indigo-100 transition-colors">
               Retry Topic
            </button>
            <button onClick={onBack} className="flex-1 py-4 rounded-full bg-slate-900 dark:bg-slate-800 text-white font-bold hover:bg-slate-800 dark:hover:bg-slate-700 transition-colors">
               Back to Topics
            </button>
          </div>
        </div>

        {/* Right Side: Questions Review */}
        <div className="flex-1 space-y-6">
          <div className="flex items-center gap-3 bg-indigo-50 dark:bg-indigo-900/20 px-6 py-4 rounded-2xl w-max">
             <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">End of Session Review</span>
          </div>

          <div className="space-y-6">
            {answersArray.map((a, i) => {
              const isCorrect = a.selected === a.correct;
              return (
                <div key={i} className="flex gap-4">
                   <div className="pt-4">
                      {isCorrect ? 
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0"><CheckCircle className="w-4 h-4" /></div> : 
                        <div className="w-6 h-6 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white flex items-center justify-center shrink-0"><RotateCcw className="w-4 h-4" /></div>
                      }
                   </div>
                   <div className={`flex-1 rounded-3xl border-2 ${isCorrect ? 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900' : 'border-indigo-100 dark:border-indigo-900/50 bg-white dark:bg-slate-900 shadow-xl shadow-indigo-100/50 dark:shadow-none'} p-6 relative overflow-hidden`}>
                      {isCorrect ? null : <div className="absolute top-0 left-0 w-2 h-full bg-red-400 dark:bg-red-500"></div>}
                      <div className="flex items-center gap-2 mb-3">
                         <span className={`text-[10px] font-bold uppercase tracking-widest ${isCorrect ? 'text-slate-400 dark:text-slate-500' : 'text-red-500 dark:text-red-400'}`}>
                            QUESTION {i + 1} • {isCorrect ? 'CORRECT' : 'INCORRECT'}
                         </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-6">{a.question}</p>
                      
                      {!isCorrect && (
                         <div className="space-y-3">
                            <div className="flex items-start gap-3">
                               <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-0.5">Your answer:</p>
                               <span className="text-sm font-medium text-slate-600 dark:text-slate-400 line-through decoration-slate-400 dark:decoration-slate-500">{a.selected || 'Unanswered'}</span>
                            </div>
                            <div className="flex items-start gap-3">
                               <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Correct:</p>
                               <div className="flex gap-2">
                                  <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center mt-0.5"><CheckCircle className="w-3 h-3 text-white" /></div>
                                  <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{a.correct}</span>
                               </div>
                            </div>
                         </div>
                      )}
                      
                      {isCorrect && (
                         <div className="flex gap-2">
                            <div className="w-4 h-4 rounded-full border-2 border-emerald-500 flex items-center justify-center mt-0.5">
                               <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            </div>
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{a.selected}</span>
                         </div>
                      )}
                   </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
export default function AdaptivePracticeDashboard() {
  const [step, setStep] = useState('subject'); // subject | topic | test | result
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [answersArray, setAnswersArray] = useState([]);

  return (
    <Layout>
      <div className="p-4 md:p-8 w-full min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-[1400px] mx-auto">
          <div className="transition-all duration-300 w-full animate-in fade-in slide-in-from-bottom-4 pt-4">
            {step === 'subject' && (
              <SubjectView onSelect={s => { setSelectedSubject(s); setStep('topic'); }} />
            )}
            {step === 'topic' && (
              <TopicView
                subject={selectedSubject}
                onStart={t => { setSelectedTopic(t); setStep('test'); }}
                onBack={() => setStep('subject')}
              />
            )}
            {step === 'test' && (
              <TestView
                subject={selectedSubject}
                topic={selectedTopic}
                onComplete={arr => { setAnswersArray(arr); setStep('result'); }}
                onBack={() => setStep('topic')}
              />
            )}
            {step === 'result' && (
              <ResultView
                subject={selectedSubject}
                topic={selectedTopic}
                answersArray={answersArray}
                onRetry={() => setStep('test')}
                onBack={() => setStep('topic')}
              />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
