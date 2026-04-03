import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function Standing() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Addstanding, setAddstanding] = useState(false)
  const [updateStanding, setUpdateStanding] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateStandingId, setUpdateStandingId] = useState('')
  const [deleteStanding, setDeleteStanding] = useState(false)
  const [deleteStandingId, setDeleteStandingId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [Teamdata, setTeamData] = useState([])
  const [formData, setFormData] = useState({
    standing_name: '',
    position: '',
    age: '',
    nationality: '',
    pic: '',
    team: ''
  });

  useEffect(() => {

    console.log(updateStandingId)
    console.log(deleteStandingId)

    // Function to fetch data from your SQL API
    const fetchStandingData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getstanding/${updateStandingId}`);
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setUpdateData(result);
        setLoading(false);
        console.log(updateData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    // Call the fetch function
    fetchStandingData();
  }, [updateStandingId]);

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
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createstanding', {
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

      setMessage({ text: 'Standing added successful!!', type: 'success' });
      
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
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updatestanding/${updateStandingId}`, {
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

      setMessage({ text: 'Standing Update successful!!', type: 'success' });
      
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallstanding');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setData(result.data);
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

  const handleDelete = async () =>{
    
    try {
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deletestanding/${deleteStandingId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setMessage({ text: 'Standing Deleted successful!!', type: 'success' })
      setDeleteStanding(false)
      setData((prev) =>
       prev.filter((standing) => standing.stand_id !== deleteStandingId ))
     }
   }catch(error){
    setMessage(error)
   }
}

  return (
    <div className='m-3'>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => {setAddstanding(true)}}>
           Add Team
         </div>
    <div className='w-full overflow-scroll scrollbar'>
      <Table>
         <Table.Head>
           <Table.HeadCell>
              Team
           </Table.HeadCell>
           <Table.HeadCell>
              Pionts
           </Table.HeadCell>
           <Table.HeadCell>
              Matches
           </Table.HeadCell>
           <Table.HeadCell>
              Wins
           </Table.HeadCell>
           <Table.HeadCell>
              Draw
           </Table.HeadCell>
           <Table.HeadCell>
              Losses
           </Table.HeadCell>
           <Table.HeadCell>
              GS
           </Table.HeadCell>
           <Table.HeadCell>
              GC
           </Table.HeadCell>
           <Table.HeadCell>
              GST
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((standing) => (
                 <Table.Row>
                    <Table.Cell key={standing.stand_id}>
                    <span className='flex gap-2'>
                     <img src={standing.logo} width={30} /> <h1 className='flex items-center justify-center'>{standing.name}</h1>
                    </span>
                    </Table.Cell>
                    <Table.Cell>
                     {standing.pointes}
                    </Table.Cell>
                    <Table.Cell>
                     {standing.matches}
                    </Table.Cell>
                    <Table.Cell>
                     {standing.win}
                    </Table.Cell>
                    <Table.Cell>
                     {standing.draw}
                    </Table.Cell>
                    <Table.Cell>
                     {standing.losses}
                    </Table.Cell>
                    <Table.Cell>
                     {standing.goal_sc}
                    </Table.Cell>
                    <Table.Cell>
                     {standing.goal_conc}
                    </Table.Cell>
                    <Table.Cell>
                     {standing.goal_st}
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() =>{
                        setUpdateStanding(true)
                        setUpdateStandingId(standing.stand_id)

                      }} />
                      <FaRecycle 
                         onClick={() =>{
                          setDeleteStanding(true)
                          setDeleteStandingId(standing.stand_id)}}
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
                    show={Addstanding}
                    onClose={()=> setAddstanding(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Add Standing</h1>
                  <p className=" text-sm text-gray-400">Add standing to Register</p>
                </div>
                                                
                <form className="mt-3 space-y-3" onSubmit={handleRegister}>
                  <div className="space-y-2">
                   
                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="team"
                        value={formData.team}
                        onChange={handleChange}
                      >
                        <option value="">Select Team</option>
                        {Teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="pointes"
                        value={formData.pointes}
                        onChange={handleChange}
                        required
                        placeholder='Pointes'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="matches"
                        value={formData.matches}
                        onChange={handleChange}
                        required
                        placeholder='Matches'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="win"
                        value={formData.win}
                        onChange={handleChange}
                        required
                        placeholder='Win'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="draw"
                        value={formData.draw}
                        onChange={handleChange}
                        required
                        placeholder='Draw'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="losses"
                        value={formData.losses}
                        onChange={handleChange}
                        required
                        placeholder='Losses'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="goal_sc"
                        value={formData.goal_sc}
                        onChange={handleChange}
                        required
                        placeholder='Goal Scored'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="goal_conc"
                        value={formData.goal_conc}
                        onChange={handleChange}
                        required
                        placeholder='Goal Conceded'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="goal_st"
                        value={formData.goal_st}
                        onChange={handleChange}
                        required
                        placeholder='Goal Streak'
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

{/*  Update Standing Modal */}
        <Modal
                    show={updateStanding}
                    onClose={()=> setUpdateStanding(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Update Standing</h1>
                  <p className=" text-sm text-gray-400">Update standing details</p>
                </div>
                                                
                <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                  <div className="space-y-2">
                    <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="team"
                        value={updateData.team}
                        onChange={(e) => setUpdateData({ ...updateData, team: e.target.value })}
                      >
                        {Teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.team_id}. {team.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="pointes"
                        value={updateData.pointes}
                        onChange={(e) => setUpdateData({ ...updateData, pointes: e.target.value })}
                        required
                        placeholder='Pointes'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="matches"
                        value={updateData.matches}
                        onChange={(e) => setUpdateData({ ...updateData, matches: e.target.value })}
                        required
                        placeholder='Matches'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="win"
                        value={updateData.win}
                        onChange={(e) => setUpdateData({ ...updateData, win: e.target.value })}
                        required
                        placeholder='Win'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                    <div>
                      <input
                        type="text"
                        name="draw"
                        value={updateData.draw}
                        onChange={(e) => setUpdateData({ ...updateData, draw: e.target.value })}
                        required
                        placeholder='Draw'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div></div>
                      <input
                        type="text"
                        name="losses"
                        value={updateData.losses}
                        onChange={(e) => setUpdateData({ ...updateData, losses: e.target.value })}
                        required
                        placeholder='Losses'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="goal_sc"
                        value={updateData.goal_sc}
                        onChange={(e) => setUpdateData({ ...updateData, goal_sc: e.target.value })}
                        required
                        placeholder='Goals Scored'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="goal_conc"
                        value={updateData.goal_conc}
                        onChange={(e) => setUpdateData({ ...updateData, goal_conc: e.target.value })}
                        required
                        placeholder='Goals Conceded'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="goal_st"
                        value={updateData.goal_st}
                        onChange={(e) => setUpdateData({ ...updateData, goal_st: e.target.value })}
                        required
                        placeholder='Goal Streak'
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
              {isLoading ? 'Update....' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>


{/*  Delete Standing Modal */}
        <Modal show={deleteStanding} 
                      onClose={() => setDeleteStanding(false)} 
                      popup size ='md' >
                        <Modal.Header />
                          <Modal.Body>
                            <div className='text-center'>
                              <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                              dark:text-gray-200 mb-4 mx-auto' />
                              <h3 className='mb-5 text-lg text-gray-500
                              dark:text-gray-400'>
                                Do you want to delete this post
                                </h3>
                                <div className='flex justify-center gap-4'>
                                  <Button color='failure' 
                                  onClick={handleDelete}>
                                    Yes, I'm sure
                                    </Button>
                                    <Button color='success' onClick={() => setDeleteStanding(false)}>
                                    No, Cancel
                                    </Button>
                                </div>
                            </div>
                          </Modal.Body>
                      </Modal>

    </div>
  )
}

export default Standing
