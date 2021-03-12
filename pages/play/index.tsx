import React from "react";
import Link from "next/link";
import { wrapper } from "../../store";
import Head from "next/head";
import { connect, ConnectedProps } from "react-redux";
import Layout from "../../components/layout";
import { RootState } from "../../store";
import { APP_NAME } from "../../constants";

const mapStateToProps = (state: RootState) => {
  const { tracks } = state.tracks;

  return { tracks };
};

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

export const getStaticProps = wrapper.getStaticProps(({ store }) => {
  tracks: store.getState().tracks.tracks;
});

const Play: React.FunctionComponent<Props> = ({ tracks }: Props) => (
  <Layout>
    <Head>
      <title key="title">{`${APP_NAME} - Play`}</title>
    </Head>
    <ul>
      {tracks.map((track, index) => (
        <div
          key={index}
          className="p-6 max-w-sm mx-auto mb-4 hover:shadow-xl bg-blue-200 rounded-xl shadow-md flex items-center space-x-4">
          <div>
            <div className="text-xl font-medium text-black">{track.name}</div>
            <p className="text-gray-500">{track.artist}</p>
            <Link href={`/play/${index}`}>
              <button className="px-4 py-1 text-sm text-purple-600 font-semibold rounded-full border border-black hover:text-white hover:bg-purple-600 hover:border-transparent focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 cursor-pointer">
                Play
              </button>
            </Link>
          </div>
        </div>
      ))}
    </ul>
  </Layout>
);

export default connector(Play);
