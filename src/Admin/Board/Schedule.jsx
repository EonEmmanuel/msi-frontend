import { Modal } from 'flowbite-react'
import { ChevronRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6'

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');
    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }

    .prog-card {
      transition: transform 0.2s ease, filter 0.2s ease;
    }
    .prog-card:hover {
      transform: translateY(-3px);
      filter: brightness(1.08);
    }
    .prog-card:hover .chevron-icon {
      transform: translateX(3px);
      opacity: 0.7 !important;
    }
    .chevron-icon { transition: transform 0.2s ease, opacity 0.2s ease; }

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

    .action-icon {
      cursor: pointer;
      padding: 5px;
      border-radius: 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.18s ease, color 0.18s ease;
    }
    .action-icon.edit:hover { background: rgba(255,255,255,0.25); color: white; }
    .action-icon.del:hover  { background: rgba(255,0,0,0.25); color: white; }

    .day-btn {
      font-family: 'Outfit', sans-serif;
      font-size: 13px;
      font-weight: 600;
      padding: 6px 16px;
      border-radius: 999px;
      border: 1px solid #e2e8f0;
      background: white;
      color: #64748b;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.18s ease;
    }
    .day-btn:hover { border-color: #a5b4fc; color: #6366f1; }
    .day-btn.active {
      background: #6366f1;
      border-color: #6366f1;
      color: white;
      box-shadow: 0 4px 12px rgba(99,102,241,0.3);
    }

    /* Hide scrollbar for day selector */
    .day-scroll::-webkit-scrollbar { display: none; }
  `}</style>
)

function SchedulePage() {

  const days = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

  const [selectedDay, setSelectedDay] = useState('')
  const [schedule, setSchedule] = useState([])
  const [loading, setLoading] = useState(false)

  const [newItem, setNewItem] = useState({ program: '' })

  const [updateData, setUpdateData] = useState([])
  const [updateScheduleId, setUpdateScheduleId] = useState()
  const [deleteScheduleId, setDeleteScheduleId] = useState()

  const [selectedItem, setSelectedItem] = useState(null)

  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState({ text: '', type: '' })

  const [program, setProgram] = useState([])
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewItem({ ...newItem, [name]: value })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/msi/getallprogram')
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
        const result = await response.json()
        setProgram(result.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Set current day
  useEffect(() => {
    const today = new Date().toLocaleString('en-US', { weekday: 'long' })
    setSelectedDay(today)
  }, [])

  // Fetch schedule
  useEffect(() => {
    if (!selectedDay) return
    const fetchSchedule = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:3002/api/msi/getallschedule`)
        const data = await res.json()
        setSchedule(data.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchSchedule()
  }, [selectedDay])

  // CREATE
  const handleAdd = async (e) => {
  e.preventDefault()
  try {
    const res = await fetch('http://localhost:3002/api/msi/createschedule', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newItem, day: selectedDay })
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message)

    setMessage({ text: 'Schedule Added successfully!', type: 'success' })

    // ✅ Fetch the full joined record using the returned schedule_id
    const fullRes = await fetch(`http://localhost:3002/api/msi/getschedule/${data.schedule_id}`)
    const fullData = await fullRes.json()
    setSchedule(prev => [...prev, fullData])  // fullData has name, themecolor, tag, etc.

    setNewItem({ program: '' })
    setTimeout(() => {
      setShowAddModal(false)
      setMessage({ text: '', type: '' })
    }, 1000)

  } catch (err) {
    setMessage({ text: err.message, type: 'error' })
  } finally {
    setIsLoading(false)
  }
}

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await fetch(`http://localhost:3002/api/msi/getschedule/${updateScheduleId}`)
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`)
        const result = await response.json()
        setUpdateData(result)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError(error.message)
      }
    }
    fetchScheduleData()
  }, [updateScheduleId])

  // UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        `http://localhost:3002/api/msi/updateschedule/${updateScheduleId}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updateData)
        }
      )
      const updated = await res.json()
      setSchedule(prev =>
        prev.map(item => item.schedule_id === updated.schedule_id ? updated : item)
      )
      if (!res.ok) throw new Error(updated.message)
      setMessage({ text: 'Schedule Update successful!!', type: 'success' })
      setTimeout(() => {
        setShowEditModal(false)
        setMessage({ text: '', type: '' })
      }, 1500)
    } catch (err) {
      console.error(err)
    }
  }

  // DELETE
  const confirmDelete = async () => {
    try {
      await fetch(
        `http://localhost:3002/api/msi/deleteschedule/${deleteScheduleId}`,
        { method: 'DELETE' }
      )
      setSchedule(prev => prev.filter(item => item.schedule_id !== deleteScheduleId))
      setShowDeleteModal(false)
    } catch (err) {
      console.error(err)
    }
  }

  const filteredSchedule = Array.isArray(schedule)
    ? schedule.filter(s => s && s.day === selectedDay)
    : []

  const MessageBanner = () => message.text ? (
    <div className={`font-outfit text-sm px-4 py-3 rounded-xl mb-4 ${
      message.type === 'success'
        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
        : 'bg-red-50 text-red-700 border border-red-200'
    }`}>
      {message.text}
    </div>
  ) : null

  return (
    <div className='font-outfit min-h-screen bg-slate-50 p-4 md:p-6'>
      <FontImport />

      {/* ── Header ── */}
      <div className='max-w-7xl mx-auto mb-6'>
        <div className='flex items-center gap-3 mb-1'>
          <span className='block h-px w-8 bg-indigo-500' />
          <span className='font-anton text-indigo-500 text-xs tracking-[0.22em] uppercase'>TV Guide</span>
        </div>
        {/* FIXED: stack vertically on mobile, side-by-side on sm+ */}
        <div className='flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between'>
          <h1 className='font-anton text-slate-800 text-3xl md:text-4xl lg:text-5xl leading-none'>
            {selectedDay} <span className='text-indigo-500 font-bold'>Programs</span>
          </h1>
          {/* FIXED: shrink-0 + self-start so button doesn't stretch on mobile */}
          <button
            onClick={() => setShowAddModal(true)}
            className='flex shrink-0 self-start sm:self-auto items-center gap-2 font-outfit text-sm font-semibold bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-xl transition-all duration-200 hover:shadow-[0_4px_14px_rgba(99,102,241,0.35)]'
          >
            + Add
          </button>
        </div>
      </div>

      {/* ── Day selector — FIXED: smooth iOS scroll, hidden scrollbar ── */}
      <div
        className='max-w-7xl mx-auto flex gap-2 overflow-x-auto mb-6 pb-2 day-scroll'
        style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {days.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`day-btn ${selectedDay === day ? 'active' : ''}`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* ── Schedule grid ── */}
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3'>
        {loading ? (
          <p className='font-outfit text-sm text-slate-400 col-span-full text-center py-8'>Loading...</p>
        ) : filteredSchedule.length > 0 ? (
          filteredSchedule.map((prog) => (
            <div
              key={prog.schedule_id}
              style={{ backgroundColor: prog.themecolor }}
              /* FIXED: tighter padding on mobile, normal on sm+ */
              className='prog-card group flex items-center gap-3 px-3 py-3 sm:px-5 sm:py-4 rounded-2xl border border-white/10 cursor-pointer shadow-sm'
            >
              {/* Time column */}
              <div className='font-outfit w-12 sm:w-14 shrink-0 text-center'>
                <p className='font-anton text-xl sm:text-2xl text-white leading-none'>
                  {prog.time}
                </p>
              </div>

              {/* Vertical rule */}
              <div className={`w-px h-9 shrink-0 rounded-full ${prog.live ? 'bg-white/50' : 'bg-white/20'}`} />

              {/* Title + meta */}
              <div className='flex-1 min-w-0'>
                <h4 className='font-outfit uppercase text-white text-sm font-bold truncate mb-1.5'>
                  {prog.name}
                </h4>
                <div className='flex items-center gap-2 flex-wrap'>
                  <span className='font-outfit text-[10px] font-semibold px-2 py-0.5 text-white rounded-full border border-white/25 tracking-wide bg-white/10'>
                    {prog.tag}
                  </span>
                  <span className='font-outfit text-[11px] font-bold text-white/70'>{prog.duration}</span>
                </div>
              </div>

              {/* Admin actions + chevron */}
              <div className='shrink-0 flex items-center gap-1'>
                <span
                  className='action-icon edit text-white/40'
                  onClick={() => {
                    setShowEditModal(true)
                    setUpdateScheduleId(prog.schedule_id)
                  }}
                >
                  <FaPenClip size={12} />
                </span>
                <span
                  className='action-icon del text-white/40'
                  onClick={() => {
                    setShowDeleteModal(true)
                    setDeleteScheduleId(prog.schedule_id)
                  }}
                >
                  <FaRecycle size={12} />
                </span>
                <ChevronRight size={16} className='chevron-icon text-white/20 ml-1' />
              </div>
            </div>
          ))
        ) : (
          <p className='font-outfit text-sm text-slate-400 col-span-full text-center py-8'>
            No schedule for {selectedDay}
          </p>
        )}
      </div>

      {/* ── ADD MODAL ── */}
      <Modal show={showAddModal} onClose={() => setShowAddModal(false)} popup size='md'>
        <Modal.Header className='border-b border-slate-100 px-6 pt-5 pb-4'>
          <div>
            <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>New Entry</p>
            <h2 className='font-anton text-slate-800 text-2xl'>Add Schedule</h2>
            <p className='font-outfit text-xs text-slate-400 mt-0.5'>
              Adding to <span className='font-semibold text-indigo-500'>{selectedDay}</span>
            </p>
          </div>
        </Modal.Header>
        <Modal.Body className='px-6 py-5'>
          <MessageBanner />
          <form onSubmit={handleAdd}>
            <select className="field-input" value={newItem.program} onChange={handleChange} name='program' required>
              <option value=''>Program</option>
              {program.map(p => <option key={p.program_id} value={p.program_id}>{p.name}</option>)}
            </select>
            <button type='submit' disabled={isLoading} className='submit-btn'>
              {isLoading ? 'Adding...' : 'Add Schedule'}
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* ── EDIT MODAL ── */}
      <Modal show={showEditModal} onClose={() => setShowEditModal(false)} popup size='md'>
        <Modal.Header className='border-b border-slate-100 px-6 pt-5 pb-4'>
          <div>
            <p className='font-anton text-indigo-500 text-xs tracking-[0.2em] uppercase'>Edit Entry</p>
            <h2 className='font-anton text-slate-800 text-2xl'>Update Schedule</h2>
            <p className='font-outfit text-xs text-slate-400 mt-0.5'>Modify the details and save</p>
          </div>
        </Modal.Header>
        <Modal.Body className='px-6 py-5'>
          {message.text && (
            <div className={`flex m-3 items-start gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
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
          )}
          <select
            className="field-input"
            value={updateData.program}
            onChange={e => setUpdateData({ ...updateData, program: e.target.value })}
            required
          >
            <option value=''>{updateData.name}</option>
            {program.map(p => <option key={p.program_id} value={p.program_id}>{p.name}</option>)}
          </select>
          <button onClick={handleUpdate} className='submit-btn' style={{ background: '#059669' }}>
            Update Schedule
          </button>
        </Modal.Body>
      </Modal>

      {/* ── DELETE MODAL ── */}
      <Modal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body className='text-center pb-6'>
          <div className='w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mx-auto mb-4'>
            <FaRecycle size={22} className='text-red-400' />
          </div>
          <h3 className='font-anton text-slate-800 text-xl mb-1'>Delete Schedule?</h3>
          <p className='font-outfit text-sm text-slate-400 mb-5'>
            This will permanently remove <span className='font-semibold text-slate-600'>{selectedItem?.program}</span> from the schedule.
          </p>
          <div className='flex justify-center gap-3'>
            <button
              onClick={confirmDelete}
              className='font-outfit font-semibold text-sm bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl transition-colors'
            >
              Yes, delete
            </button>
            <button
              onClick={() => setShowDeleteModal(false)}
              className='font-outfit font-semibold text-sm bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-2 rounded-xl transition-colors'
            >
              Cancel
            </button>
          </div>
        </Modal.Body>
      </Modal>

    </div>
  )
}

export default SchedulePage