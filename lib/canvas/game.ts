import { DOM_IDS } from "../constants";

export default class GameCanvas {
  private _context: CanvasRenderingContext2D | null;

  constructor() {
    const canvas = <HTMLCanvasElement>document.getElementById(DOM_IDS.GAME_CANVAS);
    this._context = canvas.getContext("2d");
  }
}
