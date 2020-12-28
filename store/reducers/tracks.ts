import Track from "../../lib/track";
import { TracksActionTypes, ADD_TRACK } from "../actionTypes/tracks";

export interface TracksState {
  tracks: Array<Track>;
}

const initialState = {
  tracks: []
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
