import Note from "./note";

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
