import Note from "./note";
import Controls from "./controls";
import Track from "./track";

export default class Game {
  private _controls: Controls;
  private _track: Track;
  private _process: number;
  private _notesHit: number;
  private _notesMissed: number;
  private _badStrums: number;

  constructor(notes: Array<Note>) {
    this._controls = new Controls();
    this._track = new Track(notes);
    this._process = -1;
    this._notesHit = 0;
    this._notesMissed = 0;
    this._badStrums = 0;
  }

  start(): void {
    this._process = window.setInterval(() => {
      this._track.progress(
        this._controls,
        () => {
          this._notesHit++;
        },
        () => {
          this._notesHit += this._track.currentChord.length;
        },
        () => {
          this._notesMissed++;
        }
      );
    }, 20);
  }
}
