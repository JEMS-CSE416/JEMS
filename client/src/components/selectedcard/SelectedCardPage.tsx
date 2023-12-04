import "./css/selectedCardPage.css";
import NavBar from "../common/Navbar";
import MapHeader from "./MapHeader";
import Canvas from "./Canvas";
import MapAbout from "./MapAbout";
import Comments from "./Comments";
import Footer from "../common/Footer";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Map } from "../../utils/models/Map";
import { useAuth } from "../hooks/useAuth";
import { useLoadingData } from "../hooks/useLoadingData";
import { getMap } from "../../api/MapApiAccessor";


const SelectedCardPage = ({}) => {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const { data: map, loading, error } = useLoadingData(getMap, [{ id }]);

  if (!isLoggedIn) {
    navigate("/login");
  }
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        map && (
          <>
            <NavBar />
            <div id="content">
              <MapHeader map={map}/>
              <Canvas map={map}/>
              <MapAbout map={map}/>
              <Comments/>
            </div>
            <Footer />
          </>
        )
      )}
    </>
  );
};

export default SelectedCardPage;
