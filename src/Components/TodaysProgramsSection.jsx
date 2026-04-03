import { useEffect, useState } from "react";
import { Play, ChevronRight, Radio } from "lucide-react";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

    @keyframes livePulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50%       { opacity: 0.4; transform: scale(1.4); }
    }
    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-12px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    .live-dot { animation: livePulse 1.8s ease-in-out infinite; }

    .prog-row {
      animation: slideIn 0.95s cubic-bezier(.22,1,.36,1) both;
    }
    ${[...Array(9)].map((_, i) => `.prog-row:nth-child(${i + 1}) { animation-delay: ${i * 55}ms; }`).join("\n")}

    .row-hover { transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease; }
    .row-hover:hover { transform: translateX(3px); }
  `}</style>
);

function ProgramRow({ prog }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`prog-row row-hover group flex items-center gap-4 px-5 py-4 rounded-2xl border cursor-pointer
        ${prog.live
          ? "bg-red-500/[0.07] border-red-500/30 hover:bg-red-500/[0.12] hover:border-red-500/50"
          : "bg-zinc-900 border-white/[0.06] hover:bg-zinc-800/70 hover:border-white/[0.12]"
        }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Time column */}
      <div className="font-outfit w-14 shrink-0 text-center">
        <p className={`text-sm font-700 tabular-nums ${prog.live ? "text-red-400" : "text-white/80"}`}>
          {prog.time}
        </p>
        {prog.live && (
          <div className="flex items-center justify-center gap-1 mt-1">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
            <span className="font-anton text-[9px] text-red-500 tracking-widest">LIVE</span>
          </div>
        )}
      </div>

      {/* Vertical rule */}
      <div className={`w-px h-9 shrink-0 rounded-full ${prog.live ? "bg-red-500/40" : "bg-white/10"}`} />

      {/* Title + meta */}
      <div className="flex-1 min-w-0">
        <h4 className={`font-outfit text-sm uppercase font-600 truncate mb-1.5 ${prog.live ? "text-white" : "text-white/80"}`}>
          {prog.name}
        </h4>
        <div className="flex items-center gap-2">
          <span
              className="font-outfit text-[10px] font-600 px-2 py-0.5 rounded-full border tracking-wide"
              style={{
                backgroundColor: `${prog.themecolor}26`,
                color: prog.themecolor,
                borderColor: `${prog.themecolor}40`,
              }}
          >
            {prog.tag}
          </span>
          <span className="font-outfit text-[11px] text-white/30">{prog.duration}</span>
        </div>
      </div>

      {/* Action */}
      <div className="shrink-0">
        {prog.live ? (
          <button className="flex items-center gap-1.5 bg-red-600 hover:bg-red-500 text-white px-3.5 py-1.5 rounded-full font-outfit text-xs font-600 transition-colors shadow-[0_4px_14px_rgba(239,68,68,0.35)]">
            <Radio size={10} className="animate-pulse" />
            Watch
          </button>
        ) : (
          <ChevronRight
            size={16}
            className={`text-white/20 transition-all duration-200 ${hovered ? "text-white/60 translate-x-1" : ""}`}
          />
        )}
      </div>
    </div>
  );
}

export default function TodaysProgramsSection() {

  const [scheduleData, setScheduleData] = useState([]);

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const currentDay = days[new Date().getDay()]

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/msi/getschedulebyday?day=${currentDay}`)
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
        const result = await response.json()
        setScheduleData(result.data)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  return (
    <section className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <FontImport />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block h-px w-8 bg-red-500" />
              <span className="font-anton text-red-500 text-xs tracking-[0.25em] uppercase">Schedule</span>
            </div>
            <h2 className="font-anton text-white text-5xl md:text-6xl leading-none">
              Today on <span className="text-blue-500 font-bold">MSI TV</span>
            </h2>
          </div>

          <a
            href="/programs"
            className="hidden sm:inline-flex items-center gap-1.5 font-outfit text-sm text-white/35 hover:text-white/75 transition-colors"
          >
            Full Schedule
            <ChevronRight size={14} />
          </a>
        </div>

        {/* Program grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {scheduleData.map((prog, i) => (
            <ProgramRow key={i} prog={prog} />
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-8 flex lg:hidden justify-center">
          <a
            href="/programs"
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