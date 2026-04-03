import { useState } from "react";
import { ArrowUpRight, Zap } from "lucide-react";

const categories = [
  {
    name: "Football",
    articles: 248,
    image: "https://images.unsplash.com/photo-1610201417828-29dd1173d62f?w=800&q=80",
    alt: "Football on grass pitch with stadium in background",
    tag: "Most Watched",
    accent: "#E8192C",
  },
  {
    name: "Basketball",
    articles: 89,
    image: "https://images.unsplash.com/photo-1660496756892-6e76652a1532?w=600&q=80",
    alt: "Basketball player dunking in indoor arena",
    tag: "Trending",
    accent: "#FF6B35",
  },
  {
    name: "Tennis",
    articles: 62,
    image: "https://images.unsplash.com/photo-1661474973381-130596c650c4?w=600&q=80",
    alt: "Tennis player serving on clay court",
    tag: "Featured",
    accent: "#F5C842",
  },
  {
    name: "Athletism",
    articles: 44,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80",
    alt: "Athletes sprinting on running track",
    accent: "#4CAF50",
  },
  {
    name: "MMA",
    articles: 37,
    image: "https://images.unsplash.com/photo-1522844931788-513a2ed46b4b?w=400&q=80",
    alt: "Boxer training with punching bag in gym",
    accent: "#9C27B0",
  },
];

function LargeCard({ cat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden cursor-pointer"
      style={{ minHeight: 380 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Background image */}
      <img
        src={cat.image}
        alt={cat.alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered ? "scale-110 opacity-90" : "scale-100 opacity-70"}`}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

      {/* Decorative accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-1 transition-opacity duration-300"
        style={{ backgroundColor: cat.accent, opacity: hovered ? 1 : 0.6 }}
      />

      {/* Tag */}
      <div className="absolute top-5 left-5">
        <span
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white"
          style={{ backgroundColor: cat.accent }}
        >
          <Zap size={10} fill="white" />
          {cat.tag}
        </span>
      </div>

      {/* Content */}
      <div className="absolute bottom-7 left-7 right-7">
        <p className="text-white/50 text-xs font-semibold uppercase tracking-widest mb-2">
          {cat.articles} articles
        </p>
        <h3 className="font-black text-5xl text-white mb-5 leading-none tracking-tight">
          {cat.name}
        </h3>
        <button
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold text-white transition-all duration-300 hover:gap-3"
          style={{ backgroundColor: cat.accent }}
        >
          Explore Sport
          <ArrowUpRight size={15} />
        </button>
      </div>
    </div>
  );
}

function MediumCard({ cat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="col-span-1 relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ minHeight: 182 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={cat.image}
        alt={cat.alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered ? "scale-110 opacity-80" : "scale-100 opacity-60"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

      {/* Accent left border on hover */}
      <div
        className="absolute top-4 left-0 w-1 rounded-r-full transition-all duration-300"
        style={{
          backgroundColor: cat.accent,
          height: hovered ? "60%" : "30%",
        }}
      />

      {cat.tag && (
        <div className="absolute top-3 right-3">
          <span
            className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider text-white"
            style={{ backgroundColor: cat.accent + "cc" }}
          >
            {cat.tag}
          </span>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="font-black text-xl text-white leading-tight">{cat.name}</h3>
        <p className="text-white/50 text-xs mt-0.5">{cat.articles} articles</p>
      </div>
    </div>
  );
}

function SmallCard({ cat }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="col-span-1 relative rounded-2xl overflow-hidden cursor-pointer"
      style={{ minHeight: 148 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={cat.image}
        alt={cat.alt}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${hovered ? "scale-110 opacity-75" : "scale-100 opacity-50"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Glow dot */}
      <div
        className="absolute top-3 right-3 w-2 h-2 rounded-full transition-opacity duration-300"
        style={{ backgroundColor: cat.accent, opacity: hovered ? 1 : 0.5 }}
      />

      <div className="absolute bottom-3 left-3 right-3">
        <h3 className="font-black text-base text-white leading-tight">{cat.name}</h3>
        <p className="text-white/40 text-[11px] mt-0.5">{cat.articles} articles</p>
      </div>

      {/* Bottom accent line on hover */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 transition-opacity duration-300"
        style={{ backgroundColor: cat.accent, opacity: hovered ? 1 : 0 }}
      />
    </div>
  );
}

export default function SportsCategoriesSection() {
  return (
    <section className="bg-zinc-950 min-h-screen">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;600;700&display=swap');
        .font-bebas { font-family: 'Bebas Neue', cursive; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
      `}</style>

      <div className="font-dm max-w-screen-xl mx-auto px-6 md:px-10 py-16">

        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="block w-6 h-0.5 bg-red-500" />
              <p className="text-red-500 text-xs font-bold uppercase tracking-[0.2em]">Explore</p>
            </div>
            <h2 className="font-bebas text-5xl md:text-6xl text-white leading-none tracking-wide">
              Sports <span className="text-red-500 font-bold">Categories</span>
            </h2>
          </div>
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-2 border border-white/10 hover:border-red-500 text-white/60 hover:text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
          >
            View All
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {/* Large — 2×2 */}
          <LargeCard cat={categories[0]} />

          {/* Medium cards — each 1×1 on rows 1 & 2 */}
          {categories.slice(1, 3).map((cat) => (
            <MediumCard key={cat.name} cat={cat} />
          ))}

          {/* Small cards — row 3, all 4 cols */}
          {categories.slice(3).map((cat) => (
            <SmallCard key={cat.name} cat={cat} />
          ))}
        </div>
      </div>
    </section>
  );
}