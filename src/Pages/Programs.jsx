import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  Play,
  ChevronRight,
  Radio,
  Bell,
  Info,
  Calendar,
  Clock,
  ExternalLink,
  History,
  X,
} from "lucide-react";
import { useEffect } from "react";

// ─────────────────────────── STYLES ───────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

  @keyframes livePulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.4; transform: scale(1.4); }
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  
  .font-anton  { font-family: 'Anton', sans-serif; }
  .font-outfit { font-family: 'Outfit', sans-serif; }

  .live-dot { animation: livePulse 1.8s ease-in-out infinite; }

  .fade-up {
    animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both;
  }
  ${[...Array(12)].map((_, i) => `.fade-up:nth-child(${i + 1}) { animation-delay: ${i * 50}ms; }`).join("\n")}

  .prog-img { transition: transform 0.6s ease, opacity 0.35s ease; }
  .prog-card:hover .prog-img { transform: scale(1.08); opacity: 0.85; }
  
  .prog-card { transition: all 0.3s ease; }

  .live-shimmer::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    animation: shimmer 2.4s ease-in-out infinite;
  }

  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

function ProgramRow({ prog, index }) {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState(false);
  const isEven = index % 2 === 0;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`prog-card fade-up group relative flex flex-col md:flex-row
        rounded-2xl overflow-hidden cursor-pointer border mb-4
        ${prog.live
          ? "bg-zinc-900 border-red-500/30 hover:border-red-500/50 shadow-lg shadow-red-900/10"
          : "bg-zinc-900/40 border-white/[0.05] hover:border-white/[0.15] hover:bg-zinc-900/60"
        }`}
      style={{ animationDelay: `${index * 60}ms` }}
    >
      {/* Live shimmer overlay */}
      {prog.live && (
        <div className="live-shimmer absolute inset-0 pointer-events-none overflow-hidden rounded-2xl z-10" />
      )}

      {/* Background Gradient based on themecolor */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `linear-gradient(${isEven ? "90deg" : "-90deg"}, ${prog.themecolor}, transparent)`,
        }}
      />

      {/* Image Section */}
      <div className="relative w-full md:w-72 shrink-0 h-48 md:h-auto overflow-hidden bg-zinc-800">
        <img
          src={prog.image}
          alt={prog.name}
          className={`prog-img absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${prog.live ? "opacity-100" : "opacity-80"}`}
        />

        {/* Gradient overlay on image — desktop */}
        <div
          className={`absolute inset-[-1em] ${
            isEven
              ? "bg-gradient-to-r from-transparent via-transparent to-zinc-900/90"
              : "bg-gradient-to-l from-transparent via-transparent to-zinc-900/90"
          } hidden md:block`}
        />

        {/* Gradient overlay on image — mobile */}
        <div className="absolute inset-[-1em] bg-gradient-to-t from-zinc-900 via-transparent to-transparent md:hidden" />

        {/* LIVE badge */}
        {prog.live && (
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-600 px-3 py-1 rounded-full shadow-xl z-20">
            <span className="live-dot w-2 h-2 rounded-full bg-white shrink-0" />
            <span className="font-anton text-[10px] text-white tracking-widest uppercase">LIVE</span>
          </div>
        )}

        {/* Time overlay */}
        <div className="absolute bottom-4 left-4 md:left-0 md:right-0 md:text-center z-20">
          <span className="font-anton text-2xl text-white tracking-wider drop-shadow-2xl">
            {prog.time}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-6 min-w-0 relative z-20">

        {/* Category badge — themecolor gradient */}
        <div className="flex items-center gap-3 mb-3">
          <span
            className="font-outfit text-[10px] font-bold px-2.5 py-0.5 rounded-full tracking-widest uppercase"
            style={{
              background: `linear-gradient(135deg, ${prog.themecolor}33, ${prog.themecolor}11)`,
              color: prog.themecolor,
              border: `1px solid ${prog.themecolor}44`,
            }}
          >
            {prog.tag}
          </span>
          <span className="font-outfit text-[11px] text-white/30 flex items-center gap-1.5 font-medium">
            <Clock size={12} className="text-white/20" />
            {prog.duration}
          </span>
        </div>

        <h3
          className={`font-anton text-2xl md:text-3xl leading-tight mb-3 transition-colors duration-300 ${
            hovered ? "text-red-500" : "text-white"
          }`}
        >
          {prog.name}
        </h3>

        <p className="font-outfit text-sm text-white/40 leading-relaxed mb-6 line-clamp-2 max-w-xl">
          {prog.desc}
        </p>

        <div className="flex items-center gap-4">
          {prog.live ? (
            <button
              onClick={(e) => e.stopPropagation()}
              className="group/btn flex items-center gap-2.5 bg-red-600 hover:bg-red-500 text-white px-6 py-2.5 rounded-full font-outfit text-xs font-bold transition-all shadow-[0_8px_20px_rgba(239,68,68,0.3)] hover:shadow-red-500/40"
            >
              <Radio size={14} className="animate-pulse" />
              WATCH LIVE NOW
            </button>
          ) : (
            <a href={`/replay?show=${encodeURIComponent(prog.name)}`}>
              <button
                onClick={(e) => {
                  navigate(`/replay?show=${encodeURIComponent(prog.name)}`);
                }}
                className="flex items-center gap-2.5 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white px-5 py-2.5 rounded-full font-outfit text-xs font-bold transition-all border border-white/5"
              >
                <History size={14} />
                REPLAY
              </button>
            </a>
          )}
        </div>
      </div>

      {/* Bottom status bar — uses themecolor */}
      <div
        className="absolute bottom-0 left-0 h-1 transition-all duration-500 ease-out"
        style={{
          width: hovered ? "100%" : "0%",
          backgroundColor: prog.themecolor,
          opacity: 0.8,
        }}
      />

      {/* Side color bar — uses themecolor */}
      <div
        className={`absolute top-0 bottom-0 w-1 ${isEven ? "left-0" : "right-0"} hidden md:block`}
        style={{ backgroundColor: prog.themecolor }}
      />
    </div>
  );
}

