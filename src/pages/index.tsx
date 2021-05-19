import { GetStaticProps } from 'next'
import { Container, LoginButton } from '../styles/pages/home';
import { InferGetStaticPropsType } from 'next'

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
var redirect_uri = `http://localhost:3000/dashboard`; 
import querystring from 'querystring'


const Home = ({ link, state }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
        <Container>
          <section className="hero">
            <span>🎧 Hi, Welcome to SpotifyMe</span>
            <h1>Find your favorite artists</h1>
            <p>
              Discover about the artists that <br />
              <span>you like the most</span>
            </p>

            <LoginButton href={link}>Login</LoginButton>
          </section>

          <img src="/avatar.svg" alt="Girl coding" />

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
      link
    },
  }
}