import React from "react";
import Head from "next/head";
import Layout from "../components/layout";
import { APP_NAME } from "../constants";

const Create: React.FunctionComponent = () => (
  <Layout>
    <Head>
      <title key="title">{`${APP_NAME} - Create`}</title>
    </Head>
    <h1>Create a Track</h1>
  </Layout>
);

export default Create;
