import { Box } from "@mantine/core";
import React from "react";
import Bet from "./Bet";

const Footer = ({ setStart, isLandScape, gameOver, setBalance, balance, currentValue, bets, setBets }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isLandScape ? "row" : "column",
        borderRadius: "0.2rem",
        overflow: "hidden",
      }}
    >
      <Bet
        setStart={setStart}
        isLandScape={isLandScape}
        gameOver={gameOver}
        setBalance={setBalance}
        balance={balance}
        currentValue={currentValue}
        bets={bets}
        setBets={setBets}
      />
      <Bet
        setStart={setStart}
        isLandScape={isLandScape}
        gameOver={gameOver}
        setBalance={setBalance}
        balance={balance}
        currentValue={currentValue}
        bets={bets}
        setBets={setBets}
      />
    </Box>
  );
};

export default Footer;
