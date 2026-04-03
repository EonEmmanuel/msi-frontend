import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CalendarDaysIcon, EyeIcon, PlayCircleIcon } from 'lucide-react';

/* ── keyframes injected once ── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:ital,wght@0,700;0,800;0,900;1,800&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(28px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes heroSlideRight {
    from { opacity: 0; transform: translateX(32px); }
    to   { opacity: 1; transform: translateX(0); }
  }
  @keyframes heroPulse {
    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(232,25,44,0.7); }
    50%       { opacity: 0.7; box-shadow: 0 0 0 6px rgba(232,25,44,0); }
  }
  @keyframes scanline {
    0%   { transform: translateY(-100%); }
    100% { transform: translateY(400%); }
  }
  @keyframes countUp {
    from { opacity: 0; transform: translateY(12px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes waveBar {
    0%, 100% { transform: scaleY(0.4); }
    50%       { transform: scaleY(1); }
  }
  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50%       { background-position: 100% 50%; }
  }

  .hero-fade-up   { animation: heroFadeUp 0.7s cubic-bezier(.22,1,.36,1) both; }
  .hero-slide-r   { animation: heroSlideRight 0.65s cubic-bezier(.22,1,.36,1) both; }
  .delay-0   { animation-delay: 0ms; }
  .delay-100 { animation-delay: 100ms; }
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 320ms; }
  .delay-400 { animation-delay: 440ms; }
  .delay-500 { animation-delay: 560ms; }
  .delay-600 { animation-delay: 700ms; }

  .live-ring {
    animation: heroPulse 2s ease-in-out infinite;
  }

  .scanline-sweep {
    position: absolute; inset: 0; overflow: hidden; pointer-events: none; border-radius: inherit;
  }
  .scanline-sweep::after {
    content: '';
    position: absolute; left: 0; right: 0; height: 40%;
    background: linear-gradient(to bottom, transparent, rgba(255,255,255,0.03), transparent);
    animation: scanline 3.5s ease-in-out infinite;
  }

  .wave-bar {
    display: inline-block;
    width: 3px;
    height: 14px;
    border-radius: 2px;
    background: #E8192C;
    transform-origin: bottom;
  }
  .wave-bar:nth-child(1) { animation: waveBar 0.8s ease-in-out infinite 0s; }
  .wave-bar:nth-child(2) { animation: waveBar 0.8s ease-in-out infinite 0.15s; }
  .wave-bar:nth-child(3) { animation: waveBar 0.8s ease-in-out infinite 0.3s; }
  .wave-bar:nth-child(4) { animation: waveBar 0.8s ease-in-out infinite 0.45s; }

  .headline-gradient {
    background: linear-gradient(135deg, #ffffff 0%, #e8e8e8 40%, #ffffff 80%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 4s ease infinite;
  }
  .headline-red {
    background: linear-gradient(135deg, #E8192C 0%, #ff4d5e 50%, #E8192C 100%);
    background-size: 200% 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: gradientShift 3s ease infinite;
  }

  .glass-live {
    background: rgba(14, 14, 14, 0.72);
    backdrop-filter: blur(20px) saturate(1.8);
    -webkit-backdrop-filter: blur(20px) saturate(1.8);
    border: 1px solid rgba(255,255,255,0.08);
  }

  .score-glow {
    text-shadow: 0 0 20px rgba(255,255,255,0.25);
  }

  .btn-watch {
    background: linear-gradient(135deg, #E8192C, #c4101e);
    box-shadow: 0 8px 32px rgba(232,25,44,0.4), inset 0 1px 0 rgba(255,255,255,0.15);
    transition: all 0.2s ease;
  }
  .btn-watch:hover {
    box-shadow: 0 12px 40px rgba(232,25,44,0.55), inset 0 1px 0 rgba(255,255,255,0.15);
    transform: translateY(-1px);
  }
  .btn-watch:active { transform: translateY(0); }

  .btn-schedule {
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.12);
    backdrop-filter: blur(12px);
    transition: all 0.2s ease;
  }
  .btn-schedule:hover {
    background: rgba(255,255,255,0.1);
    border-color: rgba(255,255,255,0.22);
  }

  .stat-divider::before {
    content: '';
    display: block;
    width: 1px;
    height: 28px;
    background: rgba(255,255,255,0.1);
    margin-bottom: 8px;
  }

  .diagonal-cut {
    clip-path: polygon(0 0, 100% 0, 100% 88%, 0 100%);
  }
  @media (max-width: 768px) {
    .diagonal-cut { clip-path: polygon(0 0, 100% 0, 100% 94%, 0 100%); }
  }
`;

const stats = [
  { value: '24/7', label: 'Live Broadcast' },
  { value: '50+',  label: 'Sports Covered' },
  { value: '2.4M', label: 'Monthly Viewers' },
  { value: '12',   label: 'Leagues Followed' },
];

export default function HeroSection() {
  const [viewers, setViewers] = useState(142380);

  /* Simulate live viewer count drift */
  useEffect(() => {
    const id = setInterval(() => {
      setViewers((v) => v + Math.floor(Math.random() * 40 - 15));
    }, 2800);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <style>{STYLES}</style>

      <section
        className="relative w-full min-h-[95vh] diagonal-cut overflow-hidden"
        style={{ background: '#080808' }}
      >
        {/* ── Background image ── */}
        <img
          src="https://img.rocket.new/generatedImages/rocket_gen_img_193c682ef-1771574869268.png"
          alt="Packed football stadium with bright floodlights"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: 0.45 }}
        />

        {/* ── Layered atmospheric overlays ── */}
        {/* Main left-to-right fade */}
        <div
          className="absolute inset-0"
          /*
           style={{
            background: 'linear-gradient(105deg, rgba(8,8,8,0.97) 0%, rgba(8,8,8,0.82) 38%, rgba(8,8,8,0.35) 65%, rgba(8,8,8,0.05) 100%)',
          }}
           */
        />
        {/* Bottom fade */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(8,8,8,1) 0%, rgba(8,8,8,0.55) 22%, transparent 50%)',
          }}
        />
        {/* Subtle red vignette bottom-left */}
        <div
          className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at 0% 100%, rgba(232,25,44,0.12) 0%, transparent 65%)',
          }}
        />
        {/* Noise grain */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.035'/%3E%3C/svg%3E")`,
            opacity: 0.6,
          }}
        />

        {/* ── Decorative vertical rule ── */}
        <div
          className="absolute left-[52px] top-0 bottom-0 w-px hidden xl:block"
          style={{ background: 'linear-gradient(to bottom, transparent, rgba(232,25,44,0.35) 30%, rgba(232,25,44,0.15) 70%, transparent)' }}
        />

        
       
       {/*
          <div
          className="glass-live absolute top-8 right-6 md:right-10 xl:right-16 rounded-2xl p-5 w-[240px] md:w-[268px] z-20 hidden md:block hero-slide-r delay-500"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)' }}
        >
          <div className="scanline-sweep rounded-2xl" />

          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="w-2 h-2 rounded-full bg-[#E8192C] flex-shrink-0 live-ring"
                  style={{ boxShadow: '0 0 0 0 rgba(232,25,44,0.7)' }}
                />
                <span
                  className="text-[#E8192C] uppercase"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, fontWeight: 800, letterSpacing: '0.2em' }}
                >
                  On Air Now
                </span>
              </div>
              <h3
                className="text-white leading-tight"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 16, fontWeight: 700 }}
              >
                CAF Champions League
              </h3>
            </div>
            <Link
              to="/live-tv"
              className="w-8 h-8 rounded-full bg-[#E8192C] flex items-center justify-center flex-shrink-0 ml-2 transition-all hover:scale-110"
              style={{ boxShadow: '0 4px 16px rgba(232,25,44,0.45)' }}
            >
              <PlayCircleIcon size={14} className="text-white" />
            </Link>
          </div>

          <div
            className="flex items-center justify-between rounded-xl p-3.5 mb-3.5"
            style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)' }}
          >
            <div className="text-center">
              <p className="text-white/40 mb-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10 }}>Zamalek</p>
              <p
                className="text-white score-glow"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, fontWeight: 900, lineHeight: 1 }}
              >
                1
              </p>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span
                className="text-[#E8192C] px-2.5 py-1 rounded-full"
                style={{
                  fontFamily: "'Barlow Condensed', sans-serif",
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  background: 'rgba(232,25,44,0.12)',
                  border: '1px solid rgba(232,25,44,0.25)',
                }}
              >
                67′
              </span>
              <div className="flex items-end gap-0.5">
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
                <span className="wave-bar" />
              </div>
            </div>

            <div className="text-center">
              <p className="text-white/40 mb-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10 }}>Al Ahly</p>
              <p
                className="text-white score-glow"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 30, fontWeight: 900, lineHeight: 1 }}
              >
                1
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <EyeIcon size={11} className="text-white/35" />
            <span className="text-white/40 tabular-nums" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11 }}>
              {viewers.toLocaleString()} watching
            </span>
            <span
              className="ml-auto text-white/25"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10 }}
            >
              HD
            </span>
          </div>
        </div>

        */}

        {/* ── Main hero content ── */}
        <div className="relative z-10 flex flex-col justify-end min-h-[80vh] py-2 max-w-[1400px] mx-auto px-6 md:px-12 xl:px-20 pb-20 md:pb-28">

          {/* Live badge */}
          <div className="hero-fade-up delay-0 flex items-center gap-3 mb-5">
            <span
              className="flex items-center gap-2 text-[#E8192C] uppercase px-3 py-1.5 rounded-full"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 11,
                fontWeight: 800,
                letterSpacing: '0.18em',
                background: 'rgba(056,10,14,0.2)',
                border: '1px solid rgba(123,20,44,0.28)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8192C] live-ring" />
              Live Sports
            </span>
          </div>

          {/* Headline */}
          <h1
            className="hero-fade-up delay-100 mb-2 leading-[0.92]"
            style={{
              fontWeight: 900,
              fontSize: 'clamp(64px, 11vw, 136px)',
            }}
          >
            <span className="headline-gradient font-bold block">Media</span>
            <span className="flex">
              <span className="text-[#26059a] font-bold block pr-4">Sports</span>
              <span className="text-red-600 font-bold block">Info</span>
            </span>
          </h1>

          {/* Rule line */}
          <div className="hero-fade-up delay-200 flex items-center gap-4 my-6">
            <div className="h-px bg-[#E8192C] w-10" />
            <div className="h-px bg-white/10 flex-1 max-w-[320px]" />
          </div>

          {/* Subheading */}
          <p
            className="hero-fade-up delay-300 text-white/55 max-w-md mb-8 leading-relaxed"
            style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 300 }}
          >
            Live matches, expert analysis, and the stories behind every goal.{' '}
            <span className="text-white/80 font-medium">MehHom</span> — where champions are made.
          </p>

          {/* CTA buttons */}
          <div className="hero-fade-up delay-400 flex flex-wrap gap-3 mb-10">
            <Link
              to="/live-tv"
              className="btn-watch flex items-center gap-2.5 text-white px-7 py-3.5 rounded-full group"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}
            >
              <span className="w-2 h-2 rounded-full bg-white live-ring" />
              WATCH LIVE
              <PlayCircleIcon
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </Link>

            <Link
              to="/programs"
              className="btn-schedule flex items-center gap-2 text-white/70 hover:text-white px-7 py-3.5 rounded-full"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, fontWeight: 400 }}
            >
              <CalendarDaysIcon size={15} />
              Today's Schedule
            </Link>
          </div>

          {/* Stats strip */}
          <div className="hero-fade-up delay-500 flex items-center gap-0">
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && (
                  <div className="w-px h-8 bg-white/10 mx-5 hidden sm:block" />
                )}
                <div className="hidden sm:block">
                  <p
                    className="text-white leading-none mb-1"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: 24,
                      fontWeight: 800,
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-white/35 uppercase"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      letterSpacing: '0.12em',
                      fontWeight: 400,
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </React.Fragment>
            ))}

            {/* Mobile: show all stats stacked in a 2x2 grid */}
            <div className="sm:hidden grid grid-cols-2 gap-x-8 gap-y-4 w-full">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p
                    className="text-white leading-none mb-1"
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 26, fontWeight: 800 }}
                  >
                    {stat.value}
                  </p>
                  <p
                    className="text-white/35 uppercase"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 10, letterSpacing: '0.12em' }}
                  >
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}