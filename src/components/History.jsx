import { Box, Button, ScrollArea,Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getHistoryOfGames } from "../communication/rest.js";
import { useQuery } from "react-query";
import {GameHistory} from "./GameHistory.jsx";
import { useDisclosure } from "@mantine/hooks";

const History = ({ gameState }) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(14);
  const [opened, { open, close }] = useDisclosure(false);

  const { data, refetch } = useQuery(["historyGames"], () =>
    getHistoryOfGames(page, size)
  );

  useEffect(() => {
    refetch();
  }, [gameState]);
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size="xl"
        withCloseButton={false}
        padding="0px"
      >
        <GameHistory close={close} />
      </Modal>
      <Box
        style={{
          display: "flex",
          color: "white",
          gap: "1rem",
          paddingLeft: "1rem",
          alignItems: "center", // Center alignment vertically
          overflow: "hidden",
        }}
      >
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
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
          onClick={()=>open()}
        >
          See All
        </Button>

        <Box
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "nowrap", // Prevent wrapping
          }}
        >
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
        </Box>

        <Box
          style={{
            position: "absolute",
            top: "0",
            right: "0",
            width: "68vw",
            height: "100%",
            backgroundImage:
              "linear-gradient(to right, #00000000 90%, #1e1933 100%)",
            pointerEvents: "none", // Ensure it does not block interaction with the ScrollArea
          }}
        />
      </Box>
    </>
  );
};

export default History;
