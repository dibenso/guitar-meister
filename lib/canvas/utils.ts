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

export function clearCircle(x: number, y: number, context: CanvasRenderingContext2D): void {
  context.clearRect(x - RADIUS - 5, y - RADIUS - 5, RADIUS * 2 + 15, RADIUS * 2 + 15);
}
