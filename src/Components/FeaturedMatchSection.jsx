import { useState } from "react";
import { Play, ChevronRight, ArrowRight, Radio } from "lucide-react";

/* ── Google Fonts injected via a tiny style tag (font @import only, no design styles) ── */
const FontImport = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600&display=swap');`}</style>
);

/* ── DATA ── */
const matches = [
  {
    competition: "Premier League",
    badge: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    homeTeam: "Man City",
    awayTeam: "Arsenal",
    homeScore: 2,
    awayScore: 1,
    status: "FT",
    time: "Yesterday",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    winner: "home",
  },
  {
    competition: "CAF CL",
    badge: "🌍",
    homeTeam: "Zamalek",
    awayTeam: "Al Ahly",
    homeScore: 1,
    awayScore: 1,
    status: "LIVE",
    time: "67'",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80",
    winner: null,
  },
  {
    competition: "NBA",
    badge: "🏀",
    homeTeam: "Lakers",
    awayTeam: "Celtics",
    homeScore: 108,
    awayScore: 102,
    status: "FT",
    time: "Today",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    winner: "home",
  },
];

/* ── LIVE PULSE ANIMATION (keyframe only, no design styles) ── */
const AnimStyles = () => (
  <style>{`
    @keyframes ripple {
      0%   { transform: scale(1);   opacity: 1; }
      100% { transform: scale(2.5); opacity: 0; }
    }
    @keyframes waveBar {
      0%, 100% { transform: scaleY(0.3); }
      50%       { transform: scaleY(1);   }
    }
    @keyframes fadeSlideUp {
      from { opacity: 0; transform: translateY(20px); }
      to   { opacity: 1; transform: translateY(0);    }
    }
    .anim-card { animation: fadeSlideUp 0.55s cubic-bezier(.22,1,.36,1) both; }
    .delay-0   { animation-delay: 0ms;   }
    .delay-1   { animation-delay: 100ms; }
    .delay-2   { animation-delay: 200ms; }

    .ripple-ring::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 9999px;
      background: #ef4444;
      animation: ripple 1.6s ease-out infinite;
    }
    .wave-bar { animation: waveBar 0.7s ease-in-out infinite; transform-origin: bottom; }
    .wave-bar:nth-child(2) { animation-delay: 0.12s; }
    .wave-bar:nth-child(3) { animation-delay: 0.24s; }

    .card-img-zoom { transition: transform 0.7s ease, opacity 0.4s ease; }
    .group:hover .card-img-zoom { transform: scale(1.08); opacity: 0.55; }

    .score-text {
      font-family: 'Anton', sans-serif;
      letter-spacing: -0.02em;
    }
    .heading-font { font-family: 'Anton', sans-serif; }
    .body-font    { font-family: 'Outfit', sans-serif; }
  `}</style>
);

/* ── WAVE VISUALISER (live only) ── */
function WaveBars() {
  return (
    <div className="flex items-end gap-0.5 h-4">
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          className="wave-bar block w-0.5 h-full rounded-full bg-red-500"
        />
      ))}
    </div>
  );
}

