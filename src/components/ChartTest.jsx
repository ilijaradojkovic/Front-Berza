import React, { useEffect, useRef, useState } from "react";
import ReactApexChart from "react-apexcharts";
import graphbg from "../assets/images/graphbg2.png";
import { Box } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import bitcoin from "../assets/images/bitcoin.png";
import growth from "../assets/images/growth.png";
import fall from "../assets/images/fall.png";
import emoji from "../assets/images/emoji.png";

const ChartTest = ({ start }) => {
  const [chart, setChart] = useState([{ x: 1, y: 1 }]);
  const [interpolatedChart, setInterpolatedChart] = useState([...chart]);

  const { width, height } = useViewportSize();

  // const [start, setStart] = useState(false);

  useEffect(() => {
    if (start) {
      const interval = setInterval(() => {
        setChart((prev) => {
          const lastNumber = prev[prev.length - 1].x + 0.1;

          const lastValue = prev[prev.length - 1].y;
          const randomChange = Math.random() * 10 - 5; // Nasumično odlučujemo da li povećavamo ili smanjujemo
          const newValue = Math.max(2, Math.min(5, lastValue + randomChange));

          const newChart = [...prev, { x: lastNumber, y: newValue }];

          if (newChart.length > 60) {
            newChart.shift(); // Uklanja prvi podatak ako ima više od 20 podataka
          }

          return newChart;
        });
      }, 100);
      return () => clearInterval(interval);
    }
  }, [start]);

  useEffect(() => {
    if (chart.length === 1) {
      setInterpolatedChart([...chart]);
      return;
    }

    const lastPoint = chart[chart.length - 1];
    const secondLastPoint = chart[chart.length - 2];
    const diffX = lastPoint.x - secondLastPoint.x;
    const diffY = lastPoint.y - secondLastPoint.y;

    const numberOfPoints = Math.abs(diffX) / 0.1;
    const timeInterval = 2000 / numberOfPoints;

    let pointsToBeAdded = Array.from({ length: numberOfPoints }, (_, index) => {
      return {
        x: secondLastPoint.x + index * 0.01,
        y: secondLastPoint.y + index * 0.01 * (diffY / diffX),
      };
    });

    pointsToBeAdded.push(lastPoint);

    setInterpolatedChart((prev) => [...prev.slice(0, -1)]);

    pointsToBeAdded.forEach((point, index) => {
      setTimeout(() => {
        setInterpolatedChart((prev) => [...prev, point]);
      }, timeInterval * index);
    });
  }, [chart]);

  const xaxisMin = chart[0]?.x;
  // const xaxisMax = new Date(chart[0]?.x.getTime() + 200 * 60 * 1000);
  const xaxisMax = chart[0]?.x + 200;

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

  return (
    <Box
      sx={{
        backgroundImage: `url(${graphbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: width / 1.3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2.7rem",
        // height: "10vh",
        // position: "relative",
        borderRadius: "0.5rem",
        boxShadow: "0 0 1rem rgba(0,0,0,0.2)",
      }}
    >
      <Box sx={{
        position: 'relative'
      }}>
        <ReactApexChart
          ref={chartRef}
          options={{
            chart: {
              type: "line", // Promenite tip grafikona u "line"
              height: 350,
              animations: {
                enabled: false,
              },
              toolbar: {
                show: false,
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
              width: 4,
              curve: "smooth",
              // colors: chart.map(data => data.color),
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
              type: "numeric", // Postavite tip x ose na numerički
              labels: {
                formatter: function (value) {
                  return `${value.toFixed()} s`; // Formatira vrednost kao sekunde
                },
              },
              min: chart[0]?.x,
              max: chart[0]?.x + 6,
            },
            yaxis: {
              type: "numeric", // Postavite tip y ose na numerički
              labels: {
                formatter: function (value) {
                  return `${value.toFixed()}.00x`; // Formatira vrednost kao procente
                },
              },
              min: 1,
              max: 7,
              tickAmount: 7,
            },
            annotations: {
              points: [
                {
                  x: chart[chart.length - 1]?.x,
                  y: chart[chart.length - 1]?.y,
                  image: {
                    path: emoji,
                    width: 40,
                    height: 40,
                    offsetX: 0,
                    offsetY: 0,
                    
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
          type="line" // Promenite tip grafikona u "line" ovde
          height={height / 2.27}
          width={width / 1.4}
        />
        <Box sx={{
          position: 'absolute',
          top: '10%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          fontSize: '3rem',
          fontWeight: 'bold',
          zIndex: 100,
        
        }}>
          {{...chart[chart.length - 1]}?.y.toFixed(2)}x
        </Box>
      </Box>
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
    </Box>
  );
};

export default ChartTest;
