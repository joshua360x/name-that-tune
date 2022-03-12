require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const playlist_id = event.queryStringParameters.playlist_id;
  const token = event.queryStringParameters.token;
  //   console.log(token, 'token');
  const spotifyEndpoint = 'https://api.spotify.com/v1/browse/featured-playlists';
  try {
    const response = await fetch(spotifyEndpoint, {
      headers: {
        Accept: 'application/json',
        ['Content-Type']: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    const json = JSON.stringify({ data });

    console.log(json);

    return {
      statusCode: 200,
      body: json,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
