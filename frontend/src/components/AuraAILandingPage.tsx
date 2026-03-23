import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SplashCursor from "./SplashCursor";

/* ─── Global CSS injected once ─────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800;900&family=IBM+Plex+Mono:wght@300;400;500;600&family=Outfit:wght@300;400;500;600;700;800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

.jarvis * { box-sizing: border-box; margin: 0; padding: 0; }
.jarvis { font-family: 'Outfit', sans-serif; background: #080b12; color: #e8eaf6; overflow-x: hidden; scroll-behavior: smooth; }

.msym {
  font-family: 'Material Symbols Outlined';
  font-variation-settings: "FILL" 0, "wght" 400, "GRAD" 0, "opsz" 24;
  display: inline-block; line-height: 1; user-select: none;
}

/* ── Aurora ── */
.aurora-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
.aurora-blob { position: absolute; border-radius: 50%; filter: blur(100px); animation: j-float 20s ease-in-out infinite; }
.ab1 { width:600px;height:600px;top:-200px;left:-100px;background:radial-gradient(circle,rgba(126,232,250,.06),transparent 70%); }
.ab2 { width:500px;height:500px;top:30%;right:-150px;background:radial-gradient(circle,rgba(167,139,250,.08),transparent 70%);animation-delay:-7s; }
.ab3 { width:400px;height:400px;bottom:-100px;left:30%;background:radial-gradient(circle,rgba(244,114,182,.06),transparent 70%);animation-delay:-14s; }
@keyframes j-float { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-50px) scale(1.05)} 66%{transform:translate(-20px,30px) scale(.95)} }

.grid-overlay { position:fixed;inset:0;z-index:0;pointer-events:none;opacity:.03;
  background-image:linear-gradient(rgba(126,232,250,1) 1px,transparent 1px),linear-gradient(90deg,rgba(126,232,250,1) 1px,transparent 1px);
  background-size:60px 60px; }

