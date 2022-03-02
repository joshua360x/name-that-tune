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
  }, []);



  return (
    <div>Welcome to GamePage
      <p>{ params.id }</p>
    </div>
  );
}
