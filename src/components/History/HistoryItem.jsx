import { Box } from '@mantine/core'
import React from 'react'

export default function HistoryItem({element}) {
  return (
    <Box
              sx={theme=>({
                display: "flex",
                backgroundColor: theme.colors.black[0],
                justifyContent:'center',
                alignItems:'center',
                borderRadius: "15px",
                padding:'5px 20px',
                textAlign: "center",
                color:theme.colors.rose[0],
                fontWeight:'bold'

              })}
            >
              {element.multiplier.toFixed(2)}x
    </Box>
  )
}
