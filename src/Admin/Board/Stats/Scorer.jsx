import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function Scorer() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddScorer, setAddScorer] = useState(false)
  const [updateScorer, setUpdateScorer] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updatescorerId, setUpdateScorerId] = useState('')
  const [deleteScorer, setDeleteScorer] = useState(false)
  const [deletescorerId, setDeleteScorerId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [playerdata, setPlayerData] = useState([])
  const [formData, setFormData] = useState({
    player: '',
    goal: '',
    matches: '',
    rating: '',
    penalties: ''
  });

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchScorerData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getscorer/${updatescorerId}`);
        
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
    fetchScorerData();
  }, [updatescorerId]);

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
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createscorer', {
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

      setMessage({ text: 'Player scorer successful!!', type: 'success' });
      
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
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updatescorer/${updatescorerId}`, {
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

      setMessage({ text: 'Player Update successful!!', type: 'success' });
      
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallscorer');
        
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
    const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deletescorer/${deletescorerId}`, {
      method: 'DELETE'
    });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setMessage({ text: 'Player Deleted successful!!', type: 'success' })
      setDeleteScorer(false)
      setData((prev) =>
       prev.filter((player) => player.scorer_id !== deletescorerId ))
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallplayer');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setPlayerData(result.data);
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
     <h1 className='text-2xl text-center'>Scorers</h1>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => {setAddScorer(true)}}>
           Add Player
         </div>
    <div className='w-full mx-auto overflow-scroll scrollbar'>
      <Table>
         <Table.Head>
           <Table.HeadCell>
              Player
           </Table.HeadCell>
           <Table.HeadCell>
              Player Name
           </Table.HeadCell>
           <Table.HeadCell>
              Goals
           </Table.HeadCell>
           <Table.HeadCell>
             Penalties
           </Table.HeadCell>
           <Table.HeadCell>
              Matches
           </Table.HeadCell>
           <Table.HeadCell>
              Rating
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((scorer) => (
                 <Table.Row key={scorer.scorer_id}>
                    <Table.Cell>
                      <img src={scorer.pic} width={30} className='rounded-full' />
                    </Table.Cell>
                    <Table.Cell>
                     {scorer.player_name}
                    </Table.Cell>
                    <Table.Cell>
                     {scorer.goal}
                    </Table.Cell>
                    <Table.Cell>
                     {scorer.penalties}
                    </Table.Cell>
                    <Table.Cell>
                     {scorer.matches}
                    </Table.Cell>
                    <Table.Cell>
                     {scorer.rating}
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() => { 
                        setUpdateScorer(true) 
                        setUpdateScorerId(scorer.scorer_id) }} />
                      <FaRecycle 
                         onClick={() => {
                          setDeleteScorer(true)
                          setDeleteScorerId(scorer.scorer_id) }} />
                     </span>
                    </Table.Cell>
                  </Table.Row>
               ))
             }
         </Table.Body>
      </Table>
    </div>
         <Modal
                    show={AddScorer}
                    onClose={()=> setAddScorer(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Add Scorer</h1>
                  <p className=" text-sm text-gray-400">Add Scorer to Register</p>
                </div>
                                                
                <form className="mt-3 space-y-3" onSubmit={handleRegister}>
                  <div className="space-y-2">

                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="player"
                        value={formData.player}
                        onChange={handleChange}
                      >
                        <option value="">Select Player</option>
                        {playerdata.map((player) => (
                          <option key={player.player_id} value={player.player_id}>
                            {player.player_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                        placeholder='Goals'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="penalties"
                        value={formData.penalties}
                        onChange={handleChange}
                        required
                        placeholder='Penalties'
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
                    show={updateScorer}
                    onClose={()=> setUpdateScorer(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Update Scorer</h1>
                  <p className=" text-sm text-gray-400">Update Scorer to details</p>
                </div>
                                                
                <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                  <div className="space-y-2">

                    <div>
                    <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="player"
                        value={updateData.player}
                        onChange={(e) => 
                          setUpdateData({...updateData, player: e.target.value})}
                      >
                        <option value={updateData.player}>
                           {updateData.player_name}
                        </option>
                        {playerdata.map((player) => (
                          <option value={player.player_id}>
                            {player.player_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="goal"
                        value={updateData.goal}
                        onChange={(e) => 
                          setUpdateData({...updateData, goal: e.target.value})}
                        placeholder='Goals'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div> 
                      <input
                        type="text"
                        name="penalties"
                        value={updateData.penalties}
                        onChange={(e) => 
                          setUpdateData({...updateData, penalties: e.target.value})}
                        placeholder='Penalties'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
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
                 <Modal show={deleteScorer} 
              onClose={() => setDeleteScorer(false)} 
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
                        onClick={() => setDeleteScorer(false)}
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

export default Scorer
