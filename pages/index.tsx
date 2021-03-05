import React from "react";
import Head from "next/head";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../store";
import { setPlay, setCreate } from "../store/actions/app";
import Layout from "../components/layout";
import Play from "../components/play";
import Create from "../components/create";
import { APP_NAME } from "../constants";
import styles from "../styles/Home.module.css";

const mapStateToProps = (state: RootState) => {
  const { play, create } = state.app;

  return { play, create };
};
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setPlay: () => dispatch(setPlay()),
    setCreate: () => dispatch(setCreate())
  };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

const Home: React.FunctionComponent<Props> = ({ play, create, setPlay, setCreate }: Props) => {
  return (
    <Layout>
      <Head>
        <title>{APP_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/app.css" />
      </Head>
      <>
        {play || create ? (
          <>
            {play ? <Play /> : null}
            {create && <Create />}
          </>
        ) : (
          <>
            <button className={styles.btn} onClick={() => setPlay()}>
              Play a Track
            </button>
            <button className={styles.btn} onClick={() => setCreate()}>
              Create a Track
            </button>
          </>
        )}
      </>
    </Layout>
  );
};

export default connector(Home);
