import "../css/homeScreen.css";
import { Group, Text, Stack, Box } from "@mantine/core";
import MapCard from "../browsing/MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { forEach } from "jszip";

const HomePage = () => {
    const [maps, setMaps] = useState([]);

    useEffect(() => {
        getPublicMaps();
    }
    , []);

    const getPublicMaps = async () => {
        try {
            // Replace with your API endpoint
            const apiUrl = 'http://143.198.28.153:3000/api/maps/?private=false';

            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Data updated successfully:', responseData);
                setMaps(responseData);
            } else {
                console.error('Error updating data:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    // convert maps array into a 2d array of 4 maps each, it can have <4 maps in the last array
    // input = maps array
    // output = 2d array of maps
    // let convertedMaps = [];
    // let i = 0;
    // while (i < maps.length) {
    //     let temp = [{}];
    //     for (let j = 0; j < 4; j++) {
    //         if (i < maps.length) {
    //             temp.push(maps[i]);
    //             i++;
    //         }
    //     }
    //     convertedMaps.push(temp);
    // }

    // console.log(convertedMaps)

    const mapCards = maps.map((item, index) => (
        <>
            {/* {index < 4 ? <Link to="/selected"></Link> : <></>} */}
           <MapCard private={false} name={item['mapName']}></MapCard>
        </>
    ));

    return (
        <>
            <NavBar></NavBar>
            <div id="content">
                <Stack>
                    <Box>
                        <Stack gap="xs">
                            <Group id="homePageHeaderGroup">
                                <Text fw={700} size="xl" id="homePageHeader" ta="left" style={{ width: "50%" }}> Your Maps </Text>
                                <Text size="sm" id="seeAll" ta="right" style={{ width: "25%" }}>See all </Text>
                            </Group>
                            <Group justify="flex-start" grow wrap="wrap" style={{ width: "100%" }}>
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
                                <Text fw={700} size="xl" id="homePageHeader" ta="left" style={{ width: "50%" }}> Discover Maps </Text>
                                <Text size="sm" id="seeAll" ta="right" style={{ width: "25%" }}>See all </Text>
                            </Group>
                            
                            <Group justify="flex-start" grow>
                                {mapCards}
                            </Group>
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
