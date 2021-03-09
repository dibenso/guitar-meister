import Note from "./note";
import Controls from "./controls";
import { NoteColor } from "./types";
import { COLORS } from "./constants";

export function chordHasUniqueColors(chord: Array<Note>): boolean {
  const uniqueColors = [];

  for (const note of chord) {
    for (const color of uniqueColors) {
      if (color === note.color) return false;
    }

    uniqueColors.push(note.color);
  }

  return true;
}

function chordHasColor(colors: Array<NoteColor>, color: NoteColor): boolean {
  for (const c of colors) {
    if (c === color) return true;
  }

  return false;
}

export function buildBitChord(colors: Array<NoteColor>): number {
  let chord = 0;

  chord |= chordHasColor(colors, COLORS.GREEN) ? 1 << 1 : 0;
  chord |= chordHasColor(colors, COLORS.RED) ? 1 << 2 : 0;
  chord |= chordHasColor(colors, COLORS.YELLOW) ? 1 << 3 : 0;
  chord |= chordHasColor(colors, COLORS.BLUE) ? 1 << 4 : 0;
  chord |= chordHasColor(colors, COLORS.ORANGE) ? 1 << 5 : 0;

  return chord;
}

export function keysMatchChord(chord: number, keys: Controls): boolean {
  let keyChord = 0;

  keyChord |= keys.green ? 1 << 1 : 0;
  keyChord |= keys.red ? 1 << 2 : 0;
  keyChord |= keys.yellow ? 1 << 3 : 0;
  keyChord |= keys.blue ? 1 << 4 : 0;
  keyChord |= keys.orange ? 1 << 5 : 0;

  if (keyChord === chord) return true;
  else return false;
}
