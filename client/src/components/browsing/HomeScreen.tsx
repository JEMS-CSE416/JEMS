import "./css/homeScreen.css";
import { Group, Text, Stack, Box, Grid } from "@mantine/core";
import MapCard from "../browsing/MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { getMaps } from "../../api/MapApiAccessor";
import { Map } from "../../utils/models/Map";
import { useDisclosure } from "@mantine/hooks";
import DuplicateMapModal from "../modals/DuplicateMapModal";

const HomePage = () => {
  const [maps, setMaps] = useState<Map[]>([]);
  const [yourMaps, setYourMaps] = useState<Map[]>([]);
  const [selectedMapToDuplicate, setSelectedMapToDuplicate] = useState<Map>();
  const [duplicateModalOpened, setDuplicateModal] = useDisclosure(false);

  useEffect(() => {
    getPublicMaps();
    getYourMaps();
  }, []);

  const getPublicMaps = async () => {
    try {
      const responseData = await getMaps({ isPrivate: false });
      console.log("Public Maps fetched successfully:", responseData);
      setMaps(responseData.splice(0, 8));
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
      setYourMaps(responseData.splice(0, 8));
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSelectMapToDuplicate = (map:Map) => {
    console.log("Selected map to duplicate:", map);
    setSelectedMapToDuplicate(map);
    setDuplicateModal.open();
  }


  const cardSpan = { base: 12, sm: 6, md: 6, lg: 4, xl: 3 };

  return (
    <>
      <DuplicateMapModal
        opened={duplicateModalOpened}
        onClose={setDuplicateModal.close}
        map={selectedMapToDuplicate}
      />
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
                {yourMaps.map((map, i) => (
                  <Grid.Col span={cardSpan}>
                      <MapCard
                        id={map._id}
                        name={map.mapName}
                        description={map.description}
                        isPrivate={!map.public}
                        map={map}
                        duplicateAction={() => {handleSelectMapToDuplicate(map)}}
                      />
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
                      id={map._id}
                      isPrivate={!map.public}
                      name={map["mapName"]}
                      description={map.description}
                      map={map}
                      duplicateAction={() => {handleSelectMapToDuplicate(map)}}
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
