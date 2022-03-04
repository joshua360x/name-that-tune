/* eslint-disable indent */
import React, { useEffect, useState } from 'react';
import { createUserPlaylist, fetchMyCreatedPlaylists } from './services/fetch-utils';
import './Profile.css';
import { logDOM } from '@testing-library/react';

export default function Profile({ userProfile, token }) {
  const baseNetlifyUrl = '/.netlify/functions';
  const netlifyUrlFeaturedPlaylists = `/spotify-featured-playlists`;

  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  const [featuredPlaylistSelection, setFeaturedSelection] = useState('');
  const [featuredPlaylistTracks, setFeaturedTracks] = useState('');
  const [checkedState, setCheckedState] = useState([]);
  const [userCreatedPlaylist, setUserCreatedPlaylist] = useState(null);
  const [playlistName, setPlaylistName] = useState('');

  const [myPlaylists, setMyPlaylists] = useState();

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
    const getMyPlaylists = async () => {
      const response = await fetchMyCreatedPlaylists(userProfile.user_id);
      setMyPlaylists(response);
    };
    getMyPlaylists();
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

  useEffect(() => {
    async function insertPlayListToSupabase() {
      await createUserPlaylist(userCreatedPlaylist, playlistName);
    }
    userCreatedPlaylist && insertPlayListToSupabase();
  }, [userCreatedPlaylist]);

  const handleFeaturedChange = async (e) => {
    setFeaturedSelection(e.target.value);
  };

  const handleCreateUserPlaylist = async (e) => {
    e.preventDefault();
    const newPlaylist = [];
    await featuredPlaylistTracks.map((track, i) => {
      checkedState[i] ? newPlaylist.push(track.track.preview_url) : null;
    });
    setUserCreatedPlaylist(newPlaylist);
    const response = await fetchMyCreatedPlaylists(userProfile.user_id);
    setMyPlaylists([...response]);
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
          <br></br>
          <label>
            {`Playlist Name : `}
            <input onChange={(e) => setPlaylistName(e.target.value)}></input>
          </label>
          <br></br>
          <button>Create Playlist</button>
        </form>
      </div>
      {myPlaylists
        ? myPlaylists.map((item, i) =>
            item.playlist.map((track, m) => {
              console.log(item);
              console.log(track);
              return <audio key={i + m} src={track} controls></audio>;
            })
          )
        : null}
    </div>
  );
}
