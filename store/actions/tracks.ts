import { SerializedTrack } from "../types";
import { TracksActionTypes, ADD_TRACK } from "../actionTypes/tracks";

export const addTrack = (track: SerializedTrack): TracksActionTypes => ({ type: ADD_TRACK, payload: track });
