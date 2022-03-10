import React, { useEffect, useState } from 'react';
import { createNewPlaylist } from './services/fetch-utils';

export default function Profile({ token, userProfile }) {
  const [newPlaylist, setNewPlaylist] = useState('');
  const [playlistIds, setPlaylistIds] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [featuredPlaylistTracks, setFeaturedPlaylistTracks] = useState([]);
  const [options, setOptions] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [checkedState, setCheckedState] = useState([]);

  const [artistSearch, setArtistSearch] = useState('');
  const [trackSearch, setTrackSearch] = useState('');

  const netlifyUrl = '/.netlify/functions/spotify-featured-playlist';

  useEffect(() => {
    async function fetchFeaturedPlayListsFromSpotify() {
      const response = await fetch(`${netlifyUrl}?token=${token}`);
      const json = await response.json();
      setOptions(json.data.playlists.items);
      setSelectedPlaylist(json.data.playlists.items[0].id);
    }
    fetchFeaturedPlayListsFromSpotify();
  }, [token]);

  useEffect(() => {
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
      setFeaturedPlaylistTracks(tracks);
    };
    selectedPlaylist && displayTracksList();
  }, [selectedPlaylist]);

  const handleCheckboxChange = async (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);

    const chosenTracks = await updatedCheckedState.reduce((acc, currentState, index) => {
      if (currentState === true) {
        const newTrack = featuredPlaylistTracks[index];
        return acc.concat(newTrack);
      }
      return acc;
    }, []);

    const list = await chosenTracks.reduce((acc, curr) => {
      !newPlaylist.includes(curr) && acc.push(curr);
      return acc;
    }, []);

    const currentPlaylist = [...newPlaylist, ...list];
    setNewPlaylist(currentPlaylist);

    const ids = await currentPlaylist.reduce((acc, curr) => {
      return acc.concat(curr.track.id);
    }, []);
    setPlaylistIds(ids);
  };

  const handleCreatePLaylist = async () => {
    const response = await createNewPlaylist(newPlaylist, playlistName, playlistIds);
    console.log(response);
    setPlaylistName('');
    setNewPlaylist('');
    setCheckedState([]);
  };

  const searchSpotifyByArtist = async () => {
    const response = await fetch(
      `/.netlify/functions/spotify-search?token=${token}&searchParam=${artistSearch}&searchType=artist&market=us`
    );
    const json = await response.json();
    console.log(json);
  };
  const searchSpotifyByTrack = async () => {
    const response = await fetch(
      `/.netlify/functions/spotify-search?token=${token}&searchParam=${trackSearch}&searchType=track&market=us`
    );
    const json = await response.json();
    console.log(json);
  };

  return (
    <div className="playlist-creation-panel">
      <div className="search-dropdowns">
        <label className="search-labels">
          {`Browse Featured Playlists : `}
          <select
            onChange={(e) => {
              setSelectedPlaylist(e.target.value);
              setCheckedState(new Array(featuredPlaylistTracks.length).fill(false));
            }}
          >
            {options.map((option, i) => {
              return (
                <option key={option.name + i} value={option.id}>
                  {option.name}
                </option>
              );
            })}
          </select>
        </label>
        <label className="search-labels">
          {`Search by Artist : `}
          <input
            required
            value={artistSearch}
            onChange={(e) => setArtistSearch(e.target.value)}
          ></input>
          <button onClick={searchSpotifyByArtist}>Search by Artist</button>
        </label>
        <label className="search-labels">
          {`Search by Song Name : `}
          <input value={trackSearch} onChange={(e) => setTrackSearch(e.target.value)}></input>
          <button onClick={searchSpotifyByTrack}>Search by Song Name</button>
        </label>
      </div>

      <div className="tracks-selection-container">
        <div className="playlist-track-options tracks">
          {featuredPlaylistTracks &&
            featuredPlaylistTracks.map((track, i) => {
              return (
                <div key={track.track.name + i}>
                  <input
                    key={track.track.name + i}
                    type="checkbox"
                    id={`custom-checkbox-${i}`}
                    name={track.track.name}
                    value={track.track.name}
                    checked={checkedState[i]}
                    onChange={() => handleCheckboxChange(i)}
                  ></input>
                  <label>{track.track.name}</label>
                </div>
              );
            })}
        </div>
        <div className="user-selected-tracks tracks">
          {newPlaylist.length > 0 &&
            newPlaylist.map((track, i) => {
              return <p key={track.track.name + i}>{track.track.name}</p>;
            })}
        </div>
        <div>
          <label>
            {`Name Your Playlist : `}
            <input onChange={(e) => setPlaylistName(e.target.value)} value={playlistName}></input>
            <button onClick={handleCreatePLaylist}>Create Playlist</button>
          </label>
        </div>
      </div>
    </div>
  );
}
