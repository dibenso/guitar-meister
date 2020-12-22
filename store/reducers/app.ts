import { AppActionTypes, SET_PLAY, SET_CREATE } from "../actionTypes/app";

export interface AppState {
  play: boolean;
  create: boolean;
}

const initialState = {
  play: false,
  create: false
};

const appReducer = (state: AppState = initialState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case SET_PLAY:
      return { ...state, play: true, create: false };
    case SET_CREATE:
      return { ...state, create: true, play: false };
    default:
      return state;
  }
};

export default appReducer;
