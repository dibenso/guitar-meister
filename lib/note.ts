import { NoteColor } from "./types";
import { NOTE_HIT_Y, RADIUS, CANVAS_HEIGHT } from "./constants";

// calculates the position of the note given time in seconds
// NOTE_HIT_Y === 420
function calculatePositionForTime(time: number) {
  return NOTE_HIT_Y - 200 * time;
}

export default class Note {
  private _position: number;
  private _hit: boolean;
  private _missed: boolean;
  readonly time: number;
  readonly color: NoteColor;
  readonly chord: boolean;

  constructor(time: number, color: NoteColor, chord: boolean) {
    this._position = calculatePositionForTime(time);
    this._hit = false;
    this._missed = false;
    this.time = time;
    this.color = color;
    this.chord = chord;
  }

  get position(): number {
    return this._position;
  }

  get hit(): boolean {
    return this._hit;
  }

  get missed(): boolean {
    return this._missed;
  }

  public onScreen(): boolean {
    return this.position + RADIUS >= 0.0;
  }

  public pastScreen(): boolean {
    return this.position - RADIUS >= CANVAS_HEIGHT;
  }

  public onNoteHit(): boolean {
    return this.position >= NOTE_HIT_Y - RADIUS && this.position <= NOTE_HIT_Y + RADIUS;
  }

  public pastNoteHit(): boolean {
    return this.position - RADIUS > NOTE_HIT_Y + RADIUS;
  }

  public updatePosition(): void {
    this._position += 4;
  }

  public setHit(): void {
    if (this.onNoteHit()) this._hit = true;
  }

  public setMissed(): void {
    this._missed = true;
  }
}
