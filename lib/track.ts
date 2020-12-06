import Note from "./note";
import GameCanvas from "./canvas/game";
import { DOM_IDS } from "./constants";

export default class Track {
  private _gameCanvas: GameCanvas;
  private _audioPlayer: HTMLAudioElement | null;
  private _notes: Array<Note>;
  private _duration: number | undefined;

  constructor(notes: Array<Note>) {
    this._gameCanvas = new GameCanvas();
    this._audioPlayer = <HTMLAudioElement>document.getElementById(DOM_IDS.AUDIO_PLAYER);
    this._notes = notes;
    this._duration = 0;
    this._audioPlayer.onloadedmetadata = () => {
      this._duration = this._audioPlayer?.duration;
    };
  }
}
