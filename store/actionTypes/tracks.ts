import { SerializedTrack } from "../types";

export const ADD_TRACK = "ADD_TRACK";

interface AddTrackAction {
  type: typeof ADD_TRACK;
  payload: SerializedTrack;
}

export type TracksActionTypes = AddTrackAction;
