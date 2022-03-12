import React from 'react';

export default function Recommendations({ searchSpotifyByGenre, genreDropdown }) {
  return (
    <div>
      <label className="search-labels">
        {`Get Recommendations
           By Genre : `}
        <select
          onChange={(e) => {
            searchSpotifyByGenre(e.target.value);
            //   setCheckedState(new Array(featuredPlaylistTracks.length).fill(false));
          }}
        >
          {genreDropdown &&
            genreDropdown.map((option, i) => {
              return (
                <option key={option + i} value={option}>
                  {option}
                </option>
              );
            })}
        </select>
      </label>
    </div>
  );
}
