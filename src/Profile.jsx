import React, { useEffect, useState } from 'react';

export default function Profile({ token, userProfile }) {
  const [newPlaylist, setNewPlaylist] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [featuredPlaylistTracks, setFeaturedPlaylistTracks] = useState([]);
  const [options, setOptions] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [checkedState, setCheckedState] = useState([]);

  const netlifyUrl = '/.netlify/functions/spotify-featured-playlist';

  useEffect(() => {
    async function fetchFeaturedPlayListsFromSpotify() {
      const response = await fetch(`${netlifyUrl}?token=${token}`);
      const json = await response.json();
      console.log(json.data.playlists.items);
      setOptions(json.data.playlists.items);
      setSelectedPlaylist(json.data.playlists.items[0].id);
    }
    fetchFeaturedPlayListsFromSpotify();
  }, [token]);

  useEffect(() => {
    console.log(options);
    setCheckedState(new Array(options.length).fill(false));
  }, [options]);

  useEffect(() => {
    const displayTracksList = async () => {
      const response = await fetch(
        `/.netlify/functions/spotify-playlist-items?token=${token}&playlist_id=${selectedPlaylist}`
      );
      const json = await response.json();
      let tracks = [];
      json &&
        (await json.data.items.map((item) => {
          item.track.preview_url && tracks.push(item);
        }));
      console.log(tracks);
      setFeaturedPlaylistTracks(tracks);
    };
    displayTracksList();
  }, [selectedPlaylist]);

  const handleCheckboxChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };
  return (
    <div className="playlist-creation-panel">
      <select onChange={(e) => setSelectedPlaylist(e.target.value)}>
        {options.map((option, i) => {
          return (
            <option key={option.name + i} value={option.id}>
              {option.name}
            </option>
          );
        })}
      </select>
      <div className="tracks-selection-container">
        <div className="playlist-track-options tracks">
          {featuredPlaylistTracks &&
            featuredPlaylistTracks.map((track, i) => {
              return <p key={track.track.name + i}>{track.track.name}</p>;
            })}
        </div>
        <div className="user-selected-tracks tracks"></div>
      </div>
    </div>
  );
}
