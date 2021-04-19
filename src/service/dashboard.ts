import SpotifyWebApi from 'spotify-web-api-node';


const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

var credentials = {
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: 'http://localhost:3000/dashboard'
}

export const spotifyApi = new SpotifyWebApi(credentials);
interface AuthProps {
    code: string
}
export async function authToken({code}: AuthProps) {
    const result = await spotifyApi.authorizationCodeGrant(code).then(
        function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
    
        if (data.body['access_token']){
          spotifyApi.setAccessToken(data.body['access_token']);
          spotifyApi.setRefreshToken(data.body['refresh_token']);
        }
        
      },
      function(err) {
        console.log('Something went wrong!', err);
      }
    );

    return result;
}
