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
import { connectToCancelBet, connectToCashInBet, connectToCashOutBet } from "../communication/socket";
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
  casinoConfigurationData
}) => {
  const [betAmount, setBetAmount] = useState(100);
  const [autoCashOutAmount, setAutoCashOutAmount] = useState(1.6);
  const [autoCashOut, setAutoCashOut] = useState(false);
  const [optionsMoneyToBet,seOptionsMoneyToBet] = useState([]);
  const [betOptionMoney, setBetOptionMoney] = useState();
  const [isBeting, setIsBeting] = useState(false);
  const [isSold, setIsSold] = useState(false);
  const [client, setClient] = useState();
  const [bet, setBet] = useState();
  const [isAutoCashOutDone, setIsAutoCashOutDone] = useState(false);


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

  useEffect(()=>{
    if(!casinoConfigurationData) return
    seOptionsMoneyToBet([casinoConfigurationData.incrementor1,casinoConfigurationData.incrementor2,casinoConfigurationData.incrementor3,casinoConfigurationData.incrementor4])
  },[casinoConfigurationData])

  useEffect(()=>{

    if( optionsMoneyToBet &&  optionsMoneyToBet.length>0){
      setBetOptionMoney(optionsMoneyToBet[0])

    }
  },[optionsMoneyToBet])


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


    
  const handleCashInBetPayload=(payload)=>{
    //We get string data as response and i need to parse it to json 
    setBet(JSON.parse(payload.data));

   }
   const handleCashOutBetPayload=(payload)=>{
    setBet(null);

   }
   const handleCancelBetPayload=(payload)=>{
    setBet(null);

   }

  const placeBet = () => {
    //trebalo bi da posaljem jwt i onda u taj jwt da se decode na beku i tu da se nalazi userToken i onda sa tim umesto sa mailom da se radi
    const userToken=localStorage.getItem('accessToken')
    const requestData = {
      amount: betAmount,
      multiplier: currentMultiplier,
      jwt: userToken,
      betType: "BET",
      isAutoCashout: autoCashOut,
      autoCashOutMultiplier: autoCashOutAmount,
    };

   //call bet
   connectToCashInBet(
    handleCashInBetPayload,
    requestData
   )
  }
  const placeSell = () => {
    const userToken=localStorage.getItem('accessToken')

    const requestData = {
      amount: betAmount,
      multiplier: currentMultiplier,
      jwt: userToken,
      betType: "CASHOUT",
      betId: bet.id,
      isGoingDown:isGoingDown

    };
    
    connectToCashOutBet(handleCashOutBetPayload,requestData)


  }

  const placeCancel = () => {
    const userToken=localStorage.getItem('accessToken')
    const requestDataCancel = {
      betType: "CANCEL",
      betId: bet.id,
      jwt: userToken
    };

    connectToCancelBet(
      handleCancelBetPayload,
      requestDataCancel
    )


  }

  //We call this method and then based on state its bet,sell or cancel
  const handleBet = () => {
    if (isWaitingState(gameState) && !bet) placeBet();
    else if (isWaitingState(gameState) && bet) placeCancel();
    else {
      placeSell();
    }
  };
  //This method sets text in BET button, and depends on state of game and state of bet
  const getButtonText = () => {
    if (isWaitingState(gameState)) {
      if (!bet) return "Bet";
      if (bet) return "Cancel";
    }
    if (isStartedState(gameState) && !bet) {
      return "Bet";
    }
    if (isFinishedState(gameState) || isAutoCashOutDone) {
      return "Bet";
    }
    return "Sell";
  };

  return (
    <Box
      style={{
        backgroundImage: "linear-gradient(-211deg, #2D274A 0%, #201C36 100%)",
        width: "100%",
        padding: "1rem",
        color: "white",
        fontWeight: "bold",
      }}
    >
      {" "}
      Bet
      <Box
        style={{
          width: "100%",
          height: "86%",
          display: "flex",
          justifyContent: "stretch",
          alignItems: "stretch",

          gap: "1rem",
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: isLandScape ? "0.5rem" : "0.3rem",
            width: "100%",
            opacity: !gameOver || isBeting ? 0.6 : 1,
            transition: "all 0.5",
            "& *": {
              cursor: "pointer",
            },

            // alignItems: "center",
          }}
        >
          <TextInput
            value={betAmount}
            onChange={(event) =>
              setBetAmount(Number(event.target.value.replace(/\D/g, "")))
            }
            // type="number"
            variant="filled"
            color="#685ab0"
            style={{
              "& input": {
                backgroundColor: "#4a407d",
                color: "white",
                border: "1px solid #685ab0",
                padding: "0.5rem",
                borderRadius: "4px",
              },
            }}
            rightSection={
              <Box
                style={{
                  display: "flex",
                  gap: "0.1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "2rem",
                }}
              >
                <button
                  style={{
                    width: "30px",
                    height: "28px",
                    background: "#2c264a",
                    border: "none",
                    outline: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setBetAmount((prev) => prev + betOptionMoney);
                  }}
                >
                  <span
                    style={{
                      color: "#2c264a",
                      background: "#01efb7",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.5rem",
                      fontWeight: "bold",

                      paddingTop: "2px",
                      paddingLeft: "1px",
                    }}
                  >
                    +
                  </span>
                </button>
                <button
                  style={{
                    width: "30px",
                    height: "28px",
                    background: "#2c264a",
                    border: "none",
                    outline: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    if (betAmount > 0) {
                      setBetAmount((prev) => prev - betOptionMoney);
                    }
                  }}
                >
                  <span
                    style={{
                      color: "#2c264a",
                      background: "#ff3b65",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.5rem",
                      fontWeight: "bold",

                      //   paddingBottom: "3px",
                      paddingRight: "1px",
                    }}
                  >
                    -
                  </span>
                </button>
              </Box>
            }
          />
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: isLandScape ? "1rem" : "0.3rem",
            }}
          >
            {optionsMoneyToBet.map((option) => {
              return (
                <button
                  key={option}
                  style={{
                    border: "1px solid white",
                    padding: "0.5rem",
                    color: "#8674e3",
                    border: "1px solid ",
                    borderColor:
                      option === betOptionMoney ? "#008563" : "#685ab0",
                    width: "100%",
                    background: "transparent",
                    whiteSpace: "nowrap",
                    borderRadius: "4px",
                  }}
                  onClick={() => {
                    setBetOptionMoney(option);
                  }}
                >
                  {option} {currentUser?.casinoCurrency}
                </button>
              );
            })}
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Auto Cashout</Text>
            <Switch
              color="green"
              value={autoCashOut}
              onChange={() => setAutoCashOut(!autoCashOut)}
              size="xs"
              styles={(theme) => ({
                track: {
                  backgroundColor: autoCashOut ? "red" : "gray",
                  border: "none",
                },
                thumb: {
                  backgroundColor: "whitesmoke",
                },
              })}
            />
          </Box>
          <TextInput
            value={`${autoCashOutAmount}x`}
            onChange={(event) =>
              setAutoCashOutAmount(
                Number(event.target.value.replace(/\D/g, ""))
              )
            }
            // type="number"
            variant="filled"
            color="#685ab0"
            style={{
              "& input": {
                backgroundColor: "#4a407d00",
                color: "white",
                border: "1px solid #685ab0",
                padding: "0.5rem",
                borderRadius: "4px",
              },
            }}
            rightSection={
              <Box
                style={{
                  display: "flex",
                  gap: "0.1rem",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "2rem",
                }}
              >
                <button
                  style={{
                    width: "30px",
                    height: "28px",
                    background: "#4a407d",
                    border: "none",
                    outline: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    setAutoCashOutAmount((prev) =>
                      Number(Number(prev) + 0.1).toFixed(1)
                    );
                  }}
                >
                  <span
                    style={{
                      color: "#2c264a",
                      background: "#fff",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.5rem",
                      fontWeight: "bold",
                      paddingTop: "2px",
                      paddingLeft: "1px",
                    }}
                  >
                    +
                  </span>
                </button>
                <button
                  style={{
                    width: "30px",
                    height: "28px",
                    background: "#4a407d",
                    border: "none",
                    outline: "none",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    if (autoCashOutAmount > 0) {
                      setAutoCashOutAmount((prev) =>
                        Number(Number(prev) - 0.1).toFixed(1)
                      );
                    }
                  }}
                >
                  <span
                    style={{
                      color: "#2c264a",
                      background: "#fff",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.5rem",
                      fontWeight: "bold",

                      //   paddingBottom: "3px",
                      paddingRight: "1px",
                    }}
                  >
                    -
                  </span>
                </button>
              </Box>
            }
          />
        </Box>
        <Button
      disabled={
        (!bet && isStartedState(gameState)) || gameOver || isAutoCashOutDone
      }
      style={{
        backgroundColor:
          (!bet && isStartedState(gameState)) ||
          gameOver ||
          isAutoCashOutDone
            ? grayColor
            : isWaitingState(gameState) && bet
            ? redColor
            : !isGoingDown
            ? greenColor
            : redColor,
        boxShadow: "inset 0px -4px -4px 10px rgba(0, 0, 0, 0.25)",
        transition: "background-color 0.5s",
        width: "100%",
        minHeight: "9rem",
        height: "100%",
        fontSize: "2.5rem",
        borderRadius: "0.3rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        border: "none",
        outline: "none",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))"
      }}
      onClick={handleBet}
    >
      <Box style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <div>{getButtonText()}</div>
      <p style={{ fontSize: "15px", margin: 0 }}>
        {(!isWaitingState(gameState) && bet && isGoingDown) && "50%"}
      </p>
      </Box>
    
    </Button>
      </Box>
    </Box>
  );
};

export default Bet;
