import React from 'react';
import Josh from './Team/Josh';

export default function About({ joshFavSong }) {
  return (
    <div>
      <h2>Meet the Team </h2>
      <Josh joshFavSong={joshFavSong} />
    </div>
  );
}
