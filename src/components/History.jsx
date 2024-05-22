import { Box, Button, ScrollArea } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getHistoryOfGames } from "../rest/api";
import { useQuery } from "react-query";

const History = ({ gameState }) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(20);

  const { data, refetch } = useQuery(["historyGames"], () =>
    getHistoryOfGames(page, size)
  );

  useEffect(() => {
    console.log(data);
    refetch();
  }, [gameState]);
  return (
    <Box
      style={{
        display: "flex",
        color: "white",
        gap: "1rem",
        paddingLeft: "1rem",
        alignItems: "flex-start",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        History
      </Box>


      <Button
        style={{
          backgroundColor: "#3eb89b",
          padding: "0.5rem",
          width: "5rem",
          textAlign: "center",
          borderRadius: "0.2rem",
          
        }}
      >
        See All
      </Button>

      <ScrollArea
        color="silver"
        scrollbarSize={0}
        scrollbars="x"
        style={{
          width: "68vw",
        }}
      >
        <Box style={{ display: "flex", gap: "1rem" }}>
          {data?.data?.map((item, index) => (
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
          <Box
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "68vw",
              height: "100%",
              backgroundImage:
                "linear-gradient(to right, #00000000 90%, #1e1933 100%)",
            }}
          />
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default History;
