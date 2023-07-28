import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const ChartTest = () => {
  const [chart, setChart] = useState([
    { x: new Date("2023-07-28 00:00:00"), y: 71 },
    { x: new Date("2023-07-28 00:01:00"), y: 72 },
    { x: new Date("2023-07-28 00:02:00"), y: 75 },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChart((prev) => {
        const lastDate = new Date(prev[prev.length - 1].x);
        lastDate.setMinutes(lastDate.getMinutes() + 1);
        return [
          ...prev,
          { x: lastDate, y: Math.floor(Math.random() * 100) },
        ];
      });
    }, 100);
    // Ovde returnujemo funkciju za čišćenje koja će biti pozvana kada se komponenta odmontira.
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <ReactApexChart
        options={{
          chart: {
            type: "area",
            height: 350,
            stacked: true,
          },
          colors: ["#008FFB", "#00E396", "#CED4DC"],
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          fill: {
            type: "gradient",
            gradient: {
              opacityFrom: 0.6,
              opacityTo: 0.8,
            },
          },
          legend: {
            position: "top",
            horizontalAlign: "left",
          },
          xaxis: {
            type: "datetime",
          },
        }}
        series={[
          {
            name: "Test Data",
            data: chart,
          },
        ]}
        type="area"
        height={350}
      />
    </div>
  );
};

export default ChartTest;
