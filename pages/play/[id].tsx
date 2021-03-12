import React from "react";
import Head from "next/head";
import Error from "next/error";
import Layout from "../../components/layout";
import Game from "../../components/game";
import { wrapper } from "../../store";
import { SerializedTrack } from "../../store/types";
import { APP_NAME } from "../../constants";

export const getServerSideProps = wrapper.getServerSideProps(({ store, params }) => {
  const id = params?.id;
  const notFound = {
    props: {
      status: 404
    }
  };

  if (typeof id === "string") {
    const selectedTrack = store.getState().tracks.tracks[parseInt(id, 10)];

    if (!selectedTrack) return notFound;

    return {
      props: {
        selectedTrack
      }
    };
  } else return notFound;
});

interface Props {
  selectedTrack: SerializedTrack;
  status?: number;
}

const PlayTrack: React.FunctionComponent<Props> = ({ selectedTrack, status }: Props) => {
  if (status) return <Error statusCode={status} />;

  return (
    <Layout>
      <Head>
        <title key="title">{`${APP_NAME} - Play`}</title>
      </Head>
      <Game track={selectedTrack} />
    </Layout>
  );
};

export default PlayTrack;
