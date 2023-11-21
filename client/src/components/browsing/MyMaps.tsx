import "./css/myMaps.css";
import { Text, Pagination, Stack, Box, Group, Grid } from "@mantine/core";
import MapCard from "./MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import { Map } from "../../utils/models/Map";
import { getMaps } from "../../api/MapApiAccessor";
import { useDisclosure } from "@mantine/hooks";
import DuplicateMapModal from "../modals/DuplicateMapModal";

const cardSpan = { base: 12, sm: 6, md: 6, lg: 4, xl: 3 };
function MyMaps() {
  const [yourMaps, setYourMaps] = useState<Map[]>([]);
  const [selectedMapToDuplicate, setSelectedMapToDuplicate] = useState<Map>();
  const [duplicateModalOpened, setDuplicateModal] = useDisclosure(false);
  useEffect(() => {
    // fetch maps data from backend
    getYourMaps();
  }, []);

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
                  Your Maps
                </Text>
              </Group>
              <Grid style={{ textAlign: "initial" }}>
                {yourMaps.map((map) => (
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
export default MyMaps;
