import { SerializedTrack } from "../types";
import { TracksActionTypes, ADD_TRACK } from "../actionTypes/tracks";
import tracks from "../../tracks";

const serializedTracks: Array<SerializedTrack> = tracks.map(track => {
  return {
    notes: track.notes.notes.map(({ time, color, chord }) => ({
      time,
      color,
      chord
    })),
    name: track.name,
    artist: track.artist,
    audioSource: track.audioSource,
    videoSource: track.videoSource
  };
});

export interface TracksState {
  tracks: Array<SerializedTrack>;
}

const initialState = {
  tracks: serializedTracks
};

const tracksReducer = (state: TracksState = initialState, action: TracksActionTypes): TracksState => {
  switch (action.type) {
    case ADD_TRACK:
      const tracks = [...state.tracks, action.payload];
      return { ...state, tracks };
    default:
      return state;
  }
};

export default tracksReducer;
