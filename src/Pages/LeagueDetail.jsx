import { Button, FileInput, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { FaPenClip, FaRecycle, FaPlus, FaArrowLeft, FaTrophy, FaFutbol, FaCalendarDays, FaUsers, FaBookAtlas } from 'react-icons/fa6'
import { HiOutlineExclamationCircle } from 'react-icons/hi';

/* ─────────────────────────────────────────
   FONT & GLOBAL STYLES  (mirrors leagues/index.jsx)
───────────────────────────────────────── */
const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');
    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.5s cubic-bezier(.22,1,.36,1) both; }

    /* ── Tab nav ── */
    .tab-btn {
      display: flex; align-items: center; gap-6px;
      padding: 9px 18px; border-radius: 12px; font-size: 13px;
      font-family: 'Outfit', sans-serif; font-weight: 600;
      border: none; cursor: pointer; transition: all 0.18s;
      white-space: nowrap;
    }
    .tab-btn.active { color: #fff; }
    .tab-btn.inactive { background: transparent; color: #64748b; }
    .tab-btn.inactive:hover { background: #f1f5f9; color: #334155; }

    /* ── Cards ── */
    .detail-card {
      background: #fff; border-radius: 16px; overflow: hidden;
      position: relative;
      transition: transform 0.22s ease, box-shadow 0.22s ease;
    }
    .detail-card:hover { transform: translateY(-3px); }
    .detail-card::after {
      content: ''; position: absolute; inset: 0; border-radius: 16px;
      border: 2px solid var(--tc, #a5b4fc);
      opacity: 0.45; pointer-events: none; transition: opacity 0.22s;
    }
    .detail-card:hover::after { opacity: 0.9; }
    .card-top-bar { position: absolute; top: 0; left: 0; right: 0; height: 4px; }

    /* ── Table ── */
    .league-table th {
      font-family: 'Outfit', sans-serif; font-size: 11px;
      font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
      color: #94a3b8; padding: 10px 14px; white-space: nowrap;
    }
    .league-table td {
      font-family: 'Outfit', sans-serif; font-size: 13px;
      padding: 12px 14px; color: #334155; border-top: 1px solid #f1f5f9;
    }
    .league-table tr:hover td { background: #f8fafc; }
    .league-table tr.highlight td { background: #f0f9ff; }

    /* ── Fixture card ── */
    .fixture-card {
      background: #fff; border-radius: 14px; overflow: hidden;
      border: 1px solid #e2e8f0; position: relative;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .fixture-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
    .fixture-strip { height: 3px; }

    /* ── Action icons ── */
    .action-icon {
      cursor: pointer; padding: 6px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.18s ease, color 0.18s ease;
    }
    .action-icon.edit:hover { background: #e0e7ff; color: #6366f1; }
    .action-icon.del:hover  { background: #fee2e2; color: #ef4444; }

    /* ── Hero banner ── */
    .hero-banner {
      border-radius: 20px; overflow: hidden; position: relative;
      padding: 32px 36px;
    }
    .hero-banner::before {
      content: ''; position: absolute; inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%);
    }
  `}</style>
)

/* ─────────────────────────────────────────
   HELPERS
───────────────────────────────────────── */
const hexGlow = (hex, alpha = 0.18) => {
  if (!hex || hex.length < 7) return `rgba(99,102,241,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
};

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
function LeagueDetail() {

  const { leagueId } = useParams()
  const navigate = useNavigate()

  /* ── League info ── */
  const [league, setLeague] = useState(null)

  /* ── Tab ── */
  const [activeTab, setActiveTab] = useState('teams')

  /* ── Teams state ── */
  const [teams, setTeams] = useState([])

  /* ── Fixtures state ── */
  const [fixtures, setFixtures] = useState([])

  /* ── Standings state ── */
  const [standings, setStandings] = useState([])

  const BASE = 'http://localhost:3002/api/msi'

  const tc = league?.themecolor || '#6366f1'


  /* ══════════════════════════════════
     FETCH LEAGUE
  ══════════════════════════════════ */
  useEffect(() => {
    const fetchLeague = async () => {
      try {
        const res = await fetch(`${BASE}/getleague/${leagueId}`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const result = await res.json();
        setLeague(result);
      } catch (err) { console.error(err); }
    };
    fetchLeague();
  }, [leagueId]);

  /* ══════════════════════════════════
     FETCH TEAMS
  ══════════════════════════════════ */
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const res = await fetch(`${BASE}/getallteam`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const result = await res.json();
        setTeams(result.data);
      } catch (err) { console.error(err); }
    };
    fetchTeams();
  }, []);

  /* ══════════════════════════════════
     FETCH FIXTURES
  ══════════════════════════════════ */
  useEffect(() => {
    const fetchFixtures = async () => {
      try {
        const res = await fetch(`${BASE}/getallfixture`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const result = await res.json();
        setFixtures(result.data || result);
      } catch (err) { console.error(err); }
    };
    fetchFixtures();
  }, []);

  /* ══════════════════════════════════
     FETCH STANDINGS
  ══════════════════════════════════ */
  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await fetch(`${BASE}/getallstanding`);
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const result = await res.json();
        setStandings(result.data || result);
      } catch (err) { console.error(err); }
    };
    fetchStandings();
  }, []);

  /* ── stat counters ── */
  
  const teamfilter = teams.filter(item => item.league === Number(leagueId))
  const fixturefilter = fixtures.filter(item => item.league === Number(leagueId) && !item.ft)
  const standingfilter = standings.filter(item => item.league === Number(leagueId))
  const resultfilter = fixtures.filter(item => item.league === Number(leagueId) && item.ft)
  
  const totalGoals = fixturefilter.reduce((a, f) => a + (parseInt(f.home_score) || 0) + (parseInt(f.away_score) || 0), 0);

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <div className='font-outfit min-h-screen bg-slate-50 px-4 py-10'>
      <FontImport />

      {/* ── Back + Header ── */}
      <div className='max-w-7xl mx-auto mb-6'>
        <button
          onClick={() => navigate(-1)}
          className='flex items-center gap-2 text-slate-500 hover:text-slate-800 text-sm font-semibold mb-6 transition-colors'
        >
          <FaArrowLeft size={12} /> Back to Leagues
        </button>

        {/* ── Hero Banner ── */}
        {league && (
          <div
            className='hero-banner mb-8 fade-up'
            style={{ background: `linear-gradient(135deg, ${tc} 0%, ${tc}cc 100%)`, boxShadow: `0 12px 40px ${hexGlow(tc, 0.35)}` }}
          >
            <div className='relative z-10 flex items-center justify-between flex-wrap gap-4'>
              <div className='flex items-center gap-5'>
                <div className='w-20 h-20 rounded-2xl bg-white bg-opacity-20 flex items-center justify-center p-2 backdrop-blur-sm border border-white border-opacity-30'>
                  <img src={league.logo} alt={league.name} className='w-14 h-14 object-contain' />
                </div>
                <div>
                  <p className='text-white text-opacity-75 text-xs font-semibold uppercase tracking-[0.2em] mb-1'>Football League</p>
                  <h1 className='font-anton text-white text-4xl md:text-5xl leading-none'>{league.name}</h1>
                  <span className='inline-block mt-2 bg-white bg-opacity-20 text-white text-xs font-bold px-3 py-1 rounded-full border border-white border-opacity-30'>
                    {league.abv}
                  </span>
                </div>
              </div>

              {/* ── Quick stats ── */}
              <div className='flex gap-3 flex-wrap'>
                {[
                  { label: 'Teams', value: teamfilter.length, icon: <FaUsers size={14} /> },
                  { label: 'Goals', value: totalGoals, icon: <FaTrophy size={14} /> },
                ].map(s => (
                  <div key={s.label} className='bg-white bg-opacity-15 backdrop-blur-sm border border-white border-opacity-20 rounded-xl px-4 py-3 text-center min-w-[70px]'>
                    <div className='text-white text-opacity-80 flex justify-center mb-1'>{s.icon}</div>
                    <div className='text-white font-anton text-xl leading-none'>{s.value}</div>
                    <div className='text-white text-opacity-70 text-[10px] uppercase tracking-wider mt-0.5'>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Tab bar ── */}
        <div className='flex items-center gap-2 bg-white rounded-2xl p-1.5 shadow-sm border border-slate-100 w-fit mb-8 flex-wrap'>
          {[
            { key: 'teams', label: 'Equipes', icon: <FaUsers size={12} /> },
            { key: 'fixtures', label: 'Matchs', icon: <FaCalendarDays size={12} /> },
            { key: 'standings', label: 'Tableux', icon: <FaTrophy size={12} /> },,
            { key: 'results', label: 'Resultats', icon: <FaBookAtlas size={12} /> },
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`tab-btn flex items-center gap-2 ${activeTab === tab.key ? 'active' : 'inactive'}`}
              style={activeTab === tab.key ? { background: tc, boxShadow: `0 4px 12px ${hexGlow(tc, 0.3)}` } : {}}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════════════════
            TEAMS TAB
        ══════════════════════════════════ */}
        {activeTab === 'teams' && (
          <div className='fade-up'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='block h-px w-8' style={{ background: tc }} />
              <span className='font-anton text-xs tracking-[0.22em] uppercase' style={{ color: tc }}>Admin</span>
            </div>
            <div className='flex items-end justify-between mb-6'>
              <h2 className='font-anton text-slate-800 text-3xl leading-none'>Equipes</h2>
            </div>

            <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {teamfilter.map((team, i) => (
                <div
                  key={team.team_id || team.id}
                  className='detail-card p-5 fade-up'
                  style={{ '--tc': tc, animationDelay: `${i * 55}ms`, boxShadow: `0 4px 20px ${hexGlow(tc, 0.1)}, 0 1px 4px rgba(0,0,0,0.05)` }}
                >
                  <div className='card-top-bar' style={{ background: tc }} />
                  <div className='flex items-center justify-between mt-2'>
                    <div className='flex items-center gap-3'>
                      <div className='w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0' style={{ border: `2px solid ${tc}`, background: `${tc}12` }}>
                        <img src={team.logo} alt={team.name} className='w-8 h-8 object-contain' />
                      </div>
                      <div>
                        <h3 className='font-extrabold text-slate-800 text-base leading-tight'>{team.name}</h3>
                        {team.abv && <span className='text-xs font-semibold px-2 py-0.5 rounded-full' style={{ background: `${tc}15`, color: tc }}>{team.abv}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {teamfilter.length === 0 && (
                <div className='col-span-3 text-center py-16 text-slate-400'>
                  <FaUsers size={32} className='mx-auto mb-3 opacity-30' />
                  <p className='font-outfit text-sm'>No teams yet. Add one above.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            FIXTURES TAB
        ══════════════════════════════════ */}
        {activeTab === 'fixtures' && (
          <div className='fade-up'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='block h-px w-8' style={{ background: tc }} />
              <span className='font-anton text-xs tracking-[0.22em] uppercase' style={{ color: tc }}>Admin</span>
            </div>
            <div className='flex items-end justify-between mb-6'>
              <h2 className='font-anton text-slate-800 text-3xl leading-none'>Fixtures</h2>
            </div>

            <div className='flex flex-col gap-3'>
              {fixturefilter.map((fix, i) => {
                return (
                  <div key={fix.fixture_id} className='fixture-card fade-up' style={{ animationDelay: `${i * 40}ms` }}>
                    <div className='fixture-strip' style={{ background: fix.live ? '#22c55e' : fix.ft ? tc : '#e2e8f0' }} />
                    <div className='p-4'>
                     <p className='text-center text-sm px-3 py-0.5 text-gray-600 font-bold bg-gray-500 w-fit mx-auto rounded-full bg-opacity-25 border-2 border-gray-300 m-1'>Matchday {fix.matchday}</p>
                      <div className='flex items-center justify-between gap-4'>
                        {/* Home */}
                        <div className='flex items-center gap-3 flex-1 justify-end'>
                          <span className='font-extrabold text-slate-800 text-sm text-right'>{fix.home_team_name}</span>
                          <img src={fix.home_team_logo} className='w-8 h-8 object-contain' alt="" />
                        </div>

                        {/* Score / Time */}
                        <div className='flex-shrink-0 text-center'>
                          {fix.ft ? (
                            <div className='font-anton text-2xl text-slate-800 leading-none px-4'>
                              {fix.home_score} – {fix.away_score}
                            </div>
                          ) : (
                            <div className='text-center'>
                              <div className='font-anton text-lg text-slate-400'>{fix.time}</div>
                              <div className='text-[10px] text-slate-400 uppercase tracking-wider'>{fix.date ? new Date(fix.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}</div>
                            </div>
                          )}
                          {fix.live && <span className='inline-block mt-1 bg-green-100 text-green-700 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full'>LIVE</span>}
                        </div>

                        {/* Away */}
                        <div className='flex items-center gap-3 flex-1'>
                          <img src={fix.away_team_logo} className='w-8 h-8 object-contain' alt="" />
                          <span className='font-extrabold text-slate-800 text-sm'>{fix.away_team_name}</span>
                        </div>
                      </div>
                      {fix.venue && <p className='text-[11px] text-slate-400 mt-2 text-center font-bold'>{fix.venue}</p>}
                    </div>
                  </div>
                );
              })}
              {fixturefilter.length === 0 && (
                <div className='text-center py-16 text-slate-400'>
                  <FaCalendarDays size={32} className='mx-auto mb-3 opacity-30' />
                  <p className='font-outfit text-sm'>No fixtures yet. Add one above.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
            STANDINGS TAB
        ══════════════════════════════════ */}
        {activeTab === 'standings' && (
          <div className='fade-up'>
            <div className='flex items-center gap-3 mb-2'>
              <span className='block h-px w-8' style={{ background: tc }} />
              <span className='font-anton text-xs tracking-[0.22em] uppercase' style={{ color: tc }}>Admin</span>
            </div>
            <div className='flex items-end justify-between mb-6'>
              <h2 className='font-anton text-slate-800 text-3xl leading-none'>Standings</h2>
            </div>

            <div className='bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden'>
              {/* Color top bar */}
              <div className='h-1' style={{ background: `linear-gradient(90deg, ${tc}, ${tc}66)` }} />
              <div className='overflow-x-auto'>
                <table className='league-table w-full'>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      <th className='text-left pl-5'>#</th>
                      <th className='text-left'>Team</th>
                      <th>Pts</th>
                      <th>M</th>
                      <th>W</th>
                      <th>D</th>
                      <th>L</th>
                      <th>GF</th>
                      <th>GA</th>
                      <th>GD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {standingfilter.length === 0 && (
                      <tr>
                        <td colSpan={11} className='text-center py-14 text-slate-400'>
                          <FaTrophy size={28} className='mx-auto mb-3 opacity-25' />
                          <p className='text-sm'>No standings yet. Add one above.</p>
                        </td>
                      </tr>
                    )}
                    {standingfilter.map((row, i) => {
                      const isTop = i === 0;
                      return (
                        <tr key={row.standing_id || row.id || i} className={isTop ? 'highlight' : ''}>
                          <td className='pl-5'>
                            <span className='font-bold text-slate-400 text-xs'>
                              {isTop
                                ? <span className='inline-block w-5 h-5 rounded-full text-white text-[10px] font-bold flex items-center justify-center' style={{ background: tc }}>{i + 1}</span>
                                : i + 1}
                            </span>
                          </td>
                          <td>
                            <div className='flex items-center gap-2 w-48 sm:w-36'>
                              <img src={row.logo} className='w-6 h-6 object-contain' alt="" />
                              <span className='font-semibold text-slate-800'>{row.name}</span>
                            </div>
                          </td>
                          <td className='text-center'>
                            <span className='font-extrabold text-slate-900 text-sm bg-blue-600 px-2.5 py-1 rounded-md'>{row.pointes}</span>
                          </td>
                          <td className='text-center font-medium'>{row.matches}</td>
                          <td className='text-center font-medium text-green-600'>{row.win}</td>
                          <td className='text-center font-medium text-amber-500'>{row.draw}</td>
                          <td className='text-center font-medium text-red-500'>{row.losses}</td>
                          <td className='text-center'>{row.goal_sc}</td>
                          <td className='text-center'>{row.goal_conc}</td>
                          <td className='text-center font-medium' style={{ color: row.goal_st >= 0 ? '#16a34a' : '#dc2626' }}>{row.goal_st >= 0 ? `+${row.goal_st}` : row.goal_st}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ══════════════════════════════════
              RESULTS TAB
          ══════════════════════════════════ */}
          {activeTab === 'results' && (
            <div className='fade-up'>
              <div className='flex items-center gap-3 mb-2'>
                <span className='block h-px w-8' style={{ background: tc }} />
                <span className='font-anton text-xs tracking-[0.22em] uppercase' style={{ color: tc }}>Admin</span>
              </div>
              <div className='flex items-end justify-between mb-6'>
                <h2 className='font-anton text-slate-800 text-3xl leading-none'>Results</h2>
              </div>

              <div className='flex flex-col gap-3'>
                {resultfilter.map((fix, i) => {
                  return (
                    <div key={fix.fixture_id} className='fixture-card fade-up' style={{ animationDelay: `${i * 40}ms` }}>
                      <div className='fixture-strip' style={{ background: fix.live ? '#22c55e' : fix.ft ? tc : '#e2e8f0' }} />
                      <div className='p-4'>
                      <p className='text-center text-sm px-3 py-0.5 text-gray-600 font-bold bg-gray-500 w-fit mx-auto rounded-full bg-opacity-25 border-2 border-gray-300 m-1'>Matchday {fix.matchday}</p>
                        <div className='flex items-center justify-between gap-4'>
                          {/* Home */}
                          <div className='flex items-center gap-3 flex-1 justify-end'>
                            <span className='font-extrabold text-slate-800 text-sm text-right'>{fix.home_team_name}</span>
                            <img src={fix.home_team_logo} className='w-8 h-8 object-contain' alt="" />
                          </div>

                          {/* Score / Time */}
                          <div className='flex-shrink-0 text-center'>
                              <div className='font-anton text-2xl text-slate-800 leading-none px-4'>
                                {fix.home_score} – {fix.away_score}
                              </div>
                          </div>

                          {/* Away */}
                          <div className='flex items-center gap-3 flex-1'>
                            <img src={fix.away_team_logo} className='w-8 h-8 object-contain' alt="" />
                            <span className='font-extrabold text-slate-800 text-sm'>{fix.away_team_name}</span>
                          </div>
                        </div>
                        {fix.venue && <p className='text-[11px] text-slate-400 mt-2 text-center font-bold'>{fix.venue}</p>}
                      </div>
                    </div>
                  );
                })}
                {resultfilter.length === 0 && (
                  <div className='text-center py-16 text-slate-400'>
                    <FaCalendarDays size={32} className='mx-auto mb-3 opacity-30' />
                    <p className='font-outfit text-sm'>No results yet. Add one above.</p>
                  </div>
                )}
              </div>
            </div>
          )}
      </div>

    </div>
  )
}

export default LeagueDetail