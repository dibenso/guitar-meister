import Note from "./note";
import GameCanvas from "./canvas/game";
import { DOM_IDS } from "./constants";

export default class Track {
  private _gameCanvas: GameCanvas;
  private _audioPlayer: HTMLAudioElement | null;
  private _notes: Array<Note>;
  private _currentChord: Array<Note>;
  private _duration: number | undefined;

  constructor(notes: Array<Note>) {
    this._gameCanvas = new GameCanvas();
    this._audioPlayer = <HTMLAudioElement>document.getElementById(DOM_IDS.AUDIO_PLAYER);
    this._notes = notes;
    this._duration = 0;
    this._currentChord = [];
    this._audioPlayer.onloadedmetadata = () => {
      this._duration = this._audioPlayer?.duration;
    };
  }

  get currentChord(): Array<Note> {
    return this._currentChord;
  }

  progress(): void {
    for (const note of this._notes) {
      this._gameCanvas.clearBottom();

      if (!note.pastScreen()) note.updatePosition();
      if (note.onScreen()) this._gameCanvas.moveNote(note);
      if (!note.hit && !note.missed && note.pastNoteHit()) note.setMissed();
      if (note.onNoteHit && note.chord && !note.hit && !note.missed) this._currentChord.push(note);
    }
  }
}
