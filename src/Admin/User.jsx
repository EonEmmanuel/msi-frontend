import { Button, Modal, Table } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react'
import { FaCubes, FaDeploydog } from 'react-icons/fa6';
import { AuthContext } from '../context/AuthContext';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function User() {

    const { currentUser } = useContext(AuthContext);

    const [data, setData] = useState([]);
    const [userData, setUserData] = useState({});
    const [openModal, setOpenModal] = useState(false);
    const [userId, setUserId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [deleteuser, setDeleteuser] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    useEffect(() => {

        // Function to fetch data from your SQL API
        const fetchData = async () => {
    
          try {
            // Replace with your actual API endpoint
            const response = await fetch('http://localhost:3002/api/msi/getusers');
            
            // Check if the response is successful
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            // Parse the JSON response
            const result = await response.json();
            
            // Update state with the fetched data
            setData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
        // Call the fetch function
        fetchData();
      }, []);

      useEffect(() => {

        // Function to fetch data from your SQL API
        const fetchData = async () => {
    
          try {
            // Replace with your actual API endpoint
            const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getuser/${userId}`);
            
            // Check if the response is successful
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            // Parse the JSON response
            const result = await response.json();
            
            // Update state with the fetched data
            setUserData(result);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        
        // Call the fetch function
        fetchData();
      }, [userId]);

      const handleUpdate = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
        setMessage({ text: 'Loading.......', type: 'success' });
        
        try {
          // Replace with your actual API endpoint
          const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updateuser/${userId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });
          
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.message);
          }
    
          setMessage({ text: 'User Update successful!!', type: 'success' });
          
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

      const handleDelete = async () => {
    
        try {
          const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deleteuser/${userId}`, {
            method: 'DELETE'
          });
          const data = await res.json();
         if (!res.ok){
          setMessage(data.message)
         } else {
          setMessage({ text: 'Blog Deleted successful!!', type: 'success' })
          setDeleteuser(false)
          setData((prev) =>
           prev.filter((user) => user.user_id !== userId ))
         }
       }catch(error){
        setMessage(error)
       }
      }
    
  return (
    <div className='max-w-7xl mx-auto overflow-scroll scrollbar min-h-screen'>
          <Table className='mx-auto' hoverable>
             <Table.Head>
               <Table.HeadCell>
                  User Name
               </Table.HeadCell>
               <Table.HeadCell>
                  Email
               </Table.HeadCell>
               <Table.HeadCell>
                  Phone
               </Table.HeadCell>
             </Table.Head>
             <Table.Body>
                 {
                   data.map((user) => (
                     <Table.Row>
                        <Table.Cell>
                          {user.username}
                        </Table.Cell>
                        <Table.Cell>
                         {user.email}
                        </Table.Cell>
                        <Table.Cell>
                         {user.phone}
                        </Table.Cell>
                        <Table.Cell>
                          <span className='gap-3 flex justify-center'>
                          <FaCubes onClick={() => {setOpenModal(true), setUserId(user.user_id)}} size={22} className='' />
                          <FaDeploydog onClick={() => {setDeleteuser(true), setUserId(user.user_id)}} size={22} className='' />
                          </span>
                        </Table.Cell>
                     </Table.Row>
                   ))
                 }
             </Table.Body>
          </Table>
          <Modal
                              show={openModal}
                              onClose={()=> setOpenModal(false)}
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
                            <h1 className="text-2xl font-bold text-gray-900">Update User</h1>
                            <p className=" text-sm text-gray-400">Update User details</p>
                          </div>
                                          
                          <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                            <div className="space-y-2">

                              <div>
                                <input
                                  type="text"
                                  name="username"
                                  value={userData.username}
                                  onChange={(e) => 
                                    setUserData({...userData, username: e.target.value})}
                                  placeholder='User Name'
                                  className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                              </div>
          
                              <div>
                                <input
                                  type="text"
                                  name="email"
                                  value={userData.email}
                                  onChange={(e) => 
                                    setUserData({...userData, email: e.target.value})}
                                  placeholder='Email'
                                  className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                              </div>

                              <div>
                                <input
                                  type="text"
                                  name="phone"
                                  value={userData.phone}
                                  onChange={(e) => 
                                    setUserData({...userData, phone: e.target.value})}
                                  placeholder='Email'
                                  className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                />
                              </div>

                              {
                                currentUser && ( currentUser.isable && (
                                            <div>
                                                <input
                                                type="text"
                                                name="admin"
                                                value={userData.admin}
                                                onChange={(e) => 
                                                    setUserData({...userData, admin: e.target.value})}
                                                placeholder='status'
                                                className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                                                />
                                            </div>
                                        )
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
            <Modal 
                       show={deleteuser} 
                          onClose={() => setDeleteuser(false)} 
                          popup size ='md' >
                            <Modal.Header />
                              <Modal.Body>
                                <div className='text-center'>
                                  <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                                  dark:text-gray-200 mb-4 mx-auto' />
                                  <h3 className='mb-5 text-lg text-gray-500
                                  dark:text-gray-400'>
                                    Do you want to delete this user
                                    </h3>
                                    <div className='flex justify-center gap-4'>
                                      <Button color='failure' 
                                      onClick={handleDelete}>
                                        Yes, I'm sure
                                        </Button>
                                        <Button color='success' onClick={() => setDeleteuser(false)}>
                                        No, Cancel
                                        </Button>
                                    </div>
                                </div>
                              </Modal.Body>
              </Modal>
        </div>
  )
}

export default User
