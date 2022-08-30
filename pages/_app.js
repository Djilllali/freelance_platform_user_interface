import "../styles/globals.css";
import "../styles/styles.less";
import { Provider } from "react-redux";
import store from "../store/index";
import Navbar from "../components/statics/navbar/Navbar";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Head>
        <link rel="shortcut icon" href="turingicon.png" type="image/x-icon" />

        <title>Turing Jobs</title>
      </Head>
      <Navbar></Navbar>

      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
