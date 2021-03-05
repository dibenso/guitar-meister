import React from "react";
import Head from "next/head";
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
      <ul>
        {tracks.map((track, index) => (
          <div
            key={index}
            className="p-6 max-w-sm mx-auto mb-4 hover:shadow-xl bg-blue-200 rounded-xl shadow-md flex items-center space-x-4">
            <div>
              <div className="text-xl font-medium text-black">{track.name}</div>
              <p className="text-gray-500">{track.artist}</p>
              <button
                onClick={() => setTrack(track)}
                className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-black hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2">
                Play
              </button>
            </div>
          </div>
        ))}
      </ul>
    )}
  </Layout>
);

export default connector(Play);
