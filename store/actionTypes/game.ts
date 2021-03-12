import { SerializedTrack } from "../types";

export const SET_TRACK = "SET_TRACK";

interface SetTrackAction {
  type: typeof SET_TRACK;
  payload: SerializedTrack;
}

export type GameActionTypes = SetTrackAction;
