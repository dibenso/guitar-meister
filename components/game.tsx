import React, { useState, useEffect } from "react";
import GameMeter from "./gameMeter";
import GuitarMeister from "../lib";
import { GameOptions } from "../lib/types";
import Track from "../lib/track";
import { DOM_IDS } from "../lib/constants";

interface Props {
  track: Track;
}

const Game: React.FunctionComponent<Props> = ({ track }: Props) => {
  const [gameStarted, setGameStarted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [winLoss, setWinLoss] = useState(0.5);
  const [gameOver, setGameOver] = useState(false);
  const options: GameOptions = {
    onNoteHit: () => console.log("Note hit"),
    onChordHit: () => console.log("Chord hit"),
    onMissed: () => console.log("Note missed"),
    onBadStrum: () => console.log("Bad strum"),
    onGameOver: () => {
      const gameOverAudio = document.getElementById("game-over-audio") as HTMLAudioElement;

      gameOverAudio?.play();
      setGameOver(true);
      alert("Game over");
    },
    onPause: () => {
      setPaused(true);

      const canvas = document.getElementById("pause-screen") as HTMLCanvasElement;
      const context = canvas.getContext("2d");

      if (context) {
        context.font = "30px Arial";
        context.fillStyle = "white";
        context.textAlign = "center";
        context.fillText("Paused", canvas.width / 2, canvas.height / 2);
      }
    },
    onResume: () => setPaused(false),
    onScoreChange: currentScore => setScore(currentScore),
    onProgress: winLoss => setWinLoss(winLoss)
  };

  useEffect(() => {
    if (gameStarted)
      if (!GuitarMeister.start(track, options))
        // dont start game if track notes are invalid
        setGameStarted(false);
  }, [gameStarted]);

  return (
    <>
      {gameStarted ? (
        <>
          <h2>{`Score: ${score}`}</h2>
          <GameMeter winLoss={winLoss} gameOver={gameOver} />
          <audio id={DOM_IDS.AUDIO_PLAYER}>
            <source src={`audio/${track.audioSource}`} type="audio/mp3" />
            Your browser does not support HTML5 audio.
          </audio>
          <audio id="game-over-audio">
            <source src="audio/boo.mp3" type="audio/mp3" />
          </audio>
          <div id="stack">
            <video autoPlay muted id={DOM_IDS.VIDEO_PLAYER} width="780" height="540">
              <source src={`video/${track.videoSource}`} type="video/mp4" />
            </video>
            <canvas id={DOM_IDS.GAME_BACKGROUND_CANVAS} width="780" height="540"></canvas>
            <canvas id={DOM_IDS.GAME_CANVAS} width="780" height="540"></canvas>
            {paused && <canvas id="pause-screen" width="780" height="540"></canvas>}
          </div>
        </>
      ) : (
        <button onClick={() => setGameStarted(true)}>Start Game</button>
      )}
    </>
  );
};

export default Game;
