import React from "react";

interface Props {
  winLoss: number;
}

const meterColor = (winLoss: number) => {
  if (winLoss >= 0.65) return "green";
  if (winLoss >= 0.3) return "yellow";

  return "red";
};

const GameMeter: React.FunctionComponent<Props> = ({ winLoss }: Props) => (
  <div style={{ height: 100, width: 100 }}>
    <div
      className="absolute bottom-0 left-0 w-full"
      style={{ height: `${100 * winLoss}%`, backgroundColor: meterColor(winLoss) }}
    />
  </div>
);

export default GameMeter;
