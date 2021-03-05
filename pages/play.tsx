import React from "react";
import Head from "next/head";
import Downshift from "downshift";
import { connect, ConnectedProps } from "react-redux";
import Layout from "../components/layout";
import Game from "../components/game";
import { APP_NAME } from "../constants";
import { RootState } from "../store";
import * as gameActions from "../store/actions/game";
import Track from "../lib/track";

const mapStateToProps = (state: RootState) => {
  const { tracks } = state.tracks;
  const { track } = state.game;

  return { tracks, selectedTrack: track };
};
const mapDispatchToProps = {
  setTrack: (track: Track) => gameActions.setTrack(track)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

const Play: React.FunctionComponent<Props> = ({ tracks, selectedTrack, setTrack }: Props) => (
  <Layout>
    <Head>
      <title key="title">{`${APP_NAME} - Play`}</title>
    </Head>
    {selectedTrack ? (
      <Game track={selectedTrack} />
    ) : (
      <Downshift
        onChange={selection => setTrack(selection)}
        itemToString={item => (item ? `Song: ${item.name} - By: ${item.artist}` : "")}>
        {({ getItemProps, getLabelProps, getMenuProps, selectedItem }) => (
          <div>
            <label {...getLabelProps()}>Select A Track</label>
            <ul {...getMenuProps()}>
              {tracks.map((item, index) => (
                <li
                  key={index}
                  {...getItemProps({
                    key: index,
                    index,
                    item,
                    style: {
                      textAlign: "center",
                      backgroundColor: selectedItem === item ? "yellow" : "lightgray"
                    }
                  })}>
                  <p>{item.name}</p>
                  <p>By: {item.artist}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Downshift>
    )}
  </Layout>
);

export default connector(Play);
