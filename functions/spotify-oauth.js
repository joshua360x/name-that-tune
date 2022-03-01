const request = require('request'); // "Request" library

const client_id = process.env.SPOTIFY_CLIENT_ID; // Your client id
const client_secret = process.env.SPOTIFY_CLIENT_SECRET; // Your secret

// yo ur application requests authorization
const authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

request.post(authOptions, function(error, response, body) {
  if (!error && response.statusCode === 200) {
  
      // use the access token to access the Spotify Web API
    const token = body.access_token;
    console.log(body);
    // const options = {
    //   url: 'https://api.spotify.com/v1/users/31zjivtjpe3q44ogpzbku45qgu4m',
    //   headers: {
    //     'Authorization': 'Bearer ' + token
    //   },
    //   json: true
    // };
    // request.get(options, function(error, response, body) {
    // //   console.log(body);
    // });
  }
});