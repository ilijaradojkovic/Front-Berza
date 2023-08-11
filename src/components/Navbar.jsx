import React from "react";
import logo from "../assets/images/logo.png";
import { Box } from "@mantine/core";
import home from "../assets/images/home.png";
import sound from "../assets/images/sound.png";
import settings from "../assets/images/settings.png";
import bell from "../assets/images/bell.png";
import profile from "../assets/images/profile.png";
import logout from "../assets/images/logout.png";

const Navbar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        color: "white",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <img
          src={home}
          alt="home"
          style={{
            border: "1px solid #3F347D",
            padding: "0.6rem",
            objectFit: "contain",
            marginLeft: "5rem",
          }}
        />
        <p> Home</p>
      </Box>
      <Box sx={{
            border: "1px solid #3F347D",
            padding: "0.6rem",
      }}>
        <b>BALANCE:</b> 25,029.00${" "}
      </Box>
      <Box
        sx={{
          display: "flex",
            alignItems: "center",
          gap: "1rem",
        }}
      >
        <img
          src={sound}
          alt="sound"
          style={{
            border: "1px solid #3F347D",
            padding: "0.6rem",
            objectFit: "contain",
          }}
        />
        <img
          src={settings}
          alt="settings"
          style={{
            border: "1px solid #3F347D",
            padding: "0.5rem",
            objectFit: "contain",
          }}
        />
        <img
          src={bell}
          alt="bell"
          style={{
            border: "1px solid #3F347D",
            padding: "0.6rem 0.4rem 0.1rem",
            objectFit: "contain",
          }}
        />
      </Box>
      <Box sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",    

      }}>
        <img 
            src={profile}
            alt="profile"
            style={{
                border: "1px solid #3F347D",
                padding: "0.5rem",
                objectFit: "contain",
            }}
        />
        <Box sx={{
            display: "flex",
            flexDirection: "column",

            justifyContent: "flex-end",
            alignItems: "flex-end",
        }}>
          <Box>Leslie Alexander</Box>
          <Box sx={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#7864cc",
          }}>
            <img src={logout} alt="logout" />
            Logout</Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Navbar;
