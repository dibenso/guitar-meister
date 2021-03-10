import Note from "./note";
import Controls from "./controls";
import TrackNotes from "./trackNotes";
import Track from "./track";
import GameCanvas from "./canvas/game";
import BackgroundCanvas from "./canvas/background";
import { buildBitChord, keysMatchChord } from "./utils";
import { GameOptions } from "./types";
import { COLORS, DOM_IDS } from "./constants";

export default class Game {
  private _gameCanvas: GameCanvas;
  private _audioPlayer: HTMLAudioElement | null;
  private _videoPlayer: HTMLVideoElement | null;
  private _controls: Controls;
  private _trackNotes: TrackNotes;
  private _track: Track;
  private _backgroundCanvas: BackgroundCanvas;
  private _process: number;
  private _notesHit: number;
  private _notesMissed: number;
  private _badStrums: number;
  private _score: number;
  private _winLoss: number;
  private _duration: number | undefined;
  private _paused: boolean;
  private _options: GameOptions;

  constructor(track: Track, options: GameOptions = {}) {
    this._gameCanvas = new GameCanvas();
    this._audioPlayer = <HTMLAudioElement>document.getElementById(DOM_IDS.AUDIO_PLAYER);
    this._videoPlayer = <HTMLVideoElement>document.getElementById(DOM_IDS.VIDEO_PLAYER);
    this._track = track;
    this._trackNotes = track.notes;
    this._backgroundCanvas = new BackgroundCanvas();
    this._duration = 0;
    this._process = -1;
    this._notesHit = 0;
    this._notesMissed = 0;
    this._badStrums = 0;
    this._score = 0;
    this._winLoss = 0.5;
    this._paused = false;
    this._controls = new Controls({
      onBadStrum: this.badStrumCallback.bind(this),
      onPause: this.pauseCallback.bind(this)
    });
    this._audioPlayer.onloadedmetadata = () => {
      this._duration = this._audioPlayer?.duration;
    };
    this._options = options;
  }

  startAudio(): void {
    this._audioPlayer?.play();
  }

  startVideo(): void {
    this._videoPlayer?.play();
  }

  startAV(): void {
    this.startAudio();
    this.startVideo();
  }

  pause(): void {
    this._paused = true;
    this._audioPlayer?.pause();
    this._videoPlayer?.pause();

    if (this._options.onPause) this._options.onPause();
  }

  resume(): void {
    this._paused = false;
    this._audioPlayer?.play();
    this._videoPlayer?.play();

    if (this._options.onResume) this._options.onResume();
  }

  start(): void {
    const { onNoteHit, onChordHit, onMissed, onGameOver } = this._options;

    this._backgroundCanvas.initialize();
    this.startAV();

    const interval = 20;
    let then = Date.now();

    const loop = () => {
      this._process = window.requestAnimationFrame(loop);

      const now = Date.now();
      const elapsed = now - then;

      if (elapsed > interval && !this._paused) {
        then = now - (elapsed % interval);

        this._track.progress(
          this._controls,
          note => {
            switch (note.color) {
              case COLORS.GREEN:
                if (
                  this._controls.green &&
                  !this._controls.red &&
                  !this._controls.yellow &&
                  !this._controls.blue &&
                  !this._controls.orange
                )
                  this.setNoteHit(note);
                break;
              case COLORS.RED:
                if (this._controls.red && !this._controls.yellow && !this._controls.blue && !this._controls.orange)
                  this.setNoteHit(note);
                break;
              case COLORS.YELLOW:
                if (this._controls.yellow && !this._controls.blue && !this._controls.orange) this.setNoteHit(note);
                break;
              case COLORS.BLUE:
                if (this._controls.blue && !this._controls.orange) this.setNoteHit(note);
                break;
              case COLORS.ORANGE:
                if (this._controls.orange) this.setNoteHit(note);
                break;
            }

            if (onNoteHit) onNoteHit(note);
          },
          () => {
            const colors = this._track.currentChord.map(note => note.color);
            const bitChord = buildBitChord(colors);

            if (keysMatchChord(bitChord, this._controls)) {
              for (const note of this._track.currentChord) {
                this.setNoteHit(note);
              }
            }

            if (onChordHit) onChordHit(this._track.currentChord);
          },
          note => {
            this._notesMissed++;
            this.decreaseWinLoss();

            if (onMissed) onMissed(note);
          },
          (note: Note) => this._gameCanvas.moveNote(note),
          () => this._gameCanvas.clearBottom()
        );

        if (this.isGameOver()) {
          this.clearProcess();
          this._audioPlayer?.pause();
          this._videoPlayer?.pause();

          if (onGameOver) onGameOver();
        }

        if (this._options.onProgress) this._options.onProgress(this._winLoss);
      }
    };

    window.requestAnimationFrame(loop);

    document.addEventListener("keydown", event => {
      event.preventDefault();

      this.keyEventHandler(event, false);
    });

    document.addEventListener("keyup", event => {
      event.preventDefault();

      this.keyEventHandler(event, true);
    });
  }

  private keyEventHandler(event: KeyboardEvent, up: boolean): void {
    const { code, repeat } = event;

    if (up) this._controls.toggleFromEvent({ code, repeat }, true);
    else this._controls.toggleFromEvent({ code, repeat }, false);
  }

  private badStrumCallback(): void {
    if (
      (!this._track.anyNoteValid && this._controls.strum) ||
      (this._controls.emptyControls() && this._controls.strum)
    ) {
      this._badStrums++;

      if (this._options.onBadStrum) this._options.onBadStrum();
    }
  }

  private pauseCallback(): void {
    if (!this.isGameOver()) this._paused ? this.resume() : this.pause();
  }

  private setNoteHit(note: Note): void {
    note.setHit();
    this._notesHit++;
    this._score += 10;
    this.increaseWinLoss();

    if (this._options.onScoreChange) this._options.onScoreChange(this._score);
  }

  private clearProcess(): void {
    window.cancelAnimationFrame(this._process);
  }

  private isGameOver(): boolean {
    return this._winLoss <= 0;
  }

  private increaseWinLoss(times = 1): void {
    this._winLoss += this._winLoss >= 1.0 ? 0 : 0.05 * times;
  }

  private decreaseWinLoss(): void {
    this._winLoss -= 0.05;
  }

  private logData(): void {
    console.log(
      `Score: ${this._score}\nNotes hit: ${this._notesHit}\nNotes missed: ${this._notesMissed}\nBad strums: ${this._badStrums}`
    );
  }
}
