import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Clock, 
  User, 
  Calendar, 
  Share2, 
  ChevronLeft,
  ArrowRight,
  Facebook,
  Twitter,
  Instagram,
  Tag,
  MessageCircle,
  ThumbsUp,
  Bookmark
} from 'lucide-react';

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');

    .font-anton { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .fade-up {
      animation: fadeUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    }
  `}</style>
);

// Mocking the same articles from Articles.jsx
const ARTICLES = [
  {
    id: 1,
    category: "Sports",
    subCategory: "Football",
    tag: "Premier League",
    title: "Haaland Breaks Another Record as City Cruise Past Arsenal",
    excerpt: "Erling Haaland scored his 35th league goal of the season as Manchester City secured a crucial 2-1 win at the Etihad.",
    author: "Chidi Okafor",
    date: "March 25, 2026",
    time: "2 hours ago",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=800&q=80",
    content: `
      <p>Manchester City's Erling Haaland has once again etched his name into the record books, scoring his 35th Premier League goal of the season in a dominant 2-1 victory over title rivals Arsenal at the Etihad Stadium. The Norwegian striker's clinical finish in the 78th minute secured all three points for Pep Guardiola's side, moving them closer to another league title.</p>
      
      <p>The match, billed as a potential title decider, lived up to the hype from the first whistle. City dominated possession and created several clear-cut chances early on, with Kevin De Bruyne and Bernardo Silva testing Arsenal's defense. The breakthrough came in the 32nd minute when Phil Foden's cross was met by a powerful header from Ruben Dias.</p>
      
      <h3>A Record-Breaking Season</h3>
      <p>Haaland's goal marks a historic achievement, surpassing the previous record for most goals in a single 38-game Premier League season. The 25-year-old has been in sensational form since arriving at City, consistently finding the back of the net and terrorizing defenses across the league.</p>
      
      <blockquote>"Erling is a special talent. His hunger for goals and his work rate are incredible. We are lucky to have him in our team," said Pep Guardiola after the match.</blockquote>
      
      <p>Arsenal fought back valiantly, with Martin Odegaard equalizing shortly after halftime, but they couldn't withstand City's relentless pressure. The Gunners now face an uphill battle to regain the top spot as the season enters its final weeks.</p>
      
      <p>With this win, Manchester City have extended their unbeaten run to 15 matches across all competitions. They look poised to secure another historic treble, with the FA Cup and Champions League also within their sights.</p>
    `
  },
  {
    id: 2,
    category: "Sports",
    subCategory: "Basketball",
    tag: "NBA Playoffs",
    title: "LeBron James Leads Lakers to Overtime Victory Against Celtics",
    excerpt: "In a gripping Game 5 thriller, LeBron posted 34 points and 12 assists to keep the Lakers' championship hopes alive.",
    author: "Amara Diallo",
    date: "March 24, 2026",
    time: "4 hours ago",
    readTime: "3 min read",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80",
    content: `
      <p>In a classic encounter that will be remembered for years to come, LeBron James delivered a masterclass performance to lead the Los Angeles Lakers to a 118-112 overtime victory against the Boston Celtics in Game 5 of the NBA Playoffs. The win keeps the Lakers' title hopes alive as they narrow the series deficit to 3-2.</p>
      
      <p>James, playing in his 23rd NBA season, showed no signs of slowing down, finishing with 34 points, 12 assists, and 8 rebounds. His clutch performance in the fourth quarter and overtime was instrumental in overcoming a resilient Celtics team led by Jayson Tatum and Jaylen Brown.</p>
      
      <h3>Clutch Moments</h3>
      <p>With the game tied at 102-102 at the end of regulation, James took control in the extra period, scoring 8 of the Lakers' 16 overtime points. His back-to-back three-pointers effectively sealed the win and silenced the TD Garden crowd.</p>
      
      <p>Anthony Davis also played a crucial role, contributing 22 points and 15 rebounds, providing a dominant presence in the paint. The Lakers' defense stepped up when it mattered most, forcing several key turnovers in the closing minutes.</p>
      
      <p>The series now moves back to Los Angeles for Game 6, where the Lakers will look to force a decisive Game 7. The intensity of this rivalry continues to captivate basketball fans worldwide.</p>
    `
  }
];

export default function ArticleDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:3002/api/msi/getarticleid/${id}`);
        if (!response.ok) {
            throw new Error('Article not found');
        }
        const data = await response.json();
        setArticle(data);

        // Fetch related articles
        const relatedResponse = await fetch('http://localhost:3002/api/msi/getallarticle?limit=4');
        if (relatedResponse.ok) {
            const relatedData = await relatedResponse.json();
            // Filter out current article and take top 3
            const filtered = relatedData.data.filter(a => String(a.article_id) !== String(id)).slice(0, 3);
            setRelatedArticles(filtered);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
        navigate('/articles');
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="font-anton text-white text-2xl animate-pulse uppercase tracking-[0.2em]">Loading Article...</div>
    </div>
  );

  if (!article) return null;

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30 font-outfit">
      <FontImport />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 md:px-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/articles" className="inline-flex items-center gap-2 text-white/40 hover:text-red-500 transition-colors mb-8 group">
            <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-anton tracking-widest text-sm uppercase">Back to Articles</span>
          </Link>

          <div className="fade-up mb-6 flex items-center gap-3">
             <span className="h-px w-12 bg-red-600" />
             <span className="font-anton text-red-600 text-sm tracking-[0.4em] uppercase">{article.category || article.tag}</span>
          </div>

          <h1 className="fade-up font-anton text-4xl md:text-6xl lg:text-7xl mb-8 leading-tight tracking-tight uppercase max-w-5xl">
            {article.title}
          </h1>

          <div className="fade-up flex flex-wrap items-center gap-6 text-white/60 mb-12" style={{ animationDelay: '100ms' }}>
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-sm font-anton border border-white/10">
                    {article.editor?.charAt(0)}
                </div>
                <div>
                    <div className="text-xs text-white/40 font-anton tracking-widest uppercase">Written by</div>
                    <div className="text-sm font-anton tracking-widest text-white uppercase">{article.editor}</div>
                </div>
            </div>
            
            <div className="h-10 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
                <Calendar size={18} className="text-red-600" />
                <div>
                    <div className="text-xs text-white/40 font-anton tracking-widest uppercase">Published</div>
                    <div className="text-sm font-anton tracking-widest text-white uppercase">{new Date(article.created_at).toLocaleDateString()}</div>
                </div>
            </div>

            <div className="h-10 w-px bg-white/10 hidden sm:block" />

            <div className="flex items-center gap-3">
                <Clock size={18} className="text-red-600" />
                <div>
                    <div className="text-xs text-white/40 font-anton tracking-widest uppercase">Read Time</div>
                    <div className="text-sm font-anton tracking-widest text-white uppercase">{article.read_time}</div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="px-6 md:px-10 mb-20">
        <div className="max-w-7xl mx-auto">
          <div className="fade-up sm:aspect-[21/12] sm:rounded-[3rem] rounded-xl overflow-hidden border border-white/10" style={{ animationDelay: '200ms' }}>
            <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="px-6 md:px-10 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Article Body */}
            <div className="lg:w-2/3">
              <div 
                className="fade-up prose prose-invert prose-red max-w-none font-outfit text-white/70 text-lg leading-relaxed
                prose-h3:font-anton prose-h3:text-3xl prose-h3:uppercase prose-h3:text-white prose-h3:mt-12 prose-h3:mb-6
                prose-p:mb-8
                prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:bg-white/5 prose-blockquote:p-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-white prose-blockquote:text-xl"
                style={{ animationDelay: '300ms' }}
                dangerouslySetInnerHTML={{ __html: article.desc }}
              />

              {/* Tags & Interaction */}
              <div className="fade-up mt-16 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-8" style={{ animationDelay: '400ms' }}>
                <div className="flex items-center gap-3">
                  <span className="text-white/40 text-xs font-anton tracking-widest uppercase">Tags:</span>
                  <div className="flex gap-2">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:border-red-600/50 cursor-pointer transition-all">#Football</span>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:border-red-600/50 cursor-pointer transition-all">#City</span>
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-white/60 hover:text-white hover:border-red-600/50 cursor-pointer transition-all">#Records</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <button className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 hover:border-red-600/50 transition-all text-sm font-anton tracking-widest uppercase group">
                    <ThumbsUp size={18} className="group-hover:text-red-600 transition-colors" /> 1.2k
                  </button>
                  <button className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-red-600/50 transition-all text-white/60 hover:text-white">
                    <Share2 size={20} />
                  </button>
                  <button className="p-2.5 rounded-full bg-white/5 border border-white/10 hover:border-red-600/50 transition-all text-white/60 hover:text-white">
                    <Bookmark size={20} />
                  </button>
                </div>
              </div>

              {/* Author Profile */}
              <div className="fade-up mt-20 p-8 md:p-12 glass-card rounded-[3rem] flex flex-col md:flex-row items-center md:items-start gap-8" style={{ animationDelay: '500ms' }}>
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center text-4xl font-anton border-4 border-white/5 shrink-0">
                    {article.editor?.charAt(0)}
                </div>
                <div className="text-center md:text-left">
                    <div className="text-xs text-red-600 font-anton tracking-widest uppercase mb-1">About the Author</div>
                    <h4 className="text-3xl font-anton uppercase text-white mb-4 tracking-wide">{article.editor}</h4>
                    <p className="text-white/50 leading-relaxed mb-6 font-outfit">
                        Senior Sports Correspondent with over a decade of experience covering African and international football. Passionate about uncovering the human stories behind the statistics.
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors border border-white/10"><Twitter size={18} /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors border border-white/10"><Instagram size={18} /></a>
                        <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-red-600 transition-colors border border-white/10"><Facebook size={18} /></a>
                    </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/3 flex flex-col gap-12">
              {/* Profile Card */}
              <div className="fade-up glass-card rounded-[2.5rem] p-8 relative overflow-hidden group" style={{ animationDelay: '400ms' }}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-red-600/20 transition-colors" />
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-red-600 flex items-center justify-center p-3 shadow-lg shadow-red-900/20">
                    <img src="https://res.cloudinary.com/drzoiigek/image/upload/v1774432658/mgm7z6stvgqkkuodnisp.png" alt="MSI" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="font-anton text-2xl tracking-wide uppercase leading-none mb-1">MSI Editorial</h3>
                    <p className="text-red-500 text-[10px] font-anton tracking-[0.2em] uppercase">Trusted News Source</p>
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-8 font-outfit">
                  Delivering premium sports content and breaking news across Africa and the world. Join our community of sports enthusiasts.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-8">
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                        <div className="text-xl font-anton text-white">250k</div>
                        <div className="text-[8px] font-anton text-white/30 tracking-widest uppercase">Followers</div>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                        <div className="text-xl font-anton text-white">1.2m</div>
                        <div className="text-[8px] font-anton text-white/30 tracking-widest uppercase">Monthly Readers</div>
                    </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-white text-black font-anton tracking-widest uppercase text-xs hover:bg-red-600 hover:text-white transition-all shadow-xl shadow-white/5">
                  Follow MSI Sport
                </button>
              </div>

              {/* Related/Featured Articles */}
              <div className="fade-up flex flex-col gap-6" style={{ animationDelay: '500ms' }}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-anton text-2xl uppercase tracking-wider">Related Stories</h3>
                  <div className="h-px flex-grow mx-4 bg-white/10" />
                </div>

                {relatedArticles.map((rel) => (
                  <Link 
                    key={rel.article_id} 
                    to={`/articles/${rel.article_id}`}
                    className="flex gap-4 group"
                  >
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-white/10">
                      <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="text-[10px] font-anton text-red-500 tracking-widest uppercase mb-1">{rel.category || rel.tag}</div>
                      <h4 className="font-anton text-base uppercase leading-tight group-hover:text-red-500 transition-colors line-clamp-2">{rel.title}</h4>
                      <div className="flex items-center gap-2 mt-2 text-[10px] text-white/40 font-anton uppercase tracking-widest">
                        <Clock size={10} /> {rel.read_time}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Ad Placement */}
              <div className="fade-up glass-card rounded-[2.5rem] p-6 border-dashed border-white/20 relative group overflow-hidden" style={{ animationDelay: '600ms' }}>
                <div className="aspect-[4/5] bg-zinc-900 rounded-[1.5rem] flex flex-col items-center justify-center p-8 text-center border border-white/5">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-6">
                    <Tag size={24} className="text-white/20" />
                  </div>
                  <h3 className="font-anton text-xl uppercase mb-3">Your Brand Here</h3>
                  <p className="text-white/30 text-[10px] leading-relaxed mb-6 font-outfit">
                    Reach millions of sports fans across the continent with MSI Advertising solutions.
                  </p>
                  <button className="px-6 py-2.5 rounded-full border border-white/10 text-[10px] font-anton tracking-widest uppercase hover:bg-white hover:text-black transition-all">
                    Contact Us
                  </button>
                </div>
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded text-[8px] font-anton text-white/30 tracking-widest uppercase">Sponsored</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Newsletter / CTA */}
      <section className="px-6 md:px-10 pb-32">
        <div className="max-w-7xl mx-auto">
          <div className="fade-up glass-card rounded-[4rem] p-12 md:p-20 relative overflow-hidden text-center">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-red-600/5 to-transparent" />
            <div className="relative z-10">
                <h2 className="font-anton text-4xl md:text-6xl lg:text-7xl uppercase mb-8 max-w-4xl mx-auto leading-tight">
                    Never Miss a <span className="text-red-600">Major Sports</span> Update
                </h2>
                <p className="text-white/50 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-outfit">
                    Join our weekly newsletter and get exclusive insights, interviews, and breaking news delivered directly to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                    <input 
                        type="email" 
                        placeholder="Enter your email address" 
                        className="w-full bg-white/5 border border-white/10 rounded-full py-4 px-8 outline-none focus:border-red-500/50 focus:bg-white/10 transition-all font-outfit"
                    />
                    <button className="w-full sm:w-auto px-10 py-4 bg-red-600 rounded-full font-anton tracking-widest uppercase hover:bg-red-700 transition-all shadow-xl shadow-red-900/40">
                        Subscribe
                    </button>
                </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer Bottom Spacer */}
      <div className="h-24" />
    </div>
  );
}
