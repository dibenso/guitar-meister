import TrackNotes from "./trackNotes";
import Note from "./note";
import Controls from "./controls";
import GameCanvas from "./canvas/game";
import { DOM_IDS } from "./constants";

export default class Track {
  private _gameCanvas: GameCanvas;
  private _audioPlayer: HTMLAudioElement | null;
  private _videoPlayer: HTMLVideoElement | null;
  private _notes: Array<Note>;
  private _currentChord: Array<Note>;
  private _duration: number | undefined;
  private _anyValidNote: boolean;

  constructor(trackNotes: TrackNotes) {
    this._gameCanvas = new GameCanvas();
    this._audioPlayer = <HTMLAudioElement>document.getElementById(DOM_IDS.AUDIO_PLAYER);
    this._videoPlayer = <HTMLVideoElement>document.getElementById(DOM_IDS.VIDEO_PLAYER);
    this._notes = trackNotes.notes;
    this._duration = 0;
    this._currentChord = [];
    this._anyValidNote = false;
    this._audioPlayer.onloadedmetadata = () => {
      this._duration = this._audioPlayer?.duration;
    };
  }

  get currentChord(): Array<Note> {
    return this._currentChord;
  }

  get anyNoteValid(): boolean {
    return this._anyValidNote;
  }

  get duration(): number | undefined {
    return this._duration;
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

  progress(
    controls: Controls,
    validNoteHit: (note: Note) => void,
    validChordHit: () => void,
    missed: () => void
  ): void {
    let anyNoteValid = false;
    this._currentChord = [];

    for (const note of this._notes) {
      this._gameCanvas.clearBottom();

      if (note.onNoteHit()) anyNoteValid = true;
      if (!note.pastScreen()) note.updatePosition();
      if (note.onScreen()) this._gameCanvas.moveNote(note);
      if (!note.hit && !note.missed && note.pastNoteHit()) {
        note.setMissed();
        missed();
      }
      if (note.onNoteHit && note.chord && !note.hit && !note.missed) this._currentChord.push(note);
      else if (note.onNoteHit() && controls.strum && !note.hit && !note.missed) validNoteHit(note);
    }

    this._anyValidNote = anyNoteValid;

    if (this._currentChord.length > 0 && controls.strum) validChordHit();
  }
}
