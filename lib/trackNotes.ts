import Note from "./note";
import { RADIUS } from "./constants";

// this class is mainly responsible for validating the notes of a Track before starting the game
export default class TrackNotes {
  private _notes: Array<Note>;

  constructor(notes: Array<Note>) {
    this._notes = notes;
  }

  get notes(): Array<Note> {
    return this._notes;
  }

  validate(): boolean {
    let lastNotePosition = this._notes[0].position;
    let lastChordPosition = 0;

    // check if first note is greater than or equal to 0
    if (lastNotePosition >= 0) return false;

    for (const note of this._notes) {
      // check for any overlapping notes that are not chords
      if (note.position > lastNotePosition - RADIUS && !note.chord) return false;
      // check if current note is a chord and if it is check if lastChordPosition is not 0 and matches the current notes position
      if (note.chord) {
        if (lastChordPosition !== 0) {
          if (note.position !== lastChordPosition) return false;
        } else lastChordPosition = note.position;
      } else lastChordPosition = 0;

      lastNotePosition = note.position;
    }

    return true;
  }
}
