import { Button } from "antd";
import Head from "next/head";
import Image from "next/image";
import Footer from "../components/statics/Footer/Footer";
import Navbar from "../components/statics/navbar/Navbar";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Turing Jobs</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <div className={styles.section}>
          <div className={styles.section_paragraph}>
            With <span> Turing Jobs </span>, work with international companies
            from the <span>comfort of your home </span>.
          </div>
          <img
            className={styles.image}
            src="/remote_worker.png"
            alt="programmer"
          />
        </div>
        <div className={styles.section}>
          <img className={styles.image} src="/rocket.png" alt="programmer" />
          <div className={styles.section_paragraph}>
            <span> Unleash your potential </span> and boost your {"  "}
            <span>career </span> .
          </div>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
