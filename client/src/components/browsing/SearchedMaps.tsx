import React from "react";
import { useNavigate, useParams, useLocation} from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/searchedMapsScreen.css";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Box, Text, Group, Stack, Image } from "@mantine/core";
import nothingHere from "../../assets/images/NothingHere.svg";
import MapCard from "./MapCard";

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

const SearchedMapsScreen = () => {
  const { search } = useParams();
  const location = useLocation();
  const [maps, setMaps] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const queryForMaps = async () => {
      try {
        const apiUrl =
          "http://143.198.28.153:3000/api/maps/?" +
          new URLSearchParams({
            private: "false",
            map_name: `${search}`, // there is a bug in the backend where it cannot handle spaces in the query string
          });
        console.log(apiUrl);
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log("maps fetched successfully:", responseData);
          setMaps(responseData);
        } else {
          console.error(
            "Error fetching data:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching maps:", error);
      }
    };

    queryForMaps();
  }, [search, location.state]);


  if (!search) {
    navigate("/");
  }

  return (
    <>
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
        <Group>
          {maps.length === 0 ? (
            <Box mx="auto">
              <NothingHere />
            </Box>
          ) : (
            maps.map((map) => (
              <Group justify="flex-start" grow>
                <MapCard isPrivate={false} name={map["mapName"]} />
              </Group>
            ))
          )}
        </Group>
      </div>
      <Footer />
    </>
  );
};

export default SearchedMapsScreen;
