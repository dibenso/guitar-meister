import Game from "./game";
import TrackNotes from "./trackNotes";

export default class GuitarMeister {
  static start(trackNotes: TrackNotes): boolean {
    if (trackNotes.validate()) {
      const game = new Game(trackNotes);
      game.start(() => {
        alert("Game Over");
      });
      return true;
    } else {
      alert(
        `Malformed Track notes. Please ensure that this Track was created with the Track creation tool. Error: ${trackNotes.validationReason}`
      );
      return false;
    }
  }
}
