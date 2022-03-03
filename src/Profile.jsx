/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import './Profile.css';

export default function Profile({ userProfile, token }) {
  const baseNetlifyUrl = '/.netlify/functions';
  const netlifyUrlFeaturedPlaylists = `/spotify-featured-playlists`;
  const netlifyUrlCreatePlaylist = `/spotify-abstract-event-handler`;
  //   const netlifyUrlGenre = `/spotify-genre-seeds`;
  //   const netlifyUrlSearch = `/search`;
  //   const [genres, setGenres] = useState(null);
  //   const [userGenreChoice, setGenreChoice] = useState('');
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  const [featuredPlaylistSelection, setFeaturedSelection] = useState('');
  const [featuredPlaylistTracks, setFeaturedTracks] = useState('');
  const [checkedState, setCheckedState] = useState([]);
  const [userCreatedPlaylist, setUserCreatedPlaylist] = useState([]);

  useEffect(() => {
    const getFeaturedPlaylists = async () => {
      const response = await fetch(
        `${baseNetlifyUrl}${netlifyUrlFeaturedPlaylists}?token=${token}`
      );
      const json = await response.json();
      setFeaturedPlaylists(json.data.playlists.items);
    };
    getFeaturedPlaylists();
  }, []);

  useEffect(() => {
    async function fetchPlayListsFromSpotify() {
      const response = await fetch(
        `${baseNetlifyUrl}/spotify-playlist-items?token=${token}&playlist_id=${featuredPlaylistSelection}`
      );
      const json = await response.json();
      const approvedTracks = [];
      await json.data.items.map((track) => {
        track.track.preview_url ? approvedTracks.push(track) : null;
      });
      setFeaturedTracks(approvedTracks);
      setCheckedState(new Array(approvedTracks.length).fill(false));
    }
    featuredPlaylistSelection && fetchPlayListsFromSpotify();
  }, [token, featuredPlaylistSelection]);

  //   useEffect(() => {
  //     const getGenreslists = async () => {
  //       const response = await fetch(`${baseNetlifyUrl}${netlifyUrlGenre}?token=${token}`);
  //       const json = await response.json();
  //       //   setGenres(json.data.playlists.items);
  //       console.log(json);
  //     };
  //     getGenreslists();
  //   }, [userGenreChoice]);
  //   // WORK HERE!!!!!! DEPENDANCY SHOULD BE THE STATE OF LAST DROPDOWN VALUE THE USER CHOSE

  //   useEffect(() => {
  //     const getSearchResults = async () => {
  //       const response = await fetch(
  //         `/.netlify/spotify-abstract-event-handler?token=${token}?endpoint=/search${userGenreChoice}`
  //       );
  //       const json = await response.json();
  //       //   setGenres(json.data.playlists.items);
  //       console.log(json);
  //     };
  //     getSearchResults();
  //   }, [userGenreChoice]);
  //   // WORK HERE!!!!!! DEPENDANCY SHOULD BE THE STATE OF LAST DROPDOWN VALUE THE USER CHOSE

  useEffect(() => {
    async function fetchPlayListsFromSpotify() {
      const response = await fetch(
        `${baseNetlifyUrl}${netlifyUrlFeaturedPlaylists}?endpoint='/users/31zjivtjpe3q44ogpzbku45qgu4m/playlists'&token=${token}`
      );
      const json = await response.json();
      const approvedTracks = [];
      await json.data.items.map((track) => {
        track.track.preview_url ? approvedTracks.push(track) : null;
      });
      setFeaturedTracks(approvedTracks);
      setCheckedState(new Array(approvedTracks.length).fill(false));
    }
    featuredPlaylistSelection && fetchPlayListsFromSpotify();
  }, [userCreatedPlaylist]);

  const handleFeaturedChange = async (e) => {
    setFeaturedSelection(e.target.value);
  };

  const handleCreateUserPlaylist = async (e) => {
    e.preventDefault();
    const newPlaylist = [];
    await featuredPlaylistTracks.map((track, i) => {
      checkedState[i] ? newPlaylist.push(track) : null;
    });
    setUserCreatedPlaylist(newPlaylist);
  };

  const handleSongSelect = async (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <div>
      <h1>{`Welcome ${userProfile.username}`}</h1>
      <label>
        Featured Playlists {': '}
        {featuredPlaylists ? (
          <select onChange={handleFeaturedChange}>
            {featuredPlaylists.map((list, i) => {
              return (
                <option key={i} value={list.id}>
                  {list.name}
                </option>
              );
            })}
          </select>
        ) : (
          <h1>loading</h1>
        )}
      </label>
      <div className="featured-playlist-results-container">
        <h3>Featured Playlist Results</h3>
        <form className="featured-playlist-results-container" onSubmit={handleCreateUserPlaylist}>
          <div className="featured-playlist-results-container">
            {featuredPlaylistTracks &&
              featuredPlaylistTracks.map((track, i) => {
                return (
                  <label key={i}>
                    <input
                      type="checkbox"
                      name="user-selection"
                      value={track.track.id}
                      onChange={() => {
                        handleSongSelect(i);
                      }}
                    ></input>
                    {`${track.track.name} by ${track.track.artists[0].name}`}
                  </label>
                );
              })}
          </div>
          <button>Create Playlist</button>
        </form>
      </div>
    </div>
  );
}
