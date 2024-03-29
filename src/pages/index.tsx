import { GetServerSideProps, GetStaticProps } from 'next'
import styles from '../styles/pages/homepage.module.scss';
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
var redirect_uri = process.env.NODE_ENV === 'development' ? `http://localhost:3000/callback` : 'https://spotify-next-kappa.vercel.app/callback'; 
import querystring from 'querystring'
import { parseCookies } from 'nookies';


const Home = ({ link }: InferGetStaticPropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        <title>Home | my.spot</title>
      </Head>
      <img className={styles.blob} src="/images/blob-grande.svg" alt="decorative blob ilustration" />
      <div className={styles.container}>
        <main className={styles.hero}>
          <span>🎧 Olá, amante da musica.</span>
          <h1>Tudo do seu mundo <span>Spotify</span></h1>
          <p>
            Veja seus artistas e canções favoritos <br />
            <span>diretamente do Spotify</span>
          </p>
          <a className={styles.loginButton} href={link}>
            <span>Login</span>
            <img className={styles.spotifyLogo} src="/images/spotify-logo.png" />
          </a>
        </main>

        <img className={styles.avatar} src="/images/avatar.png" alt="Girl coding" />
      </div>
      <div className={styles.blobBottom}>
        <img className={styles.blobLeft} src="/images/blob-media.svg" alt="decorative blob ilustration" />
        <img className={styles.blobRight} src="/images/blob.svg" alt="decorative blob ilustration" />
      </div>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = parseCookies(ctx);

  if (cookies['spotifyauth.token']) {
    return {
      redirect: {
        destination: '/ranking',
        permanent: false,
      }
    }
  }

  const client_id = '14af23c1ba504db7ab3bc6c3bd474b6b'
  const state = generateRandomString(16);

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
