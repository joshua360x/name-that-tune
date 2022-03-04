import React, { useEffect, useState } from 'react';
import { fetchAllPlaylists } from './services/fetch-utils';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

export default function SelectionPage({ setToken, token, userProfile }) {
  const [playlists, setPlaylists] = useState([]);
  const history = useHistory();
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
    <div>
      {playlists.map((playlistItem, i) => (
        <Link to={`/game/${playlistItem.playlist_id}`} key={playlistItem + i}>
          <p>{playlistItem.playlist_name}</p>
        </Link>
      ))}
      <button onClick={() => history.push('./profile')}>Visit Profile</button>
    </div>
  );
}
