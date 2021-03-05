import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";
import { APP_NAME } from "../constants";
import styles from "../styles/Home.module.css";

const Home: React.FunctionComponent = () => {
  return (
    <Layout>
      <Head>
        <title key="title">{APP_NAME}</title>
      </Head>
      <Link href="/play">
        <button className={styles.btn}>Play a Track</button>
      </Link>
      <Link href="/create">
        <button className={styles.btn}>Create a Track</button>
      </Link>
    </Layout>
  );
};

export default Home;
