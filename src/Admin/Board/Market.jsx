import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function Market() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Addmarket, setAddmarket] = useState(false)
  const [updateMarket, setUpdateMarket] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateMarketId, setUpdateMarketId] = useState('')
  const [deleteMarket, setDeleteMarket] = useState(false)
  const [deleteMarketId, setDeleteMarketId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [Teamdata, setTeamData] = useState([])
  const [formData, setFormData] = useState({
    market_name: '',
    position: '',
    age: '',
    nationality: '',
    pic: '',
    team: ''
  });

  useEffect(() => {


    // Function to fetch data from your SQL API
    const fetchMarketData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getmarket/${updateMarketId}`);
        
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
    fetchMarketData();
  }, [updateMarketId]);

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
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createmarket', {
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

      setMessage({ text: 'Market added successful!!', type: 'success' });
      
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
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updatemarket/${updateMarketId}`, {
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

      setMessage({ text: 'Market Update successful!!', type: 'success' });
      
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallmarket');
        
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallplayer');
        
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

  const handleDelete = async () => {
    
    try {
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deletemarket/${deleteMarketId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setMessage({ text: 'Market Deleted successful!!', type: 'success' })
      setDeleteMarket(false)
      setData((prev) =>
       prev.filter((market) => market.market_id !== deleteMarketId ))
     }
   }catch(error){
    setMessage(error)
   }
}

  return (
    <div className='m-3'>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => {setAddmarket(true)}}>
           Add Market
         </div>
    <div className='w-full overflow-scroll scrollbar'>
      <Table>
         <Table.Head>
           <Table.HeadCell>
              Profile
           </Table.HeadCell>
           <Table.HeadCell>
              Player Name
           </Table.HeadCell>
           <Table.HeadCell>
              Club
           </Table.HeadCell>
           <Table.HeadCell>
              Position
           </Table.HeadCell>
           <Table.HeadCell>
              Origin
           </Table.HeadCell>
           <Table.HeadCell>
              Age
           </Table.HeadCell>
           <Table.HeadCell>
              Matches
           </Table.HeadCell>
           <Table.HeadCell>
              Goals
           </Table.HeadCell>
           <Table.HeadCell>
              Assist
           </Table.HeadCell>
           <Table.HeadCell>
              League rating
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((market) => (
                 <Table.Row>
                    <Table.Cell>
                     <img src={market.pic} width={40} />
                    </Table.Cell>
                    <Table.Cell>
                     {market.player_name}
                    </Table.Cell>
                    <Table.Cell>
                    <img src={market.logo} width={40} />
                    </Table.Cell>
                    <Table.Cell>
                     {market.position}
                    </Table.Cell>
                    <Table.Cell>
                     {market.nationality}
                    </Table.Cell>
                    <Table.Cell>
                     {market.age}
                    </Table.Cell>
                    <Table.Cell>
                     {market.matches}
                    </Table.Cell>
                    <Table.Cell>
                     {market.goal}
                    </Table.Cell>
                    <Table.Cell>
                     {market.assist}
                    </Table.Cell>
                    <Table.Cell>
                     {market.rating}
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() =>{
                        setUpdateMarket(true)
                        setUpdateMarketId(market.market_id)

                      }} />
                      <FaRecycle 
                         onClick={() =>{
                          setDeleteMarket(true)
                          setDeleteMarketId(market.market_id)}}
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
                    show={Addmarket}
                    onClose={()=> setAddmarket(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Add Market</h1>
                  <p className=" text-sm text-gray-400">Add player to Market</p>
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
                        {Teamdata.map((player) => (
                          <option key={player.player_id} value={player.player_id}>
                            {player.player_name}
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
                        name="goal"
                        value={formData.goal}
                        onChange={handleChange}
                        required
                        placeholder='Goals'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="assist"
                        value={formData.assist}
                        onChange={handleChange}
                        required
                        placeholder='Assists'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                        placeholder='League rating'
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
                    show={updateMarket}
                    onClose={()=> setUpdateMarket(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Update Market</h1>
                  <p className=" text-sm text-gray-400">Update market details</p>
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
                        <option value={updateData.player}>{updateData.player_name}</option>
                        {Teamdata.map((player) => (
                          <option value={player.player_id}>
                            {player.player_name}
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
                        placeholder='matches'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="goal"
                        value={updateData.goal}
                        onChange={(e) => 
                          setUpdateData({...updateData, goal: e.target.value})}
                        placeholder='goals'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="sssist"
                        value={updateData.assist}
                        onChange={(e) => 
                          setUpdateData({...updateData, assist: e.target.value})}
                        placeholder='assist'
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
                        placeholder='rating'
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
              {isLoading ? 'Updating....' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>

     <Modal show={deleteMarket} 
                          onClose={() => setDeleteMarket(false)} 
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
                                        <Button color='success' onClick={() => setDeleteMarket(false)}>
                                        No, Cancel
                                        </Button>
                                    </div>
                                </div>
                              </Modal.Body>
                          </Modal>
    
  </div>
  )
}

export default Market;
