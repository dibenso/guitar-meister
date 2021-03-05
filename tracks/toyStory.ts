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
  new Note(5.02, NoteColor.Red, false),
  new Note(5.52, NoteColor.Red, false),
  new Note(6.02, NoteColor.Red, false),
  new Note(6.52, NoteColor.Red, false),
  new Note(7.02, NoteColor.Red, false),
  new Note(7.52, NoteColor.Red, false),
  new Note(8.02, NoteColor.Red, false),
  new Note(8.52, NoteColor.Red, false),
  new Note(9.02, NoteColor.Red, false),
  new Note(9.52, NoteColor.Red, false),
  new Note(10.02, NoteColor.Red, false),
  new Note(10.52, NoteColor.Red, false),
  new Note(11.02, NoteColor.Red, false),
  new Note(11.52, NoteColor.Red, false),
  new Note(12.02, NoteColor.Red, false),
  new Note(12.52, NoteColor.Red, false),
  new Note(13.02, NoteColor.Red, false),
  new Note(13.52, NoteColor.Red, false),
  new Note(14.02, NoteColor.Red, false),
  new Note(14.52, NoteColor.Red, false),
  new Note(15.02, NoteColor.Red, false),
  new Note(15.52, NoteColor.Red, false),
  new Note(16.02, NoteColor.Red, false),
  new Note(16.52, NoteColor.Red, false),
  new Note(17.02, NoteColor.Red, false)
];
const trackNotes = new TrackNotes(notes);
const track = new Track(trackNotes, "You've Got a Friend In Me", "Randy Newman", "toyStory.mp3", "toyStory.mp4");

export default track;
