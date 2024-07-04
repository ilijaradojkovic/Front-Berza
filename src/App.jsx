import { useEffect, useRef, useState } from "react";

import "./App.css";

import { Box } from "@mantine/core";
import Aside from "./components/BetSummary/Aside";

import { MantineProvider } from "@mantine/core";
import Navbar from "./components/Navbar";
import { useViewportSize } from "@mantine/hooks";

import RechartsChart2 from "./components/RechartsChart2";

import { useMutation, useQuery } from "react-query";
import { Notifications } from "@mantine/notifications";
import { Chat } from "./components/chat/Chat";
import { getMozzartToken, getUserData } from "./communication/rest";
import { connectToGameState } from "./communication/socket";

function App() {
  const addAccountMutation = useMutation((userToken) => getMozzartToken(userToken), {
    onSuccess: (response) => {
      if(response.data){
        const jwt=response.data.accessToken
        localStorage.setItem('accessToken',jwt)
      }
    },
  });

  useEffect(() => {
    const messageHandler = (event) => {
      console.log(event.origin)
      if (event.origin !== 'http://localhost:5173') { // Replace with the origin of the parent window
        return;
      }
 
      addAccountMutation.mutate(event.data.userId);

    };

    window.addEventListener('message', messageHandler);

    // Cleanup event listener
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);
  const backgroundMusic = useRef(null);

  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isAnimationOn, setIsAnimationOn] = useState(false);

  const [isLandScape, setIsLandscape] = useState(false);
  const [lastValue, setLastValue] = useState(0);
  const { width, height } = useViewportSize();
  //Ovde je bilo useLocalStorage("bets",[])
  const [bets, setBets] = useState([]);

  const [currentUser, setCurrentUser] = useState(null);

  const [audioPermission, setAudioPermission] = useState(false);
  const [gameState, setGameState] = useState("");
  const [tick, setTick] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserData(),
  });

  useEffect(() => {
    if (width > height) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
  }, [width, height]);

  useEffect(() => {
    setCurrentUser(data?.data);
  }, [data]);

  //init socket connection
  useEffect(() => {
    connectToGameState(handlePayload);
  }, []);

  const handlePayload = (payload) => {
    setTick(payload.tick);
    setLastValue(payload.lastValue);
    if (payload.gameState !== gameState) setGameState(payload.gameState);
  };

  const playSound = () => {
    backgroundMusic.current.play();
  };

  const pauseSound = () => {
    backgroundMusic.current.pause();
  };

  useEffect(() => {
    if (isMusicOn) playSound();
    else pauseSound();
  }, [isMusicOn]);

  useEffect(() => {
    setIsAnimationOn(currentUser?.preferences.isAnimationOn);
    setIsMusicOn(currentUser?.preferences.isMusicOn);
    setIsSoundOn(currentUser?.preferences.isSoundOn);
  }, [currentUser]);

  return (
    <MantineProvider
      theme={{
        colors: {
          "ocean-blue": [
            "#01EFB7",
            "#01EFB7",
            "#01EFB7",
            "#01EFB7",
            "#01EFB7",
            "#01EFB7",
            "#01EFB7",
          ],
          "bright-pink": [
            "#F0BBDD",
            "#ED9BCF",
            "#EC7CC3",
            "#ED5DB8",
            "#F13EAF",
            "#F71FA7",
            "#FF00A1",
            "#E00890",
            "#C50E82",
            "#AD1374",
          ],
          "purple-border": ["#3F347D"],
        },
      }}
    >
      <Notifications />
      <audio
        ref={backgroundMusic}
        src="/src/assets/sounds/backgoundMusic.mp3"
        loop
      />
      <Box style={{display:'flex',flexDirection:'column',height:'100vh'}}>
        <Box
          style={{
            padding: "1rem",

          }}
        >
          <Navbar
            isLandScape={isLandScape}
            currentUser={currentUser}
            setAudioPermission={setAudioPermission}
            audioPermission={audioPermission}
            isSoundOn={isSoundOn}
            isMusicOn={isMusicOn}
            isAnimationOn={isAnimationOn}
            toggleSoundSetting={() => setIsSoundOn(!isSoundOn)}
            toggleMusicSetting={() => setIsMusicOn(!isMusicOn)}
            toggleAnimationSetting={() => setIsAnimationOn(!isAnimationOn)}
          />
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
            height: isLandScape ? window.innerHeight : "auto",
            padding:'1rem',
            width: window.innerWidth,
            overflow: "hidden",
            flex:1
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: isLandScape ? "row" : "column-reverse",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Box style={{ width: "20%" }}>
              <Aside
                isLandScape={isLandScape}
                bets={bets}
                currentUser={currentUser}
              />
            </Box>
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                paddingLeft: "20px",
                paddingRight: "20px",
                width: "65%",
              }}
            >
              <RechartsChart2
                isLandScape={isLandScape}
                bets={bets}
                setBets={setBets}
                audioPermission={audioPermission}
                gameState={gameState}
                tick={tick}
                lastValue={lastValue}
                currentUser={currentUser}
                isAnimationOn={isAnimationOn}
              />
            </Box>
            <Box style={{ width: "15%", maxHeight: "100%" }}>
              <Chat currentUser={currentUser} />
            </Box>
          </Box>
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default App;
