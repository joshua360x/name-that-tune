require('dotenv').config();
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const baseUrl = 'https://api.spotify.com/v1';
  const playlist = baseUrl + `/playlists/6PiZPsIotykZkKx2GiZK4H/tracks?market=US`;
  try {
    const response = await fetch(playlist, {
      headers: {
        Accept: 'application/json',
        ['Content-Type']: 'application/json',
        Authorization: `Bearer BQASKq8zqZz5g9tLzkFV99EQKXQIPFuwcD161mQLJXuN2XxRxJWKHai9itYeTo8PBOZFMyAkGc6iDbA15Cs`,
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
