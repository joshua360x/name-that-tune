import React from 'react';
import Josh from './Team/Josh';
import Clay from './Team/Clay';
import Jack from './Team/Jack';
import Carolynn from './Team/Carolynn';
import { useEffect, useState } from 'react';



export default function About({ token }) {

  const netlifyUrl = '/.netlify/functions/spotify-song';
  const [joshFavSong, setJoshFavSong] = useState('');


  useEffect(() => {
    async function fetchSongFromSpotify() {
      // console.log(token);
      const response = await fetch(`${netlifyUrl}?token=${token}&song_id=45x5Y1Ld0CEV7ayP2QG1Ob`);
      const json = await response.json();
      // setSong(json.data.items);
      // console.log(json.data);
      setJoshFavSong(json.data.preview_url);
    }
    fetchSongFromSpotify();
  }, [token, setJoshFavSong]);


  return (
    <div className='about-page'>
      <div className='wiz'>
        <img src='/king.png'></img>
        <h2>Meet the Team </h2>
      </div>
      <div className='devs'>
        <Josh joshFavSong={joshFavSong} />
        <Clay />
        <Jack />
        <Carolynn />
      </div>
    </div>
  );
}
