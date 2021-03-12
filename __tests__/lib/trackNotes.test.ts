import TrackNotes from "../../lib/trackNotes";
import Note from "../../lib/note";
import { NoteColor } from "../../lib/types";
import { VALIDATION_REASONS } from "../../lib/constants";

const validationFactory = (validationReason = ""): TrackNotes => {
  switch (validationReason) {
    case VALIDATION_REASONS.SINGLE_NOTE_CHORD: {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, true),
        new Note(3.5, NoteColor.Yellow, false)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      return trackNotes;
    }
    case VALIDATION_REASONS.OVERLAPPING_NOTES: {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, false),
        new Note(3.0, NoteColor.Yellow, false)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      return trackNotes;
    }
    case VALIDATION_REASONS.NOT_ENOUGH_NOTES: {
      const notes = [new Note(2.5, NoteColor.Green, false), new Note(3.0, NoteColor.Red, false)];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      return trackNotes;
    }
    case VALIDATION_REASONS.PASSED: {
      const notes = [
        new Note(0, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, false),
        new Note(3.0, NoteColor.Yellow, false)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      return trackNotes;
    }
    case VALIDATION_REASONS.NOT_ALIGNED: {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, true),
        new Note(3.1, NoteColor.Yellow, true)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      return trackNotes;
    }
    case VALIDATION_REASONS.DUPLICATE_CHORD_NOTE: {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, true),
        new Note(3.0, NoteColor.Red, true)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      return trackNotes;
    }
    default: {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, true),
        new Note(3.0, NoteColor.Yellow, true)
      ];

      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      return trackNotes;
    }
  }
};

describe("TrackNotes", () => {
  describe("constructor", () => {
    it("should create a new TrackNotes object given an array of Notes", () => {
      const trackNotes = validationFactory();
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
    it("should return an empty string if TrackNote object has no validation errors", () => {
      const trackNotes = validationFactory();
      expect(trackNotes.validationReasons).toEqual("");
    });

    it("should return a string containing an error about single note chords", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.SINGLE_NOTE_CHORD);
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.SINGLE_NOTE_CHORD);
    });

    it("should return a string containing an error about overlapping notes", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.OVERLAPPING_NOTES);
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.OVERLAPPING_NOTES);
    });

    it("should return a string containing an error about not enough notes", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.NOT_ENOUGH_NOTES);
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.NOT_ENOUGH_NOTES);
    });

    it("should return a string containing an error about notes that are passed the note hit row", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.PASSED);
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.PASSED);
    });

    it("should return a string containing an error about chords that are not aligned", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.NOT_ALIGNED);
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.NOT_ALIGNED);
    });

    it("should return a string containing an error about duplicate chord notes", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.DUPLICATE_CHORD_NOTE);
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.DUPLICATE_CHORD_NOTE);
    });

    it("should return a string containing an error about single note chords if last note is a chord and current chord length is 0", () => {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, false),
        new Note(3.5, NoteColor.Yellow, true)
      ];
      const trackNotes = new TrackNotes(notes);
      trackNotes.validate();
      expect(trackNotes.validationReasons).toContain(VALIDATION_REASONS.SINGLE_NOTE_CHORD);
    });
  });

  describe("validate", () => {
    it("should return true if a TrackNote object has no validation errors", () => {
      const trackNotes = validationFactory();
      expect(trackNotes.validate()).toEqual(true);
    });

    it("should return false if a TrackNote object has single note chords", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.SINGLE_NOTE_CHORD);
      expect(trackNotes.validate()).toEqual(false);
    });

    it("should return false if a TrackNote object has overlapping notes", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.OVERLAPPING_NOTES);
      expect(trackNotes.validate()).toEqual(false);
    });

    it("should return false if a TrackNote object does not have enough notes", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.NOT_ENOUGH_NOTES);
      expect(trackNotes.validate()).toEqual(false);
    });

    it("should return false if a TrackNote object has notes that are passed the note hit row", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.PASSED);
      expect(trackNotes.validate()).toEqual(false);
    });

    it("should return false if a TrackNote object has chords that are not aligned", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.NOT_ALIGNED);
      expect(trackNotes.validate()).toEqual(false);
    });

    it("should return false if a TrackNote object has duplicate chord notes", () => {
      const trackNotes = validationFactory(VALIDATION_REASONS.DUPLICATE_CHORD_NOTE);
      expect(trackNotes.validate()).toEqual(false);
    });

    it("should return false if a TrackNote objects last note is a chord and current chord length is 0", () => {
      const notes = [
        new Note(2.5, NoteColor.Green, false),
        new Note(3.0, NoteColor.Red, false),
        new Note(3.5, NoteColor.Yellow, true)
      ];
      const trackNotes = new TrackNotes(notes);
      expect(trackNotes.validate()).toEqual(false);
    });
  });
});
