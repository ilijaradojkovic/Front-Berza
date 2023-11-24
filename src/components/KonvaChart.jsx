// import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Image } from "react-konva";
import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import graphbg from "../assets/images/graphbg2.png";
import { Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import bitcoin from "../assets/images/bitcoin.png";
import growth from "../assets/images/growth.png";
import fall from "../assets/images/fall.png";
import emoji from "../assets/images/emoji.png";
import axios from "axios";
import { keyframes } from "@emotion/react";
import Footer from "./Footer";
import History from "./History";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { thousandSeparator } from "../helpers/formatNumbers";
import { useSpring, animated } from "react-spring";

const KonvaChart = ({ isLandScape, setBalance, balance, bets, setBets }) => {
  const { width, height } = useViewportSize();

  const konvaHeight = isLandScape ? height / 2.27 : height / 2.5;
  const konvaWidth = isLandScape ? width / 1.4 : width / 1.1;
  const [chart, setChart] = useState([0, konvaHeight]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    setChart([0, konvaHeight]);
  }, [konvaHeight]);

  const [fetchedData, setFetchedData] = useState([]);
  const apiUrl = "http://157.230.107.88:8001/crypto-run";

  const fetchData = async () => {
    const res = await axios.get(apiUrl);
    // console.log(res.data);
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
  //     let animationFrameId;

  //     const scaleX = konvaWidth / fetchedData.length;
  //     const scaleY = konvaHeight / Math.max(...fetchedData);
  //     let currentPointIndex = 0;

  //     const animateLine = () => {
  //       if (currentPointIndex < fetchedData.length) {
  //         const timer = setTimeout(() => {
  //         const newPointX = currentPointIndex * scaleX;
  //         const newPointY = konvaHeight - fetchedData[currentPointIndex] * scaleY;
  //         setChart((prevChart) => [...prevChart, newPointX, newPointY]);
  //         currentPointIndex++;
  //         animationFrameId = requestAnimationFrame(animateLine);
  //         }, 1000);
  //       }
  //     };

  //     animateLine();

  //     return () => {
  //       cancelAnimationFrame(animationFrameId); // Čišćenje na unmount
  //     };
  //   }, [fetchedData, konvaWidth, konvaHeight]);

  useEffect(() => {
    let currentPointIndex = 0;

    const timer = setInterval(() => {
      if (currentPointIndex < fetchedData.length) {
        const scaleX = konvaWidth / fetchedData.length;
        const scaleY = konvaHeight / Math.max(...fetchedData);
        const newPointX = currentPointIndex * 25;
        const newPointY = konvaHeight - fetchedData[currentPointIndex] * 200 + 100;
        setChart((prevChart) => [...prevChart, newPointX, newPointY]);
        currentPointIndex++;
      }
    }, 100);

    return () => {
      clearInterval(timer);
    };
  }, [fetchedData, konvaWidth, konvaHeight]);

  useEffect(() => {
    const img = new window.Image();
    img.src = emoji;
    img.width = 50;
    img.height = 50;
    img.onload = () => {
      setImage(img);
    };
  }, []);

  useEffect(() => {
    console.log(chart);
  }, [chart]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {/* <History history={history} /> */}
      <Box
        sx={{
          backgroundImage: `url(${graphbg})`,
          backgroundSize: " 50% auto",
          backgroundPositionX: `0%`,
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
        }}
      >
        <Box
          sx={{
            position: "relative",
            border: "1px solid #685ab0",
          }}
        >
          <Stage width={konvaWidth} height={konvaHeight}>
            <Layer>
              <Line
                points={chart}
                stroke="#685ab0"
                strokeWidth={5}
                tension={0.5}
                lineCap="round"
              />
              {image && chart?.length >= 2 && (
                <Image
                  image={image}
                  x={chart[chart.length - 2] - image.width / 2}
                  y={chart[chart.length - 1] - image.height / 2}
                />
              )}
            </Layer>
          </Stage>
        </Box>
      </Box>
      <Footer
        isLandScape={isLandScape}
        // gameOver={gameOver}
        setBalance={setBalance}
        balance={balance}
        // currentValue={chart[chart.length - 1]?.y}
        bets={bets}
        setBets={setBets}
        // investory={investory}
        // setInvestory={setInvestory}
        // wins={wins}
        // setWins={setWins}
        // loses={loses}
        // setLoses={setLoses}
      />
    </Box>
  );
};

export default KonvaChart;
