import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function GamePage({ token }) {

  const netlifyUrl = '/.netlify/functions/spotify-playlist-items';
  const [tracks, setTracks] = useState([]);
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



  return (
    <div>Welcome to GamePage
      <p>{ params.id }</p>
      <button>Start Game</button>
      <p>Total Points</p>
      <div>Countown Bar</div>
      {
        tracks && tracks.map((track, i) => 
          <label className='track' key={track + i} >
            <input type='radio' name={track.track.name} value={track.track.id} />
            {track.track.name}
          </label>
        )

      }
    </div>
  );
}
