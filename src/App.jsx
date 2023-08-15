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


function App() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);
  const [isLandScape, setIsLandscape] = useState(false);

  const { width, height } = useViewportSize();

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
      // withGlobalStyles
      // withNormalizeCSS
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
      <Navbar isLandScape={isLandScape}/>
        <Box
          sx={{
            display: "flex",
            flexDirection: isLandScape ? "row" : "column-reverse",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        > 
          <Aside isLandScape={isLandScape}/>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          > 
            <History />
            <ChartTest start={start}  isLandScape={isLandScape}/>
            <Footer setStart={setStart} isLandScape={isLandScape}/>
          </Box>
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default App;
