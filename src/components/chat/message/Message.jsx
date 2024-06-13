import { Box } from "@mantine/core";
import React from "react";
import { greenColor, greenLighterColor } from "../../../colors/colors";

export default function Message({ type }) {
  return (
    <Box
      style={{
        padding: "5px",
        display: "flex",
        flexDirection: "column",
        color: "whitesmoke",
        gap: "5px",
        alignItems: "center",
        justifyContent: "start",
      }}
    >
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          flexDirection: "column",

          justifyContent: "start",
          width: "100%",
          gap: "10px",
          borderRadius: "5px",
          backgroundColor: type === "rain" ? greenColor : "transparent",
        }}
      >
        <Box
          style={{
            padding: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "start",
            width: "100%",
            gap: "10px",
            borderRadius: "5px 5px 0px 0px",
            backgroundColor: type === "rain" ? greenLighterColor : "transparent",
          }}
        >
          <img
            style={{ width: "35px", borderRadius: "50%" }}
            src="/src/assets/images/avatar1.jpg"
          />
          <p>m***2</p>
          <p>Sve po zelji</p>
        </Box>
        {type === "rain" && (
            <Box style={{display:'flex',flexDirection:'column',gap:'15px',padding:'10px'}}>


         
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:'15px'
            }}
          >
            <p>50.00 RSD</p>
            <img
              style={{ width: "25px", height: "25px", borderRadius: "50%" }}
              src="/src/assets/images/avatar2.jpg"
            />
          </Box>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:'15px'
            }}
          >
            <p>50.00 RSD</p>
            <img
              style={{ width: "25px", height: "25px", borderRadius: "50%" }}
              src="/src/assets/images/avatar2.jpg"
            />
          </Box>          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap:'15px'
            }}
          >
            <p>50.00 RSD</p>
            <img
              style={{ width: "25px", height: "25px", borderRadius: "50%" }}
              src="/src/assets/images/avatar2.jpg"
            />
          </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
}
