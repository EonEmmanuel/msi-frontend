import { useState, useRef, useEffect } from "react";

export default function LiveTV() {
  const [clock, setClock] = useState(new Date());
  const [viewers]         = useState((Math.floor(Math.random() * 40) + 18) + "K");
  const timer             = useRef(null);

  const [channel, setChannel]         = useState(null);
  const [schedule, setSchedule]       = useState([]);
  const [relatedChannels, setRelated] = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState(null);

  // Fetch live channel
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/api/msi/getalllive");
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setChannel(result.data[0]);
      } catch (error) {
        console.error("Error fetching live channel:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Fetch today's schedule
  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch("http://localhost:3002/api/msi/getallschedule");
        const data = await res.json();
        const today = new Date().toLocaleString("en-US", { weekday: "long" });
        const todayItems = (data.data || [])
          .filter((s) => s && s.day === today)
          .sort((a, b) => {
            const toMins = (t = "") => {
              const parts = (t || "").split(":");
              return (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0);
            };
            return toMins(a.time) - toMins(b.time);
          });
        setSchedule(todayItems);
      } catch (err) {
        console.error("Error fetching schedule:", err);
      }
    };
    fetchSchedule();
  }, []);

  // Fetch related programs
  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await fetch("http://localhost:3002/api/msi/getallprogram");
        const data = await res.json();
        setRelated(data.data || []);
      } catch (err) {
        console.error("Error fetching programs:", err);
      }
    };
    fetchPrograms();
  }, []);

  // Live clock — ticks every second so highlights update automatically
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const fmt = (d) =>
    d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const fmtDate = (d) =>
    d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  // ── Schedule highlight logic ──────────────────────────────────────────────
  const toMins = (t = "") => {
    const parts = (t || "").split(":");
    return (parseInt(parts[0]) || 0) * 60 + (parseInt(parts[1]) || 0);
  };

  const currentMins = clock.getHours() * 60 + clock.getMinutes();

  const dbLiveIndex = schedule.findIndex((item) => item.live === true);

