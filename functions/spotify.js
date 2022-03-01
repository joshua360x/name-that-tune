const fetch = require('node-fetch');
require('dotenv').config();


exports.handler = async (event, context) => {
  const baseUrl = 'https://api.spotify.com/v1';
  const playlist = baseUrl + `/playlists/6PiZPsIotykZkKx2GiZK4H/tracks`;
  try {
    const response = await fetch(playlist, { headers: { Accept: 'application/json', ['Content-Type']: 'application/json', Authorization: `Bearer BQBD66zbBXr20w1pyidAbFFSll0ymKDR0unlv0jkgn3kljiTnTn5V5hjr2204LonD4j_gttYhypncY2oxnJ_foOvWrhR47aatSepDLThInI2uAv1J9vk2disdznnor5LAii8s76PSNmqRhnJIxvo2vleltxquIn6abIUbgjH4_y_5sugKuA7K1uBR2s` } });
    const data = await response.json();
    const json = JSON.stringify({ data });

    console.log(json);
    
    return { 
      statusCode: 200, 
      body: json
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed fetching data' }),
    };
  }
};
