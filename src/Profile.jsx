import React, { useEffect, useState } from 'react';
import Featured from './Components/Featured';
import DataDisplay from './data-utils/DataDisplay';
import SearchResults from './data-utils/SearchResults';
import { createNewPlaylist } from './services/fetch-utils';

export default function Profile({ token, userProfile }) {
  const [newPlaylist, setNewPlaylist] = useState('');
  const [playlistIds, setPlaylistIds] = useState('');
  const [selectedPlaylist, setSelectedPlaylist] = useState('');
  const [featuredPlaylistTracks, setFeaturedPlaylistTracks] = useState([]);
  const [options, setOptions] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const [checkedState, setCheckedState] = useState([]);

  const [genreDropdown, setGenreDropdown] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('featured');

  const [artistSearch, setArtistSearch] = useState('');
  const [artistResults, setArtistResults] = useState('');
  const [artistAlbums, setArtistAlbums] = useState('');

  const [trackSearch, setTrackSearch] = useState('');
  const [trackResults, setTrackResults] = useState('');

  const netlifyUrl = '/.netlify/functions/spotify-featured-playlist';

  useEffect(() => {
    const getGenreSeeds = async () => {
      const response = await fetch(`/.netlify/functions/spotify-genre-seeds?token=${token}`);
      const json = await response.json();
      (await json) && setGenreDropdown(json.data.genres);
    };
    getGenreSeeds();
  }, [token]);

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
    setArtistResults(json);
  };
  const searchSpotifyByTrack = async () => {
    const response = await fetch(
      `/.netlify/functions/spotify-search?token=${token}&searchParam=${trackSearch}&searchType=track&market=us`
    );
    const json = await response.json();
    console.log(json);
    setTrackResults(json);
  };
  const searchSpotifyByGenre = async (selectedGenre) => {
    const response = await fetch(
      `/.netlify/functions/spotify-recommendations?token=${token}&searchParam=${selectedGenre}`
    );
    const json = await response.json();
    console.log(json);
  };

  const handleArtistSelection = async (id) => {
    const response = await fetch(
      `/.netlify/functions/spotify-artist-albums?token=${token}&artist_id=${id}`
    );
    const json = await response.json();
    console.log(json);
    json.data.items && setArtistAlbums(json);
    json.data.items && setSelectedFilter('albums');
  };

  return (
    <div className="playlist-creation-panel">
      <label>
        {`Search By : `}
        <select onChange={(e) => setSelectedFilter(e.target.value)}>
          <option value={'featured'}>Featured Playlists</option>
          <option value={'artists'}>Artists</option>
          <option value={'tracks'}>Tracks</option>
          <option value={'recommendations'}>Recommendations By Genre</option>
        </select>
      </label>
      <DataDisplay
        filter={selectedFilter}
        setSelectedPlaylist={setSelectedPlaylist}
        setCheckedState={setCheckedState}
        options={options}
        featuredPlaylistTracks={featuredPlaylistTracks}
        artistSearch={artistSearch}
        setArtistSearch={setArtistSearch}
        searchSpotifyByArtist={searchSpotifyByArtist}
        trackSearch={trackSearch}
        setTrackSearch={setTrackSearch}
        searchSpotifyByTrack={searchSpotifyByTrack}
        searchSpotifyByGenre={searchSpotifyByGenre}
        genreDropdown={genreDropdown}
      />
      <div className="tracks-selection-container">
        <SearchResults
          filter={selectedFilter}
          featuredPlaylistTracks={featuredPlaylistTracks}
          checkedState={checkedState}
          handleCheckboxChange={handleCheckboxChange}
          artistResults={artistResults}
          trackResults={trackResults}
          handleArtistSelection={handleArtistSelection}
          albums={artistAlbums}
        />

        <div className="user-selected-tracks ">
          <div className="tracks">
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
    </div>
  );
}
