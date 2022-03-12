import { client, checkError } from './client';

export const fetchAllPlaylists = async () => {
  const response = await client.from('playlists').select();

  return checkError(response);
};

// SUPABASE AUTH STUFF

export function getUser() {
  return client.auth.session() && client.auth.session().user;
}

export function checkAuth() {
  const user = getUser();

  if (!user) location.replace('../');
}

export function redirectIfLoggedIn() {
  if (getUser()) {
    location.replace('./other-page');
  }
}

export async function signupUser(email, password, username) {
  const response = await client.auth.signUp({ email, password });
  if (response.user) {
    await createProfile(username);
  }
  return response.user;
}

export async function createProfile(username) {
  const response = await client.from('profiles').insert({ username });

  return checkError(response);
}

export const fetchUserProfile = async (user_id) => {
  const response = await client.from('profiles').select().match({ user_id }).single();

  return checkError(response);
};

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

export async function logout() {
  await client.auth.signOut();

  return (window.location.href = '../');
}

export const insertLeaderBoard = async (stats) => {
  const response = await client.from('leaderboards').insert(stats);
  return checkError(response);
};

export const fetchLeaders = async () => {
  const response = await client.from('leaderboards').select();
  return checkError(response);
};

export const createNewPlaylist = async (playlist, name, playlist_ids) => {
  const response = await client
    .from('user_playlists')
    .insert({ playlist: playlist, name: name, playlist_ids: playlist_ids });
  return checkError(response);
};
