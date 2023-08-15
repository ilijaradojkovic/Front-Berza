import { Box, Col, ScrollArea } from "@mantine/core";
import React from "react";

const History = () => {
  const history = [
    {
      value: 14.8,
      profit: true,
    },
    {
      value: 22.4,
      profit: true,
    },
    {
      value: 1.08,
      profit: false,
    },
    {
      value: 1.1,
      profit: false,
    },
    {
      value: 2.4,
      profit: false,
    },
    {
      value: 12.8,
      profit: true,
    },
    {
      value: 15.12,
      profit: true,
    },
    {
      value: 0.12,
      profit: false,
    },
    {
      value: 32.1,
      profit: true,
    },
    {
      value: 19.2,
      profit: true,
    },
    {
      value: 22.4,
      profit: true,
    },
    {
      value: 1.08,
      profit: false,
    },
    {
      value: 0.12,
      profit: false,
    },
    {
      value: 32.1,
      profit: true,
    },
    {
      value: 19.2,
      profit: true,
    },
  ];
  return (
    <Box
      sx={{
        display: "flex",
        color: "white",
        gap: "1rem",
        // padding: "0.5rem",
        paddingLeft: "1rem",
        // justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // width: "100%",
            gap: "1rem",
        }}>
      History
      <Box
        sx={{
          backgroundColor: "#3eb89b",
          padding: "0.5rem",
          width: "5rem",
          textAlign: "center",
          borderRadius: "0.2rem",
        }}
      >
        See All
      </Box></Box>
      <ScrollArea 
        // style={{ width: "100%", height: "100%" }}
        color="silver"
        sx={{
            width: "68vw",
            height: "150%",
        

        }}
        >
        <Box style={{ display: "flex", gap: "1rem" }}>
          {history.map((item, index) => (
            <Box
              style={{ display: "inline-block" }}
              sx={{
                backgroundColor: item.profit ? "#3eb89b2f" : "#ff3b652f",
                border: item.profit ? "1px solid #3eb89b" : "1px solid #ff3b65",
                borderRadius: "0.2rem",
                padding: "0.5rem",
                width: "5rem",
                textAlign: "center",
              }}
            >
              {item.value}x
            </Box>
          ))}
        </Box>
      </ScrollArea>
    </Box>
  );
};

export default History;
