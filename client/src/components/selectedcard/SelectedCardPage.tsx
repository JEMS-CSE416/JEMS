import "../css/selectedCardPage.css"
import NavBar from "../common/Navbar";
import MapHeader from "./MapHeader";
import Footer from "../common/Footer";
const SelectedCardPage = () => {
  return (
    <>
    <NavBar></NavBar>
    <div id="content">
        <MapHeader></MapHeader>
    </div>
    <Footer></Footer>
    </>
  );
};

export default SelectedCardPage;
