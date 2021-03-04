import React, { Component } from "react";
import GamePlay from "../lib/game";
import { DOM_IDS } from "../lib/constants";
import Track from "../lib/track";
import TrackNotes from "../lib/trackNotes";
import track from "../tracks/toyStory";

interface Props {
  track: Track;
}

export default class Game extends Component<Props, unknown> {
  shouldComponentUpdate(): boolean {
    return false;
  }

  componentDidMount(): void {
    const trackNotes = new TrackNotes(track.notes);
    const gamePlay = new GamePlay(trackNotes, track.name, track.artist, track.audioSource, track.videoSource);
    gamePlay.start(() => alert("Game over"));
  }

  render(): JSX.Element {
    return (
      <div style={{ width: "100%" }}>
        <audio id={DOM_IDS.AUDIO_PLAYER}>
          <source src={`audio/${track.audioSource}`} type="audio/mp3" />
          Your browser does not support HTML5 audio.
        </audio>
        <div style={{ position: "absolute", verticalAlign: "middle", left: "22%" }}>
          <video id={DOM_IDS.VIDEO_PLAYER} style={{ width: "100%", height: 560 }} muted>
            <source src={`video/${track.videoSource}`} type="video/mp4" />
          </video>
          <canvas
            style={{ position: "absolute", verticalAlign: "middle", left: 0 }}
            id={DOM_IDS.GAME_BACKGROUND_CANVAS}
            width="740"
            height="540"></canvas>
          <canvas
            style={{ position: "absolute", verticalAlign: "middle", left: 0 }}
            id={DOM_IDS.GAME_CANVAS}
            width="740"
            height="540"></canvas>
        </div>
      </div>
    );
  }
}
