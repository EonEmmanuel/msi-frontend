import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Player_Month() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddPlayerMonth, setAddPlayerMonth] = useState(false);
  const [updatePlayerMonth, setUpdatePlayerMonth] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [updatePlayerMonthId, setUpdatePlayerMonthId] = useState('');
  const [deletePlayerMonth, setDeletePlayerMonth] = useState(false);
  const [deletePlayerMonthId, setDeletePlayerMonthId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [playerdata, setPlayerData] = useState([]);
  const [formData, setFormData] = useState({
    player: '',
    goals: '',
    assists: '',
    matches: '',
    win_rate: '',
    rating: ''
  });

  useEffect(() => {
    // Function to fetch data from your SQL API
    const fetchPlayerMonthData = async () => {
      try {
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getawplayer/${updatePlayerMonthId}`);
        
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
    
    fetchPlayerMonthData();
  }, [updatePlayerMonthId]);

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
    setMessage({ text: 'Loading.......', type: 'success' });
  
    try {
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createawplayer', {
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
        setMessage({ text: 'Player month created successfully!', type: 'success' });
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
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updateawplayer/${updatePlayerMonthId}`, {
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

      setMessage({ text: 'Player month update successful!!', type: 'success' });
      
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallawplayer');
        
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
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deleteawplayer/${deletePlayerMonthId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
      } else {
        setMessage({ text: 'Player month deleted successfully!!', type: 'success' });
        setDeletePlayerMonth(false);
        setData((prev) => prev.filter((player) => player.plaward_id !== deletePlayerMonthId));
        setMessage({ text: '!', type: '' });
      }
    } catch (error) {
      setMessage(error);
    }
  };

  useEffect(() => {
    const fetchPlayerData = async () => {
      setMessage({ text: '', type: '' });

      try {
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallplayer');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        
        setPlayerData(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    fetchPlayerData();
  }, []);

  return (
    <div className='m-3 mx-auto'>
      <h1 className='text-2xl text-center'>Player of the Month</h1>
      <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => { setAddPlayerMonth(true) }}>
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
              Team
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
              Win Rating
            </Table.HeadCell>
            <Table.HeadCell>
              Rating
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {
              data.map((playerMonth) => (
                <Table.Row key={playerMonth.plaward_id}>
                <Table.Cell>
                    <img src={playerMonth.pic} width={70} />
                  </Table.Cell>
                  <Table.Cell>
                    {playerMonth.player_name}
                  </Table.Cell>
                  <Table.Cell>
                    {playerMonth.name}
                  </Table.Cell>
                  <Table.Cell>
                    {playerMonth.matches}
                  </Table.Cell>
                  <Table.Cell>
                    {playerMonth.goals}
                  </Table.Cell>
                  <Table.Cell>
                    {playerMonth.assists}
                  </Table.Cell>
                  <Table.Cell>
                    {playerMonth.win_rate}
                  </Table.Cell>
                  <Table.Cell>
                    {playerMonth.rating}
                  </Table.Cell>
                  <Table.Cell>
                    <span className='flex gap-3'>
                      <FaPenClip onClick={() => {
                        setUpdatePlayerMonth(true);
                        setUpdatePlayerMonthId(playerMonth.plaward_id);
                      }} />
                      <FaRecycle onClick={() => {
                        setDeletePlayerMonth(true);
                        setDeletePlayerMonthId(playerMonth.plaward_id);
                      }} />
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>
        </Table>
      </div>
      <Modal
        show={AddPlayerMonth}
        onClose={() => setAddPlayerMonth(false)}
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
                <h1 className="text-2xl font-bold text-gray-900">Add Player Month</h1>
                <p className=" text-sm text-gray-400">Add Player Month to Register</p>
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
                      name="goals"
                      value={formData.goals}
                      onChange={handleChange}
                      required
                      placeholder='Goal'
                      className="mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="assists"
                      value={formData.assists}
                      onChange={handleChange}
                      required
                      placeholder='Assist'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

      <Modal
        show={updatePlayerMonth}
        onClose={() => setUpdatePlayerMonth(false)}
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
                <h1 className="text-2xl font-bold text-gray-900">Update Player Month</h1>
                <p className=" text-sm text-gray-400">Update Player Month details</p>
              </div>

              <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                <div className="space-y-2">

                  <div>
                    <select
                      className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      name="player"
                      value={updateData.player}
                      onChange={(e) => setUpdateData({ ...updateData, player: e.target.value })}
                    >
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
                      name="goals"
                      value={updateData.goals}
                      onChange={(e) => setUpdateData({ ...updateData, goals: e.target.value })}
                      placeholder='Goals'
                      className="mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <input
                      type="text"
                      name="assists"
                      value={updateData.assists}
                      onChange={(e) => setUpdateData({ ...updateData, assists: e.target.value })}
                      placeholder='Assists'
                      className="mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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

      <Modal show={deletePlayerMonth} 
        onClose={() => setDeletePlayerMonth(false)} 
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
              <Button onClick={() => setDeletePlayerMonth(false)} color="failure">
                No
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Player_Month;
