import { Button, FileInput, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function TeamOne() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [img, setImg] = useState('')
  const [AddTeam, setAddTeam] = useState(false)
  const [updateTeam, setUpdateTeam] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateTeamId, setUpdateTeamId] = useState('')
  const [deleteTeam, setDeleteTeam] = useState(false)
  const [deleteTeamId, setDeleteTeamId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [teamManage, setTeamManage] = useState(false)
  const [formData, setFormData] = useState({
    logo: '',
    name: '',
    abv: '',
    live: '',
    year: '',
    stadium: '',
    region: '',
    facebook: '',
    tiktok: '',
    instagram: ''
  });

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchPlayerData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getteam/${updateTeamId}`);
        
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
  }, [updateTeamId]);

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
              setFormData({ ...formData, logo: imageUrl });
              setUpdateData({ ...updateData, logo: imageUrl });
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
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createteam', {
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

      setMessage({ text: 'Team added successful!!', type: 'success' });
      
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
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updateteam/${updateTeamId}`, {
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

      setMessage({ text: 'Team Update successful!!', type: 'success' });
      
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallteam');
        
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

  const handleDelete = async () =>{
    
    try {
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deleteteam/${deleteTeamId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setMessage({ text: 'Player Deleted successful!!', type: 'success' })
      setDeleteTeam(false)
      setData((prev) =>
       prev.filter((team) => team.team_id !== deleteTeamId ))
     }
   }catch(error){
    setMessage(error)
   }
}

  return (
    <div className='m-3 min-h-screen'>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => {setAddTeam(true)}}>
           Add Team
         </div>
         <h1 className='max-w-7xl mx-auto text-2xl'>Teams</h1>
    <div className='max-w-7xl mx-auto overflow-scroll scrollbar'>
      <Table className='mx-auto' hoverable>
         <Table.Head>
           <Table.HeadCell>
               Team
           </Table.HeadCell>
           <Table.HeadCell>
              Abv
           </Table.HeadCell>
           <Table.HeadCell>
               Town
           </Table.HeadCell>
           <Table.HeadCell>
              Creation Year
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((team) => (
                 <Table.Row>
                    <Table.Cell className=''>
                                                        <span className='flex justify-between'>
                                                        <span className='flex items-center gap-2 w-56'>
                                                            <img src={team.logo} width={30} />
                                                            {team.name}
                                                        </span>
                                                        <span className=''>
                                                                {
                                                                    team.live && (
                                                                            <span className='text-green-500'>Live</span>
                                                                    )
                                                                }
                                                        </span>
                                                        </span>
                    </Table.Cell>
                    <Table.Cell>
                     {team.abv}
                    </Table.Cell>
                    <Table.Cell>
                     {team.region}
                    </Table.Cell>
                    <Table.Cell>
                     {team.year}
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() =>{
                        setUpdateTeam(true)
                        setUpdateTeamId(team.team_id)
                      }} />
                      <FaRecycle 
                         onClick={() =>{
                          setDeleteTeam(true)
                          setDeleteTeamId(team.team_id)}}
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
                    show={AddTeam}
                    onClose={()=> setAddTeam(false)}
                    popup size='3xl'
                    >
                        <Modal.Header />
                  <Modal.Body>
                  {message?.text && (
                    <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {message.text}
                    </div>
                  )}
                        <div className="flex justify-center items-center min-h-screen">
              <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900">Add Team</h1>
                  <p className=" text-sm text-gray-400">Add team to Registry</p>
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
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder='Team Name'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="abv"
                        value={formData.abv}
                        onChange={handleChange}
                        required
                        placeholder='Abbrevation'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        required
                        placeholder='Year of Creation'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="region"
                        value={formData.region}
                        onChange={handleChange}
                        required
                        placeholder='Town'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="stadium"
                        value={formData.stadium}
                        onChange={handleChange}
                        placeholder='Stadium'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        required
                        placeholder='Facebook'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        required
                        placeholder='Instagram'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={handleChange}
                        required
                        placeholder='Tiktok'
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
              {isLoading ? 'Adding Team....' : 'Add Team'}
                </button>
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
        </Modal>
                 <Modal
                    show={updateTeam}
                    onClose={()=> setUpdateTeam(false)}
                    popup size='3xl'
                    >
                        <Modal.Header />
                  <Modal.Body>
                  {message?.text && (
                    <div className={`p-4 rounded-md ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {message.text}
                    </div>
                  )}
                        <div className="flex justify-center items-center min-h-screen">
              <div className="w-full max-w-md mx-auto p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                  <h1 className="text-2xl font-bold text-gray-900">Update Team</h1>
                  <p className=" text-sm text-gray-400">Update team details</p>
                </div>
                                
                <form className="mt-3 space-y-3 mx-auto" onSubmit={handleUpdate}>
                  <div className="space-y-2">

                  <img src={updateData.logo} width={70} className='p-2 mx-auto w-32 h-32 rounded-full' />
                    
                  <div className='border-4 border-teal-500 border-dotted p-3'>
                        <FileInput type='file'
                           accept='image/*'
                           onChange={handleImageChange} />
                      </div>
                              {img && (
                                    <img
                                        className='items-center rounded-full mx-auto'
                                        src={img}
                                        width={100}
                                      />
                                     )}

                    <div>
                      <input
                        type="text"
                        name="name"
                        value={updateData.name}
                        onChange={(e) => 
                          setUpdateData({...updateData, name: e.target.value})}
                        placeholder='Player Name'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="abv"
                        value={updateData.abv}
                        onChange={(e) => 
                          setUpdateData({...updateData, abv: e.target.value})}
                        placeholder='Abbrevation'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                   <button 
                    type="button"
                    onClick={() => setTeamManage((prev) => !prev)} 
                    className="text-slate-100 bg-yellow-400 border-1 shadow-md p-1 rounded-md mt-2"
                  >
                    {teamManage ? "Close Management" : "Manage Team"}
                  </button>

                    {
                      teamManage && (
                    <>
                    <div>
                      <input
                        type="text"
                        name="year"
                        value={updateData.year}
                        onChange={(e) => 
                          setUpdateData({...updateData, year: e.target.value})}
                        placeholder='Creation Year'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="region"
                        value={updateData.region}
                        onChange={(e) => 
                          setUpdateData({...updateData, region: e.target.value})}
                        placeholder='Town'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="stadium"
                        value={updateData.stadium}
                        onChange={(e) => 
                          setUpdateData({...updateData, stadium: e.target.value})}
                        placeholder='Stadium'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="facebook"
                        value={updateData.facebook}
                        onChange={(e) => 
                          setUpdateData({...updateData, facebook: e.target.value})}
                        placeholder='Facebook'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    <div>
                      <input
                        type="text"
                        name="instagram"
                        value={updateData.instagram}
                        onChange={(e) => 
                          setUpdateData({...updateData, instagram: e.target.value})}
                        placeholder='Instagram'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="tiktok"
                        value={updateData.tiktok}
                        onChange={(e) => 
                          setUpdateData({...updateData, tiktok: e.target.value})}
                        placeholder='Tiktok'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                   </>
                   )
                }
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
                 <Modal show={deleteTeam} 
              onClose={() => setDeleteTeam(false)} 
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
                            <Button color='success' onClick={() => setDeleteTeam(false)}>
                            No, Cancel
                            </Button>
                        </div>
                    </div>
                  </Modal.Body>
              </Modal>
    </div>
  )
}

export default TeamOne
