import { SerializedTrack } from "../types";
import { GameActionTypes, SET_TRACK } from "../actionTypes/game";

export const setTrack = (track: SerializedTrack): GameActionTypes => ({ type: SET_TRACK, payload: track });
