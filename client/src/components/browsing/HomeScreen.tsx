import "./css/homeScreen.css";
import { Group, Text, Stack, Box, Button, Image, Grid } from "@mantine/core";
import MapCard from "../browsing/MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ellipses from "../../assets/images/ellipses.png";
import { getMaps } from "../../api/MapApiAccessor";
import { Map } from "../../utils/models/Map";

const HomePage = () => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [yourMaps, setYourMaps] = useState<Map[]>([]);

  useEffect(() => {
    getPublicMaps();
    getYourMaps();
  }, []);

  const getPublicMaps = async () => {
    try {
      const responseData = await getMaps({ isPrivate: false });
      console.log("Public Maps fetched successfully:", responseData);
      setMaps(responseData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const getYourMaps = async () => {
    try {
      const responseData = await getMaps({
        session_token: "652daf32e2225cdfeceea14f",
        creatorId: "652daf32e2225cdfeceea14f",
      });
      console.log("Your Maps fetched successfully:", responseData);
      setYourMaps(responseData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const cardSpan = { base: 12, sm: 6, md: 6, lg: 4, xl: 3 };

  return (
    <>
      <NavBar></NavBar>
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
                <Link to="/myMaps" id="seeAllLink">
                  <Text size="sm" ta="right">
                    See all{" "}
                  </Text>
                </Link>
              </Group>
              <Grid style={{ textAlign: "initial" }}>
                {yourMaps.map((map,i) => (
                  <Grid.Col span={cardSpan}>
                    <Link to="/selected">
                      <MapCard id={`MyMapCard${i+1}`} name={map.mapName} description={map.description} isPrivate={!map.public} map={map} />
                    </Link>
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Box>
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
                  {" "}
                  Discover Maps{" "}
                </Text>
                <Link to="/discover" id="seeAllLink">
                  <Text size="sm" ta="right">
                    See all{" "}
                  </Text>
                </Link>
              </Group>
              <Grid style={{ textAlign: "initial" }}>
                {maps.map((map) => (
                  <Grid.Col span={cardSpan}>
                    <MapCard
                      isPrivate={!map.public}
                      name={map["mapName"]}
                      description={map.description}
                      map={map}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Box>
        </Stack>
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomePage;
