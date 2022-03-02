import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function GamePage({ playlists }) {

  
  const [tracks, setTracks] = useState([]);
  const params = useParams();

  // useEffect(() => {
  //   async function fetchPlayListsFromSpotify() {
  //     playlists.map(async (playListItem, i) => {
  //       const response = await fetch(`${netlifyUrl}?playlist_id=${playListItem}`);
  //       const json = await response.json();
  //       setTracks(json.data.items);
  //     });
  //   }
  //   fetchPlayListsFromSpotify();
  // }, []);

  return (
    <div>Welcome to GamePage
      <p>{ params.id }</p>
    </div>
  );
}
