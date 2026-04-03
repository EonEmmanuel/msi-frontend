import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Clock, User, Play } from "lucide-react";
import { Link } from "react-router-dom";

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

    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    .fade-up { animation: fadeUp 0.6s cubic-bezier(.22,1,.36,1) both; }
    .slide-in { animation: slideIn 0.6s cubic-bezier(.22,1,.36,1) both; }
    
    .delay-0 { animation-delay: 0ms; }
    .delay-1 { animation-delay: 80ms; }
    .delay-2 { animation-delay: 160ms; }
    .delay-3 { animation-delay: 240ms; }
    .delay-4 { animation-delay: 320ms; }

    .story-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .story-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(239, 68, 68, 0.15);
    }

    .story-image {
      transition: transform 0.5s ease, filter 0.3s ease;
    }

    .story-card:hover .story-image {
      transform: scale(1.05);
      filter: brightness(1.1);
    }

    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }

    .scroll-smooth {
      scroll-behavior: smooth;
    }

    .gradient-overlay {
      background: linear-gradient(180deg, rgba(0,0,0,0) 40%, rgba(0,0,0,0.8) 100%);
    }
  `}</style>
);

const articles = [
  {
    id: 1,
    category: "Football",
    tag: "Premier League",
    title: "Haaland Breaks Another Record as City Cruise Past Arsenal",
    excerpt: "Erling Haaland scored his 35th league goal of the season as Manchester City secured a crucial 2-1 win.",
    author: "Chidi Okafor",
    time: "2 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=800&fit=crop",
    alt: "Football player celebrating goal",
  },
  {
    id: 2,
    category: "Basketball",
    tag: "NBA Playoffs",
    title: "LeBron James Leads Lakers to Overtime Victory Against Celtics",
    excerpt: "In a gripping Game 5 thriller, LeBron posted 34 points and 12 assists to keep the Lakers' season alive.",
    author: "Amara Diallo",
    time: "4 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=800&fit=crop",
    alt: "Basketball player driving to basket",
  },
  {
    id: 3,
    category: "International",
    tag: "AFCON",
    title: "Super Eagles Named in Preliminary AFCON 2027 Squad",
    excerpt: "Coach Finidi George has announced a 35-man preliminary squad ahead of the African Cup of Nations qualifiers.",
    author: "Ngozi Eze",
    time: "6 hours ago",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=800&fit=crop",
    alt: "African football team celebrating",
  },
  {
    id: 4,
    category: "Tennis",
    tag: "Wimbledon",
    title: "Djokovic Survives Five-Set Battle to Reach Wimbledon Quarters",
    excerpt: "The 24-time Grand Slam champion showed trademark resilience to outlast his opponent in a five-set epic.",
    author: "Kwame Asante",
    time: "8 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=600&h=800&fit=crop",
    alt: "Tennis player hitting forehand on grass court",
  },
  {
    id: 5,
    category: "Football",
    tag: "CAF Champions League",
    title: "Zamalek and Al Ahly Share Spoils in Cairo Derby Thriller",
    excerpt: "The Egyptian giants played out a pulsating 1-1 draw in the first leg of the CAF Champions League semi-final.",
    author: "Fatou Diop",
    time: "10 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1517747614396-d21a78b850e8?w=600&h=800&fit=crop",
    alt: "Football stadium at night with crowd",
  },
  {
    id: 6,
    category: "Basketball",
    tag: "College Basketball",
    title: "Duke Dominates with Record-Breaking Performance",
    excerpt: "The Blue Devils set a new school record with an impressive 89-72 victory over rivals North Carolina.",
    author: "Michael Chen",
    time: "12 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=800&fit=crop",
    alt: "College basketball team in action",
  },
];

const tagStyles = {
  Football: "bg-red-500/20 text-red-400 border-red-500/40",
  Basketball: "bg-orange-500/20 text-orange-400 border-orange-500/40",
  International: "bg-yellow-500/20 text-yellow-400 border-yellow-500/40",
  Tennis: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
  MMA: "bg-cyan-500/20 text-cyan-400 border-cyan-500/40",
  Athletism: "bg-blue-500/20 text-blue-400 border-blue-500/40"
};

function StoryCard({ article, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const tagStyle = tagStyles[article.category] || "bg-white/10 text-white/50 border-white/10";

  return (
    <Link 
      to={`/articles/${article.article_id}`}
      className="fade-up story-card group relative w-40 sm:w-44 md:w-56 h-80 sm:h-96 rounded-3xl overflow-hidden bg-black border border-white/10 flex-shrink-0 cursor-pointer shadow-xl max-w-[calc(100vw-48px)]"
      style={{ animationDelay: `${index * 80}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={article.image}
          alt={article.alt}
          className="story-image w-full h-full object-cover"
        />
        <div className="gradient-overlay absolute inset-0" />
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
        {/* Top section - Tag */}
        <div className="flex justify-between items-start">
          <span
            className={`font-outfit text-[9px] font-600 px-2.5 py-1 rounded-full border inline-block tracking-wide ${tagStyle}`}
          >
            {article.category || article.tag}
          </span>
          <div className={`w-8 h-8 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all ${isHovered ? 'bg-white/30' : ''}`}>
            <Play size={14} className="text-white fill-white" />
          </div>
        </div>

        {/* Bottom section - Text content */}
        <div className="space-y-3">
          {/* Title */}
          <div className="space-y-1.5">
            <h3 className="font-anton text-lg md:text-xl leading-tight text-white line-clamp-3">
              {article.title}
            </h3>
            <p className="font-outfit text-xs text-white/60 line-clamp-2">
              {article.desc}
            </p>
          </div>

          {/* Footer info */}
          <div className="flex items-center justify-between pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 text-[10px] text-white/50">
              <Clock size={12} />
              <span>{new Date(article.created_at).toLocaleDateString('en-US')}</span>
            </div>
            <span className="font-outfit text-[10px] font-600 text-red-400">
              {article.read_time}
            </span>
          </div>
        </div>
      </div>

      {/* Hover overlay - read more */}
      <div
        className={`absolute inset-0 bg-red-600/90 backdrop-blur-sm flex items-center justify-center rounded-3xl transition-opacity duration-300 z-20 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="text-center">
          <Play size={32} className="text-white fill-white mx-auto mb-3" />
          <p className="font-outfit font-600 text-white text-sm">Read Full Story</p>
        </div>
      </div>
    </Link>
  );
}

export default function ArticlesSection() {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const [articleData, setArticleData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('http://localhost:3002/api/msi/getallarticle?limit=10');
          if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
          const result = await response.json();
          setArticleData(result.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);

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
    <section className="relative bg-gradient-to-b from-zinc-950 to-black py-16 md:py-20">
      <FontImport />

      <div className="w-full overflow-hidden">
        {/* Header Section */}
        <div className="fade-up delay-0 mb-12 md:mb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="block h-1 w-10 bg-gradient-to-r from-red-500 to-red-600 rounded-full" />
                <span className="font-anton text-red-500 text-xs tracking-[0.25em] uppercase">Trending Now</span>
              </div>
              <h2 className="font-anton text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
                Stories &amp; <span className="text-transparent font-bold bg-clip-text bg-gradient-to-r from-red-500 to-red-600">Shorts</span>
              </h2>
            </div>
            <Link 
              to="/articles" 
              className="group/link flex items-center gap-2 text-white/50 hover:text-red-500 transition-colors font-anton tracking-widest text-sm"
            >
              View all articles <ChevronRight size={18} className="group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Stories Carousel Container */}
        <div className="relative group">
          {/* Scroll container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            onLoadCapture={handleScroll}
            className="flex gap-3 md:gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 px-4 md:px-6 lg:px-8"
          >
            {articleData.map((article, index) => (
              <StoryCard key={article.article_id} article={article} index={index} />
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
      <div className="absolute top-20 right-10 w-72 h-72 bg-red-500/10 rounded-full blur-3xl pointer-events-none opacity-50 overflow-hidden" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-red-500/5 rounded-full blur-3xl pointer-events-none overflow-hidden" />
    </section>
  );
}