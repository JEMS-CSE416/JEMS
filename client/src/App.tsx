import "./App.css";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import SplashScreen from "./components/common/SplashScreen";
import HomeScreen from "./components/browsing/HomeScreen";
import Discover from "./components/browsing/Discover";
import SelectedCardPage from "./components/selectedcard/SelectedCardPage";
import MyMaps from "./components/browsing/MyMaps";
import SearchedMaps from "./components/browsing/SearchedMaps";
import Edit from "./components/edit/Edit";
import Protected from "./components/common/Protected";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />

          <Route element={<Protected />} >
              <Route path="/home" element={<HomeScreen />} />
              <Route path="/map/:id" element={<SelectedCardPage />} />
              <Route path="/myMaps" element={<MyMaps />} />
              <Route path="/discover" element={<Discover />} />
              <Route path="/edit/:id?" element={<Edit />} />
              <Route path="/maps/search/:search?" element={<SearchedMaps />} />
          </Route>
          <Route path="*" element={<Navigate to="/" state={{err404:true}}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
