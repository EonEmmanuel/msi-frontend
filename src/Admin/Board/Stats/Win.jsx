import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function Win() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddWin, setAddWin] = useState(false)
  const [updateWin, setUpdateWin] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateWinId, setUpdateWinId] = useState('')
  const [deleteWin, setDeleteWin] = useState(false)
  const [deleteWinId, setDeleteWinId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [teamdata, setTeamData] = useState([])
  const [formData, setFormData] = useState({
    team: '',
    matches: '',
    wins: '',
    home_win: '',
    rating: ''
  });

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchWinData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getwin/${updateWinId}`);
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setUpdateData(result);
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    // Call the fetch function
    fetchWinData();
  }, [updateWinId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    
    setMessage({ text: '', type: '' })
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createwin', {
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

      setMessage({ text: 'Team Win successful!!', type: 'success' });
      
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

    setMessage({ text: '', type: '' })
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updatewin/${updateWinId}`, {
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

      setMessage({ text: 'Team Win Update successful!!', type: 'success' });
      
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

      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallwin');
        
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

  const handleDelete = async () =>{
    try{
    const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deletewin/${deleteWinId}`, {
      method: 'DELETE'
    });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setMessage({ text: 'Team Deleted successful!!', type: 'success' })
      setDeleteWin(false)
      setData((prev) =>
       prev.filter((win) => win.win_id !== deleteWinId ))
      setMessage({ text: '!', type: '' });
     }
   }catch(error){
    setMessage(error)
   }
}

useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchPlayerData = async () => {
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
    fetchPlayerData();

  }, []);

  return (
    <div className='m-3 mx-auto'>
     <h1 className='text-2xl text-center'>Team Wins</h1>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => {setAddWin(true)}}>
           Add Team
         </div>
    <div className='w-full mx-auto overflow-scroll scrollbar'>
      <Table>
         <Table.Head>
           <Table.HeadCell>
              Team
           </Table.HeadCell>
           <Table.HeadCell>
              Team Name
           </Table.HeadCell>
           <Table.HeadCell>
              Matches
           </Table.HeadCell>
           <Table.HeadCell>
              Wins
           </Table.HeadCell>
           <Table.HeadCell>
             Home Win
           </Table.HeadCell>
           <Table.HeadCell>
              Rating
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((win) => (
                 <Table.Row key={win.win_id}>
                    <Table.Cell>
                      <img src={win.logo} width={30} className='rounded-full' />
                    </Table.Cell>
                    <Table.Cell>
                     {win.name}
                    </Table.Cell>
                    <Table.Cell>
                     {win.matches}
                    </Table.Cell>
                    <Table.Cell>
                     {win.wins}
                    </Table.Cell>
                    <Table.Cell>
                     {win.home_win}
                    </Table.Cell>
                    <Table.Cell>
                     {win.rating}
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() => { 
                        setUpdateWin(true) 
                        setUpdateWinId(win.win_id) }} />
                      <FaRecycle 
                         onClick={() => {
                          setDeleteWin(true)
                          setDeleteWinId(win.win_id) }} />
                     </span>
                    </Table.Cell>
                  </Table.Row>
               ))
             }
         </Table.Body>
      </Table>
    </div>
         <Modal
                    show={AddWin}
                    onClose={()=> setAddWin(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Add Team Wins</h1>
                  <p className=" text-sm text-gray-400">Add Team Wins to Register</p>
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
                        {teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
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
                        name="wins"
                        value={formData.wins}
                        onChange={handleChange}
                        required
                        placeholder='Wins'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="home_win"
                        value={formData.home_win}
                        onChange={handleChange}
                        required
                        placeholder='Home Wins'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        placeholder='rating'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
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
                    show={updateWin}
                    onClose={()=> setUpdateWin(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Update Team Losses</h1>
                  <p className=" text-sm text-gray-400">Update Team Losses to details</p>
                </div>
                                                
                <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                  <div className="space-y-2">

                    <div>
                    <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="team"
                        value={updateData.team}
                        onChange={(e) => 
                          setUpdateData({...updateData, team: e.target.value})}
                      >
                        <option value={updateData.team}>
                           {updateData.name}
                        </option>
                        {teamdata.map((team) => (
                          <option value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>


                    <div>
                      <input
                        type="text"
                        name="matches"
                        value={updateData.matches}
                        onChange={(e) => 
                          setUpdateData({...updateData, matches: e.target.value})}
                        placeholder='Matches'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="wins"
                        value={updateData.wins}
                        onChange={(e) => 
                          setUpdateData({...updateData, wins: e.target.value})}
                        placeholder='Wins'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="home_win"
                        value={updateData.home_win}
                        onChange={(e) => 
                          setUpdateData({...updateData, home_win: e.target.value})}
                        placeholder='Matches'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                     <div>
                      <input
                        type="text"
                        name="rating"
                        value={updateData.rating}
                        onChange={(e) => 
                          setUpdateData({...updateData, rating: e.target.value})}
                        placeholder='Rating'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                  </div>
                  <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isLoading ? 'Updating....' : 'Update'}
            </button>
          </div>
        </form>
      </div>
    </div>
                        </Modal.Body>
                 </Modal>
                 <Modal show={deleteWin} 
              onClose={() => setDeleteWin(false)} 
              popup size ='md' >
                <Modal.Header />
                  <Modal.Body>
                    <div className='text-center'>
                      <HiOutlineExclamationCircle className='h-14 w-14 text-gray-300 mx-auto' />
                      <h3 className='text-gray-600 text-2xl py-3'>Are you sure you want to delete?</h3>
                      <div className='flex justify-center gap-4'>
                        <Button 
                        onClick={handleDelete}
                        color="success"
                        >
                          Yes
                        </Button>
                        <Button 
                        onClick={() => setDeleteWin(false)}
                        color="failure"
                        >
                           No
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
            </Modal>
    </div>
  )
}

export default Win
