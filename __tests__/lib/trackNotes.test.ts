import TrackNotes from "../../lib/trackNotes";
import Note from "../../lib/note";
import { NoteColor } from "../../lib/types";
import { VALIDATION_REASONS } from "../../lib/constants";

describe("TrackNotes", () => {
  describe("constructor", () => {
    it("should create a new TrackNotes object given an array of Notes", () => {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, false),
        new Note(4.0, NoteColor.Blue, true),
        new Note(4.0, NoteColor.Orange, true)
      ];
      const trackNotes = new TrackNotes(notes);
      expect(trackNotes).toBeInstanceOf(TrackNotes);
    });
  });

  describe("notes", () => {
    it("should return the notes that are used with a TrackNotes object", () => {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, false),
        new Note(4.0, NoteColor.Blue, true),
        new Note(4.0, NoteColor.Orange, true)
      ];
      const trackNotes = new TrackNotes(notes);
      expect(trackNotes.notes).toEqual(notes);
    });
  });

  describe("validationReason", () => {
    it("it should return a string containing an error about single note chords", () => {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, true),
        new Note(3.5, NoteColor.Yellow, false)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.SINGLE_NOTE_CHORD);
    });

    it("should return a string containing an error about overlapping notes", () => {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, false),
        new Note(3.0, NoteColor.Yellow, false)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.OVERLAPPING_NOTES);
    });

    it("should return a string containing an error about not enough notes", () => {
      const notes = [new Note(2.5, NoteColor.Green, false), new Note(3.0, NoteColor.Red, false)];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.NOT_ENOUGH_NOTES);
    });

    it("should return a string containing an error about notes that are passed the note hit row", () => {
      const notes = [
        new Note(0, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, false),
        new Note(3.0, NoteColor.Yellow, false)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.PASSED);
    });

    it("should return a string containing an error about chords that are not aligned", () => {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, true),
        new Note(3.1, NoteColor.Yellow, true)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.NOT_ALIGNED);
    });

    it("should return a string containing an error about duplicate chord notes", () => {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, true),
        new Note(3.0, NoteColor.Red, true)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.DUPLICATE_CHORD_NOTE);
    });
  });
});
