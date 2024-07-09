import { Box } from "@mantine/core";
import React from "react";
import Bet from "./Bet";

const Footer = ({ setStart, isLandScape, gameOver, setBalance, balance, currentValue, bets, setBets, investory, setInvestory, wins, setWins, loses, setLoses, coinsRef, coins2Ref, audioPermission, prevValue ,gameState,isPlaying,currentMultiplier,currentUser,isGoingDown,casinoConfigurationData}) => {
  return (
    <Box
    style={{
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
        investory={investory}
        setInvestory={setInvestory}
        wins={wins}
        setWins={setWins}
        loses={loses}
        setLoses={setLoses}
        lottieRef={coinsRef}
        audioPermission={audioPermission}
        prevValue={prevValue}
        gameState={gameState}
        isPlaying={isPlaying}
        currentMultiplier={currentMultiplier}
        currentUser={currentUser}
        isGoingDown={isGoingDown}
        casinoConfigurationData={casinoConfigurationData}
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
        investory={investory}
        setInvestory={setInvestory}
        wins={wins}
        setWins={setWins}
        loses={loses}
        setLoses={setLoses}
        lottieRef={coins2Ref}
        audioPermission={audioPermission}
        prevValue={prevValue}
        gameState={gameState}
        isPlaying={isPlaying}
        currentMultiplier={currentMultiplier}
        currentUser={currentUser}
        isGoingDown={isGoingDown}
        casinoConfigurationData={casinoConfigurationData}

      />
    </Box>
  );
};

export default Footer;
