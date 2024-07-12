import { Box, Button, ScrollArea, Modal } from "@mantine/core";
import React, { useEffect, useState } from "react";
import { getHistoryOfGames } from "../../communication/rest.js";
import { useQuery } from "react-query";
import { GameHistory } from "../GameHistory.jsx";
import { useDisclosure } from "@mantine/hooks";
import HistoryItem from "./HistoryItem.jsx";
import HistoryIcon from "@mui/icons-material/History";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const History = ({ gameState }) => {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(15);
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
          position: "relative",
        }}
      >
        <Box
          style={{
            display: "flex",
            gap: "9px",
            flexWrap: "nowrap", // Prevent wrapping
          }}
        >
          {data?.data?.data?.games.map((item, index) => (
            <HistoryItem key={index} element={item} />
          ))}
        </Box>

        <Box
          sx={(theme) => ({
            position: "absolute",
            top: "0",
            right: "0",
            width: "100%",
            height: "100%",
            backgroundImage: `linear-gradient(to right, #00000000 85%, ${theme.colors.blue800[0]} 100%)`,
            pointerEvents: "none", // Ensure it does not block interaction with the ScrollArea
          })}
        />
        <Box
          sx={(theme) => ({
            position:'absolute',
            right:0,
            display: "flex",
            backgroundColor: theme.colors.blue600[0],
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            padding: "5px 15px",
            textAlign: "center",
            zIndex: 100,
            color: theme.colors.white[0],
            cursor:'pointer'
          })}
          onClick={open}
        >
          <HistoryIcon  />
          <KeyboardArrowDownIcon />
        </Box>
      </Box>
    </>
  );
};

export default History;
