import { useEffect, useState } from "react";
import { Play, Clock, ChevronRight, Radio, Calendar } from "lucide-react";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes livePulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.3; transform: scale(1.5); }
    }
    @keyframes shimmer {
      0%   { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }

    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    .fade-up { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }

    .live-dot  { animation: livePulse 1.8s ease-in-out infinite; }

    .prog-img  { transition: transform 0.6s ease, opacity 0.35s ease; }
    .prog-card:hover .prog-img  { transform: scale(1.08); opacity: 0.85; }

    .prog-card { transition: border-color 0.2s ease, box-shadow 0.2s ease, background 0.2s ease; }

    .live-shimmer::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(90deg, transparent, rgba(239,68,68,0.08), transparent);
      animation: shimmer 2.4s ease-in-out infinite;
    }
  `}</style>
);

const categoryStyle = {
  Football:   "bg-red-500/15 text-red-400 border-red-500/25",
  Basketball: "bg-orange-500/15 text-orange-400 border-orange-500/25",
  Tennis:     "bg-yellow-500/15 text-yellow-400 border-yellow-500/25",
  News:       "bg-sky-500/15 text-sky-400 border-sky-500/25",
  Analysis:   "bg-violet-500/15 text-violet-400 border-violet-500/25",
  Highlights: "bg-emerald-500/15 text-emerald-400 border-emerald-500/25",
};

function ProgramCard({ prog, index }) {
  const [hovered, setHovered] = useState(false);
  const isLive = prog.live;
  const cat = "bg-white/10 text-white/50 border-white/10";
  const isEven = index % 2 === 0;

  return (
    <div
      className={`prog-card fade-up group relative flex ${isEven ? "flex-row" : "flex-row-reverse"} 
        rounded-2xl overflow-hidden cursor-pointer border
        ${isLive
          ? "bg-zinc-900 border-red-500/30 hover:border-red-500/55 hover:shadow-[0_16px_48px_rgba(239,68,68,0.12)]"
          : "bg-zinc-900 border-white/[0.06] hover:border-white/[0.14] hover:shadow-[0_16px_48px_rgba(0,0,0,0.45)]"
        }`}
      style={{ animationDelay: `${index * 60}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Live shimmer overlay */}
      {isLive && <div className="live-shimmer absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10" />}

      {/* Image */}
      <div className="relative w-48 md:w-64 shrink-0 overflow-hidden bg-zinc-800">
        <img
          src={prog.image}
          alt={prog.title}
          className={`prog-img absolute inset-0 w-full h-full object-cover ${isLive ? "opacity-95" : "opacity-90"}`}
        />
        {/* gradient toward content */}
        <div className={`absolute inset-[-5em] ${isEven
          ? "bg-gradient-to-r from-transparent to-zinc-900"
          : "bg-gradient-to-l from-transparent to-zinc-900"
        }`} />

        {/* LIVE badge on image */}
        {isLive && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-600 px-2.5 py-1 rounded-full shadow-[0_4px_12px_rgba(239,68,68,0.5)] z-20">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-white shrink-0" />
            <span className="font-anton text-[9px] text-white tracking-widest">LIVE</span>
          </div>
        )}

        {/* Time overlay on image bottom */}
        <div className="absolute bottom-3 left-0 right-0 flex justify-center">
          <span className="font-anton text-xl text-white/80 tracking-wider drop-shadow-lg">
            {prog.time}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 py-5 min-w-0 relative z-20">
        {/* Top row */}
        <div className="flex items-center gap-2 mb-3">
          <span className={`font-outfit text-[10px] font-600 px-2.5 py-0.5 rounded-full border tracking-wide ${cat}`}>
            {prog.tag}
          </span>
          <span className="font-outfit text-[11px] text-white/25 flex items-center gap-1">
            <Clock size={10} />
            {prog.duration}
          </span>
        </div>

        {/* Title */}
        <h3 className={`font-anton text-xl md:text-2xl leading-tight mb-2 transition-colors duration-200 (isLive ? "text-red-400" : "text-red-400") text-white`}>
          {prog.name}
        </h3>

        {/* Description */}
        <p className="font-outfit text-sm text-white/40 leading-relaxed mb-4 line-clamp-2">
          {prog.desc}
        </p>

        {/* Action */}
        {isLive ? (
          <div>
            <button className="font-outfit inline-flex items-center gap-2 bg-red-600 hover:bg-red-500 text-white text-xs font-600 px-4 py-2 rounded-full transition-colors shadow-[0_4px_14px_rgba(239,68,68,0.35)]">
              <Radio size={11} className="animate-pulse" />
              Watch Live Now
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button className={`font-outfit inline-flex items-center gap-2 text-xs font-500 px-4 py-2 rounded-full border transition-all
              ${hovered
                ? "bg-white/[0.08] border-white/20 text-white/80"
                : "bg-transparent border-white/[0.08] text-white/35"
              }`}>
              <Play size={10} />
              Replay
            </button>
            <span className="font-outfit text-[11px] text-white/20 flex items-center gap-1">
              <Calendar size={10} />
              {prog.occurence}
            </span>
          </div>
        )}
      </div>

      {/* Hover arrow */}
      <div className={`absolute ${isEven ? "right-5" : "right-5"} top-1/2 -translate-y-1/2 transition-all duration-200 z-20
        ${hovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center
          ${isLive ? "bg-red-600" : "bg-white/10"}`}>
          <ChevronRight size={14} className="text-white" />
        </div>
      </div>
    </div>
  );
}

export default function ProgramSection() {

  const [programsData, setProgramsData] = useState([]);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3002/api/msi/getallprogram?limit=6');
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();

      // Sort by time smallest → biggest
      const sorted = (result.data || []).sort((a, b) => {
        const toMins = (t = '') => {
          const [h, m] = (t || '').split(':').map(Number);
          return (h || 0) * 60 + (m || 0);
        };
        return toMins(a.time) - toMins(b.time);
      });

      setProgramsData(sorted);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, []);

  return (
    <section className="bg-zinc-950 min-h-screen">
      <FontImport />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">

        {/* Header */}
        <div className="fade-up flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block h-px w-8 bg-red-500" />
              <span className="font-anton text-red-500 text-xs tracking-[0.25em] uppercase">On Air</span>
            </div>
            <h2 className="font-anton text-white text-5xl md:text-6xl leading-none">
              OUR <span className="text-red-500 font-bold">PROGRAMMES</span>
            </h2>
          </div>

          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 font-outfit text-sm text-white/35 hover:text-white/75 transition-colors"
          >
            Full Schedule
            <ChevronRight size={14} />
          </a>
        </div>

        {/* Program list */}
        <div className="flex flex-col gap-4">
          {programsData.map((prog, i) => (
            <ProgramCard key={i} prog={prog} index={i} />
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 flex sm:hidden justify-center">
          <a
            href="#"
            className="font-outfit inline-flex items-center gap-2 border border-white/10 text-white/40 hover:text-white/75 hover:border-white/20 rounded-full px-5 py-2.5 text-sm transition-all"
          >
            Full Schedule
            <ChevronRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}