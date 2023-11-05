import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/common/SplashScreen";
import HomeScreen from "./components/common/HomeScreen";
import DiscoverMaps from "./components/browsing/DiscoverMaps";
import SelectedCardPage from "./components/selectedcard/SelectedCardPage";
import CreateMapModal from "./components/common/CreateMapModal";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen/>} />
          <Route path="/home" element={<HomeScreen/>} />
          <Route path="/discover" element={<DiscoverMaps/>} />
          <Route path="/selected" element={<SelectedCardPage/>} />
        </Routes>
      </BrowserRouter>
      <CreateMapModal/>
    </div>
  );
}

export default App;
