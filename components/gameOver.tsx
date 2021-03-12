import React from "react";

interface Props {
  score: number;
}

const GameOver: React.FunctionComponent<Props> = ({ score }: Props) => (
  <>
    <h1>Game Over!</h1>
    <h2>Score: {score}</h2>
    <audio id="game-over-audio">
      <source src="audio/boo.mp3" type="audio/mp3" />
    </audio>
  </>
);

export default GameOver;
