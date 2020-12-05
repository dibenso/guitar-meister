import Controls from "../../lib/controls";
import { ControlEvent } from "../../lib/types";
import { KEYS } from "../../lib/constants";

describe("Controls", () => {
  describe("constructor", () => {
    it("should create a new Controls object", () => {
      const controls = new Controls();
      expect(controls).toBeInstanceOf(Controls);
    });

    it("should set all control colors and strum to false during initialization", () => {
      const controls = new Controls();
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
      const controls = new Controls();
      const event = {
        code: KEYS.YELLOW,
        repeat: false
      };
      controls.toggleFromEvent(event, false, () => {
        return false;
      });
      expect(controls.yellow).toEqual(true);
    });

    it("should set a button property to true if it is held down (repeat is true)", () => {
      const controls = new Controls();
      const event = {
        code: KEYS.YELLOW,
        repeat: true
      };
      controls.toggleFromEvent(event, false, () => {
        return false;
      });
      expect(controls.yellow).toEqual(true);
    });

    it("should set a button property to false if it is released (up is true)", () => {
      const controls = new Controls();
      const event = {
        code: KEYS.YELLOW,
        repeat: false
      };
      controls.toggleFromEvent(event, true, () => {
        return false;
      });
      expect(controls.yellow).toEqual(false);
    });
  });

  describe("green", () => {
    it("should return a boolean indicating if the green button is currently pressed", () => {
      const controls = new Controls();
      const event = {
        code: KEYS.GREEN,
        repeat: false
      };
      controls.toggleFromEvent(event, false, () => {
        return false;
      });
      expect(controls.green).toEqual(true);
    });
  });

  describe("red", () => {
    it("should return a boolean indicating if the red button is currently pressed", () => {
      const controls = new Controls();
      const event = {
        code: KEYS.RED,
        repeat: false
      };
      controls.toggleFromEvent(event, false, () => {
        return false;
      });
      expect(controls.red).toEqual(true);
    });
  });

  describe("yellow", () => {
    it("should return a boolean indicating if the yellow button is currently pressed", () => {
      const controls = new Controls();
      const event = {
        code: KEYS.YELLOW,
        repeat: false
      };
      controls.toggleFromEvent(event, false, () => {
        return false;
      });
      expect(controls.yellow).toEqual(true);
    });
  });

  describe("blue", () => {
    it("should return a boolean indicating if the blue button is currently pressed", () => {
      const controls = new Controls();
      const event = {
        code: KEYS.BLUE,
        repeat: false
      };
      controls.toggleFromEvent(event, false, () => {
        return false;
      });
      expect(controls.blue).toEqual(true);
    });
  });

  describe("orange", () => {
    it("should return a boolean indicating if the orange button is currently pressed", () => {
      const controls = new Controls();
      const event = {
        code: KEYS.ORANGE,
        repeat: false
      };
      controls.toggleFromEvent(event, false, () => {
        return false;
      });
      expect(controls.orange).toEqual(true);
    });
  });

  describe("strum", () => {
    it("should return a boolean indicating if the strum button is currenly pressed", () => {
      const controls = new Controls();
      const event = {
        code: KEYS.STRUM,
        repeat: false
      };
      controls.toggleFromEvent(event, false, () => {
        return false;
      });
      expect(controls.strum).toEqual(true);
    });

    it("should be false when the strum button is held down (repeated is true)", () => {
      const controls = new Controls();
      const event = {
        code: KEYS.STRUM,
        repeat: false
      };
      controls.toggleFromEvent(event, true, () => {
        return false;
      });
      expect(controls.strum).toEqual(false);
    });
  });

  describe("emptyControls", () => {
    it("should return true if no buttons are pressed", () => {
      const controls = new Controls();
      expect(controls.emptyControls()).toEqual(true);
      const event = {
        code: KEYS.ORANGE,
        repeat: false
      };
      controls.toggleFromEvent(event, false, () => {
        return false;
      });
      expect(controls.emptyControls()).toEqual(false);
    });
  });
});
