import React from 'react';
import Josh from './Team/Josh';
import Clay from './Team/Clay';
import Jack from './Team/Jack';

export default function About({ joshFavSong }) {
  return (
    <div>
      <h2>Meet the Team </h2>
      <Josh joshFavSong={joshFavSong} />
      <Clay />
      <Jack />
    </div>
  );
}
