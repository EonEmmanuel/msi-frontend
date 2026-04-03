import { useEffect, useState } from "react";
import { Clock, Users, Play, ChevronRight, ArrowUpRight } from "lucide-react";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(22px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes livePulse {
      0%, 100% { opacity: 1; transform: scale(1);   }
      50%       { opacity: 0.3; transform: scale(1.6); }
    }

    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    .fade-up { animation: fadeUp 0.55s cubic-bezier(.22,1,.36,1) both; }
    .live-dot { animation: livePulse 1.8s ease-in-out infinite; }

    .prog-img { transition: transform 0.7s ease, filter 0.4s ease; }
    .prog-cell:hover .prog-img {
      transform: scale(1.07);
      filter: brightness(0.72);
    }

    .prog-cell { transition: border-color 0.25s ease, box-shadow 0.25s ease; }

    .reveal-btn {
      transition: opacity 0.22s ease, transform 0.22s ease;
      opacity: 0;
      transform: translateY(6px);
    }
    .prog-cell:hover .reveal-btn {
      opacity: 1;
      transform: translateY(0);
    }
  `}</style>
);

const catStyle = {
  Sports:   "bg-red-700/20 text-red-500 border-red-700/30",
  Mag: "bg-orange-500/20 text-orange-400 border-orange-500/30",
  Divertisement:     "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  Debat:  "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  Entretien:     "bg-violet-500/20 text-violet-400 border-violet-500/30",
};

// Maps index position to bento layout config
const layoutConfig = [
  { span: "col-span-2 row-span-2", minH: "min-h-[380px]", titleSize: "text-3xl md:text-4xl" },
  { span: "col-span-1 row-span-2", minH: "min-h-[380px]", titleSize: "text-xl md:text-2xl" },
  { span: "col-span-1 row-span-1", minH: "min-h-[180px]", titleSize: "text-base md:text-lg" },
  { span: "col-span-1 row-span-1", minH: "min-h-[180px]", titleSize: "text-base md:text-lg" },
  { span: "col-span-2 row-span-1", minH: "min-h-[200px]", titleSize: "text-xl md:text-2xl" },
  { span: "col-span-1 row-span-1", minH: "min-h-[200px]", titleSize: "text-base md:text-lg" },
];

function ProgramCell({ program, layout, delay }) {
  const [hovered, setHovered] = useState(false);
  const cat = catStyle[program.tag] || "bg-white/10 text-white/50 border-white/10";

  return (
    <div
      className={`prog-cell fade-up ${layout.span} ${layout.minH} relative rounded-2xl overflow-hidden cursor-pointer border bg-zinc-900
        ${program.live
          ? "border-red-500/35 hover:border-red-500/60 hover:shadow-[0_20px_55px_rgba(239,68,68,0.18)]"
          : "border-white/[0.07] hover:border-white/[0.17] hover:shadow-[0_20px_55px_rgba(0,0,0,0.55)]"
        }`}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <img
        src={program.image}
        alt={program.name}
        className="prog-img absolute inset-0 w-full h-full object-cover"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/35 to-transparent" />

      {/* Top-left: LIVE or category badge */}
      <div className="absolute top-3.5 left-3.5 z-10">
        {program.live ? (
          <div className="flex items-center gap-1.5 bg-red-600 px-2.5 py-1 rounded-full shadow-[0_4px_14px_rgba(239,68,68,0.5)]">
            <span className="live-dot w-1.5 h-1.5 rounded-full bg-white shrink-0" />
            <span className="font-anton text-[9px] text-white tracking-widest">LIVE</span>
          </div>
        ) : (
          <span className={`font-outfit text-[9px] font-600 px-2.5 py-0.5 rounded-full border tracking-wide ${cat}`}>
            {program.tag}
          </span>
        )}
      </div>

      {/* Top-right: viewers */}
      <div className="absolute top-3.5 right-3.5 z-10">
        <span className="font-outfit text-[10px] text-white/40 flex items-center gap-1 bg-black/40 backdrop-blur-sm px-2 py-0.5 rounded-full">
          <Users size={9} />
        1M
        </span>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
        {program.live && (
          <span className={`font-outfit text-[9px] font-600 px-2.5 py-0.5 rounded-full border tracking-wide mb-3 inline-block ${cat}`}>
            {program.tag}
          </span>
        )}

        <h3 className={`font-anton uppercase ${layout.titleSize} transition-colors duration-200 ${hovered ? "text-white" : "text-white"}`}>
          {program.name}
        </h3>

        <div className="flex items-center justify-between">
          <span className="font-outfit text-[11px] text-white/30 flex items-center gap-1">
            <Clock size={10} />
            {program.duration}
          </span>

          <a href={`/replay?show=${encodeURIComponent(program.name)}`}>
          <button className={`reveal-btn font-outfit flex items-center gap-1.5 text-[11px] font-600 px-3 py-1.5 rounded-full
            ${program.live
              ? "bg-red-600 hover:bg-red-500 text-white"
              : "bg-white/10 hover:bg-white/20 text-white/80"
            }`}
          >
            <Play size={9} /> Watch
          </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function ProgramsSection() {
  const [programsData, setProgramsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/msi/getallprogram');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setProgramsData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const programfilter = programsData.filter(prog => prog.unique === 'Yes');

  return (
    <section className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <FontImport />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-20">

        {/* Header */}
        <div className="fade-up flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block h-px w-8 bg-red-500" />
              <span className="font-anton text-red-500 text-xs tracking-[0.25em] uppercase">Programs</span>
            </div>
            <h2 className="font-anton text-white text-5xl md:text-6xl leading-none">
              Featured <span className="text-red-500 font-bold">Gallery</span>
            </h2>
          </div>

          <div className="flex items-center gap-5">
            <p className="font-outfit text-white/25 text-sm hidden md:block">
              Live sport and premium programs
            </p>
            <a
              href="#"
              className="font-outfit inline-flex items-center gap-1.5 text-sm text-white/35 hover:text-white/75 transition-colors whitespace-nowrap"
            >
              View All
              <ChevronRight size={14} />
            </a>
          </div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {programfilter.map((prog, i) => (
            <ProgramCell
              key={prog.id}
              program={prog}
              layout={layoutConfig[i % layoutConfig.length]}
              delay={i * 70}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
         <a href="/replay">
          <button className="font-outfit inline-flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-white/[0.08] hover:border-white/[0.18] text-white/50 hover:text-white/90 text-sm font-500 px-6 py-3 rounded-full transition-all duration-200">
            Browse All Programs
            <ArrowUpRight size={14} />
          </button>
         </a>
        </div>
      </div>
    </section>
  );
}