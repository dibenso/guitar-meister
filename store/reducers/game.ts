import { SerializedTrack } from "../types";
import { GameActionTypes, SET_TRACK } from "../actionTypes/game";

export interface GameState {
  track?: SerializedTrack;
}

const gameReducer = (state: GameState = {}, action: GameActionTypes): GameState => {
  switch (action.type) {
    case SET_TRACK:
      return { ...state, track: action.payload };
    default:
      return state;
  }
};

export default gameReducer;
