import { Box, Button, Switch, Text, TextInput } from "@mantine/core";
import React, { useEffect, useState } from "react";

const Bet = ({ setStart, isLandScape }) => {
  const [betAmount, setBetAmount] = useState(100);
  const [cashOutAmount, setCashOutAmount] = useState(1.6);
  const options = ["1$", "2$", "5$", "10$"];

  //   useEffect(() => {
  //     setFormatedBetAmount(betAmount + "$");
  //     }, [betAmount]);

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
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setBetAmount((prev) => prev + 1);
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
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setBetAmount((prev) => prev - 1);
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
                  key={option + Math.random()}
                  style={{
                    border: "1px solid white",
                    padding: "0.5rem",
                    color: "#8674e3",
                    border: "1px solid #685ab0",
                    width: "100%",
                    background: "transparent",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setBetAmount(
                      (prev) => prev + Number(option.replace(/\D/g, ""))
                    );
                  }}
                >
                  {option}
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
            <Switch color="ocean-blue" />
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
                    cursor: "pointer",
                  }}
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
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setCashOutAmount((prev) =>
                      Number(Number(prev) - 0.1).toFixed(1)
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
            backgroundImage:
              "linear-gradient(180deg, #00FCC1 5.00%, #008563 93.00%)",
            width: "100%",
            minHeight: "10rem",
            fontSize: "2.5rem",
            borderRadius: "0.5rem",
            display: "block",
            // flex: 1,
            //   margin: "2rem",
          }}
          onClick={() => setStart(true)}
        >
          BET
        </Button>
      </Box>
    </Box>
  );
};

export default Bet;
