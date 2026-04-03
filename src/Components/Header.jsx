import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../img/logo.png';

/* ─────────────────────────── DATA ─────────────────────────── */
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Articles', href: '/articles' },
  { label: 'Replay', href: '/replay' },
  { label: 'Programs', href: '/programs' },
  // {
  //   label: 'Sports',
  //   dropdown: [
  //     { label: 'Football', href: '/articles?category=Sports&sub=Football' },
  //     { label: 'Basketball', href: '/articles?category=Sports&sub=Basketball' },
  //     { label: 'Tennis', href: '/articles?category=Sports&sub=Tennis' },
  //     { label: 'Athletics', href: '/articles?category=Sports&sub=Athletics' },
  //     { label: 'Rugby', href: '/articles?category=Sports&sub=Rugby' },
  //     { label: 'Boxing', href: '/articles?category=Sports&sub=Boxing' },
  //     { label: 'Swimming', href: '/articles?category=Sports&sub=Swimming' },
  //     { label: 'Cycling', href: '/articles?category=Sports&sub=Cycling' },
  //   ],
  // },
  { label: 'League', href: '/league' },
  // {
  //   label: 'International',
  //   dropdown: [
  //     { label: 'African Cup of Nations', href: '/articles?category=International&sub=African Cup of Nations' },
  //     { label: 'UEFA Championship', href: '/articles?category=International&sub=UEFA Championship' },
  //     { label: 'FIFA World Cup', href: '/articles?category=International&sub=FIFA World Cup' },
  //     { label: 'Copa América', href: '/articles?category=International&sub=Copa América' },
  //   ],
  // },
  { label: 'Gallery', href: '/gallery' },
  { label: 'About', href: '/about' },
];

const tickerItems = [
  '⚽ Manchester City 2–1 Arsenal — FT',
  '🏀 Lakers 108–102 Celtics — Final',
  '🎾 Djokovic advances to Wimbledon quarterfinals',
  '⚽ Super Eagles squad announced for AFCON qualifiers',
  '🏆 CAF Champions League: Zamalek vs Al Ahly — Tonight 8PM',
];

const sportTabs = ['Football', 'Basketball', 'Tennis', 'Rugby', 'Boxing', 'Athletics'];

