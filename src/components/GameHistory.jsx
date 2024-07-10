import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getHistoryOfGames } from "../communication/rest";
import { Box, Button, ScrollArea } from "@mantine/core";
import { blackColor, darkGrayColor } from "../colors/colors";


export const GameHistory=({gameState,close})=>{
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(20);
  
    const { data, refetch } = useQuery(["historyGames"], () =>
      getHistoryOfGames(page, size)
    );
  
    useEffect(() => {
      refetch();
    }, [gameState]);
    return (
      <Box
      style={{
        display: "flex",
        color: "white",
        gap: "1rem",
        paddingLeft: "1rem",
        flexWrap:'wrap',
        backgroundColor:darkGrayColor,
        justifyContent:"center",
        
        padding:'2rem',
        alignItems: "center", // Center alignment vertically
      }}
    >
        <Box style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>

        {data?.data?.data?.games.map((item, index) => (
            <Box
              key={index}
              style={{
                display: "inline-block",
                backgroundColor:
                  item.multiplier > 3 ? "#3eb89b2f" : "#ff3b652f",
                border:
                  item.multiplier > 3
                    ? "1px solid #3eb89b"
                    : "1px solid #ff3b65",
                borderRadius: "0.2rem",
                padding: "0.5rem",
                width: "5rem",
                textAlign: "center",
              }}
            >
              {item.multiplier}
            </Box>
          ))}
                  </Box>

          <Button onClick={close}>Close</Button>
    </Box>
    )
}