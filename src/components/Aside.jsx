import { Box, Button, Table } from "@mantine/core";
import React, { useState } from "react";
import logo from "../assets/images/logo.png";
import correct from "../assets/images/correct.png";

const Aside = () => {
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

  const tableHeaders = ["Time", "Bet", "Coeff.", "Cash out", "PF"];

  const tableData = [
    {
      time: "17:26",
      bet: "0.2",
      coeff: "2.56 X",
      cashOut: "0.25$",
      pf: true,
    },
    {
      time: "17:26",
      bet: "0.2",
      coeff: "2.56 X",
      cashOut: "0.25$",
      pf: true,
    },
    {
      time: "17:26",
      bet: "0.2",
      coeff: "2.56 X",
      cashOut: "0.25$",
      pf: true,
    },
    {
      time: "17:26",
      bet: "0.2",
      coeff: "2.56 X",
      cashOut: "0.25$",
      pf: true,
    },
  ];
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
      <img src={logo} alt="logo" />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#3b3363",
          // padding: "1rem",
          borderRadius: "0.2rem",
          height: "100%",
          marginTop: "1.8rem",
        }}
      >
        <Box
          sx={{
            display: "flex",
            padding: "0.5rem",

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
                "& :active": {
                  backgroundColor: "#685AB0",
                },
              }}
              // color="teal"
              // color={activeButton === button.value ? "blue" : "gray"}
              // sx={{
              //     margin: "0.5rem 0",
              //     width: "10rem",
              // }}
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
          }}
          // striped
        >
          <thead>
            <tr>
              {tableHeaders.map((header) => (
                <th
                  key={header}
                  style={{
                    color: "#ae9eff",
                    border: "none !important",
                  }}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tableData.map((data, index) => (
              <tr
                key={data.index}
                style={{
                  backgroundColor: index % 2 === 0 ? "#4a407d" : "#3b3363",
                  border: "2px solid transparent",
                }}
              >
                <td
                  style={{
                    border: "none !important",
                  }}
                >
                  {data.time}
                </td>
                <td>{data.bet}</td>
                <td>{data.coeff}</td>
                <td>{data.cashOut}</td>
                <td>
                  <img src={correct} alt="correct" style={{
                    width: "0.8rem",
                    height: "0.8rem",
                    objectFit: "contain",
                  }}/>
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
