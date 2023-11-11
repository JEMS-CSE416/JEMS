import "./css/homeScreen.css";
import { Group, Text, Stack, Box } from "@mantine/core";
import MapCard from "./MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

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

  // convert maps array into a 2d array of 4 maps each, it can have <4 maps in the last array
  // input = maps array
  // output = 2d array of maps
  let convertedMaps = [];
  if (maps.length > 1) {
    let i = 0;
    while (i < maps.length) {
      let temp = [];
      for (let j = 0; j < 4; j++) {
        if (i < maps.length) {
          temp.push(
            <MapCard private={false} name={maps[i]["mapName"]}></MapCard>
          );
          i++;
        }
      }
      convertedMaps.push(temp);
    }
    if (maps.length % 4 !== 0)
      for (let i = 0; i < 4 - (maps.length % 4); i++) {
        if (convertedMaps[convertedMaps.length - 1])
          convertedMaps[convertedMaps.length - 1].push(<div></div>);
      }
  }

  // console.log(convertedMaps)

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
                  {" "}
                  Your Maps{" "}
                </Text>
                <Text size="sm" id="seeAll" ta="right" style={{ width: "25%" }}>
                  See all{" "}
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
                <Text size="sm" id="seeAll" ta="right" style={{ width: "25%" }}>
                  See all{" "}
                </Text>
              </Group>

              {convertedMaps.map((maps) => (
                <Group justify="flex-start" grow>
                  {maps}
                </Group>
              ))}
              {/* <Group justify="flex-start" grow>
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
                            </Group> */}
            </Stack>
          </Box>
        </Stack>
      </div>
      <Footer></Footer>
    </>
  );
};

export default HomePage;