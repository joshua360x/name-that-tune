import { client, checkError } from './client';

export const fetchAllPlaylists = async () => {
  const response = await client.from('playlists').select();

  return checkError(response);
};
