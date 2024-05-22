import { useEffect, useState } from "react";

import "./App.css";

import { Box } from "@mantine/core";
import Aside from "./components/Aside";

import { MantineProvider } from "@mantine/core";
import Navbar from "./components/Navbar";
import { useViewportSize } from "@mantine/hooks";
import { useLocalStorage } from "./hooks/useLocalStorage";

import RechartsChart2 from "./components/RechartsChart2";
import { RSocketClient } from 'rsocket-core';
import RSocketWebsocketClient from 'rsocket-websocket-client';


function App() {
  const [isLandScape, setIsLandscape] = useState(false);
  const [balance, setBalance] = useLocalStorage("balance", 10000);
  const [lastValue, setLastValue] = useState(0);
  const { width, height } = useViewportSize();
  //Ovde je bilo useLocalStorage("bets",[])
  const [bets, setBets] = useState([]);

  const [audioPermission, setAudioPermission] = useState(false);
  const [gameState,setGameState]=useState("");
  const [tick,setTick]=useState(0)
  useEffect(() => {
    if (width > height) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
  }, [width, height]);



  //init socket connection
  useEffect(()=>{

    const client = new RSocketClient({
      setup: {
        // ms btw sending keepalive to server
        keepAlive: 60000,
        // ms timeout if no keepalive response
        lifetime: 180000,
        // format of `data`
        dataMimeType: 'application/json',
        // format of `metadata`
        metadataMimeType: 'message/x.rsocket.routing.v0',
      },
      transport: new RSocketWebsocketClient({
        url: 'ws://localhost:9000/'
      }),
    });
    
    client.connect().subscribe({
      onComplete: socket => {
        socket.requestStream({
          metadata: String.fromCharCode('game-state'.length) + 'game-state',
        }).subscribe({
          onComplete: () => {
            console.log('complete');
          },
          onError: error => {
            console.log(error);
          },
          onNext: payload => {

            let dataFromSocket=JSON.parse(payload.data)
            setTick(dataFromSocket.tick)
            setLastValue(dataFromSocket.lastValue)
            if(dataFromSocket.gameState!==gameState)
              setGameState(dataFromSocket.gameState)
            },
          onSubscribe: subscription => {
            subscription.request(2147483647);
          },
        });
      },
      onError: error => {
        console.log(error);
      },
      onSubscribe: cancel => {
      }
    });
  },[])



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
          "purple-border":['#3F347D']
        },
      }}
    >
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
          balance={balance}
          setAudioPermission={setAudioPermission}
          audioPermission={audioPermission}
        />
        <Box
          style={{
            display: "flex",
            flexDirection: isLandScape ? "row" : "column-reverse",
            justifyContent: "space-between",

          }}
        >
          <Aside isLandScape={isLandScape} bets={bets} />
          <Box
            style={{
              display: "flex",
              flexDirection: "column",

            }}
          >
    
            <RechartsChart2
              isLandScape={isLandScape}
              setBalance={setBalance}
              balance={balance}
              bets={bets}
              setBets={setBets}
              audioPermission={audioPermission}
              gameState={gameState}
              tick={tick}
              lastValue={lastValue}
            
              
            />
          </Box>
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default App;
