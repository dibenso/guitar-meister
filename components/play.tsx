import React, { Component } from "react";
import Downshift from "downshift";
import { connect, ConnectedProps } from "react-redux";
import { RootState } from "../store";

const mapStateToProps = (state: RootState) => {
  const { tracks } = state.tracks;
  console.log(tracks);
  return { tracks };
};

const connector = connect(mapStateToProps);
type Props = ConnectedProps<typeof connector>;

class Play extends Component<Props, unknown> {
  render(): JSX.Element {
    const { tracks } = this.props;

    return (
      <Downshift
        onChange={selection =>
          alert(selection ? `You selected ${selection.name}\nBy: ${selection.artist}` : "Selection Cleared")
        }
        itemToString={item => (item ? item.value : "")}>
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
                      backgroundColor: selectedItem === item ? "lightgray" : "white"
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
    );
  }
}

export default connector(Play);
