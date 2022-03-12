import React from 'react';

export default function SearchResults({
  filter,
  featuredPlaylistTracks,
  checkedState,
  handleCheckboxChange,
  artistResults,
  trackResults,
}) {
  const filterDisplay = () => {
    switch (filter) {
      case 'featured':
        return (
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
        );

      case 'artists':
        return (
          <div className="playlist-track-options tracks">
            {artistResults &&
              artistResults.data.artists.items.map((artist, i) => {
                return (
                  <div key={i}>
                    <p>{artist.name}</p>
                    {artist.images.length > 0 && (
                      <img style={{ width: '100px' }} src={artist.images[0].url}></img>
                    )}
                  </div>
                );
              })}
          </div>
        );
      case 'tracks':
        return (
          <div className="playlist-track-options tracks">
            {trackResults &&
              trackResults.data.tracks.items.map((track, i) => {
                return (
                  <div key={i}>
                    <p>{`"${track.name}" by : ${track.artists[0].name}`}</p>
                  </div>
                );
              })}
          </div>
        );
      case 'recommendations':
        return <h1>Recommendations</h1>;

      default:
        console.log(filter);
        break;
    }
  };
  const check = filterDisplay();

  return <div>{check}</div>;
}