const liveIndex = dbLiveIndex !== -1
  ? dbLiveIndex  // ← DB live field wins
  : schedule.reduce((found, item, i) => {
      const start = toMins(item.time);
      const next  = schedule[i + 1] ? toMins(schedule[i + 1].time) : 24 * 60;
      return currentMins >= start && currentMins < next ? i : found;
    }, -1);

  // Next upcoming = first item after liveIndex whose time hasn't passed
  const upcomingIndex = liveIndex >= 0
    ? liveIndex + 1 < schedule.length ? liveIndex + 1 : -1
    : schedule.findIndex((item) => toMins(item.time) > currentMins);

  const scheduleWithState = schedule.map((item, i) => ({
    ...item,
    isLive:     i === liveIndex,
    isUpcoming: i === upcomingIndex,
    isPast:     i < liveIndex || (liveIndex === -1 && toMins(item.time) < currentMins),
  }));
  // ─────────────────────────────────────────────────────────────────────────

  if (loading) {
    return (
      <div className="min-h-screen bg-[#08080f] flex items-center justify-center">
        <p className="text-white/40 text-sm animate-pulse tracking-widest">Loading live feed…</p>
      </div>
    );
  }

  if (error || !channel) {
    return (
      <div className="min-h-screen bg-[#08080f] flex items-center justify-center">
        <p className="text-red-400 text-sm tracking-widest">{error || "No live channel available."}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#08080f] flex items-center justify-center p-6">
      <div className="w-full max-w-4xl space-y-4">

        {/* ── Main Player Card ── */}
        <div className="rounded-2xl overflow-hidden bg-[#111118] border border-[#1c1c2e] shadow-[0_40px_100px_rgba(0,0,0,0.7)]">

          {/* Video */}
          <div className="relative aspect-video bg-black">
            <iframe
              src={channel.link}
              allowFullScreen
              className="w-full h-full border-0 block"
            />

            {/* Live badge */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-red-500 px-2.5 py-1 rounded-md pointer-events-none">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span className="text-white text-[11px] font-semibold tracking-widest">LIVE</span>
            </div>

            {/* Viewer count */}
            <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm px-2.5 py-1 rounded-md pointer-events-none border border-white/10">
              <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className="text-white/70">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
              </svg>
              <span className="text-white/70 text-[11px] font-semibold tracking-wider">{viewers} watching</span>
            </div>
          </div>

          {/* ── Info bar ── */}
          <div className="flex items-center justify-between px-5 py-4 border-t border-[#1c1c2e]">
            <div>
              <div className="text-white font-bold text-xl tracking-wide">{channel.name}</div>
              <div className="text-red-500 text-[11px] font-medium tracking-widest mt-0.5 uppercase">
                {channel.tag} · Live Broadcast
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <div className="text-white font-mono text-lg font-bold tracking-widest">{fmt(clock)}</div>
                <div className="text-white/30 text-[10px] tracking-wider">{fmtDate(clock)}</div>
              </div>
              <div className="flex items-center gap-2 text-white/30 text-[11px] tracking-widest uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                On Air
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom two-column row ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

          {/* ── Schedule ── */}
          <div className="md:col-span-2 rounded-2xl bg-[#111118] border border-[#1c1c2e] p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <svg width="14" height="14" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="18" rx="2"/>
                  <path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Today's Schedule</span>
              </div>
              <span className="text-white/20 text-[10px] tracking-wider uppercase">UTC+1</span>
            </div>

            <div className="space-y-1">
              {scheduleWithState.length > 0 ? scheduleWithState.map((item, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-500 ${
                    item.isLive
                      ? "bg-red-500/10 border border-red-500/20 shadow-[0_0_12px_rgba(239,68,68,0.08)]"
                      : item.isUpcoming
                      ? "bg-amber-500/8 border border-blue-500/90"
                      : item.isPast
                      ? "opacity-35 hover:bg-white/[0.02]"
                      : "hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Time */}
                    <span className={`font-mono text-sm font-semibold w-12 ${
                      item.isLive     ? "text-red-400"
                      : item.isUpcoming ? "text-blue-400"
                      : item.isPast   ? "text-white/25"
                      : "text-white/40"
                    }`}>
                      {(item.time || "").slice(0, 5)}
                    </span>

                    {/* Accent bar */}
                    <span className={`w-0.5 h-4 rounded-full ${
                      item.isLive     ? "bg-red-500"
                      : item.isUpcoming ? "bg-blue-400"
                      : item.isPast   ? "bg-white/10"
                      : "bg-white/20"
                    }`} />

                    {/* Show name */}
                    <span className={`text-sm font-medium ${
                      item.isLive     ? "text-white font-semibold"
                      : item.isUpcoming ? "text-blue-100/80"
                      : item.isPast   ? "text-white/25"
                      : "text-white/50"
                    }`}>
                      {item.name}
                    </span>
                  </div>

                  {/* Right badge */}
                  {item.isLive ? (
                    <span className="flex items-center gap-1.5 text-red-400 text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      Now
                    </span>
                  ) : item.isUpcoming ? (
                    <span className="flex items-center gap-1.5 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      Up Next
                    </span>
                  ) : item.isPast ? (
                    <span className="text-white/15 text-[10px] uppercase tracking-widest">Finished</span>
                  ) : (
                    <span className="text-white/20 text-[10px] uppercase tracking-widest">Later</span>
                  )}
                </div>
              )) : (
                <p className="text-white/20 text-xs text-center py-4 tracking-wider">No schedule for today</p>
              )}
            </div>
          </div>

          {/* ── Other Programs ── */}
          <div className="rounded-2xl bg-[#111118] border border-[#1c1c2e] p-5">
            <div className="flex items-center gap-2 mb-4">
              <svg width="14" height="14" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="7" width="20" height="15" rx="2"/>
                <path d="M17 7V5a2 2 0 00-2-2H9a2 2 0 00-2 2v2"/>
              </svg>
              <span className="text-white/70 text-xs font-bold uppercase tracking-widest">Top Interesting Program</span>
            </div>

            <div className="space-y-2">
              {relatedChannels.slice(0, 5).map((ch, i) => (
                <div
                  key={i}
                  className="flex items-center gap-1 justify-between px-3 py-2.5 rounded-xl bg-[#0d0d16] border border-[#1c1c2e] hover:border-[#2a2a40] cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-1.5 h-1.5 rounded-full animate-pulse"
                      style={{ background: ch.themecolor || "#6366f1" }}
                    />
                    <span className="text-white/70 text-sm font-medium group-hover:text-white transition-colors max-w-[500px]">
                      {ch.name}
                    </span>
                  </div>
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shrink-0"
                    style={{
                      color: ch.themecolor || "#6366f1",
                      background: `${ch.themecolor || "#6366f1"}18`,
                      border: `1px solid ${ch.themecolor || "#6366f1"}30`,
                    }}
                  >
                    {ch.tag}
                  </span>
                </div>
              ))}
            </div>

            {/* Signal quality */}
            <div className="mt-5 pt-4 border-t border-[#1c1c2e]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/30 text-[10px] uppercase tracking-wider">Signal Quality</span>
                <span className="text-green-400 text-[10px] font-bold uppercase tracking-wider">Excellent</span>
              </div>
              <div className="flex items-end gap-0.5 h-5">
                {[40, 55, 65, 80, 100, 100, 90].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-sm bg-green-500"
                    style={{ height: `${h}%`, opacity: 0.6 + i * 0.06 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Breaking News Ticker ── */}
        <div className="rounded-xl bg-[#111118] border border-[#1c1c2e] flex items-center overflow-hidden">
          <div className="bg-red-600 px-3 py-2 flex-shrink-0">
            <span className="text-white text-[11px] font-black uppercase tracking-widest">Breaking</span>
          </div>
          <div className="overflow-hidden flex-1 px-4">
            <div className="whitespace-nowrap text-white/60 text-xs tracking-wide animate-[marquee_28s_linear_infinite]">
              MEDIA SPORT INFO TV · Sports News Coverage · Latest Scores · Global Updates · Stay Informed · Breaking Sports News · Live Coverage from Around the World · MEDIA SPORT INFO TV Live ·
            </div>
          </div>
          <div className="flex-shrink-0 px-4 border-l border-[#1c1c2e]">
            <span className="text-white/20 text-[10px] font-mono tracking-widest">{fmt(clock)}</span>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(100%); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}