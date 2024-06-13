import { Box, Button, Dialog, CloseButton } from "@mantine/core";
import "./Chat.css";
import { blackColor, darkGrayColor, grayColor, lightGrayColor, purpleLight } from "../../colors/colors";
import Message from "./message/Message";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { useDisclosure } from "@mantine/hooks";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";

export const Chat = () => {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [amountPerPlayerRain, setAmountPerPlayerRain] = useState(10.0);
  const [numberOfPlayersRain, setNumberOfPlayersRain] = useState(10);

  const handleNumberOfPlayersChanged = (event) => {
    setNumberOfPlayersRain(Number(event.target.value));
  };

  const handleAmountPerPlayerChanged = (event) => {
    const value = parseFloat(event.target.value);
    if (!isNaN(value)) {
      setAmountPerPlayerRain(value.toFixed(2));
    }
  };

  const handleSubtractNumberOfPlayers = () => {
    setNumberOfPlayersRain((prev) => Math.max(prev - 1, 0));
  };

  const handleAddNumberOfPlayers = () => {
    setNumberOfPlayersRain((prev) => prev + 1);
  };

  const handleSubtractAmountPerPlayer = () => {
    setAmountPerPlayerRain((prev) =>
      prev > 1 ? (parseFloat(prev) - 1).toFixed(2) : "0.00"
    );
  };

  const handleAddAmountPerPlayer = () => {
    setAmountPerPlayerRain((prev) => (parseFloat(prev) + 1).toFixed(2));
  };

  return (
    <Box
      style={{
        display: "flex",
        height: "100%",
        flexDirection: "column",
        backgroundColor: purpleLight,
      }}
    >
      <Box
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Message />
        <Message />
        <Message type="rain" />
      </Box>
      {opened && (
        <Box
          style={{
            padding: "0px 10px",
            height: "350px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "10px",
              color: "white",
              borderRadius: "5px 5px 0px 0px",
              backgroundColor: lightGrayColor,
              
            }}
          >
            <p>RAIN</p>
            <CloseButton
              onClick={close}
              sx={(theme) => ({
                color: "white",
                "&:hover": {
                  backgroundColor: theme.colors.gray[7],
                },
              })}
            />
          </Box>
          <Box
            style={{
              position: "relative !important",
              backgroundColor: darkGrayColor,
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              flex: "1",
              color:'white'
            }}
          >
            <p style={{ fontSize: "0.8rem", opacity: "0.7" }}>
              This feature will give selected amount to random users in chat.
            </p>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                flexDirection: "column",
                marginTop:'15px'
              }}
            >
              <label
                style={{ color: "black", width: "100%", fontSize: "0.8rem" ,color:'white'}}
              >
                Amount per player, RSD
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: blackColor,
                  borderRadius: "13px",
                  padding: "6px",
                }}
              >
                <RemoveCircleOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleSubtractAmountPerPlayer}
                />
                <input
                  style={{
                    margin: "0px",
                    padding: "0px",
                    border: "none",
                    backgroundColor: "transparent",
                    outline: "none",
                    textAlign: "center",
                    color: "white",
                  }}
                  value={amountPerPlayerRain}
                  onChange={handleAmountPerPlayerChanged}
                />
                <AddCircleOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleAddAmountPerPlayer}
                />
              </div>
            </Box>
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                flexDirection: "column",
              }}
            >
              <label
                style={{ color: "black", width: "100%", fontSize: "0.8rem",color:'white' }}
              >
                Number of players
              </label>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: blackColor,
                  borderRadius: "13px",
                  padding: "6px",
                }}
              >
                <RemoveCircleOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleSubtractNumberOfPlayers}
                />
                <input
                  style={{
                    margin: "0px",
                    padding: "0px",
                    border: "none",
                    backgroundColor: "transparent",
                    outline: "none",
                    textAlign: "center",
                    color: "white",
                  }}
                  value={numberOfPlayersRain}
                  onChange={handleNumberOfPlayersChanged}
                />

                <AddCircleOutlineIcon
                  style={{ cursor: "pointer" }}
                  onClick={handleAddNumberOfPlayers}
                />
              </div>
            </Box>
            <Box
              style={{
                textAlign: "center",
                fontSize: "1.3rem",
              }}
            >
              <p>Total, RSD</p>
              <p>{(amountPerPlayerRain * numberOfPlayersRain).toFixed(2)}</p>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button style={{backgroundColor:purpleLight}}>
                RAIN {(amountPerPlayerRain * numberOfPlayersRain).toFixed(2)}{" "}
                RSD
              </Button>
            </Box>
          </Box>
        </Box>
      )}
      <Box style={{ display: "flex", borderTop: "solid 1px black" }}>
        <input className="reply-input" placeholder="Reply" />
        <button
          style={{
            border: "none",
            padding: "10px",
            backgroundColor: "transparent",
            color: "white",
            cursor:'pointer'
          }}
        >
          SEND
        </button>
      </Box>
      <Box
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          padding: "10px",
        }}
      >
        <WaterDropIcon
          onClick={toggle}
          style={{ color: "white", cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};
