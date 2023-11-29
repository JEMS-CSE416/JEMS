import "./css/selectedCardPage.css";
import NavBar from "../common/Navbar";
import MapHeader from "./MapHeader";
import Canvas from "./Canvas";
import MapAbout from "./MapAbout";
import Comments from "./Comments";
import Footer from "../common/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Map } from "../../utils/models/Map";
import { useAuthContext } from "../../context/AuthContextProvider";

/* Custom React Hook, selectedMap content can now be accessed without passing as a prop */
export const useSelectedMap = () => {
  const location = useLocation();
  const selectedMap = location.state;
  return selectedMap as Map;
};

const SelectedCardPage = ({}) => {
  const { id } = useParams();
  const [map, setMap] = useState<Map>();
  const auth = useAuthContext();
  const navigate = useNavigate();


  useEffect(() => {
    // fetch map data from backend
    // set map.
  }, []);

  const selectedMap: Map = useSelectedMap();
  console.log("Selected Map Details");
  console.log(selectedMap);

  if(auth.user?._id != selectedMap.creatorId)
    navigate('/', {state:{err401: true}})

  return (
    <>
      <NavBar/>
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
