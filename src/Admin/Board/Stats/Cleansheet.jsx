import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function Cleansheet() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddCleansheet, setAddCleansheet] = useState(false)
  const [updateCleansheet, setUpdateCleansheet] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateCleansheetId, setUpdateCleansheetId] = useState('')
  const [deleteCleansheet, setDeleteCleansheet] = useState(false)
  const [deleteCleansheetId, setDeleteCleansheetId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [playerdata, setPlayerData] = useState([])
  const [formData, setFormData] = useState({
    player: '',
    goal: '',
    matches: '',
    aver: '',
    rating: '',
  });

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchScorerData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getcleansheet/${updateCleansheetId}`);
        
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
    fetchScorerData();
  }, [updateCleansheetId]);

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
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createcleansheet', {
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

      setMessage({ text: 'Player Cleansheet successful!!', type: 'success' });
      
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
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updatecleansheet/${updateCleansheetId}`, {
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallcleansheet');
        
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
    const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deletecleansheet/${deleteCleansheetId}`, {
      method: 'DELETE'
    });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setDeleteCleansheet(false)
      setData((prev) =>
       prev.filter((player) => player.cleansheet_id !== deleteCleansheetId ))
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getgk');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setPlayerData(result);
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
     <h1 className='text-2xl text-center'>Cleansheets</h1>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => {setAddCleansheet(true)}}>
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
              Cleansheet
           </Table.HeadCell>
           <Table.HeadCell>
              Matches
           </Table.HeadCell>
           <Table.HeadCell>
              Average
           </Table.HeadCell>
           <Table.HeadCell>
              Rating
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((Cleansheet) => (
                 <Table.Row key={Cleansheet.cleansheet_id}>
                    <Table.Cell>
                      <img src={Cleansheet.pic} width={30} className='rounded-full' />
                    </Table.Cell>
                    <Table.Cell>
                     {Cleansheet.player_name}
                    </Table.Cell>
                    <Table.Cell>
                     {Cleansheet.cleansheet}
                    </Table.Cell>
                    <Table.Cell>
                     {Cleansheet.matches}
                    </Table.Cell>
                    <Table.Cell>
                     {Cleansheet.aver}
                    </Table.Cell>
                    <Table.Cell>
                     {Cleansheet.rating}
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() => { 
                        setUpdateCleansheet(true) 
                        setUpdateCleansheetId(Cleansheet.cleansheet_id) }} />
                      <FaRecycle 
                         onClick={() => {
                          setDeleteCleansheet(true)
                          setDeleteCleansheetId(Cleansheet.cleansheet_id) }} />
                     </span>
                    </Table.Cell>
                  </Table.Row>
               ))
             }
         </Table.Body>
      </Table>
    </div>
         <Modal
                    show={AddCleansheet}
                    onClose={()=> setAddCleansheet(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Add Cleansheet</h1>
                  <p className=" text-sm text-gray-400">Add Cleansheet to Register</p>
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
                          <option value={player.player_id}>
                            {player.player_name}
                          </option>
                        ))}
                      </select>
                    </div>
                  
                    <div>
                      <input
                        type="text"
                        name="cleansheet"
                        value={formData.cleansheet}
                        onChange={handleChange}
                        required
                        placeholder='Cleansheet'
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
                        name="aver"
                        value={formData.aver}
                        onChange={handleChange}
                        required
                        placeholder='Average Match Rating'
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
                    show={updateCleansheet}
                    onClose={()=> setUpdateCleansheet(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Update Cleansheet</h1>
                  <p className=" text-sm text-gray-400">Update Cleansheet to details</p>
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
                        name="cleansheet"
                        value={updateData.cleansheet}
                        onChange={(e) => 
                          setUpdateData({...updateData, cleansheet: e.target.value})}
                        placeholder='Cleansheet.........'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
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
                        name="aver"
                        value={updateData.aver}
                        onChange={(e) => 
                          setUpdateData({...updateData, aver: e.target.value})}
                        placeholder='Average Rating per Match'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
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
                 <Modal show={deleteCleansheet} 
              onClose={() => setDeleteCleansheet(false)} 
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
                        onClick={() => setDeleteCleansheet(false)}
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

export default Cleansheet
