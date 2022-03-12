import React from 'react';
import Featured from '../Components/Featured';
import Artists from '../Components/Artists';
import Track from '../Components/Track';
import Recommendations from '../Components/Recommendations';

export default function DataDisplay({
  filter,
  setSelectedPlaylist,
  setCheckedState,
  options,
  featuredPlaylistTracks,
  artistSearch,
  setArtistSearch,
  searchSpotifyByArtist,
  trackSearch,
  setTrackSearch,
  searchSpotifyByTrack,
  searchSpotifyByGenre,
  genreDropdown,
}) {
  const filterDisplay = () => {
    switch (filter) {
      case 'featured':
        return (
          <Featured
            setSelectedPlaylist={setSelectedPlaylist}
            setCheckedState={setCheckedState}
            options={options}
            featuredPlaylistTracks={featuredPlaylistTracks}
          />
        );

      case 'artists':
        return (
          <Artists
            artistSearch={artistSearch}
            setArtistSearch={setArtistSearch}
            searchSpotifyByArtist={searchSpotifyByArtist}
          />
        );
      case 'tracks':
        return (
          <Track
            trackSearch={trackSearch}
            setTrackSearch={setTrackSearch}
            searchSpotifyByTrack={searchSpotifyByTrack}
          />
        );
      case 'recommendations':
        return (
          <Recommendations
            searchSpotifyByGenre={searchSpotifyByGenre}
            genreDropdown={genreDropdown}
          />
        );

      default:
        console.log(filter);
        break;
    }
  };
  const check = filterDisplay();

  return <div>{check}</div>;
}
