import Controls from "../../lib/controls";
import { KEYS } from "../../lib/constants";

const onStrum = jest.fn();
const onPause = jest.fn();
export const controlCallbacks = { onStrum, onPause };

describe("Controls", () => {
  describe("constructor", () => {
    it("should create a new Controls object", () => {
      const controls = new Controls(controlCallbacks);
      expect(controls).toBeInstanceOf(Controls);
    });

    it("should set all control colors and strum to false during initialization", () => {
      const controls = new Controls(controlCallbacks);
      expect(controls.green).toEqual(false);
      expect(controls.red).toEqual(false);
      expect(controls.yellow).toEqual(false);
      expect(controls.blue).toEqual(false);
      expect(controls.orange).toEqual(false);
      expect(controls.strum).toEqual(false);
    });
  });

  describe("toggleFromEvent", () => {
    it("should set a button property to true if it is pressed", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.YELLOW,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(controls.yellow).toEqual(true);
    });

    it("should set a button property to true if it is held down (repeat is true)", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.YELLOW,
        repeat: true
      };
      controls.toggleFromEvent(event, false);
      expect(controls.yellow).toEqual(true);
    });

    it("should set a button property to false if it is released (up is true)", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.YELLOW,
        repeat: false
      };
      controls.toggleFromEvent(event, true);
      expect(controls.yellow).toEqual(false);
    });
  });

  describe("green", () => {
    it("should return a boolean indicating if the green button is currently pressed", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.GREEN,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(controls.green).toEqual(true);
    });
  });

  describe("red", () => {
    it("should return a boolean indicating if the red button is currently pressed", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.RED,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(controls.red).toEqual(true);
    });
  });

  describe("yellow", () => {
    it("should return a boolean indicating if the yellow button is currently pressed", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.YELLOW,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(controls.yellow).toEqual(true);
    });
  });

  describe("blue", () => {
    it("should return a boolean indicating if the blue button is currently pressed", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.BLUE,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(controls.blue).toEqual(true);
    });
  });

  describe("orange", () => {
    it("should return a boolean indicating if the orange button is currently pressed", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.ORANGE,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(controls.orange).toEqual(true);
    });
  });

  describe("pause", () => {
    it("should fire onPause callback once when pause button is pressed", () => {
      onPause.mockClear();

      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.PAUSE,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(onPause).toBeCalledTimes(1);
    });

    it("should not fire onPause callback if pause button is up", () => {
      onPause.mockClear();

      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.PAUSE,
        repeat: false
      };
      controls.toggleFromEvent(event, true);
      expect(onPause).toBeCalledTimes(0);
    });

    it("should not fire onPause callback if pause button is repeated", () => {
      onPause.mockClear();

      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.PAUSE,
        repeat: true
      };
      controls.toggleFromEvent(event, false);
      expect(onPause).toBeCalledTimes(0);
    });
  });

  describe("strum", () => {
    it("should return a boolean indicating if the strum button is currenly pressed", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.STRUM,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(controls.strum).toEqual(true);
    });

    it("should be false when the strum button is held down (repeated is true)", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.STRUM,
        repeat: false
      };
      controls.toggleFromEvent(event, true);
      expect(controls.strum).toEqual(false);
    });

    it("should fire onStrum callback once when strum button is pressed", () => {
      onStrum.mockClear();

      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.STRUM,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(onStrum).toBeCalledTimes(1);
    });
  });

  describe("emptyControls", () => {
    it("should return true if no buttons are pressed", () => {
      const controls = new Controls(controlCallbacks);
      expect(controls.emptyControls()).toEqual(true);
    });

    it("should return true if invalid buttons are pressed", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: "I",
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(controls.emptyControls()).toEqual(true);
    });

    it("should return false if buttons are pressed", () => {
      const controls = new Controls(controlCallbacks);
      const event = {
        code: KEYS.ORANGE,
        repeat: false
      };
      controls.toggleFromEvent(event, false);
      expect(controls.emptyControls()).toEqual(false);
    });
  });
});
