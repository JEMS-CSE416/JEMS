import "../css/homePage.css";
import { Group, Text } from "@mantine/core";
import MapCard from "./MapCard";
import NavBar from "../common/Navbar";

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
        <MapCard private={true}></MapCard>
        <MapCard private={true}></MapCard>
        <MapCard private={false}></MapCard>
        <MapCard private={false}></MapCard>
        <Group id="homePageHeaderGroup">
          <Text fw={700} size="xl" id="homePageHeader" ta="left">
            Discover Maps
          </Text>
          <Text size="sm" ta="right" id="seeAll">
            See all
          </Text>
        </Group>
        <MapCard private={false}></MapCard>
        <MapCard private={false}></MapCard>
        <MapCard private={false}></MapCard>
        <MapCard private={false}></MapCard>
        <div>
          <MapCard private={false}></MapCard>
          <MapCard private={false}></MapCard>
          <MapCard private={false}></MapCard>
          <MapCard private={false}></MapCard>
        </div>
      </div>
    </>
  );
};

export default HomePage;
