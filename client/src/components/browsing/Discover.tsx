import "./css/myMaps.css";
import { Text, Pagination, Stack, Box, Group, Grid } from "@mantine/core";
import { Link } from "react-router-dom";
import MapCard from "./MapCard";
import NavBar from "../common/Navbar";
import Footer from "../common/Footer";

const cardSpan = { base: 12, sm: 6, md: 6, lg: 4, xl: 3 };

function Discover() {
  return (
    <>
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
                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false}></MapCard>
                  </Link>
                </Grid.Col>

                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false}></MapCard>
                  </Link>
                </Grid.Col>

                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false}></MapCard>
                  </Link>
                </Grid.Col>

                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false}></MapCard>
                  </Link>
                </Grid.Col>

                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false}></MapCard>
                  </Link>
                </Grid.Col>

                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false}></MapCard>
                  </Link>
                </Grid.Col>

                <Grid.Col span={cardSpan}>
                  <Link to="/selected">
                    <MapCard isPrivate={false}></MapCard>
                  </Link>
                </Grid.Col>
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
