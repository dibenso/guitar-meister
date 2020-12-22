import Track from "../../lib/track";

export const SET_TRACK = "SET_TRACK";

interface SetTrackAction {
  type: typeof SET_TRACK;
  payload: Track;
}

export type GameActionTypes = SetTrackAction;
