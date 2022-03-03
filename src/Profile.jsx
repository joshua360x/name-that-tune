import React, { useEffect, useState } from 'react';

export default function Profile({ userProfile, token }) {
  const netlifyUrlFeatured = '/.netlify/functions/spotify-featured-playlists';
  const netlifyUrlGenre = '/.netlify/functions/spotify-genre-seeds';
  const [featuredPlaylists, setFeaturedPlaylists] = useState(null);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const getFeaturedPlaylists = async () => {
      const response = await fetch(`${netlifyUrlFeatured}?token=${token}`);
      const json = await response.json();
      setFeaturedPlaylists(json.data.playlists.items);
      console.log(json);
    };
    getFeaturedPlaylists();
  }, []);

  useEffect(() => {
    const getFeaturedPlaylists = async () => {
      const response = await fetch(`${netlifyUrlGenre}?token=${token}`);
      const json = await response.json();
      //   setGenres(json.data.playlists.items);
      //   console.log(json);
    };
    getFeaturedPlaylists();
  }, []);

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
