import Note from "./note";

export enum NoteColor {
  Green = "#00FF00",
  Red = "#FF0000",
  Yellow = "#FFFF00",
  Blue = "#0000FF",
  Orange = "#FFA500"
}

type NoteHook = (note: Note) => void;

export interface GameOptions {
  onNoteHit?: NoteHook;
  onChordHit?: (chord: Note[]) => void;
  onMissed?: NoteHook;
  onBadStrum?: () => void;
  onGameOver?: () => void;
  onPause?: () => void;
  onResume?: () => void;
}

// like keyboard event but only contains what we need
// makes testing this functionality a little easier
export interface ControlEvent {
  code: string;
  repeat: boolean;
}

export interface ControlCallbacks {
  onBadStrum: () => void;
  onPause: () => void;
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
