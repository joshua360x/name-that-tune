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
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  // return {
  //   statusCode: 200,
  //   body: 'helloworld'
  // };
  // let _response;
  const post = promisify(request.post);

  const response = await post(authOptions);
  console.log(response.body);
  // , function(error, response, body) {
  //   if (!error && response.statusCode === 200) {
  
  //     // use the access token to access the Spotify Web API
  //     const token = body.access_token;
  //     console.log(body);

  return {
    statusCode: 200,
    body: JSON.stringify(response.body.access_token)
  };

  //   }
  // });
  // return _response;
};




// require('dotenv').config();
// const fetch = require('node-fetch');

// exports.handler = async (event, context) => {
//   try {
//     const response = await fetch('https://accounts.spotify.com/api/token', {
//       method: 'POST',
//       headers: {
//         'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
//         'Content-Type': 'application/x-www-form-urlencoded',
//         Accept: 'application/x-www-form-urlencoded'
//       },
//       body: JSON.stringify({ params: {
//         grant_type: 'client_credentials'
//       }, }),
//       json: true
//     });

//     console.log(response);
//     const json = await response.json();
//     console.log(json);
//     // const json = JSON.stringify({ data });

//     console.log(json);

//     return {
//       statusCode: 200,
//       body: JSON.stringify(json),
//     };

//   } catch (error) {
//     console.log(error);
//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Failed fetching data' }),
//     };
//   }
// };
