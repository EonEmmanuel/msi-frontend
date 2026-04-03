import { useState, useEffect, useRef } from 'react';
import logo from '../img/logo.png'

/* ─────────────────────────── DATA ─────────────────────────── */
const navItems = [
  { label: 'Home', href: '#' },
  {
    label: 'Sports',
    dropdown: [
      { label: 'Football', href: '#' },
      { label: 'Basketball', href: '#' },
      { label: 'Tennis', href: '#' },
      { label: 'Athletics', href: '#' },
      { label: 'Rugby', href: '#' },
      { label: 'Boxing', href: '#' },
      { label: 'Swimming', href: '#' },
      { label: 'Cycling', href: '#' },
    ],
  },
  { label: 'Replay', href: '#' },
  { label: 'Programs', href: '#' },
  {
    label: 'League',
    dropdown: [
      { label: 'Premier League', href: '#' },
      { label: 'La Liga', href: '#' },
      { label: 'Bundesliga', href: '#' },
      { label: 'Serie A', href: '#' },
      { label: 'Ligue 1', href: '#' },
      { label: 'NPFL', href: '#' },
      { label: 'CAF Champions League', href: '#' },
    ],
  },
  {
    label: 'International',
    dropdown: [
      { label: 'African Cup of Nations', href: '#' },
      { label: 'UEFA Championship', href: '#' },
      { label: 'FIFA World Cup', href: '#' },
      { label: 'Copa América', href: '#' },
    ],
  },
  { label: 'About Us', href: '#' },
];

const tickerItems = [
  '⚽  Manchester City 2–1 Arsenal — FT',
  '🏀  Lakers 108–102 Celtics — Final',
  '🎾  Djokovic advances to Wimbledon quarterfinals',
  '⚽  Super Eagles squad announced for AFCON qualifiers',
  '🏆  CAF Champions League: Zamalek vs Al Ahly — Tonight 8PM',
];

const sportTabs = ['Football', 'Basketball', 'Tennis', 'Rugby', 'Boxing', 'Athletics'];

