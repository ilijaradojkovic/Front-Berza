import React, { useEffect, useRef, useState } from "react";
import graphbg from "../assets/images/graphbg2.png";
import { Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import bitcoin from "../assets/images/bitcoin.png";
import growth from "../assets/images/growth.png";
import fall from "../assets/images/fall.png";
import { RSocketClient } from "rsocket-core";
import RSocketWebsocketClient from "rsocket-websocket-client";

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
  CartesianGrid,
  Tooltip,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import History from "./History/History";
import Bets from "./Bets";
import myLottieAnimation from "../assets/lottie/animation4.json";
import Lottie, { useLottieInteractivity } from "lottie-react";
import lottie from "lottie-web";
import confetti from "../assets/lottie/confetti.json";
import coins from "../assets/lottie/coins.json";
import money from "../assets/lottie/money.json";
import explosion from "../assets/lottie/explosion3.json";
import fail from "../assets/sounds/boom.wav";
import timer from "../assets/sounds/timer.wav";
import {
  isFinishedState,
  isStartedState,
  isWaitingState,
} from "./util/game-state";
import { useSpring, animated } from "react-spring";
import { greenColor, redColor } from "../colors/colors";
import { connectToGamePoints } from "../communication/socket";
import { updateUserBalance } from "../communication/rest";
import { useMutation } from "react-query";

// const CustomDot = ({ x, y, value, isLandScape, gameOver, audioPermission }) => {
//   const animContainer = useRef(null);
//   const anim = useRef(null);
//   const prevValue = useRef(value);

//   const [isIncreasing, setIsIncreasing] = useState(false);

//   const [falling, setFalling] = useState(false);

//   const [scale, setScale] = useState(false);

  // useEffect(() => {
  //   if (value < 1) {
  //     setFalling(true);
  //   } else {
  //     setFalling(false);
  //   }
  // }, [value]);

  // useEffect(() => {
  //   if (falling) {
  //     setScale(true);
  //     const timeout = setTimeout(() => {
  //       setScale(false);
  //     }, 1000);
  //   }
  // }, [falling]);

  // useEffect(() => {
  //   const audio = new Audio(fail);
  //   if (falling && audioPermission) {
  //     audio.play();
  //   }
  // }, [falling, audioPermission]);

//   useEffect(() => {
//     // Ako je igra završena, učitava se animacija eksplozije
//     const animationData =  myLottieAnimation;
//     const loop =  true;
//     const speed =  1;


//     anim.current = lottie.loadAnimation({
//       container: animContainer.current,
//       renderer: "svg",
//       loop: loop,
//       // speed: speed,
//       autoplay: true,
//       rendererSettings: {
//         preserveAspectRatio: "xMidYMid slice",
//       },
//       animationData: animationData,
//     });
//     anim.current.setSpeed(speed);

//     return () => anim.current.destroy();
//   }, [y]);

//   // useEffect(() => {
//   //   if (value > prevValue.current) {
//   //     setIsIncreasing(true);
//   //   } else if (value < prevValue.current) {
//   //     setIsIncreasing(false);
//   //   }
//   //   prevValue.current = value;
//   // }, [value]);

//   // useEffect(() => {
//   //   if (isIncreasing) {
//   //     anim.current.playSegments([5, 22], true);
//   //   } else {
//   //     anim.current.playSegments([22, 55], true);
//   //   }
//   // }, [isIncreasing]);

//   return (
//     <svg
//       x={x - 10}
//       y={ y - 10}
//       width={ 30}
//       height={ 30}
//       transform={`scale(2)`}
//       style={{
//         overflow: "visible !important",
//       }}
//     >
//       <foreignObject
//         width="100%"
//         height="100%"
//         transform={`scale(${scale ? 5.5 : 1})`}
//         style={{
//           translate: `1`,
//           transition: `all  0s ease-in-out 0.2s`,
//           transformOrigin: "center",
//         }}
//       >
//         <div
//           ref={animContainer}
//           style={{
//             overflow: "visible !important",u
//           }}
//         />
//       </foreignObject>
//     </svg>
//   );
// };

const CustomDot = ({ chartData, ...props }) => {
  const { cx, cy,index, payload } = props;

  // Determine if the current data point is the last one in the chartData array
  const isLastPoint = chartData[chartData.length - 1] === payload;

  if (isLastPoint) {
    return (
      <svg x={cx - 5} y={cy - 5} width={30} height={30} viewBox="0 0 10 10">
        <circle cx={5} cy={5} r={5} fill="#FF0000" />
      </svg>
    );
  }

  return null;
};

const MiddleSection = ({
  isLandScape,
  setBalance,
  balance,
  bets,
  setBets,
  audioPermission,
  gameState,
  tick,
  lastValue,
  currentUser,
  isAnimationOn,
  casinoConfigurationData,
}) => {
  const updateUserBalanceMutation = useMutation(() => updateUserBalance(), {
    onSuccess: (response) => {
      if (response.data) {
        console.log(response.data);
        // getUser(); // Call the refetch method to get user data
      }
    },
  });

  const { width, height } = useViewportSize();
  const [isBackgroundPlaying, setIsBackgroundPlaying] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const [chartData, setChartData] = useState([]);
  const [currentMultiplier, setCurrentMultiplier] = useState(0);

  const confettiRef = useRef(null);

  const coinsRef = useRef(null);
  const coins2Ref = useRef(null);

  const moneyRef = useRef(null);

  const [playMoney, setPlayMoney] = useState(false);
  const [playIfHigher, setPlayIfHigher] = useState(5);

  const [gameOver, setGameOver] = useState(false);
  const [investory, setInvestory] = useLocalStorage("investory", 0);
  const [wins, setWins] = useLocalStorage("wins", 0);
  const [loses, setLoses] = useLocalStorage("loses", 0);

  const [reset, setReset] = useState(false);
  const [history, setHistory] = useLocalStorage("history", []);
  const [maxY, setMaxY] = useState(1);

  const [prevPoint, setPrevPoint] = useState(1);

  const [segments, setSegments] = useState([]);
  const [isGoingDown, setIsGodingDown] = useState(false);

  useEffect(() => {
    console.log(gameState);
    setIsPlaying(false);
    setGameOver(false);
    if (isWaitingState(gameState)) {
      console.log("RESTARTING GAME DATA");
      setCurrentMultiplier(0);
      setChartData([]);
      setSegments([]);
    } else if (isStartedState(gameState)) {
      setIsPlaying(true);
    } else if (isFinishedState(gameState)) {
      setGameOver(true);
      updateUserBalanceMutation.mutate();
    }
  }, [gameState]);

  const splitDataIntoSegments = (data) => {
    const segments = [];
    if (data.length < 2) {
      return segments;
    }

    let currentSegment = { data: [data[0]], color: greenColor };
    for (let i = 1; i < data.length; i++) {
      const prevPoint = data[i - 1];

      const currPoint = data[i];

      const color = currPoint.y >= prevPoint.y ? greenColor : redColor;
      setIsGodingDown(!(currPoint.y >= prevPoint.y));
      if (color === currentSegment.color) {
        currentSegment.data.push(currPoint);
      } else {
        segments.push(currentSegment);
        currentSegment = { data: [prevPoint, currPoint], color };
      }
    }
    segments.push(currentSegment);
    return segments;
  };

  useEffect(() => {
    connectToGamePoints(handlePayload);
  }, []);

  const handlePayload = (payload) => {
    setCurrentMultiplier(payload.y);
    setChartData((prevChart) => {
      const newChart = [...prevChart, payload];
      const newSegments = splitDataIntoSegments(newChart);
      setSegments(newSegments);
      return newChart;
    });
  };
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

  const springProps = useSpring({
    currentMultiplier,
    from: { currentMultiplier: 0 },
  });
  const [xDomain, setXDomain] = useState([0, 80]);
  const [yDomain, setYDomain] = useState([0, Math.max(...chartData.map(d => d.y)) + 10]);

  useEffect(() => {
    // Update domains on new data
    setXDomain([0, Math.max(...chartData.map(d => d.x))*1.5 + 10]);
    setYDomain([0, Math.max(...chartData.map(d => d.y)) *1.5+ 10]);
  }, [chartData]);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        position: "relative",
        height: "100%",
        padding: "15px 0px",
      }}
    >
      <History gameState={gameState} />

      <Box
        sx={theme=>({
          backgroundSize: " 50% auto",
          backgroundPositionX: `0%`,
          backgroundPositionY: `0%`,
          backgroundAttachment: "fixed",
          transition: "all 0.1s",
          backgroundRepeat: "repeat",
          border:`solid 1px white`,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "15px",
          animation: `${bgMoving} 4s linear infinite`,
          animationPlayState: isBackgroundPlaying ? "running" : "paused",
          position: "relative",
          flex: 1,
        })}
      >
        {(isWaitingState(gameState) || isFinishedState(gameState)) && (
          <Box
            style={{
              backgroundSize: " 50% auto",
              backgroundPositionX: `0%`,
              backgroundPositionY: `0%`,
              position: "absolute",
              backgroundColor: "rgba(0, 0, 0, 0.6)", // Transparent black background
              width: "100%",
              height: "100%",
            }}
          ></Box>
        )}
        <Box
          style={{
            position: "relative",
            overflow: "visible !important",
            height:'100%',
            width:'100%',
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
     
        >
          <AreaChart
        
            data={chartData}
            width={width}
            height={height}
            style={{
              overflow: "visible !important",
              width: "100%",
              height: "100%",
            
             
            }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00FFB2" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#00FFB2" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="x" type="number" domain={xDomain} />
            <YAxis
              domain={yDomain}
              tickFormatter={(value) => value.toFixed(1)}
            />
            {/* {isAnimationOn && */}
              {/* segments.map((segment, index) => ( */}
              <Area type="monotone" dataKey="y" stroke="#8884d8" fill="#8884d8"  dot={<CustomDot chartData={chartData} />}/>

            {/* ))} */}
          </AreaChart>

      
          <Box
            style={{
              position: "absolute",
              top: isLandScape ? "20%" : "40%",
              left: "50%",
              transform: `translate(-50%, -50%)`,
              fontSize: isLandScape ? "3rem" : "2rem",
              color: "white",
              fontWeight: "bold",
              zIndex: 100,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            {gameOver ? (
              <div>
                Flew Away!
                <br />
                {lastValue}
              </div>
            ) : isPlaying ? (
              <animated.span>
                {springProps.currentMultiplier.to((val) => val.toFixed(2))}
              </animated.span>
            ) : (
              `Waiting for player ${10 - tick}`
            )}
          </Box>
        </Box>

      </Box>
      <Bets
        isLandScape={isLandScape}
        gameOver={gameOver}
        setBalance={setBalance}
        balance={balance}
        prevValue={chartData[chartData.length - 2]?.y}
        currentValue={chartData[chartData.length - 1]?.y}
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
        audioPermission={audioPermission}
        gameState={gameState}
        isPlaying={isPlaying}
        currentMultiplier={currentMultiplier}
        currentUser={currentUser}
        isGoingDown={isGoingDown}
        casinoConfigurationData={casinoConfigurationData}
      />
    </Box>
  );
};

export default MiddleSection;
