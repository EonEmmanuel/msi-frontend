import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Scorer from './Stats/Scorer'
import Assist from './Stats/Assist'
import Cleansheet from './Stats/Cleansheet'
import Win from './Stats/Win'
import Losses from './Stats/Losses'
import Goal from './Stats/Goal'

function Stat() {

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
    <div className='min-h-screen'>
      <div className='max-w-7xl  mx-auto flex justify-between overflow-x-scroll scrollbar p-2 gap-2'>
        <Link to='/gslstat?tab=scorer'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-32 text-center'>
           Scorer
         </div>
        </Link>
        <Link to='/gslstat?tab=assist'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-32 text-center'>
           Assist
         </div>
        </Link>
        <Link to='/gslstat?tab=cleansheet'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-32 text-center'>
           Cleansheet
         </div>
        </Link>
        <Link to='/gslstat?tab=wins'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-32 text-center'>
           Wins
         </div>
        </Link>
        <Link to='/gslstat?tab=losses'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-32 text-center'>
           Losses
         </div>
        </Link>
        <Link to='/gslstat?tab=goals'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-32 text-center'>
           Goals
         </div>
        </Link>
      </div>
      <div className='max-w-7xl mx-auto'>
         { tab === 'scorer' && <Scorer /> }
         { tab === 'assist' && <Assist /> }
         { tab === 'cleansheet' && <Cleansheet /> }
         { tab === 'wins' && <Win /> }
         { tab === 'losses' && <Losses /> }
         { tab === 'goals' && <Goal /> }
      </div>
    </div>
  )
}

export default Stat
