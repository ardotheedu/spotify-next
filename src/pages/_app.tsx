import { AppProps } from 'next/app'
import BasicLayout from "../styles/basic";
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <BasicLayout>
      <Component {...pageProps} />
    </BasicLayout>
  )
}

export default MyApp
