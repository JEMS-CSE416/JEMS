import React from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/searchedMapsScreen.css";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import {
  Box,
  Text,
  Group,
  Stack,
  Image,
  Loader,
  Pagination,
  Grid,
} from "@mantine/core";
import nothingHere from "../../assets/images/NothingHere.svg";
import MapCard from "./MapCard";
import { getMaps } from "../../api/MapApiAccessor";
import { Map } from "../../utils/models/Map";
import { useDisclosure } from "@mantine/hooks";
import DuplicateMapModal from "../modals/DuplicateMapModal";
import { useLoadingData } from "../hooks/useLoadingData";
const NothingHere = () => {
  return (
    <Stack align="center" id="nothingHereStack">
      <Image src={nothingHere} w={300} h={300} />
      <Text size="lg" fw={500} id="nothingHereText">
        Nothing here yet
      </Text>
      <Text size="sm" id="nothingHereText" c="dimmed" w={250}>
        No results found. Try searching for something else!
      </Text>
    </Stack>
  );
};

const cardSpan = { base: 12, sm: 6, md: 6, lg: 4, xl: 3 };
const SearchedMapsScreen = () => {
  const { search } = useParams();
  const location = useLocation();
  const [duplicateModalOpened, setDuplicateModal] = useDisclosure(false);
  const {
    data: maps,
    error,
    loading,
  } = useLoadingData<Map[]>(
    getMaps,
    [{ isPrivate: false, mapName: `${search}` }],
    [search, location.state]
  );
  const [page, setPage] = useState(1);
  const [pageTotal, setPageTotal] = useState(8);

  const navigate = useNavigate();

  if (!search) {
    navigate("/");
  }

  const handleSelectMapToDuplicate = (map: Map) => {
    console.log("Selected map to duplicate:", map);
    // setSelectedMapToDuplicate(map);
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
      <div className="container">
        <Group>
          <Text
            fw={700}
            size="xl"
            id="searchedHeader"
            ta="left"
            className="text-blue"
            style={{ width: "50%" }}
          >
            Showing results for
            <Text span fw={700} size="xl" ta="left" className="text-black">
              {" "}
              {search}
            </Text>
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
          ) : maps?.length === 0 ? (
            <Box mx="auto">
              <NothingHere />
            </Box>
          ) : (
            maps?.slice(start, end).map((map) => (
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
            ))
          )}
        </Grid>
        <Group>
          <Pagination
            disabled={loading}
            total={Math.ceil((maps?.length ?? 0) / pageTotal)}
            id="pagination"
            onChange={setPage}
          />
        </Group>
      </div>

      <Footer />
    </>
  );
};

export default SearchedMapsScreen;
