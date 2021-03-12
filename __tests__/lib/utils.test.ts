import Controls from "../../lib/controls";
import { buildBitChord, keysMatchChord, preventDefaultSpace } from "../../lib/utils";
import { NoteColor } from "../../lib/types";
import { KEYS } from "../../lib/constants";

describe("utils", () => {
  describe("buildBitChord", () => {
    it("should return a bitstring representing the Note colors that are held down", () => {
      let colors = [NoteColor.Green, NoteColor.Red, NoteColor.Yellow, NoteColor.Blue, NoteColor.Orange];
      let bitChord = buildBitChord(colors);
      expect(bitChord).toEqual(62);

      colors = [NoteColor.Yellow, NoteColor.Red, NoteColor.Orange];
      bitChord = buildBitChord(colors);
      expect(bitChord).toEqual(44);

      colors = [];
      bitChord = buildBitChord(colors);
      expect(bitChord).toEqual(0);
    });
  });

  describe("keysMatchChord", () => {
    it("should return true if keys pressed match bitchord", () => {
      let colors = [NoteColor.Orange, NoteColor.Yellow, NoteColor.Green];
      let bitChord = buildBitChord(colors);
      const controls = new Controls({ onStrum: jest.fn(), onPause: jest.fn() });
      const orangeEvent = {
        code: KEYS.ORANGE,
        repeat: true
      };
      const blueEvent = {
        code: KEYS.BLUE,
        repeat: true
      };
      const yellowEvent = {
        code: KEYS.YELLOW,
        repeat: true
      };
      const redEvent = {
        code: KEYS.RED,
        repeat: true
      };
      const greenEvent = {
        code: KEYS.GREEN,
        repeat: true
      };

      controls.toggleFromEvent(orangeEvent, false);
      controls.toggleFromEvent(yellowEvent, false);
      controls.toggleFromEvent(greenEvent, false);
      expect(keysMatchChord(bitChord, controls)).toEqual(true);

      const newControls = new Controls({ onStrum: jest.fn(), onPause: jest.fn() });
      colors = [NoteColor.Red, NoteColor.Blue];
      bitChord = buildBitChord(colors);
      newControls.toggleFromEvent(blueEvent, false);
      newControls.toggleFromEvent(redEvent, false);
      expect(keysMatchChord(bitChord, newControls)).toEqual(true);

      const emptyControls = new Controls({ onStrum: jest.fn(), onPause: jest.fn() });
      expect(keysMatchChord(bitChord, emptyControls)).toEqual(false);
    });
  });

  describe("preventDefaultSpace", () => {
    it("should prevent the default behavior of the space key", () => {
      const spaceKeyboardEvent = new KeyboardEvent("keypress", { code: "Space" });
      Object.assign(spaceKeyboardEvent, { preventDefault: jest.fn() });
      preventDefaultSpace(spaceKeyboardEvent);
      expect(spaceKeyboardEvent.preventDefault).toHaveBeenCalledTimes(1);
    });

    it("should allow the default behavior of any key besides space", () => {
      const otherKeyboardEvent = new KeyboardEvent("keypress", { code: "Enter" });
      Object.assign(otherKeyboardEvent, { preventDefault: jest.fn() });
      preventDefaultSpace(otherKeyboardEvent);
      expect(otherKeyboardEvent.preventDefault).toHaveBeenCalledTimes(0);
    });
  });
});
