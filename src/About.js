import React from 'react';
import Josh from './Team/Josh';
import Clay from './Team/Clay';
import Jack from './Team/Jack';
import Carolynn from './Team/Carolynn';
import { useEffect, useState } from 'react';

export default function About({ token }) {
  const netlifyUrl = '/.netlify/functions/spotify-song';
  const [joshFavSong, setJoshFavSong] = useState('');
  const [clayFavSong, setClayFavSong] = useState('');
  const [jackFavSong, setJackFavSong] = useState('');
  const [carolynnFavSong, setCarolynnFavSong] = useState('');

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

  useEffect(() => {
    async function fetchSong1FromSpotify() {
      // console.log(token);
      const response = await fetch(`${netlifyUrl}?token=${token}&song_id=6MjNymJg3ENLx7msmLPD1P`);
      const json = await response.json();
      // setSong(json.data.items);
      // console.log(json.data);
      setClayFavSong(json.data.preview_url);
    }
    fetchSong1FromSpotify();
  }, [token, setClayFavSong]);

  useEffect(() => {
    async function fetchSong2FromSpotify() {
      // console.log(token);
      const response = await fetch(`${netlifyUrl}?token=${token}&song_id=05f8Hg3RSfiPSCBQOtxl3i`);
      const json = await response.json();
      // setSong(json.data.items);
      // console.log(json.data);
      setJackFavSong(json.data.preview_url);
    }
    fetchSong2FromSpotify();
  }, [token, setJackFavSong]);

  useEffect(() => {
    async function fetchSongFromSpotify() {
      // console.log(token);
      const response = await fetch(`${netlifyUrl}?token=${token}&song_id=6AFm3Wv9uNRZPQ1WtKSlcT`);
      const json = await response.json();
      // setSong(json.data.items);
      // console.log(json.data);
      setCarolynnFavSong(json.data.preview_url);
    }
    fetchSongFromSpotify();
  }, [token, setCarolynnFavSong]);

  return (
    <div className="about-page">
      <div className="wiz">
        <img src="/king.png"></img>
        <h2>Meet the Team </h2>
      </div>
      <div className="devs">
        {joshFavSong && <Josh joshFavSong={joshFavSong} />}
        {clayFavSong && <Clay clayFavSong={clayFavSong} />}
        {jackFavSong && <Jack jackFavSong={jackFavSong} />}
        {carolynnFavSong && <Carolynn carolynnFavSong={carolynnFavSong} />}
      </div>
    </div>
  );
}
