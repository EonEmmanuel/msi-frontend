import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import FixtureMatchday from './Fixture/FixtureMatchday'
import Fixture from './Fixture/Fixture'

function FixMatchday() {

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
      <div className='max-w-3xl  mx-auto flex justify-between overflow-x-scroll scrollbar p-2 gap-2'>
        <Link to='/gslfixture?tab=fixmatchday'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-40 text-center'>
           Matchday
         </div>
        </Link>
        <Link to='/gslfixture?tab=fixtures'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-40 text-center'>
           Fixtures
         </div>
        </Link>
      </div>
      <div className='max-w-7xl mx-auto'>
         { tab === 'fixmatchday' && <FixtureMatchday /> }
         { tab === 'fixtures' && <Fixture /> }
      </div>
    </div>
  )
}

export default FixMatchday
