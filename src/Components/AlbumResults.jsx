import React from 'react';

export default function AlbumResults({ albums }) {
  return (
    <div>
      {albums.data &&
        albums.data.items.map((album, i) => {
          return (
            <div key={album.name + i}>
              <h3>{album.name}</h3>
              {album.images.length > 0 && (
                <img src={album.images[0].url} style={{ width: '200px' }} />
              )}
            </div>
          );
        })}
    </div>
  );
}
