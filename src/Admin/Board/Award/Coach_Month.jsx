import { Button, FileInput, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Coach_Month() {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [img, setImg] = useState('')
  const [AddCoachMonth, setAddCoachMonth] = useState(false);
  const [updateCoachMonth, setUpdateCoachMonth] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [updateCoachMonthId, setUpdateCoachMonthId] = useState('');
  const [deleteCoachMonth, setDeleteCoachMonth] = useState(false);
  const [deleteCoachMonthId, setDeleteCoachMonthId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [coachdata, setCoachData] = useState([]);
  const [formData, setFormData] = useState({
    coach: '', 
    matches: '', 
    goal: '', 
    wins: '', 
    losses: '', 
    draws: '', 
    win_rate: '', 
    rating: ''
  });

  useEffect(() => {
    const fetchCoachMonthData = async () => {
      try {
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getawcoach/${updateCoachMonthId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        setUpdateData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchCoachMonthData();
  }, [updateCoachMonthId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    setMessage({ text: '', type: '' });
    setIsLoading(true);
  
    try {
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createawcoach', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
  
      if (response.status === 204) {
        setMessage({ text: 'No content returned from server', type: 'error' });
      } else {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        setMessage({ text: 'Coach month created successfully!', type: 'success' });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleUpdate = async (e) => {
    e.preventDefault();

    setMessage({ text: '', type: '' });

    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    
    try {
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updateawcoach/${updateCoachMonthId}`, {
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

      setMessage({ text: 'Coach month update successful!!', type: 'success' });
      
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
    const fetchData = async () => {
      try {
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallawcoach');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deleteawcoach/${deleteCoachMonthId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
      } else {
        setMessage({ text: 'Coach month deleted successfully!!', type: 'success' });
        setDeleteCoachMonth(false);
        setData((prev) => prev.filter((coach) => coach.cward_id !== deleteCoachMonthId));
        setMessage({ text: '!', type: '' });
      }
    } catch (error) {
      setMessage(error);
    }
  };

 useEffect(() => {
   
       // Function to fetch data from your SQL API
       const fetchTeamData = async () => {
         setMessage({ text: '', type: '' }) 
   
         try {
           // Replace with your actual API endpoint
           const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallcoach');
           
           // Check if the response is successful
           if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
           }
           
           // Parse the JSON response
           const result = await response.json();
           
           // Update state with the fetched data
           setCoachData(result);
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

  return (
    <div className='m-3 mx-auto'>
      <h1 className='text-2xl text-center'>Coach of the Month</h1>
      <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => { setAddCoachMonth(true) }}>
        Add Coach
      </div>
      <div className='w-full mx-auto overflow-scroll scrollbar'>
        <Table>
          <Table.Head>
            <Table.HeadCell>
              Profile
            </Table.HeadCell>
            <Table.HeadCell>
              Name
            </Table.HeadCell>
            <Table.HeadCell>
              Team
            </Table.HeadCell>
            <Table.HeadCell>
              Matches
            </Table.HeadCell>
            <Table.HeadCell>
              Wins
            </Table.HeadCell>
            <Table.HeadCell>
              Losses
            </Table.HeadCell>
            <Table.HeadCell>
              Draws
            </Table.HeadCell>
            <Table.HeadCell>
              Goals
            </Table.HeadCell>
            <Table.HeadCell>
              Win Rate
            </Table.HeadCell>
            <Table.HeadCell>
              Rating
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {
              data.map((coachMonth) => (
                <Table.Row key={coachMonth.coachaward_id}>
                  <Table.Cell>
                    <img src={coachMonth.c_pic} width={70} />
                  </Table.Cell>
                  <Table.Cell>
                    {coachMonth.c_name}
                  </Table.Cell>
                  <Table.Cell>
                    {coachMonth.name}
                  </Table.Cell>
                  <Table.Cell>
                    {coachMonth.matches}
                  </Table.Cell>
                  <Table.Cell>
                    {coachMonth.wins}
                  </Table.Cell>
                  <Table.Cell>
                    {coachMonth.losses}
                  </Table.Cell>
                  <Table.Cell>
                    {coachMonth.draws}
                  </Table.Cell>
                  <Table.Cell>
                    {coachMonth.goal}
                  </Table.Cell>
                  <Table.Cell>
                    {coachMonth.win_rate}
                  </Table.Cell>
                  <Table.Cell>
                    {coachMonth.rating}
                  </Table.Cell>
                  <Table.Cell>
                    <span className='flex gap-3'>
                      <FaPenClip onClick={() => {
                        setUpdateCoachMonth(true);
                        setUpdateCoachMonthId(coachMonth.cward_id);
                      }} />
                      <FaRecycle onClick={() => {
                        setDeleteCoachMonth(true);
                        setDeleteCoachMonthId(coachMonth.cward_id);
                      }} />
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>

      {/* Add Coach Month Modal */}
      <Modal
        show={AddCoachMonth}
        onClose={() => setAddCoachMonth(false)}
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
                <h1 className="text-2xl font-bold text-gray-900">Add Coach Month</h1>
                <p className=" text-sm text-gray-400">Add Coach Month to Registry</p>
              </div>

              <form className="mt-3 space-y-3" onSubmit={handleRegister}>
                <div className="space-y-2">

                  <div>
                    <select
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      name="coach"
                      value={formData.coach}
                      onChange={handleChange}
                    >
                      <option value="">Select Coach</option>
                      { coachdata.map((coach) => (
                        <option key={coach.coach_id} value={coach.coach_id}>
                          {coach.c_name}
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
                      className="mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="draws"
                      value={formData.draws}
                      onChange={handleChange}
                      required
                      placeholder='Draws'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      required
                      placeholder='Goal'
                      className="mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="win_rate"
                      value={formData.win_rate}
                      onChange={handleChange}
                      required
                      placeholder='Win Rate'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="rating"
                      value={formData.rating}
                      onChange={handleChange}
                      required
                      placeholder='Rating'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

      {/* Update Coach Month Modal */}
      <Modal
        show={updateCoachMonth}
        onClose={() => setUpdateCoachMonth(false)}
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
                <h1 className="text-2xl font-bold text-gray-900">Update Coach Month</h1>
                <p className=" text-sm text-gray-400">Update Coach Month details</p>
              </div>

              <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                {/* Form fields for updating Coach Month */}
                <div className="space-y-2">
                    
                  <div>
                    <select
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      name="coach"
                      value={updateData.coach}
                      onChange={(e) => setUpdateData({ ...updateData, team: e.target.value })}
                    >
                      {coachdata.map((coach) => (
                        <option value={coach.coach_id}>
                          {coach.c_name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <input
                      type="text"
                      name="matches"
                      value={updateData.matches}
                      onChange={(e) => setUpdateData({ ...updateData, matches: e.target.value })}
                      placeholder='Matches'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="wins"
                      value={updateData.wins}
                      onChange={(e) => setUpdateData({ ...updateData, wins: e.target.value })}
                      placeholder='Wins'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="losses"
                      value={updateData.losses}
                      onChange={(e) => setUpdateData({ ...updateData, losses: e.target.value })}
                      placeholder='Matches'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="draws"
                      value={updateData.draws}
                      onChange={(e) => setUpdateData({ ...updateData, draws: e.target.value })}
                      placeholder='Matches'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="goal"
                      value={updateData.goal}
                      onChange={(e) => setUpdateData({ ...updateData, goal: e.target.value })}
                      placeholder='Goals'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="win_rate"
                      value={updateData.win_rate}
                      onChange={(e) => setUpdateData({ ...updateData, win_rate: e.target.value })}
                      placeholder='Win Rate'
                      className="mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="rating"
                      value={updateData.rating}
                      onChange={(e) => setUpdateData({ ...updateData, rating: e.target.value })}
                      placeholder='Rating'
                      className="mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

      {/* Delete Coach Month Confirmation Modal */}
      <Modal show={deleteCoachMonth} 
        onClose={() => setDeleteCoachMonth(false)} 
        popup size ='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-300 mx-auto' />
            <h3 className='text-gray-600 text-2xl py-3'>Are you sure you want to delete?</h3>
            <div className='flex justify-center gap-4'>
              <Button onClick={handleDelete} color="success">
                Yes
              </Button>
              <Button onClick={() => setDeleteCoachMonth(false)} color="failure">
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Coach_Month;
