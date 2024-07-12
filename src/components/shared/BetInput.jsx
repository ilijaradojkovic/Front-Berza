import AddIcon from "@mui/icons-material/Add";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, NumberInput, TextInput } from "@mantine/core";
export default function BetInput({betAmount,handleBetAmountChanged,addAmount,subtractAmount}) {

  const handleBetAmountChangedEvent=(value)=>{
    handleBetAmountChanged(value)
  }
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: theme.colors.blue800[0],
        padding: "5px",
        borderRadius: "15px",
      })}
    >
   
        <RemoveIcon
        onClick={subtractAmount}
        sx={theme=>({
            color: theme.colors.green[2],
            cursor: "pointer",
        })}/>
      <NumberInput
      hideControls
      value={betAmount}
      onChange={handleBetAmountChangedEvent}
        sx={(theme) => ({
          input: {
            backgroundColor: theme.colors.blue800[0],
            textAlign: "center",
            border: "none",
            color: theme.colors.white[0],
            fontWeight: "bold",
          },
        })}
      />
    
        <AddIcon
        onClick={addAmount}
        sx={theme=>({
            color: theme.colors.green[2],
            cursor: "pointer",
        })}/>
     
    </Box>
  );
}
