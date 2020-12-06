import Note from "../../lib/note";
import { NoteColor } from "../../lib/types";

function updateNotePositionNTimes(note: Note, n: number): void {
  for (let i = 0; i < n; i++) note.updatePosition();
}

describe("Note", () => {
  describe("constructor", () => {
    it("should create a Note object given some params", () => {
      const note = new Note(5.0, NoteColor.Green, false);
      expect(note).toBeInstanceOf(Note);
    });
  });

  describe("position", () => {
    it("should return the current position of a note", () => {
      const note = new Note(10.0, NoteColor.Red, false);
      expect(note.position).toEqual(-1580);
    });
  });

  describe("hit", () => {
    it("should return a boolean indicating if the note has been hit", () => {
      const note = new Note(10.0, NoteColor.Yellow, false);
      expect(note.hit).toEqual(false);
    });
  });

  describe("missed", () => {
    it("should return a boolean indicating if the note was missed", () => {
      const note = new Note(10.0, NoteColor.Blue, false);
      expect(note.missed).toEqual(false);
    });
  });

  describe("color", () => {
    it("should return the color of a note", () => {
      const note = new Note(10.0, NoteColor.Orange, false);
      expect(note.color).toEqual(NoteColor.Orange);
    });
  });

  describe("chord", () => {
    it("should return a boolean indicating if the note is part of a chord", () => {
      const note1 = new Note(10.0, NoteColor.Green, false);
      const note2 = new Note(10.0, NoteColor.Red, true);
      expect(note1.chord).toEqual(false);
      expect(note2.chord).toEqual(true);
    });
  });

  describe("onScreen", () => {
    it("should return a boolean indicating if the note is on screen", () => {
      const note = new Note(10.0, NoteColor.Orange, false);
      expect(note.onScreen()).toEqual(false);
      updateNotePositionNTimes(note, 400);
      expect(note.onScreen()).toEqual(true);
    });
  });

  describe("pastScreen", () => {
    it("should return a boolean indicating if the note is past the screen", () => {
      const note = new Note(10.0, NoteColor.Orange, false);
      expect(note.pastScreen()).toEqual(false);
      updateNotePositionNTimes(note, 550);
      expect(note.pastScreen()).toEqual(true);
    });
  });

  describe("onNoteHit", () => {
    it("should return a boolean indicating if the note is on the note hit row", () => {
      const note = new Note(10.0, NoteColor.Green, false);
      expect(note.onNoteHit()).toEqual(false);
      updateNotePositionNTimes(note, 500);
      expect(note.onNoteHit()).toEqual(true);
      updateNotePositionNTimes(note, 100);
      expect(note.onNoteHit()).toEqual(false);
    });
  });

  describe("pastNoteHit", () => {
    it("should return a boolean indicating if the note is past the note hit row", () => {
      const note = new Note(10.0, NoteColor.Red, false);
      expect(note.pastNoteHit()).toEqual(false);
      updateNotePositionNTimes(note, 511);
      expect(note.pastNoteHit()).toEqual(true);
    });
  });

  describe("updatePosition", () => {
    it("should increase the position of a note by 4 each time it is called", () => {
      const note = new Note(10.0, NoteColor.Yellow, false);
      const nextPosition = note.position + 100 * 4;
      updateNotePositionNTimes(note, 100);
      expect(note.position).toEqual(nextPosition);
    });

    it("should set missed to true if the newly updated position is past the note hit row", () => {
      const note = new Note(10.0, NoteColor.Blue, false);
      updateNotePositionNTimes(note, 511);
      expect(note.missed).toEqual(true);
    });
  });

  describe("setHit", () => {
    it("should set the hit property of a note to true if onNoteHit() is true", () => {
      const note = new Note(10.0, NoteColor.Blue, false);
      note.setHit();
      expect(note.hit).toEqual(false);
      updateNotePositionNTimes(note, 500);
      note.setHit();
      expect(note.hit).toEqual(true);
    });
  });

  describe("setMissed", () => {
    it("should set the missed property of a note to true", () => {
      const note = new Note(10.0, NoteColor.Orange, false);
      note.setMissed();
      expect(note.missed).toEqual(true);
    });
  });
});
