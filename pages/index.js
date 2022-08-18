import { Button } from "antd";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Turing Jobs</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Button type="primary">Hello</Button>
    </div>
  );
}
