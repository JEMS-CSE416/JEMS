import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/common/SplashScreen";
import HomeScreen from "./components/common/HomeScreen";
import Discover from "./components/browsing/Discover";
import SelectedCardPage from "./components/selectedcard/SelectedCardPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/selected" element={<SelectedCardPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
