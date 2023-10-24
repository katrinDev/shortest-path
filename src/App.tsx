import React from "react";
import "./App.css";
import executeAlgorithm from "./algorithm/algorithmTimeCounter";
import MainGrid from "./components/mainGrid/MainGrid";
import HideAppBar from "./components/appBar/HideAppBar";

function App() {
  const myGrid = [
    [0, 0, 1, 0, 1],
    [0, 0, 0, 0, 1],
    [0, 0, 1, 0, 1],
    [0, 0, 1, 0, 1],
  ];

  console.log(executeAlgorithm(myGrid, { x: 0, y: 0 }, { x: 3, y: 3 }));

  return (
    <div className="App">
      <HideAppBar>
        <></>
      </HideAppBar>

      <MainGrid />
    </div>
  );
}

export default App;
