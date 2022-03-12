import React from 'react';

export default function Track({ trackSearch, setTrackSearch, searchSpotifyByTrack }) {
  return (
    <div>
      <label className="search-labels">
        {`Search by Song Name : `}
        <input value={trackSearch} onChange={(e) => setTrackSearch(e.target.value)}></input>
        <button onClick={searchSpotifyByTrack}>Search by Song Name</button>
      </label>
    </div>
  );
}
