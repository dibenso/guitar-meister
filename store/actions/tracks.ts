import Track from "../../lib/track";
import { TracksActionTypes, ADD_TRACK } from "../actionTypes/tracks";

export const addTrack = (track: Track): TracksActionTypes => ({ type: ADD_TRACK, payload: track });
