import Controls from "../../lib/controls";

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
});
