import React, { useState, useEffect } from 'react';
import { 
  Instagram, 
  Twitter, 
  Linkedin, 
  ChevronLeft, 
  ChevronRight,
  Info,
  Play,
  Award,
  Users
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

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
      animation: fadeUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    .glass-card {
      background: rgba(255, 255, 255, 0.03);
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.3s ease;
    }

    .glass-card:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(232, 25, 44, 0.3);
      transform: translateY(-5px);
    }

    /* 3D Circle Hero Layout */
    .circle-container {
      position: relative;
      height: 600px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      perspective: 1500px;
      overflow: visible;
    }

    .circle-ring {
      position: relative;
      width: 220px;
      height: 300px;
      transform-style: preserve-3d;
      animation: rotateCircle 40s linear infinite;
    }

    .circle-ring:hover {
      animation-play-state: paused;
    }

    @keyframes rotateCircle {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }

    .circle-card {
      position: absolute;
      inset: 0;
      transform-style: preserve-3d;
      transform: rotateY(var(--item-rot)) translateZ(450px);
      transition: all 0.5s ease;
    }

    .circle-card-animation-wrapper {
      width: 100%;
      height: 100%;
      transform-style: preserve-3d;
      animation: counterRotate 40s linear infinite;
      animation-play-state: inherit;
    }

    @keyframes counterRotate {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(-360deg); }
    }

    .circle-card-content {
      width: 100%;
      height: 100%;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: #111;
      transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
      position: relative;
    }

    .circle-card-content img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      pointer-events: none;
      filter: grayscale(100%);
      transition: all 0.5s ease;
    }

    .circle-card:hover {
      z-index: 100 !important;
    }

    .circle-card:hover .circle-card-content {
      transform: scale(1.1) translateZ(50px);
      border-color: #E8192C;
      box-shadow: 0 0 30px rgba(232, 25, 44, 0.3);
    }

    .circle-card:hover .circle-card-content img {
      filter: grayscale(0%);
    }

    @media (max-width: 1024px) {
      .circle-card { transform: rotateY(var(--item-rot)) translateZ(320px); }
      .circle-container { height: 500px; }
      .circle-ring { width: 180px; height: 250px; }
    }

    @media (max-width: 768px) {
      .circle-container { 
        height: 380px; 
        perspective: 1000px; 
        display: flex;
        overflow: visible;
        padding: 0;
      }
      .circle-ring { 
        width: 110px; 
        height: 160px; 
        animation: rotateCircle 30s linear infinite;
        transform-style: preserve-3d;
      }
      .circle-card { 
        position: absolute; 
        inset: 0;
        transform: rotateY(var(--item-rot)) translateZ(140px); 
        transform-style: preserve-3d;
      }
      .circle-card-animation-wrapper { 
        animation: counterRotate 30s linear infinite; 
        animation-play-state: inherit;
        transform-style: preserve-3d;
      }
      .circle-card-content {
        border-radius: 16px;
      }
      .circle-card-content img { filter: grayscale(0%); }
    }

    .hero-glow {
      position: absolute;
      width: 800px;
      height: 500px;
      background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
      top: 40%;
      left: 50%;
      transform: translate(-50%, -50%);
      pointer-events: none;
      filter: blur(40px);
    }
  `}</style>
);

const TEAM = [
  {
    id: 1,
    name: "Herve Moukoury",
    role: "Directeur General",
    category: "EXECUTIVE",
    image: "https://res.cloudinary.com/dv9ef6mcp/image/upload/v1774725493/DSC_7643_s63a5i.jpg",
    bio: "Visionary leader driving MSI TV to new heights in sports broadcasting across Africa.",
    socials: { twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    id: 2,
    name: "Herve K",
    role: "Directeur De L'Information",
    category: "EXECUTIVE",
    image: "https://res.cloudinary.com/dv9ef6mcp/image/upload/v1774725489/DSC_7618_gopaf8.jpg",
    bio: "Award-winning journalist with over 15 years of experience in international sports reporting.",
    socials: { twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    id: 3,
    name: "Renaud Inang",
    role: "REC",
    category: "JOURNALIST",
    image: "https://res.cloudinary.com/dv9ef6mcp/image/upload/v1774725484/DSC_7596_zsgtbb.jpg",
    bio: "Strategic mastermind behind our most successful original series and live events.",
    socials: { twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    id: 4,
    name: "Alex Lembe",
    role: "JOURNALIST",
    category: "JOURNALIST",
    image: "https://res.cloudinary.com/dv9ef6mcp/image/upload/v1774725472/DSC_7572_wvrifq.jpg",
    bio: "Expert tactical analyst specializing in European and African football leagues.",
    socials: { twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    id: 5,
    name: "William Meli",
    role: "Field Correspondent",
    category: "JOURNALIST",
    image: "https://res.cloudinary.com/dv9ef6mcp/image/upload/v1774725470/DSC_7545_o4waqm.jpg",
    bio: "On-the-ground reporter bringing live updates from major stadiums globally.",
    socials: { twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    id: 6,
    name: "Esther Otto",
    role: "Documentary Director",
    category: "CREATIVE",
    image: "https://res.cloudinary.com/dv9ef6mcp/image/upload/v1774725492/DSC_7632_fzbgop.jpg",
    bio: "Telling human stories behind the athletes through cinematic documentaries.",
    socials: { twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    id: 7,
    name: "Jean Charles Ndoumbe Kingue",
    role: "CONSULTANT",
    category: "JOURNALIST SPORTIF",
    image: "https://res.cloudinary.com/dv9ef6mcp/image/upload/v1774725470/DSC_7558_jrizh9.jpg",
    bio: "Ensuring flawless broadcasting standards and implementing 4K technology.",
    socials: { twitter: "#", linkedin: "#", instagram: "#" }
  },
  {
    id: 8,
    name: "Mac Donald",
    role: "Digital Content Lead",
    category: "RESPONSABLE DE LA PRODUCTION",
    image: "https://res.cloudinary.com/dv9ef6mcp/image/upload/v1774725472/DSC_7566_vimfnb.jpg",
    bio: "Pioneering our social media presence and interactive fan platforms.",
    socials: { twitter: "#", linkedin: "#", instagram: "#" }
  }
];

export default function Gallery() {

  const [galleryData, setGalleryData] = useState([]);
    
      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:3002/api/msi/getallgallery?limit=8');
            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            const result = await response.json();
            setGalleryData(result.data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#050505] overflow-x-hidden selection:bg-red-600/30 font-outfit">
      <FontImport />

      {/* Decorative Background Glows */}
      <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Section: Meet our Team (3D Circle) */}
      <section className="relative pt-32 pb-20 px-6 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-16 relative z-10">
          <h1 className="fade-up font-anton text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight">
            Meet our <span className="text-red-600">Team</span>
          </h1>
          <p className="fade-up text-white/50 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: '100ms' }}>
            A diverse team of passionate professionals with unique skills driving innovation and excellence in every project.
          </p>
        </div>

        <div className="circle-container w-full fade-up" style={{ animationDelay: '200ms' }}>
          <div className="hero-glow" />
          <div className="circle-ring">
            {galleryData.map((member, i) => (
              <div 
                key={`circle-${member.gallery_id}`} 
                className="circle-card" 
                style={{ '--item-rot': `${i * 45}deg` }}
              >
                <div className="circle-card-animation-wrapper">
                  <div className="circle-card-content">
                    <img src={member.photo} alt={member.name} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Grid Section */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-zinc-950/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 fade-up">
            <h2 className="font-anton text-4xl md:text-5xl text-white mb-4 uppercase tracking-wider">Team</h2>
            <p className="text-white/40 max-w-2xl mx-auto">
              A diverse group of passionate professionals, each bringing unique skills and experiences to drive innovation and excellence in every project we undertake.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {galleryData.map((member, idx) => (
              <div 
                key={member.gallery_id} 
                className="fade-up group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="aspect-[4/5] rounded-[2rem] overflow-hidden mb-6 border border-white/5 bg-white/5 relative">
                  <img 
                    src={member.photo} 
                    alt={member.name} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-anton text-xl text-white tracking-wide uppercase group-hover:text-red-500 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-red-500 font-bold text-xs tracking-widest uppercase">
                    {member.role}
                  </p>
                  <p className="text-white/40 text-sm leading-relaxed line-clamp-3 pt-2">
                    {member.desc}
                  </p>
                  
                  <div className="flex gap-4 pt-4 text-white/30 group-hover:text-white/60 transition-colors">
                    <a href="#" className="hover:text-red-500 transition-colors"><Linkedin size={18} /></a>
                    <a href="#" className="hover:text-red-500 transition-colors"><Twitter size={18} /></a>
                    <a href="#" className="hover:text-red-500 transition-colors"><Instagram size={18} /></a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Spacer */}
      <div className="h-24" />
    </div>
  );
}