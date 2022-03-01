import React, { useEffect, useState } from 'react';
import { fetchAllPlaylists } from './services/fetch-utils';

export default function SpotifyPlaylist() {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState([]);

  const netlifyUrl = '/.netlify/functions/spotify';
  const netlifyUrlToken = '/.netlify/functions/spotify-oauth';

  const getToken = async () => {
    const response = await fetch(netlifyUrlToken);
    const json = await response.json();
    console.log(json);
  };
  getToken();

  useEffect(() => {
    async function fetchPlayLists() {
      const playlistsArray = await fetchAllPlaylists();
      setPlaylists(playlistsArray);
    }
    fetchPlayLists();
  }, []);

  // useEffect(() => {
  //   async function fetchPlayLists() {
  //     playlists.map(async (playListItem, i) => {
  //       const response = await fetch(`${netlifyUrl}?playlist_id=${playListItem}`);
  //       const json = await response.json();
  //       console.log(json);
  //       setTracks(json.data.items);
  //     });
  //   }
  //   fetchPlayLists();
  // }, []);

  return (
    <div>
      {/* {tracks.map((playlistItem, i) => {
        return <audio key={i} src={playlistItem.track.preview_url} controls></audio>;
      })} */}
    </div>
  );
}
