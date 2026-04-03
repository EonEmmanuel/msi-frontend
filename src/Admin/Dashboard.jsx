import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Board from './DisplayBoard'
import { FaUsers } from 'react-icons/fa6'
import { LayoutDashboard } from 'lucide-react'
import User from './User'

const FontImport = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Anton&family=Outfit:wght@300;400;500;600;700&display=swap');
    .font-anton  { font-family: 'Anton', sans-serif; }
    .font-outfit { font-family: 'Outfit', sans-serif; }
  `}</style>
)

function Dashboard() {

  const location = useLocation()

  const [tab, setTab] = useState('')
  useEffect(() =>{ 

    /* assignctab to the urlparams to creat it own path */
    const urlParams = new URLSearchParams(location.search) 
    const tabFromUrl = urlParams.get('tab')
    if(tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search])

  return (
    <div className='font-outfit min-h-screen bg-slate-50'>
      <FontImport />

      {/* ── Top nav bar ── */}
      <div className='bg-white border-b border-slate-200 shadow-sm sticky top-0 z-30'>
        <div className='max-w-screen-xl mx-auto px-6 md:px-10'>
          <div className='flex items-center gap-1 h-14'>

            {/* Brand */}
            <span className='font-anton text-blue-800 text-lg tracking-wider mr-6'>
              MSI TV
            </span>

            {/* Dashboard tab */}
            <Link to='/dashboard?tab=dashview' style={{ textDecoration: 'none' }}>
              <div className={`relative flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200
                ${tab === 'dashview'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}>
                <LayoutDashboard size={16} className={tab === 'dashview' ? 'text-indigo-500' : 'text-slate-400'} />
                Dashboard
                {tab === 'dashview' && (
                  <span className='absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-500 rounded-full' />
                )}
              </div>
            </Link>

            {/* Users tab */}
            <Link to='/dashboard?tab=users' style={{ textDecoration: 'none' }}>
              <div className={`relative flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all duration-200
                ${tab === 'users'
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100'
                }`}>
                <FaUsers size={16} className={tab === 'users' ? 'text-indigo-500' : 'text-slate-400'} />
                Users
                {tab === 'users' && (
                  <span className='absolute bottom-0 left-3 right-3 h-0.5 bg-indigo-500 rounded-full' />
                )}
              </div>
            </Link>

          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <div>
        { tab === 'dashview' && <Board /> }
        { tab === 'users' && <User /> }
      </div>

    </div>
  )
}

export default Dashboard