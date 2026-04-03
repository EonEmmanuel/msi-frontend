import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @keyframes slideIn {
      from { opacity: 0; transform: translateX(-20px); }
      to   { opacity: 1; transform: translateX(0); }
    }

    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
      50% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
    }

    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    .fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
    .slide-in { animation: slideIn 0.6s cubic-bezier(.22,1,.36,1) both; }
    
    .delay-0 { animation-delay: 0ms; }
    .delay-1 { animation-delay: 80ms; }
    .delay-2 { animation-delay: 160ms; }
    .delay-3 { animation-delay: 240ms; }
    .delay-4 { animation-delay: 320ms; }

    .match-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
    }

    .match-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 20px 40px rgba(239, 68, 68, 0.2);
      border-color: rgba(239, 68, 68, 0.5);
    }

    .match-card.live {
      animation: pulse-glow 2s infinite;
      border-color: rgba(239, 68, 68, 0.5);
    }

    .team-logo {
      transition: transform 0.3s ease;
    }

    .match-card:hover .team-logo {
      transform: scale(1.05);
    }

    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

    .scroll-smooth {
      scroll-behavior: smooth;
    }

    .live-badge {
      animation: pulse 2s infinite;
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.7; }
    }
  `}</style>
);

const matches = [
  {
    id: 1,
    status: "live",
    league: "Premier League",
    homeTeam: { name: "Manchester City", logo: "🔵", shortName: "MCI" },
    awayTeam: { name: "Arsenal", logo: "🔴", shortName: "ARS" },
    homeScore: 2,
    awayScore: 1,
    minute: 67,
    stadium: "Etihad Stadium",
    viewers: "2.4M",
    kickoff: "Live",
  },
  {
    id: 2,
    status: "upcoming",
    league: "La Liga",
    homeTeam: { name: "Real Madrid", logo: "⚪", shortName: "RMA" },
    awayTeam: { name: "Barcelona", logo: "🔵", shortName: "BAR" },
    homeScore: null,
    awayScore: null,
    minute: null,
    stadium: "Santiago Bernabéu",
    viewers: "1.8M",
    kickoff: "20:30",
  },
  {
    id: 3,
    status: "live",
    league: "Bundesliga",
    homeTeam: { name: "Bayern Munich", logo: "🔴", shortName: "BAY" },
    awayTeam: { name: "Borussia Dortmund", logo: "💛", shortName: "BVB" },
    homeScore: 1,
    awayScore: 1,
    minute: 45,
    stadium: "Allianz Arena",
    viewers: "1.2M",
    kickoff: "Live",
  },
  {
    id: 4,
    status: "upcoming",
    league: "Serie A",
    homeTeam: { name: "Juventus", logo: "⚫", shortName: "JUV" },
    awayTeam: { name: "Inter Milan", logo: "🔵", shortName: "INT" },
    homeScore: null,
    awayScore: null,
    minute: null,
    stadium: "Allianz Stadium",
    viewers: "1.5M",
    kickoff: "18:00",
  },
  {
    id: 5,
    status: "upcoming",
    league: "Ligue 1",
    homeTeam: { name: "Paris Saint-Germain", logo: "🔴", shortName: "PSG" },
    awayTeam: { name: "Marseille", logo: "⚪", shortName: "OM" },
    homeScore: null,
    awayScore: null,
    minute: null,
    stadium: "Parc des Princes",
    viewers: "1.1M",
    kickoff: "21:00",
  },
  {
    id: 6,
    status: "live",
    league: "CAF League",
    homeTeam: { name: "Zamalek", logo: "⚪", shortName: "ZAM" },
    awayTeam: { name: "Al Ahly", logo: "🔴", shortName: "AHL" },
    homeScore: 1,
    awayScore: 1,
    minute: 72,
    stadium: "Cairo International Stadium",
    viewers: "800K",
    kickoff: "Live",
  },
];

const leagueColors = {
  "Premier League": "from-sky-500/20 to-sky-600/10 border-sky-500/30",
  "La Liga": "from-amber-500/20 to-amber-600/10 border-amber-500/30",
  "Bundesliga": "from-red-500/20 to-red-600/10 border-red-500/30",
  "Serie A": "from-blue-500/20 to-blue-600/10 border-blue-500/30",
  "Ligue 1": "from-purple-500/20 to-purple-600/10 border-purple-500/30",
  "CAF Champions League": "from-yellow-500/20 to-yellow-600/10 border-yellow-500/30",
};

function MatchCard({ match, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const leagueColor = leagueColors[match.league] || "from-gray-500/20 to-gray-600/10 border-gray-500/30";
  const isLive = match.live

  return (
    <div
      className={`fade-up match-card group relative w-48 sm:w-56 md:w-64 rounded-3xl overflow-hidden bg-gradient-to-br ${leagueColor} border border-white/10 flex-shrink-0 cursor-pointer shadow-xl transition-all ${isLive ? 'live' : ''}`}
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent" />

      {/* Content */}
      <div className="relative p-4 md:p-5 h-full flex flex-col justify-between">
        
        {/* Top section - League and status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-600 text-white/70 uppercase w-32 tracking-wide">
              {match.league_name}
            </span>
            {isLive && (
              <div className="flex items-center gap-1 bg-red-500/30 px-2 py-1 rounded-full live-badge">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                <span className="font-outfit text-[9px] md:text-[10px] font-700 text-red-400 uppercase">Live</span>
              </div>
            )}
          </div>
          <span className="font-outfit text-[10px] text-white/40">
            {match.venue}
          </span>
        </div>

        {/* Middle section - Teams and Score */}
        <div className="space-y-3">
          {/* Home Team */}
          <div className="flex items-center justify-between gap-3 group/team">
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <span className="text-2xl md:text-3xl team-logo"><img src={match.home_team_logo} alt={match.home_team_name} className="w-12 h-12 object-contain" /></span>
               <div className="min-w-0">
                <p className="font-outfit text-sm md:text-base font-600 text-white truncate group-hover/team:text-red-400 transition-colors">
                  {match.home_team_abv}
                </p>
                <p className="font-outfit text-[10px] text-white/40 truncate">
                  {match.home_team_name}
                </p>
              </div>
            </div>
            {match.home_score !== null && (
              <div className="text-center">
                <p className="font-anton text-2xl md:text-3xl text-white leading-none">
                  {match.home_score}
                </p>
              </div>
            )}
          </div>

          {/* Score divider */}
          {match.homeScore !== null && (
            <div className="flex items-center justify-center gap-2">
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
              <span className="font-outfit text-[10px] text-white/50 font-600 px-2">
                FT
              </span>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 via-white/20 to-white/10" />
            </div>
          )}

          {/* Away Team */}
          <div className="flex items-center justify-between gap-3 group/team">
            <div className="flex items-center gap-2 flex-1 min-w-0">
             <span className="text-2xl md:text-3xl team-logo"><img src={match.away_team_logo} alt={match.away_team_name} className="w-12 h-12 object-contain" /></span>
              <div className="min-w-0">
                <p className="font-outfit text-sm md:text-base font-600 text-white truncate group-hover/team:text-red-400 transition-colors">
                  {match.away_team_abv}
                </p>
                <p className="font-outfit text-[10px] text-white/40 truncate">
                  {match.away_team_name}
                </p>
              </div>
            </div>
            {match.away_score !== null && (
              <div className="text-center">
                <p className="font-anton text-2xl md:text-3xl text-white leading-none">
                  {match.away_score}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom section - Info */}
        <div className="pt-4">
          <div className="flex items-center gap-2 text-[10px] text-white/50">
            <Users size={12} />
            <span className="font-outfit">1M viewers</span>
          </div>
        </div>

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-red-600/20 backdrop-blur-sm flex items-center justify-center rounded-3xl transition-opacity duration-300 z-20 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="text-center">
            <p className="font-outfit font-600 text-white text-sm">
              {isLive ? 'Watch Live' : 'View Details'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MatchFixturesSection() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

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

  const matchfilter = matchesData.filter(match => match.ft);

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      const newScrollLeft = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-black via-zinc-950 to-black py-16 md:py-20 overflow-x-hidden">
      <FontImport />

      <div className="w-full p-2 overflow-hidden">
        {/* Header Section */}
        <div className="fade-up delay-0 mb-12 md:mb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block h-1 w-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                <span className="font-anton text-red-500 text-xs tracking-[0.25em] uppercase">Match Fixtures</span>
              </div>
              <h2 className="font-anton text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                Recent <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Results</span>
              </h2>
            </div>

          </div>
        </div>

        {/* Match Carousel Container */}
        <div className="relative group">
          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onLoadCapture={handleScroll}
            className="flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-4 md:px-6 lg:px-8"
          >
            {matchfilter.map((match, index) => (
              <MatchCard key={match.id} match={match} index={index} />
            ))}
          </div>

          {/* Left scroll button */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className={`absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-6 lg:-translate-x-8 z-20 p-2 md:p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
              canScrollLeft
                ? 'bg-red-600/80 hover:bg-red-600 text-white border-red-500/50 cursor-pointer'
                : 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
            }`}
          >
            <ChevronLeft size={18} className="md:w-5 md:h-5" />
          </button>

          {/* Right scroll button */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className={`absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-6 lg:translate-x-8 z-20 p-2 md:p-3 rounded-full backdrop-blur-md border transition-all duration-300 ${
              canScrollRight
                ? 'bg-red-600/80 hover:bg-red-600 text-white border-red-500/50 cursor-pointer'
                : 'bg-white/5 text-white/30 border-white/10 cursor-not-allowed'
            }`}
          >
            <ChevronRight size={18} className="md:w-5 md:h-5" />
          </button>

          {/* Gradient fade effect on sides */}
          <div className="absolute top-0 left-0 bottom-4 w-20 bg-gradient-to-r from-black via-black/40 to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 right-0 bottom-4 w-20 bg-gradient-to-l from-black via-black/40 to-transparent z-10 pointer-events-none" />
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-40 right-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  );
}