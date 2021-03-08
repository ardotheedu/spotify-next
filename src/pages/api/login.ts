import querystring from 'querystring'
import cookieParse from 'cookie-parser'

import Cors from 'cors'

var client_id = process.env.CLIENT_ID; // Your client id
var redirect_uri = 'http://localhost:3000/dashboard'; // Your redirect uri

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';

const cors = Cors({
  methods: ['GET', 'HEAD'],
})


export default function login(req, res) {
    const client_id = process.env.CLIENT_ID
    var state = generateRandomString(16);

    res.cookie(stateKey, state);
  
    // your application requests authorization
    var scope = 'user-top-read';
    const link = 'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state
    });
    console.log(client_id)
    return res.json({link})
};