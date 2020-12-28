import TrackNotes from "./trackNotes";
import Note from "./note";
import Controls from "./controls";

export default class Track {
  private _notes: Array<Note>;
  private _currentChord: Array<Note>;
  private _anyValidNote: boolean;
  private _name: string;
  private _audioSource: string;
  private _videoSource: string;

  constructor(trackNotes: TrackNotes, name: string, audioSource: string, videoSource: string) {
    this._notes = trackNotes.notes;
    this._currentChord = [];
    this._anyValidNote = false;
    this._name = name;
    this._audioSource = audioSource;
    this._videoSource = videoSource;
  }

  get name(): string {
    return this._name;
  }

  get audioSource(): string {
    return this._audioSource;
  }

  get videoSource(): string {
    return this._videoSource;
  }

  get currentChord(): Array<Note> {
    return this._currentChord;
  }

  get anyNoteValid(): boolean {
    return this._anyValidNote;
  }

  progress(
    controls: Controls,
    validNoteHit: (note: Note) => void,
    validChordHit: () => void,
    missed: () => void,
    moveNote: (note: Note) => void,
    clearBottom: () => void
  ): void {
    let anyNoteValid = false;
    this._currentChord = [];

    for (const note of this._notes) {
      clearBottom();

      if (note.onNoteHit()) anyNoteValid = true;
      if (!note.pastScreen()) note.updatePosition();
      if (note.onScreen()) moveNote(note);
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
