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

    .modal-card {
      background: white;
      border-radius: 16px;
      padding: 28px;
      width: 100%;
      max-width: 460px;
      margin: auto;
    }

    .action-icon {
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      transition: background 0.18s ease, color 0.18s ease;
    }
    .action-icon.edit:hover  { background: #e0e7ff; color: #6366f1; }
    .action-icon.del:hover   { background: #fee2e2; color: #ef4444; }
  `}</style>
)

function AdminGallery() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddBlog, setAddBlog] = useState(false)
  const [updateBlog, setUpdateBlog] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateBlogId, setUpdateBlogId] = useState('')
  const [deleteBlog, setDeleteBlog] = useState(false)
  const [deleteBlogId, setDeleteBlogId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState('')
  const [m_img, setM_Img] = useState('')
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
   photo: '',
   name: '',
   role: '',
   desc: ''
  });

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/msi/getgallery/${updateBlogId}`);
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
    fetchBlogData();
  }, [updateBlogId]);

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
        setFormData({ ...formData, photo: imageUrl });
        setUpdateData({ ...updateData, photo: imageUrl });
        setMessage({ text: "Image uploaded successfully!", type: "success" });
        setError(null);
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

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });

    try {
      const response = await fetch('http://localhost:3002/api/msi/creategallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage({ text: 'Gallery added successful!!', type: 'success' });
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

  const words = updateData.desc.trim().split(/\s+/).filter(Boolean).length
  const mins = Math.max(1, Math.round(words / 100))

    try {
      const response = await fetch(`http://localhost:3002/api/msi/updategallery/${updateBlogId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setMessage({ text: 'Gallery Update successful!!', type: 'success' });
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
        const response = await fetch('http://localhost:3002/api/msi/getallgallery');
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
      const res = await fetch(`http://localhost:3002/api/msi/deletegallery/${deleteBlogId}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message)
      } else {
        setMessage({ text: 'Gallery Deleted successful!!', type: 'success' })
        setDeleteBlog(false)
        setData((prev) => prev.filter((gal) => gal.gallery_id !== deleteBlogId))
      }
    } catch(error) {
      setMessage(error)
    }
  }

   const UploadField = ({ label, onChange, preview }) => (
      <div className="mb-3">
        <p className="font-outfit text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{label}</p>
        <div className="upload-zone">
          <FileInput type='file' accept='image/*' onChange={onChange} />
        </div>
        {preview && (
          <img src={preview} alt="preview" className="w-20 h-20 object-cover rounded-xl border border-slate-200 mx-auto mt-1" />
        )}
      </div>
    );

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

  return (
    <div className='font-outfit m-3 min-h-screen'>
      <FontImport />

      {/* ── Add Blog button ── */}
      <div className='flex justify-between items-center mb-4 max-w-7xl mx-auto'>
        <div>
          <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>Manage</p>
          <h2 className='font-anton text-slate-800 text-2xl'>Gallery</h2>
        </div>
        <button
          onClick={() => setAddBlog(true)}
          className='font-outfit text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_4px_14px_rgba(99,102,241,0.35)]'
        >
          + Add Gallery
        </button>
      </div>

      {/* ── Table ── */}
      <div className='max-w-7xl mx-auto overflow-scroll scrollbar rounded-2xl border border-slate-200 shadow-sm'>
        <Table hoverable>
          <Table.Head className='bg-slate-50'>
            <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Photo</Table.HeadCell>
            <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Name</Table.HeadCell>
            <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Role</Table.HeadCell>
            <Table.HeadCell className='font-outfit text-xs text-slate-500 uppercase tracking-wider'>Desc</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {data.map((blog) => (
              <Table.Row key={blog.blog_id} className='bg-white border-b border-slate-100'>
                <Table.Cell>
                  <img src={blog.photo} width={56} className='rounded-lg object-cover' />
                </Table.Cell>
                <Table.Cell>
                  <span className='font-outfit text-sm text-slate-700 line-clamp-2'>{blog.name}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className='font-outfit text-sm text-slate-700 line-clamp-2'>{blog.role}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className='font-outfit text-sm text-slate-500 line-clamp-2'>{blog.desc}</span>
                </Table.Cell>
                <Table.Cell>
                  <span className='flex gap-1'>
                    <span className='action-icon edit' onClick={() => { setUpdateBlog(true); setUpdateBlogId(blog.gallery_id); }}>
                      <FaPenClip size={14} />
                    </span>
                    <span className='action-icon del' onClick={() => { setDeleteBlog(true); setDeleteBlogId(blog.gallery_id); }}>
                      <FaRecycle size={14} />
                    </span>
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>

      {/* ── ADD BLOG MODAL ── */}
      <Modal show={AddBlog} onClose={() => setAddBlog(false)} popup size='3xl'>
        <Modal.Header className='border-b border-slate-100 px-6 pt-5 pb-4'>
          <div>
            <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>New Entry</p>
            <h2 className='font-anton text-slate-800 text-2xl'>Add Gallery</h2>
            <p className='font-outfit text-xs text-slate-400 mt-0.5'>Fill in the details to publish a new gallery item</p>
          </div>
        </Modal.Header>
        <Modal.Body className='px-6 py-5'>
          <MessageBanner />
          <form className='space-y-1' onSubmit={handleRegister}>

            <UploadField label='Image' onChange={handleImageChange} preview={img} />

            <input
              type='text' name='name' value={formData.name}
              onChange={handleChange} required placeholder='Name'
              className='field-input'
            />
            
            <input
            type='text'
              name='role' value={formData.role}
              onChange={handleChange} required placeholder='Role'
              className='field-input'
            />

            <textarea
              name='desc' value={formData.desc}
              onChange={handleChange} required placeholder='Description'
              rows={3} className='field-input'
            />

            <button type='submit' disabled={isLoading} className='submit-btn mt-2'>
              {isLoading ? 'Posting....' : 'Post'}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* ── UPDATE BLOG MODAL ── */}
      <Modal show={updateBlog} onClose={() => setUpdateBlog(false)} popup size='3xl'>
        <Modal.Header className='border-b border-slate-100 px-6 pt-5 pb-4'>
          <div>
            <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>Edit Entry</p>
            <h2 className='font-anton text-slate-800 text-2xl'>Update Gallery</h2>
            <p className='font-outfit text-xs text-slate-400 mt-0.5'>Modify the details below and save your changes</p>
          </div>
        </Modal.Header>
        <Modal.Body className='px-6 py-5'>
          <MessageBanner />
          <form className='space-y-1' onSubmit={handleUpdate}>

            <div className='flex gap-3 items-center mb-2'>
              {updateData.image && <img src={updateData.image} className='w-16 h-16 rounded-xl object-cover border border-slate-200' />}
              <span className='font-outfit text-xs text-slate-400'>Current main image</span>
            </div>

            <UploadField label='Replace Main Image' onChange={handleImageChange} preview={updateData.img} />

            <input
              type='text' 
              name='name'
              value={updateData.name}
              onChange={(e) => setUpdateData({ ...updateData, name: e.target.value })}
              placeholder='Name'
              className='field-input'
            />

             <input
              type='text' name='role'
              value={updateData.role}
              onChange={(e) => setUpdateData({ ...updateData, role: e.target.value })}
              placeholder='Role'
              className='field-input'
            />

            <textarea
              type='text' name='desc'
              value={updateData.desc}
              onChange={(e) => setUpdateData({ ...updateData, desc: e.target.value })}
              placeholder='Description'
              rows={6} className='field-input'
            />

            <button type='submit' disabled={isLoading} className='submit-btn mt-2'>
              {isLoading ? 'Updating…' : 'Update Blog'}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* ── DELETE MODAL — untouched ── */}
      <Modal show={deleteBlog} onClose={() => setDeleteBlog(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Do you want to delete this post
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDelete}>Yes, I'm sure</Button>
              <Button color='success' onClick={() => setDeleteBlog(false)}>No, Cancel</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default AdminGallery;