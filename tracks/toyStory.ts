import Note from "../lib/note";
import TrackNotes from "../lib/trackNotes";
import Track from "../lib/track";
import { NoteColor } from "../lib/types";

const notes = [
  new Note(2.55, NoteColor.Green, false),
  new Note(3.1, NoteColor.Green, false),
  new Note(3.7, NoteColor.Green, false),
  new Note(4.2, NoteColor.Red, false),
  new Note(4.65, NoteColor.Green, false),
  new Note(5.02, NoteColor.Red, false)
];
const trackNotes = new TrackNotes(notes);
const track = new Track(trackNotes, "You've Got a Friend In Me", "Randy Newman", "toyStory.mp3", "toyStory.mp4");

export default track;
