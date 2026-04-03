import { Button, FileInput, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function Player() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [img, setImg] = useState('')
  const [Addplayer, setAddplayer] = useState(false)
  const [updatePlayer, setUpdatePlayer] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updatePlayerId, setUpdatePlayerId] = useState('')
  const [deletePlayer, setDeletePlayer] = useState(false)
  const [deletePlayerId, setDeletePlayerId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [Teamdata, setTeamData] = useState([])
  const [formData, setFormData] = useState({
    player_name: '',
    position: '',
    age: '',
    leg: '',
    nationality: '',
    pic: '',
    jersey: '',
    d_join: '',
    origin: '',
    team: ''
  });

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchPlayerData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getplayer/${updatePlayerId}`);
        
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
    fetchPlayerData();
  }, [updatePlayerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const CLOUD_NAME = 'drzoiigek';
  const UPLOAD_PRESET = 'mtn-upload';

  const handleImageChange = async (e) => {
      const file = e.target.files[0];
      if (file) {
          try {
              setIsLoading(true);
              const imageUrl = await uploadImage(file);
              setImg(imageUrl);
              setFormData({ ...formData, pic: imageUrl });
              setUpdateData({ ...updateData, pic: imageUrl });
              setMessage({ text: "Main Image uploaded successfully!", type: "success" });
          } catch (err) {
              setError(err.message);
          } finally {
              setIsLoading(false);
          }
      }
  };
  
  const uploadImage = async (file) => {
    const imageData = new FormData();
    imageData.append('file', file);
    imageData.append('upload_preset', UPLOAD_PRESET);

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: imageData,
            }
        );

        if (!response.ok) throw new Error("Image upload failed");
        const data = await response.json();
        return data.secure_url;
    } catch (err) {
        throw new Error('Failed to upload image: ' + err.message);
    }
};

  const handleRegister = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    
    try {
      // Replace with your actual API endpoint
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createplayer', {
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

      setMessage({ text: 'Player added successful!!', type: 'success' });
      
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
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updateplayer/${updatePlayerId}`, {
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

  const handleDelete = async () => {
    
    try {
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deleteplayer/${deletePlayerId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setMessage({ text: 'Player Deleted successful!!', type: 'success' })
      setDeletePlayer(false)
      setData((prev) =>
       prev.filter((player) => player.player_id !== deletePlayerId ))
     }
   }catch(error){
    setMessage(error)
   }
}

  return (
    <div className='m-3'>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => {setAddplayer(true)}}>
           Add Player
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
              Position
           </Table.HeadCell>
           <Table.HeadCell>
              Jersey
           </Table.HeadCell>
           <Table.HeadCell>
              Origin
           </Table.HeadCell>
           <Table.HeadCell>
              Age
           </Table.HeadCell>
           <Table.HeadCell>
              Club
           </Table.HeadCell>
           <Table.HeadCell>
              Date of Join
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((player) => (
                 <Table.Row>
                    <Table.Cell>
                     <img src={player.pic} width={35} className='' />
                    </Table.Cell>
                    <Table.Cell>
                     {player.player_name}
                    </Table.Cell>
                    <Table.Cell>
                     {player.position}
                    </Table.Cell>
                    <Table.Cell>
                     {player.jersey}
                    </Table.Cell>
                    <Table.Cell>
                     {player.nationality}
                    </Table.Cell>
                    <Table.Cell>
                     {player.age}
                    </Table.Cell>
                    <Table.Cell>
                     <img src={player.logo} width={30} />
                    </Table.Cell>
                    <Table.Cell>
                     {player.d_join}
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() =>{
                        setUpdatePlayer(true)
                        setUpdatePlayerId(player.player_id)

                      }} />
                      <FaRecycle 
                         onClick={() =>{
                          setDeletePlayer(true)
                          setDeletePlayerId(player.player_id)}}
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
                    show={Addplayer}
                    onClose={()=> setAddplayer(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Add Player</h1>
                  <p className=" text-sm text-gray-400">Add player to Registry</p>
                </div>
                                
                <form className="mt-3 space-y-3" onSubmit={handleRegister}>
                  <div className="space-y-2">
                      <div className='border-4 border-teal-500 border-dotted p-3'>
                          <FileInput type='file'
                            accept='image/*'
                            onChange={handleImageChange} />
                      </div>
                          {img && (
                            <img
                                className='items-center mx-auto'
                                src={img}
                                width={100}
                              />
                              )}

                    <div>
                      <input
                        type="text"
                        name="player_name"
                        value={formData.player_name}
                        onChange={handleChange}
                        required
                        placeholder='Player Name'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        required
                        placeholder='Position'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        placeholder='Age'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="leg"
                        value={formData.leg}
                        onChange={handleChange}
                        required
                        placeholder='Strong Foot'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                        placeholder='Nationality'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="jersey"
                        value={formData.jersey}
                        onChange={handleChange}
                        required
                        placeholder='Jersey'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="d_join"
                        value={formData.d_join}
                        onChange={handleChange}
                        required
                        placeholder='Date of Club Join'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="origin"
                        value={formData.origin}
                        onChange={handleChange}
                        required
                        placeholder='Origin'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
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
                    show={updatePlayer}
                    onClose={()=> setUpdatePlayer(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Update Player</h1>
                  <p className=" text-sm text-gray-400">Update player to details</p>
                </div>
                                
                <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                  <div className="space-y-2">

                  <img src={updateData.pic} width={70} className='p-2 mx-auto w-32 h-32' />

                    <div className='border-4 border-teal-500 border-dotted p-3'>
                          <FileInput type='file'
                            accept='image/*'
                            onChange={handleImageChange} />
                      </div>
                          {img && (
                            <img
                                className='items-center mx-auto'
                                src={img}
                                width={100}
                              />
                              )}

                    <div>
                      <input
                        type="text"
                        name="player_name"
                        value={updateData.player_name}
                        onChange={(e) => 
                          setUpdateData({...updateData, player_name: e.target.value})}
                        placeholder='Player Name'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="position"
                        value={updateData.position}
                        onChange={(e) => 
                          setUpdateData({...updateData, position: e.target.value})}
                        placeholder='Position'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        name="age"
                        value={updateData.age}
                        onChange={(e) => 
                          setUpdateData({...updateData, age: e.target.value})}
                        placeholder='Age'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                     <div>
                      <input
                        type="text"
                        name="leg"
                        value={updateData.leg}
                        onChange={(e) => 
                          setUpdateData({...updateData, leg: e.target.value})}
                        placeholder='Strong Foot'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="nationality"
                        value={updateData.nationality}
                        onChange={(e) => 
                          setUpdateData({...updateData, nationality: e.target.value})}
                        placeholder='Nationality'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="jersey"
                        value={updateData.jersey}
                        onChange={(e) => 
                          setUpdateData({...updateData, jersey: e.target.value})}
                        placeholder='Jersey'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="d_join"
                        value={updateData.d_join}
                        onChange={(e) => 
                          setUpdateData({...updateData, d_join: e.target.value})}
                        placeholder='Date of Club Join'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="origin"
                        value={updateData.origin}
                        onChange={(e) => 
                          setUpdateData({...updateData, origin: e.target.value})}
                        placeholder='Origin'
                        className={`mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="team"
                        value={updateData.team}
                        onChange={(e) => 
                          setUpdateData({...updateData, team: e.target.value})}
                      >
                        { Teamdata.map((team) => (
                          <option value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
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
                 <Modal show={deletePlayer} 
              onClose={() => setDeletePlayer(false)} 
              popup size ='md' >
                <Modal.Header />
                  <Modal.Body>
                    <div className='text-center'>
                      <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                      dark:text-gray-200 mb-4 mx-auto' />
                      <h3 className='mb-5 text-lg text-gray-500
                      dark:text-gray-400'>
                        Do you want to delete this item
                        </h3>
                        <div className='flex justify-center gap-4'>
                          <Button color='failure' 
                          onClick={handleDelete}>
                            Yes, I'm sure
                            </Button>
                            <Button color='success' onClick={() => setDeletePlayer(false)}>
                            No, Cancel
                            </Button>
                        </div>
                    </div>
                  </Modal.Body>
              </Modal>
    </div>
  )
}

export default Player
