import React, { useEffect, useState } from 'react';

export default function Profile({ userProfile, token }) {
  const baseNetlifyUrl = '/.netlify/functions';
  const netlifyUrlFeaturedPlaylists = `/spotify-featured-playlists`;
  //   const netlifyUrlGenre = `/spotify-genre-seeds`;
  //   const netlifyUrlSearch = `/search`;
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  //   const [genres, setGenres] = useState(null);
  //   const [userGenreChoice, setGenreChoice] = useState('');

  useEffect(() => {
    const getFeaturedPlaylists = async () => {
      const response = await fetch(
        `${baseNetlifyUrl}${netlifyUrlFeaturedPlaylists}?token=${token}`
      );
      const json = await response.json();
      setFeaturedPlaylists(json.data.playlists.items);
      console.log(json);
    };
    getFeaturedPlaylists();
  }, []);

  //   useEffect(() => {
  //     const getGenreslists = async () => {
  //       const response = await fetch(`${baseNetlifyUrl}${netlifyUrlGenre}?token=${token}`);
  //       const json = await response.json();
  //       //   setGenres(json.data.playlists.items);
  //       console.log(json);
  //     };
  //     getGenreslists();
  //   }, [userGenreChoice]);
  //   // WORK HERE!!!!!! DEPENDANCY SHOULD BE THE STATE OF LAST DROPDOWN VALUE THE USER CHOSE

  //   useEffect(() => {
  //     const getSearchResults = async () => {
  //       const response = await fetch(
  //         `/.netlify/spotify-abstract-event-handler?token=${token}?endpoint=/search${userGenreChoice}`
  //       );
  //       const json = await response.json();
  //       //   setGenres(json.data.playlists.items);
  //       console.log(json);
  //     };
  //     getSearchResults();
  //   }, [userGenreChoice]);
  //   // WORK HERE!!!!!! DEPENDANCY SHOULD BE THE STATE OF LAST DROPDOWN VALUE THE USER CHOSE

  //   console.log(featuredPlaylists);
  return (
    <div>
      <h1>{`Welcome ${userProfile.username}`}</h1>
      <h3>Featured Playlists</h3>
      {featuredPlaylists ? (
        featuredPlaylists.map((list, i) => {
          return (
            <div key={i}>
              <p>
                {list.name}
                <span>{` (id: ${list.id}) # of tracks: ${list.tracks.total}`}</span>
              </p>
            </div>
          );
        })
      ) : (
        <div>loading</div>
      )}
    </div>
  );
}
