import Track from "../../lib/track";
import { GameActionTypes, SET_TRACK } from "../actionTypes/game";

export const setTrack = (track: Track): GameActionTypes => ({ type: SET_TRACK, payload: track });
