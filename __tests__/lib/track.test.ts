import Track from "../../lib/track";
import TrackNotes from "../../lib/trackNotes";
import Note from "../../lib/note";
import Controls from "../../lib/controls";
import { NoteColor } from "../../lib/types";
import { KEYS } from "../../lib/constants";
import { controlCallbacks } from "./controls.test";

let trackNotes: TrackNotes;

const resetTrackNotes = () => {
  const notes = [
    new Note(2.5, NoteColor.Green, false),
    new Note(10.0, NoteColor.Red, true),
    new Note(10.0, NoteColor.Yellow, true)
  ];
  trackNotes = new TrackNotes(notes);
};
const trackFactory = () => {
  resetTrackNotes();

  return new Track(trackNotes, "Test Song", "Test Artist", "toyStory.mp3", "toyStory.mp4");
};

describe("Track", () => {
  describe("constructor", () => {
    it("should create a Track object given some params", () => {
      const track = trackFactory();
      expect(track).toBeInstanceOf(Track);
    });
  });

  describe("name", () => {
    it("should return the name of the track", () => {
      const track = trackFactory();
      expect(track.name).toEqual("Test Song");
    });
  });

  describe("artist", () => {
    it("should return the artist of the track", () => {
      const track = trackFactory();
      expect(track.artist).toEqual("Test Artist");
    });
  });

  describe("audioSource", () => {
    it("should return the audio source of the track", () => {
      const track = trackFactory();
      expect(track.audioSource).toEqual("toyStory.mp3");
    });
  });

  describe("videoSource", () => {
    it("should return the video source of the track", () => {
      const track = trackFactory();
      expect(track.videoSource).toEqual("toyStory.mp4");
    });
  });

  describe("currentChord", () => {
    it("should be constructed with an empty array", () => {
      const track = trackFactory();
      expect(track.currentChord).toEqual([]);
    });

    it("should return the current chord of the track", () => {
      const track = trackFactory();
      const controls = new Controls(controlCallbacks);

      Array.from({ length: 500 }, () =>
        track.progress(controls, jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn())
      );

      expect(track.currentChord[0].color).toEqual(NoteColor.Red);
      expect(track.currentChord[1].color).toEqual(NoteColor.Yellow);
    });
  });

  describe("anyNoteValid", () => {
    it("should be constructed as false", () => {
      const track = trackFactory();
      expect(track.anyNoteValid).toEqual(false);
    });

    it("should return false if no notes are on the note hit row", () => {
      const track = trackFactory();
      const controls = new Controls(controlCallbacks);

      Array.from({ length: 2000 }, () =>
        track.progress(controls, jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn())
      );

      expect(track.anyNoteValid).toEqual(false);
    });

    it("should return true if any notes are on the note hit row", () => {
      const track = trackFactory();
      const controls = new Controls(controlCallbacks);

      Array.from({ length: 500 }, () =>
        track.progress(controls, jest.fn(), jest.fn(), jest.fn(), jest.fn(), jest.fn())
      );

      expect(track.anyNoteValid).toEqual(true);
    });
  });

  describe("notes", () => {
    it("should return the track notes of a track", () => {
      const track = trackFactory();
      expect(track.notes).toEqual(trackNotes);
    });
  });

  describe("progress validNoteHit callback", () => {
    it("should fire the validNoteHit callback if a note is valid and strum is pressed", () => {
      const track = trackFactory();
      const controls = new Controls(controlCallbacks);
      const validNoteHit = jest.fn();

      controls.toggleFromEvent({ code: KEYS.STRUM, repeat: false }, false);
      Array.from({ length: 120 }, () =>
        track.progress(controls, validNoteHit, jest.fn(), jest.fn(), jest.fn(), jest.fn())
      );

      expect(validNoteHit).toHaveBeenCalledTimes(1);
    });
  });

  describe("progress validChordHit callback", () => {
    it("should fire the validChordHit callback if a chord is valid and strum is pressed", () => {
      const track = trackFactory();
      const controls = new Controls(controlCallbacks);
      const validChordHit = jest.fn();

      controls.toggleFromEvent({ code: KEYS.STRUM, repeat: false }, false);
      controls.toggleFromEvent({ code: KEYS.RED, repeat: true }, false);
      controls.toggleFromEvent({ code: KEYS.YELLOW, repeat: true }, false);
      Array.from({ length: 495 }, () =>
        track.progress(controls, jest.fn(), validChordHit, jest.fn(), jest.fn(), jest.fn())
      );

      expect(validChordHit).toHaveBeenCalledTimes(1);
    });
  });
});
