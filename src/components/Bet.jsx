import { Box, Button, Switch, Text, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";

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
}) => {
  const [betAmount, setBetAmount] = useState(100);
  const [cashOutAmount, setCashOutAmount] = useState(1.6);
  const [autoCashOut, setAutoCashOut] = useState(false);
  const options = [1, 2, 5, 10];

  const [isBeting, setIsBeting] = useState(false);
  const [isSold, setIsSold] = useState(false);

  //   useEffect(() => {
  //     setFormatedBetAmount(betAmount + "$");
  //     }, [betAmount]);

  const bet = () => {
    if (betAmount > balance) {
      alert("No no");
    } else {
      if (isBeting) {
        setIsBeting(false);
        setBalance(balance + betAmount);
        setInvestory((prev) => prev - betAmount);
      } else {
        setIsBeting(true);
        setBalance(balance - betAmount);
        setInvestory((prev) => prev + betAmount);
      }
    }
  };

  const sell = () => {
    setIsSold(true);
    setBalance(balance + currentValue * betAmount);
    setWins((prev) => prev + currentValue * betAmount);
    setBets((prev) => [
      {
        time: new Date().getTime(),
        bet: betAmount,
        coeff: currentValue,
        cashOut: currentValue * betAmount,
        profit: true,
      },
      ...prev,
    ]);
  };

  useEffect(() => {
    if (
      isBeting &&
      autoCashOut &&
      !isSold &&
      currentValue >= cashOutAmount &&
      !gameOver
    ) {
      setIsSold(true);
      setBalance(balance + cashOutAmount * betAmount);

      setWins((prev) => prev + cashOutAmount * betAmount);

      setBets((prev) => [
        {
          time: new Date().getTime(),
          bet: betAmount,
          coeff: cashOutAmount,
          cashOut: cashOutAmount * betAmount,
          profit: true,
        },
        ...prev,
      ]);
    }
  }, [isBeting, autoCashOut, isSold, currentValue, cashOutAmount, gameOver]);

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

  return (
    <Box
      sx={{
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
        sx={{
          width: "100%",
          height: "86%",
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
            gap: "0.5rem",
            width: "100%",
            opacity: !gameOver || isBeting ? 0.6 : 1,
            transition: "all 0.5",
            "& *": {
              cursor: !gameOver || isBeting ? "not-allowed" : "",
            },

            // alignItems: "center",
          }}
        >
          <TextInput
            value={`${betAmount}$`}
            onChange={(event) =>
              setBetAmount(Number(event.target.value.replace(/\D/g, "")))
            }
            // type="number"
            variant="filled"
            color="#685ab0"
            sx={{
              "& input": {
                backgroundColor: "#4a407d",
                color: "white",
                border: "1px solid #685ab0",
                padding: "0.5rem",
                borderRadius: "4px",
              },
            }}
            readOnly={!gameOver || isBeting}
            rightSection={
              <Box
                sx={{
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
                    cursor: !gameOver || isBeting ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    setBetAmount((prev) => prev + 1);
                  }}
                  disabled={!gameOver || isBeting}
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
                    cursor: !gameOver || isBeting ? "not-allowed" : "pointer",
                  }}
                  disabled={!gameOver || isBeting}
                  onClick={() => {
                    if (betAmount > 0) {
                      setBetAmount((prev) => prev - 1);
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
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: "1rem",
            }}
          >
            {options.map((option) => {
              return (
                <button
                  key={option}
                  style={{
                    border: "1px solid white",
                    padding: "0.5rem",
                    color: "#8674e3",
                    border: "1px solid #685ab0",
                    width: "100%",
                    background: "transparent",
                    cursor: !gameOver || isBeting ? "not-allowed" : "pointer",
                  }}
                  onClick={() => {
                    setBetAmount((prev) => prev + option);
                  }}
                  disabled={!gameOver || isBeting}
                >
                  {option} $
                </button>
              );
            })}
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>Auto Cashout</Text>
            <Switch
              color="ocean-blue"
              value={autoCashOut}
              onChange={() => setAutoCashOut(!autoCashOut)}
              disabled={!gameOver || isBeting}
              sx={{
                "& .mantine-Switch-track": {
                  background: autoCashOut
                    ? `#01EFB7 !important`
                    : `gray !important`,
                  border: "none",
                  cursor: !gameOver || isBeting ? "not-allowed" : "pointer",
                },
              }}
            />
          </Box>
          <TextInput
            value={`${cashOutAmount}x`}
            onChange={(event) =>
              setCashOutAmount(Number(event.target.value.replace(/\D/g, "")))
            }
            // type="number"
            variant="filled"
            color="#685ab0"
            sx={{
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
                sx={{
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
                    cursor: !gameOver || isBeting ? "not-allowed" : "pointer",
                  }}
                  disabled={!gameOver || isBeting}
                  onClick={() => {
                    setCashOutAmount((prev) =>
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
                    cursor: !gameOver || isBeting ? "not-allowed" : "pointer",
                  }}
                  disabled={!gameOver || isBeting}
                  onClick={() => {
                    if (cashOutAmount > 0) {
                      setCashOutAmount((prev) =>
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
          sx={{
            backgroundImage: gameOver
              ? isBeting
                ? "linear-gradient(180deg, #00c1fc 5.00%, #006385 93.00%)"
                : "linear-gradient(180deg, #00FCC1 5.00%, #008563 93.00%)"
              : isBeting
              ? "linear-gradient(180deg, #FF0050 5.00%, #880031 93.00%)"
              : "linear-gradient(180deg, #00FCC1 5.00%, #008563 93.00%)",
            width: "100%",
            minHeight: "10rem",
            fontSize: "2.5rem",
            borderRadius: "0.5rem",
            display: "block",
            transition: "all 0.5s ",
            // flex: 1,
            //   margin: "2rem",
          }}
          disabled={(!gameOver && !isBeting) || isSold}
          onClick={gameOver ? bet : sell}
        >
          {gameOver ? (isBeting ? "Cancel" : "Bet") : isSold ? "Sold" : "Sell"}
        </Button>
      </Box>
    </Box>
  );
};

export default Bet;
