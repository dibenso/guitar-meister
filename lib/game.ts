import Note from "./note";
import Controls from "./controls";
import TrackNotes from "./trackNotes";
import Track from "./track";
import GameCanvas from "./canvas/game";
import BackgroundCanvas from "./canvas/background";
import { COLORS, DOM_IDS } from "./constants";
import { NoteColor } from "./types";

function chordHasColor(colors: Array<NoteColor>, color: NoteColor): boolean {
  for (const c of colors) {
    if (c === color) return true;
  }

  return false;
}

function buildBitChord(colors: Array<NoteColor>): number {
  let chord = 0;

  chord |= chordHasColor(colors, COLORS.GREEN) ? 1 << 1 : 0;
  chord |= chordHasColor(colors, COLORS.RED) ? 1 << 2 : 0;
  chord |= chordHasColor(colors, COLORS.YELLOW) ? 1 << 3 : 0;
  chord |= chordHasColor(colors, COLORS.BLUE) ? 1 << 4 : 0;
  chord |= chordHasColor(colors, COLORS.ORANGE) ? 1 << 5 : 0;

  return chord;
}

function keysMatchChord(chord: number, keys: Controls) {
  let keyChord = 0;

  keyChord |= keys.green ? 1 << 1 : 0;
  keyChord |= keys.red ? 1 << 2 : 0;
  keyChord |= keys.yellow ? 1 << 3 : 0;
  keyChord |= keys.blue ? 1 << 4 : 0;
  keyChord |= keys.orange ? 1 << 5 : 0;

  if (keyChord === chord) return true;
  else return false;
}

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

  constructor(track: Track) {
    this._gameCanvas = new GameCanvas();
    this._audioPlayer = <HTMLAudioElement>document.getElementById(DOM_IDS.AUDIO_PLAYER);
    this._videoPlayer = <HTMLVideoElement>document.getElementById(DOM_IDS.VIDEO_PLAYER);
    this._controls = new Controls();
    this._track = track;
    this._trackNotes = track.notes;
    this._backgroundCanvas = new BackgroundCanvas();
    this._duration = 0;
    this._process = -1;
    this._notesHit = 0;
    this._notesMissed = 0;
    this._badStrums = 0;
    this._score = 0;
    this._winLoss = 0;
    this._audioPlayer.onloadedmetadata = () => {
      this._duration = this._audioPlayer?.duration;
    };
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

  start(gameOver: () => void): void {
    this._backgroundCanvas.initialize();
    this.startAV();
    this._process = window.setInterval(() => {
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
        },
        () => {
          const colors = this._track.currentChord.map(note => note.color);
          const bitChord = buildBitChord(colors);

          if (keysMatchChord(bitChord, this._controls)) {
            for (const note of this._track.currentChord) {
              this.setNoteHit(note);
            }
          }
        },
        () => {
          this._notesMissed++;
          this.decreaseWinLoss();
        },
        (note: Note) => {
          this._gameCanvas.moveNote(note);
        },
        () => {
          this._gameCanvas.clearBottom();
        }
      );

      if (this.isGameOver()) {
        this.clearProcess();
        gameOver();
      }
    }, 20);

    document.addEventListener("keydown", event => {
      this.keyEventHandler(event, false);
    });

    document.addEventListener("keyup", event => {
      this.keyEventHandler(event, true);
    });
  }

  private keyEventHandler(event: KeyboardEvent, up: boolean): void {
    const { code, repeat } = event;

    if (up) this._controls.toggleFromEvent({ code, repeat }, true, this.badStrumCallback.bind(this));
    else this._controls.toggleFromEvent({ code, repeat }, false, this.badStrumCallback.bind(this));
  }

  private badStrumCallback(): void {
    if ((!this._track.anyNoteValid && this._controls.strum) || (this._controls.emptyControls() && this._controls.strum))
      this._badStrums++;
  }

  private setNoteHit(note: Note): void {
    note.setHit();
    this._notesHit++;
    this._score += 10;
    this.increaseWinLoss();
    this.logData();
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

  private logData(): void {
    console.log(
      `Score: ${this._score}\nNotes hit: ${this._notesHit}\nNotes missed: ${this._notesMissed}\nBad strums: ${this._badStrums}`
    );
  }
}
