require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const playlist_id = event.queryStringParameters.playlist_id;

  const baseUrl = 'https://api.spotify.com/v1';
  const playlist = baseUrl + `/playlists/${playlist_id}/tracks?market=US`;
  try {
    const response = await fetch(playlist, {
      headers: {
        Accept: 'application/json',
        ['Content-Type']: 'application/json',
        Authorization: `Bearer BQABvekzVgtK6ThN9nKha9_isiCDl8OOw0FphSDTcN_3WOqlYkUFcNqSgug7lTuJA2Mb3g8P`,
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
