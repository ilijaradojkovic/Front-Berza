import React, { useEffect, useState } from "react";
import { Switch, Box, Text, Modal, Button } from "@mantine/core";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import TimelineIcon from "@mui/icons-material/Timeline";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import LockIcon from "@mui/icons-material/Lock";
import HistoryIcon from "@mui/icons-material/History";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import { ToggleMenuElement } from "./toggle-menu-element";
import { MenuElement } from "./menu-element";
import { MenuSeparator } from "./menu-separator";
import { useDisclosure } from "@mantine/hooks";
import { ChangeAvatar } from "./changeAvatar";
import {GameHistory} from "./../GameHistory.jsx";
import { images } from "../util/globals.js";

export const MenuComponent = ({
  isMenuOpened,
  isSoundOn,
  isMusicOn,
  isAnimationOn,
  toggleSoundSetting,
  toggleMusicSetting,
  toggleAnimationSetting,
  currentUser,
}) => {

  const [openedMenu, { open: openMenu, close: closeMenu }] =
    useDisclosure(false);
  const [openedDialog, { open: openDialog, close: closeDialog }] = useDisclosure(false);
  const [menuOptionSelected, setMenuOptionSelected] = useState(1);

  const [menuItemSelected, setMenuItemSelected] = useState(1);
  const [selectedImageUrl, setSelectedImageUrl] = useState(
    "/src/assets/images/avatar1.jpg"
  );
  const [selectedImageIndex, setSelectedimageIndex] = useState(0);

  const handleChangeAvatarClicked = () => {
    setMenuItemSelected(1);
    openMenu();
  };
  const handleSelectedAvatar = (index, urlImage) => {
    setSelectedimageIndex(index);
    setSelectedImageUrl(urlImage);
  };

  const handleOptionSelected = (value) => {
    setMenuOptionSelected(value);
    openDialog();
  };

  useEffect(() => {
    setSelectedimageIndex(currentUser?.preferences.imageIndex);
    setSelectedImageUrl(images[currentUser?.preferences.imageIndex]);
  }, [currentUser]);

  return (
    <>
      <Modal opened={openedDialog} onClose={closeDialog}  size="xl" withCloseButton={false}  padding="0px"   >
        {menuOptionSelected === 1 && "FREE BETS"}
        {menuOptionSelected === 2 && "FAIR"}
        {menuOptionSelected === 3 && "RULES"}
        {menuOptionSelected === 4 && <GameHistory close={closeDialog}/>}
    
   
      </Modal>

      <Modal
        opened={openedMenu}
        size="lg"
        onClose={closeMenu}
        withCloseButton={false}
        padding="0px" 
      >
        {menuItemSelected === 1 ? (
          <ChangeAvatar
            images={images}
            handleSelectedAvatar={handleSelectedAvatar}
            close={closeMenu}
          />
        ) : (
          <div>drugo</div>
        )}
      </Modal>

      {isMenuOpened && (
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#4a356b",
            position: "absolute",
            top: 50,
            right: 0,
            width: "200%",
            borderRadius: "10px",
            zIndex: 101,
          }}
        >
          <Box
            style={{
              display: "flex",
              padding: "1rem",
              alignItems: "center",
              justifyContent: "space-between",
              zIndex: 101,
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              <img
                src={selectedImageUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "50%",
                }}
              />
            </div>
            <p>Username</p>
            <button
              style={{
                backgroundColor: "#392b54",
                border: "none",
                color: "white",
                padding: "0.5rem",
                cursor: "pointer",
              }}
              onClick={handleChangeAvatarClicked}
            >
              Change Avatar
            </button>
          </Box>
          <ToggleMenuElement
            title="Sound"
            icon={<VolumeUpIcon />}
            isToggle={isSoundOn}
            onChange={toggleSoundSetting}
          />
          <ToggleMenuElement
            title="Music"
            icon={<AudiotrackIcon />}
            isToggle={isMusicOn}
            onChange={toggleMusicSetting}
          />
          <ToggleMenuElement
            title="Animation"
            icon={<TimelineIcon />}
            isToggle={isAnimationOn}
            onChange={toggleAnimationSetting}
          />

          <MenuSeparator />
          <MenuElement
            title="Free Bets"
            onClick={() => handleOptionSelected(1)}
            icon={<StarBorderIcon />}
          />
          <MenuElement
            title="Provably Fair Settings"
            onClick={() => handleOptionSelected(2)}
            icon={<LockIcon />}
          />
          <MenuElement
            title="Game Rules"
            onClick={() => handleOptionSelected(3)}
            icon={<ReceiptLongIcon />}
          />
          <MenuElement
            title="My Bet History"
            onClick={() => handleOptionSelected(4)}
            icon={<HistoryIcon />}
          />
        </Box>
      )}
    </>
  );
};
