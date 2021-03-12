import React from "react";
import { COLORS } from "../lib/constants";

interface Props {
  winLoss: number;
  gameOver: boolean;
}

const meterColor = (winLoss: number) => {
  if (winLoss >= 0.65) return COLORS.GREEN;
  if (winLoss >= 0.3) return COLORS.YELLOW;

  return COLORS.RED;
};

const GameMeter: React.FunctionComponent<Props> = ({ winLoss, gameOver }: Props) => (
  <div style={{ position: "relative", width: 100, height: 409, border: "5px solid black", marginLeft: 15 }}>
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 91,
        height: 400 * winLoss,
        visibility: gameOver ? "hidden" : "visible",
        backgroundColor: meterColor(winLoss)
      }}
    />
  </div>
);

export default GameMeter;
