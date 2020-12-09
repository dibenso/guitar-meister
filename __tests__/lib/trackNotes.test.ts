import TrackNotes from "../../lib/trackNotes";
import Note from "../../lib/note";
import { NoteColor } from "../../lib/types";

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
});
