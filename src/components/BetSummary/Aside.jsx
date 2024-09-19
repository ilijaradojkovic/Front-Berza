import React, { useEffect, useState } from "react";

import { AllBets } from "../all-bets/AllBets";
import { MyBets } from "../my-bets/MyBets";
import { TopWins } from "../top-bets/TopWins";
import { Box, Button, Table } from "@mantine/core";
import { useQuery } from "react-query";
import "./Aside.css";
import { BorderBottom } from "@mui/icons-material";

const Aside = ({ isLandScape, bets, currentUser }) => {
  const [activeButton, setActiveButton] = useState(0);
  //1 je Biggest wins
  const [topWinsType, setTopWinsType] = useState(1);
  const [groupByType, setGroupByType] = useState(0);
  const [betCount, setBetCount] = useState(0);
  const buttons = [
    {
      name: "All Bets",
      value: 0,
    },
    {
      name: "My Bets",
      value: 1,
    },
    {
      name: "Top Wins",
      value: 2,
    },
  ];

  const tableHeaders = ["Time", "Bet", "Coeff.", "Cash out"];

  const toggleTopWinsType = (type) => {
    setTopWinsType(type);
  };

  const toogleGroupBy = (type) => {
    setGroupByType(type);
  };

  const notifyIncomingBets = (bets) => {
    if (bets) setBetCount(bets.length);
  };

  return (
    <Box
      className="custom-scrollbar"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        padding: "15px",
      }}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          width: "100%",
          flexDirection: "column",
          backgroundColor: theme.colors.blue500[0],
          borderRadius: "15px",
          height: "100%",
          marginTop: isLandScape ? "0rem" : "0rem",
        })}
      >
        <Box
          style={{
            display: "flex",
            margin: "10px",
          }}
        >
          <Button
            onClick={() => setActiveButton(0)}
            variant="Transparent"
            sx={(theme) => ({
              borderRadius: "15px 0px 0px 15px",
              backgroundColor: theme.colors.blue800[0],
              color:
                activeButton === 0
                  ? theme.colors.yellow[0]
                  : theme.colors.white[0],
              width: "100%",
            })}
          >
            All Bets
          </Button>
          <Button
            onClick={() => setActiveButton(1)}
            variant="Transparent"
            sx={(theme) => ({
              borderRadius: "0px 0px 0px 0px",
              backgroundColor: theme.colors.blue800[0],
              color:
                activeButton === 1
                  ? theme.colors.yellow[0]
                  : theme.colors.white[0],
              width: "100%",
            })}
          >
            My Bets
          </Button>
          <Button
            onClick={() => setActiveButton(2)}
            variant="Transparent"
            sx={(theme) => ({
              borderRadius: "0px 15px 15px 0px",
              backgroundColor: theme.colors.blue800[0],
              color:
                activeButton === 2
                  ? theme.colors.yellow[0]
                  : theme.colors.white[0],
              width: "100%",
            })}
          >
            Top Wins
          </Button>
        </Box>
        {activeButton === 2 && (
          <Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Box
                style={{
                  padding: "0.5rem",
                  color: "white",
                  borderRadius: "0.2rem",
                  border: topWinsType === 1 ? "1px solid" : "",
                  cursor: "pointer",
                }}
                onClick={() => toggleTopWinsType(1)}
              >
                BIGGEST WINS
              </Box>
            </Box>
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "1rem",
                marginBottom: "1rem",
              }}
            >
              <Box
                style={{
                  padding: "0.5rem",
                  color: "white",
                  borderRadius: "0.2rem",
                  border: groupByType === 0 ? "1px solid" : "",
                  cursor: "pointer",
                }}
                onClick={() => toogleGroupBy(0)}
              >
                Day
              </Box>
              <Box
                style={{
                  padding: "0.5rem",
                  color: "white",
                  borderRadius: "0.2rem",
                  border: groupByType === 1 ? "1px solid" : "",
                  cursor: "pointer",
                }}
                onClick={() => toogleGroupBy(1)}
              >
                Month
              </Box>
              <Box
                style={{
                  padding: "0.5rem",
                  color: "white",
                  borderRadius: "0.2rem",
                  border: groupByType === 2 ? "1px solid" : "",
                  cursor: "pointer",
                }}
                onClick={() => toogleGroupBy(2)}
              >
                Year
              </Box>
            </Box>
          </Box>
        )}
        {activeButton === 0 && (
          <Box
            style={{
              padding: "0rem 1rem",
              display: "flex",
              flexDirection: "column",
              color: "white",
            }}
          >
            <p>ALL BETS</p>
            <p>{betCount}</p>
          </Box>
        )}
        <Box
          style={{
            height: "100%",
            overflow: "hidden",
          }}
        >
          <Box
            style={{
              maxHeight: "82vh",
              overflowY: "auto",
                padding:'0px 15px'
            }}
          >
            <Table
              sx={(theme) => ({
                width: "100%",
                color: theme.colors.gray[1],
                border: "none",
                height:'100%',
              
              })}
            >
              <Box
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                <Box style={{ borderBottom: "solid 1px black" ,display:'flex',justifyContent:'space-around'}}>
                  {" "}
                  {tableHeaders.map((header) => (
                    <Box 
                      key={header}
                      style={{
                        padding: "5px 5px",
                        border: "none !important",
                        textAlign: "center",
                        display:'flex',
                        justifyContent:'start',
                        flex:'1'
                      }}
                    >
                      {header}
                    </Box>
                  ))}
                </Box>
              </Box>
              {activeButton === 0 ? (
                <AllBets notifyIncomingBets={notifyIncomingBets} />
              ) : activeButton === 1 ? (
                <MyBets />
              ) : (
                <TopWins
                  topWinsType={topWinsType}
                  groupByType={groupByType}
                  currentUser={currentUser}
                />
              )}
            </Table>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Aside;
