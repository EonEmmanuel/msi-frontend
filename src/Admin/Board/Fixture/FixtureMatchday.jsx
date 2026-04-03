import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'

function FixtureMatchday() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddFixtureMatchday, setAddFixtureMatchday] = useState(false)
  const [updateFixtureMatchday, setUpdateFixtureMatchday] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateFixtureMatchdayId, setUpdateFixtureMatchdayId] = useState('')
  const [deleteFixtureMatchday, setDeleteFixtureMatchday] = useState(false)
  const [deleteFixtureMatchdayId, setDeleteFixtureMatchdayId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [formData, setFormData] = useState({
    matchday: '',
    status: ''
  });

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchFixtureMatchdayData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getfixturematchday/${updateFixtureMatchdayId}`);
        
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
    fetchFixtureMatchdayData();
  }, [updateFixtureMatchdayId]);

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
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createfixturematchday', {
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

      setMessage({ text: 'Fixture Matchday added successful!!', type: 'success' });
      
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
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updatefixturematchday/${updateFixtureMatchdayId}`, {
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

      setMessage({ text: 'Fixture Matchday Update successful!!', type: 'success' });
      
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallfixturematchday');
        
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
    
    try {
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deletefixturematchday/${deleteFixtureMatchdayId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setMessage({ text: 'Fixture Matchday Deleted successful!!', type: 'success' })
      setDeleteFixtureMatchday(false)
      setData((prev) =>
       prev.filter((fixturematchday) => fixturematchday.matchday_id !== deleteFixtureMatchdayId ))
     }
   }catch(error){
    setMessage(error)
   }
}

  return (
    <div className='m-3'>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-52 text-center' onClick={() => {setAddFixtureMatchday(true)}}>
           Add Fixture Matchday
         </div>
    <div className='max-w-7xl mx-auto overflow-scroll scrollbar'>
      <Table className='mx-auto' hoverable>
         <Table.Head>
           <Table.HeadCell>
              Matchday
           </Table.HeadCell>
           <Table.HeadCell>
              Status
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((fixturematchday) => (
                 <Table.Row>
                    <Table.Cell>
                     {fixturematchday.matchday}
                    </Table.Cell>
                    <Table.Cell>
                     {fixturematchday.status}
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() =>{
                        setUpdateFixtureMatchday(true)
                        setUpdateFixtureMatchdayId(fixturematchday.matchday_id)
                      }} />
                      <FaRecycle 
                         onClick={() =>{
                          setDeleteFixtureMatchday(true)
                          setDeleteFixtureMatchdayId(fixturematchday.matchday_id)}}
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
                    show={AddFixtureMatchday}
                    onClose={()=> setAddFixtureMatchday(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Add Fixture Matchday</h1>
                  <p className=" text-sm text-gray-400">Add fixture matchday to Registry</p>
                </div>
                                                
                <form className="mt-3 space-y-3" onSubmit={handleRegister}>
                  <div className="space-y-2">

                    <div>
                      <input
                        type="text"
                        name="matchday"
                        value={formData.matchday}
                        onChange={handleChange}
                        required
                        placeholder='Matchday'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        required
                        placeholder='Status'
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
              {isLoading ? 'Adding Fixture Matchday....' : 'Add Fixture Matchday'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    <Modal
                    show={updateFixtureMatchday}
                    onClose={()=> setUpdateFixtureMatchday(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Update Fixture Matchday</h1>
                  <p className=" text-sm text-gray-400">Update fixture matchday details</p>
                </div>
                                                
                <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                  <div className="space-y-2">

                    <div>
                      <input
                        type="text"
                        name="matchday"
                        value={updateData.matchday}
                        onChange={(e) => 
                          setUpdateData({...updateData, matchday: e.target.value})}
                        placeholder='Fixture Matchday Name'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        name="status"
                        value={updateData.status}
                        onChange={(e) => 
                          setUpdateData({...updateData, status: e.target.value})}
                        placeholder='Abbreviation'
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
                 <Modal show={deleteFixtureMatchday} 
              onClose={() => setDeleteFixtureMatchday(false)} 
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
                            <Button color='success' onClick={() => setDeleteFixtureMatchday(false)}>
                            No, Cancel
                            </Button>
                        </div>
                    </div>
                  </Modal.Body>
              </Modal>
    </div>
  )
}

export default FixtureMatchday;
