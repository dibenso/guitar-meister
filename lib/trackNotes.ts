import Note from "./note";
import { chordHasUniqueColors } from "./utils";
import { ValidationReasons } from "./types";
import { RADIUS, NOTE_HIT_Y } from "./constants";

// this class is mainly responsible for validating the notes of a Track before starting the game
export default class TrackNotes {
  private _notes: Array<Note>;
  private _validationReasons: ValidationReasons;

  constructor(notes: Array<Note>) {
    this._notes = notes;
    this._validationReasons = {};
  }

  get notes(): Array<Note> {
    return this._notes;
  }

  get validationReasons(): string {
    const { passed, overlap, notAligned, duplicateChordNote } = this._validationReasons;
    return `${passed || ""}${overlap || ""}${notAligned || ""}${duplicateChordNote || ""}`;
  }

  // TODO: ensure that a chord contains more than 1 note
  validate(): boolean {
    let lastNote = this._notes[0];
    let lastChordPosition = 0;
    let currentChord: Array<Note> = [];
    let valid = true;

    // check if first note is greater than or equal to NOTE_HIT_Y (note hit row)
    if (lastNote.position >= NOTE_HIT_Y) {
      this._validationReasons.passed = "Notes passed note hit row; ";
      return false;
    }

    this.notes.forEach((note, index) => {
      // set currentChord to empty array if current note is not part of a chord
      if (!note.chord) currentChord = [];
      // check for any overlapping notes that are not chords
      if (note.position >= lastNote.position - RADIUS && !note.chord && index !== 0) {
        this._validationReasons.overlap = "Overlapping notes; ";
        valid = false;
      }
      // check if current note is a chord and if it is check if lastChordPosition is not 0 and matches the current notes position
      if (note.chord) {
        currentChord.push(note);

        if (lastChordPosition !== 0) {
          if (note.position !== lastChordPosition) {
            this._validationReasons.notAligned = "Chords not aligned";
            valid = false;
          }
          if (!chordHasUniqueColors(currentChord)) {
            this._validationReasons.duplicateChordNote = "Chord has repeated note colors";
            valid = false;
          }
        } else lastChordPosition = note.position;
      } else lastChordPosition = 0;

      lastNote = note;
    });

    return valid;
  }
}
