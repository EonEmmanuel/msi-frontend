import { useEffect, useState } from "react";
import { ArrowUpRight, ChevronRight, Clock, User } from "lucide-react";

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    .fade-up { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }
    .delay-0 { animation-delay: 0ms; }
    .delay-1 { animation-delay: 80ms; }
    .delay-2 { animation-delay: 160ms; }
    .delay-3 { animation-delay: 240ms; }
    .delay-4 { animation-delay: 320ms; }

    .card-img { transition: transform 0.7s ease, opacity 0.4s ease; }
    .group:hover .card-img { transform: scale(1.07); }
  `}</style>
);

const articles = [
  {
    category: "Football",
    tag: "Premier League",
    title: "Haaland Breaks Another Record as City Cruise Past Arsenal",
    excerpt:
      "Erling Haaland scored his 35th league goal of the season as Manchester City secured a crucial 2-1 win at the Emirates.",
    author: "Chidi Okafor",
    time: "2 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=900&q=80",
    alt: "Football player celebrating goal",
  },
  {
    category: "Basketball",
    tag: "NBA Playoffs",
    title: "LeBron James Leads Lakers to Overtime Victory Against Celtics",
    excerpt:
      "In a gripping Game 5 thriller, LeBron posted 34 points and 12 assists to keep the Lakers' season alive.",
    author: "Amara Diallo",
    time: "4 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&q=80",
    alt: "Basketball player driving to basket",
  },
  {
    category: "International",
    tag: "AFCON",
    title: "Super Eagles Named in Preliminary AFCON 2027 Squad",
    excerpt:
      "Coach Finidi George has announced a 35-man preliminary squad ahead of the African Cup of Nations qualifiers.",
    author: "Ngozi Eze",
    time: "6 hours ago",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80",
    alt: "African football team celebrating",
  },
  {
    category: "Tennis",
    tag: "Wimbledon",
    title: "Djokovic Survives Five-Set Battle to Reach Wimbledon Quarters",
    excerpt:
      "The 24-time Grand Slam champion showed trademark resilience to outlast his opponent in a five-set epic.",
    author: "Kwame Asante",
    time: "8 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&q=80",
    alt: "Tennis player hitting forehand on grass court",
  },
  {
    category: "Football",
    tag: "CAF Champions League",
    title: "Zamalek and Al Ahly Share Spoils in Cairo Derby Thriller",
    excerpt:
      "The Egyptian giants played out a pulsating 1-1 draw in the first leg of the CAF Champions League semi-final.",
    author: "Fatou Diop",
    time: "10 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?w=400&q=80",
    alt: "Football stadium at night with crowd",
  },
];

const tagStyle = {
  Football:      "bg-red-500/15 text-red-400 border-red-500/20",
  Basketball:    "bg-orange-500/15 text-orange-400 border-orange-500/20",
  International: "bg-yellow-500/15 text-yellow-400 border-yellow-500/20",
  Tennis:        "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
};

function FeaturedCard({ article }) {
  const [hovered, setHovered] = useState(false);
  const tag = tagStyle[article?.category] || "bg-white/10 text-white/50 border-white/10";

  return (
    <div
      className="fade-up delay-0 lg:col-span-2 group relative rounded-2xl overflow-hidden cursor-pointer bg-zinc-900 border border-white/[0.07] hover:border-white/[0.15] transition-all duration-300 hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative h-64 md:h-80 overflow-hidden bg-zinc-800">
        <img
          src={article?.image}
          alt={article?.alt}
          className={`card-img absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${hovered ? "opacity-60" : "opacity-45"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />

        {/* Tag */}
        <div className="absolute top-4 left-4">
          <span className={`font-outfit text-[10px] font-600 px-2.5 py-1 rounded-full border tracking-wide ${tag}`}>
            {article?.tag}
          </span>
        </div>

        {/* Featured label */}
        <div className="absolute top-4 right-4">
          <span className="font-anton text-[9px] tracking-[0.22em] text-white/40 uppercase bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            Featured
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`font-anton text-2xl md:text-3xl leading-tight mb-3 transition-colors duration-200 ${hovered ? "text-red-400" : "text-white"}`}>
          {article?.title}
        </h3>
        <p className="font-outfit text-sm text-white/45 leading-relaxed line-clamp-2 mb-5">{article?.desc}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 font-outfit text-xs text-white/30">
            <span className="flex items-center gap-1.5">
              <User size={11} />
              {article?.editor}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="flex items-center gap-1.5">
              <Clock size={11} />
              {article?.read_time}
            </span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span>{new Date(article?.created_at).toLocaleDateString()}</span>
          </div>

          <div className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-200
            ${hovered ? "bg-red-600 border-red-600" : "bg-transparent border-white/10"}`}
          >
            <ArrowUpRight size={14} className={hovered ? "text-white" : "text-white/30"} />
          </div>
        </div>
      </div>
    </div>
  );
}

function SideCard({ article, delay }) {
  const [hovered, setHovered] = useState(false);
  const tag = tagStyle[article.category] || "bg-white/10 text-white/50 border-white/10";

  return (
    <div
      className={`fade-up ${delay} group flex gap-4 p-4 rounded-2xl bg-zinc-900 border border-white/[0.06] hover:border-white/[0.13] transition-all duration-200 cursor-pointer hover:bg-zinc-800/60`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-zinc-800">
        <img
          src={article.image}
          alt={article.alt}
          className={`card-img absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${hovered ? "opacity-80" : "opacity-55"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/40" />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <span className={`font-outfit text-[9px] font-600 px-2 py-0.5 rounded-full border inline-block mb-2 tracking-wide ${tag}`}>
          {article.tag}
        </span>
        <h4 className={`font-outfit text-sm font-600 leading-snug mb-2 line-clamp-2 transition-colors duration-200 ${hovered ? "text-red-400" : "text-white/85"}`}>
          {article.title}
        </h4>
        <p className="font-outfit text-[11px] text-white/30">
          {article?.created_at && new Date(article?.created_at).toLocaleDateString()} · {article?.read_time}
        </p>
      </div>

      <ChevronRight
        size={15}
        className={`self-center shrink-0 transition-all duration-200 ${hovered ? "text-white/60 translate-x-0.5" : "text-white/15"}`}
      />
    </div>
  );
}

