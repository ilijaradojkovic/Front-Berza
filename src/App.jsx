import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ChartTest from "./components/ChartTest";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <ChartTest />
    </>
  );
}

export default App;
