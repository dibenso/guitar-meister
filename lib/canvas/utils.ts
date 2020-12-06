import { NoteColor } from "../types";
import { RADIUS, COLORS } from "../constants";

export function drawCircle(x: number, y: number, color: NoteColor, context: CanvasRenderingContext2D): void {
  context.beginPath();
  context.arc(x, y, RADIUS, 0, 2 * Math.PI);
  context.fillStyle = color;
  context.fill();
  context.strokeStyle = COLORS.WHITE;
  context.lineWidth = 2;
  context.stroke();
}
