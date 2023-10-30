import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";
import Canvas from "./components/Canvas";
import Header from "./components/Header";
import { FileInfo, initialFileInfo } from "./utils/global_utils";

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
      <Header onFileUploadSetInfo={handleFileUpload} />
      <Canvas 
        fileInfo={fileInfo}/>
    </div>
  );
}

export default App;
