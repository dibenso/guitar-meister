import React from "react";
import Head from "next/head";
import { APP_NAME } from "../constants";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title key="title">{APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/app.css" />
      </Head>
      <h2>{APP_NAME}</h2>
      {children}
    </>
  );
};

export default Layout;
