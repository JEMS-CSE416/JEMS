import "./css/homeScreen.css";
import { Group, Text, Stack, Box, Grid, Loader } from "@mantine/core";
import MapCard from "./MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link, useLocation } from "react-router-dom";
import { getMaps } from "../../api/MapApiAccessor";
import { Map } from "../../utils/models/Map";
import { useDisclosure } from "@mantine/hooks";
import DuplicateMapModal from "../modals/DuplicateMapModal";
import { useLoadingData } from "../hooks/useLoadingData";
import NothingHere from "../common/NothingHere";

const HomePage = () => {
  const location = useLocation();
  const [duplicateModalOpened, setDuplicateModal] = useDisclosure(false);
  const { data: maps, loading: discoverLoading } = useLoadingData<Map[]>(
    getMaps,
    [{ isPrivate: false }]
  );
  const { data: yourMaps, loading: yourMapsLoading } = useLoadingData<Map[]>(
    getMaps,
    [{ownedMaps: true}]
  );

  // Create a getMap function that takes in a mapId and returns the map object
  const getMap = async () => {
    try {
      const res = await getMap();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };


  const handleSelectMapToDuplicate = (map: Map) => {
    console.log("Selected map to duplicate:", map);
    // setSelectedMapToDuplicate(map);
    location.state = map;
    setDuplicateModal.open();
  };

  const cardSpan = { base: 12, sm: 6, md: 6, lg: 4, xl: 3 };
  const totalMaps = 8;
  return (
    <>
      <DuplicateMapModal
        opened={duplicateModalOpened}
        onClose={setDuplicateModal.close}
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
                {yourMapsLoading ? (
                  <Grid style={{ textAlign: "initial" }}>
                    <Grid.Col
                      style={{
                        height: "auto",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Loader color="blue" />
                    </Grid.Col>
                  </Grid>
                ) : (
                  yourMaps?.length === 0 ? <NothingHere/> :
                  yourMaps?.slice(0,totalMaps).map((map, i) => (
                    <Grid style={{ textAlign: "initial" }}>
                      <Grid.Col span={cardSpan}>
                        <MapCard
                          id={map._id}
                          name={map.mapName}
                          description={map.description}
                          isPrivate={!map.public}
                          map={map}
                          duplicateAction={() => {
                            handleSelectMapToDuplicate(map);
                          }}
                        />
                      </Grid.Col>
                    </Grid>
                  ))
                )}
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
                {discoverLoading ? (
                  <Grid.Col
                    style={{
                      height: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Loader color="blue" />
                  </Grid.Col>
                ) : (
                  maps?.slice(0,totalMaps).map((map) => (
                    <Grid.Col span={cardSpan}>
                      <MapCard
                        id={map._id}
                        isPrivate={!map.public}
                        name={map["mapName"]}
                        description={map.description}
                        map={map}
                        duplicateAction={() => {
                          handleSelectMapToDuplicate(map);
                        }}
                      />
                    </Grid.Col>
                  ))
                )}
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
