import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ChartTest from "./components/ChartTest";
import { Box } from "@mantine/core";
import Aside from "./components/Aside";
import Footer from "./components/Footer";
import History from "./components/History";
import { MantineProvider } from "@mantine/core";
import Navbar from "./components/Navbar";
import { useViewportSize } from "@mantine/hooks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import KonvaChart from "./components/KonvaChart";
// import PhaserGame from "./components/PhaserGame";
import RechartsChart from "./components/RechartsChart";
import RechartsChart2 from "./components/RechartsChart2";

function App() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [isLandScape, setIsLandscape] = useState(false);
  const [balance, setBalance] = useLocalStorage("balance", 10000);

  const { width, height } = useViewportSize();

  const [bets, setBets] = useLocalStorage("bets", []);

  const [audioPermission, setAudioPermission] = useState(false);

  useEffect(() => {
    if (width > height) {
      setIsLandscape(true);
    } else {
      setIsLandscape(false);
    }
  }, [width, height]);

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
        },
      }}
    >
      <Box
        sx={{
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
          sx={{
            display: "flex",
            flexDirection: isLandScape ? "row" : "column-reverse",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Aside isLandScape={isLandScape} bets={bets} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* <ChartTest start={start} isLandScape={isLandScape} setBalance={setBalance} balance={balance} bets={bets} setBets={setBets}/> */}
            {/* <RechartsChart start={start} isLandScape={isLandScape} setBalance={setBalance} balance={balance} bets={bets} setBets={setBets}/> */}
            {/* <KonvaChart start={start} isLandScape={isLandScape} setBalance={setBalance} balance={balance} bets={bets} setBets={setBets}/> */}
            {/* <PhaserGame isLandScape={isLandScape}/> */}
            <RechartsChart2
              start={start}
              isLandScape={isLandScape}
              setBalance={setBalance}
              balance={balance}
              bets={bets}
              setBets={setBets}
              audioPermission={audioPermission}
            />
          </Box>
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default App;
