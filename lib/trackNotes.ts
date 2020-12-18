import Note from "./note";
import { chordHasUniqueColors } from "./utils";
import { ValidationReasons } from "./types";
import { RADIUS, NOTE_HIT_Y, MINIMUM_NOTES_REQUIRED, VALIDATION_REASONS } from "./constants";

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
    const {
      passed,
      overlap,
      notAligned,
      notEnoughNotes,
      singleNoteChord,
      duplicateChordNote
    } = this._validationReasons;
    return `${passed || ""}${overlap || ""}${notAligned || ""}${singleNoteChord || ""}${notEnoughNotes || ""}${
      duplicateChordNote || ""
    }`;
  }

  validate(): boolean {
    let lastNote = this._notes[0];
    let lastChordPosition = 0;
    let currentChord: Array<Note> = [];
    let valid = true;

    // check if first note is greater than or equal to NOTE_HIT_Y (note hit row)
    if (lastNote.position >= NOTE_HIT_Y) {
      this._validationReasons.passed = VALIDATION_REASONS.PASSED;
      valid = false;
    }

    // check if the track has at least MINIMUM_NOTES_REQUIRED number of notes
    if (this.notes.length < MINIMUM_NOTES_REQUIRED) {
      this._validationReasons.notEnoughNotes = VALIDATION_REASONS.NOT_ENOUGH_NOTES;
      valid = false;
    }

    this.notes.forEach((note, index) => {
      // check if last note is a chord and current chord length === 0. If it is
      // then the track is invalid since the last chord only contains one note
      if (index === this.notes.length - 1 && note.chord && currentChord.length === 0) {
        this._validationReasons.singleNoteChord = VALIDATION_REASONS.SINGLE_NOTE_CHORD;
        valid = false;
      }
      if (!note.chord) {
        // check if chord is at least 2 consecutive notes and if it is,
        // set currentChord to empty array if current note is not part of a chord
        // if it is not, track is invalid
        if (currentChord.length === 1) {
          this._validationReasons.singleNoteChord = VALIDATION_REASONS.SINGLE_NOTE_CHORD;
          valid = false;
        }
        currentChord = [];
      }
      // check for any overlapping notes that are not chords
      if (note.position >= lastNote.position - RADIUS && !note.chord && index !== 0) {
        this._validationReasons.overlap = VALIDATION_REASONS.OVERLAPPING_NOTES;
        valid = false;
      }
      // check if current note is a chord and if it is check if lastChordPosition is not 0 and matches the current notes position
      if (note.chord) {
        currentChord.push(note);

        if (lastChordPosition !== 0) {
          if (note.position !== lastChordPosition) {
            this._validationReasons.notAligned = VALIDATION_REASONS.NOT_ALIGNED;
            valid = false;
          }
          if (!chordHasUniqueColors(currentChord)) {
            this._validationReasons.duplicateChordNote = VALIDATION_REASONS.DUPLICATE_CHORD_NOTE;
            valid = false;
          }
        } else lastChordPosition = note.position;
      } else lastChordPosition = 0;

      lastNote = note;
    });

    return valid;
  }
}
