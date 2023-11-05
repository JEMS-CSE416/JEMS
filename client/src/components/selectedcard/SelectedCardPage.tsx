import "../css/selectedCardPage.css";
import NavBar from "../common/Navbar";
import MapHeader from "./MapHeader";
import Canvas from "./Canvas";
import MapAbout from "./MapAbout";
import Footer from "../common/Footer";
const SelectedCardPage = () => {
  return (
    <>
      <NavBar></NavBar>
      <div id="content">
        <MapHeader></MapHeader>
        <Canvas></Canvas>
        <MapAbout></MapAbout>
      </div>
      <Footer></Footer>
    </>
  );
};

export default SelectedCardPage;
