import React from 'react';
import ArtistResults from '../Components/ArtistResults';
import AlbumResults from '../Components/AlbumResults';
import FeaturedResults from '../Components/FeaturedResults';
export default function SearchResults({
  filter,
  featuredPlaylistTracks,
  checkedState,
  handleCheckboxChange,
  artistResults,
  trackResults,
  handleArtistSelection,
  albums,
}) {
  const filterDisplay = () => {
    switch (filter) {
      case 'featured':
        return (
          <FeaturedResults
            featuredPlaylistTracks={featuredPlaylistTracks}
            checkedState={checkedState}
            handleCheckboxChange={handleCheckboxChange}
          />
        );

      case 'artists':
        return (
          <ArtistResults
            artistResults={artistResults}
            handleArtistSelection={handleArtistSelection}
          />
        );
      case 'albums':
        return <AlbumResults albums={albums} />;
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
