import { AppProps } from 'next/app'
import BasicLayout from "../styles/basic";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from '../contexts/ArtistsContext';
import { Header } from './components/Header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BasicLayout>
      <AuthProvider>
        <Header />
        <Component {...pageProps} />
      </AuthProvider>
    </BasicLayout>
  )
}

export default MyApp
