import { Button, Modal, Table } from 'flowbite-react';
import React, { useEffect, useState } from 'react'
import { FaPenClip, FaRecycle } from 'react-icons/fa6';
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import redcard from '../../../icon/red-card.png'
import yellowcard from '../../../icon/yellow-card.png'
import goal from '../../../icon/ball.png'

function Result() {
  
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [AddResult, setAddResult] = useState(false)
  const [updateResult, setUpdateResult] = useState(false)
  const [updateData, setUpdateData] = useState([])
  const [updateResultId, setUpdateResultId] = useState('')
  const [deleteResult, setDeleteResult] = useState(false)
  const [deleteResultId, setDeleteResultId] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [Teamdata, setTeamData] = useState([])
  const [Playerdata, setPlayerData] = useState([])
  const [matchdaydata, setMatchdayData] = useState([])
  const [events, setEvents] = useState([]);
  const [getevents, setGetEvents] = useState([]);
  const [formData, setFormData] = useState({
    matchday: '',
    home_team: '',
    away_team: '',
    home_team_score: '',
    away_team_score: ''
  });

  const [detail, setDetail] = useState({
    type: "",
    team: "",
    player: "",
    minute: ""
  });

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchFixtureData = async () => {
      try {
        // Replace with your actual API endpoint
        const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/getresult/${updateResultId}`);
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setUpdateData(result);
        setGetEvents(result.events)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    // Call the fetch function
    fetchFixtureData();
  }, [updateResultId]);

  console.log(events)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleTimelineChange = (e) => {
    setDetail({ 
      ...detail, 
      [e.target.name]: e.target.value 
    });
  };

  // add event to preview list
  const addEvent = async (e) => {
    e.preventDefault();

    if (!detail.team || !detail.player || !detail.minute) return;

    setEvents([...events, detail]); // push to array
    setDetail({ type: "", team: "", player: "", minute: "" }); // reset event form
  };

  const removeEvent = (index) => {
  setEvents(events.filter((_, i) => i !== index));
  };

  const removeUpdateEvent = async (event) => {
    try {
      // 1️⃣ remove from DB
      const result = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/result/${updateResultId}/remove-event/${event.type}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          team: event.team,
          player: event.player,
          minute: event.minute,
        }),
      });

      // 2️⃣ remove from UI preview
      const data = await result.json();

       setGetEvents(getevents.filter(e =>
        !(e.type === event.type &&
          e.team === event.team &&
          e.player === event.player &&
          e.minute === event.minute)
      ));

    } catch (err) {
      console.error("Error removing event:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    setIsLoading(true);
    setMessage({ text: 'Loading.......', type: 'success' });
    
    try {
      const payload = {
      ...formData,
      goals: events.filter(ev => ev.type === "goal"),
      yellow_cards: events.filter(ev => ev.type === "yellow_card"),
      red_cards: events.filter(ev => ev.type === "red_card")
    };

    console.log("Payload sent:", payload); // 👀 debug

    const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/createresult', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage({ text: 'Result added successful!!', type: 'success' });
      
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

       const update = {
      ...updateData,
      goals: events.filter(ev => ev.type === "goal"),
      yellow_cards: events.filter(ev => ev.type === "yellow_card"),
      red_cards: events.filter(ev => ev.type === "red_card")
    };

      // Replace with your actual API endpoint
      const response = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/updateresult/${updateResultId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(update)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      setMessage({ text: 'Fixture Update successful!!', type: 'success' });
      
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
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallmatchresult');
        
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

  useEffect(() => {

    // Function to fetch data from your SQL API
    const fetchMatchdayData = async () => {
      setMessage({ text: '', type: '' }) 

      try {
        // Replace with your actual API endpoint
        const response = await fetch('https://guinness-super-league-server.vercel.app/api/gsl/getallresultmatchday');
        
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Parse the JSON response
        const result = await response.json();
        
        // Update state with the fetched data
        setMatchdayData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
        setLoading(false);
      }
    };
    
    // Call the fetch function
    fetchMatchdayData();
  }, []);

  const handleDelete = async () =>{
    
    try {
      const res = await fetch(`https://guinness-super-league-server.vercel.app/api/gsl/deleteresult/${deleteResultId}`, {
        method: 'DELETE'
      });
      const data = await res.json();
     if (!res.ok){
      setMessage(data.message)
     } else {
      setMessage({ text: 'Fixture Deleted successful!!', type: 'success' })
      setDeleteResult(false)
      setData((prev) =>
       prev.filter((res) => res.result_id !== deleteResultId ))
     }
   }catch(error){
    setMessage(error)
   }
}

  const teamplayer = Playerdata.filter(
   (p) => p.team === parseInt(detail.team) // make sure both sides are numbers
  );

   return (
    <div className='m-3'>
         <div className='cursor-pointer border-2 mx-auto border-blue-300 rounded-lg bg-blue-400 text-white m-2 p-1 w-32 text-center' onClick={() => {setAddResult(true)}}>
           Add Result
         </div>
    <div className='w-full overflow-scroll scrollbar bg-white'>
      <Table>
         <Table.Head>
           <Table.HeadCell>
              Matchday
           </Table.HeadCell>
           <Table.HeadCell>
              Home Team
           </Table.HeadCell>
           <Table.HeadCell>
              Home Team Score
           </Table.HeadCell>
           <Table.HeadCell>
              Away Team
           </Table.HeadCell>
           <Table.HeadCell>
              Away Team Score
           </Table.HeadCell>
         </Table.Head>
         <Table.Body>
             {
               data.map((result) => (
                 <Table.Row>
                    <Table.Cell>
                     {result.match_day}
                    </Table.Cell>
                    <Table.Cell>
                     <img src={result.home_team_logo} width={30} />
                    </Table.Cell>
                    <Table.Cell>
                     {result.home_team_score}
                    </Table.Cell>
                    <Table.Cell>
                    <img src={result.away_team_logo} width={30} />
                    </Table.Cell>
                    <Table.Cell>
                     {result.away_team_score}
                    </Table.Cell>
                    <Table.Cell>
                     <span className='flex gap-3'>
                      <FaPenClip  onClick={() =>{
                        setUpdateResult(true)
                        setUpdateResultId(result.result_id)
                      }} />
                      <FaRecycle 
                         onClick={() =>{
                          setDeleteResult(true)
                          setDeleteResultId(result.result_id)}}
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
                    show={AddResult}
                    onClose={()=> setAddResult(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Add Result</h1>
                  <p className=" text-sm text-gray-400">Add result to Registry</p>
                </div>
                                  
                <form className="mt-3 space-y-3" onSubmit={handleRegister}>
                  <div className="space-y-2">
                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="matchday"
                        value={formData.matchday}
                        onChange={handleChange}
                      >
                        <option value="">Select Matchday</option>
                        {matchdaydata.map((matchday) => (
                          <option key={matchday.matchday_id} value={matchday.matchday_id}>
                            <p>Matchday</p> {matchday.matchday}
                          </option>
                        ))}
                      </select>
                    </div>
                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="home_team"
                        value={formData.home_team}
                        onChange={handleChange}
                      >
                        <option value="">Select Home Team</option>
                        {Teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <input
                        type="text"
                        name="home_team_score"
                        value={formData.home_team_score}
                        onChange={handleChange}
                        required
                        placeholder='Home Team Score'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="away_team"
                        value={formData.away_team}
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

                    <div>
                      <input
                        type="text"
                        name="away_team_score"
                        value={formData.away_team_score}
                        onChange={handleChange}
                        required
                        placeholder='Away Team Score'
                        className={`mt-1 block w-full text-sm px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    {/* --- Add Events --- */}
          <h2 className="font-semibold mt-4">Score Timeline</h2>

          <select
            name="type"
            value={detail.type}
            onChange={handleTimelineChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          >
          <option value="">Select Event</option>
            <option value="goal">Goal</option>
            <option value="yellow_card">Yellow Card</option>
            <option value="red_card">Red Card</option>
          </select>

          <select
            name="team"
            value={detail.team}
            onChange={handleTimelineChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="">Select Team</option>
            {Teamdata.map((t) => (
              <option key={t.team_id} value={t.team_id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            name="player"
            value={detail.player}
            onChange={handleTimelineChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="">Select Player</option>
            {teamplayer.map((p) => (
              <option key={p.player_id} value={p.player_id}>
                {p.player_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="minute"
            value={detail.minute}
            onChange={handleTimelineChange}
            placeholder="Minute"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />

          <button
            onClick={addEvent}
            type="button"
            className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            ➕ Add Event to Timeline
          </button>

          {/* --- Preview Events --- */}
          {events.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Preview Events</h3>
              <ul className="text-sm text-gray-700">
                {events.map((e, idx) => (
                  <div className='flex justify-between gap-2'>
                  <li key={idx} className="border-b py-1">
                    <span className="font-bold">{e.type}</span> – Team {e.team} – Player {e.player} – {e.minute}'
                  </li>
                  <button
                    type="button"
                    onClick={() => removeEvent(idx)}
                    className="text-red-500 hover:underline"
                  >
                    ❌ Remove
                  </button>
                  </div>
                ))}
              </ul>
            </div>
          )}
                    
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
                    show={updateResult}
                    onClose={()=> setUpdateResult(false)}
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
                  <h1 className="text-2xl font-bold text-gray-900">Update Fixture</h1>
                  <p className=" text-sm text-gray-400">Update fixture to details</p>
                </div>
                                  
                <form className="mt-3 space-y-3" onSubmit={handleUpdate}>
                  <div className="space-y-2">
                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="matchday"
                        value={updateData.matchday}
                        onChange={(e) => 
                          setUpdateData({...updateData, matchday: e.target.value})}
                      >
                        {matchdaydata.map((matchday) => (
                          <option key={matchday.matchday_id} value={matchday.matchday_id}>
                            <p>Matchday</p> {matchday.matchday}
                          </option>
                        ))}
                      </select>
                    </div>

                  <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="home_team"
                        value={updateData.home_team}
                        onChange={(e) => 
                          setUpdateData({...updateData, home_team: e.target.value})}
                      >
                        {Teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="home_team_score"
                        value={updateData.home_team_score}
                        onChange={(e) => 
                          setUpdateData({...updateData, home_team_score: e.target.value})}
                        placeholder='Home Team Score'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>
                    
                    <div>
                      <select
                        className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                        name="away_team"
                        value={updateData.away_team}
                        onChange={(e) => 
                          setUpdateData({...updateData, away_team: e.target.value})}
                      >
                        {Teamdata.map((team) => (
                          <option key={team.team_id} value={team.team_id}>
                            {team.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <input
                        type="text"
                        name="away_team_score"
                        value={updateData.away_team_score}
                        onChange={(e) => 
                          setUpdateData({...updateData, away_team_score: e.target.value})}
                        placeholder='Away Team Score'
                        className={`mt-1 block w-full text-sm px-3 py-2 mb-4 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500`}
                      />
                    </div>

                    {getevents.length > 0 && (
            <div className="mt-4">
             <h3 className="font-semibold">Preview Events</h3>
              <ul className="text-sm text-gray-700">
                {getevents.map((e, idx) => (
                  <div className='flex justify-between gap-2'>
                  <li key={idx} className="border-b py-1 flex">
                    <span className="font-bold">
                      {e.type === 'goal' && <img src={goal} alt="Goal" className="w-5 h-5" />}
                      {e.type === 'yellow_card' && <img src={yellowcard} alt="Yellow Card" className="w-5 h-5" />}
                      {e.type === 'red_card' && <img src={redcard} alt="Red Card" className="w-5 h-5" />}</span> – Team : {e.team_name} – Player : {e.player_name} – {e.minute}'
                  </li>
                  <button
                    type="button"
                    onClick={() =>
                     removeUpdateEvent(e)
                     }
                    className="text-red-500 hover:underline"
                  >
                    ❌ Remove
                  </button>
                  </div>
                ))}
              </ul>
                </div>
          )}

                <h2 className="font-semibold mt-4">Score Timeline</h2>

          <select
            name="type"
            value={detail.type}
            onChange={handleTimelineChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          >
          <option value="">Select Event</option>
            <option value="goal">Goal</option>
            <option value="yellow_card">Yellow Card</option>
            <option value="red_card">Red Card</option>
          </select>

          <select
            name="team"
            value={detail.team}
            onChange={handleTimelineChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="">Select Team</option>
            {Teamdata.map((t) => (
              <option key={t.team_id} value={t.team_id}>
                {t.name}
              </option>
            ))}
          </select>

          <select
            name="player"
            value={detail.player}
            onChange={handleTimelineChange}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          >
            <option value="">Select Player</option>
            {teamplayer.map((p) => (
              <option key={p.player_id} value={p.player_id}>
                {p.player_name}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="minute"
            value={detail.minute}
            onChange={handleTimelineChange}
            placeholder="Minute"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm"
          />

          <button
            onClick={addEvent}
            type="button"
            className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300"
          >
            ➕ Add Event to Timeline
          </button>

          {/* --- Preview Events --- */}
          {events.length > 0 && (
            <div className="mt-4">
              <h3 className="font-semibold">Preview Events</h3>
              <ul className="text-sm text-gray-700">
                {events.map((e, idx) => (
                  <div className='flex justify-between gap-2'>
                  <li key={idx} className="border-b py-1">
                    <span className="font-bold">{e.type}</span> – Team {e.team} – Player {e.player} – {e.minute}'
                  </li>
                  <button
                    type="button"
                    onClick={() => removeEvent(idx)}
                    className="text-red-500 hover:underline"
                  >
                    ❌ Remove
                  </button>
                  </div>
                ))}
              </ul>
            </div>
          )}

                  </div>
                  <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {isLoading ? 'Update....' : 'Update'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
     <Modal show={deleteResult} 
                  onClose={() => setDeleteResult(false)} 
                  popup size ='md' >
                    <Modal.Header />
                      <Modal.Body>
                        <div className='text-center'>
                          <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                          dark:text-gray-200 mb-4 mx-auto' />
                          <h3 className='mb-5 text-lg text-gray-500
                          dark:text-gray-400'>
                            Do you want to delete this Result matchday
                            </h3>
                            <div className='flex justify-center gap-4'>
                              <Button color='failure' 
                              onClick={handleDelete}>
                                Yes, I'm sure
                                </Button>
                                <Button color='success' onClick={() => setDeleteResult(false)}>
                                No, Cancel
                                </Button>
                            </div>
                        </div>
                      </Modal.Body>
                  </Modal>
    </div>
  )
}

export default Result;
