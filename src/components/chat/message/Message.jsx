import { Box } from "@mantine/core";
import React from "react";
import { greenColor, greenLighterColor } from "../../../colors/colors";
import { images } from "../../util/globals";

export default function Message({ message }) {
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
          backgroundColor:
            message.chatMessageType === "rain" ? greenColor : "transparent",
        }}
      >
    <Box
  style={{
    padding: "5px",
    display: "flex",
    alignItems: "start",
    justifyContent: "start",
    width: "100%",
    gap: "10px",
    borderRadius: "5px 5px 0px 0px",
    backgroundColor:
      message.chatMessageType === "rain"
        ? greenLighterColor
        : "transparent",
  }}
>
  <img
    style={{
      width: "35px",
      height: "35px",
      objectFit: "cover",
      borderRadius: "50%",
    }}
    src={images[message.imageIndex]}
    alt="User Avatar"
  />
 
    <p style={{
      
      overflowWrap: 'break-word', // This CSS property ensures long words wrap to the next line
      wordWrap: 'break-word',     // Fallback for older browsers
      wordBreak: 'break-word'     // Another fallback for older browsers
    }}>{message.username} {message.message}</p>

</Box>
        {message.chatMessageType === "rain" && (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              padding: "10px",
            }}
          >
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
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
                gap: "15px",
              }}
            >
              <p>50.00 RSD</p>
              <img
                style={{ width: "25px", height: "25px", borderRadius: "50%" }}
                src="/src/assets/images/avatar2.jpg"
              />
            </Box>{" "}
            <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
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
