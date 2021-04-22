import { GetStaticProps } from 'next'
import { Container, Content, Title, Text } from '../styles/pages/home';
import Cookies from 'js-cookie'
import { InferGetStaticPropsType } from 'next'

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';
var redirect_uri = 'http://localhost:3000/dashboard'; 
import querystring from 'querystring'
import { useEffect } from 'react';


const Home = ({ link, state }: InferGetStaticPropsType<typeof getStaticProps>) => {
  useEffect(() => {
    Cookies.set(stateKey, state)
  }, [state])
  return (
        <Container>
            <Content>
                <div>
                  <Title>SpotifyMe</Title>
                  <Text>FIND YOUR FAVORITES ARTISTS</Text>
                </div>
                <a href={link}>
                  Login
                </a>
            </Content>
        </Container>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const client_id = process.env.CLIENT_ID
  const state = generateRandomString(16);

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
  return {
    props: {
      link,
      state
    },
  }
}