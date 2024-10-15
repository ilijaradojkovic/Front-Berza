import { Box, Button, Switch, Text, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";
import success from "../assets/sounds/coins.wav";
import {
  IdentitySerializer,
  JsonSerializer,
  RSocketClient,
} from "rsocket-core";
import RSocketWebSocketClient from "rsocket-websocket-client";
import {
  isFinishedState,
  isStartedState,
  isWaitingState,
} from "./util/game-state";
import { showErrorNotification } from "./util/notificationSystem";
import { grayColor, greenColor, redColor } from "../colors/colors";
import {
  connectToCancelBet,
  connectToCashInBet,
  connectToCashOutBet,
} from "../communication/socket";
import BetInput from "./shared/BetInput";
import AutocashoutBetInput from "./shared/AutocashoutBetInput";
const Bet = ({
  setStart,
  isLandScape,
  gameOver,
  setBalance,
  balance,
  currentValue,
  bets,
  setBets,
  investory,
  setInvestory,
  wins,
  setWins,
  loses,
  setLoses,
  lottieRef,
  audioPermission,
  prevValue,
  gameState,
  isPlaying,
  currentMultiplier,
  currentUser,
  isGoingDown,
  casinoConfigurationData,
}) => {
  const [betAmount, setBetAmount] = useState(100);
  const [autoCashOutAmount, setAutoCashOutAmount] = useState(1.0);
  const [autoCashOut, setAutoCashOut] = useState(false);
  const [optionsMoneyToBet, seOptionsMoneyToBet] = useState([]);
  const [betOptionMoney, setBetOptionMoney] = useState();
  const [isBeting, setIsBeting] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const [client, setClient] = useState();
  const [bet, setBet] = useState();
  const [isAutoCashOutDone, setIsAutoCashOutDone] = useState(false);
  const [activeButton, setActiveButton] = useState(0);
  useEffect(() => {
    if (
      bet &&
      bet.autoCashout &&
      currentMultiplier > bet.autoCashOutMultiplier
    ) {
      setIsAutoCashOutDone(true);
    }
  }, [currentMultiplier]);


  useEffect(() => {
    if (isFinishedState(gameState)) {
      setBet(null);
      setIsAutoCashOutDone(false);
    }
  }, [gameState]);

  useEffect(() => {
    if (!casinoConfigurationData) return;
    seOptionsMoneyToBet([
      casinoConfigurationData.incrementor1,
      casinoConfigurationData.incrementor2,
      casinoConfigurationData.incrementor3,
      casinoConfigurationData.incrementor4,
    ]);
    setBetAmount(casinoConfigurationData.casinoDefaultValueBet)
  }, [casinoConfigurationData]);

  useEffect(() => {
    if (optionsMoneyToBet && optionsMoneyToBet.length > 0) {
      setBetOptionMoney(optionsMoneyToBet[0]);
    }
  }, [optionsMoneyToBet]);

  useEffect(() => {
    if (
      isBeting &&
      autoCashOut &&
      !isSold &&
      currentValue >= autoCashOutAmount &&
      !gameOver
    ) {
      setIsSold(true);
      // setBalance(balance + cashOutAmount * betAmount);

      // setWins((prev) => prev + cashOutAmount * betAmount);

      setBets((prev) => [
        {
          time: new Date().getTime(),
          bet: betAmount,
          coeff: autoCashOutAmount,
          cashOut: autoCashOutAmount * betAmount,
          profit: true,
        },
        ...prev,
      ]);
      // const audio = new Audio(success);
      // if (audioPermission) {
      //   audio.play();
      // }
    }
  }, [
    isBeting,
    autoCashOut,
    isSold,
    currentValue,
    autoCashOutAmount,
    gameOver,
    audioPermission,
  ]);

  useEffect(() => {
    if (gameOver) {
      setIsBeting(false);
      setIsSold(false);

      if (isBeting && !isSold) {
        setLoses((prev) => prev + betAmount);
        setBets((prev) => [
          {
            time: new Date().getTime(),
            bet: betAmount,
            coeff: 0,
            cashOut: 0,
            profit: false,
          },
          ...prev,
        ]);
      }
    }
  }, [gameOver, isSold]);

  useEffect(() => {
    if (lottieRef?.current) {
      if (isSold) {
        lottieRef.current.play();
      } else {
        lottieRef.current.stop();
      }
    }
  }, [isSold]);

  // // kada multiplier prodje autocashout vrednost disable dugme to je nova logika
  //  useEffect(()=>{

  //     if(!bet) return ;
  //     const client1 = new RSocketClient({
  //       setup: {
  //         // ms btw sending keepalive to server
  //         keepAlive: 60000,
  //         // ms timeout if no keepalive response
  //         lifetime: 180000,
  //         // format of `data`
  //         dataMimeType: "application/json",
  //         // format of `metadata`
  //         metadataMimeType: "message/x.rsocket.routing.v0",
  //       },
  //       serializers: {
  //         data: JsonSerializer,
  //         metadata: IdentitySerializer,
  //       },
  //       transport: new RSocketWebSocketClient({
  //         url: "ws://localhost:9001/",
  //       }),
  //     }).connect();

  //     client1?.subscribe({
  //       onComplete: (socket) => {
  //         console.log(bet)
  //         console.log("Connected to server");
  //         const metadata = String.fromCharCode(`bet.${bet.id}`.length) + `bet.${bet.id}`;
  //         socket.requestStream({
  //           metadata: metadata,
  //         }).subscribe({
  //           onNext: (response) => {
  //             console.log("Received bet response:", response);
  //             if(response.data){
  //               const recivedBet=response.data
  //               setBetState( recivedBet && recivedBet.multiplier!=0? 'FINISHED':'RUNNING')
  //             }
  //             // Handle the incoming bet response (e.g., update state)
  //           },
  //           onError: (error) => {
  //             console.log("Error in bet stream:", error);
  //           },
  //           onComplete: () => {
  //             console.log("Bet stream completed");
  //           },
  //           onSubscribe: (subscription) => {
  //             subscription.request(2147483647); // Request a valid integer number of responses
  //           },
  //         });
  //       },
  //       onError: (error) => {
  //         console.log("Connection error:", error);

  //       },

  //     })

  //   },[bet]);

  const handleCashInBetPayload = (payload) => {
    //We get string data as response and i need to parse it to json
    setBet(JSON.parse(payload.data));
  };
  const handleCashOutBetPayload = (payload) => {
    setBet(null);
  };
  const handleCancelBetPayload = (payload) => {
    setBet(null);
  };

  const placeBet = () => {
    //trebalo bi da posaljem jwt i onda u taj jwt da se decode na beku i tu da se nalazi userToken i onda sa tim umesto sa mailom da se radi
    const userToken = localStorage.getItem("accessToken");
    const requestData = {
      amount: betAmount,
      multiplier: currentMultiplier,
      jwt: userToken,
      betType: "BET",
      isAutoCashout: autoCashOut,
      autoCashOutMultiplier: autoCashOutAmount,
    };

    //call bet
    connectToCashInBet(handleCashInBetPayload, requestData);
  };
  const placeSell = () => {
    const userToken = localStorage.getItem("accessToken");

    const requestData = {
      amount: betAmount,
      multiplier: currentMultiplier,
      jwt: userToken,
      betType: "CASHOUT",
      betId: bet.id,
      isGoingDown: isGoingDown,
    };

    connectToCashOutBet(handleCashOutBetPayload, requestData);
  };

  const placeCancel = () => {
    const userToken = localStorage.getItem("accessToken");
    const requestDataCancel = {
      betType: "CANCEL",
      betId: bet.id,
      jwt: userToken,
    };

    connectToCancelBet(handleCancelBetPayload, requestDataCancel);
  };

  //We call this method and then based on state its bet,sell or cancel
  const handleBet = () => {
    if (isWaitingState(gameState) && !bet) placeBet();
    else if (isWaitingState(gameState) && bet) placeCancel();
    else {
      placeSell();
    }
  };

  const getBorderValues = (index) => {
    switch (index) {
      case 0: {
        return "15px 0px 0px 15px";
      }
      case 1: {
        return "0px 0px 0px 0px";
      }
      case 2: {
        return "0px 0px 0px 0px";
      }
      case 3: {
        return "0px 15px 15px 0px";
      }
      default: {
        return "0px";
      }
    }
  };
  const handleBetAmountChanged = (amount) => {
    setBetAmount(amount);
  };
  const handleSubtractAmount = () => {
    setBetAmount(betAmount - betOptionMoney);
  };
  const handleAddAmount = () => {
    console.log(betAmount + betOptionMoney);
    setBetAmount(betAmount + betOptionMoney);
  };
  //This method sets text in BET button, and depends on state of game and state of bet
  const getButtonText = () => {
    if (isWaitingState(gameState)) {
      if (!bet) return "BET";
      if (bet) return "CANCEL";
    }
    if (isStartedState(gameState) && !bet) {
      return "BET";
    }
    if (isFinishedState(gameState) || isAutoCashOutDone) {
      return "BET";
    }
    return "SELL";
  };

  return (
    <Box
      sx={(theme) => ({
        backgroundColor: theme.colors.blue600[0],
        width: "100%",
        padding: "15px",
        color: "white",
        fontWeight: "bold",
        borderRadius: "15px",
      })}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <Button
          onClick={() => {setActiveButton(0); setAutoCashOut(false)}}
          variant="transparent"
          sx={(theme) => ({
            borderRadius: "15px 0px 0px 15px",
            backgroundColor: theme.colors.blue800[0],
            color:
              activeButton === 0
                ? theme.colors.yellow[0]
                : theme.colors.white[0],
            width: "100%",
          })}
        >
          Bet
        </Button>
        <Button
          onClick={() =>{
            setActiveButton(1);
            setAutoCashOut(true);
          } }
          variant="transparent"
          sx={(theme) => ({
            borderRadius: "0px 15px 15px 0px",
            backgroundColor: theme.colors.blue800[0],
            color:
              activeButton === 1
                ? theme.colors.yellow[0]
                : theme.colors.white[0],
            width: "100%",
          })}
        >
          Auto
        </Button>
      </Box>

      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "stretch",
          alignItems: "stretch",
          gap: "1rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: "0.3rem",
            width: "100%",
            opacity: !gameOver || bet ? 0.6 : 1,
            transition: "all 0.5s",
            "*": {
              cursor: "pointer",
            },
          }}
        >
          <BetInput
            betAmount={betAmount}
            handleBetAmountChanged={handleBetAmountChanged}
            subtractAmount={handleSubtractAmount}
            addAmount={handleAddAmount}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "5px",
            }}
          >
            {optionsMoneyToBet.map((option, index) => (
              <Button
                key={option}
                sx={(theme) => ({
                  borderRadius: getBorderValues(index),
                  color: theme.colors.white[0],
                  width: "100%",
                  background: theme.colors.blue800[0],
                  whiteSpace: "nowrap",
                  border: ` solid 1px ${
                    option === betOptionMoney
                      ? theme.colors.yellow[0]
                      : "transparent"
                  }`,
                })}
                onClick={() => {
                  setBetOptionMoney(option);
                }}
              >
                {option} {currentUser?.casinoCurrency}
              </Button>
            ))}
          </Box>
          <Text
            sx={(theme) => ({
              fontWeight: "normal",
              color: theme.colors.white[0],
            })}
          >
            Auto Cashout
          </Text>
          <AutocashoutBetInput   betAmount={autoCashOutAmount}
            handleBetAmountChanged={(value)=> setAutoCashOutAmount(value)}
            isAutocashOut={autoCashOut}
            />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "stretch",
            width: "100%",
          }}
        >
          <Button
            disabled={
              (!bet && isStartedState(gameState)) ||
              gameOver ||
              isAutoCashOutDone
            }
            sx={(theme) => ({
              background:
                (!bet && isStartedState(gameState)) ||
                gameOver ||
                isAutoCashOutDone
                  ? grayColor
                  : isWaitingState(gameState) && bet
                  ? redColor
                  : !isGoingDown
                  ? `linear-gradient(180deg, ${theme.colors.green[0]}, ${theme.colors.green[1]})`
                  : redColor,
              boxShadow: "inset 0px -4px -4px 10px rgba(0, 0, 0, 0.25)",
              transition: "background-color 0.5s",
              width: "100%",
              height: "100%",
              fontSize: "2.5rem",
              borderRadius: "15px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              border: "none",
              outline: "none",
              filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
              "&:hover": {
                background:
                  (!bet && isStartedState(gameState)) ||
                  gameOver ||
                  isAutoCashOutDone
                    ? grayColor
                    : isWaitingState(gameState) && bet
                    ? redColor
                    : !isGoingDown
                    ? `linear-gradient(180deg, ${theme.colors.green[0]}, ${theme.colors.green[1]})`
                    : redColor,
              },
            })}
            onClick={handleBet}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>{getButtonText()}</div>
              <p style={{ fontSize: "15px", margin: 0 }}>
                {!isWaitingState(gameState) && bet && isGoingDown && "50%"}
              </p>
            </Box>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Bet;
