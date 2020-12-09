import Note from "./note";
import { RADIUS, NOTE_HIT_Y } from "./constants";

// this class is mainly responsible for validating the notes of a Track before starting the game
export default class TrackNotes {
  private _notes: Array<Note>;
  private _validationReasons: Array<string>;

  constructor(notes: Array<Note>) {
    this._notes = notes;
    this._validationReasons = [];
  }

  get notes(): Array<Note> {
    return this._notes;
  }

  get validationReasons(): Array<string> {
    return this._validationReasons;
  }

  validate(): boolean {
    let lastNotePosition = this._notes[0].position;
    let lastChordPosition = 0;
    let valid = true;

    // check if first note is greater than or equal to NOTE_HIT_Y (note hit row)
    if (lastNotePosition >= NOTE_HIT_Y) {
      this._validationReasons.push("Notes passed note hit row");
      return false;
    }

    this.notes.forEach((note, index) => {
      // check for any overlapping notes that are not chords
      if (note.position >= lastNotePosition - RADIUS && !note.chord && index !== 0) {
        this._validationReasons.push("Overlapping notes");
        valid = false;
      }
      // check if current note is a chord and if it is check if lastChordPosition is not 0 and matches the current notes position
      if (note.chord) {
        if (lastChordPosition !== 0) {
          if (note.position !== lastChordPosition) {
            this._validationReasons.push("Chords not aligned");
            valid = false;
          }
        } else lastChordPosition = note.position;
      } else lastChordPosition = 0;

      lastNotePosition = note.position;
    });

    return valid;
  }
}
