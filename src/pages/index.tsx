import { GetStaticProps } from 'next'
import { Container, Hero, LoginButton } from '../styles/pages/home';
import { InferGetStaticPropsType } from 'next'
import Head from 'next/head'

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};
var redirect_uri = `http://localhost:3000/callback`; 
import querystring from 'querystring'


const Home = ({ link, state }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Head>
        <title>Home | my.spot</title>
      </Head>

      <Container>
        <Hero>
          <span>🎧 Olá, amante da musica.</span>
          <h1>Tudo do seu mundo <span>Spotify</span>.</h1>
          <p>
            Veja seus artistas e canções favoritos <br />
            <span>diretamente do Spotify</span>
          </p>
          <LoginButton href={link}>Login</LoginButton>
        </Hero>

        <img src="/images/avatar.png" alt="Girl coding" />
      </Container>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async (context) => {
  const client_id = '14af23c1ba504db7ab3bc6c3bd474b6b'
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