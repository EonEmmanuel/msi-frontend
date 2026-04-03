import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function Fixture() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Addfixture, setAddFixture] = useState(false)
  const [updateFixture, setUpdateFixture] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateFixtureId, setUpdateFixtureId] = useState('')
  const [deleteFixture, setDeleteFixture] = useState(false)
  const [deleteFixtureId, setDeleteFixtureId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [Teamdata, setTeamData] = useState([])
  const [matchdaydata, setMatchdayData] = useState([])
  const [formData, setFormData] = useState({
    matchday: '',
    home_team: '',
    away_team: '',
    date: '',
    time: '',
    venue: '',
    referee: ''
  });

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchFixtureData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getfixture/${updateFixtureId}`);
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setUpdateData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    // Call the fetch function
    fetchFixtureData();
  }, [updateFixtureId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createfixture', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage({ text: 'Fixture added successful!!', type: 'success' });
      
      // Redirect or update app state here
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updatefixture/${updateFixtureId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage({ text: 'Fixture Update successful!!', type: 'success' });
      
      // Redirect or update app state here
      setTimeout(() => {
        window.location.reload();
      }, 1500);
      
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchData = async () => {
      setMessage({ text: '', type: '' })

      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallfixture');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    // Call the fetch function
    fetchData();
  }, []);

  useEffect(() => {
  
      // Function to fetch data from your SQL API
      const fetchTeamData = async () => {
        setMessage({ text: '', type: '' }) 
  
        try {
          // Replace with your actual API endpoint
          const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallteam');
          
          // Check if the response is successful
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          
          // Parse the JSON response
          const result = await response.json();
          
          // Update state with the fetched data
          setTeamData(result.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching data:', error);
          setError(error.message);
          setLoading(false);
        }
      };
      
      // Call the fetch function
      fetchTeamData();
    }, []);

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchMatchdayData = async () => {
      setMessage({ text: '', type: '' }) 

      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallfixturematchday');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setMatchdayData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    // Call the fetch function
    fetchMatchdayData();
  }, []);

  const handleDelete = async () =>{
    
    try {
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deletefixture/${deleteFixtureId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setMessage({ text: 'Fixture Deleted successful!!', type: 'success' })
      setDeleteFixture(false)
      setData((prev) =>
       prev.filter((fixture) => fixture.fixture_id !== deleteFixtureId ))
     }
   }catch(error){
    setMessage(error)
   }
}

  return (
    <div className='m-3'>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => {setAddFixture(true)}}>
           Add Fixture
         </div>
    <div className='w-full overflow-scroll scrollbar'>
      <Table>
         <Table.Head>
           <Table.HeadCell>
              Matchday
           </Table.HeadCell>
           <Table.HeadCell>
              Home Team
           </Table.HeadCell>
           <Table.HeadCell>
              Away Team
           </Table.HeadCell>
           <Table.HeadCell>
              Date
           </Table.HeadCell>
           <Table.HeadCell>
              Time
           </Table.HeadCell>
           <Table.HeadCell>
              Venue
           </Table.HeadCell>
           <Table.HeadCell>
              Referee
           </Table.HeadCell>
           <Table.HeadCell>
              Status
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((fixture) => (
                 <Table.Row>
                    <Table.Cell>
                     {fixture.match_day}
                    </Table.Cell>
                    <Table.Cell>
                     <img src={fixture.home_team_logo} width={30} />
                    </Table.Cell>
                    <Table.Cell>
                    <img src={fixture.away_team_logo} width={30} />
                    </Table.Cell>
                    <Table.Cell>
                     {fixture.date}
                    </Table.Cell>
                    <Table.Cell>
                     {fixture.time}
                    </Table.Cell>
                    <Table.Cell>
                     {fixture.venue}
                    </Table.Cell>
                    <Table.Cell>
                     {fixture.referee}
                    </Table.Cell>
                    <Table.Cell>
                     <span className=''>
                                                                {
                                                                    fixture.live && (
                                                                            <span className='text-green-200 bg-green-500 rounded-md w-fit p-1'>Live</span>
                                                                    )
                                                                }
                     </span>
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() =>{
                        setUpdateFixture(true)
                        setUpdateFixtureId(fixture.fixture_id)
                      }} />
                      <FaRecycle 
                         onClick={() =>{
                          setDeleteFixture(true)
                          setDeleteFixtureId(fixture.fixture_id)}}
                      />
                     </span>
                    </Table.Cell>
                  </Table.Row>
               ))
             }
         </Table.Body>
      </Table>
    </div>
         <Modal
                    show={Addfixture}
                    onClose={()=> setAddFixture(false)}
                    popup size='3xl'
                    >
                        <Modal.Header />
                  <Modal.Body>
                  {message.text && (
                    <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {message.text}
                    </div>
                  )}
                        <div className="flex justify-center items-center min-h-screen">
              <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900">Add Fixture</h1>
                  <p className=" text-sm text-gray-400">Add fixture to Register</p>
                </div>
                                  
                <form className="mt-3 space-y-3" onSubmit={handleRegister}>
                  <div className="space-y-2">
                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="matchday"
                        value={formData.matchday}
                        onChange={handleChange}
                      >
                        <option value="">Select Matchday</option>
                        {matchdaydata.map((matchday) => (
                          <option key={matchday.matchday_id} value={matchday.matchday_id}>
                            <p>Matchday</p> {matchday.matchday}
                          </option>
                        ))}
                      </select>
                    </div>
                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="home_team"
                        value={formData.home_team}
                        onChange={handleChange}
                      >
                        <option value="">Select Home Team</option>
                        {Teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="away_team"
                        value={formData.away_team}
                        onChange={handleChange}
                      >
                        <option value="">Select Away Team</option>
                        {Teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        placeholder='Date'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        placeholder='Time'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        required
                        placeholder='Venue'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="referee"
                        value={formData.referee}
                        onChange={handleChange}
                        required
                        placeholder='Referee'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    
                  </div>
                  <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isLoading ? 'Add....' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    <Modal
                    show={updateFixture}
                    onClose={()=> setUpdateFixture(false)}
                    popup size='3xl'
                    >
                        <Modal.Header />
                  <Modal.Body>
                  {message.text && (
                    <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {message.text}
                    </div>
                  )}
                        <div className="flex justify-center items-center min-h-screen">
              <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900">Update Fixture</h1>
                  <p className=" text-sm text-gray-400">Update fixture to details</p>
                </div>
                                  
                <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                  <div className="space-y-2">
                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="matchday"
                        value={updateData.matchday}
                        onChange={(e) => 
                          setUpdateData({...updateData, matchday: e.target.value})}
                      >
                        {matchdaydata.map((matchday) => (
                          <option key={matchday.matchday_id} value={matchday.matchday_id}>
                            <p>Matchday</p> {matchday.matchday}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="home_team"
                        value={updateData.home_team}
                        onChange={(e) => 
                          setUpdateData({...updateData, home_team: e.target.value})}
                      >
                        {Teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="away_team"
                        value={updateData.away_team}
                        onChange={(e) => 
                          setUpdateData({...updateData, away_team: e.target.value})}
                      >
                        {Teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="date"
                        name="date"
                        value={updateData.date}
                        onChange={(e) => 
                          setUpdateData({...updateData, date: e.target.value})}
                        placeholder='Date'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="time"
                        value={updateData.time}
                        onChange={(e) => 
                          setUpdateData({...updateData, time: e.target.value})}
                        placeholder='Time'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
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
                    {
                      updateData.live && (
                        <div>
                        <div>
                          <input
                            type="text"
                            name="home_score"
                            value={updateData.home_score}
                            onChange={(e) => 
                              setUpdateData({...updateData, home_score: e.target.value})}
                            placeholder='Live Home Score'
                            className={`mt-1 mb-2 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            name="away_score"
                            value={updateData.away_score}
                            onChange={(e) => 
                              setUpdateData({...updateData, away_score: e.target.value})}
                            placeholder='Live Away Score'
                            className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                          />
                        </div>
                        </div>
                      )
                    }

                    <div>
                      <input
                        type="text"
                        name="venue"
                        value={updateData.venue}
                        onChange={(e) => 
                          setUpdateData({...updateData, venue: e.target.value})}
                        placeholder='Position'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="referee"
                        value={updateData.referee}
                        onChange={(e) => 
                          setUpdateData({...updateData, referee: e.target.value})}
                        placeholder='Age'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                       <select
                         name="ft"
                         value={updateData.ft}
                         onChange={(e) => 
                           setUpdateData({...updateData, ft: e.target.value})}
                       >
                         <option disabled>{updateData.ft}</option>
                         <option value='Not_played'>Not_Played</option>
                         <option value='played'>Played</option>
                       </select>
                    </div>

                  </div>
                  <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isLoading ? 'Update....' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
     <Modal show={deleteFixture} 
                  onClose={() => setDeleteFixture(false)} 
                  popup size ='md' >
                    <Modal.Header />
                      <Modal.Body>
                        <div className='text-center'>
                          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                          dark:text-gray-200 mb-4 mx-auto' />
                          <h3 className='mb-5 text-lg text-gray-500
                          dark:text-gray-400'>
                            Do you want to delete this fixture matchday
                            </h3>
                            <div className='flex justify-center gap-4'>
                              <Button color='failure' 
                              onClick={handleDelete}>
                                Yes, I'm sure
                                </Button>
                                <Button color='success' onClick={() => setDeleteFixture(false)}>
                                No, Cancel
                                </Button>
                            </div>
                        </div>
                      </Modal.Body>
                  </Modal>
    </div>
  )
}

export default Fixture;
