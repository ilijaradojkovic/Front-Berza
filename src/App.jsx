import { useState } from "react";
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

function App() {
  const [count, setCount] = useState(0);
  const [start, setStart] = useState(false);

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
          padding: "2rem",
          height: window.innerHeight,
          width: window.innerWidth,
          overflow: "hidden",
        }}
      >
    
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            justifyContent: "space-between",
          }}
        >
          <Aside />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >    <Navbar />
            <History />
            <ChartTest start={start} />
            <Footer setStart={setStart} />
          </Box>
        </Box>
      </Box>
    </MantineProvider>
  );
}

export default App;
