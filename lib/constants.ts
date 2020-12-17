import { NoteColor } from "./types";

export const CANVAS_WIDTH = 780;
export const CANVAS_HEIGHT = 540;
export const RADIUS = 20;
export const NOTE_HIT_X = 100;
export const NOTE_HIT_Y = CANVAS_HEIGHT - RADIUS - 100;
export const COLORS = {
  GREEN: NoteColor.Green,
  RED: NoteColor.Red,
  YELLOW: NoteColor.Yellow,
  BLUE: NoteColor.Blue,
  ORANGE: NoteColor.Orange,
  WHITE: "#FFFFFF",
  BLACK: "#000000"
};
// stange bug prevents consecutive keys from being held at the same time
// using 1 key as a gap we can get around this (at least in the case of a keyboard)
// here we use the "5" key as a gap from blue key and orange key
export const KEYS = {
  GREEN: "Digit1",
  RED: "Digit2",
  YELLOW: "Digit3",
  BLUE: "Digit4",
  ORANGE: "Digit6",
  STRUM: "Space"
};
export const DOM_IDS = {
  GAME_BACKGROUND_CANVAS: "game-background-canvas",
  GAME_CANVAS: "game-canvas",
  AUDIO_PLAYER: "audio-player",
  VIDEO_PLAYER: "video-player",
  SCORE: "score",
  NOTE_HITS: "hit-count",
  NOTE_MISSES: "missed-count",
  BAD_STRUMS: "bad-strum-count"
};
export const MINIMUM_NOTES_REQUIRED = 3;
export const VALIDATION_REASONS = {
  SINGLE_NOTE_CHORD: "Chords have to be at least 2 consectuive notes; ",
  OVERLAPPING_NOTES: "Overlapping notes; ",
  NOT_ENOUGH_NOTES: `${MINIMUM_NOTES_REQUIRED} notes are required to create a track; `,
  PASSED: "Notes passed note hit row; ",
  NOT_ALIGNED: "Chords not aligned; ",
  DUPLICATE_CHORD_NOTE: "Chord has repeated note colors; "
};
