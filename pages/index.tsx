import React, { Component } from "react";
import Head from "next/head";
import { connect, ConnectedProps } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../store";
import { setPlay, setCreate } from "../store/actions/app";
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

class Home extends Component<Props, unknown> {
  render(): JSX.Element {
    const { play, create } = this.props;

    return (
      <div>
        <Head>
          <title>Guitar Meister</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <div>
          {play || create ? (
            <div>Play or Create</div>
          ) : (
            <div>
              <button className={styles.btn} onClick={() => this.props.setPlay()}>
                Play a track
              </button>
              <button className={styles.btn} onClick={() => this.props.setCreate()}>
                Create a track
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connector(Home);
