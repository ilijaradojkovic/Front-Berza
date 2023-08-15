import { Box } from '@mantine/core'
import React from 'react'
import Bet from './Bet'

const Footer = ({setStart, isLandScape}) => {
  return (
    <Box sx={{
        display: "flex",
        flexDirection: isLandScape ? "row" : "column",
        borderRadius: "0.2rem",
        overflow: "hidden",
    }}>
        <Bet setStart={setStart} isLandScape={isLandScape}/>
        <Bet setStart={setStart} isLandScape={isLandScape}/>
    </Box>
  )
}

export default Footer