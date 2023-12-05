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
import { User } from "../../utils/models/User";
import { useAuth } from "../hooks/useAuth";
import { useLoadingData } from "../hooks/useLoadingData";
import { getMap } from "../../api/MapApiAccessor";
import { useEffect, useState } from "react";
import { getUser } from "../../api/UserApiAccesor";

const SelectedCardPage = ({}) => {
  const { id } = useParams();
  const { isLoggedIn, user } = useAuth();
  const navigate = useNavigate();
  const {
    data: map,
    loading: mapLoading,
    error: mapError,
  } = useLoadingData<Map>(getMap, [{ id }]);
  const [mapUser, setMapUser] = useState<User>(); 

  useEffect(() => {
    const fetchUser = async () => {
      if (map) {
        try {
          const user = await getUser(map.creatorId);
          setMapUser(user);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchUser();
  }, [map]);

  if (!isLoggedIn) {
    navigate("/login");
  }

  return (
    <>
      {mapLoading ? (
        <div>Loading...</div>
      ) : (
        map &&
        mapUser && (
          <>
            <NavBar />
            <div id="content">
              <MapHeader map={map} mapUser={mapUser} />
              <Canvas map={map} />
              <MapAbout map={map} />
              <Comments map={map}/>
            </div>
            <Footer />
          </>
        )
      )}
    </>
  );
};

export default SelectedCardPage;
