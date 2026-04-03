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

const inputCls = 'block w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white';
const submitCls = 'relative w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 shadow-sm shadow-indigo-200';

const Spinner = ({ label }) => (
  <span className="flex items-center justify-center gap-2">
    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
    {label}
  </span>
);

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
  const [addTeam, setAddTeam] = useState(false)
  const [updateTeam, setUpdateTeam] = useState(false)
  const [deleteTeam, setDeleteTeam] = useState(false)
  const [deleteTeamId, setDeleteTeamId] = useState('')
  const [updateTeamId, setUpdateTeamId] = useState('')
  const [teamForm, setTeamForm] = useState({ name: '', abv: '', logo: ''})
  const [updateTeamData, setUpdateTeamData] = useState({})

  /* ── Fixtures state ── */
  const [fixtures, setFixtures] = useState([])
  const [addFixture, setAddFixture] = useState(false)
  const [updateFixture, setUpdateFixture] = useState(false)
  const [deleteFixture, setDeleteFixture] = useState(false)
  const [deleteFixtureId, setDeleteFixtureId] = useState('')
  const [updateFixtureId, setUpdateFixtureId] = useState('')
  const [fixtureForm, setFixtureForm] = useState({ home_team: '', away_team: '', date: '', time: '', venue: '', upcoming: '', matchday: '' })
  const [updateFixtureData, setUpdateFixtureData] = useState({})

  /* ── Standings state ── */
  const [standings, setStandings] = useState([])
  const [addStanding, setAddStanding] = useState(false)
  const [standingForm, setStandingForm] = useState({ team: '', pointes: 0, matches: 0, win: 0, draw: 0, losses: 0, goal_sc: 0, goal_conc: 0, goal_st: 0 })
  const [updateStandingData, setUpdateStandingData] = useState({})
  const [updateStanding, setUpdateStanding] = useState(false)
  const [deleteStanding, setDeleteStanding] = useState(false)
  const [deleteStandingId, setDeleteStandingId] = useState('')
  const [updateStandingId, setUpdateStandingId] = useState('')


  /* ── Shared ── */
  const [img, setImg] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const CLOUD_NAME = 'drzoiigek';
  const UPLOAD_PRESET = 'mtn-upload';
  const BASE = 'http://localhost:3002/api/msi'

  const tc = league?.themecolor || '#6366f1'

  /* ── Alert ── */
  const AlertBox = () => message.text ? (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
      message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'
    }`}>
      <span className="mt-0.5 shrink-0">
        {message.type === 'success'
          ? <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
          : <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
        }
      </span>
      {message.text}
    </div>
  ) : null;

  /* ── Image upload ── */
  const uploadImage = async (file) => {
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', UPLOAD_PRESET);
    const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: imageData });
    if (!response.ok) throw new Error("Image upload failed");
    const data = await response.json();
    return data.secure_url;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setIsLoading(true);
      const url = await uploadImage(file);
      setImg(url);
      setTeamForm(f => ({ ...f, logo: url }));
      setUpdateTeamData(f => ({ ...f, logo: url }));
      setMessage({ text: 'Image uploaded!', type: 'success' });
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally { setIsLoading(false); }
  };

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
  }, [leagueId]);

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
  }, [leagueId]);

  /* ══════════════════════════════════
     TEAM HANDLERS
  ══════════════════════════════════ */
  const handleAddTeam = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const res = await fetch(`${BASE}/createteam`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...teamForm, league: leagueId })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage({ text: 'Team added successfully!!', type: 'success' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally { setIsLoading(false); }
  };

  const handleUpdateTeam = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const res = await fetch(`${BASE}/updateteam/${updateTeamId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateTeamData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage({ text: 'Team Updated successfully!!', type: 'success' });
      setTimeout(() => window.location.reload(), 3500);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally { setIsLoading(false); }
  };

  const handleDeleteTeam = async () => {
    try {
      const res = await fetch(`${BASE}/deleteteam/${deleteTeamId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) { setMessage({ text: data.message, type: 'error' }); return; }
      setMessage({ text: 'Team Deleted successfully!!', type: 'success' });
      setDeleteTeam(false);
      setTeams(prev => prev.filter(t => t.team_id !== deleteTeamId));
    } catch (err) { setMessage({ text: err.message, type: 'error' }); }
  };

  /* ══════════════════════════════════
     FIXTURE HANDLERS
  ══════════════════════════════════ */
  const handleAddFixture = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const res = await fetch(`${BASE}/createfixture`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fixtureForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage({ text: 'Fixture added successfully!!', type: 'success' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally { setIsLoading(false); }
  };

  const handleUpdateFixture = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const res = await fetch(`${BASE}/updatefixture/${updateFixtureId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateFixtureData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage({ text: 'Fixture Updated successfully!!', type: 'success' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally { setIsLoading(false); }
  };

  const handleDeleteFixture = async () => {
    try {
      const res = await fetch(`${BASE}/deletefixture/${deleteFixtureId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) { setMessage({ text: data.message, type: 'error' }); return; }
      setMessage({ text: 'Fixture Deleted successfully!!', type: 'success' });
      setDeleteFixture(false);
      setFixtures(prev => prev.filter(f => f.fixture_id !== deleteFixtureId));
    } catch (err) { setMessage({ text: err.message, type: 'error' }); }
  };

  /* ══════════════════════════════════
     STANDING HANDLERS
  ══════════════════════════════════ */
  const handleAddStanding = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const res = await fetch(`${BASE}/createstanding`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(standingForm)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage({ text: 'Standing added successfully!!', type: 'success' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally { setIsLoading(false); }
  };

  const handleUpdateStanding = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const res = await fetch(`${BASE}/updatestanding/${updateStandingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateStandingData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setMessage({ text: 'Standing Updated successfully!!', type: 'success' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (err) {
      setMessage({ text: err.message, type: 'error' });
    } finally { setIsLoading(false); }
  };

  const handleDeleteStanding = async () => {
    try {
      const res = await fetch(`${BASE}/deletestanding/${deleteStandingId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) { setMessage({ text: data.message, type: 'error' }); return; }
      setMessage({ text: 'Standing Deleted successfully!!', type: 'success' });
      setDeleteStanding(false);
      setStandings(prev => prev.filter(s => s.stand_id !== deleteStandingId));
    } catch (err) { setMessage({ text: err.message, type: 'error' }); }
  };


  /* ── open edit team ── */
  const openEditTeam = (team) => {
    setUpdateTeamId(team.team_id);
    setUpdateTeamData(team);
    setImg('');
    setMessage({ text: '', type: '' });
    setUpdateTeam(true);
  };

  /* ── open edit fixture ── */
  const openEditFixture = (fix) => {
    setUpdateFixtureId(fix.fixture_id);
    setUpdateFixtureData(fix);
    setMessage({ text: '', type: '' });
    setUpdateFixture(true);
  };

  /* ── open edit standing ── */
  const openEditStanding = (standing) => {
    setUpdateStandingId(standing.stand_id);
    setUpdateStandingData(standing);
    setMessage({ text: '', type: '' });
    setUpdateStanding(true);
  };

  /* ── stat counters ── */
  
  const teamfilter = teams.filter(item => item.league === Number(leagueId))
  const fixturefilter = fixtures.filter(item => item.league === Number(leagueId) && !item.ft)
  const standingfilter = standings.filter(item => item.league === Number(leagueId))
  const resultfilter = fixtures.filter(item => item.league === Number(leagueId) && item.ft)
  
  const totalGoals = fixturefilter.reduce((a, f) => a + (parseInt(f.home_score) || 0) + (parseInt(f.away_score) || 0), 0);
  const played = fixturefilter.filter(f => f.ft).length;

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
                  { label: 'Fixtures', value: fixturefilter.length, icon: <FaCalendarDays size={14} /> },
                  { label: 'Played', value: played, icon: <FaFutbol size={14} /> },
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
            { key: 'teams', label: 'Teams', icon: <FaUsers size={12} /> },
            { key: 'fixtures', label: 'Fixtures', icon: <FaCalendarDays size={12} /> },
            { key: 'standings', label: 'Standings', icon: <FaTrophy size={12} /> },,
            { key: 'results', label: 'Results', icon: <FaBookAtlas size={12} /> },
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
              <h2 className='font-anton text-slate-800 text-3xl leading-none'>Teams</h2>
              <button
                onClick={() => { setAddTeam(true); setMessage({ text: '', type: '' }); setImg(''); setTeamForm({ name: '', shortname: '', logo: ''}); }}
                className='flex items-center gap-2 font-outfit text-sm font-semibold text-white px-5 py-2 rounded-xl transition-all duration-200'
                style={{ background: tc, boxShadow: `0 4px 14px ${hexGlow(tc, 0.35)}` }}
              >
                <FaPlus size={12} /> Add Team
              </button>
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
                    <div className='flex gap-1'>
                      <span className='action-icon edit text-slate-400' onClick={() => openEditTeam(team)}><FaPenClip size={13} /></span>
                      <span className='action-icon del text-slate-400' onClick={() => { setDeleteTeam(true); setDeleteTeamId(team.team_id); }}><FaRecycle size={13} /></span>
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
              <button
                onClick={() => { setAddFixture(true); setMessage({ text: '', type: '' }); setFixtureForm({ home_team_id: '', away_team_id: '', match_date: '', match_time: '', venue: '', upcoming: '' }); }}
                className='flex items-center gap-2 font-outfit text-sm font-semibold text-white px-5 py-2 rounded-xl transition-all duration-200'
                style={{ background: tc, boxShadow: `0 4px 14px ${hexGlow(tc, 0.35)}` }}
              >
                <FaPlus size={12} /> Add Fixture
              </button>
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
                      {/* Admin icons */}
                      <div className='flex items-center justify-between mt-1'>
                        <h1 className='text-sm text-gray-300 font-medium'>Admin</h1>
                        <div className='flex gap-1 flex-shrink-0'>
                          <span className='action-icon edit text-slate-400' onClick={() => openEditFixture(fix)}><FaPenClip size={13} /></span>
                          <span className='action-icon del text-slate-400' onClick={() => { setDeleteFixture(true); setDeleteFixtureId(fix.fixture_id); }}><FaRecycle size={13} /></span>
                        </div>
                      </div>
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
              <button
                onClick={() => { setAddStanding(true); setMessage({ text: '', type: '' }); setStandingForm({ team: '', pointes: 0, matches: 0, win: 0, draw: 0, losses: 0, goal_sc: 0, goal_conc: 0, goal_st: 0 }); }}
                className='flex items-center gap-2 font-outfit text-sm font-semibold text-white px-5 py-2 rounded-xl transition-all duration-200'
                style={{ background: tc, boxShadow: `0 4px 14px ${hexGlow(tc, 0.35)}` }}
              >
                <FaPlus size={12} /> Add Standing
              </button>
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
                      <th className='pr-4'>Admin</th>
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
                          <td className='pr-4'>
                            <div className='flex gap-1 justify-center'>
                            <span className='action-icon edit text-slate-400'
                            onClick={() => openEditStanding(row)}>
                             <FaPenClip size={13} />
                            </span>
                              <span className='action-icon del text-slate-400'
                              onClick={() => { setDeleteStanding(true); setDeleteStandingId(row.stand_id); }}>
                                <FaRecycle size={12} />
                              </span>
                            </div>
                          </td>
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
                        {/* Admin icons */}
                        <div className='flex items-center justify-between mt-1'>
                          <h1 className='text-sm text-gray-300 font-medium'>Admin</h1>
                          <div className='flex gap-1 flex-shrink-0'>
                            <span className='action-icon edit text-slate-400' onClick={() => openEditFixture(fix)}><FaPenClip size={13} /></span>
                            <span className='action-icon del text-slate-400' onClick={() => { setDeleteFixture(true); setDeleteFixtureId(fix.fixture_id); }}><FaRecycle size={13} /></span>
                          </div>
                        </div>
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

      {/* ══════════════════════════════════
          MODALS — ADD TEAM
      ══════════════════════════════════ */}
      <Modal show={addTeam} onClose={() => setAddTeam(false)} popup size='2xl'>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md px-8 pb-10 pt-2 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3" style={{ background: `${tc}15` }}>
                  <FaUsers style={{ color: tc }} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add Team</h1>
                <p className="text-sm text-gray-500">Add a team to {league?.name}</p>
              </div>
              <AlertBox />
              <form className="space-y-4" onSubmit={handleAddTeam}>
                <input className={inputCls} type="text" placeholder="Team Name" value={teamForm.name} onChange={e => setTeamForm({ ...teamForm, name: e.target.value })} />
                <input className={inputCls} type="text" placeholder="Abbrevation (e.g. MCI)" value={teamForm.abv} onChange={e => setTeamForm({ ...teamForm, abv: e.target.value })} />
                <div className='border-4 border-teal-500 border-dotted p-1'>
                  <FileInput type='file' accept='image/*' onChange={handleImageChange} />
                </div>
                {img && <img className='rounded-full mx-auto block' src={img} width={90} alt="preview" />}
                <button type="submit" disabled={isLoading} className={submitCls}>
                  {isLoading ? <Spinner label="Adding...." /> : 'Add Team'}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ══ UPDATE TEAM ══ */}
      <Modal show={updateTeam} onClose={() => setUpdateTeam(false)} popup size='2xl'>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md px-8 pb-10 pt-2 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3" style={{ background: `${tc}15` }}>
                  <FaUsers style={{ color: tc }} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Update Team</h1>
                <p className="text-sm text-gray-500">Edit team details</p>
              </div>
              <AlertBox />
              <form className="space-y-4" onSubmit={handleUpdateTeam}>
                <input className={inputCls} type="text" placeholder="Team Name" value={updateTeamData.name || ''} onChange={e => setUpdateTeamData({ ...updateTeamData, name: e.target.value })} />
                <input className={inputCls} type="text" placeholder="Abbreviation" value={updateTeamData.abv || ''} onChange={e => setUpdateTeamData({ ...updateTeamData, abv: e.target.value })} />
                {updateTeamData.logo && <img src={updateTeamData.logo} width={80} className='mx-auto block rounded-full object-contain p-1' alt="current" />}
                <div className='border-4 border-teal-500 border-dotted p-3'>
                  <FileInput type='file' accept='image/*' onChange={handleImageChange} />
                </div>
                {img && <img className='rounded-full mx-auto block' src={img} width={90} alt="new" />}
                <button type="submit" disabled={isLoading} className={submitCls}>
                  {isLoading ? <Spinner label="Updating...." /> : 'Update Team'}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ══ DELETE TEAM ══ */}
      <Modal show={deleteTeam} onClose={() => setDeleteTeam(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500'>Do you want to delete this team?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteTeam}>Yes, I'm sure</Button>
              <Button color='success' onClick={() => setDeleteTeam(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ══════════════════════════════════
          MODALS — ADD FIXTURE
      ══════════════════════════════════ */}
      <Modal show={addFixture} onClose={() => setAddFixture(false)} popup size='2xl'>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md px-8 pb-10 pt-2 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3" style={{ background: `${tc}15` }}>
                  <FaCalendarDays style={{ color: tc }} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add Fixture</h1>
                <p className="text-sm text-gray-500">Schedule a match</p>
              </div>
              <AlertBox />
              <form className="space-y-4" onSubmit={handleAddFixture}>
                <select className={inputCls} value={fixtureForm.home_team} onChange={e => setFixtureForm({ ...fixtureForm, home_team: e.target.value })}>
                  <option value=''>Home Team</option>
                  {teamfilter.map(t => <option key={t.team_id} value={t.team_id}>{t.name}</option>)}
                </select>
                <select className={inputCls} value={fixtureForm.away_team} onChange={e => setFixtureForm({ ...fixtureForm, away_team: e.target.value })}>
                  <option value=''>Away Team</option>
                  {teamfilter.map(t => <option key={t.team_id} value={t.team_id}>{t.name}</option>)}
                </select>
                <input className={inputCls} type="date" value={fixtureForm.date} onChange={e => setFixtureForm({ ...fixtureForm, date: e.target.value })} />
                <input className={inputCls} type="text" placeholder="Match Time" value={fixtureForm.time} onChange={e => setFixtureForm({ ...fixtureForm, time: e.target.value })} />
                <input className={inputCls} type="text" placeholder="Match Day" value={fixtureForm.matchday} onChange={e => setFixtureForm({ ...fixtureForm, matchday: e.target.value })} />
                <input className={inputCls} type="text" placeholder="Venue / Stadium" value={fixtureForm.venue} onChange={e => setFixtureForm({ ...fixtureForm, venue: e.target.value })} />
                <select className={inputCls} value={fixtureForm.upcoming} onChange={e => setFixtureForm({ ...fixtureForm, upcoming: e.target.value })}>
                  <option value='false'>No</option>
                  <option value='true'>Yes</option>
                </select>
                <button type="submit" disabled={isLoading} className={submitCls}>
                  {isLoading ? <Spinner label="Adding...." /> : 'Add Fixture'}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ══ UPDATE FIXTURE ══ */}
      <Modal show={updateFixture} onClose={() => setUpdateFixture(false)} popup size='2xl'>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md px-8 pb-10 pt-2 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3" style={{ background: `${tc}15` }}>
                  <FaCalendarDays style={{ color: tc }} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Update Fixture</h1>
                <p className="text-sm text-gray-500">Edit match details</p>
              </div>
              <AlertBox />
              <form className="space-y-4" onSubmit={handleUpdateFixture}>
                <select className={inputCls} value={updateFixtureData.home_team || ''} onChange={e => setUpdateFixtureData({ ...updateFixtureData, home_team: e.target.value })}>
                  <option value=''>{updateFixtureData.home_team_name || 'Home Team'}</option>
                  {teamfilter.map(t => <option key={t.team_id} value={t.team_id}>{t.name}</option>)}
                </select>
                <select className={inputCls} value={updateFixtureData.away_team || ''} onChange={e => setUpdateFixtureData({ ...updateFixtureData, away_team: e.target.value })}>
                  <option value=''>{updateFixtureData.away_team_name || 'Away Team'}</option>
                  {teamfilter.map(t => <option key={t.team_id} value={t.team_id}>{t.name}</option>)}
                </select>
                <input className={inputCls} type="date" value={updateFixtureData.date || ''} onChange={e => setUpdateFixtureData({ ...updateFixtureData, date: e.target.value })} />
                <input className={inputCls} type="text" value={updateFixtureData.time || ''} onChange={e => setUpdateFixtureData({ ...updateFixtureData, time: e.target.value })} />
                <input className={inputCls} type="text" placeholder="Venue" value={updateFixtureData.venue || ''} onChange={e => setUpdateFixtureData({ ...updateFixtureData, venue: e.target.value })} />
                <select className={inputCls} value={updateFixtureData.upcoming} onChange={e => setUpdateFixtureData({ ...updateFixtureData, upcoming: e.target.value })}>
                  <option>{updateFixtureData.upcoming === 'true' ? 'Upcoming' : 'Not Upcoming'}</option>
                  <option value='false'>Not Upcoming</option>
                  <option value='true'>Upcoming</option>
                </select>
                <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="live"
                        checked={updateFixtureData.live}
                        onChange={(e) =>
                          setUpdateFixtureData({ ...updateFixtureData, live: e.target.checked })
                        }
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      {updateFixtureData.live ? <p className='text-green-500'>Live</p> : <p>Live</p>} {/*({updateFixtureData.live ? "true" : "false"})*/}
                    </div>
                    {
                      updateFixtureData.live || updateFixtureData.ft ? (
                        <div className='grid grid-cols-2 gap-3'>
                        <div>
                          <input
                            type="text"
                            name="home_score"
                            value={updateFixtureData.home_score}
                            onChange={(e) => 
                              setUpdateFixtureData({...updateFixtureData, home_score: e.target.value})}
                            placeholder='Live Home Score'
                            className={inputCls}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            className={inputCls}
                            name="away_score"
                            value={updateFixtureData.away_score}
                            onChange={(e) => 
                              setUpdateFixtureData({...updateFixtureData, away_score: e.target.value})}
                            placeholder='Live Away Score'
                          />
                        </div>
                        </div>
                      ) : null
                    }
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="ft"
                        checked={updateFixtureData.ft}
                        onChange={(e) =>
                          setUpdateFixtureData({ ...updateFixtureData, ft: e.target.checked })
                        }
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      {updateFixtureData.ft ? <p className='text-gray-400'>Full Time</p> : <p className='text-black'>Full Time</p>} {/*({updateFixtureData.ft ? "true" : "false"})*/}
                    </div>
                <button type="submit" disabled={isLoading} className={submitCls}>
                  {isLoading ? <Spinner label="Updating...." /> : 'Update Fixture'}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ══ DELETE FIXTURE ══ */}
      <Modal show={deleteFixture} onClose={() => setDeleteFixture(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500'>Do you want to delete this fixture?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteFixture}>Yes, I'm sure</Button>
              <Button color='success' onClick={() => setDeleteFixture(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ══════════════════════════════════
          MODALS — ADD STANDING
      ══════════════════════════════════ */}
      <Modal show={addStanding} onClose={() => setAddStanding(false)} popup size='2xl'>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md px-8 pb-10 pt-2 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3" style={{ background: `${tc}15` }}>
                  <FaTrophy style={{ color: tc }} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add Standing</h1>
                <p className="text-sm text-gray-500">Add team standing entry</p>
              </div>
              <AlertBox />
              <form className="space-y-4" onSubmit={handleAddStanding}>
                <select className={inputCls} value={standingForm.team} onChange={e => setStandingForm({ ...standingForm, team: e.target.value })}>
                  <option value=''>Select Team</option>
                  {teamfilter.map(t => <option key={t.team_id} value={t.team_id}>{t.name}</option>)}
                </select>
                <div className='grid grid-cols-2 gap-3'>
                  {[['pointes','Pts'],['matches','M'],['win','W'],['draw','D'],['losses','L'],['goal_sc','GF'],['goal_conc','GA'],['goal_st','GD']].map(([key, label]) => (
                    <div key={key}>
                      <label className='block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide'>{label}</label>
                      <input className={inputCls} type="text" min="0" placeholder={label} value={standingForm[key]} onChange={e => setStandingForm({ ...standingForm, [key]: e.target.value })} />
                    </div>
                  ))}
                </div>
                <button type="submit" disabled={isLoading} className={submitCls}>
                  {isLoading ? <Spinner label="Adding...." /> : 'Add Standing'}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      
      {/* ══ UPDATE STANDING ══ */}
       <Modal show={updateStanding} onClose={() => setUpdateStanding(false)} popup size='2xl'>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md px-8 pb-10 pt-2 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-3" style={{ background: `${tc}15` }}>
                  <FaCalendarDays style={{ color: tc }} />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Update Standing</h1>
                <p className="text-sm text-gray-500">Edit standing details</p>
              </div>
              <AlertBox />
              <form className="space-y-4" onSubmit={handleUpdateStanding}>
                <select className={inputCls} value={standingForm.team} onChange={e => setUpdateStandingData({ ...updateStandingData, team: e.target.value })}>
                  <option value=''>{updateStandingData.name}</option>
                  {teamfilter.map(t => <option key={t.team_id} value={t.team_id}>{t.name}</option>)}
                </select>
                <div className='grid grid-cols-2 gap-3'>
                  {[['pointes','Pts'],['matches','M'],['win','W'],['draw','D'],['losses','L'],['goal_sc','GF'],['goal_conc','GA'],['goal_st','GD']].map(([key, label]) => (
                    <div key={key}>
                      <label className='block text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide'>{label}</label>
                      <input className={inputCls} type="text" min="0" placeholder={label} value={updateStandingData[key]} onChange={e => setUpdateStandingData({ ...updateStandingData, [key]: e.target.value })} />
                    </div>
                  ))}
                </div>
                <button type="submit" disabled={isLoading} className={submitCls}>
                  {isLoading ? <Spinner label="Updating...." /> : 'Update Standing'}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ══ DELETE STANDING ══ */}
      <Modal show={deleteStanding} onClose={() => setDeleteStanding(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500'>Do you want to delete this standing?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteStanding}>Yes, I'm sure</Button>
              <Button color='success' onClick={() => setDeleteStanding(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default LeagueDetail