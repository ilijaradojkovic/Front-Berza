import AddIcon from "@mui/icons-material/Add";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, TextInput } from "@mantine/core";
import CloseIcon from '@mui/icons-material/Close';
import { disabledColor } from "../../colors/colors";
export default function AutocashoutBetInput({betAmount,handleBetAmountChanged,isAutocashOut}) {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor:  !isAutocashOut ?  theme.colors.disabled : theme.colors.blue800[0],
        padding: "1px",
        borderRadius: "15px",

      })}
    >
   
        <CloseIcon  sx={theme=>({
            color: theme.colors.white[0],
            cursor: "pointer",
            fontSize:'medium'
            
        })}/>
      <TextInput
      readOnly={!isAutocashOut}
      value={betAmount}
      onChange={(event)=>handleBetAmountChanged(event.target.value)}
        sx={(theme) => ({
          input: {
            backgroundColor:  !isAutocashOut ? theme.colors.disabled : theme.colors.blue800[0],
            textAlign: "center",
            border: "none",
            color: theme.colors.white[0],
            fontWeight: "bold",
          },
        })}
      />
    
        <AddIcon sx={theme=>({
            color: 'transparent',
            
            cursor: "pointer",
        })}/>
     
    </Box>
  )
}
