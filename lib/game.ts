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
  private _score: number;
  private _winLoss: number;

  constructor(notes: Array<Note>) {
    this._controls = new Controls();
    this._track = new Track(notes);
    this._process = -1;
    this._notesHit = 0;
    this._notesMissed = 0;
    this._badStrums = 0;
    this._score = 0;
    this._winLoss = 0;
  }

  start(gameOver: () => void): void {
    this._process = window.setInterval(() => {
      this._track.progress(
        this._controls,
        () => {
          this._notesHit++;
          this.increaseWinLoss();
        },
        () => {
          this._notesHit += this._track.currentChord.length;
          this.increaseWinLoss(this._track.currentChord.length);
        },
        () => {
          this._notesMissed++;
          this.decreaseWinLoss();
        }
      );

      if (this.isGameOver()) {
        this.clearProcess();
        gameOver();
      }
    }, 20);
  }

  private clearProcess(): void {
    clearInterval(this._process);
  }

  private isGameOver(): boolean {
    return this._winLoss <= -1.0;
  }

  private increaseWinLoss(times = 1): void {
    this._winLoss += this._winLoss >= 1.0 ? 0 : 0.05 * times;
  }

  private decreaseWinLoss(): void {
    this._winLoss -= 0.05;
  }
}
