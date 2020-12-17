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

// used by TrackNotes for validation reasons
export interface ValidationReasons {
  passed?: string;
  overlap?: string;
  notAligned?: string;
  duplicateChordNote?: string;
  singleNoteChord?: string;
  notEnoughNotes?: string;
}