export default function LatestNewsSection() {

  const [articleData, setArticleData] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3002/api/msi/getallarticle?limit=5');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const result = await response.json();
            setArticleData(result.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

  const featured = articleData[0];
  const rest = articleData.slice(1);

  return (
    <section className="bg-zinc-950 min-h-screen">
      <FontImport />

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-16">

        {/* Header */}
        <div className="fade-up delay-0 flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="block h-px w-8 bg-red-500" />
              <span className="font-anton text-red-500 text-xs tracking-[0.25em] uppercase">Latest</span>
            </div>
            <h2 className="font-anton text-white text-5xl md:text-6xl leading-none">
              News &amp; <span className="text-red-500 font-bold">Articles</span>
            </h2>
          </div>

          <a
            href="/articles"
            className="hidden sm:inline-flex items-center gap-1.5 font-outfit text-sm text-white/35 hover:text-white/75 transition-colors"
          >
            All Articles
            <ChevronRight size={14} />
          </a>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          <FeaturedCard article={featured} />

          {/* Side list */}
          <div className="flex flex-col gap-3">
            {rest.map((article, i) => (
              <SideCard
                key={i}
                article={article}
                delay={`delay-${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Mobile link */}
        <div className="mt-8 flex sm:hidden justify-center">
          <a
            href="#"
            className="font-outfit inline-flex items-center gap-2 border border-white/10 text-white/40 hover:text-white/75 hover:border-white/20 rounded-full px-5 py-2.5 text-sm transition-all"
          >
            All Articles
            <ChevronRight size={13} />
          </a>
        </div>
      </div>
    </section>
  );
}