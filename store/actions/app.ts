import { AppActionTypes } from "../actionTypes/app";
import { SET_PLAY, SET_CREATE } from "../actionTypes/app";

export const setPlay = (): AppActionTypes => ({ type: SET_PLAY });
export const setCreate = (): AppActionTypes => ({ type: SET_CREATE });
