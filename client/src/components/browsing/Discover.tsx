import "./css/myMaps.css";
import {
  Text,
  Pagination,
  Stack,
  Box,
  Group,
  Grid,
  Loader,
  Container,
} from "@mantine/core";
import { Link, useLocation } from "react-router-dom";
import MapCard from "./MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Map } from "../../utils/models/Map";
import { getMaps } from "../../api/MapApiAccessor";
import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import DuplicateMapModal from "../modals/DuplicateMapModal";
import { useLoadingData } from "../hooks/useLoadingData";

const cardSpan = { base: 12, sm: 6, md: 6, lg: 4, xl: 3 };

function Discover() {
  const location = useLocation();
  const [duplicateModalOpened, setDuplicateModal] = useDisclosure(false);
  const {data:maps, error, loading} = useLoadingData<Map[]>(getMaps, [{ isPrivate: false }]);
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(8);

  const handleSelectMapToDuplicate = (map: Map) => {
    console.log("Selected map to duplicate:", map);
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
                  Discover Maps
                </Text>
              </Group>
              <Grid style={{ textAlign: "initial" }}>
                {loading ? (
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
                  maps?.slice(start,end).map((map) => (
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
                  ))
                )}
              </Grid>
            </Stack>
          </Box>
            <Pagination disabled={loading} total={Math.ceil((maps?.length ?? 0) / pageTotal)} id="pagination" onChange={setPage} />
        </Stack>
      </div>

      <Footer />
    </>
  );
}
export default Discover;
