import React from "react";
import "./App.css";
import { useState } from "react";
// import Canvas from "./components/Canvas";
// import Header from "./components/Header";
import { FileInfo, initialFileInfo } from "./utils/global_utils";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Browser } from "leaflet";
import SplashScreen from "./components/common/SplashScreen";
import HomeScreen from "./components/common/HomeScreen";

function App() {
  const [fileInfo, setFileInfo] = useState<FileInfo>(initialFileInfo);

  const handleFileUpload = (file: string, content: string) => {
    // Create a new object with the updated values and set it as the new state
    setFileInfo({
      ...fileInfo, // Spread the current state to retain any other properties
      fileType: file,
      fileContent: content
    });
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen/>} />
          <Route path="/home" element={<HomeScreen/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
