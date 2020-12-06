import Note from "../note";
import { drawCircle, clearCircle } from "./utils";
import { DOM_IDS, CANVAS_HEIGHT, CANVAS_WIDTH, COLORS, NOTE_HIT_X } from "../constants";

export default class GameCanvas {
  private _context: CanvasRenderingContext2D;

  constructor() {
    const canvas = <HTMLCanvasElement>document.getElementById(DOM_IDS.GAME_CANVAS);
    this._context = canvas.getContext("2d") || new CanvasRenderingContext2D();
  }

  moveNote(note: Note): void {
    switch (note.color) {
      case COLORS.GREEN:
        clearCircle(NOTE_HIT_X, note.position, this._context);
        drawCircle(NOTE_HIT_X, note.position, COLORS.GREEN, this._context);
        break;
      case COLORS.RED:
        clearCircle(NOTE_HIT_X + 150, note.position, this._context);
        drawCircle(NOTE_HIT_X + 150, note.position, COLORS.RED, this._context);
        break;
      case COLORS.YELLOW:
        clearCircle(NOTE_HIT_X + 300, note.position, this._context);
        drawCircle(NOTE_HIT_X + 300, note.position, COLORS.YELLOW, this._context);
        break;
      case COLORS.BLUE:
        clearCircle(NOTE_HIT_X + 450, note.position, this._context);
        drawCircle(NOTE_HIT_X + 450, note.position, COLORS.BLUE, this._context);
        break;
      case COLORS.ORANGE:
        clearCircle(NOTE_HIT_X + 600, note.position, this._context);
        drawCircle(NOTE_HIT_X + 600, note.position, COLORS.ORANGE, this._context);
        break;
      default:
        throw "Unknown note color given to drawNote: " + note.color;
        break;
    }
  }

  clearBottom(): void {
    this._context.clearRect(0, CANVAS_HEIGHT - 5, CANVAS_WIDTH, 10);
  }
}
