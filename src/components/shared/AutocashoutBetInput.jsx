import AddIcon from "@mui/icons-material/Add";
import React from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, TextInput } from "@mantine/core";
import CloseIcon from '@mui/icons-material/Close';
export default function AutocashoutBetInput() {
  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: theme.colors.blue800[0],
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
    
        <AddIcon sx={theme=>({
            color: 'transparent',
            
            cursor: "pointer",
        })}/>
     
    </Box>
  )
}
