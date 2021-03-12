import React from "react";
import Link from "next/link";

interface Props {
  score: number;
}

const GameOver: React.FunctionComponent<Props> = ({ score }: Props) => (
  <div className="flex justify-center">
    <div className="text-center space-y-5 p-8 w-1/2 rounded-lg bg-gradient-to-b from-red-200 to-red-600">
      <h1 className="md:text-7xl">Game Over!</h1>
      <h2 className="md:text-4xl">Score: {score}</h2>
      <button className="rounded-lg px-8 py-4 bg-green-600 text-white font-extrabold animate-pulse">Try Again</button>
      <br />
      <Link href="/play">
        <p className="text-white cursor-pointer w-auto">Back to Track List</p>
      </Link>
      <audio id="game-over-audio">
        <source src="/audio/boo.mp3" type="audio/mp3" />
      </audio>
    </div>
  </div>
);

export default GameOver;
