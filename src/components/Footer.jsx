import { Box } from '@mantine/core'
import React from 'react'
import Bet from './Bet'

const Footer = ({setStart}) => {
  return (
    <Box sx={{
        display: "flex",
        borderRadius: "0.2rem",
        overflow: "hidden",
    }}>
        <Bet setStart={setStart}/>
        <Bet setStart={setStart}/>
    </Box>
  )
}

export default Footer