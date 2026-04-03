import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ResultMatchday from './Result/Resultmatchday'
import Result from './Result/Result'

function ResMatchday() {

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
        <Link to='/gslresult?tab=resultmatchday'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-40 text-center'>
           Matchday
         </div>
        </Link>
        <Link to='/gslresult?tab=result'>
         <div className='border-2 border-blue-300 rounded-lg bg-blue-400 text-white p-1 w-40 text-center'>
           Results
         </div>
        </Link>
      </div>
      <div className='max-w-7xl mx-auto'>
         { tab === 'resultmatchday' && <ResultMatchday /> }
         { tab === 'result' && <Result /> }
      </div>
    </div>
  )
}

export default ResMatchday
