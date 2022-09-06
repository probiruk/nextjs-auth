import "../styles/globals.css";
import Head from "next/head";
import { wrapper } from "../redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default wrapper.withRedux(MyApp);
