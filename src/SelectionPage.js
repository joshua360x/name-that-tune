import React, { useEffect, useState } from 'react';
import GamePage from './GamePage';
import { fetchAllPlaylists } from './services/fetch-utils';
import { Link } from 'react-router-dom';

export default function SelectionPage({ setToken }) {
  const [playlists, setPlaylists] = useState([]);
  // const [tracks, setTracks] = useState([]);

  const netlifyUrlToken = '/.netlify/functions/spotify-oauth';

  useEffect(() => {
    async function fetchAndSetPlayLists() {
      const playlistsArray = await fetchAllPlaylists();
      setPlaylists(playlistsArray);
    }
    const getToken = async () => {
      const response = await fetch(netlifyUrlToken);
      const json = await response.json();
      setToken(json);
    };
    getToken();
    fetchAndSetPlayLists();
  }, []);

  return (
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
    </div>
  );
}
