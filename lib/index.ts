import Game, { GameOptions } from "./game";
import Track from "./track";

export default class GuitarMeister {
  static start(track: Track, options: GameOptions = {}): boolean {
    if (track.notes.validate()) {
      const game = new Game(track, options);

      game.start();

      return true;
    } else {
      alert(
        `Malformed Track note(s). Please ensure that this Track was created with the Track creation tool. Error: ${track.notes.validationReasons}`
      );
      return false;
    }
  }
}
