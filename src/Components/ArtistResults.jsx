import React from 'react';

export default function ArtistResults({ artistResults, handleArtistSelection }) {
  return (
    <div
      className="playlist-track-options tracks"
      onClick={() => handleArtistSelection(artistResults.data.artists.items.id)}
    >
      {artistResults &&
        artistResults.data.artists.items.map((artist, i) => {
          return (
            <div key={i} onClick={() => handleArtistSelection(artist.id)}>
              <p>{artist.name}</p>
              {artist.images.length > 0 && (
                <img style={{ width: '100px' }} src={artist.images[0].url}></img>
              )}
            </div>
          );
        })}
    </div>
  );
}
