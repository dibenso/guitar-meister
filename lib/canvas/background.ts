import { drawCircle } from "./utils";
import { DOM_IDS, CANVAS_WIDTH, CANVAS_HEIGHT, COLORS, NOTE_HIT_X, NOTE_HIT_Y } from "../constants";

export default class BackgroundCanvas {
  private _context: CanvasRenderingContext2D | null;

  constructor() {
    const canvas = <HTMLCanvasElement>document.getElementById(DOM_IDS.GAME_BACKGROUND_CANVAS);
    this._context = canvas.getContext("2d");
  }

  initialize(): void {
    if (this._context) {
      this._context.beginPath();
      this._context.rect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      this._context.fillStyle = COLORS.BLACK;
      this._context.globalAlpha = 0.5;
      this._context.fill();
      drawCircle(NOTE_HIT_X, NOTE_HIT_Y, COLORS.GREEN, this._context);
      drawCircle(NOTE_HIT_X + 150, NOTE_HIT_Y, COLORS.RED, this._context);
      drawCircle(NOTE_HIT_X + 300, NOTE_HIT_Y, COLORS.YELLOW, this._context);
      drawCircle(NOTE_HIT_X + 450, NOTE_HIT_Y, COLORS.BLUE, this._context);
      drawCircle(NOTE_HIT_X + 600, NOTE_HIT_Y, COLORS.ORANGE, this._context);
    }
  }
}
