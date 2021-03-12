import { NoteColor } from "../lib/types";

interface SerializedNote {
  time: number;
  color: NoteColor;
  chord: boolean;
}

export interface SerializedTrack {
  notes: Array<SerializedNote>;
  name: string;
  artist: string;
  audioSource: string;
  videoSource: string;
}
