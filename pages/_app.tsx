import BasicLayout from "../styles/basic";

function MyApp({ Component, pageProps }) {
  return (
    <BasicLayout>
      <Component {...pageProps} />
    </BasicLayout>
  )
}

export default MyApp
