import Note from "../../lib/note";
import { NoteColor } from "../../lib/types";

describe("Note", () => {
  describe("constructor", () => {
    it("should create a Note object given some params", () => {
      const note = new Note(5.0, NoteColor.Green, false);

      expect(note.position).toEqual(-580);
      expect(note.color).toEqual(NoteColor.Green);
      expect(note.chord).toEqual(false);
    });
  });
});
