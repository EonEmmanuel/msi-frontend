import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

function Goal_Month() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddGoalMonth, setAddGoalMonth] = useState(false);
  const [updateGoalMonth, setUpdateGoalMonth] = useState(false);
  const [updateData, setUpdateData] = useState([]);
  const [updateGoalMonthId, setUpdateGoalMonthId] = useState('');
  const [deleteGoalMonth, setDeleteGoalMonth] = useState(false);
  const [deleteGoalMonthId, setDeleteGoalMonthId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [playerdata, setPlayerData] = useState([]);
  const [Teamdata, setTeamData] = useState([]);
  const [formData, setFormData] = useState({
    player: '',
    team_against: ''
  });

  useEffect(() => {
    const fetchGoalMonthData = async () => {
      try {
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getawgoal/${updateGoalMonthId}`);
        
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
    
    fetchGoalMonthData();
  }, [updateGoalMonthId]);

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
      const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createawgoal', {
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
        setMessage({ text: 'Goal month created successfully!', type: 'success' });
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
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updateawgoal/${updateGoalMonthId}`, {
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

      setMessage({ text: 'Goal month update successful!!', type: 'success' });
      
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallawgoal');
        
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
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deleteawgoal/${deleteGoalMonthId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (!res.ok) {
        setMessage(data.message);
      } else {
        setMessage({ text: 'Goal month deleted successfully!!', type: 'success' });
        setDeleteGoalMonth(false);
        setData((prev) => prev.filter((goal) => goal.gaward_id !== deleteGoalMonthId));
        setMessage({ text: '!', type: '' });
      }
    } catch (error) {
      setMessage(error);
    }
  };

  useEffect(() => {
    const fetchGoalData = async () => {
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
    
    fetchGoalData();
  }, []);

  return (
    <div className='m-3 mx-auto'>
      <h1 className='text-2xl text-center'>Goal of the Month</h1>
      <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => { setAddGoalMonth(true) }}>
        Add Goal
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
              Age
            </Table.HeadCell>
            <Table.HeadCell>
              Team
            </Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {
              data.map((goalMonth) => (
                <Table.Row key={goalMonth.goalaward_id}>
                  <Table.Cell>
                    <img src={goalMonth.pic} width={70} />
                  </Table.Cell>
                  <Table.Cell>
                    {goalMonth.player_name}
                  </Table.Cell>
                  <Table.Cell>
                    <img src={goalMonth.against_logo} width={70} />
                  </Table.Cell>
                  <Table.Cell>
                    {goalMonth.name}
                  </Table.Cell>
                  <Table.Cell>
                    <span className='flex gap-3'>
                      <FaPenClip onClick={() => {
                        setUpdateGoalMonth(true);
                        setUpdateGoalMonthId(goalMonth.gaward_id);
                      }} />
                      <FaRecycle onClick={() => {
                        setDeleteGoalMonth(true);
                        setDeleteGoalMonthId(goalMonth.gaward_id);
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
        show={AddGoalMonth}
        onClose={() => setAddGoalMonth(false)}
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
                <h1 className="text-2xl font-bold text-gray-900">Add Goal Month</h1>
                <p className=" text-sm text-gray-400">Add Goal Month to Register</p>
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
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="team_against"
                        value={formData.team_against}
                        onChange={handleChange}
                      >
                        <option value="">Select Away Team</option>
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
        show={updateGoalMonth}
        onClose={() => setUpdateGoalMonth(false)}
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
                <h1 className="text-2xl font-bold text-gray-900">Update Goal Month</h1>
                <p className=" text-sm text-gray-400">Update Goal Month details</p>
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
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="team_against"
                        value={updateData.team_against}
                        onChange={(e) => 
                          setUpdateData({...updateData, team_against: e.target.value})}
                      >
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
                    {isLoading ? 'Updating....' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      <Modal
        show={deleteGoalMonth}
        onClose={() => setDeleteGoalMonth(false)}
        size="sm"
      >
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="text-red-500 mx-auto" size={40} />
            <h3 className="text-lg font-medium text-gray-900 mt-4">Are you sure you want to delete this award?</h3>
            <div className="flex justify-center gap-4 mt-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, delete
              </Button>
              <Button color="gray" onClick={() => setDeleteGoalMonth(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Goal_Month;
