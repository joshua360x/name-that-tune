import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function GamePage({ token }) {

  const netlifyUrl = '/.netlify/functions/spotify-playlist-items';
  const [tracks, setTracks] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const params = useParams();



  useEffect(() => {
    async function fetchPlayListsFromSpotify() {


      const response = await fetch(`${netlifyUrl}?token=${token}&playlist_id=${params.id}`);
      const json = await response.json();
      console.log(json);
      setTracks(json.data.items);
      console.log(token);
    }
    fetchPlayListsFromSpotify();
    console.log(tracks);
  }, [token, params.id]);


  async function handleSubmit(e) {
    e.preventDefault();
    console.log(userGuess);
  }

  return (
    <div>Welcome to GamePage
      <p>{ params.id }</p>
      <button>Start Game</button>
      <p>Total Points</p>
      <div>Countown Bar</div>
      <form onSubmit={handleSubmit}>

        <label name='userGuess' className='track' >
          {
            tracks && tracks.map((track, i) => 
              <div key={track + i}>

                <p>{track.track.name}</p>
                <input onChange={(e) => setUserGuess(e.target.value)} type='radio' name='userGuess' value={track.track.id} />
              </div>
            )
          }
        </label>
        <button>Submit Guess</button>
      </form>
    </div>
  );
}