/* ── Shimmer ── */
.shimmer { background:linear-gradient(90deg,#7ee8fa 0%,#a78bfa 30%,#f472b6 60%,#7ee8fa 100%);background-size:300% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:j-shimmer 6s linear infinite; }
.shimmer-slow { background:linear-gradient(90deg,#e8eaf6 0%,#7ee8fa 40%,#e8eaf6 80%,#a78bfa 100%);background-size:300% auto;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;animation:j-shimmer 10s linear infinite; }
@keyframes j-shimmer { to { background-position:300% center; } }

/* ── Glitch ── */
.glitch { position:relative; }
.glitch::before,.glitch::after { content:attr(data-text);position:absolute;top:0;left:0;width:100%;height:100%;
  -webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent; }
.glitch::before { background:linear-gradient(90deg,#7ee8fa,transparent);-webkit-background-clip:text;background-clip:text;
  animation:j-g1 4s infinite;clip-path:polygon(0 0,100% 0,100% 45%,0 45%); }
.glitch::after  { background:linear-gradient(90deg,#a78bfa,transparent);-webkit-background-clip:text;background-clip:text;
  animation:j-g2 4s infinite;clip-path:polygon(0 60%,100% 60%,100% 100%,0 100%); }
@keyframes j-g1 { 0%,94%,100%{transform:translate(-2px,0);opacity:0} 95%,99%{transform:translate(-4px,2px);opacity:.4} }
@keyframes j-g2 { 0%,96%,100%{transform:translate(2px,0);opacity:0}  97%,99%{transform:translate(4px,-2px);opacity:.3} }

/* ── Cards ── */
.card { background:rgba(13,17,25,.8);border:1px solid rgba(126,232,250,.1);backdrop-filter:blur(20px);
  transition:all .4s ease;position:relative;overflow:hidden; }
.card::before { content:'';position:absolute;inset:0;
  background:linear-gradient(135deg,rgba(126,232,250,.03) 0%,transparent 50%,rgba(167,139,250,.03) 100%);
  opacity:0;transition:opacity .4s; }
.card:hover::before { opacity:1; }
.card:hover { border-color:rgba(126,232,250,.3);
  box-shadow:0 0 40px rgba(126,232,250,.08),inset 0 0 40px rgba(126,232,250,.02);transform:translateY(-2px); }
.card-v:hover { border-color:rgba(167,139,250,.3);box-shadow:0 0 40px rgba(167,139,250,.08); }
.card-p:hover { border-color:rgba(244,114,182,.3);box-shadow:0 0 40px rgba(244,114,182,.08); }

/* ── Scan ── */
.scan-wrap { position:relative;overflow:hidden; }
.scan-line { position:absolute;left:0;width:100%;height:1px;
  background:linear-gradient(90deg,transparent,rgba(126,232,250,.6),transparent);
  animation:j-scan 4s linear infinite;top:0;pointer-events:none;z-index:2; }
@keyframes j-scan { 0%{top:0;opacity:1} 100%{top:100%;opacity:0} }

/* ── Badges ── */
.badge { display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;
  font-family:'IBM Plex Mono';font-size:10px;letter-spacing:.1em;border:1px solid;text-transform:uppercase; }
.badge-c { border-color:rgba(126,232,250,.3);color:#7ee8fa;background:rgba(126,232,250,.06); }
.badge-v { border-color:rgba(167,139,250,.3);color:#a78bfa;background:rgba(167,139,250,.06); }
.badge-p { border-color:rgba(244,114,182,.3);color:#f472b6;background:rgba(244,114,182,.06); }

/* ── Pulse dot ── */
.dot { width:6px;height:6px;border-radius:50%;background:#7ee8fa;animation:j-dot 2s ease-in-out infinite;display:inline-block;flex-shrink:0; }
@keyframes j-dot { 0%,100%{box-shadow:0 0 0 0 rgba(126,232,250,.7)} 50%{box-shadow:0 0 0 6px rgba(126,232,250,0)} }

/* ── Buttons ── */
.btn { font-family:'IBM Plex Mono';font-size:11px;letter-spacing:.15em;text-transform:uppercase;cursor:pointer;
  padding:12px 26px;transition:all .3s;position:relative;overflow:hidden;display:inline-flex;align-items:center;gap:8px;border:none; }
.btn-main { background:linear-gradient(135deg,rgba(126,232,250,.15),rgba(167,139,250,.15));
  border:1px solid rgba(126,232,250,.4);color:#7ee8fa; }
.btn-main:hover { border-color:#7ee8fa;box-shadow:0 0 28px rgba(126,232,250,.2); }
.btn-main:active { transform:scale(.98); }
.btn-out { border:1px solid rgba(255,255,255,.12);color:rgba(232,234,246,.7);background:transparent; }
.btn-out:hover { border-color:rgba(255,255,255,.25);color:#e8eaf6;background:rgba(255,255,255,.03); }

/* ── Chat bubbles ── */
.bubble   { border-radius:2px 14px 14px 14px;animation:j-up .5s ease forwards; }
.bubble-u { border-radius:14px 2px 14px 14px; }
@keyframes j-up { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }

/* ── HR glow ── */
.hr-glow { border:none;height:1px;background:linear-gradient(90deg,transparent,rgba(126,232,250,.4),transparent); }

/* ── Concept tag ── */
.ctag { padding:3px 9px;border:1px solid rgba(126,232,250,.2);font-family:'IBM Plex Mono';font-size:9px;
  letter-spacing:.07em;color:rgba(126,232,250,.7);background:rgba(126,232,250,.04);border-radius:2px;display:inline-block; }

/* ── Timeline node ── */
.t-node { width:10px;height:10px;border-radius:50%;border:2px solid #7ee8fa;background:#080b12;
  flex-shrink:0;box-shadow:0 0 10px rgba(126,232,250,.5); }

/* ── Progress bar ── */
.prog-track { height:4px;border-radius:2px;background:rgba(255,255,255,.05);overflow:hidden; }
.prog-fill  { height:100%;border-radius:2px;animation:j-fill 1.5s ease forwards; }
@keyframes j-fill { from{width:0%} }

/* ── Stat pill ── */
.stat-pill { position:relative;transition:transform .3s; }
.stat-pill:hover { transform:translateY(-3px); }
.stat-pill::after { content:'';position:absolute;bottom:0;left:20%;right:20%;height:1px;
  background:linear-gradient(90deg,transparent,rgba(126,232,250,.25),transparent); }

/* ── Equalizer bars ── */
@keyframes eq { from{transform:scaleY(.3)} to{transform:scaleY(1)} }

/* ── Scroll reveal ── */
.reveal   { opacity:0;transform:translateY(22px);transition:opacity .7s ease,transform .7s ease; }
.revealed { opacity:1;transform:translateY(0); }

/* ── Navbar blur ── */
.nav-blur { background:rgba(8,11,18,.75);backdrop-filter:blur(24px);border-bottom:1px solid rgba(126,232,250,.06); }

/* ── AI input ── */
.ai-in { background:rgba(10,13,21,.9);border:1px solid rgba(126,232,250,.15);color:#e8eaf6;
  font-family:'IBM Plex Mono';font-size:12px;padding:11px 14px;outline:none;
  transition:border-color .3s,box-shadow .3s;width:100%; }
.ai-in:focus { border-color:rgba(126,232,250,.4);box-shadow:0 0 18px rgba(126,232,250,.06); }
.ai-in::placeholder { color:rgba(136,146,176,.5); }

/* ── Hex bg ── */
.hex-bg { background-image:url("data:image/svg+xml,%3Csvg width='60' height='52' viewBox='0 0 60 52' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 17.3v17.4L30 52 0 34.7V17.3z' fill='none' stroke='rgba(126,232,250,0.04)' stroke-width='1'/%3E%3C/svg%3E");background-size:60px 52px; }

/* ── Feature icon ── */
.f-icon { width:48px;height:48px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0; }

/* ── Responsive ── */
@media(max-width:768px){
  .hide-mob  { display:none !important; }
  .show-mob  { display:flex !important; }
  .g2col,.g3col,.g4col { grid-template-columns:1fr !important; }
  .span2 { grid-column:span 1 !important; }
  .stat-row { flex-direction:column !important; }
  .sdiv-v   { display:none !important; }
  .sdiv-h   { display:block !important; }
}
@media(min-width:769px){
  .show-mob { display:none !important; }
  .sdiv-h   { display:none !important; }
}
`;

/* ─── Tiny helpers ─────────────────────────────────────────────────────────── */
const Icon = ({ n, style = {}, className = "" }) => (
  <span className={`msym ${className}`} style={style}>{n}</span>
);

const S = {
  cyan:   "#7ee8fa",
  violet: "#a78bfa",
  pink:   "#f472b6",
  dim:    "#8892b0",
  text:   "#e8eaf6",
  bg:     "#080b12",
  card:   "rgba(13,17,25,.8)",
  ch:     "#141b28",
  cl:     "#0a0d15",
  cm:     "#0d1119",
};

/* ─── Hooks ────────────────────────────────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add("revealed")),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function useCounters() {
  useEffect(() => {
    const run = (el) => {
      const target = +el.dataset.target;
      const suffix = el.dataset.suffix || "";
      const t0 = performance.now();
      const from = Math.floor(target * 0.4);
      const tick = (now) => {
        const p = Math.min((now - t0) / 1800, 1);
        const e2 = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(from + (target - from) * e2).toLocaleString() + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { run(e.target); io.unobserve(e.target); } }),
      { threshold: 0.5 }
    );
    document.querySelectorAll("[data-target]").forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ══════════════════════════════════════════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════════════════════════════════════════ */
function Navbar() {
  const navigate = useNavigate();
  return (
    <header className="nav-blur" style={{ position:"fixed", top:0, left:0, right:0, zIndex:100 }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"13px 24px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-400/5 rounded-xl"></div>
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 animate-spin" style={{animationDuration:'10s'}}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.45"/>
                </svg>
              </div>
              <div className="absolute inset-0 animate-spin" style={{animationDuration:'7s', animationDirection:'reverse'}}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="9" stroke="#22d3ee" strokeWidth="1" strokeDasharray="5 2" opacity="0.65"/>
                </svg>
              </div>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="absolute inset-0">
                <circle cx="14" cy="14" r="5.5" stroke="#22d3ee" strokeWidth="1.5"/>
                <circle cx="14" cy="14" r="2.5" fill="#22d3ee"/>
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter font-headline text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)] m-0 leading-none">J.A.R.V.I.S.</h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 m-0">AI Study Platform</p>
          </div>
        </div>

        <nav className="hide-mob" style={{ display:"flex", gap:28 }}>
        </nav>

        <div style={{ display:"flex", gap:10 }}>
          <button className="btn btn-main" style={{ padding:"7px 16px", fontSize:10 }} onClick={() => navigate('/auth')}>Sign In</button>
        </div>
      </div>
    </header>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   HERO
══════════════════════════════════════════════════════════════════════════════ */
function Hero() {
  const navigate = useNavigate();
  return (
    <section style={{ minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"100px 24px 64px", position:"relative" }}>
      <div style={{ textAlign:"center", maxWidth:960, margin:"0 auto", position:"relative", zIndex:1 }}>

        <div className="badge badge-c" style={{ marginBottom:28, gap:8 }}>
          <span className="dot" />
          AI COMPANION ONLINE — JEE · NEET · UPSC · CAT
        </div>

        <h1 style={{ fontFamily:"Syne", fontWeight:900, fontSize:"clamp(2.6rem,8vw,6.5rem)", lineHeight:1, letterSpacing:-2, marginBottom:22 }}>
          <span className="glitch" data-text="Your Personal" style={{ display:"block", color:S.text }}>Your Personal</span>
          <span className="shimmer" style={{ display:"block" }}>Learning Intelligence</span>
        </h1>

        <p style={{ color:S.dim, fontSize:"clamp(15px,2vw,19px)", maxWidth:580, margin:"0 auto 32px", lineHeight:1.75 }}>
          JARVIS AI adapts to <span style={{ color:S.cyan, fontWeight:600 }}>your brain's rhythm</span> — generating personalized study plans, predicting exam performance, and resolving doubts in real-time.
        </p>

        <div style={{ display:"flex", gap:14, justifyContent:"center", flexWrap:"wrap", marginBottom:36 }}>
          <button className="btn btn-main" onClick={() => navigate('/auth')}><Icon n="rocket_launch" style={{ fontSize:16 }} /> Begin Your Journey</button>
          <button className="btn btn-out"><Icon n="play_circle" style={{ fontSize:16 }} /> Watch Demo</button>
        </div>

        <div style={{ display:"flex", flexWrap:"wrap", gap:8, justifyContent:"center", marginBottom:44 }}>
          {["Adaptive Practice","AIR Predictor","Doubt Resolution","Spaced Repetition","Neural Mapping","Exam Simulation"].map(t => (
            <span key={t} className="ctag">{t}</span>
          ))}
        </div>

        {/* ── Stats ── */}
        <div className="stat-row" style={{ display:"flex", alignItems:"center", justifyContent:"center", maxWidth:600, margin:"0 auto" }}>
          {[
            { type:"counter", val:"15000", suffix:"+", label:"Students Taught",      color:S.cyan },
            { type:"div" },
            { type:"special",                           label:"Teaching Experience",  color:S.violet },
            { type:"div" },
            { type:"counter", val:"74000", suffix:"+", label:"Doubts Cleared",       color:S.pink },
          ].map((s, i) => {
            if (s.type === "div") return (
              <div key={i}>
                <div className="sdiv-v" style={{ width:1, height:42, background:"linear-gradient(to bottom,transparent,rgba(126,232,250,.2),transparent)", margin:"0 6px" }} />
                <div className="sdiv-h" style={{ height:1, width:36, background:"linear-gradient(90deg,transparent,rgba(126,232,250,.2),transparent)", margin:"4px auto" }} />
              </div>
            );
            return (
              <div key={i} className="stat-pill" style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", padding:"18px 16px" }}>
                {s.type === "special"
                  ? <div style={{ fontFamily:"Syne", fontWeight:900, fontSize:"clamp(1.4rem,4vw,2rem)", color:s.color, lineHeight:1 }}>
                      4+ <span style={{ fontSize:"clamp(1rem,3vw,1.5rem)", fontWeight:700 }}>yrs</span>
                    </div>
                  : <div style={{ fontFamily:"Syne", fontWeight:900, fontSize:"clamp(1.4rem,4vw,2rem)", color:s.color, lineHeight:1 }}
                      data-target={s.val} data-suffix={s.suffix}>
                      {Number(s.val).toLocaleString()}{s.suffix}
                    </div>
                }
                <div style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:S.dim, textTransform:"uppercase", letterSpacing:"0.15em", marginTop:6 }}>{s.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   COMPANION / CHAT
══════════════════════════════════════════════════════════════════════════════ */
function CompanionSection() {
  return (
    <section id="companion" style={{ padding:"96px 24px" }}>
      <div style={{ maxWidth:1152, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:56, alignItems:"center" }} className="g2col">

        {/* Left */}
        <div>
          <div className="badge badge-v" style={{ marginBottom:22 }}>
            <Icon n="smart_toy" style={{ fontSize:12 }} /> AI LEARNING COMPANION
          </div>
          <h2 style={{ fontFamily:"Syne", fontWeight:900, fontSize:"clamp(1.9rem,4vw,2.8rem)", lineHeight:1.1, letterSpacing:-1, marginBottom:18 }}>
            <span style={{ color:S.text }}>Ask anything.</span><br />
            <span className="shimmer">Get mastery.</span>
          </h2>
          <p style={{ color:S.dim, lineHeight:1.75, marginBottom:26 }}>
            JARVIS's neural companion understands context, tracks your weak areas, and explains concepts at exactly the level you need — from first principles to advanced problem-solving.
          </p>
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            {[
              { n:"memory",     c:S.cyan,   bg:"rgba(126,232,250,.1)", bc:"rgba(126,232,250,.2)", cls:"",       title:"Remembers Your Journey",  desc:"Tracks every concept studied, struggle faced, and milestone achieved — across all sessions." },
              { n:"psychology", c:S.violet, bg:"rgba(167,139,250,.1)", bc:"rgba(167,139,250,.2)", cls:"card-v", title:"Socratic Method Engine",   desc:"Doesn't just give answers — guides you through reasoning so you build genuine conceptual depth." },
              { n:"translate",  c:S.pink,   bg:"rgba(244,114,182,.1)", bc:"rgba(244,114,182,.2)", cls:"card-p", title:"Multilingual Support",     desc:"Explains in Hindi, English, or regional languages. Your language. Your comfort." },
            ].map(({ n, c, bg, bc, cls, title, desc }) => (
              <div key={title} className={`card ${cls} reveal`} style={{ display:"flex", gap:14, padding:16, borderRadius:12 }}>
                <div className="f-icon" style={{ background:bg, border:`1px solid ${bc}` }}>
                  <Icon n={n} style={{ color:c, fontSize:20 }} />
                </div>
                <div>
                  <div style={{ fontWeight:600, color:S.text, marginBottom:4 }}>{title}</div>
                  <div style={{ fontSize:13, color:S.dim, lineHeight:1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Chat mockup */}
        <div className="card scan-wrap reveal" style={{ borderRadius:18, padding:0 }}>
          <div className="scan-line" />
          {/* Header */}
          <div style={{ background:S.ch, padding:"13px 18px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(26,36,56,.7)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <div style={{ width:32, height:32, borderRadius:"50%", background:"linear-gradient(135deg,rgba(126,232,250,.3),rgba(167,139,250,.3))", border:"1px solid rgba(126,232,250,.3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon n="smart_toy" style={{ color:S.cyan, fontSize:15 }} />
              </div>
              <div>
                <div style={{ fontFamily:"IBM Plex Mono", fontSize:12, color:S.text, fontWeight:600 }}>JARVIS Companion</div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ width:5, height:5, borderRadius:"50%", background:"#4ade80" }} />
                  <span style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:"#4ade80", textTransform:"uppercase", letterSpacing:"0.1em" }}>online</span>
                </div>
              </div>
            </div>
            <span className="badge badge-c" style={{ padding:"2px 8px", fontSize:8 }}>JEE ADV 2025</span>
          </div>

          {/* Messages */}
          <div style={{ padding:18, display:"flex", flexDirection:"column", gap:14, background:S.cm, minHeight:290 }}>
            {/* AI */}
            <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(126,232,250,.2)", border:"1px solid rgba(126,232,250,.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:3 }}>
                <Icon n="neurology" style={{ color:S.cyan, fontSize:12 }} />
              </div>
              <div className="bubble" style={{ background:S.ch, border:"1px solid rgba(26,36,56,.8)", padding:12, maxWidth:"85%" }}>
                <p style={{ fontSize:12, color:S.text, lineHeight:1.6 }}>
                  Good morning! Your weak area this week is <span style={{ color:S.cyan, fontWeight:600 }}>Rotational Dynamics</span>. I've curated 8 targeted problems. Ready?
                </p>
                <div style={{ display:"flex", gap:6, marginTop:8 }}>
                  <span className="ctag">Moment of Inertia</span>
                  <span className="ctag">Torque</span>
                </div>
              </div>
            </div>
            {/* User */}
            <div style={{ display:"flex", gap:10, alignItems:"flex-start", flexDirection:"row-reverse" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(167,139,250,.2)", border:"1px solid rgba(167,139,250,.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:3 }}>
                <Icon n="person" style={{ color:S.violet, fontSize:12 }} />
              </div>
              <div className="bubble bubble-u" style={{ background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.2)", padding:12, maxWidth:"75%" }}>
                <p style={{ fontSize:12, color:S.text, lineHeight:1.6 }}>
                  Yes! But why is angular momentum conserved when net torque = 0? Explain differently?
                </p>
              </div>
            </div>
            {/* AI reply */}
            <div style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(126,232,250,.2)", border:"1px solid rgba(126,232,250,.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:3 }}>
                <Icon n="neurology" style={{ color:S.cyan, fontSize:12 }} />
              </div>
              <div className="bubble" style={{ background:S.ch, border:"1px solid rgba(26,36,56,.8)", padding:12, maxWidth:"90%" }}>
                <p style={{ fontSize:12, color:S.text, lineHeight:1.6, marginBottom:8 }}>
                  Think skater 🤸 — arms in = faster spin. Net τ = 0, so <span style={{ color:S.violet, fontWeight:600, fontFamily:"IBM Plex Mono" }}>L = Iω = const</span>.
                </p>
                <div style={{ background:"rgba(126,232,250,.05)", border:"1px solid rgba(126,232,250,.15)", padding:"6px 10px", borderRadius:4, fontFamily:"IBM Plex Mono", fontSize:9, color:S.cyan }}>
                  τ_net = dL/dt → τ_net = 0 → L = const ✓
                </div>
              </div>
            </div>
            {/* Typing */}
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <div style={{ width:24, height:24, borderRadius:"50%", background:"rgba(126,232,250,.2)", border:"1px solid rgba(126,232,250,.3)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                <Icon n="neurology" style={{ color:S.cyan, fontSize:12 }} />
              </div>
              <div style={{ background:S.ch, border:"1px solid rgba(26,36,56,.8)", padding:"7px 14px", borderRadius:999, display:"flex", gap:4, alignItems:"center" }}>
                {[0,150,300].map((d,i) => (
                  <div key={i} style={{ width:6, height:6, borderRadius:"50%", background:"rgba(126,232,250,.6)", animation:`bounce 1s ease-in-out ${d}ms infinite` }} />
                ))}
              </div>
            </div>
          </div>

          {/* Input */}
          <div style={{ padding:13, background:S.ch, borderTop:"1px solid rgba(26,36,56,.7)", display:"flex", gap:10 }}>
            <input className="ai-in" style={{ flex:1 }} placeholder="Ask a doubt, request a concept, or say 'quiz me'..." />
            <button className="btn btn-main" style={{ padding:"10px 14px" }}><Icon n="send" style={{ fontSize:16 }} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   FEATURES GRID
══════════════════════════════════════════════════════════════════════════════ */
function FeaturesSection() {
  const bars   = [.4,.55,.7,.45,.8,.9,.65,.75,.85,.95];
  const barClr = ["rgba(126,232,250,.3)","rgba(126,232,250,.5)","rgba(126,232,250,.65)","rgba(126,232,250,.85)","rgba(244,114,182,.6)","rgba(244,114,182,.85)","rgba(167,139,250,.8)","rgba(167,139,250,.6)","rgba(126,232,250,.7)","rgba(126,232,250,.95)"];

  return (
    <section id="features" style={{ padding:"96px 24px" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div className="badge badge-c" style={{ marginBottom:18 }}>System Capabilities</div>
          <h2 style={{ fontFamily:"Syne", fontWeight:900, fontSize:"clamp(1.9rem,5vw,2.9rem)", letterSpacing:-1 }}>
            <span className="shimmer-slow">Intelligence Suite</span>
          </h2>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:18 }}>

          {/* Adaptive Practice */}
          <div className="card reveal" style={{ padding:30, borderRadius:16, display:"flex", flexDirection:"column" }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:20 }}>
              <div className="f-icon" style={{ background:"rgba(126,232,250,.1)", border:"1px solid rgba(126,232,250,.2)" }}>
                <Icon n="auto_fix_high" style={{ color:S.cyan, fontSize:24 }} />
              </div>
              <span style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:"rgba(136,146,176,.35)", textTransform:"uppercase", letterSpacing:"0.15em" }}>MOD 01</span>
            </div>
            <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:21, color:S.text, marginBottom:10 }}>Adaptive Practice Engine</h3>
            <p style={{ color:S.dim, marginBottom:20, maxWidth:430, lineHeight:1.7 }}>
              Neural engine adjusts difficulty in real-time based on accuracy patterns and response time — mirroring the NTA/UPSC environment precisely.
            </p>
            <div style={{ background:S.cl, border:"1px solid rgba(26,36,56,.5)", padding:14, borderRadius:12 }}>
              <div style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:S.dim, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.1em" }}>Difficulty Adaptation — Last 20 Questions</div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:56 }}>
                {bars.map((h,i) => <div key={i} style={{ flex:1, background:barClr[i], height:`${h*100}%`, borderRadius:"2px 2px 0 0" }} />)}
              </div>
              <div style={{ display:"flex", justifyContent:"space-between", fontFamily:"IBM Plex Mono", fontSize:8, color:"rgba(136,146,176,.35)", marginTop:4 }}>
                <span>START</span><span>ADAPTIVE UP</span><span>NOW</span>
              </div>
            </div>
          </div>

          {/* AI Tutor */}
          <div className="card card-v reveal" style={{ padding:28, borderRadius:16, position:"relative", overflow:"hidden", display:"flex", flexDirection:"column" }}>
            <div style={{ position:"absolute", top:-28, right:-28, width:110, height:110, borderRadius:"50%", background:"rgba(167,139,250,.08)", filter:"blur(28px)", pointerEvents:"none" }} />
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:16 }}>
              <div className="f-icon" style={{ background:"rgba(167,139,250,.1)", border:"1px solid rgba(167,139,250,.2)" }}>
                <Icon n="smart_toy" style={{ color:S.violet, fontSize:24 }} />
              </div>
              <span style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:"rgba(136,146,176,.35)", textTransform:"uppercase", letterSpacing:"0.15em" }}>MOD 02</span>
            </div>
            <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:20, color:S.text, marginBottom:8 }}>AI Doubt Resolution</h3>
            <p style={{ color:S.dim, fontSize:13, marginBottom:16, lineHeight:1.65, flex: 1 }}>
              Socratic AI companion blocks spoon-feeding. Guides you to the right answer step-by-step using first principles.
            </p>
            <div style={{ background:S.cl, border:"1px solid rgba(26,36,56,.5)", padding:14, borderRadius:12 }}>
                 <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                   <Icon n="neurology" style={{ color:S.cyan, fontSize:16 }} />
                   <div style={{ fontFamily:"IBM Plex Mono", fontSize:10, color:S.text }}>Analyzing Doubt...</div>
                 </div>
                 <div style={{ marginTop:10, fontSize:11, color:S.dim, lineHeight:1.5 }}>
                   "Instead of giving you the friction coefficient, let's look at the free body diagram. What forces act on the block?" 
                 </div>
            </div>
          </div>

          {/* Knowledge Map */}
          <div className="card reveal" style={{ padding:28, borderRadius:16, display:"flex", flexDirection:"column" }}>
            <div className="f-icon" style={{ background:"rgba(126,232,250,.1)", border:"1px solid rgba(126,232,250,.2)", marginBottom:18 }}>
              <Icon n="hub" style={{ color:S.cyan, fontSize:24 }} />
            </div>
            <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:20, color:S.text, marginBottom:10 }}>Concept Knowledge Map</h3>
            <p style={{ color:S.dim, fontSize:13, marginBottom:18, lineHeight:1.65 }}>
              Visual neural map of your syllabus. See dependencies, mastery levels, and your real gaps.
            </p>
            <div style={{ position:"relative", height:108, background:S.cl, borderRadius:12, border:"1px solid rgba(26,36,56,.5)", overflow:"hidden" }}>
              <svg style={{ position:"absolute", inset:0, width:"100%", height:"100%", opacity:0.3 }}>
                <line x1="50%" y1="50%" x2="20%" y2="25%" stroke={S.cyan}   strokeWidth="1" strokeDasharray="3,3" />
                <line x1="50%" y1="50%" x2="80%" y2="30%" stroke={S.violet} strokeWidth="1" strokeDasharray="3,3" />
                <line x1="50%" y1="50%" x2="25%" y2="80%" stroke={S.pink}   strokeWidth="1" strokeDasharray="3,3" />
                <line x1="50%" y1="50%" x2="75%" y2="75%" stroke={S.cyan}   strokeWidth="1" strokeDasharray="3,3" />
              </svg>
              {[
                { t:"40%", l:"44%", s:16, c:S.cyan,                      sh:"0 0 12px rgba(126,232,250,.6)" },
                { t:"18%", l:"15%", s:10, c:"rgba(167,139,250,.7)",       sh:"none" },
                { t:"21%", l:"74%", s:10, c:"rgba(244,114,182,.7)",       sh:"none" },
                { t:"72%", l:"20%", s:8,  c:"rgba(126,232,250,.5)",       sh:"none" },
                { t:"69%", l:"71%", s:8,  c:"rgba(167,139,250,.5)",       sh:"none" },
              ].map((n,i) => (
                <div key={i} style={{ position:"absolute", width:n.s, height:n.s, top:n.t, left:n.l, borderRadius:"50%", background:n.c, boxShadow:n.sh }} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   STUDY PLAN
══════════════════════════════════════════════════════════════════════════════ */
function StudyPlanSection() {
  const subjects = [
    { name:"Physics",     pct:78, color:S.cyan,   tags:[["Mechanics ✓","rgba(126,232,250,.3)","rgba(126,232,250,.7)"],["Optics ⚠","rgba(244,114,182,.2)","rgba(244,114,182,.7)"]] },
    { name:"Chemistry",   pct:62, color:S.violet, tags:[["Inorganic ✓","rgba(167,139,250,.3)","rgba(167,139,250,.7)"],["Organic ⚠","rgba(244,114,182,.2)","rgba(244,114,182,.7)"]] },
    { name:"Mathematics", pct:85, color:S.pink,   tags:[["Calculus ✓","rgba(244,114,182,.3)","rgba(244,114,182,.7)"],["Algebra ✓","rgba(244,114,182,.3)","rgba(244,114,182,.7)"]] },
    { name:"Biology",     pct:54, color:S.cyan,   tags:[["Genetics ⚠","rgba(244,114,182,.2)","rgba(244,114,182,.7)"],["Ecology ⚠","rgba(244,114,182,.2)","rgba(244,114,182,.7)"]] },
  ];
  return (
    <section id="study-plan" style={{ padding:"96px 24px" }}>
      <div style={{ maxWidth:1152, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div className="badge badge-v" style={{ marginBottom:18 }}>Personalized Planning</div>
          <h2 style={{ fontFamily:"Syne", fontWeight:900, fontSize:"clamp(1.9rem,5vw,2.9rem)", letterSpacing:-1 }}>
            <span className="shimmer-slow">Your Plan. Your Pace.</span>
          </h2>
          <p style={{ color:S.dim, marginTop:10, maxWidth:500, margin:"10px auto 0" }}>
            Tell JARVIS your exam, target rank, and schedule. It builds the optimal roadmap — and adapts it weekly.
          </p>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24 }} className="g2col">
          {/* Form */}
          <div className="card reveal" style={{ padding:26, borderRadius:16 }}>
            <div style={{ fontFamily:"IBM Plex Mono", fontSize:10, color:S.cyan, textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:20, display:"flex", alignItems:"center", gap:6 }}>
              <Icon n="tune" style={{ fontSize:12 }} /> Study Plan Generator
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <label style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:S.dim, textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:8 }}>Target Exam</label>
                <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
                  {["JEE Advanced","JEE Mains","NEET","UPSC","CAT"].map((e,i) => (
                    <button key={e} className={i===0 ? "badge badge-c" : ""} style={i!==0 ? { fontFamily:"IBM Plex Mono", fontSize:10, textTransform:"uppercase", padding:"4px 11px", border:"1px solid rgba(42,53,80,.6)", color:S.dim, borderRadius:999, background:"transparent", cursor:"pointer" } : { cursor:"pointer" }}>{e}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:S.dim, textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:8 }}>Target Rank</label>
                <input className="ai-in" defaultValue="Top 500" />
              </div>
              <div>
                <label style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:S.dim, textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:8 }}>Daily Study Hours</label>
                <div style={{ display:"flex", gap:7 }}>
                  {["4h","6h","8h","10h+"].map((h,i) => (
                    <button key={h} className={i===2 ? "badge badge-c" : ""} style={i!==2 ? { fontFamily:"IBM Plex Mono", fontSize:10, textTransform:"uppercase", padding:"4px 11px", border:"1px solid rgba(42,53,80,.6)", color:S.dim, borderRadius:2, background:"transparent", cursor:"pointer" } : { cursor:"pointer" }}>{h}</button>
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:S.dim, textTransform:"uppercase", letterSpacing:"0.1em", display:"block", marginBottom:8 }}>Weakest Subject</label>
                <input className="ai-in" placeholder="e.g. Organic Chemistry, Integration..." />
              </div>
              <button className="btn btn-main" style={{ justifyContent:"center", width:"100%", marginTop:4 }}>
                <Icon n="auto_awesome" style={{ fontSize:16 }} /> Generate My Study Plan
              </button>
            </div>
          </div>

          {/* Mastery */}
          <div className="card reveal" style={{ padding:26, borderRadius:16 }}>
            <div style={{ fontFamily:"IBM Plex Mono", fontSize:10, color:S.violet, textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:20, display:"flex", alignItems:"center", gap:6 }}>
              <Icon n="analytics" style={{ fontSize:12 }} /> Subject Mastery Analysis
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {subjects.map(s => (
                <div key={s.name}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                    <span style={{ fontSize:14, color:S.text }}>{s.name}</span>
                    <span style={{ fontFamily:"IBM Plex Mono", fontSize:12, color:s.color }}>{s.pct}%</span>
                  </div>
                  <div className="prog-track"><div className="prog-fill" style={{ width:`${s.pct}%`, background:s.color }} /></div>
                  <div style={{ display:"flex", gap:6, marginTop:5 }}>
                    {s.tags.map(([label,bc,tc]) => (
                      <span key={label} style={{ padding:"2px 8px", border:`1px solid ${bc}`, fontFamily:"IBM Plex Mono", fontSize:9, color:tc, borderRadius:2 }}>{label}</span>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ padding:11, background:S.cl, border:"1px solid rgba(126,232,250,.15)", borderRadius:8 }}>
                <div style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:S.cyan, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:4 }}>AI Recommendation</div>
                <p style={{ fontSize:12, color:S.dim }}>Focus <span style={{ color:S.cyan, fontWeight:600 }}>40% time on Chemistry</span> this week. Organic Chemistry has the highest weightage in JEE Advanced 2025.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   EXAMS
══════════════════════════════════════════════════════════════════════════════ */
function ExamsSection() {
  const exams = [
    { icon:"calculate",       color:S.cyan,   bg:"rgba(126,232,250,.1)", bc:"rgba(126,232,250,.2)", cls:"",       name:"JEE",     desc:"Mains + Advanced. Full syllabus with 12,000+ NTA-pattern questions.", badge:"12K+ Questions", bc2:"badge-c" },
    { icon:"vaccines",        color:S.violet, bg:"rgba(167,139,250,.1)", bc:"rgba(167,139,250,.2)", cls:"card-v", name:"NEET",    desc:"Biology, Physics & Chemistry with NCERT-mapped practice and PYQs.",   badge:"8K+ PYQs",      bc2:"badge-v" },
    { icon:"account_balance", color:S.pink,   bg:"rgba(244,114,182,.1)", bc:"rgba(244,114,182,.2)", cls:"card-p", name:"UPSC",    desc:"Prelims + Mains. Current affairs, static GK, and essay writing.",      badge:"Daily Updates",  bc2:"badge-p" },
    { icon:"bar_chart",       color:S.cyan,   bg:"rgba(126,232,250,.1)", bc:"rgba(126,232,250,.2)", cls:"",       name:"CAT/MBA", desc:"Quant, Verbal & DILR — adaptive mocks with IIM benchmarking.",        badge:"IIM Patterns",   bc2:"badge-c" },
  ];
  return (
    <section id="exams" style={{ padding:"96px 24px" }}>
      <div style={{ maxWidth:1280, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div className="badge badge-p" style={{ marginBottom:18 }}>All Major Exams</div>
          <h2 style={{ fontFamily:"Syne", fontWeight:900, fontSize:"clamp(1.9rem,5vw,2.9rem)", letterSpacing:-1 }}>
            One AI. <span className="shimmer">Every Exam.</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16 }} className="g4col">
          {exams.map(ex => (
            <div key={ex.name} className={`card ${ex.cls} reveal`} style={{ padding:22, borderRadius:16, textAlign:"center", cursor:"pointer" }}>
              <div style={{ width:54, height:54, borderRadius:14, background:ex.bg, border:`1px solid ${ex.bc}`, display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 14px" }}>
                <Icon n={ex.icon} style={{ color:ex.color, fontSize:24 }} />
              </div>
              <h3 style={{ fontFamily:"Syne", fontWeight:700, fontSize:17, marginBottom:8 }}>{ex.name}</h3>
              <p style={{ color:S.dim, fontSize:12, marginBottom:12, lineHeight:1.6 }}>{ex.desc}</p>
              <span className={`badge ${ex.bc2}`} style={{ fontSize:9 }}>{ex.badge}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════════════════════════════════════════ */
function Testimonials() {
  const reviews = [
    { init:"A", name:"Arjun Sharma", result:"JEE Advanced 2024 — AIR 89",    color:S.cyan,   cls:"",       quote:"JARVIS's study plan was insane. It knew exactly where I was weak and pushed me there. Went from AIR 4,000 to AIR 89 in 8 months." },
    { init:"P", name:"Priya Nair",   result:"NEET 2024 — Score 715/720",     color:S.violet, cls:"card-v", quote:"The AI companion resolved my organic chemistry doubts better than my coaching teacher. I could ask anything, anytime, without judgment." },
    { init:"R", name:"Rohit Verma",  result:"CAT 2024 — 99.4 Percentile",   color:S.pink,   cls:"card-p", quote:"The concept knowledge map showed me exactly what to study. Stopped wasting time on things I already knew. Pure efficiency." },
  ];
  return (
    <section style={{ padding:"96px 24px" }}>
      <div style={{ maxWidth:1152, margin:"0 auto" }}>
        <div style={{ textAlign:"center", marginBottom:52 }}>
          <div className="badge badge-c" style={{ marginBottom:18 }}>Student Stories</div>
          <h2 style={{ fontFamily:"Syne", fontWeight:900, fontSize:"clamp(1.9rem,5vw,2.9rem)", letterSpacing:-1 }}>
            Real Results, <span className="shimmer">Real Ranks</span>
          </h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }} className="g3col">
          {reviews.map(r => (
            <div key={r.name} className={`card ${r.cls} reveal`} style={{ padding:22, borderRadius:16 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <div style={{ width:40, height:40, borderRadius:"50%", background:`${r.color}30`, border:`1px solid ${r.color}55`, display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"Syne", fontWeight:700, color:r.color, fontSize:16 }}>{r.init}</div>
                <div>
                  <div style={{ fontWeight:600, fontSize:14, color:S.text }}>{r.name}</div>
                  <div style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:r.color }}>{r.result}</div>
                </div>
              </div>
              <p style={{ color:S.dim, fontSize:13, lineHeight:1.7 }}>"{r.quote}"</p>
              <div style={{ marginTop:12, color:"#facc15", fontSize:14 }}>★★★★★</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   CTA
══════════════════════════════════════════════════════════════════════════════ */
function CTA() {
  const navigate = useNavigate();
  return (
    <section style={{ padding:"32px 24px 96px" }}>
      <div style={{ maxWidth:680, margin:"0 auto" }}>
        <div className="card scan-wrap reveal" style={{ padding:"68px 36px", borderRadius:28, textAlign:"center", position:"relative", overflow:"hidden" }}>
          <div className="scan-line" />
          <div className="hex-bg" style={{ position:"absolute", inset:0, opacity:.2 }} />
          <div style={{ position:"relative", zIndex:1 }}>
            <div className="badge badge-c" style={{ marginBottom:18 }}>Free to Start</div>
            <h2 style={{ fontFamily:"Syne", fontWeight:900, fontSize:"clamp(1.8rem,5vw,2.9rem)", letterSpacing:-1, marginBottom:12 }}>
              <span className="shimmer">Your rank is waiting.</span>
            </h2>
            <p style={{ color:S.dim, maxWidth:420, margin:"0 auto 28px", lineHeight:1.7 }}>
              Join 15,000+ students who use JARVIS AI to study smarter. No credit card required.
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="btn btn-main" onClick={() => navigate('/auth')}><Icon n="neurology" style={{ fontSize:16 }} /> Start Free — No Card Needed</button>
              <button className="btn btn-out">Talk to an Expert</button>
            </div>
            <p style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:"rgba(136,146,176,.3)", marginTop:20, textTransform:"uppercase", letterSpacing:"0.1em" }}>
              JEE · NEET · UPSC · CAT · GATE · SSC · and 20+ more
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   FOOTER
══════════════════════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{ borderTop:"1px solid rgba(26,36,56,.5)", background:"#050709" }}>
      <div style={{ maxWidth:1280, margin:"0 auto", padding:"52px 24px 28px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:36, marginBottom:44 }} className="g3col">
          <div>
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo(0,0)} style={{ marginBottom: 12 }}>
          <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-400/50 flex items-center justify-center shadow-lg shadow-cyan-500/30 relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-400/5 rounded-xl"></div>
            <div className="relative w-7 h-7 flex items-center justify-center">
              <div className="absolute inset-0 animate-spin" style={{animationDuration:'10s'}}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="13" stroke="#22d3ee" strokeWidth="0.8" strokeDasharray="4 3" opacity="0.45"/>
                </svg>
              </div>
              <div className="absolute inset-0 animate-spin" style={{animationDuration:'7s', animationDirection:'reverse'}}>
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <circle cx="14" cy="14" r="9" stroke="#22d3ee" strokeWidth="1" strokeDasharray="5 2" opacity="0.65"/>
                </svg>
              </div>
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="absolute inset-0">
                <circle cx="14" cy="14" r="5.5" stroke="#22d3ee" strokeWidth="1.5"/>
                <circle cx="14" cy="14" r="2.5" fill="#22d3ee"/>
              </svg>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter font-headline text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)] m-0 leading-none">J.A.R.V.I.S.</h1>
          </div>
        </div>
            <p style={{ color:S.dim, fontSize:13, maxWidth:240, lineHeight:1.7 }}>Intelligent learning companion for competitive exam preparation. Powered by adaptive AI.</p>
          </div>
          {[
            { h:"Platform", links:["JEE Preparation","NEET Preparation","UPSC Preparation","CAT Preparation"] },
            { h:"System",   links:["System Status","Privacy Policy","Terms of Service","Neural Link API"] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:S.dim, textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:14 }}>{col.h}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:9 }}>
                {col.links.map(l => (
                  <a key={l} href="#" style={{ fontSize:13, color:S.dim, textDecoration:"none", transition:"color .2s" }}
                    onMouseEnter={e => e.target.style.color = S.cyan}
                    onMouseLeave={e => e.target.style.color = S.dim}>{l}</a>
                ))}
              </div>
            </div>
          ))}
        </div>
        <hr className="hr-glow" style={{ margin:"0 0 22px" }} />
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
          <div style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:"rgba(136,146,176,.3)", textTransform:"uppercase", letterSpacing:"0.1em" }}>© 2025 JARVIS AI — All Systems Operational</div>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span className="dot" style={{ width:6, height:6 }} />
            <span style={{ fontFamily:"IBM Plex Mono", fontSize:9, color:S.cyan, textTransform:"uppercase", letterSpacing:"0.1em" }}>Neural Core Online</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   BOTTOM NAV (mobile)
══════════════════════════════════════════════════════════════════════════════ */
function BottomNav() {
  const [active, setActive] = useState(0);
  const items = [
    { icon:"rocket_launch",  label:"Arena" },
    { icon:"smart_toy",      label:"Companion" },
    { icon:"calendar_month", label:"Plan" },
    { icon:"analytics",      label:"Analytics" },
    { icon:"person",         label:"Profile" },
  ];
  return (
    <nav className="show-mob" style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:100, background:"rgba(5,7,9,.92)", backdropFilter:"blur(20px)", borderTop:"1px solid rgba(26,36,56,.5)", padding:"9px 16px 18px", justifyContent:"space-around" }}>
      {items.map((item,i) => (
        <button key={item.label} onClick={() => setActive(i)}
          style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:3, background:"none", border:"none", cursor:"pointer", color: active===i ? S.cyan : S.dim, opacity: active===i ? 1 : 0.55, transition:"all .2s" }}>
          <Icon n={item.icon} style={{ fontSize:22 }} />
          <span style={{ fontFamily:"IBM Plex Mono", fontSize:8, textTransform:"uppercase", letterSpacing:"0.1em" }}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   ROOT EXPORT
══════════════════════════════════════════════════════════════════════════════ */
export default function JarvisAI() {
  useReveal();
  useCounters();

  useEffect(() => {
    if (!document.getElementById("jarvis-css")) {
      const el = document.createElement("style");
      el.id = "jarvis-css";
      el.textContent = CSS;
      document.head.appendChild(el);
    }
  }, []);

  return (
    <div className="jarvis">
      <SplashCursor />
      <div className="aurora-bg">
        <div className="aurora-blob ab1" />
        <div className="aurora-blob ab2" />
        <div className="aurora-blob ab3" />
      </div>
      <div className="grid-overlay" />

      <Navbar />

      <main style={{ position:"relative", zIndex:1 }}>
        <Hero />
        <hr className="hr-glow" style={{ maxWidth:720, margin:"0 auto" }} />
        <CompanionSection />
        <hr className="hr-glow" style={{ maxWidth:720, margin:"0 auto" }} />
        <FeaturesSection />
        <hr className="hr-glow" style={{ maxWidth:720, margin:"0 auto" }} />
        <ExamsSection />
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
}
