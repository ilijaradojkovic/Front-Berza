import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getHistoryOfGames } from "../communication/rest";
import { Box, Button, ScrollArea } from "@mantine/core";
import { blackColor, darkGrayColor } from "../colors/colors";
import HistoryItem from "./History/HistoryItem";


export const GameHistory=({gameState,close})=>{
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(40);
  
    const { data, refetch } = useQuery(["historyGames"], () =>
      getHistoryOfGames(page, size)
    );
  
    useEffect(() => {
      refetch();
    }, []);
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
           <HistoryItem key={index} element={item}/>
          ))}
                  </Box>

          <Button onClick={close}>Close</Button>
    </Box>
    )
}