import Track from "../../lib/track";

export const ADD_TRACK = "ADD_TRACK";

interface AddTrackAction {
  type: typeof ADD_TRACK;
  payload: Track;
}

export type TracksActionTypes = AddTrackAction;
