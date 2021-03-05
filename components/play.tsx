import React, { Component } from "react";
import Downshift from "downshift";
import { connect, ConnectedProps } from "react-redux";
import Game from "./game";
import { RootState } from "../store";
import * as gameActions from "../store/actions/game";
import Track from "../lib/track";

const mapStateToProps = (state: RootState) => {
  const { tracks } = state.tracks;
  const { track } = state.game;

  return { tracks, selectedTrack: track };
};
const mapDispatchToProps = {
  setTrack: (track: Track) => gameActions.setTrack(track)
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type Props = ConnectedProps<typeof connector>;

class Play extends Component<Props, unknown> {
  render(): JSX.Element {
    const { tracks, selectedTrack, setTrack } = this.props;

    return (
      <>
        {selectedTrack ? (
          <Game track={selectedTrack} />
        ) : (
          <Downshift
            onChange={selection => setTrack(selection)}
            itemToString={item => (item ? `Song: ${item.name} - By: ${item.artist}` : "")}>
            {({ getItemProps, getLabelProps, getMenuProps, selectedItem }) => (
              <div>
                <label {...getLabelProps()}>Select A Track</label>
                <ul {...getMenuProps()}>
                  {tracks.map((item, index) => (
                    <li
                      key={index}
                      {...getItemProps({
                        key: index,
                        index,
                        item,
                        style: {
                          textAlign: "center",
                          backgroundColor: selectedItem === item ? "yellow" : "lightgray"
                        }
                      })}>
                      <p>{item.name}</p>
                      <p>By: {item.artist}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Downshift>
        )}
      </>
    );
  }
}

export default connector(Play);
