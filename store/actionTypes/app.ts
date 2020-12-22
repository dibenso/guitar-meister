export const SET_PLAY = "SET_PLAY";
export const SET_CREATE = "SET_CREATE";

interface TogglePlayAction {
  type: typeof SET_PLAY;
}

interface ToggleCreateAction {
  type: typeof SET_CREATE;
}

export type AppActionTypes = TogglePlayAction | ToggleCreateAction;
