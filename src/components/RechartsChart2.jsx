import React, { useEffect, useRef, useState } from "react";
import graphbg from "../assets/images/graphbg2.png";
import { Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import bitcoin from "../assets/images/bitcoin.png";
import growth from "../assets/images/growth.png";
import fall from "../assets/images/fall.png";
import emoji from "../assets/images/emoji.png";
import axios from "axios";
import { keyframes } from "@emotion/react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { thousandSeparator } from "../helpers/formatNumbers";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
} from "recharts";

const CustomDot = (props) => {
    const { cx, cy, payload, data } = props;
  
    if (data.indexOf(payload) === data.length - 1) {
        console.log(payload)
      return (
        <svg>
          <image x={cx - 10} y={cy - 10} width={20} height={20} href={emoji} />
        </svg>
      );
    }
    console.log(payload)
  
    return null;
  };
  

const RechartsChart2 = ({
  isLandScape,
  setBalance,
  balance,
  bets,
  setBets,
}) => {
  const [chart, setChart] = useState([]);
  const [fetchedData, setFetchedData] = useState(null);
  const { width, height } = useViewportSize();
  const [isPlaying, setIsPlaying] = useState(false);
  const [verticalPosition, setVerticalPosition] = useState(1);

  const apiUrl = "http://157.230.107.88:8001/crypto-run";

  const fetchData = async () => {
    const res = await axios.get(apiUrl);
    console.log(res.data);
    if (res.data.length < 2) {
      fetchData();
    } else {
      setFetchedData(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   useEffect(() => {
  //     if (fetchedData) {
  //       const formattedData = fetchedData.map((item, index) => {
  //         return { x: index, y: item };
  //       });
  //       setChart(formattedData);
  //     }
  //   }, [fetchedData]);

  const updateChart = () => {
    if (fetchedData && fetchedData.length > 0) {
      const intervalId = setInterval(() => {
        setChart((currentData) => {
          const nextIndex = currentData.length;
          if (nextIndex < fetchedData.length) {
            return [
              ...currentData,
              { x: nextIndex, y: fetchedData[nextIndex] },
            ];
          } else {
            clearInterval(intervalId);
            return currentData;
          }
        });
      }, 100); // Dodaje novu tačku svaku sekundu
    }
  };

  useEffect(() => {
    updateChart();
  }, [fetchedData]);

  const bgMoving = keyframes({
    "0%": {
      backgroundPositionX: `0%`,
    },
    "100%": {
      backgroundPositionX: `-100%`,
    },
  });

  const [gameOver, setGameOver] = useState(false);
  const [ticker, setTicker] = useState(10);
  const [investory, setInvestory] = useLocalStorage("investory", 0);
  const [wins, setWins] = useLocalStorage("wins", 0);
  const [loses, setLoses] = useLocalStorage("loses", 0);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${graphbg})`,
          backgroundSize: " 50% auto",
          backgroundPositionX: `0%`,
          backgroundPositionY: `${verticalPosition}%`,
          backgroundAttachment: "fixed",
          transition: "all 0.1s",
          backgroundRepeat: "repeat",
          width: isLandScape ? width / 1.3 : "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isLandScape ? "2.7rem" : "1rem",
          borderRadius: "0.5rem",
          boxShadow: "0 0 1rem rgba(0,0,0,0.2)",
          animation: `${bgMoving} 3s linear infinite`,
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        <Box
          sx={{
            position: "relative",
          }}
        >
          <ResponsiveContainer
            width={isLandScape ? width / 1.4 : width / 1.1}
            height={isLandScape ? height / 2.27 : "auto"}
          >
            <LineChart
              width={730}
              height={250}
              data={chart}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#01f9e3" stopOpacity={1} />
                  <stop offset="95%" stopColor="#FF003c" stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="x" type="number" domain={[0, 30]} />

              <YAxis
                domain={[0, "dataMax + 1"]}
                tickFormatter={(value) => value.toFixed(1)}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="url(#colorUv)"
                isAnimationActive={true}
                animationDuration={100} // Trajanje u milisekundama
                animationEasing="ease-out"
                // dot={false}
                strokeWidth={3}
                dot={<CustomDot data={chart} />}
              >
                {" "}
                {/* <Customized component={<CustomDot data={chart} />} /> */}
              </Line>
            </LineChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: "absolute",
              top: isLandScape ? "20%" : "40%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
              fontSize: isLandScape ? "3rem" : "2.5rem",
              fontWeight: "bold",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                transform: `scale(${gameOver ? 1.5 : 1})`,
                color: gameOver ? "#ff3b65" : "white",
                transition: "all 0.5s",
              }}
            >
              {{ ...chart[chart.length - 1] }?.y?.toFixed(2)}x
            </Box>
            <Box
              sx={{
                opacity: gameOver ? 1 : 0,
                transition: "all 0.5s",
                color: "white",
                fontSize: "1rem",
              }}
            >
              Next withdraw in {ticker}
            </Box>
          </Box>
        </Box>
        {isLandScape && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "stretch",
              alignItems: "center",
              color: "white",
            }}
          >
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                backgroundImage:
                  "linear-gradient(136deg, #2C264A 0%, #4A407D 100%);",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img
                src={bitcoin}
                alt="vite logo"
                style={{
                  width: "1.5rem",
                }}
              />
              INVESTORY {thousandSeparator(investory)}
            </Box>
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                backgroundImage:
                  "linear-gradient(136deg, #2C264A 0%, #4A407D 100%);",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img
                src={growth}
                alt="vite logo"
                style={{
                  width: "1.5rem",
                }}
              />
              WINS {thousandSeparator(wins)}
            </Box>
            <Box
              sx={{
                width: "100%",
                textAlign: "center",
                backgroundImage:
                  "linear-gradient(136deg, #2C264A 0%, #4A407D 100%);",
                padding: "10px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <img
                src={fall}
                alt="vite logo"
                style={{
                  width: "1.5rem",
                }}
              />
              LOSES {thousandSeparator(loses)}
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default RechartsChart2;