export default function Programs() {
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const [selectedDay, setSelectedDay] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(false);

  // Set current day on mount
  useEffect(() => {
    const today = new Date().toLocaleString("en-US", { weekday: "long" });
    setSelectedDay(today);
  }, []);

  // Fetch schedule
  useEffect(() => {
    if (!selectedDay) return;

    const fetchSchedule = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:3002/api/msi/getallschedule`);
        const data = await res.json();
        setSchedule(data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedDay]);

  // Filter by selected day + sort chronologically by time
  const filteredSchedule = Array.isArray(schedule)
    ? schedule
        .filter((s) => s && s.day === selectedDay)
        .sort((a, b) => {
          const toMins = (t = "") => {
            const [h, m] = t.split(":").map(Number);
            return (h || 0) * 60 + (m || 0);
          };
          return toMins(a.time) - toMins(b.time);
        })
    : [];

  return (
    <div className="min-h-screen bg-black text-white font-outfit selection:bg-red-600/30">
      <style>{STYLES}</style>

      {/* Hero Header */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-red-600/10 via-black to-black pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="block h-px w-12 bg-red-600" />
            <span className="font-anton text-red-600 text-sm tracking-[0.3em] uppercase">Broadcast Guide</span>
            <span className="block h-px w-12 bg-red-600" />
          </div>
          <h1 className="font-anton text-5xl md:text-8xl text-white uppercase mb-8 tracking-tight">
            Weekly <span className="text-red-600">Programs</span>
          </h1>
        </div>
      </div>

      {/* Day Selector */}
      <div className="sticky top-20 z-40 bg-black/90 backdrop-blur-xl border-y border-white/5 mb-12">
        <div className="max-w-7xl mx-auto px-4 flex justify-center">
          <div className="flex items-center gap-1 md:gap-4 overflow-x-auto scrollbar-hide py-4 px-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`flex-shrink-0 px-5 md:px-8 py-2 md:py-3 rounded-full font-bold transition-all duration-300 text-sm md:text-base border ${
                  selectedDay === day
                    ? "bg-red-600 text-white border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.3)]"
                    : "bg-transparent text-gray-500 border-transparent hover:text-white hover:bg-white/5"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 md:px-6 pb-24">

        {/* Date Context Header */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <div className="flex items-center gap-2 text-gray-400">
            <Calendar size={18} className="text-red-500" />
            <span className="font-bold text-sm tracking-widest uppercase">{selectedDay} Schedule</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-gray-500 text-xs">
            <Clock size={14} />
            <span>Timezone: GMT +1</span>
          </div>
        </div>

        {/* Programs List */}
        <div className="flex flex-col gap-2">
          {loading ? (
            <div className="text-center py-32">
              <p className="font-outfit text-gray-500 animate-pulse">Loading schedule…</p>
            </div>
          ) : filteredSchedule.length > 0 ? (
            filteredSchedule.map((program, i) => (
              <ProgramRow key={program.schedule_id} prog={program} index={i} />
            ))
          ) : (
            <div className="text-center py-32 bg-zinc-900/30 rounded-3xl border border-white/5">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="text-gray-700" size={40} />
              </div>
              <h3 className="font-anton text-2xl text-white/50 mb-2">No Broadcasts Today</h3>
              <p className="text-gray-600 text-sm">Please check back later for the updated schedule.</p>
            </div>
          )}
        </div>

        {/* Promo Banner */}
        <div className="mt-24 relative rounded-[2rem] overflow-hidden bg-gradient-to-br from-red-600 to-red-900 p-8 md:p-12 shadow-2xl">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
              <h2 className="font-anton text-3xl md:text-5xl text-white mb-4 leading-tight">
                NEVER MISS <br />A MOMENT
              </h2>
              <p className="text-white/80 font-medium text-lg mb-8 max-w-md">
                Get our mobile app to set live alerts and stream MSI TV on the go.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button className="flex items-center gap-3 px-8 py-3 bg-white text-red-700 rounded-full font-bold hover:bg-gray-100 transition-all shadow-lg">
                  <ExternalLink size={20} />
                  APP STORE
                </button>
                <button className="flex items-center gap-3 px-8 py-3 bg-red-800 text-white rounded-full font-bold hover:bg-red-700 transition-all border border-red-500/30">
                  <ExternalLink size={20} />
                  PLAY STORE
                </button>
              </div>
            </div>
            <div className="hidden lg:block relative">
              <div className="w-72 h-48 bg-black/40 backdrop-blur-md rounded-2xl border border-white/10 p-4 rotate-3 shadow-2xl">
                <div className="w-full h-full bg-red-600/20 rounded-lg flex items-center justify-center">
                  <Play fill="white" size={48} className="text-white" />
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-72 h-48 bg-zinc-900 rounded-2xl border border-white/10 p-4 -rotate-3 shadow-2xl">
                <div className="w-full h-3 bg-white/5 rounded mb-2" />
                <div className="w-2/3 h-3 bg-white/5 rounded mb-4" />
                <div className="flex gap-2">
                  <div className="w-10 h-10 bg-red-600 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <div className="w-full h-2 bg-white/10 rounded" />
                    <div className="w-1/2 h-2 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}