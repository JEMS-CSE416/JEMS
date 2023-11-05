import "../css/homePage.css";
import { Group, Text } from "@mantine/core";
import MapCard from "../browsing/MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <NavBar></NavBar>
      <div id="content">
        <Group id="homePageHeaderGroup">
          <Text fw={700} size="xl" id="homePageHeader" ta="left">
            Your Maps
          </Text>
          <Text size="sm" id="seeAll">
            See all
          </Text>
        </Group>
        <Link to="/selected">
          <MapCard private={true}></MapCard>
          <MapCard private={true}></MapCard>
          <MapCard private={false}></MapCard>
          <MapCard private={false}></MapCard>
        </Link>
        <Group id="homePageHeaderGroup">
          <Text fw={700} size="xl" id="homePageHeader" ta="left">
            Discover Maps
          </Text>
          <Text size="sm" ta="right" id="seeAll">
            See all
          </Text>
        </Group>
        <Link to="/selected">
          <MapCard private={false}></MapCard>
          <MapCard private={false}></MapCard>
          <MapCard private={false}></MapCard>
          <MapCard private={false}></MapCard>
        </Link>
        <div>
          <Link to="/selected">
            <MapCard private={false}></MapCard>
            <MapCard private={false}></MapCard>
            <MapCard private={false}></MapCard>
            <MapCard private={false}></MapCard>
          </Link>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
