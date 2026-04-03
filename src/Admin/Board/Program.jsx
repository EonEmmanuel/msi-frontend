import { Button, FileInput, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle, FaPlus } from 'react-icons/fa6'
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { SiLeagueoflegends, SiProgate } from 'react-icons/si';

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');
    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(14px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { animation: fadeUp 0.45s cubic-bezier(.22,1,.36,1) both; }

    .prog-row {
      transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
    }
    .prog-row:hover {
      border-color: #a5b4fc;
      box-shadow: 0 8px 28px rgba(99,102,241,0.12);
      transform: translateX(3px);
    }

    .action-icon {
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.18s ease, color 0.18s ease;
    }
    .action-icon.edit:hover { background: #e0e7ff; color: #6366f1; }
    .action-icon.del:hover  { background: #fee2e2; color: #ef4444; }

    .field-input {
      font-family: 'Outfit', sans-serif;
      font-size: 13px;
      display: block;
      width: 100%;
      padding: 9px 12px;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      background: #f8fafc;
      color: #1e293b;
      outline: none;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      margin-bottom: 10px;
    }
    .field-input:focus {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99,102,241,0.12);
      background: #fff;
    }
    .field-input::placeholder { color: #94a3b8; }

    .upload-zone {
      border: 2px dashed #c7d2fe;
      border-radius: 10px;
      padding: 10px;
      background: #f5f3ff;
      margin-bottom: 10px;
      transition: border-color 0.2s ease;
    }
    .upload-zone:hover { border-color: #6366f1; }

    .submit-btn {
      font-family: 'Outfit', sans-serif;
      font-size: 14px;
      font-weight: 600;
      width: 100%;
      padding: 10px;
      border-radius: 10px;
      background: #6366f1;
      color: white;
      border: none;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease;
      margin-top: 4px;
    }
    .submit-btn:hover:not(:disabled) { background: #4f46e5; transform: translateY(-1px); }
    .submit-btn:disabled { background: #a5b4fc; cursor: not-allowed; }
  `}</style>
)

function index() {

  const [formData, setFormData] = useState({
    image: '',
    name: '',
    p_image: '',
    desc: '',
    time: '',
    occurence: '',
    duration: '',
    tag: '',
    unique: '',
    themecolor: ''
  });

  const [data, setData] = useState([]);
  const [img, setImg] = useState('')
  const [m_img, setMImg] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [AddLeague, setAddLeague] = useState(false)
  const [updateProgram, setUpdateProgram] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateProgramId, setUpdateProgramId] = useState('')
  const [deleteProgram, setDeleteProgram] = useState(false)
  const [deleteProgramId, setDeleteProgramId] = useState('')

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
        setFormData({ ...formData, p_image: imageUrl });
        setUpdateData({ ...updateData, p_image: imageUrl });
        setMessage({ text: "Main Image uploaded successfully!", type: "success" });
      } catch (err) {
        setError(err.message);
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

  const handleMImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsLoading(true);
        const imageUrl = await uploadMImage(file);
        setMImg(imageUrl);
        setFormData({ ...formData, image: imageUrl });
        setUpdateData({ ...updateData, image: imageUrl });
        setMessage({ text: "Main Image uploaded successfully!", type: "success" });
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const uploadMImage = async (file) => {
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
      const response = await fetch('http://localhost:3002/api/msi/createprogram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage({ text: 'Program added successful!!', type: 'success' });
      setTimeout(() => { window.location.reload(); }, 3500);
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setMessage({ text: '', type: '' })
      try {
        const response = await fetch('http://localhost:3002/api/msi/getallprogram');
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
    const fetchLeagueData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/msi/getprogram/${updateProgramId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setUpdateData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      }
    };
    fetchLeagueData();
  }, [updateProgramId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const response = await fetch(`http://localhost:3002/api/msi/updateprogram/${updateProgramId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage({ text: 'Program Update successful!!', type: 'success' });
      setTimeout(() => { window.location.reload(); }, 3500);
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3002/api/msi/deleteprogram/${deleteProgramId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message)
      } else {
        setMessage({ text: 'Program Deleted successful!!', type: 'success' })
        setDeleteProgram(false)
        setData((prev) => prev.filter((prog) => prog.program_id !== deleteProgramId))
      }
    } catch(error) {
      setMessage(error)
    }
  }

  /* ── Shared message banner ── */
  const MessageBanner = () => message.text ? (
    <div className={`font-outfit text-sm px-4 py-3 rounded-xl mb-4 ${
      message.type === 'success'
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        : 'bg-red-50 text-red-700 border border-red-200'
    }`}>
      {message.text}
    </div>
  ) : null

  /* ── Shared upload field ── */
  const UploadField = ({ label, onChange, preview }) => (
    <div className='mb-1'>
      <p className='font-outfit text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1'>{label}</p>
      <div className='upload-zone'>
        <FileInput type='file' accept='image/*' onChange={onChange} />
      </div>
      {preview && (
        <img src={preview} alt='preview' className='w-16 h-16 object-cover rounded-full border border-slate-200 mx-auto mt-1 mb-2' />
      )}
    </div>
  )

  return (
    <div className='font-outfit min-h-screen bg-slate-50 px-4 py-10'>
      <FontImport />

      {/* ── Header ── */}
      <div className='max-w-4xl mx-auto mb-8'>
        <div className='flex items-center gap-3 mb-2'>
          <span className='block h-px w-8 bg-indigo-500' />
          <span className='font-anton text-indigo-500 text-xs tracking-[0.22em] uppercase'>Admin</span>
        </div>
        <div className='flex items-end justify-between'>
          <h1 className='font-anton text-slate-800 text-4xl md:text-5xl leading-none'>Programs</h1>
          <button
            onClick={() => { setAddLeague(true) }}
            className='flex items-center gap-2 font-outfit text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_4px_14px_rgba(99,102,241,0.35)]'
          >
            <FaPlus size={12} /> Add Program
          </button>
        </div>
      </div>

      {/* ── One per row list ── */}
      <div className='max-w-4xl mx-auto flex flex-col gap-3'>
        {data.map((item, i) => (
          <div
            key={item.program_id}
            className='fade-up prog-row flex items-center gap-5 border border-slate-200 rounded-2xl px-5 py-4 cursor-pointer'
            style={{ animationDelay: `${i * 50}ms`, backgroundColor: item.themecolor }}
          >
            {/* Banner image */}
            {item.image && (
              <img src={item.image} alt={item.name} className='w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-100' />
            )}

            {/* Program image */}
            {item.p_image && (
              <img src={item.p_image} alt={item.name} className='w-10 h-10 rounded-full object-cover shrink-0 border border-slate-100' />
            )}

            {/* Info */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2 flex-wrap mb-1'>
                <h2 className='font-anton text-slate-800 text-lg leading-none uppercase'>{item.name}</h2>
                {item.live ? (
                  <span className='font-outfit text-[9px] font-semibold bg-red-500 text-white px-2 py-0.5 rounded-full tracking-wider'>LIVE</span>
                ):<></>}
              </div>
              <p className='font-outfit text-xs text-slate-600 font-semibold mb-2'>{item.desc}</p>
              <div className='flex items-center gap-3 flex-wrap'>
                {item.time && (
                  <span className='font-outfit text-[10px] font-semibold text-indigo-500 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-full'>
                    {item.time}
                  </span>
                )}
                {item.occurence && (
                  <span className='font-outfit text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full'>
                    {item.occurence}
                  </span>
                )}
                {item.duration && (
                  <span className='font-outfit text-[10px] font-semibold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full'>
                    {item.duration}
                  </span>
                )}
                {item.tag && (
                  <span className='font-outfit uppercase text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full'>
                    {item.tag}
                  </span>
                )}
                {item.unique && (
                  <span className='font-outfit uppercase text-[10px] font-semibold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full'>
                    {item.unique}
                  </span>
                )}
              </div>
            </div>

            {/* Admin actions */}
            <div className='flex items-center gap-1 shrink-0'>
              <span className='action-icon edit text-black'>
                <FaPenClip onClick={() => { setUpdateProgram(true); setUpdateProgramId(item.program_id) }} size={13} />
              </span>
              <span className='action-icon del text-black'>
                <FaRecycle onClick={() => { setDeleteProgram(true); setDeleteProgramId(item.program_id) }} size={13} />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* ── ADD MODAL ── */}
      <Modal show={AddLeague} onClose={() => setAddLeague(false)} popup size='2xl'>
        <Modal.Header className='border-b border-slate-100 px-6 pt-5 pb-4'>
          <div>
            <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>New Entry</p>
            <h2 className='font-anton text-slate-800 text-2xl'>Add Program</h2>
            <p className='font-outfit text-xs text-slate-400 mt-0.5'>Add Program to Site</p>
          </div>
        </Modal.Header>
        <Modal.Body className='px-6 py-5'>
          <MessageBanner />
          <form className='space-y-1' onSubmit={handleRegister}>

            <UploadField label='Banner Image' onChange={handleMImageChange} preview={m_img} />

            <input type='text' name='name' value={formData.name} onChange={handleChange}
              placeholder='Program Name' className='field-input' />

            <UploadField label='Program Image' onChange={handleImageChange} preview={img} />

            <input type='text' name='desc' value={formData.desc} onChange={handleChange}
              placeholder='Desc (describe Program)' className='field-input' />
            
            <input type='text' name='tag' value={formData.tag} onChange={handleChange}
              placeholder='Tag (e.g. Sport, Mag)' className='field-input' />

            <input type='text' name='time' value={formData.time} onChange={handleChange}
              placeholder='Time (e.g 10:00)' className='field-input' />

            <input type='text' name='occurence' value={formData.occurence} onChange={handleChange}
              placeholder='Occurence (e.g MON,TUE...Everyday)' className='field-input' />

            <input type='text' name='duration' value={formData.duration} onChange={handleChange}
              placeholder='Duration (e.g 2H)' className='field-input' />

            <input type='text' name='unique' value={formData.unique} onChange={handleChange}
              placeholder='Yes or No' className='field-input' />

            <div className='flex items-center gap-3 mb-3'>
            <input type='color' name='themecolor'  value={formData.themecolor}
              onChange={handleChange}
              className='field-input !mb-0 flex-1' placeholder='Theme color' />
            {formData.themecolor && (
              <div className='w-9 h-9 rounded-xl border border-slate-200 shrink-0' style={{ backgroundColor: formData.themecolor }} />
            )}
          </div>

            <button type='submit' disabled={isLoading} className='submit-btn'>
              {isLoading ? (
                <span className='flex items-center justify-center gap-2'>
                  <svg className='animate-spin h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
                  </svg>
                  Adding....
                </span>
              ) : 'Add Program'}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* ── UPDATE MODAL ── */}
      <Modal show={updateProgram} onClose={() => setUpdateProgram(false)} popup size='3xl'>
        <Modal.Header className='border-b border-slate-100 px-6 pt-5 pb-4'>
          <div>
            <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>Edit Entry</p>
            <h2 className='font-anton text-slate-800 text-2xl'>Update Program</h2>
            <p className='font-outfit text-xs text-slate-400 mt-0.5'>Modify the details and save</p>
          </div>
        </Modal.Header>
        <Modal.Body className='px-6 py-5'>
          <MessageBanner />
          <form className='space-y-1' onSubmit={handleUpdate}>

            <div className='flex gap-3 items-center mb-2'>
              {updateData.image && <img src={updateData.image} className='w-16 h-16 rounded-xl object-cover border border-slate-200' />}
              <span className='font-outfit text-xs text-slate-400'>Current banner image</span>
            </div>
            <UploadField label='Replace Banner Image' onChange={handleMImageChange} preview={m_img} />

            <input type='text' name='name' value={updateData.name}
              onChange={(e) => setUpdateData({...updateData, name: e.target.value})}
              placeholder='Name' className='field-input' />

            <div className='flex gap-3 items-center mb-2'>
              {updateData.p_image && <img src={updateData.p_image} className='w-14 h-14 rounded-full object-cover border border-slate-200' />}
              <span className='font-outfit text-xs text-slate-400'>Current program image</span>
            </div>
            <UploadField label='Replace Program Image' onChange={handleImageChange} preview={img} />

            <input type='text' name='desc' value={updateData.desc}
              onChange={(e) => setUpdateData({...updateData, desc: e.target.value})}
              placeholder='Desc' className='field-input' />

            <input type='text' name='tag' value={updateData.tag}
              onChange={(e) => setUpdateData({...updateData, tag: e.target.value})}
              placeholder='Tag' className='field-input' />

            <input type='text' name='time' value={updateData.time}
              onChange={(e) => setUpdateData({...updateData, time: e.target.value})}
              placeholder='Time' className='field-input' />

            <input type='text' name='date' value={updateData.occurence}
              onChange={(e) => setUpdateData({...updateData, date: e.target.value})}
              placeholder='Date' className='field-input' />

            <input type='text' name='duration' value={updateData.duration}
              onChange={(e) => setUpdateData({...updateData, duration: e.target.value})}
              placeholder='Duration' className='field-input' />

            <div className='flex items-center gap-3 mb-3'>
            <input type='color' name='themecolor'  value={updateData.themecolor}
              onChange={(e) => setUpdateData({...updateData, themecolor: e.target.value})}
              className='field-input !mb-0 flex-1' placeholder='Theme color' />
            {updateData.themecolor && (
              <div className='w-9 h-9 rounded-xl border border-slate-200 shrink-0' style={{ backgroundColor: updateData.themecolor }} />
            )}
          </div>

            <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="live"
                        checked={updateData.live}
                        onChange={(e) =>
                          setUpdateData({ ...updateData, live: e.target.checked })
                        }
                        className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      {updateData.live ? <p className='text-green-500'>Live</p> : <p>Live</p>} {/*({updateData.live ? "true" : "false"})*/}
                    </div>

            <input type='text' name='unique' value={updateData.unique}
              onChange={(e) => setUpdateData({...updateData, unique: e.target.value})}
              placeholder='Unique' className='field-input' />

            <button type='submit' disabled={isLoading} className='submit-btn' style={{ background: '#059669' }}>
              {isLoading ? (
                <span className='flex items-center justify-center gap-2'>
                  <svg className='animate-spin h-4 w-4 text-white' fill='none' viewBox='0 0 24 24'>
                    <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' />
                    <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
                  </svg>
                  Updating....
                </span>
              ) : 'Update Program'}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* ── DELETE MODAL — untouched ── */}
      <Modal show={deleteProgram} onClose={() => setDeleteProgram(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Do you want to delete this post
            </h3>
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