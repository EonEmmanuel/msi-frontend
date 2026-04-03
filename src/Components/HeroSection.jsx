import React, { useState, useEffect, useRef } from 'react';
import { Calendar, Play, Eye } from 'lucide-react';

const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroSlideDown {
    from { opacity: 0; transform: translateY(-28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroPulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(232,25,44,0.7); }
    50%       { opacity: 0.7; box-shadow: 0 0 0 8px rgba(232,25,44,0); }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(400%); }
  }
  @keyframes waveBar {
    0%, 100% { transform: scaleY(0.4); }
    50%       { transform: scaleY(1); }
  }
  @keyframes floatSlow {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33%       { transform: translateY(-18px) rotate(1.5deg); }
    66%       { transform: translateY(8px) rotate(-1deg); }
  }
  @keyframes floatMed {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50%       { transform: translateY(-24px) rotate(-2deg); }
  }
  @keyframes rayPulse {
    0%, 100% { opacity: 0.04; }
    50%       { opacity: 0.09; }
  }
  @keyframes particleDrift {
    0%   { transform: translateY(0) translateX(0); opacity: 0; }
    10%  { opacity: 1; }
    90%  { opacity: 1; }
    100% { transform: translateY(-120px) translateX(30px); opacity: 0; }
  }
  @keyframes gridPulse {
    0%, 100% { opacity: 0.025; }
    50%       { opacity: 0.055; }
  }
  @keyframes orbitRing {
    from { transform: rotate(0deg); }
    to   { transform: rotate(360deg); }
  }

  /* ── JUICE: gradient animations ── */
  @keyframes gradientFlow {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes gradientFlowFast {
    0%   { background-position: 0% 50%; }
    50%  { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes wordReveal {
    from { clip-path: inset(0 0 100% 0); transform: translateY(24px); opacity: 0; }
    to   { clip-path: inset(0 0 0% 0);   transform: translateY(0);    opacity: 1; }
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideRight {
    from { transform: translateX(-16px); opacity: 0; }
    to   { transform: translateX(0);     opacity: 1; }
  }

  @keyframes btnShimmer {
    0%   { left: -100%; }
    100% { left: 130%; }
  }

  @keyframes softFloat {
    0%, 100% { transform: translateY(0); }
    50%       { transform: translateY(-4px); }
  }

  @keyframes statPop {
    from { opacity: 0; transform: translateY(12px) scale(0.92); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes borderGlow {
    0%, 100% { box-shadow: 0 0 0 1px rgba(232,25,44,0.4), 0 8px 28px rgba(232,25,44,0.3); }
    50%       { box-shadow: 0 0 0 1px rgba(232,25,44,0.7), 0 12px 40px rgba(232,25,44,0.55); }
  }

  /* ── Base classes ── */
  .hero-fade-up    { animation: heroFadeUp 0.8s cubic-bezier(.22,1,.36,1) both; }
  .hero-slide-down { animation: heroSlideDown 0.8s cubic-bezier(.22,1,.36,1) both; }
  .delay-0   { animation-delay: 0ms; }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 320ms; }
  .delay-400 { animation-delay: 440ms; }
  .delay-500 { animation-delay: 560ms; }
  .delay-600 { animation-delay: 700ms; }

  .live-ring { animation: heroPulse 2s ease-in-out infinite; }
  .wave-bar {
    display: inline-block; width: 3px; height: 14px;
    border-radius: 2px; background: #E8192C; transform-origin: bottom;
  }
  .wave-bar:nth-child(1) { animation: waveBar 0.8s ease-in-out infinite 0s; }
  .wave-bar:nth-child(2) { animation: waveBar 0.8s ease-in-out infinite 0.15s; }
  .wave-bar:nth-child(3) { animation: waveBar 0.8s ease-in-out infinite 0.3s; }
  .wave-bar:nth-child(4) { animation: waveBar 0.8s ease-in-out infinite 0.45s; }

  /* bg classes */
  .bg-hex-1 { animation: floatSlow 9s ease-in-out infinite; }
  .bg-hex-2 { animation: floatMed 7s ease-in-out infinite 1s; }
  .bg-hex-3 { animation: floatSlow 11s ease-in-out infinite 2.5s; }
  .bg-ring-outer { animation: orbitRing 28s linear infinite; transform-origin: center; }
  .bg-ring-inner { animation: orbitRing 18s linear infinite reverse; transform-origin: center; }
  .bg-rays { animation: rayPulse 5s ease-in-out infinite; }
  .bg-grid { animation: gridPulse 6s ease-in-out infinite; }
  .particle { position: absolute; border-radius: 50%; pointer-events: none; }
  .particle:nth-child(1)  { animation: particleDrift 6s ease-in infinite 0s; }
  .particle:nth-child(2)  { animation: particleDrift 8s ease-in infinite 1s; }
  .particle:nth-child(3)  { animation: particleDrift 5s ease-in infinite 2s; }
  .particle:nth-child(4)  { animation: particleDrift 7s ease-in infinite 0.5s; }
  .particle:nth-child(5)  { animation: particleDrift 9s ease-in infinite 3s; }
  .particle:nth-child(6)  { animation: particleDrift 6s ease-in infinite 1.5s; }
  .particle:nth-child(7)  { animation: particleDrift 10s ease-in infinite 4s; }
  .particle:nth-child(8)  { animation: particleDrift 7s ease-in infinite 2.5s; }

  /* ══════════════════════════════════
     JUICY GRADIENT TEXT SYSTEM
  ══════════════════════════════════ */

  /* "MEDIA" — white-to-red-to-white rolling fire */
  .text-media {
    background: linear-gradient(
      90deg,
      #ffffff 0%,
      #ffffff 15%,
      #ff6b7a 30%,
      #E8192C 45%,
      #ff6b7a 60%,
      #ffffff 75%,
      #ffffff 100%
    );
    background-size: 250% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientFlow 3.5s ease infinite;
  }

  /* "SPORTS" — deep red to hot coral blaze */
  .text-sports {
    background: linear-gradient(
      90deg,
      #7a0010 0%,
      #E8192C 20%,
      #ff3347 40%,
      #ff6b35 60%,
      #E8192C 80%,
      #7a0010 100%
    );
    background-size: 280% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientFlowFast 2.8s ease infinite;
  }

  /* "INFOS" — white ghost outline style with blue-white sweep */
  .text-infos {
    background: linear-gradient(
      90deg,
      rgba(255,255,255,0.2) 0%,
      rgba(120,160,255,0.7) 20%,
      rgba(255,255,255,0.9) 40%,
      rgba(100,140,255,0.6) 60%,
      rgba(255,255,255,0.85) 80%,
      rgba(255,255,255,0.2) 100%
    );
    background-size: 260% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientFlow 4s ease infinite 0.6s;
  }

  @keyframes allExit {
    from { opacity: 1; transform: translateY(0); }
    to   { opacity: 0; transform: translateY(-14px); }
  }
  .tw-all-exit {
    animation: allExit 0.5s cubic-bezier(.55,0,1,.45) both;
    font-family: 'Barlow Condensed', sans-serif;
    font-weight: 800;
  }

  /* ── TYPEWRITER cursor ── */
  @keyframes cursorBlink {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0; }
  }

  .tw-cursor {
    display: inline-block;
    width: 4px;
    border-radius: 2px;
    background: currentColor;
    margin-left: 4px;
    vertical-align: baseline;
    animation: cursorBlink 0.75s ease-in-out infinite;
  }

  /* ── Word erase: slide up out ── */
  @keyframes wordExit {
    from { clip-path: inset(0 0 0% 0); opacity: 1; transform: translateY(0); }
    to   { clip-path: inset(100% 0 0 0); opacity: 0; transform: translateY(-18px); }
  }
  /* ── Word enter: slide up in ── */
  @keyframes wordEnter {
    from { clip-path: inset(0 0 100% 0); opacity: 0; transform: translateY(18px); }
    to   { clip-path: inset(0 0 0% 0);   opacity: 1; transform: translateY(0); }
  }

  .tw-entering { animation: wordEnter 0.45s cubic-bezier(.22,1,.36,1) both; }
  .tw-exiting  { animation: wordExit  0.35s cubic-bezier(.55,0,1,.45) both; }

  /* Content entrance */
  .anim-eyebrow { animation: slideRight 0.7s cubic-bezier(.22,1,.36,1) 0.1s both; }
  .anim-word-1  { animation: wordReveal 0.75s cubic-bezier(.22,1,.36,1) 0.28s both; }
  .anim-word-2  { animation: wordReveal 0.75s cubic-bezier(.22,1,.36,1) 0.48s both; }
  .anim-word-3  { animation: wordReveal 0.75s cubic-bezier(.22,1,.36,1) 0.66s both; }
  .anim-sub     { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 0.88s both; }
  .anim-btns    { animation: fadeUp 0.8s cubic-bezier(.22,1,.36,1) 1.08s both; }
  .anim-stat-0  { animation: statPop 0.55s cubic-bezier(.22,1,.36,1) 1.3s both; }
  .anim-stat-1  { animation: statPop 0.55s cubic-bezier(.22,1,.36,1) 1.45s both; }
  .anim-stat-2  { animation: statPop 0.55s cubic-bezier(.22,1,.36,1) 1.6s both; }
  .anim-stat-3  { animation: statPop 0.55s cubic-bezier(.22,1,.36,1) 1.75s both; }

  /* ── Eyebrow pill ── */
  .eyebrow-pill {
    display: inline-flex; align-items: center; gap: 9px;
    padding: 6px 16px 6px 10px; border-radius: 100px;
    background: linear-gradient(135deg, rgba(232,25,44,0.12), rgba(180,10,25,0.06));
    border: 1px solid rgba(232,25,44,0.28);
    animation: softFloat 3.5s ease-in-out infinite;
  }

  /* ── WATCH LIVE button — full gradient with glow pulse ── */
  .btn-watch {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, #ff3347 0%, #E8192C 40%, #c4101e 70%, #8a0010 100%);
    background-size: 200% auto;
    box-shadow: 0 0 0 1px rgba(232,25,44,0.5),
                0 8px 28px rgba(232,25,44,0.4),
                inset 0 1px 0 rgba(255,130,130,0.2);
    transition: all 0.28s ease;
    animation: borderGlow 2.5s ease-in-out infinite;
  }
  .btn-watch::before {
    content: '';
    position: absolute; top: 0; bottom: 0; left: -100%; width: 55%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent);
    transform: skewX(-20deg);
  }
  .btn-watch:hover::before { animation: btnShimmer 0.5s ease forwards; }
  .btn-watch:hover {
    background-position: right center;
    box-shadow: 0 0 0 1px rgba(232,25,44,0.8),
                0 14px 44px rgba(232,25,44,0.6),
                inset 0 1px 0 rgba(255,130,130,0.2);
    transform: translateY(-2px);
  }
  .btn-watch:active { transform: translateY(0) scale(0.98); }

  /* ── SCHEDULE button — border gradient glow ── */
  .btn-schedule {
    position: relative; overflow: hidden;
    background: rgba(255,255,255,0.03);
    border: 1px solid transparent;
    background-clip: padding-box;
    transition: all 0.28s ease;
  }
  .btn-schedule::before {
    content: '';
    position: absolute; inset: -1px; border-radius: inherit; z-index: -1;
    background: linear-gradient(135deg,
      rgba(255,255,255,0.18),
      rgba(100,140,255,0.25),
      rgba(232,25,44,0.2),
      rgba(255,255,255,0.1)
    );
    background-size: 300% 300%;
    animation: gradientFlow 4s ease infinite;
  }
  .btn-schedule:hover {
    background: rgba(255,255,255,0.07);
    transform: translateY(-2px);
  }
  .btn-schedule:active { transform: translateY(0) scale(0.98); }

  /* ── Stat card ── */
  .stat-item {
    position: relative; padding: 18px 16px; cursor: pointer;
    border-left: 1px solid rgba(255,255,255,0.06);
    transition: border-color 0.25s;
  }
  .stat-item:first-child { border-left: none; }
  .stat-item:hover { border-color: rgba(232,25,44,0.35); }

  /* stat value gradient on hover */
  .stat-value {
    background: linear-gradient(90deg, #ffffff, #ffffff);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    transition: background 0.3s ease;
  }
  .stat-item:hover .stat-value {
    background: linear-gradient(90deg, #ff6b7a, #E8192C, #ff8c35);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientFlowFast 1.5s ease infinite;
  }

  /* ── Scanline + glass kept ── */
  .glass-live {
    background: rgba(14,14,14,0.72);
    backdrop-filter: blur(20px) saturate(1.8);
    -webkit-backdrop-filter: blur(20px) saturate(1.8);
    border: 1px solid rgba(255,255,255,0.08);
  }
  .scanline-sweep { position: absolute; inset: 0; overflow: hidden; pointer-events: none; border-radius: inherit; }
  .scanline-sweep::after {
    content: ''; position: absolute; left: 0; right: 0; height: 40%;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent);
    animation: scanline 3.5s ease-in-out infinite;
  }
`;

/* ─────────────────────────── */
const stats = [
  { value: '24/7', label: 'Live Broadcast' },
  { value: '10+',  label: 'Sports Covered' },
  { value: '1.2M', label: 'Monthly Viewers' },
  { value: '5',    label: 'Leagues Followed' },
];

const particles = [
  { w: 3, h: 3, left: '12%',  top: '70%', color: 'rgba(232,25,44,0.6)' },
  { w: 2, h: 2, left: '28%',  top: '80%', color: 'rgba(255,255,255,0.3)' },
  { w: 4, h: 4, left: '45%',  top: '75%', color: 'rgba(232,25,44,0.4)' },
  { w: 2, h: 2, left: '60%',  top: '85%', color: 'rgba(255,255,255,0.25)' },
  { w: 3, h: 3, left: '75%',  top: '72%', color: 'rgba(232,25,44,0.5)' },
  { w: 2, h: 2, left: '88%',  top: '78%', color: 'rgba(255,255,255,0.2)' },
  { w: 3, h: 3, left: '20%',  top: '65%', color: 'rgba(0,120,255,0.35)' },
  { w: 2, h: 2, left: '55%',  top: '68%', color: 'rgba(232,25,44,0.3)' },
];

const HeroSection = () => {
  const [viewers, setViewers] = useState(142380);

  /*
   * SEQUENCE:
   *  step 0 — type "Media"      (line 1)
   *  step 1 — hold Media, type "Sports"  (line 2)
   *  step 2 — hold both, type "Infos"   (inline after Sports on line 2)
   *  step 3 — hold all three visible
   *  step 4 — erase all at once (fade out)
   *  step 5 — blank pause → restart
   */
  const SPEED   = 85;   // ms per char typed
  const HOLD    = 1800; // ms hold all three visible
  const PAUSE   = 400;  // ms blank before restart
  const FADE_MS = 500;  // exit fade duration

  const [line1, setLine1] = useState('');   // Media
  const [line2, setLine2] = useState('');   // Sports
  const [line3, setLine3] = useState('');   // Infos (inline after Sports)
  const [exiting, setExiting] = useState(false);

  const stateRef = useRef({ step: 0, char: 0, timer: null });

  const typeWord = (word, setter, onDone) => {
    let i = 0;
    const go = () => {
      i++;
      setter(word.slice(0, i));
      if (i < word.length) {
        stateRef.current.timer = setTimeout(go, SPEED);
      } else {
        onDone();
      }
    };
    stateRef.current.timer = setTimeout(go, SPEED);
  };

  const runSequence = () => {
    setLine1(''); setLine2(''); setLine3(''); setExiting(false);

    // Step 1 — type "Media"
    typeWord('Media', setLine1, () => {
      // Step 2 — type "Sports"
      stateRef.current.timer = setTimeout(() => {
        typeWord('Sports', setLine2, () => {
          // Step 3 — type "Infos" inline
          stateRef.current.timer = setTimeout(() => {
            typeWord('Infos', setLine3, () => {
              // Step 4 — hold all three
              stateRef.current.timer = setTimeout(() => {
                // Step 5 — fade everything out
                setExiting(true);
                stateRef.current.timer = setTimeout(() => {
                  // Step 6 — blank pause then restart
                  setLine1(''); setLine2(''); setLine3('');
                  setExiting(false);
                  stateRef.current.timer = setTimeout(runSequence, PAUSE);
                }, FADE_MS);
              }, HOLD);
            });
          }, 180);
        });
      }, 220);
    });
  };

  useEffect(() => {
    stateRef.current.timer = setTimeout(runSequence, 300);
    return () => clearTimeout(stateRef.current.timer);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setViewers(v => v + Math.floor(Math.random() * 40 - 15));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{STYLES}</style>

      <section
        className="relative w-full h-fit overflow-hidden flex flex-col justify-between min-h-screen max-w-full"
        style={{ background: '#080808' }}
      >

        {/* ══ BACKGROUND — all 12 layers unchanged ══ */}
        <div className="bg-grid absolute inset-0 pointer-events-none" style={{ backgroundImage:`linear-gradient(rgba(232,25,44,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(232,25,44,0.06) 1px, transparent 1px)`, backgroundSize:'60px 60px', maskImage:'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)', WebkitMaskImage:'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)' }} />
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div style={{ position:'absolute',top:'-10%',left:'-5%',width:'55%',height:'70%',background:'radial-gradient(ellipse at 30% 30%, rgba(232,25,44,0.18) 0%, rgba(180,10,25,0.08) 40%, transparent 70%)' }} />
          <div style={{ position:'absolute',top:'10%',right:'-10%',width:'50%',height:'60%',background:'radial-gradient(ellipse at 70% 30%, rgba(0,80,200,0.12) 0%, rgba(0,40,140,0.06) 40%, transparent 70%)' }} />
          <div style={{ position:'absolute',top:'20%',left:'50%',width:'60%',height:'50%',transform:'translateX(-50%)',background:'radial-gradient(ellipse at 50% 50%, rgba(232,25,44,0.06) 0%, transparent 65%)' }} />
          <div style={{ position:'absolute',bottom:'-5%',left:'20%',width:'60%',height:'40%',background:'radial-gradient(ellipse at 50% 100%, rgba(232,25,44,0.1) 0%, rgba(232,25,44,0.04) 40%, transparent 70%)' }} />
        </div>
        <div className="bg-rays absolute inset-0 pointer-events-none overflow-hidden">
          {[{left:'5%',skew:'35deg',w:60,o:0.04},{left:'18%',skew:'33deg',w:20,o:0.05},{left:'32%',skew:'30deg',w:40,o:0.03},{left:'55%',skew:'28deg',w:25,o:0.04},{left:'70%',skew:'32deg',w:55,o:0.035},{left:'85%',skew:'30deg',w:18,o:0.05}].map((ray,i)=>(
            <div key={i} style={{ position:'absolute',top:'-20%',bottom:'-20%',left:ray.left,width:`${ray.w}px`,background:`linear-gradient(to bottom, transparent 0%, rgba(232,25,44,${ray.o*3}) 20%, rgba(232,25,44,${ray.o}) 50%, transparent 100%)`,transform:`skewX(-${ray.skew})` }} />
          ))}
        </div>
        <div className="absolute pointer-events-none" style={{ top:'-80px',right:'-80px',width:480,height:480 }}>
          <div className="bg-ring-outer absolute inset-0" style={{ border:'1px dashed rgba(232,25,44,0.12)',borderRadius:'50%' }} />
          <div className="bg-ring-inner absolute" style={{ inset:60,border:'1px solid rgba(232,25,44,0.08)',borderRadius:'50%' }} />
          <div className="bg-ring-outer absolute" style={{ inset:130,border:'1px dashed rgba(255,255,255,0.05)',borderRadius:'50%' }} />
          <div className="absolute" style={{ inset:0,display:'flex',alignItems:'center',justifyContent:'center' }}>
            <div style={{ position:'relative',width:60,height:60 }}>
              <div style={{ position:'absolute',top:'50%',left:0,right:0,height:1,background:'rgba(232,25,44,0.15)',transform:'translateY(-50%)' }} />
              <div style={{ position:'absolute',left:'50%',top:0,bottom:0,width:1,background:'rgba(232,25,44,0.15)',transform:'translateX(-50%)' }} />
              <div style={{ position:'absolute',inset:'50%',margin:'-4px',width:8,height:8,borderRadius:'50%',background:'rgba(232,25,44,0.5)' }} />
            </div>
          </div>
          {[0,60,120,180,240,300].map((deg,i)=>(
            <div key={i} style={{ position:'absolute',top:'50%',left:'50%',width:5,height:5,borderRadius:'50%',background:i%2===0?'rgba(232,25,44,0.4)':'rgba(255,255,255,0.15)',transform:`rotate(${deg}deg) translateX(150px) translateY(-50%)` }} />
          ))}
        </div>
        <div className="bg-hex-1 absolute pointer-events-none" style={{ bottom:'12%',left:'3%',opacity:0.12 }}>
          <svg width="120" height="138" viewBox="0 0 120 138" fill="none"><polygon points="60,4 116,34 116,104 60,134 4,104 4,34" stroke="#E8192C" strokeWidth="1.5" fill="none"/><polygon points="60,18 102,42 102,96 60,120 18,96 18,42" stroke="#E8192C" strokeWidth="0.5" fill="none" opacity="0.5"/></svg>
        </div>
        <div className="bg-hex-2 absolute pointer-events-none" style={{ bottom:'30%',left:'8%',opacity:0.07 }}>
          <svg width="70" height="80" viewBox="0 0 70 80" fill="none"><polygon points="35,4 67,21 67,59 35,76 3,59 3,21" stroke="white" strokeWidth="1" fill="rgba(232,25,44,0.05)"/></svg>
        </div>
        <div className="bg-hex-3 absolute pointer-events-none" style={{ top:'8%',left:'12%',opacity:0.08 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none"><rect x="10" y="10" width="60" height="60" rx="4" stroke="#E8192C" strokeWidth="1" fill="none" transform="rotate(15 40 40)"/><rect x="20" y="20" width="40" height="40" rx="2" stroke="rgba(232,25,44,0.4)" strokeWidth="0.5" fill="none" transform="rotate(30 40 40)"/></svg>
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ opacity:0.025 }}>
          <div style={{ position:'absolute',top:'-50%',left:'-20%',width:'140%',height:'200%',background:'repeating-linear-gradient(45deg, transparent, transparent 80px, rgba(232,25,44,0.8) 80px, rgba(232,25,44,0.8) 81px)' }} />
        </div>
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p,i)=>(<div key={i} className="particle" style={{ width:p.w,height:p.h,left:p.left,top:p.top,background:p.color }} />))}
        </div>
        <div className="absolute pointer-events-none" style={{ top:24,right:24,opacity:0.2 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M40 0H20V6H34V20H40V0Z" fill="#E8192C"/></svg>
        </div>
        <div className="absolute pointer-events-none" style={{ bottom:24,left:24,opacity:0.2 }}>
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none"><path d="M0 40H20V34H6V20H0V40Z" fill="#E8192C"/></svg>
        </div>
        <div className="absolute pointer-events-none" style={{ top:'38%',left:0,right:0,height:1,background:'linear-gradient(90deg, transparent 0%, rgba(232,25,44,0.08) 20%, rgba(232,25,44,0.12) 50%, rgba(232,25,44,0.08) 80%, transparent 100%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:'url("https://res.cloudinary.com/drzoiigek/image/upload/v1774443807/qnttvgu1a2btbfrnes0z.jpg")',backgroundSize:'cover',backgroundPosition:'center',maskImage:'linear-gradient(105deg, transparent 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.25) 100%)',WebkitMaskImage:'linear-gradient(105deg, transparent 0%, rgba(0,0,0,0.08) 30%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.4) 75%, rgba(0,0,0,0.25) 100%)' }} />
        <div className="absolute inset-0" style={{ background:'linear-gradient(105deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.85) 40%, rgba(8,8,8,0.4) 65%, rgba(8,8,8,0.05) 100%)' }} />
        <div className="absolute inset-0" style={{ background:'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.6) 25%, transparent 55%)' }} />
        <div className="absolute bottom-0 left-0 w-full max-w-[600px] h-[400px] pointer-events-none" style={{ background:'radial-gradient(ellipse at 0% 100%, rgba(12,155,332,0.15) 0%, transparent 70%)' }} />
        <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,opacity:0.6 }} />

        {/* ══════════════════════════════════════
            CONTENT
        ══════════════════════════════════════ */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[70vh] px-6 py-8 md:py-12 text-center">

          {/* Eyebrow */}
          <div className="anim-eyebrow mb-7">
            <div className="eyebrow-pill">
              <span className="live-ring" style={{ display:'inline-block',width:7,height:7,borderRadius:'50%',background:'#E8192C',flexShrink:0 }} />
              <span style={{ fontFamily:"'DM Sans', sans-serif",fontSize:11,fontWeight:500,letterSpacing:'0.22em',color:'rgba(255,255,255,0.55)',textTransform:'uppercase' }}>
                Live · Sports · News · Entertainment
              </span>
            </div>
          </div>

          {/* ── HEADLINE — 3-line stacked typewriter ── */}
          <h1
            className={exiting ? 'tw-all-exit' : ''}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              fontSize: 'clamp(58px, 13vw, 138px)',
              lineHeight: 0.88,
              letterSpacing: '-0.02em',
              textTransform: 'uppercase',
              marginBottom: 2,
              minHeight: '2.4em',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Line 1 — MEDIA (full line, stays visible) */}
            <div style={{ display: 'block', paddingBottom: '0.05em', minHeight: '1em' }}>
              <span className="text-media">{line1}</span>
              {/* cursor only while typing line1 */}
              {line1.length > 0 && line1.length < 5 && (
                <span className="tw-cursor" style={{ height: '0.75em', background: '#fff' }} />
              )}
            </div>

            {/* Line 2 — SPORTS + INFOS inline */}
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 'clamp(10px, 2vw, 24px)',
              paddingBottom: '0.05em',
              minHeight: '1em',
            }}>
              {/* SPORTS */}
              <span className="text-sports">{line2}</span>

              {/* Cursor between Sports and Infos while Sports is typing */}
              {line2.length > 0 && line2.length < 6 && line3.length === 0 && (
                <span className="tw-cursor" style={{ height: '0.75em', background: '#E8192C' }} />
              )}

              {/* Thin separator — appears only once Sports is full */}
              {line2.length === 6 && (
                <span style={{
                  display: 'inline-block',
                  width: 3, alignSelf: 'center',
                  height: '0.5em',
                  background: 'rgba(255,255,255,0.18)',
                  borderRadius: 2,
                  flexShrink: 0,
                }} />
              )}

              {/* INFOS — inline after separator */}
              {line3.length > 0 && (
                <>
                  <span className="text-infos">{line3}</span>
                  {/* cursor while infos typing */}
                  {line3.length < 5 && (
                    <span className="tw-cursor" style={{ height: '0.75em', background: 'rgba(120,160,255,0.85)' }} />
                  )}
                </>
              )}
            </div>
          </h1>

          {/* Subtext */}
          <div className="anim-sub" style={{ marginBottom:40 }}>
            {/* Brand tag */}
            <div style={{ display:'flex',alignItems:'center',gap:10,justifyContent:'center',marginBottom:12 }}>
              <div style={{ width:20,height:1,background:'rgba(232,25,44,0.55)' }} />
              <span style={{ fontFamily:"'DM Sans', sans-serif",fontSize:10,fontWeight:500,letterSpacing:'0.28em',color:'rgba(232,25,44,0.75)',textTransform:'uppercase' }}>MSI TV</span>
              <div style={{ width:20,height:1,background:'rgba(232,25,44,0.55)' }} />
            </div>
            <p style={{ fontFamily:"'DM Sans', sans-serif",fontSize:'clamp(13px,1.8vw,15px)',fontWeight:300,color:'rgba(255,255,255,0.48)',maxWidth:460,lineHeight:1.8,margin:'0 auto' }}>
              Live matches, expert analysis,{' '}
              <span style={{ color:'rgba(255,255,255,0.78)',fontWeight:400 }}>the stories behind every goal.</span>
            </p>
          </div>

          {/* ── BUTTONS ── */}
          <div className="anim-btns" style={{ display:'flex',flexWrap:'wrap',gap:12,justifyContent:'center',marginBottom:64 }}>

            {/* Watch Live */}
            <a href="/livetv">
              <button
                className="btn-watch flex items-center justify-center gap-2.5 text-white px-8 py-4 rounded-full whitespace-nowrap"
                style={{ fontFamily:"'Barlow Condensed', sans-serif",fontSize:14,fontWeight:700,letterSpacing:'0.12em' }}
              >
                <span className="live-ring" style={{ display:'inline-block',width:8,height:8,borderRadius:'50%',background:'rgba(255,200,200,0.9)',flexShrink:0 }} />
                WATCH LIVE
                <Play size={16} fill="white" color="white" />
              </button>
            </a>

            {/* Schedule */}
            <a href="/programs">
              <button
                className="btn-schedule flex items-center justify-center gap-2.5 text-white/70 hover:text-white px-8 py-4 rounded-full whitespace-nowrap"
                style={{ fontFamily:"'DM Sans', sans-serif",fontSize:14,fontWeight:400 }}
              >
                <Calendar size={17} />
                Today's Schedule
              </button>
            </a>
          </div>

          {/* ── STATS ── */}
          <div style={{ display:'flex',flexWrap:'wrap',justifyContent:'center',borderTop:'1px solid rgba(255,255,255,0.055)',paddingTop:28,maxWidth:600,width:'100%',margin:'0 auto' }}>
            {stats.map((stat,i) => (
              <div key={i} className={`stat-item anim-stat-${i}`} style={{ flex:'1 1 120px',textAlign:'center' }}>
                <p
                  className="stat-value"
                  style={{ fontFamily:"'Barlow Condensed', sans-serif",fontSize:'clamp(28px,5.5vw,40px)',fontWeight:800,lineHeight:1,marginBottom:6,letterSpacing:'-0.01em' }}
                >
                  {stat.value}
                </p>
                <p style={{ fontFamily:"'DM Sans', sans-serif",fontSize:10,fontWeight:400,color:'rgba(255,255,255,0.28)',letterSpacing:'0.2em',textTransform:'uppercase' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

        </div>

        {/* Vertical lines */}
        <div className="absolute left-12 top-0 bottom-0 w-px hidden xl:block" style={{ background:'linear-gradient(to bottom, transparent, rgba(232,25,44,0.25) 30%, rgba(232,25,44,0.1) 70%, transparent)' }} />
        <div className="absolute right-12 top-0 bottom-0 w-px hidden xl:block" style={{ background:'linear-gradient(to bottom, transparent, rgba(232,25,44,0.15) 30%, rgba(232,25,44,0.05) 70%, transparent)' }} />

      </section>
    </>
  );
};

export default HeroSection;