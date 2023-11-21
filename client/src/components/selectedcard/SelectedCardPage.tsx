import "./css/selectedCardPage.css";
import NavBar from "../common/Navbar";
import MapHeader from "./MapHeader";
import Canvas from "./Canvas";
import MapAbout from "./MapAbout";
import Comments from "./Comments";
import Footer from "../common/Footer";

import { useParams} from "react-router-dom";
import { useEffect, useState} from "react";
import { Map } from "../../utils/models/Map";


const SelectedCardPage = () => {
  const { id } = useParams();
  const [map, setMap] = useState<Map>();
  useEffect(() => {
    // fetch map data from backend
    // set map.
  },[]);
  
  return (
    <>
      <NavBar></NavBar>
      <div id="content">
        <MapHeader></MapHeader>
        <Canvas></Canvas>
        <MapAbout></MapAbout>
        <Comments></Comments>
      </div>
      <Footer></Footer>
    </>
  );
};

export default SelectedCardPage;
