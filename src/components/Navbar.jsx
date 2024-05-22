import React from "react";
import logo from "../assets/images/logo.png";
import { Box } from "@mantine/core";
import home from "../assets/images/home.png";
import sound from "../assets/images/sound.png";
import settings from "../assets/images/settings.png";
import bell from "../assets/images/bell.png";
import profile from "../assets/images/profile.png";
import logout from "../assets/images/logout.png";
import { Menu } from "@mui/icons-material";
import { thousandSeparator } from "../helpers/formatNumbers";

const Navbar = ({
  isLandScape,
  balance,
  setAudioPermission,
  audioPermission,
}) => {
  return (
    <Box
      style={{
        display: "flex",
        color: "white",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "1rem",
        position: "relative",
        zIndex: "1",
      }}
    >
      <img src={logo} alt="logo" />
      {isLandScape && (
        <Box
        style={{
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
      )}
      <Box
        style={{
          border: "1px solid #3F347D",
          padding: isLandScape ? "0.6rem" : "0.1rem",
          paddingInline: isLandScape ? "0.6rem" : "0.3rem",
          fontSize: isLandScape ? "1.2rem" : "0.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isLandScape ? "0.6rem" : "0.3rem",
        
        }}
      >
        <b>BALANCE:</b> {balance && thousandSeparator(balance)}${" "}
        <button
          style={{
            width: isLandScape ? "20px" : "16px",
            height: isLandScape ? "20px" : "16px",
            aspectRatio: "1/1",
            background: "transparent",
            border: "none",
            outline: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: "0",
            background: "#199bf5",
            borderRadius: "50%",
            fontSize: "1.2rem",
            fontWeight: "600",
          }}
        >
          <span
            style={{
              color: "#fff",
              background: "#199bf5",
              borderRadius: "50%",
              width: "20px",
              height: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.2rem",
              fontWeight: "600",
        
            }}
          >
            +
          </span>
        </button>
        
      </Box>
      {isLandScape && (
        <>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            {/* <button
              
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            > */}
              <img
                src={sound}
                alt="sound"
                style={{
                  // border: audioPermission ? "1px solid #3F347D" : "1px solid #3F347D08",
                  border: "1px solid #3F347D",
                  padding: "0.6rem",
                  objectFit: "contain",
                }}onClick={() => setAudioPermission(!audioPermission)}
              />
            {/* </button> */}
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
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <img
              src={profile}
              alt="profile"
              style={{
                border: "1px solid #3F347D",
                padding: "0.5rem",
                objectFit: "contain",
              }}
            />
            <Box
              style={{
                display: "flex",
                flexDirection: "column",

                justifyContent: "flex-end",
                alignItems: "flex-start",
                
              }}
            >
              <Box>Leslie Alexander</Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#7864cc",
                }}
              >
                <img src={logout} alt="logout" />
                Logout
              </Box>
            </Box>
          </Box>
        </>
      )}
      {!isLandScape && <Menu />}
    </Box>
  );
};

export default Navbar;
