require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const song_id = event.queryStringParameters.song_id;
  const token = event.queryStringParameters.token;
  console.log(token, 'token');
  const baseUrl = 'https://api.spotify.com/v1';
  const playlist = baseUrl + `/tracks/${song_id}?market=US`;
  try {
    const response = await fetch(playlist, {
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
