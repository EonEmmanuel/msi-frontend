import { Button, FileInput, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle, FaPlus } from 'react-icons/fa6'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { SiLeagueoflegends } from 'react-icons/si';
import { Link } from 'react-router-dom';

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

    .league-card {
      transition: transform 0.22s ease, box-shadow 0.22s ease;
      position: relative;
      border-radius: 18px;
      overflow: hidden;
      background: #fff;
    }
    .league-card:hover { transform: translateY(-4px); }

    /* Gradient border ring using themecolor via CSS var --tc */
    .league-card::after {
      content: '';
      position: absolute; inset: 0;
      border-radius: 18px;
      border: 2px solid var(--tc, #a5b4fc);
      opacity: 0.55;
      pointer-events: none;
      transition: opacity 0.22s;
    }
    .league-card:hover::after { opacity: 1; }

    /* Top color bar */
    .card-top-bar {
      position: absolute; top: 0; left: 0; right: 0; height: 4px;
    }

    .action-icon {
      cursor: pointer; padding: 6px; border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.18s ease, color 0.18s ease;
    }
    .action-icon.edit:hover { background: #e0e7ff; color: #6366f1; }
    .action-icon.del:hover  { background: #fee2e2; color: #ef4444; }
  `}</style>
)

function index() {

  const [formData, setFormData] = useState({ name: '', abv: '', logo: '', themecolor: '#6366f1' });
  const [data, setData] = useState([]);
  const [img, setImg] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [AddLeague, setAddLeague] = useState(false)
  const [updateLeague, setUpdateLeague] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateLeagueId, setUpdateLeagueId] = useState('')
  const [deleteLeague, setDeleteLeague] = useState(false)
  const [deleteLeagueId, setDeleteLeagueId] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const CLOUD_NAME = 'drzoiigek';
  const UPLOAD_PRESET = 'mtn-upload';

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        const imageUrl = await uploadImage(file);
        setImg(imageUrl);
        setFormData({ ...formData, logo: imageUrl });
        setUpdateData({ ...updateData, logo: imageUrl });
        setMessage({ text: "Image uploaded successfully!", type: "success" });
      } catch (err) {
        setMessage({ text: err.message, type: 'error' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const uploadImage = async (file) => {
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', UPLOAD_PRESET);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, { method: 'POST', body: imageData });
      if (!response.ok) throw new Error("Image upload failed");
      const data = await response.json();
      return data.secure_url;
    } catch (err) {
      throw new Error('Failed to upload image: ' + err.message);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const response = await fetch('http://localhost:3002/api/msi/createleague', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage({ text: 'League added successfully!!', type: 'success' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setMessage({ text: '', type: '' });
      try {
        const response = await fetch('http://localhost:3002/api/msi/getallleague');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setData(result.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!updateLeagueId) return;
    const fetchLeagueData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/msi/getleague/${updateLeagueId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setUpdateData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchLeagueData();
  }, [updateLeagueId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const response = await fetch(`http://localhost:3002/api/msi/updateleague/${updateLeagueId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage({ text: 'League Updated successfully!!', type: 'success' });
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3002/api/msi/deleteleague/${deleteLeagueId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setMessage({ text: data.message, type: 'error' });
      } else {
        setMessage({ text: 'League Deleted successfully!!', type: 'success' });
        setDeleteLeague(false);
        setData((prev) => prev.filter((league) => league.league_id !== deleteLeagueId));
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    }
  };

  // hex → rgba for box-shadow glow
  const hexGlow = (hex, alpha = 0.18) => {
    if (!hex || hex.length < 7) return `rgba(99,102,241,${alpha})`;
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  };

  const AlertBox = () => message.text ? (
    <div className={`flex items-start gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
      message.type === 'success'
        ? 'bg-green-50 text-green-700 border border-green-200'
        : 'bg-red-50 text-red-700 border border-red-200'
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

  return (
    <div className='font-outfit min-h-screen bg-slate-50 px-4 py-10'>
      <FontImport />

      {/* ── Header ── */}
      <div className='max-w-7xl mx-auto mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <span className='block h-px w-8 bg-indigo-500' />
          <span className='font-anton text-indigo-500 text-xs tracking-[0.22em] uppercase'>Admin</span>
        </div>
        <div className='flex items-end justify-between'>
          <h1 className='font-anton text-slate-800 text-4xl md:text-5xl leading-none'>Leagues</h1>
          <button
            onClick={() => { setAddLeague(true); setMessage({ text: '', type: '' }); setImg(''); }}
            className='flex items-center gap-2 font-outfit text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_4px_14px_rgba(99,102,241,0.35)]'
          >
            <FaPlus size={12} />
            Add League
          </button>
        </div>
      </div>

      {/* ── Cards Grid ── */}
      <div className='max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
        {data.map((item, i) => {
          const tc = item.themecolor || '#6366f1';
          return (
            <div
              key={item.id}
              className='fade-up league-card p-5'
              style={{
                '--tc': tc,
                animationDelay: `${i * 60}ms`,
                boxShadow: `0 4px 20px ${hexGlow(tc, 0.15)}, 0 1px 4px rgba(0,0,0,0.06)`,
              }}
            >
              {/* Top color bar */}
              <div className='card-top-bar' style={{ background: tc }} />

              {/* Logo + name row */}
              <Link to={`/adminleaguedetail/${item.league_id}`}>
              <div className='flex items-center justify-between mb-4 mt-2'>
                <div className='flex items-center gap-4'>
                  {/* Logo with themecolor ring */}
                  <div
                    className='w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden'
                    style={{
                      border: `2px solid ${tc}`,
                      background: `${tc}12`,
                      boxShadow: `0 0 0 4px ${hexGlow(tc, 0.12)}`,
                    }}
                  >
                    <img src={item.logo} alt={item.name} className='w-8 h-8 object-contain' />
                  </div>

                  <div>
                    <h2 className='font-extrabold text-slate-800 text-lg uppercase leading-tight'>{item.name}</h2>
                    <p
                      className='font-outfit text-xs mt-0.5 rounded-full w-fit py-0.5 px-3'
                      style={{ background: `${tc}18`, color: tc }}
                    >
                      Football
                    </p>
                  </div>
                </div>

                {/* ABV badge */}
                <span
                  className='font-semibold text-xs tracking-wider px-3 py-1.5 rounded-full shrink-0'
                  style={{ background: `${tc}15`, color: tc, border: `1px solid ${tc}50` }}
                >
                  {item.abv}
                </span>
              </div>
              </Link>

              {/* Divider */}
              <div className='h-px mb-3' style={{ background: `linear-gradient(90deg, ${tc}60, transparent)` }} />

              {/* Admin actions */}
              <div className='flex items-center justify-between'>
                <span className='font-outfit text-[10px] text-slate-400 uppercase tracking-wider'>Admin</span>
                <div className='flex items-center gap-1'>
                  <span className='action-icon edit text-slate-400'
                  onClick={() => { setUpdateLeague(true); setUpdateLeagueId(item.league_id); setImg(''); setMessage({ text: '', type: '' }); }}>
                    <FaPenClip
                      size={13}
                    />
                  </span>
                  <span className='action-icon del text-slate-400'
                  onClick={() => { setDeleteLeague(true); setDeleteLeagueId(item.league_id); }}>
                    <FaRecycle
                      size={13}
                    />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ══ ADD MODAL ══ */}
      <Modal show={AddLeague} onClose={() => setAddLeague(false)} popup size='2xl'>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md px-8 pb-10 pt-2 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-50 mb-3">
                  <SiLeagueoflegends />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add League</h1>
                <p className="text-sm text-gray-500">Add League to Site</p>
              </div>

              <AlertBox />

              <form className="space-y-4" onSubmit={handleRegister}>
                <input
                  id="name" type="text" name='name' value={formData.name} onChange={handleChange}
                  placeholder="League Name"
                  className='block w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white'
                />
                <input
                  id="abv" type="text" name='abv' value={formData.abv} onChange={handleChange}
                  placeholder="League Abbreviation"
                  className='block w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white'
                />
                <div className='border-4 border-teal-500 border-dotted p-1'>
                  <FileInput type='file' accept='image/*' onChange={handleImageChange} />
                </div>
                {img && <img className='rounded-full mx-auto block' src={img} width={100} alt="preview" />}

                <div className='flex items-center gap-3 mb-3'>
            <input type='color' name='themecolor'  value={formData.themecolor}
              onChange={handleChange}
              className='field-input m-8 p-2 !mb-0 flex-1' placeholder='Theme color' />
            {formData.themecolor && (
              <div className='w-9 h-9 rounded-xl border border-slate-200 shrink-0' style={{ backgroundColor: formData.themecolor }} />
            )}
          </div>

                <button
                  type="submit" disabled={isLoading}
                  className="relative w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 shadow-sm shadow-indigo-200"
                >
                  {isLoading
                    ? <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Adding....
                      </span>
                    : 'Add'}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ══ UPDATE MODAL ══ */}
      <Modal show={updateLeague} onClose={() => setUpdateLeague(false)} popup size='3xl'>
        <Modal.Header />
        <Modal.Body>
          <div className="flex justify-center items-center">
            <div className="w-full max-w-md px-8 pb-10 pt-2 space-y-5">
              <div className="text-center space-y-1">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-purple-50 mb-3">
                  <SiLeagueoflegends />
                </div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Update League</h1>
                <p className="text-sm text-gray-500">Update League details</p>
              </div>

              <AlertBox />

              <form className="space-y-4" onSubmit={handleUpdate}>
                <input
                  type="text" name="name" value={updateData.name || ''} placeholder='League Name'
                  onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
                  className='block w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white'
                />
                <input
                  type="text" name="abv" value={updateData.abv || ''} placeholder='League Abbreviation'
                  onChange={(e) => setUpdateData({ ...updateData, abv: e.target.value })}
                  className='block w-full px-4 py-2.5 text-sm rounded-xl border bg-gray-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent focus:bg-white'
                />
                {updateData.logo && <img src={updateData.logo} width={70} className='mx-auto w-24 h-24 rounded-full block object-contain p-2' alt="current" />}
                <div className='border-4 border-teal-500 border-dotted p-3'>
                  <FileInput type='file' accept='image/*' onChange={handleImageChange} />
                </div>
                {img && <img className='rounded-full mx-auto block' src={img} width={100} alt="new" />}

                <div className='flex items-center gap-3 mb-3'>
            <input type='color' name='themecolor'  value={updateData.themecolor}
              onChange={(e) => setUpdateData({...updateData, themecolor: e.target.value})}
              className='field-input m-8 p-2 !mb-0 flex-1' placeholder='Theme color' />
            {updateData.themecolor && (
              <div className='w-9 h-9 rounded-xl border border-slate-200 shrink-0' style={{ backgroundColor: updateData.themecolor }} />
            )}
          </div>

                <button
                  type="submit" disabled={isLoading}
                  className="relative w-full py-2.5 px-4 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-150 shadow-sm shadow-indigo-200"
                >
                  {isLoading
                    ? <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Updating....
                      </span>
                    : 'Update'}
                </button>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* ══ DELETE MODAL ══ */}
      <Modal show={deleteLeague} onClose={() => setDeleteLeague(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Do you want to delete this league?</h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>Yes, I'm sure</Button>
              <Button color='success' onClick={() => setDeleteLeague(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default index