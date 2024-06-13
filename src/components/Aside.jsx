import React, { useEffect, useState } from "react";

import { AllBets } from "./all-bets/AllBets";
import { MyBets } from "./my-bets/MyBets";
import { TopWins } from "./top-bets/TopWins";
import { Box, Button, Table } from "@mantine/core";
import { useQuery } from "react-query";
import { fetchUser } from "../rest/api";

const Aside = ({ isLandScape, bets,currentUser }) => {
  const [activeButton, setActiveButton] = useState(0);
  const [topWinsType, setTopWinsType] = useState(0);
  const [groupByType, setGroupByType] = useState(0);
  const [betCount,setBetCount]=useState(0)
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



  const tableHeaders = ["Time", "Bet", "Coeff.", "Cash out", "PF"];

  const toggleTopWinsType = (type) => {
    setTopWinsType(type);
  };

  const toogleGroupBy=(type)=>{
    setGroupByType(type)
  }

  const notifyIncomingBets=(bets)=>{
    if(bets)
    setBetCount(bets.length)
  }

  return (
    <Box
      style={{
      
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "blue",
        width: "100%",
        height:'100%'
      }}
    >
      <Box
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          backgroundColor: "#3b3363",
          borderRadius: "0.2rem",
          height: "100%",
          width: "100%",
          marginTop: isLandScape ? "0rem" : "0rem",
        }}
      >
        <Box
          style={{
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
              variant="Transparent"
              style={{
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
                  border: topWinsType == 0 ? "1px solid" : "",
                  cursor: "pointer",
                }}
                onClick={() => toggleTopWinsType(0)}
              >
                MULTIPLIERS
              </Box>
              <Box
                style={{
                  padding: "0.5rem",
                  color: "white",
                  borderRadius: "0.2rem",
                  border: topWinsType == 1 ? "1px solid" : "",
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
                  border: groupByType == 0 ? "1px solid" : "",
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
                  border: groupByType == 1 ? "1px solid" : "",
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
                  border: groupByType == 2 ? "1px solid" : "",
                  cursor: "pointer",
                }}
                onClick={() => toogleGroupBy(2)}
              >
                Year
              </Box>
            </Box>
          </Box>
        )}
        { (activeButton==0) && <Box style={{
          padding:'0rem 1rem',
          display:'flex',
          flexDirection:'column',
          color:'white'
        }}>
          <p>ALL BETS</p>
          <p>{betCount}</p>
        </Box>}
        <Table
          style={{
            maxHeight: "70vh",
            width: "100%",
            overflow: "scroll !important",
            color: "#ae9eff",
            border: "none",

            "& th": {
              border: "none",
            },
            "& td": {
              border: "none",
            },
            "&::WebkitScrollbar": {
              width: "6px",
            },
            "::WebkitScrollbarTrack": {
              background: "transparent",
            },
            "::WebkitScrollbarThumb": {
              background: "#685AB0",
              borderRadius: "5px",
            },
            "&::WebkitScrollbarThumb:hover": {
              background: "#685AB09f",
            },
            // ...tableStyle,
          }}
          // style={tableStyle}
          // striped
        >
          <thead
            style={{
              position: "sticky",
              zIndex: 1,
              backgroundColor: "#3b3363",
            }}
          >
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
          {activeButton === 0 ? (
            <AllBets notifyIncomingBets={notifyIncomingBets} />
          ) : activeButton === 1 ? (
            <MyBets />
          ) : (
            <TopWins topWinsType={topWinsType} groupByType={groupByType} currentUser={currentUser}/>
          )}
        </Table>
      </Box>
    </Box>
  );
};

export default Aside;
