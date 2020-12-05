export enum NoteColor {
  Green = "#00FF00",
  Red = "#FF0000",
  Yellow = "#FFFF00",
  Blue = "#0000FF",
  Orange = "#FFA500"
}

// like keyboard event but only contains what we need
// makes testing this functionality a little easier
export interface ControlEvent {
  code: string;
  repeat: boolean;
}
