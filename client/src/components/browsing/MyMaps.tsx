import "./css/myMaps.css";
import { Text, Pagination, Stack, Box, Group } from "@mantine/core";
import { Link } from "react-router-dom";
import MapCard from "./MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";

function MyMaps() {
  return (
    <>
      <NavBar />
      <div id="content">
        <Stack>
          <Box>
            <Stack gap="xs">
              <Group id="homePageHeaderGroup">
                <Text
                  fw={700}
                  size="xl"
                  id="homePageHeader"
                  ta="left"
                  style={{ width: "50%" }}
                >
                  Your Maps
                </Text>
              </Group>
              <Group
                justify="flex-start"
                grow
                wrap="wrap"
                style={{ width: "100%" }}
              >
                <Link to="/selected">
                  <MapCard private={false}></MapCard>
                </Link>
                <Link to="/selected">
                  <MapCard private={false}></MapCard>
                </Link>
                <Link to="/selected">
                  <MapCard private={false}></MapCard>
                </Link>
                <Link to="/selected">
                  <MapCard private={false}></MapCard>
                </Link>
              </Group>
            </Stack>
          </Box>
          <Group justify="flex-start" grow>
            <Link to="/selected">
              <MapCard private={false}></MapCard>
            </Link>
            <Link to="/selected">
              <MapCard private={false}></MapCard>
            </Link>
            <Link to="/selected">
              <MapCard private={false}></MapCard>
            </Link>
            <Link to="/selected">
              <MapCard private={false}></MapCard>
            </Link>
          </Group>
          <Group justify="flex-start" grow>
            <Link to="/selected">
              <MapCard private={false}></MapCard>
            </Link>
            <Link to="/selected">
              <MapCard private={false}></MapCard>
            </Link>
            <Link to="/selected">
              <MapCard private={false}></MapCard>
            </Link>
            <Link to="/selected">
              <MapCard private={false}></MapCard>
            </Link>
          </Group>
          <Pagination total={10} id="pagination" />;
        </Stack>
      </div>
      <Footer />
    </>
  );
}
export default MyMaps;
