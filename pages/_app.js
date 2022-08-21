import "../styles/globals.css";
import "../styles/styles.less";
import { Provider } from "react-redux";
import store from "../store/index";
import Navbar from "../components/statics/navbar/Navbar";
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Navbar></Navbar>

      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
