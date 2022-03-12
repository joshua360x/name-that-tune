import React from 'react';

export default function Artists({ artistSearch, setArtistSearch, searchSpotifyByArtist }) {
  return (
    <div>
      <label className="search-labels">
        {`Search by Artist : `}
        <input
          required
          value={artistSearch}
          onChange={(e) => setArtistSearch(e.target.value)}
        ></input>
        <button onClick={searchSpotifyByArtist}>Search by Artist</button>
      </label>
    </div>
  );
}
