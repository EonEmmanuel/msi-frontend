import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, Tv } from "lucide-react";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    /* ── Slide enter/exit ── */
    @keyframes slideEnterRight {
      from { opacity: 0; transform: translateX(60px) scale(0.97); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes slideEnterLeft {
      from { opacity: 0; transform: translateX(-60px) scale(0.97); }
      to   { opacity: 1; transform: translateX(0) scale(1); }
    }
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(18px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes scorePop {
      from { opacity: 0; transform: scale(0.7); }
      to   { opacity: 1; transform: scale(1); }
    }
    @keyframes livePulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239,68,68,0.7); }
      50%       { box-shadow: 0 0 0 10px rgba(239,68,68,0); }
    }
    @keyframes dotBlink {
      0%, 100% { opacity: 1; }
      50%       { opacity: 0.3; }
    }
    @keyframes progressMove {
      from { background-position: 0% 50%; }
      to   { background-position: 100% 50%; }
    }
    @keyframes bgShift {
      0%   { background-position: 0% 50%; }
      50%  { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    @keyframes countIn {
      from { opacity: 0; transform: translateY(10px) scale(0.85); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }

    .slide-from-right { animation: slideEnterRight 0.55s cubic-bezier(.22,1,.36,1) both; }
    .slide-from-left  { animation: slideEnterLeft  0.55s cubic-bezier(.22,1,.36,1) both; }
    .fade-up-d0  { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.05s both; }
    .fade-up-d1  { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.15s both; }
    .fade-up-d2  { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.25s both; }
    .fade-up-d3  { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) 0.38s both; }
    .score-pop   { animation: scorePop 0.45s cubic-bezier(.34,1.56,.64,1) 0.2s both; }
    .count-in    { animation: countIn 0.45s cubic-bezier(.22,1,.36,1) 0.1s both; }

    .live-dot { animation: dotBlink 1.2s ease-in-out infinite; }
    .live-card { animation: livePulse 2s ease-in-out infinite; }

    /* Nav buttons */
    .nav-btn {
      transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
    }
    .nav-btn:hover:not(:disabled) {
      transform: scale(1.08);
      box-shadow: 0 8px 24px rgba(239,68,68,0.4);
    }
    .nav-btn:active:not(:disabled) { transform: scale(0.96); }

    /* Dot indicator */
    .dot {
      transition: width 0.35s cubic-bezier(.22,1,.36,1), background 0.25s ease, opacity 0.25s;
    }
    .dot.active { width: 28px; background: #ef4444; }
    .dot.inactive { width: 8px; background: rgba(255,255,255,0.2); }

    /* Team name truncate on small */
    .team-name { line-height: 1.05; }
  `}</style>
);

export default function UpcomingFixtureSection() {
  const [current, setCurrent]   = useState(0);
  const [dir, setDir]           = useState("right");    // slide direction
  const [animKey, setAnimKey]   = useState(0);  

  const [matchesData, setMatchesData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3002/api/msi/getallfixture');
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const result = await response.json();
          setMatchesData(result);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

  const goTo = (idx, direction) => {
    setDir(direction);
    setAnimKey(k => k + 1);
    setCurrent(idx);
  };

  const prev = () => {
    if (current === 0) return;
    goTo(current - 1, "left");
  };

  const next = () => {
    if (current === total - 1) return;
    goTo(current + 1, "right");
  };

  /* keyboard navigation */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft")  prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current]);

  const matchfilter = matchesData.filter(match => match.upcoming === 'true' && !match.ft);

  const m = matchfilter[current];
  const slideClass = dir === "right" ? "slide-from-right" : "slide-from-left";

   const total = matchfilter.length;

  return (
    <section className="relative bg-black font-outfit overflow-hidden">
      <FontImport />

      {/* ── Section header ── */}
      <div className="max-w-7xl mx-auto px-5 pt-14 pb-6 flex items-end justify-between">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span className="block h-1 w-10 bg-red-500 rounded-full" />
            <span className="font-anton text-red-500 text-xs tracking-[0.25em] uppercase">On SI TV</span>
          </div>
          <h2 className="font-anton text-white text-4xl md:text-5xl leading-none">
            SUR <span style={{ WebkitTextStroke:'1px rgba(255,255,255,0.2)', color:'transparent' }}>MSI TV</span>
          </h2>
        </div>
      </div>

      {/* ── FULL-WIDTH FIXTURE CARD ── */}
      <div className="relative w-full px-4 md:px-6 lg:px-10 pb-10">
        <div
          key={animKey}
          className={`${slideClass} relative w-full rounded-3xl overflow-hidden`}
          style={{
            minHeight: 'clamp(220px, 44vw, 420px)',
            border: `1px solid 'rgba(255,255,255,0.07)'}`,
          }}
        >
          {/* Background gradient */}
          <div className={`absolute inset-0`}
           style={{
              background: `linear-gradient(to bottom right, ${m?.themecolor}33, ${m?.themecolor}99)`
            }} />

          {/* Noise texture */}
          <div className="absolute inset-0 pointer-events-none opacity-30"
            style={{ backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")` }} />

          {/* League color top bar */}
          <div className="absolute top-0 left-0 right-0 h-1 rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, ${m?.themecolor}, ${m?.themecolor}55, transparent)` }} />

          {/* Content */}
          <div className="relative z-10 h-full flex flex-col p-6 md:p-10 lg:p-14"
            style={{ minHeight: 'clamp(320px, 52vw, 520px)' }}>

            {/* Top row — league + live badge + tv icon */}
            <div className="fade-up-d0 flex items-center justify-between mb-6 md:mb-8">
              <div className="flex items-center gap-3">
                {/* League pill */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background:`${m?.themecolor}18`, border:`1px solid ${m?.themecolor}40` }}>
                  <span className="w-2 h-2 rounded-full" style={{ background: m?.themecolor }} />
                  <span className="font-outfit text-xs font-600 uppercase tracking-widest"
                    style={{ color: m?.themecolor }}>{m?.league_name}</span>
                </div>
              </div>

              {/* TV Watch icon */}
              <div className="flex items-center gap-2 text-white/30">
                <Tv size={16} />
                <span className="font-outfit text-xs text-white/40 hidden sm:block">Watch on MSI TV</span>
              </div>
            </div>

            {/* ── TEAMS vs SCORE — main area ── */}
            <div className="flex-1 flex items-center justify-between gap-4 md:gap-8">

              {/* Home Team */}
              <div className="fade-up-d1 flex flex-col items-center text-center gap-2 md:gap-4 flex-1">
                <div className="text-5xl md:text-7xl lg:text-8xl leading-none select-none"
                  style={{ filter:'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}>
                  <img src={m?.home_team_logo} alt={m?.home_team_name} className="w-40 h-40 object-contain" />
                </div>
                <div>
                  <p className="font-anton text-white text-xl md:text-3xl lg:text-4xl leading-none team-name">
                    {m?.home_team_abv}
                  </p>
                  <p className="font-outfit text-white/40 font-semibold text-md mt-1 hidden sm:block">{m?.home_team_name}</p>
                </div>
              </div>

              {/* Score / VS */}
              <div className="score-pop flex flex-col items-center gap-2 flex-shrink-0">
                    <span className="font-anton text-white/15 text-4xl md:text-6xl tracking-widest">VS</span>
                    <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
                      <Clock size={12} className="text-white/40" />
                      <span className="font-outfit text-white/60 text-sm font-semibold">{m?.time}</span>
                    </div>
              </div>

              {/* Away Team */}
              <div className="fade-up-d2 flex flex-col items-center text-center gap-2 md:gap-4 flex-1">
                <div className="text-5xl md:text-7xl lg:text-8xl leading-none select-none"
                  style={{ filter:'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}>
                  <img src={m?.away_team_logo} alt={m?.away_team_name} className="w-40 h-40 object-contain" />
                </div>
                <div>
                  <p className="font-anton text-white text-xl md:text-3xl lg:text-4xl leading-none team-name">
                    {m?.away_team_abv}
                  </p>
                  <p className="font-outfit text-white/40 text-md font-semibold mt-1 hidden sm:block">{m?.away_team_name}</p>
                </div>
              </div>
            </div>

            {/* ── Bottom meta row ── */}
            <div className="fade-up-d3 flex items-center justify-between mt-6 md:mt-8 pt-5"
              style={{ borderTop:`1px solid rgba(255,255,255,0.07)` }}>
              <div className="flex items-center gap-4 md:gap-6 text-white/40 text-xs">
                <div className="flex items-center gap-1.5">
                  <MapPin size={11} />
                  <span className="font-outfit hidden sm:block">{m?.venue}</span>
                  <span className="font-outfit sm:hidden">{m?.venue}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Users size={11} />
                  <span className="font-outfit">1M viewers</span>
                </div>
              </div>

              {/* Watch button */}
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-full font-outfit text-xs font-600 text-white uppercase tracking-wider transition-all duration-200 hover:scale-105"
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.12)'
                }}
              >
                <Tv size={13} />
                Watch
              </button>
            </div>
          </div>
        </div>

        {/* ── NAV BUTTONS & DOTS ── */}
        <div className="flex items-center justify-between mt-5 px-1">

          {/* Left arrow */}
          <button
            onClick={prev}
            disabled={current === 0}
            className="nav-btn flex items-center justify-center w-11 h-11 rounded-full border transition-all"
            style={{
              background: current === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(239,68,68,0.15)',
              border: current === 0 ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(239,68,68,0.4)',
              cursor: current === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <ChevronLeft size={18} color={current === 0 ? 'rgba(255,255,255,0.2)' : '#ef4444'} />
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {matchfilter.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i, i > current ? 'right' : 'left')}
                className={`dot h-2 rounded-full ${i === current ? 'active' : 'inactive'}`}
                style={{ outline: 'none' }}
              />
            ))}
          </div>

          {/* Right arrow */}
          <button
            onClick={next}
            disabled={current === total - 1}
            className="nav-btn flex items-center justify-center w-11 h-11 rounded-full border transition-all"
            style={{
              background: current === total - 1 ? 'rgba(255,255,255,0.03)' : 'rgba(239,68,68,0.85)',
              border: current === total - 1 ? '1px solid rgba(255,255,255,0.07)' : '1px solid rgba(239,68,68,0.6)',
              cursor: current === total - 1 ? 'not-allowed' : 'pointer',
              boxShadow: current === total - 1 ? 'none' : '0 4px 16px rgba(239,68,68,0.35)',
            }}
          >
            <ChevronRight size={18} color={current === total - 1 ? 'rgba(255,255,255,0.2)' : '#fff'} />
          </button>
        </div>
      </div>

      {/* Ambient glows */}
      <div className="absolute top-24 right-0 w-80 h-80 rounded-full pointer-events-none"
        style={{ background:`radial-gradient(ellipse, ${m?.leagueColor}08 0%, transparent 70%)` }} />
      <div className="absolute bottom-0 left-0 w-96 h-56 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(ellipse at 0% 100%, rgba(239,68,68,0.05) 0%, transparent 70%)' }} />
    </section>
  );
}
