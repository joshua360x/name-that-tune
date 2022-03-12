import React from 'react';

export default function Featured({
  setSelectedPlaylist,
  setCheckedState,
  options,
  featuredPlaylistTracks,
}) {
  return (
    <div>
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
    </div>
  );
}
