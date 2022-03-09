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
      console.log(json);
      setFeaturedPlaylistTracks(json);
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
    <div>
      <form>
        <select onChange={(e) => setSelectedPlaylist(e.target.value)}>
          {options.map((option, i) => {
            return (
              <option key={option.name + i} value={option.id}>
                {option.name}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
}
