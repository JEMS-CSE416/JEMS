import "../css/homeScreen.css";
import { Center, Group, Text, Stack, Box } from "@mantine/core";
import MapCard from "../browsing/MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";
import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <>
            <NavBar></NavBar>
            <div id="content">
                <Stack>
                    <Box>
                        <Stack gap="xs">
                            <Group> 
                                <Text fw={700} size="xl" id="homePageHeader" ta="left" style={{width:"50%"}}> Your Maps </Text>
                                <Text size="sm" id="seeAll" ta="right" style={{width:"25%"}}>See all </Text>
                            </Group>
                            <Group justify="flex-start" grow wrap="wrap" style={{width: "100%"}}>
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
                            <Group> 
                                <Text fw={700} size="xl" id="homePageHeader" ta="left" style={{width:"50%"}}> Discover Maps </Text>
                                <Text size="sm" id="seeAll" ta="right" style={{width:"25%"}}>See all </Text>
                            </Group>
                            <Group justify="flex-start" grow>
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
                            <Group justify="flex-start" grow>
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
                </Stack>
                {/* <Group id="homePageHeaderGroup">
                    <Text fw={700} size="xl" id="homePageHeader" ta="left">
                        Your Maps
                    </Text>
                    <Text size="sm" id="seeAll">
                        See all
                    </Text>
                </Group>
                <Group justify="space-between">
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
                <Group id="homePageHeaderGroup">
                    <Text fw={700} size="xl" id="homePageHeader" ta="left">
                        Discover Maps
                    </Text>
                    <Text size="sm" ta="right" id="seeAll">
                        See all
                    </Text>
                </Group>
                <Group justify="space-between">
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
                <div>
                    <Group justify="space-between">
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
                </div> */}
            </div>
            <Footer></Footer>
        </>
    );
};

export default HomePage;