/* ─────────────────────────── STYLES ─────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  @keyframes ticker {
    0% { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  @keyframes fadeSlideDown {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes mobileSlideIn {
    from { opacity: 0; transform: translateX(320px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .scrollbar-none::-webkit-scrollbar { display: none; }
  .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }

  .ticker-marquee {
    animation: ticker 30s linear infinite;
    display: flex;
    width: max-content;
  }

  .nav-underline {
    position: relative;
  }

  .nav-underline::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: #E8192C;
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.2s ease;
  }

  .nav-underline:hover::after,
  .nav-underline.active::after {
    transform: scaleX(1);
  }
`;

/* ─────────────────────────── TICKER COMPONENT ─────────────────────────── */
function Ticker() {
  const repeated = [...tickerItems, ...tickerItems];

  return (
    <div className="relative bg-gradient-to-r from-red-600 to-red-700 overflow-hidden h-9 flex items-center">
      {/* Live badge */}
      <div className="flex-shrink-0 flex items-center gap-2 px-4 h-full border-r border-white/20 bg-red-700 z-10">
        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
        <span className="text-white font-bold uppercase tracking-wider text-xs">BREAKING NEWS</span>
      </div>

      {/* Ticker content with fade mask */}
      <div
        className="overflow-hidden flex-1"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 40px, black calc(100% - 40px), transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 40px, black calc(100% - 40px), transparent)',
        }}
      >
        <div className="flex whitespace-nowrap gap-16 ticker-marquee">
          {repeated.map((item, i) => (
            <span key={i} className="text-white/95 flex-shrink-0 text-xs md:text-sm font-medium">
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────── DESKTOP DROPDOWN ─────────────────────────── */
function DesktopDropdown({ items }) {
  return (
    <div
      className="absolute top-full left-0 w-56 mt-3 bg-black/95 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden shadow-2xl z-50"
      style={{ animation: 'fadeSlideDown 0.2s ease' }}
    >
      <div className="p-2">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex items-center justify-between px-4 py-3 rounded-lg text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <span>{item.label}</span>
            <span className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 10L10 2M10 2H3M10 2v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── DESKTOP NAV ITEM ─────────────────────────── */
function DesktopNavItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const location = useLocation();

  const isActive = location.pathname === item.href;

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  if (!item.dropdown) {
    return (
      <Link
        to={item.href}
        className={`nav-underline px-4 py-2 text-sm font-medium transition-colors ${
          isActive ? 'active text-white' : 'text-white/60 hover:text-white'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all duration-200 ${
          open ? 'text-white' : 'text-white/60 hover:text-white'
        }`}
      >
        {item.label}
        <ChevronDown
          size={14}
          className={`transition-transform duration-300 ${open ? 'rotate-180 text-red-500' : ''}`}
        />
      </button>
      {open && <DesktopDropdown items={item.dropdown} />}
    </div>
  );
}

/* ─────────────────────────── MOBILE NAV ITEM ─────────────────────────── */
function MobileNavItem({ item, onClose }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isActive = location.pathname === item.href;

  if (!item.dropdown) {
    return (
      <Link
        to={item.href}
        onClick={onClose}
        className={`block px-4 py-3.5 text-base border-b border-white/5 transition-colors ${
          isActive ? 'text-white bg-white/5 font-semibold' : 'text-white/70 hover:text-white'
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div className="border-b border-white/5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3.5 text-base text-white/70 hover:text-white transition-colors"
      >
        {item.label}
        <ChevronDown
          size={16}
          className={`transition-transform duration-300 ${open ? 'rotate-180 text-red-500' : ''}`}
        />
      </button>
      {open && (
        <div className="bg-white/[0.02] px-6 py-3 space-y-2">
          {item.dropdown.map((sub) => (
            <a
              key={sub.label}
              href={sub.href}
              onClick={onClose}
              className="flex items-center gap-3 py-2.5 text-sm text-gray-400 hover:text-white transition-colors"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
              {sub.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────── MAIN HEADER ─────────────────────────── */
export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSport, setActiveSport] = useState('Football');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <style>{STYLES}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 w-full overflow-x-hidden ${
          scrolled
            ? 'bg-[#01175388] backdrop-blur-xl border-b border-white/5 shadow-lg'
            : 'bg-black backdrop-blur-sm'
        }`}
      >
        {/* Red accent top line */}
        <div className="h-1 bg-gradient-to-r from-red-600 to-red-700" />

        {/* Breaking news ticker */}
        <Ticker />

        {/* Main navigation bar */}
        <nav className="border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
              <Link to='/'>
                <img src={logo} className='w-20 h-20 object-contain' />
              </Link>
            
            {/* Desktop navigation - centered */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <DesktopNavItem key={item.label} item={item} />
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* Live TV button */}
              <a
                href="/livetv"
                className="hidden sm:flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all duration-200 font-bold text-xs md:text-sm tracking-wide flex-shrink-0 shadow-lg hover:shadow-xl"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span className="hidden sm:inline">LIVE</span>
              </a>

              {/* Sign In button */}
              <a
                href="#"
                className="hidden md:flex items-center px-4 py-2 rounded-full border border-white/20 text-white/70 hover:text-white hover:border-white/40 transition-all duration-200 text-sm font-medium flex-shrink-0"
              >
                Sign In
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen((o) => !o)}
                className="lg:hidden p-2 text-white/60 hover:text-white transition-colors"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ─────────────────────────── MOBILE DRAWER ─────────────────────────── */}
      {mobileOpen && (
        <>
          {/* Backdrop scrim */}
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden transition-opacity"
            onClick={() => setMobileOpen(false)}
          />

          {/* Mobile navigation panel */}
          <div
            className="fixed top-0 right-0 bottom-0 z-50 w-80 bg-black/95 backdrop-blur-xl border-l border-white/10 flex flex-col lg:hidden"
            style={{ animation: 'mobileSlideIn 0.3s ease' }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <Link to='/' onClick={() => setMobileOpen(false)}>
                <img src={logo} className='w-20 h-20 object-contain' />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-white/60 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation menu */}
            <div className="flex-1 overflow-y-auto scrollbar-none">
              {navItems.map((item) => (
                <MobileNavItem
                  key={item.label}
                  item={item}
                  onClose={() => setMobileOpen(false)}
                />
              ))}
            </div>

            {/* Sports tabs section */}
            <div className="px-6 py-6 border-t border-white/10">
              <p className="text-white/40 uppercase text-xs font-bold mb-4 tracking-wider">Popular Sports</p>
              <div className="flex flex-wrap gap-2">
                {sportTabs.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setActiveSport(sport)}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-200 ${
                      activeSport === sport
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile CTA buttons */}
            <div className="px-6 pb-8 pt-4 border-t border-white/10 flex flex-col gap-3">
              <a
                href="/livetv"
                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold uppercase tracking-wider transition-all text-sm"
              >
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                LIVE TV
              </a>
              <a
                href="#"
                className="flex items-center justify-center border border-white/20 text-white/70 hover:text-white px-6 py-3 rounded-xl font-medium transition-all text-sm"
              >
                Sign In
              </a>
            </div>
          </div>
        </>
      )}

      {/* Header spacer */}
      <div className="h-24 md:h-[120px]" />
    </>
  );
}