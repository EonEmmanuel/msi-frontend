import React from 'react';
import { 
  Tv, 
  Globe, 
  Award, 
  Users, 
  Zap, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Phone,
  ChevronRight
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
      transition: all 0.3s ease;
    }

    .glass-card:hover {
      background: rgba(255, 255, 255, 0.05);
      border-color: rgba(232, 25, 44, 0.3);
      transform: translateY(-5px);
    }
  `}</style>
);

const FEATURES = [
  {
    icon: <Globe className="text-red-500" size={32} />,
    title: "Global Reach",
    description: "Broadcasting to millions across Africa and beyond, bringing the world of sports to your fingertips."
  },
  {
    icon: <Zap className="text-red-500" size={32} />,
    title: "Live Innovation",
    description: "Utilizing cutting-edge 4K broadcasting technology for a seamless, ultra-high-definition viewing experience."
  },
  {
    icon: <Award className="text-red-500" size={32} />,
    title: "Award Winning",
    description: "Recognized as Africa's premier sports network for three consecutive years by the Continental Media Forum."
  },
  {
    icon: <ShieldCheck className="text-red-500" size={32} />,
    title: "Trusted Content",
    description: "Our team of expert analysts and journalists provide authentic, deep-dive coverage you can rely on."
  }
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-red-500/30">
      <FontImport />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:px-10 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-blue-600/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="fade-up flex items-center justify-center gap-3 mb-6">
            <span className="h-px w-10 bg-red-500" />
            <span className="font-anton text-red-500 text-sm tracking-[0.3em] uppercase">Established 2015</span>
            <span className="h-px w-10 bg-red-500" />
          </div>
          
          <h1 className="fade-up font-anton text-6xl md:text-8xl lg:text-9xl mb-8 leading-none tracking-tight">
            WE ARE <span className="text-red-600">MSI TV</span>
          </h1>
          
          <p className="fade-up font-outfit text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed mb-12" style={{ animationDelay: '100ms' }}>
            Africa's premier destination for high-octane sports, breaking news, and exclusive documentary content. We don't just broadcast; we tell the stories that matter.
          </p>

          <div className="fade-up flex flex-wrap justify-center gap-6" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center gap-4 px-8 py-4 bg-red-600 rounded-full font-anton tracking-wider hover:bg-red-700 transition-all cursor-pointer shadow-lg shadow-red-900/20">
              EXPLORE OUR MISSION <ChevronRight size={20} />
            </div>
            <div className="flex items-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-full font-anton tracking-wider hover:bg-white/10 transition-all cursor-pointer">
              VIEW SCHEDULE
            </div>
          </div>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-24 px-6 md:px-10 bg-zinc-950/50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-up">
            <h2 className="font-anton text-4xl md:text-5xl mb-8">
              PIONEERING THE FUTURE OF <br />
              <span className="text-blue-500">AFRICAN BROADCASTING</span>
            </h2>
            <div className="space-y-6 font-outfit text-lg text-white/50 leading-relaxed">
              <p>
                Founded on the principles of integrity, passion, and technological excellence, MSI TV has grown from a local sports channel to a continental powerhouse. We believe that every fan deserves front-row access to the world's most exciting sporting events.
              </p>
              <p>
                Our mission is to empower African athletes by providing a platform that showcases their talent to the world, while delivering unparalleled entertainment to our viewers. From the grassroots to the global stage, we are there.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <h4 className="font-anton text-4xl text-white mb-1">50M+</h4>
                <p className="font-outfit text-sm text-red-500 uppercase tracking-widest font-bold">Monthly Viewers</p>
              </div>
              <div>
                <h4 className="font-anton text-4xl text-white mb-1">24/7</h4>
                <p className="font-outfit text-sm text-red-500 uppercase tracking-widest font-bold">HD Coverage</p>
              </div>
            </div>
          </div>

          <div className="fade-up relative" style={{ animationDelay: '150ms' }}>
            <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative group">
              <img 
                src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1200" 
                alt="Studio" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <Tv size={24} className="text-white" />
                  </div>
                  <div>
                    <h5 className="font-anton text-lg">STATE-OF-THE-ART</h5>
                    <p className="font-outfit text-sm text-white/60">Digital Broadcasting Center</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Grid */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 fade-up">
            <h2 className="font-anton text-4xl md:text-6xl mb-4 uppercase">MSI TV <span className="text-red-500">Edge</span></h2>
            <p className="font-outfit text-white/40 max-w-2xl mx-auto text-lg">We differentiate ourselves through quality, consistency, and a deep understanding of what fans want.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, idx) => (
              <div 
                key={idx} 
                className="fade-up p-8 glass-card rounded-[2rem]"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit">
                  {feature.icon}
                </div>
                <h3 className="font-anton text-xl mb-3 uppercase">{feature.title}</h3>
                <p className="font-outfit text-white/40 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership/Team Teaser */}
      <section className="py-24 px-6 md:px-10 bg-zinc-950/50 overflow-hidden relative">
         <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
               <div className="fade-up order-2 lg:order-1 grid grid-cols-2 gap-4">
                  <div className="space-y-4 translate-y-8">
                     <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Team" />
                     </div>
                     <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Team" />
                     </div>
                  </div>
                  <div className="space-y-4">
                     <div className="aspect-square rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Team" />
                     </div>
                     <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 grayscale hover:grayscale-0 transition-all duration-500">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400" className="w-full h-full object-cover" alt="Team" />
                     </div>
                  </div>
               </div>
               <div className="fade-up order-1 lg:order-2">
                  <h2 className="font-anton text-4xl md:text-5xl mb-8">
                    POWERED BY <br />
                    <span className="text-red-600">CREATIVE MINDS</span>
                  </h2>
                  <p className="font-outfit text-lg text-white/50 leading-relaxed mb-8">
                    Our team consists of over 500 dedicated professionals, including veteran broadcasters, award-winning directors, and digital innovators. Together, we work around the clock to ensure MSI TV remains at the pinnacle of sports media.
                  </p>
                  <div className="flex items-center gap-3 font-anton tracking-widest text-sm text-white hover:text-red-500 transition-colors cursor-pointer group">
                    MEET THE LEADERSHIP <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Contact Banner */}
      <section className="py-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
          
          <h2 className="font-anton text-4xl md:text-6xl mb-8 uppercase">GET IN <span className="text-red-500">TOUCH</span></h2>
          <p className="font-outfit text-white/40 mb-12 text-lg max-w-xl mx-auto">
            Whether you're looking for partnership opportunities or have a viewer inquiry, our team is here to help.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-red-600/10 rounded-full text-red-500">
                <Mail size={24} />
              </div>
              <p className="font-anton tracking-wider text-sm uppercase">Email Us</p>
              <p className="font-outfit text-white/40 text-sm">contact@mediasportinfos.tv</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-red-600/10 rounded-full text-red-500">
                <Phone size={24} />
              </div>
              <p className="font-anton tracking-wider text-sm uppercase">Call Us</p>
              <p className="font-outfit text-white/40 text-sm">+237 620 987 894</p>
            </div>
            <div className="flex flex-col items-center gap-4">
              <div className="p-4 bg-red-600/10 rounded-full text-red-500">
                <MapPin size={24} />
              </div>
              <p className="font-anton tracking-wider text-sm uppercase">Visit Us</p>
              <p className="font-outfit text-white/40 text-sm">Douala-Youpwe, Cameroun</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Spacer for Global Footer */}
      <div className="h-20" />
    </div>
  );
}
