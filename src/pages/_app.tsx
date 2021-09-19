import { AppProps } from 'next/app'
import '../styles/global.scss';
import { AuthProvider } from '../contexts/ArtistsContext';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools'
import { queryClient } from '../services/queryClient';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  )
}

export default MyApp
