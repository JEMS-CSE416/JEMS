import "./css/myMaps.css";
import {
  Text,
  Pagination,
  Stack,
  Box,
  Group,
  Grid,
  Loader,
} from "@mantine/core";
import MapCard from "./MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Map } from "../../utils/models/Map";
import { getMaps } from "../../api/MapApiAccessor";
import { useDisclosure } from "@mantine/hooks";
import DuplicateMapModal from "../modals/DuplicateMapModal";
import { useLoadingData } from "../hooks/useLoadingData";
import NothingHere from "../common/NothingHere";

const cardSpan = { base: 12, sm: 6, md: 6, lg: 4, xl: 3 };
function MyMaps() {
  const [duplicateModalOpened, setDuplicateModal] = useDisclosure(false);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(8);
  const location = useLocation();
  const {
    data: yourMaps,
    error,
    loading,
  } = useLoadingData<Map[]>(getMaps, [{ownedMaps: true}]);

  const handleSelectMapToDuplicate = (map: Map) => {
    location.state = map;
    setDuplicateModal.open();
  };

  // starting card index
  const start = (page - 1) * pageTotal;

  // ending card index
  const end = page * pageTotal;

  return (
    <>
      <DuplicateMapModal
        opened={duplicateModalOpened}
        onClose={setDuplicateModal.close}
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
                {loading ? (
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
                  yourMaps?.length == undefined ? <NothingHere/> :
                  <Grid style={{ textAlign: "initial" }}>{
                    yourMaps?.slice(start,end).map((map) => (
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
                )}
            </Stack>
          </Box>
          <Pagination
            disabled={loading}
            total={Math.ceil((yourMaps?.length ?? 0) / pageTotal)}
            id="pagination"
            onChange={setPage}
          />
        </Stack>
      </div>
      <Footer />
    </>
  );
}
export default MyMaps;
