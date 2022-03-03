import React, { useEffect, useState } from 'react';

export default function Song({ token, setJoshFavSong }) {

  const netlifyUrl = '/.netlify/functions/spotify-song';

  const [song, setSong] = useState('');


  useEffect(() => {
    async function fetchPlayListsFromSpotify() {
      console.log(token);
      const response = await fetch(`${netlifyUrl}?token=${token}&song_id=45x5Y1Ld0CEV7ayP2QG1Ob`);
      const json = await response.json();
      // setSong(json.data.items);
      console.log(json.data);
      setJoshFavSong(json.data.preview_url);
    }
    fetchPlayListsFromSpotify();
  }, [token, song]);

  return (
    <div>Song</div>
  );
}
