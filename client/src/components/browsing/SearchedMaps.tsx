import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./css/searchedMapsScreen.css";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Box, Text, Group, Stack } from "@mantine/core";
const SearchedMapsScreen = () => {
  const { search } = useParams();
  return (
    <>
      <NavBar></NavBar>
      <Box className="container">
        <Group>
          <Text
            fw={700}
            size="xl"
            id="searchedHeader"
            ta="left"
            className="text-blue"
          >
            Showing results for
            <Text span fw={700} size="xl" ta="left" className="text-black">
              {" "}
              {search}
            </Text>
          </Text>
        </Group>
      </Box>
      <Footer />
    </>
  );
};

export default SearchedMapsScreen;

{
  /* <div id="content">
        <Stack>
          <Box>
            <Stack>
              <Group>
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
            </Stack>
          </Box>
        </Stack>
      </div> */
}
