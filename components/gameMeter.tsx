import React from "react";
import { motion } from "framer-motion";

interface Props {
  winLoss: number;
  gameOver: boolean;
}

const meterColor = (winLoss: number) => {
  if (winLoss >= 0.65) return "green";
  if (winLoss >= 0.3) return "yellow";

  return "red";
};

const GameMeter: React.FunctionComponent<Props> = ({ winLoss, gameOver }: Props) => (
  <div style={{ position: "relative", width: 100, height: 400, border: "5px solid black", marginLeft: 15 }}>
    <motion.div
      animate={{
        position: "absolute",
        bottom: 0,
        width: 95,
        height: 400,
        visibility: gameOver ? "hidden" : "visible",
        backgroundColor: meterColor(winLoss),
        scaleY: winLoss
      }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

export default GameMeter;
