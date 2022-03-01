import React, { useEffect, useState } from 'react';

export default function SpotifyPlaylist() {
  const [playlists, setPlaylists] = useState([]);

  const netlifyUrl = '/.netlify/functions/spotify';

  useEffect(() => {
    async function fetchPlayLists() {
      const response = await fetch(netlifyUrl);
      const json = await response.json();
      console.log(json);
      setPlaylists(json.data.items);
    }
    fetchPlayLists();
  }, []);

  return (
    <div>
      {playlists.map((playlistItem, i) => {
        return <audio key={i} src={playlistItem.track.preview_url} controls></audio>;
      })}
    </div>
  );
}
