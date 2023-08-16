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

const ChartTest = ({ isLandScape }) => {
  const [chart, setChart] = useState([{ x: 1, y: 1 }]);
  const [fetchedData, setFetchedData] = useState(null);
  const { width, height } = useViewportSize();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMoving, setIsMoving] = useState(true);
  const [verticalPosition, setVerticalPosition] = useState(1);
  const [isIncreasing, setIsIncreasing] = useState(true);

  const maskUrl = "https://heather-educated-hell.glitch.me/";

  const apiUrl = "http://157.230.107.88:8001/crypto-run";

  const fetchData = async () => {
    const res = await axios.get(apiUrl);
    console.log(res.data);
    // setFetchedData(res.data);
    if (res.data.length < 2) {
      fetchData();
    } else {
      setFetchedData(res.data);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChartUpdate = () => {
    setIsMoving(true);
    let index = 0;

    const interval = setInterval(() => {
      setChart((prev) => {
        const lastNumber = prev[prev.length - 1]?.x + 0.1 || 0;
        const newChart = [...prev, { x: lastNumber, y: fetchedData[index] }];
        if (newChart.length > 60) {
          newChart.shift();
          setIsPlaying(true);
        }
        index++;
        if (index >= fetchedData.length) {
          clearInterval(interval);
          setIsPlaying(false);
          setIsMoving(false);
        }
        return newChart;
      });
    }, 100);
    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (fetchedData) {
      handleChartUpdate();
    }
  }, [fetchedData]);

  const getGradientColorStops = (data) => {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const middleVal = (maxVal + minVal) / 2;

    return [
      {
        offset: (minVal / maxVal) * 10,
        color: "#01f9e3",
        opacity: 1,
      },
      {
        offset: (middleVal / maxVal) * 50,
        color: "#5aa2a5",
        opacity: 1,
      },
      {
        offset: 100,
        color: "#FF003c",
        opacity: 1,
      },
    ];
  };

  const chartRef = useRef(null);

  const getHighestY = () => {
    const series = chartRef.current?.chart?.w.config?.series[0]?.data;
    if (!series) return 0;
    return Math.max(...series.map((d) => d.y));
  };

  const checkIncreasing = () => {
    const yValue = chart[chart.length - 1]?.y;
    const yValue2 = chart[chart.length - 2]?.y;
    if (yValue > yValue2) {
      setIsIncreasing(true);
    } else {
      setIsIncreasing(false);
    }
  };

  useEffect(() => {
    checkIncreasing();
  }, [chart]);

  useEffect(() => {
    if (chart.length > 1 && isMoving) {
      if (isIncreasing) {
        const interval = setInterval(() => {
          setVerticalPosition((prev) => {
            return prev + 1;
          });
        }, 100);
        return () => clearInterval(interval);
      } else {
        const interval = setInterval(() => {
          setVerticalPosition((prev) => {
            return prev - 1;
          });
        }, 100);
        return () => clearInterval(interval);
      }
    }
  }, [isIncreasing, isMoving]);

  const bgMoving = keyframes({
    "0%": {
      backgroundPositionX: `0%`,
    },
    "100%": {
      backgroundPositionX: `-100%`,
    },
  });

  const [imagePositionX, setImagePositionX] = useState(0);
  const [imagePositionY, setImagePositionY] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [reset, setReset] = useState(false);
  const [ticker, setTicker] = useState(10);

  useEffect(() => {
    if (!isMoving) {
      setGameOver(true);
      if (imagePositionX < 2000) {
        const interval = setInterval(() => {
          setImagePositionX((prev) => {
            return prev + 10;
          });
          if (isIncreasing) {
            setImagePositionY((prev) => {
              return prev - 4;
            });
          } else {
            setImagePositionY((prev) => {
              return prev + 4;
            });
          }
        }, 10);

        return () => clearInterval(interval);
      }
    }
  }, [chart, isMoving, imagePositionX]);

  useEffect(() => {
    if (gameOver && ticker > 0) {
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
      setChart([{ x: 1, y: 1 }]);
      setImagePositionX(0);
      setImagePositionY(0);
    }
  }, [gameOver, ticker, fetchedData, reset, chart]);

  useEffect(() => {
    if (ticker === 0) {
      setReset(true);
      setGameOver(false);
    }
  }, [ticker]);

  useEffect(() => {
    if (reset) {
      fetchData();
      setGameOver(false);
      setReset(false);
      setIsMoving(true);
      let index = 0;
      const interval = setInterval(() => {
        setChart((prev) => {
          const lastNumber = prev[prev.length - 1]?.x + 0.1 || 0;
          const newChart = [...prev, { x: lastNumber, y: fetchedData[index] }];
          if (newChart.length > 60) {
            newChart.shift();
            setIsPlaying(true);
          }
          index++;
          if (index >= fetchedData.length) {
            clearInterval(interval);
            setIsPlaying(false);
            setIsMoving(false);
          }
          return newChart;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [reset]);

  return (
    <>
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
          <ReactApexChart
            ref={chartRef}
            options={{
              chart: {
                type: "line",
                height: 350,
                animations: {
                  enabled: false,
                },
                toolbar: {
                  show: false,
                },
                zoom: {
                  enabled: false,
                },
              },
              tooltip: {
                enabled: false,
              },
              grid: {
                show: false,
              },
              labels: {
                show: false,
              },
              dataLabels: {
                enabled: false,
              },
              stroke: {
                width: 5,
                curve: "smooth",
                lineCap: "round",
              },
              fill: {
                type: "gradient",
                gradient: {
                  type: "vertical",
                  shadeIntensity: 1,
                  opacityFrom: 1,
                  opacityTo: 1,
                  colorStops: getGradientColorStops(chart.map((d) => d.y)),
                  inverseColors: true,
                },
              },
              legend: {
                position: "top",
                horizontalAlign: "left",
              },
              xaxis: {
                type: "numeric",
                labels: {
                  formatter: function (value) {
                    return `${value?.toFixed()} s`;
                  },
                },
                min: chart[0]?.x,
                max: chart[0]?.x + 6,
              },
              yaxis: {
                type: "numeric",
                labels: {
                  formatter: function (value) {
                    return `${value?.toFixed(2)}x`;
                  },
                },
                min: 1,
                max: getHighestY() + 1,
                tickAmount: 5,
              },
              annotations: {
                points: [
                  {
                    x: chart[chart.length - 1]?.x,
                    y: chart[chart.length - 1]?.y,
                    marker: {
                      size: 0,
                    },
                    image: {
                      path: emoji,
                      width: 40,
                      height: 40,
                      offsetX: imagePositionX,
                      offsetY: imagePositionY,
                    },
                  },
                ],
              },
            }}
            series={[
              {
                name: "Test Data",
                data: chart,
              },
            ]}
            type="line"
            height={isLandScape ? height / 2.27 : "auto"}
            width={isLandScape ? width / 1.4 : width / 1.1}
          />
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
              INVESTORY 868.01
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
              WINS 868.01
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
              LOSES 868.01
            </Box>
          </Box>
        )}
      </Box>
      {!isLandScape && (
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
            INVESTORY 868.01
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
            WINS 868.01
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
            LOSES 868.01
          </Box>
        </Box>
      )}
    </>
  );
};

export default ChartTest;
