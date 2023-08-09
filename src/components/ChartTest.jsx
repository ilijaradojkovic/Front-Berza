import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import graphbg from "../assets/graphbg2.png";

const ChartTest = () => {
  const [chart, setChart] = useState([{ x: 1, y: 1 }]);
  const [interpolatedChart, setInterpolatedChart] = useState([...chart]);


  useEffect(() => {
    const interval = setInterval(() => {
      setChart((prev) => {
        const lastNumber = prev[prev.length - 1].x + 0.3;

        const lastValue = prev[prev.length - 1].y;
        const randomChange = Math.random() * 10 - 5; // Nasumično odlučujemo da li povećavamo ili smanjujemo
        const newValue = Math.max(2, Math.min(5, lastValue + randomChange));

        const newChart = [...prev, { x: lastNumber, y: newValue }];

        if (newChart.length > 20) {
          newChart.shift(); // Uklanja prvi podatak ako ima više od 20 podataka
        }

        return newChart;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

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
            x: secondLastPoint.x + (index * 0.1),
            y: secondLastPoint.y + (index * 0.1 * (diffY / diffX))
        };
    });

    pointsToBeAdded.push(lastPoint);
    
    setInterpolatedChart(prev => [...prev.slice(0, -1)]);
    
    pointsToBeAdded.forEach((point, index) => {
        setTimeout(() => {
            setInterpolatedChart(prev => [...prev, point]);
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

  return (
    <div style={{
      backgroundImage: `url(${graphbg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      <ReactApexChart
        options={{
          chart: {
            type: "line", // Promenite tip grafikona u "line"
            height: 350,
          },
          grid: {
            show: false,
          },
          labels: {
            show: false,
          },

          // colors: ["#008FFB", "#00E396", "#CED4DC"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            width: 2,
            curve: "straight",
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
            max: 6,
          },
        }}
        series={[
          // {
          //   name: "Test Data",
          //   data: chart,
          // },
          {
            name: "Interpolated Data",
            data: interpolatedChart,
          }
        ]}
        type="line" // Promenite tip grafikona u "line" ovde
        height={window.innerWidth > 600 ? 750 : 250}
      />
    </div>
  );
};

export default ChartTest;