/* ─────────────────────────── ICONS ─────────────────────────── */
function ChevronDown({ className = '' }) {
  return (
    <svg className={className} width="11" height="11" viewBox="0 0 12 12" fill="none">
      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 6h16M4 12h16M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
      <path d="M2 8L8 2M8 2H3M8 2v5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ─────────────────────────── TICKER ─────────────────────────── */
function Ticker() {
  const repeated = [...tickerItems, ...tickerItems];
  return (
    <div className="relative bg-[#D0101F] overflow-hidden h-8 flex items-center">
      <div className="flex-shrink-0 flex items-center gap-2 pl-4 pr-3 h-full border-r border-white/20 bg-[#D0101F] z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
        <span
          className="text-white font-black tracking-[0.2em] uppercase"
          style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11 }}
        >
          Breaking
        </span>
      </div>
      <div
        className="overflow-hidden flex-1"
        style={{
          maskImage: 'linear-gradient(90deg, transparent, black 30px, black calc(100% - 30px), transparent)',
          WebkitMaskImage: 'linear-gradient(90deg, transparent, black 30px, black calc(100% - 30px), transparent)',
        }}
      >
        <div className="flex whitespace-nowrap gap-14" style={{ animation: 'ticker 30s linear infinite' }}>
          {repeated.map((item, i) => (
            <span
              key={i}
              className="text-white/90 flex-shrink-0"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5 }}
            >
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
      className="absolute top-[calc(100%+10px)] left-0 w-52 bg-[#111] border border-white/[0.07] rounded-xl overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.7)] z-50"
      style={{ animation: 'fadeSlideDown 0.18s ease' }}
    >
      <div className="p-1.5">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="group flex items-center justify-between px-3 py-2.5 rounded-lg text-[13px] text-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-150"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {item.label}
            <span className="opacity-0 group-hover:opacity-100 text-[#E8192C] transition-opacity duration-150">
              <ArrowUpRight />
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

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const baseClass =
    'relative flex items-center gap-1.5 px-3.5 py-2 text-[13px] tracking-wide transition-colors duration-150 group';

  if (!item.dropdown) {
    return (
      <a
        href={item.href}
        className={`${baseClass} text-white/50 hover:text-white`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {item.label}
        <span className="absolute bottom-0 left-3 right-3 h-px bg-[#E8192C] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
      </a>
    );
  }

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={`${baseClass} ${open ? 'text-white' : 'text-white/50 hover:text-white'}`}
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {item.label}
        <ChevronDown
          className={`transition-transform duration-200 ${open ? 'rotate-180 text-[#E8192C]' : ''}`}
        />
        <span
          className={`absolute bottom-0 left-3 right-3 h-px bg-[#E8192C] transition-transform duration-200 origin-left ${
            open ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </button>
      {open && <DesktopDropdown items={item.dropdown} />}
    </div>
  );
}

/* ─────────────────────────── SPORT STRIP ─────────────────────────── */
function SportStrip({ active, setActive }) {
  return (
    <div className="hidden lg:flex items-center border-t border-white/[0.06]">
      <div className="flex items-center px-8 gap-1 overflow-x-auto scrollbar-none">
        {sportTabs.map((sport) => (
          <button
            key={sport}
            onClick={() => setActive(sport)}
            className={`relative px-4 py-2.5 uppercase whitespace-nowrap transition-colors duration-150 ${
              active === sport ? 'text-white' : 'text-white/30 hover:text-white/65'
            }`}
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: 12,
              letterSpacing: '0.14em',
              fontWeight: 700,
            }}
          >
            {sport}
            {active === sport && (
              <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E8192C] rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────── MOBILE NAV ITEM ─────────────────────────── */
function MobileNavItem({ item, onClose }) {
  const [open, setOpen] = useState(false);

  if (!item.dropdown) {
    return (
      <a
        href={item.href}
        onClick={onClose}
        className="flex items-center justify-between px-1 py-3.5 text-[15px] text-white/65 hover:text-white border-b border-white/[0.06] transition-colors"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {item.label}
      </a>
    );
  }

  return (
    <div className="border-b border-white/[0.06]">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-1 py-3.5 text-[15px] text-white/65 hover:text-white transition-colors"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {item.label}
        <ChevronDown className={`transition-transform duration-200 ${open ? 'rotate-180 text-[#E8192C]' : ''}`} />
      </button>
      {open && (
        <div className="pb-3 pl-4 space-y-0.5">
          {item.dropdown.map((sub) => (
            <a
              key={sub.label}
              href={sub.href}
              onClick={onClose}
              className="flex items-center gap-2.5 py-2.5 text-[13px] text-gray-400 hover:text-white/80 transition-colors"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <span className="w-1 h-1 rounded-full text-white flex-shrink-0" />
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
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      {/* Global keyframes + fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@600;700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes mobileSlideIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .scrollbar-none::-webkit-scrollbar { display: none; }
        .scrollbar-none { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
          scrolled
            ? 'bg-[#05004a] backdrop-blur-xl shadow-[0_1px_0_rgba(255,255,255,0.05)]'
            : 'bg-[#090033]'
        }`}
      >
        {/* Signature red top rule */}
        <div className="h-[3px] bg-[#E8192C]" />

        {/* Breaking ticker */}
        <Ticker />

        {/* ── Main nav row ── */}
        <div className="relative flex items-center justify-between px-5 lg:px-10 h-16 lg:h-[66px]">

          {/* Logo */}
          <img src={logo} alt="MehHom TV Logo" className="w-auto h-12 lg:h-12" />

          {/* Desktop center nav */}
          <nav className="hidden lg:flex items-center gap-0 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <DesktopNavItem key={item.label} item={item} />
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <a
              href="#"
              className="hidden sm:flex items-center gap-2 bg-[#E8192C] hover:bg-[#C4101E] text-white rounded-full px-4 py-[7px] transition-colors duration-200 flex-shrink-0"
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.15em',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              LIVE TV
            </a>

            <a
              href="#"
              className="hidden md:flex items-center px-4 py-[7px] rounded-full border border-white/[0.12] text-white/50 hover:text-white hover:border-white/25 transition-all duration-200 flex-shrink-0"
              style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12 }}
            >
              Sign In
            </a>

            <button
              onClick={() => setMobileOpen((o) => !o)}
              className="lg:hidden p-2 -mr-1 text-white/55 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Sport filter strip (desktop) */}
        <SportStrip active={activeSport} setActive={setActiveSport} />
      </header>

      {/* ── Mobile drawer ── */}
      {mobileOpen && (
        <>
          {/* Scrim */}
          <div
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileOpen(false)}
          />
          {/* Slide-in panel */}
          <div
            className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-[320px] bg-[#0e0e0e] border-l border-white/[0.07] flex flex-col lg:hidden"
            style={{ animation: 'mobileSlideIn 0.22s ease' }}
          >
            {/* Panel header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.07]">
              <img src={logo} alt="MehHom TV Logo" className="w-auto h-12 lg:h-12" />
              <button
                onClick={() => setMobileOpen(false)}
                className="p-1.5 text-white/35 hover:text-white transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Nav items */}
            <div className="flex-1 overflow-y-auto px-6 py-2">
              {navItems.map((item) => (
                <MobileNavItem key={item.label} item={item} onClose={() => setMobileOpen(false)} />
              ))}
            </div>

            {/* Sport pills */}
            <div className="px-6 py-4 border-t border-white/[0.07]">
              <p
                className="text-white/25 uppercase mb-3"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 10, letterSpacing: '0.18em' }}
              >
                Sports
              </p>
              <div className="flex flex-wrap gap-2">
                {sportTabs.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setActiveSport(sport)}
                    className={`px-3 py-1.5 rounded-full uppercase tracking-wider transition-all duration-150 ${
                      activeSport === sport
                        ? 'bg-[#E8192C] text-white'
                        : 'bg-white/[0.06] text-white hover:bg-white/10 hover:text-white/75'
                    }`}
                    style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 11, letterSpacing: '0.12em', fontWeight: 700 }}
                  >
                    {sport}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile CTAs */}
            <div className="px-6 pb-8 pt-4 border-t border-white/[0.07] flex gap-3">
              <a
                href="#"
                className="flex-1 flex items-center justify-center gap-2 bg-[#E8192C] hover:bg-[#C4101E] text-white rounded-xl py-3 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: '0.15em' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                LIVE TV
              </a>
              <a
                href="#"
                className="flex-1 flex items-center justify-center border border-white/[0.12] text-white/50 hover:text-white hover:border-white/25 rounded-xl py-3 transition-all"
                style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13 }}
              >
                Sign In
              </a>
            </div>
          </div>
        </>
      )}

      {/* Spacer: ticker 32 + nav 66 + sport strip 42 = 140 desktop; mobile ticker + nav = 96 */}
      <div className="h-24 lg:h-[140px]" />
    </>
  );
}