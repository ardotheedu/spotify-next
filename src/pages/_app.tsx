import { AppProps } from 'next/app'
import BasicLayout from "../styles/basic";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '../contexts/ArtistsContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BasicLayout>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </BasicLayout>
  )
}

export default MyApp
