import { Box, Button, Table } from "@mantine/core";
import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import correct from "../assets/images/correct.png";
import { thousandSeparator } from "../helpers/formatNumbers";
import { GppBad, GppGood } from "@mui/icons-material";

const Aside = ({ isLandScape, bets }) => {
  const [activeButton, setActiveButton] = useState("0");

  const buttons = [
    {
      name: "All Bets",
      value: "0",
    },
    {
      name: "My Bets",
      value: "1",
    },
    {
      name: "Top Wins",
      value: "2",
    },
  ];

  const scrollBarStyle = {
    "&::-webkit-scrollbar": {
      width: "6px",
    },
    "&::-webkit-scrollbar-track": {
      background: "transparent",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#685AB0",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#685AB09f",
    },
  };

  const tableStyle = {
    maxHeight: "78vh", // Postavite visinu koja vam odgovara
    // width: "300px",
    overflowY: "auto", // Omogućite skrolovanje po vertikali
    display: isLandScape ? "block" : "table",
    ...scrollBarStyle,
  };

  const tableHeaderStyle = {
    position: "sticky",
    width: "110px",

    top: 0,
    zIndex: 1,
    backgroundColor: "#3b3363", // Postavite pozadinu koja vam odgovara
    ...scrollBarStyle,
  };

  const tableHeaders = ["Time", "Bet", "Coeff.", "Cash out", "PF"];

  const sortedBets = activeButton === "2" ? [...bets].sort((a, b) => parseFloat(b.cashOut) - parseFloat(a.cashOut)) : bets;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1rem",
      }}
    >
      {" "}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#3b3363",
          borderRadius: "0.2rem",
          height: "100%",
          width: isLandScape ? "auto" : "100%",
          marginTop: isLandScape ? "0rem" : "0rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "0.5rem",
            justifyContent: "space-between",

            border: "1px solid #685ab0",
            backgroundColor: "#4a407d",
            margin: "1rem",
          }}
        >
          {buttons.map((button) => (
            <Button
              key={button.value}
              onClick={() => setActiveButton(button.value)}
              variant={activeButton === button.value ? "" : ""}
              sx={{
                backgroundColor: activeButton === button.value ? "#685AB0" : "",
                borderRadius: "0rem",
                color: "white",
                width: "100%",
              }}
            >
              {button.name}
            </Button>
          ))}
        </Box>
        <Table
          sx={{
            color: "#ae9eff",
            border: "none",
            "& th": {
              border: "none",
            },
            "& td": {
              border: "none",
            },
            ...tableStyle,
          }}
          // style={tableStyle}
          // striped
        >
          <thead style={tableHeaderStyle}>
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  style={{
                    color: "#ae9eff",
                    border: "none !important",
                    textAlign: "center",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bets &&
              sortedBets.map((data, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#4a407d" : "#3b3363",
                    border: "2px solid transparent",
                  }}
                >
                  <td
                    style={{
                      border: "none !important",
                      textAlign: "center",
                    }}
                  >
                    {String(new Date(data.time).getHours()).padStart(2, "0")}:
                    {String(new Date(data.time).getMinutes()).padStart(2, "0")}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {data?.bet && thousandSeparator(data?.bet)}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {data?.coeff && thousandSeparator(data?.coeff)}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {data?.cashOut && thousandSeparator(data?.cashOut)}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {data?.profit ? (
                      <GppGood
                        sx={{
                          color: "#3eb89b",
                        }}
                      />
                    ) : (
                      <GppBad
                        sx={{
                          color: "#ff3b65",
                        }}
                      />
                    )}
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default Aside;
