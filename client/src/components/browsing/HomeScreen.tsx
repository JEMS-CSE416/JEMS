import "./css/homeScreen.css";
import { Group, Text, Stack, Box, Button, Image, Grid } from "@mantine/core";
import MapCard from "../browsing/MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import ellipses from "../../assets/images/ellipses.png";

const HomePage = () => {
  const [maps, setMaps] = useState([]);

  useEffect(() => {
    getPublicMaps();
  }, []);

  const getPublicMaps = async () => {
    try {
      // Replace with your API endpoint
      const apiUrl = "http://143.198.28.153:3000/api/maps/?private=false";

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data updated successfully:", responseData);
        setMaps(responseData);
      } else {
        console.error(
          "Error updating data:",
          response.status,
          response.statusText
        );
      }
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
                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false} />
                  </Link>
                </Grid.Col>
                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false} />
                  </Link>
                </Grid.Col>
                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false} />
                  </Link>
                </Grid.Col>
                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false} />
                  </Link>
                </Grid.Col>
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
                {
                maps.map((map) => (
                  // <Group className="border" justify="flex-start" grow>
                  //   {maps}
                  // </Group>
                  <Grid.Col span={cardSpan}>
                      <MapCard isPrivate={false} name={map["mapName"]}></MapCard>
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
