import "./css/myMaps.css";
import { Text, Pagination, Stack, Box, Group, Grid } from "@mantine/core";
import { Link } from "react-router-dom";
import MapCard from "./MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Map } from "../../utils/models/Map";
import { getMaps } from "../../api/MapApiAccessor";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import DuplicateMapModal from "../modals/DuplicateMapModal";

const cardSpan = { base: 12, sm: 6, md: 6, lg: 4, xl: 3 };

function Discover() {
  useEffect(() => {
    getPublicMaps();
  }, []);
  const [selectedMapToDuplicate, setSelectedMapToDuplicate] = useState<Map>();
  const [duplicateModalOpened, setDuplicateModal] = useDisclosure(false);
  const [maps, setMaps] = useState<Map[]>([]);

  const getPublicMaps = async () => {
    try {
      const responseData = await getMaps({ isPrivate: false });
      console.log("Public Maps fetched successfully:", responseData);
      setMaps(responseData);
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const handleSelectMapToDuplicate = (map: Map) => {
    console.log("Selected map to duplicate:", map);
    setSelectedMapToDuplicate(map);
    setDuplicateModal.open();
  };

  return (
    <>
      <DuplicateMapModal
        opened={duplicateModalOpened}
        onClose={setDuplicateModal.close}
        map={selectedMapToDuplicate}
      />
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
                  Discover Maps
                </Text>
              </Group>
              <Grid style={{ textAlign: "initial" }}>
                {maps.map((map) => (
                  <Grid.Col span={cardSpan}>
                    <MapCard
                      isPrivate={!map.public}
                      name={map["mapName"]}
                      description={map.description}
                      map={map}
                      duplicateAction={() => {
                        handleSelectMapToDuplicate(map);
                      }}
                    />
                  </Grid.Col>
                ))}
              </Grid>
            </Stack>
          </Box>
          <Pagination total={10} id="pagination" />
        </Stack>
      </div>
      <Footer />
    </>
  );
}
export default Discover;
