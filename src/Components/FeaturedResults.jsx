import React from 'react';

export default function FeaturedResults({
  featuredPlaylistTracks,
  checkedState,
  handleCheckboxChange,
}) {
  return (
    <div className="playlist-track-options tracks">
      {featuredPlaylistTracks &&
        featuredPlaylistTracks.map((track, i) => {
          return (
            <div key={track.track.name + i}>
              <input
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
  );
}
