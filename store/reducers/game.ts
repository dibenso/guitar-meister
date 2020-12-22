import Track from "../../lib/track";
import { GameActionTypes, SET_TRACK } from "../actionTypes/game";

export interface GameState {
  track?: Track;
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
