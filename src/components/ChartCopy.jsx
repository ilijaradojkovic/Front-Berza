import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartTest = () => {
  const [chart, setChart] = useState([
    { x: new Date("2023-07-28 00:00:00"), y: 70, color: "#008000" }, // Initial color
  ]);

  
  const [gradientColor, setGradientColor] = useState('#008000');

  useEffect(() => {
    const interval = setInterval(() => {
      setChart((prev) => {
        const lastDate = new Date(prev[prev.length - 1].x);
        lastDate.setMinutes(lastDate.getMinutes() + 1);

        const lastValue = prev[prev.length - 1].y;
        const randomChange = Math.random() > 0.5 ? 1 : -1;
        const newValue = lastValue + randomChange;
        const newGradientColor = newValue >= lastValue ? '#008000' : '#FF0000';
        setGradientColor(newGradientColor);

        const newChart = [...prev, { x: lastDate.getTime(), y: newValue }];

        // const newChart = [
        //   ...prev,
        //   { x: lastDate, y: newValue, color },
        // ];

        if (newChart.length > 100) {
          newChart.shift();
        }

        return newChart;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const xaxisMin = typeof chart[0]?.x === 'object' ? chart[0]?.x : new Date(chart[0]);
  const xaxisMax = new Date(xaxisMin.getTime() + 100 * 60 * 1000);

  const getGradientColorStops = (data) => {
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const middleVal = (maxVal + minVal) / 2;
    
    return [
        {
            offset: (minVal / maxVal) * 10,
            color: "#0a95f9",
            opacity: 1
        },
        {
            offset: (middleVal / maxVal) * 100,
            color: "#ffce63",
            opacity: 1
        },
        {
            offset: 100,
            color: "#fc440b",
            opacity: 1
        }
    ];
}

  return (
    <div>
 <ReactApexChart
      options={{
        chart: {
          type: "line", // Promenite tip grafikona u "line"
          height: 350,
        },
        // colors: ["#008FFB", "#00E396", "#CED4DC"],
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: 2,
          curve: "smooth",
          // colors: chart.map(data => data.color),
        },
        fill: {
          type: 'gradient',
          gradient: {
            type: 'vertical',
            shadeIntensity: 1,
            opacityFrom: 1,
            opacityTo: 1,
            colorStops: getGradientColorStops(chart.map(d => d.y))
        }
        },
        legend: {
          position: "top",
          horizontalAlign: "left",
        },
        xaxis: {
          type: "datetime",
          min: xaxisMin?.getTime(),
          max: xaxisMax.getTime(),
        },
        // yaxis: {
        //   min: 60,
        //   max: 80,
        // },
      }}
      series={[
        {
          name: "Test Data",
          data: chart,
        },
      ]}
      type="line" // Promenite tip grafikona u "line" ovde
      height={350}
    />
    </div>
  );
};

export default ChartTest;
