import React, { useEffect, useState } from "react";
import { Box, Divider, TextInput } from "@mantine/core";
import { thousandSeparator } from "../helpers/formatNumbers";
import LogoutIcon from "@mui/icons-material/Logout";
import logo from "../assets/images/logo.png";
import home from "../assets/images/home.png";
import sound from "../assets/images/sound.png";
import settings from "../assets/images/settings.png";
import bell from "../assets/images/bell.png";
import profile from "../assets/images/profile.png";
import logout from "../assets/images/logout.png";

const Navbar = ({
  isLandScape,
  currentUser,
  setAudioPermission,
  audioPermission,
  isSoundOn,
  isMusicOn,
  isAnimationOn,
  toggleSoundSetting,
  toggleMusicSetting,
  toggleAnimationSetting,
  handleImageChange,
  selectedImageIndex,
}) => {
  const [openMenu, setOpenMenu] = useState(false);
  const [balanceValue, setBalanceValue] = useState(
    currentUser?.balance ? thousandSeparator(currentUser.balance) : ""
  );

  const handleOpenMenu = () => {
    setOpenMenu(!openMenu);
  };

  const handleBalanceChange = (event) => {
    // Update balanceValue state when input changes
    setBalanceValue(event.target.value);
  };
  useEffect(()=>{
    setBalanceValue(    currentUser?.balance ? thousandSeparator(currentUser.balance) : ""  )
  },[currentUser?.balance])

  return (
    <Box
      sx={(theme) => ({
        display: "flex",
        color: "white",
        justifyContent: "space-between",
        alignItems: "center",
        zIndex: "1",
        padding: "10px",
        backgroundColor: theme.colors.blue600[0],
      })}
    >
      <Box
        sx={{
          padding: "0px 15px",
          display: "flex",
          justifyContent: "flex",
          alignItems: "flex",
        }}
      >
        <img src={logo} alt="logo" />
      </Box>
      <Box
        style={{
          fontSize: isLandScape ? "1.2rem" : "0.8rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          gap: isLandScape ? "0.6rem" : "0.3rem",
        }}
      >
        <Box
          sx={(theme) => ({
            backgroundColor: theme.colors.blue800[0],
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "15px",
            width: "10%",
            padding: "0px 20px",
          })}
        >
          <TextInput
            value={balanceValue}
            onChange={handleBalanceChange}
            sx={(theme) => ({
              input: {
                backgroundColor: theme.colors.blue800[0],
                textAlign: "center",
                border: "none",
                color: theme.colors.green[3],
                fontWeight: "bold",
                fontSize: "20px",
                borderRadius: "15px",
              },
            })}
          />
          
          <span>{currentUser?.balance && currentUser?.casinoCurrency}</span>
        </Box>
      </Box>
      <Box
        sx={{
          padding: "0px 10px",
          display: "flex",
          gap: "20px",
        }}
      >
        <Box>Username</Box>

        <Divider sx={{ opacity: "40%" }} orientation="vertical" />

        <LogoutIcon />
      </Box>
    </Box>
  );
};

export default Navbar;
