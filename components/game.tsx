import React, { Component } from "react";
import GamePlay from "../lib/game";
import { DOM_IDS } from "../lib/constants";
import Track from "../lib/track";
import TrackNotes from "../lib/trackNotes";
import track from "../tracks/toyStory";

interface Props {
  track: Track;
}

interface State {
  gameStarted: boolean;
}

export default class Game extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      gameStarted: false
    };
  }

  componentDidUpdate(): void {
    if (this.state.gameStarted) {
      const trackNotes = new TrackNotes(track.notes);
      const gamePlay = new GamePlay(trackNotes, track.name, track.artist, track.audioSource, track.videoSource);
      gamePlay.start(() => {
        this.setState({ gameStarted: false });
        alert("Game over");
      });
    }
  }

  render(): JSX.Element {
    return (
      <>
        {this.state.gameStarted ? (
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
          <button className="btn" onClick={() => this.setState({ gameStarted: true })}>
            Start Game
          </button>
        )}
      </>
    );
  }
}
