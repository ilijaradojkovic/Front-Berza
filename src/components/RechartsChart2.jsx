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
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  ComposedChart,
} from "recharts";
import History from "./History";
import Footer from "./Footer";
import myLottieAnimation from "../assets/lottie/animation4.json";
import Lottie, { useLottieInteractivity } from "lottie-react";
import lottie from "lottie-web";
import confetti from "../assets/lottie/confetti.json";
import coins from "../assets/lottie/coins.json";
import money from "../assets/lottie/money.json";

const CustomDot = ({ x, y, value, isLandScape, gameOver }) => {
  const animContainer = useRef(null);
  const anim = useRef(null);
  const prevValue = useRef(value);

  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    anim.current = lottie.loadAnimation({
      container: animContainer.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
      animationData: myLottieAnimation,
    });

    return () => anim.current.destroy();
  }, []);

  useEffect(() => {
    if (value > prevValue.current) {
      setIsIncreasing(true);
    } else if (value < prevValue.current) {
      setIsIncreasing(false);
    }
    prevValue.current = value;
  }, [value]);

  useEffect(() => {
    if (isIncreasing) {
      anim.current.playSegments([5, 22], true);
    } else {
      anim.current.playSegments([22, 55], true);
    }
  }, [isIncreasing]);

  return (
    <svg
      x={isLandScape ? x - 30 : x - 10}
      y={isLandScape ? y - 20 : y - 10}
      width={isLandScape ? 50 : 30}
      height={isLandScape ? 50 : 30}
      transform={`scale(2)`}
      style={{
        overflow: "visible !important",
      }}
    >
      <foreignObject
        width="100%"
        height="100%"
        transform={`scale(${gameOver ? 1.5 : 1})`}
        style={{
          translate: `${gameOver ? 1.5 : 1}}`,
          transition: "all 1.5s ease-in-out 0.2s",
          transformOrigin: "center",
        }}
      >
        <div
          ref={animContainer}
          style={{
            overflow: "visible !important",
          }}
        />
      </foreignObject>
    </svg>
  );
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

  const apiUrl = "/api";

  const fetchData = async () => {
    const res = await axios.get(apiUrl);

    if (res.data.length < 2) {
      fetchData();
    } else {
      setFetchedData(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const [maxY, setMaxY] = useState(0);

  const updateMaxY = (newData) => {
    const newYMax = Math.max(...newData.map((d) => d.y));
    setMaxY((prevMaxY) => Math.max(prevMaxY, newYMax));
  };

  const updateChart = () => {
    if (fetchedData && fetchedData.length > 0) {
      const intervalId = setInterval(() => {
        setChart((currentData) => {
          const nextIndex = currentData.length;
          if (nextIndex < fetchedData.length) {
            const newData = [
              ...currentData,
              { x: nextIndex, y: fetchedData[nextIndex] },
            ];
            updateMaxY(newData); // Ažuriranje maxY
            return newData;
          } else {
            clearInterval(intervalId);
            return currentData;
          }
        });
      }, 80);
    }
  };

  useEffect(() => {
    updateChart();
  }, [fetchedData]);

  const [gameOver, setGameOver] = useState(false);
  const [ticker, setTicker] = useState(10);
  const [investory, setInvestory] = useLocalStorage("investory", 0);
  const [wins, setWins] = useLocalStorage("wins", 0);
  const [loses, setLoses] = useLocalStorage("loses", 0);

  const [reset, setReset] = useState(false);

  const [history, setHistory] = useLocalStorage("history", []);

  // set game over
  useEffect(() => {
    if (chart?.length === fetchedData?.length) {
      setGameOver(true);
    }
  }, [chart]);

  // set ticker
  useEffect(() => {
    if (gameOver && ticker > 0) {
      // setChart([{ x: 1, y: 1 }]);
      const interval = setInterval(() => {
        setTicker((prev) => {
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
    if (ticker === 0) {
      const timeout = setTimeout(() => {
        setTicker(10);
      }, 1500);
    }
  }, [gameOver, ticker, fetchedData, chart]);

  useEffect(() => {
    if (ticker === 0) {
      setChart([{ x: 1, y: 1 }]);
      setReset(true);
      setGameOver(false);
    }
  }, [ticker]);

  useEffect(() => {
    if (reset) {
      setChart([]);
      setReset(false);
      fetchData();
      setMaxY(2);
    }
  }, [reset]);

  useEffect(() => {
    if (gameOver) {
      // setImagePositionY(0)
      setGameOver(true);
      setHistory((prev) => {
        if (prev && Array.isArray(prev)) {
          return [chart[chart.length - 1].y, ...prev]; // Verovatno ste mislili na `chart.length - 1`
        }
        return [chart[chart.length - 1].y]; // Ako `prev` nije iterabilno, vrati novi niz
      });
    }
  }, [gameOver]);

  // is playing
  useEffect(() => {
    if (gameOver) {
      setIsPlaying(false);
    } else {
      if (chart.length > 50) {
        setIsPlaying(true);
      }
    }
  }, [gameOver, chart]);

  const bgMoving = keyframes({
    "0%": {
      backgroundPositionX: `0%`,
      backgroundPositionY: `0%`,
    },
    "100%": {
      backgroundPositionX: `-100%`,
      // backgroundPositionY: chart[chart.length - 1]?.y > chart[chart.length - 2]?.y ? `100%` : `-100%`,
    },
  });

  const confettiRef = useRef(null);

  const coinsRef = useRef(null);
  const coins2Ref = useRef(null);

  const moneyRef = useRef(null);

  useEffect(() => {
    if (gameOver) {
      confettiRef.current.play();
    } else {
      confettiRef.current.stop();
    }
  }, [gameOver]);

  const [playMoney, setPlayMoney] = useState(false);
  const [playIfHigher, setPlayIfHigher] = useState(5);

  useEffect(() => {
    const currentValue = chart[chart.length - 1]?.y.toFixed(0);

    if (currentValue > playIfHigher) {
      setPlayMoney(true);
      setPlayIfHigher((prev) => prev + prev);
    } 
    // else {
    //   setPlayMoney(false);
    // }
  }, [chart]);

  useEffect(() => {
    if (playMoney) {
      moneyRef.current.play();
      console.log("play");
    } else {
      const timeout = setTimeout(() => {
        moneyRef.current.stop();
      }, 2000);
    }
  }, [playMoney]);

  useEffect(() => {
    if (gameOver) {
      setPlayIfHigher(5);
    }
  }, [gameOver]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <History history={history} />
      <Box
        sx={{
          backgroundImage: `url(${graphbg})`,
          backgroundSize: " 50% auto",
          backgroundPositionX: `0%`,
          backgroundPositionY: `0%`,
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
          animation: `${bgMoving} 4s linear infinite`,
          animationPlayState: isPlaying ? "running" : "paused",
        }}
      >
        <Box
          sx={{
            position: "relative",
            overflow: "visible !important",
          }}
        >
          <ResponsiveContainer
            width={isLandScape ? width / 1.4 : width / 1.1}
            height={isLandScape ? height / 2.27 : height / 3.5}
            style={{
              overflow: "visible !important",
            }}
          >
            <ComposedChart
              data={chart}
              margin={{
                top: 5,
                right: isLandScape ? 30 : 20,
                left: isLandScape ? 20 : 0,
                bottom: isLandScape ? 5 : 0,
              }}
              style={{
                overflow: "visible !important",
              }}
            >
              <defs>
                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#01f9e3" stopOpacity={1} />
                  <stop offset="95%" stopColor="#FF003c" stopOpacity={1} />
                </linearGradient>
              </defs>
              <XAxis dataKey="x" type="number" domain={[0, 50]} />
              <YAxis
                domain={[0, maxY + 1]}
                tickFormatter={(value) => value.toFixed(1)}
              />
              <Line
                type="monotone"
                dataKey="y"
                stroke="url(#colorUv)"
                isAnimationActive={true}
                animationDuration={100}
                animationEasing="ease-out"
                strokeWidth={3}
                dot={false}
              >
                {" "}
              </Line>
              <Scatter
                dataKey="y"
                data={[
                  {
                    x: chart[chart.length - 1]?.x,
                    y: chart[chart.length - 1]?.y,
                  },
                ]}
                style={{
                  rotate: 45,
                }}
                shape={
                  <CustomDot
                    value={chart[chart.length - 1]?.y}
                    isLandScape={isLandScape}
                    gameOver={gameOver}
                  />
                }
                isAnimationActive={false}
              />
            </ComposedChart>
          </ResponsiveContainer>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
              opacity: gameOver ? 1 : 0,
            }}
          >
            <Lottie animationData={confetti} lottieRef={confettiRef} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
              width: `min(80%, 500px)`,
              opacity: playMoney ? 1 : 0,
              transition: playMoney ? "all 0.1s" : "all 5s",
            }}
          >
            <Lottie
              animationData={money}
              lottieRef={moneyRef}
              loop={false}
              onComplete={() => {
                setPlayMoney(false);
              }}
            />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "0%",
              left: "36%",
              transform: `translate(-50%, 50%)`,
              width: "200px",
              //   opacity: gameOver ? 1 : 0,
            }}
          >
            <Lottie animationData={coins} lottieRef={coinsRef} loop={false} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              bottom: "0%",
              left: "88%",
              transform: `translate(-50%, 50%)`,
              width: "200px",
              //   opacity: gameOver ? 1 : 0,
            }}
          >
            <Lottie animationData={coins} lottieRef={coins2Ref} loop={false} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              top: isLandScape ? "20%" : "40%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
              fontSize: isLandScape ? "3rem" : "2rem",
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
              {{ ...chart[chart.length - 1] }?.y?.toFixed(2)}
              {chart.length > 1 ? "x" : ""}
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
      <Footer
        isLandScape={isLandScape}
        gameOver={gameOver}
        setBalance={setBalance}
        balance={balance}
        currentValue={chart[chart.length - 1]?.y}
        bets={bets}
        setBets={setBets}
        investory={investory}
        setInvestory={setInvestory}
        wins={wins}
        setWins={setWins}
        loses={loses}
        setLoses={setLoses}
        coinsRef={coinsRef}
        coins2Ref={coins2Ref}
      />
    </Box>
  );
};

export default RechartsChart2;
