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

export async function signupUser(email, password, profileName) {
  const response = await client.auth.signUp({ email, password });

  return response.user;
}

export async function signInUser(email, password) {
  const response = await client.auth.signIn({ email, password });

  return response.user;
}

export async function logout() {
  await client.auth.signOut();

  return (window.location.href = '../');
}