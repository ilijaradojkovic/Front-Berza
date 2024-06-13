import { useEffect, useRef, useState } from "react";

import "./App.css";

import { Box } from "@mantine/core";
import Aside from "./components/Aside";

import { MantineProvider } from "@mantine/core";
import Navbar from "./components/Navbar";
import { useViewportSize } from "@mantine/hooks";
import { useLocalStorage } from "./hooks/useLocalStorage";

import RechartsChart2 from "./components/RechartsChart2";
import { RSocketClient } from "rsocket-core";
import RSocketWebsocketClient from "rsocket-websocket-client";
import { useQuery } from "react-query";
import { getUserData } from "./rest/api";
import { Notifications } from "@mantine/notifications";
import { Chat } from "./components/chat/Chat";

function App() {

  const backgroundMusic = useRef(null);

  const [isSoundOn, setIsSoundOn] = useState(false);
  const [isMusicOn, setIsMusicOn] = useState(false);
  const [isAnimationOn, setIsAnimationOn] = useState(false);

  const [isLandScape, setIsLandscape] = useState(false);
  const [lastValue, setLastValue] = useState(0);
  const { width, height } = useViewportSize();
  //Ovde je bilo useLocalStorage("bets",[])
  const [bets, setBets] = useState([]);

  const [currentUser,setCurrentUser]=useState(null);

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
    console.log(data);
    setCurrentUser(data?.data)
  }, [data]);

  //init socket connection
  useEffect(() => {
    const client = new RSocketClient({
      setup: {
        // ms btw sending keepalive to server
        keepAlive: 60000,
        // ms timeout if no keepalive response
        lifetime: 180000,
        // format of `data`
        dataMimeType: "application/json",
        // format of `metadata`
        metadataMimeType: "message/x.rsocket.routing.v0",
      },
      transport: new RSocketWebsocketClient({
        url: "ws://localhost:9001/",
      }),
    });

    client.connect().subscribe({
      onComplete: (socket) => {
        socket
          .requestStream({
            metadata: String.fromCharCode("game-state".length) + "game-state",
          })
          .subscribe({
            onComplete: () => {
              console.log("complete");
            },
            onError: (error) => {
              console.log(error);
            },
            onNext: (payload) => {
              let dataFromSocket = JSON.parse(payload.data);
              setTick(dataFromSocket.tick);
              setLastValue(dataFromSocket.lastValue);
              if (dataFromSocket.gameState !== gameState)
                setGameState(dataFromSocket.gameState);
            },
            onSubscribe: (subscription) => {
              subscription.request(2147483647);
            },
          });
      },
      onError: (error) => {
        console.log(error);
      },
      onSubscribe: (cancel) => {},
    });
  }, []);


  const playSound = () => {
    console.log(backgroundMusic)
    backgroundMusic.current.play();
  };

  const pauseSound = () => {
    backgroundMusic.current.pause();
  };

  useEffect(()=>{

      if(isMusicOn)
        playSound()
      else pauseSound()
  },[isMusicOn])

  useEffect(()=>{

      setIsAnimationOn(currentUser?.preferences.isAnimationOn)
      setIsMusicOn(currentUser?.preferences.isMusicOn)
      setIsSoundOn(currentUser?.preferences.isSoundOn)

  },[currentUser])

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
      <audio ref={backgroundMusic} src="/src/assets/sounds/backgoundMusic.mp3" loop />

      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          padding: isLandScape ? "2rem" : "1rem",
          height: isLandScape ? window.innerHeight : "auto",
          width: window.innerWidth,
          overflow: "hidden",
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
          toggleSoundSetting={()=>setIsSoundOn(!isSoundOn)}
          toggleMusicSetting={()=>setIsMusicOn(!isMusicOn)}
          toggleAnimationSetting={()=>setIsAnimationOn(!isAnimationOn)}
        />
        <Box
          style={{
            display: "flex",
            flexDirection: isLandScape ? "row" : "column-reverse",
            justifyContent: "space-between",
            height:'100%'
          }}
        >
          <Box style={{width:'20%'}}>
            <Aside isLandScape={isLandScape} bets={bets} currentUser={currentUser} />
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              paddingLeft: "20px",
              paddingRight: "20px",
              width:'65%',
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
          <Box style={{width:'15%',backgroundColor:'red'}}>
            <Chat/>
          </Box>
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default App;
