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
  <motion.div
    animate={{
      width: 100,
      height: 400,
      visibility: gameOver ? "hidden" : "visible",
      backgroundColor: meterColor(winLoss),
      scaleY: winLoss
    }}
    transition={{ duration: 0.5 }}
  />
);

export default GameMeter;
