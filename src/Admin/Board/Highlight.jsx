import { Button, FileInput, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');
    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

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
      margin-bottom: 12px;
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
      padding: 12px;
      background: #f5f3ff;
      margin-bottom: 12px;
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
    }
    .submit-btn:hover:not(:disabled) { background: #4f46e5; transform: translateY(-1px); }
    .submit-btn:disabled { background: #a5b4fc; cursor: not-allowed; }

    .action-icon {
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      transition: background 0.18s ease, color 0.18s ease;
    }
    .action-icon.edit:hover { background: #e0e7ff; color: #6366f1; }
    .action-icon.del:hover  { background: #fee2e2; color: #ef4444; }
  `}</style>
)

function HighlightOne() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddHighlight, setAddHighlight] = useState(false)
  const [updateHighlight, setUpdateHighlight] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateHighlightId, setUpdateHighlightId] = useState('')
  const [deleteHighlight, setDeleteHighlight] = useState(false)
  const [deleteHighlightId, setDeleteHighlightId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    title: '',
    video_url: '',
    date: '',
    desc: '',
    tag: '',
    program: ''
  });
  const [program, setProgram] = useState([]);

  useEffect(() => {
    const fetchHighlightData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/msi/getvideoid/${updateHighlightId}`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setUpdateData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchHighlightData();
  }, [updateHighlightId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/msi/getallprogram');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setProgram(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const response = await fetch('http://localhost:3002/api/msi/createvideo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage({ text: 'Highlight added successful!!', type: 'success' });
      setTimeout(() => { window.location.reload(); }, 1500);
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' })
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    try {
      const response = await fetch(`http://localhost:3002/api/msi/updatevideo/${updateHighlightId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage({ text: 'Highlight Update successful!!', type: 'success' });
      setTimeout(() => { window.location.reload(); }, 1500);
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
        const response = await fetch('http://localhost:3002/api/msi/getallvideo');
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(`http://localhost:3002/api/msi/deletevideo/${deleteHighlightId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message)
      } else {
        setMessage({ text: 'Highlight Deleted successful!!', type: 'success' })
        setDeleteHighlight(false)
        setData((prev) => prev.filter((highlight) => highlight.video_id !== deleteHighlightId))
      }
    } catch (error) {
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
  ) : null;

  /* ── Shared image upload field ── */
  const UploadField = ({ label, accept = 'image/*', onChange, preview, isVideo }) => (
    <div className="mb-3">
      <p className="font-outfit text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
      <div className="upload-zone">
        <FileInput type='file' accept={accept} onChange={onChange} />
      </div>
      {preview && !isVideo && (
        <img src={preview} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-slate-200 mx-auto mt-1" />
      )}
      {preview && isVideo && (
        <video controls className="w-full rounded-xl mt-2 border border-slate-200">
          <source src={preview} />
        </video>
      )}
    </div>
  );

  return (
    <div className='font-outfit m-3 min-h-screen'>
      <FontImport />

      {/* ── Header + Add button ── */}
      <div className='flex justify-between items-center mb-4 max-w-7xl mx-auto'>
        <div>
          <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>Manage</p>
          <h2 className='font-anton text-slate-800 text-2xl'>Highlights</h2>
        </div>
        <button
          onClick={() => { setAddHighlight(true) }}
          className='font-outfit text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_4px_14px_rgba(99,102,241,0.35)]'
        >
          + Add Highlight
        </button>
      </div>

      {/* ── Table ── */}
      <div className='max-w-7xl mx-auto overflow-scroll scrollbar rounded-2xl border border-slate-200 shadow-sm'>
        <Table hoverable>
          <Table.Head className='bg-slate-50'>
          <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Program</Table.HeadCell>
            <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Title</Table.HeadCell>
            <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Video</Table.HeadCell>
            <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Desc</Table.HeadCell>
            <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Date</Table.HeadCell>
            <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Tag</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {data.map((highlight) => (
              <Table.Row key={highlight.video_id} className='bg-white border-b border-slate-100'>
                 <Table.Cell>
                  <span className='font-outfit text-sm text-slate-700 line-clamp-1'>{highlight.name}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className='font-outfit text-sm text-slate-700 line-clamp-1'>{highlight.title}</span>
                </Table.Cell>
                <Table.Cell>
                  <div className="w-40 h-32 overflow-hidden rounded">
                    <div
                      className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                      dangerouslySetInnerHTML={{ __html: highlight.video_url }}
                    />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className='font-outfit text-sm text-slate-500 line-clamp-2'>{highlight.desc}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className='font-outfit text-sm text-slate-500 line-clamp-2'>{highlight.date}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className='font-outfit text-sm text-slate-500 line-clamp-2'>{highlight.tag}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className='flex gap-1'>
                    <span className='action-icon edit' onClick={() => { setUpdateHighlight(true); setUpdateHighlightId(highlight.emission_id); }}>
                      <FaPenClip size={14} />
                    </span>
                    <span className='action-icon del' onClick={() => { setDeleteHighlight(true); setDeleteHighlightId(highlight.emission_id); }}>
                      <FaRecycle size={14} />
                    </span>
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* ── ADD HIGHLIGHT MODAL ── */}
      <Modal show={AddHighlight} onClose={() => setAddHighlight(false)} popup size='3xl'>
        <Modal.Header className='border-b border-slate-100 px-6 pt-5 pb-4'>
          <div>
            <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>New Entry</p>
            <h2 className='font-anton text-slate-800 text-2xl'>Add Highlight</h2>
            <p className='font-outfit text-xs text-slate-400 mt-0.5'>Upload a highlight video to publish on the site</p>
          </div>
        </Modal.Header>
        <Modal.Body className='px-6 py-5'>
          <MessageBanner />
          <form className='space-y-1' onSubmit={handleRegister}>

            <input
              type='text' name='title' value={formData.title}
              onChange={handleChange} required placeholder='Title'
              className='field-input'
            />

            <input
              type='text' name='video_url' value={formData.video_url}
              onChange={handleChange} required placeholder='Video Url'
              className='field-input'
            />

             <textarea
              type='text' name='desc' value={formData.desc}
              onChange={handleChange} required placeholder='Desc'
              rows={4} className='field-input'
            />

            <input
              type='date' name='date' value={formData.date}
              onChange={handleChange} required
              className='field-input'
            />

             <input
              type='text' name='tag' value={formData.tag}
              onChange={handleChange} required placeholder='Tag (e.g MAG)'
              className='field-input'
            />

            <select className="field-input" value={formData.program} onChange={handleChange} name='program' required>
                  <option value=''>Program</option>
                  {program.map(p => <option key={p.program_id} value={p.program_id}>{p.name}</option>)}
                </select>

            <button type='submit' disabled={isLoading} className='submit-btn mt-2'>
              {isLoading ? 'Adding Highlight…' : 'Add Highlight'}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* ── UPDATE HIGHLIGHT MODAL ── */}
      <Modal show={updateHighlight} onClose={() => setUpdateHighlight(false)} popup size='3xl'>
        <Modal.Header className='border-b border-slate-100 px-6 pt-5 pb-4'>
          <div>
            <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>Edit Entry</p>
            <h2 className='font-anton text-slate-800 text-2xl'>Update Highlight</h2>
            <p className='font-outfit text-xs text-slate-400 mt-0.5'>Modify the details below and save your changes</p>
          </div>
        </Modal.Header>
        <Modal.Body className='px-6 py-5'>
          <MessageBanner />
          <form className='space-y-1' onSubmit={handleUpdate}>

            <input
              type='text' 
              name='title'
              value={updateData.title}
              onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })}
              placeholder='Title'
              className='field-input'
            />
            <div className="w-64 h-40 mx-auto overflow-hidden rounded">
              <div
                className="w-full h-full [&>iframe]:w-full [&>iframe]:h-full"
                dangerouslySetInnerHTML={{ __html: updateData.video_url }}
              />
            </div>

            <input
              type='text' 
              name='video_url'
              value={updateData.video_url}
              onChange={(e) => setUpdateData({ ...updateData, video_url: e.target.value })}
              placeholder='Title'
              className='field-input'
            />

            <textarea
              name='desc'
              value={updateData.desc}
              onChange={(e) => setUpdateData({ ...updateData, desc: e.target.value })}
              placeholder='Description preview'
              rows={3} className='field-input'
            />

            <input
              type='date' 
              name='date'
              value={updateData.date}
              onChange={(e) => setUpdateData({ ...updateData, date: e.target.value })}
              className='field-input'
            />

            <input
              type='text' 
              name='tag'
              value={updateData.tag}
              onChange={(e) => setUpdateData({ ...updateData, tag: e.target.value })}
              placeholder='Title'
              className='field-input'
            />

             <select 
             name='program' 
             className="field-input" 
             value={updateData.program} 
             onChange={(e) => setUpdateData({ ...updateData, program: e.target.value })}
             > 
                  <option value=''>{updateData.name}</option>
                  {program.map(p => <option key={p.program_id} value={p.program_id}>{p.name}</option>)}
                </select>

            <button type='submit' disabled={isLoading} className='submit-btn mt-2'>
              {isLoading ? 'Updating....' : 'Update Highlight'}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* ── DELETE MODAL — untouched ── */}
      <Modal show={deleteHighlight} onClose={() => setDeleteHighlight(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Do you want to delete this post
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>Yes, I'm sure</Button>
              <Button color='success' onClick={() => setDeleteHighlight(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default HighlightOne;