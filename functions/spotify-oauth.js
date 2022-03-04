const { promisify } = require('util');

// const querystring = require('querystring');
const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret

const request = require('request'); // "Request" library

// yo ur application requests authorization
exports.handler = async (event, context) => {
  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      Authorization: 'Basic ' + new Buffer(client_id + ':' + client_secret).toString('base64'),
    },
    form: {
      grant_type: 'client_credentials',
    },
    json: true,
  };

  const post = promisify(request.post);

  const response = await post(authOptions);
  console.log(`CHECKING TOKEN ______------_____${JSON.stringify(response.body)}`);

  return {
    statusCode: 200,
    body: JSON.stringify(response.body.access_token),
  };
};
