import { Box, ScrollArea } from "@mantine/core";
import React from "react";

const History = ({ history }) => {
  return (
    <Box
      sx={{
        display: "flex",
        color: "white",
        gap: "1rem",
        paddingLeft: "1rem",
        alignItems: "flex-start",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
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
        </Box>
      </Box>
      <ScrollArea
        color="silver"
        sx={{
          width: "68vw",
          height: "150%",
          position: "relative",
        }}
      >
        <Box style={{ display: "flex", gap: "1rem" }}>
          {history?.map((item, index) => (
            <Box
            key={index}
              style={{ display: "inline-block" }}
              sx={{
                backgroundColor: item > 3 ? "#3eb89b2f" : "#ff3b652f",
                border: item > 3 ? "1px solid #3eb89b" : "1px solid #ff3b65",
                borderRadius: "0.2rem",
                padding: "0.5rem",
                width: "5rem",
                textAlign: "center",
              }}
            >
              {item.toFixed(2)}x
            </Box>
          ))}{" "}
          <Box
            sx={{
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
