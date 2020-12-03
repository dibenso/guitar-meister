export const CANVAS_WIDTH = 780;
export const CANVAS_HEIGHT = 540;
export const RADIUS = 20;
export const NOTE_HIT_ROW_X = 100;
export const NOTE_HIT_ROW_Y = CANVAS_HEIGHT - RADIUS - 100;
export const COLORS = {
  GREEN: "#00FF00",
  RED: "#FF0000",
  YELLOW: "#FFFF00",
  BLUE: "#0000FF",
  ORANGE: "#FFA500",
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
