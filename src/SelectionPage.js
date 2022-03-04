import React, { useEffect, useState } from 'react';
import { fetchAllPlaylists } from './services/fetch-utils';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

<<<<<<< HEAD
export default function SelectionPage({ setToken, token, userProfile }) {
=======
export default function SelectionPage() {
>>>>>>> b2e0af552e98bd8c3adfd8ba7597f47b9e89506a
  const [playlists, setPlaylists] = useState([]);
  const history = useHistory();
  // const [tracks, setTracks] = useState([]);

  // const netlifyUrlToken = '/.netlify/functions/spotify-oauth';

  useEffect(() => {
    async function fetchAndSetPlayLists() {
      const playlistsArray = await fetchAllPlaylists();
      setPlaylists(playlistsArray);
    }
    // const getToken = async () => {
    //   const response = await fetch(netlifyUrlToken);
    //   const json = await response.json();
    //   setToken(json);
    // };
    // getToken();
    fetchAndSetPlayLists();
  }, []);

  return (
<<<<<<< HEAD
    <div>
      {playlists.map((playlistItem, i) => (
        <Link to={`/game/${playlistItem.playlist_id}`} key={playlistItem + i}>
          <p>{playlistItem.playlist_name}</p>
        </Link>
      ))}
      <button onClick={() => history.push('./profile')}>Visit Profile</button>
=======
    <div className='selection-page'>
      <h2>Trivia Round: Choose Your Game</h2>
      <div className='blurb'>
        <img src='/king.png'></img>
        <p>Choose your playlist to initiate a game. You will have 30 seconds to guess the song name. As the clock ticks, your points go down. Good luck music nerds!</p>
      </div>
      <div className='game-choices'>
        { playlists.map((playlistItem, i) => <Link to={`/game/${playlistItem.playlist_id}/${playlistItem.playlist_name}`} key={playlistItem + i}>
          <div className='choice'>{ playlistItem.playlist_name }</div>
        </Link>
        )}
      </div>
>>>>>>> b2e0af552e98bd8c3adfd8ba7597f47b9e89506a
    </div>
  );
}
