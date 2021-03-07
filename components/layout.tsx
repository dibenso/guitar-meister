import React from "react";
import Head from "next/head";
import { APP_NAME } from "../constants";

interface Props {
  children: React.ReactNode;
}

const Layout: React.FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <div className="flex flex-col h-screen">
      <Head>
        <title key="title">{APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/app.css" />
      </Head>
      <header className="py-5 h-16 bg-gray-700 text-white text-center">{APP_NAME}</header>
      <div className="flex-1 overflow-y-auto">
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
