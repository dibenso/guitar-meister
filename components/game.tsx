import React, { useState, useEffect } from "react";
import GuitarMeister from "../lib";
import { GameOptions } from "../lib/game";
import Track from "../lib/track";
import { DOM_IDS } from "../lib/constants";

interface Props {
  track: Track;
}

const options: GameOptions = {
  onNoteHit: () => console.log("Note hit"),
  onChordHit: () => console.log("Chord hit"),
  onMissed: () => console.log("Note missed"),
  onBadStrum: () => console.log("Bad strum")
};

const Game: React.FunctionComponent<Props> = ({ track }: Props) => {
  const [gameStarted, setGameStarted] = useState(false);

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
          <audio id={DOM_IDS.AUDIO_PLAYER}>
            <source src={`audio/${track.audioSource}`} type="audio/mp3" />
            Your browser does not support HTML5 audio.
          </audio>
          <div id="stack">
            <video autoPlay muted id={DOM_IDS.VIDEO_PLAYER} width="780" height="540">
              <source src={`video/${track.videoSource}`} type="video/mp4" />
            </video>
            <canvas id={DOM_IDS.GAME_BACKGROUND_CANVAS} width="780" height="540"></canvas>
            <canvas id={DOM_IDS.GAME_CANVAS} width="780" height="540"></canvas>
          </div>
        </>
      ) : (
        <button onClick={() => setGameStarted(true)}>Start Game</button>
      )}
    </>
  );
};

export default Game;
