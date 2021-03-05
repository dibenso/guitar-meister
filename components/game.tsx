import React, { useState, useEffect } from "react";
import GamePlay from "../lib/game";
import { DOM_IDS } from "../lib/constants";
import Track from "../lib/track";
import TrackNotes from "../lib/trackNotes";

interface Props {
  track: Track;
}

const Game: React.FunctionComponent<Props> = ({ track }: Props) => {
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    if (gameStarted) {
      const trackNotes = new TrackNotes(track.notes);
      const gamePlay = new GamePlay(trackNotes, track.name, track.artist, track.audioSource, track.videoSource);
      gamePlay.start(() => {
        setGameStarted(false);
        alert("Game over");
      });
    }
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
