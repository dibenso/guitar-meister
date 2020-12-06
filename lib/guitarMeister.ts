import Game from "./game";
import Note from "./note";

export default class GuitarMeister {
  static start(notes: Array<Note>): void {
    const game = new Game(notes);
    game.start(() => {
      alert("Game Over");
    });
  }
}