/* ── MATCH CARD ── */
function MatchCard({ match, delayClass }) {
  const [hovered, setHovered] = useState(false);
  const isLive = match.status === "LIVE";

  const scoreClass = (side) => {
    if (!match.winner) return "text-white";
    return match.winner === side
      ? "text-white"
      : "text-white/25";
  };

  return (
    <div
      className={`anim-card ${delayClass} group relative rounded-2xl overflow-hidden cursor-pointer
        bg-zinc-900 border transition-all duration-300
        ${isLive
          ? "border-red-500/30 hover:border-red-500/60 hover:shadow-[0_20px_60px_rgba(239,68,68,0.15)]"
          : "border-white/[0.07] hover:border-white/[0.15] hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
        }
        hover:-translate-y-1`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-zinc-800">
        <img
          src={match.image}
          alt={match.competition}
          className="card-img-zoom absolute inset-0 w-full h-full object-cover opacity-40"
        />
        {/* gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/50 to-transparent" />

        {/* competition badge */}
        <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
          <span className="text-base leading-none">{match.badge}</span>
          <span className="body-font text-[10px] font-600 tracking-widest text-white/70 uppercase bg-black/60 backdrop-blur px-2.5 py-1 rounded-full border border-white/10">
            {match.competition}
          </span>
        </div>

        {/* LIVE badge */}
        {isLive && (
          <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 bg-red-600 px-2.5 py-1 rounded-full shadow-[0_4px_16px_rgba(239,68,68,0.5)]">
            <span className="relative flex w-1.5 h-1.5 flex-shrink-0">
              <span className="ripple-ring relative inline-flex w-1.5 h-1.5 rounded-full bg-white" />
            </span>
            <span className="heading-font text-[10px] text-white tracking-widest">LIVE</span>
          </div>
        )}

        {/* FT badge */}
        {!isLive && (
          <div className="absolute top-3.5 right-3.5">
            <span className="body-font text-[10px] font-500 tracking-widest text-white/40 uppercase bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
              {match.status}
            </span>
          </div>
        )}
      </div>

      {/* Score block */}
      <div className="px-5 pt-4 pb-5">
        {/* Teams + scores */}
        <div className="flex items-center justify-between gap-3 mb-5">
          {/* Home */}
          <div className="flex-1 text-center min-w-0">
            <p className="body-font text-xs text-white/40 truncate mb-2">{match.homeTeam}</p>
            <p className={`score-text text-5xl ${scoreClass("home")}`}>{match.homeScore}</p>
          </div>

          {/* Separator */}
          <div className="flex-shrink-0 flex flex-col items-center gap-1.5">
            {isLive ? (
              <>
                <WaveBars />
                <span className="heading-font text-xs text-red-500 bg-red-500/10 border border-red-500/25 px-2 py-0.5 rounded-full tracking-wider">
                  {match.time}
                </span>
              </>
            ) : (
              <div className="text-center">
                <p className="body-font text-[10px] text-white/20 uppercase tracking-widest mb-1">{match.time}</p>
                <p className="heading-font text-xs text-white/25 tracking-widest">VS</p>
              </div>
            )}
          </div>

          {/* Away */}
          <div className="flex-1 text-center min-w-0">
            <p className="body-font text-xs text-white/40 truncate mb-2">{match.awayTeam}</p>
            <p className={`score-text text-5xl ${scoreClass("away")}`}>{match.awayScore}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-white/[0.06] mb-4" />

        {/* Watch button */}
        <button
          className={`w-full flex items-center justify-center gap-2 rounded-xl py-2.5 body-font text-xs font-500 transition-all duration-200
            ${isLive
              ? "bg-red-500/10 border border-red-500/25 text-red-400 hover:bg-red-500/20 hover:border-red-500/50"
              : "bg-white/[0.04] border border-white/[0.08] text-white/40 hover:bg-white/[0.09] hover:border-white/[0.16] hover:text-white/80"
            }`}
        >
          {isLive ? (
            <>
              <Radio size={12} className="animate-pulse" />
              Watch Live
            </>
          ) : (
            <>
              <Play size={12} />
              Watch Replay
            </>
          )}
        </button>
      </div>
    </div>
  );
}

/* ── SECTION ── */
export default function FeaturedMatchSection() {
  return (
    <section className="bg-zinc-950 min-h-screen overflow-x-hidden">
      <FontImport />
      <AnimStyles />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16 md:py-20">

        {/* Header */}
        <div className="anim-card delay-0 flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block h-px w-8 bg-red-500" />
              <span className="heading-font text-red-500 text-xs tracking-[0.25em] uppercase">
                Match Center
              </span>
            </div>
            <h2 className="heading-font text-white text-5xl md:text-6xl leading-none">
              Latest{" "}
              <span className="text-red-500">Results</span>
            </h2>
          </div>

          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 body-font text-sm text-white/35 hover:text-white/80 transition-colors"
          >
            All Fixtures
            <ChevronRight size={14} />
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matches.map((match, i) => (
            <MatchCard
              key={i}
              match={match}
              delayClass={`delay-${i}`}
            />
          ))}
        </div>

        {/* Mobile link */}
        <div className="mt-6 flex sm:hidden justify-center">
          <a
            href="#"
            className="body-font inline-flex items-center gap-2 border border-white/10 text-white/40 hover:text-white/80 hover:border-white/20 rounded-full px-5 py-2.5 text-sm transition-all"
          >
            All Fixtures
            <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}