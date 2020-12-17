import React, { Component } from "react";
import Head from "next/head";
import GuitarMeister from "../lib";
import Note from "../lib/note";
import TrackNotes from "../lib/trackNotes";
import { NoteColor } from "../lib/types";
import { DOM_IDS } from "../lib/constants";
import styles from "../styles/Home.module.css";

export default class Home extends Component {
  shouldComponentUpdate(): boolean {
    return false;
  }

  componentDidMount(): void {
    const notes: Array<Note> = [
      new Note(3.0, NoteColor.Green, false),
      new Note(3.5, NoteColor.Red, false),
      new Note(4.0, NoteColor.Red, true),
      new Note(4.0, NoteColor.Blue, false)
    ];
    const trackNotes = new TrackNotes(notes);
    GuitarMeister.start(trackNotes);
  }

  render(): JSX.Element {
    return (
      <div>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <audio id={DOM_IDS.AUDIO_PLAYER}>
          <source src="audio/song1.mp3" type="audio/mp3" />
          Your browser does not support HTML5 audio.
        </audio>
        <div className={styles.stack}>
          <video id={DOM_IDS.VIDEO_PLAYER} muted className={styles.videoPlayer}>
            <source src="video/video1.mp4" type="video/mp4" />
          </video>
          <canvas className="canvas-element" id={DOM_IDS.GAME_BACKGROUND_CANVAS} width="780" height="540"></canvas>
          <canvas className="canvas-element" id={DOM_IDS.GAME_CANVAS} width="780" height="540"></canvas>
        </div>
      </div>
    );
  }
}
