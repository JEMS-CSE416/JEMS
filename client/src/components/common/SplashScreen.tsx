import { Link } from "react-router-dom";
import {
  BackgroundImage,
  Center,
  Text,
  Box,
  Image,
  Flex,
  Button,
} from "@mantine/core";

import landingBg from "../../assets/images/landingBackground.png";
import landingPic from "../../assets/images/landingPic.png";
import jemsLogo from "../../assets/images/logo.svg";

const SplashScreen = () => {
  return (
    <>
      <Box maw={"100%"} mx="auto">
        <BackgroundImage
          src={landingBg}
          radius="xs"
          style={{ minHeight: "100vh", minWidth: "100vw" }}
        >
          <Center maw={"100vw"} h={"100vh"}>
            <Text c="black">
              <Flex
                mih={50}
                // bg="rgba(0, 0, 0, .3)"
                gap="xl"
                justify="center"
                align="center"
                direction="row"
                wrap="nowrap"
              >
                <Box style={{ textAlign: "left" }}>
                  <Center>
                    <Box style={{ width: "80%" }}>
                      <Image
                        radius="md"
                        src={jemsLogo}
                        style={{ width: "90%" }}
                      />
                      <h1>
                        Premium Map Creation/Editing Software that’s really good
                      </h1>
                      <Link to="/home">
                        <Button id="splash-button">Get Started</Button>
                      </Link>
                    </Box>
                  </Center>
                </Box>
                <Box>
                  <Center>
                    <Image
                      radius="md"
                      src={landingPic}
                      style={{ width: "80%" }}
                    />
                  </Center>
                </Box>
              </Flex>
              {/* <Grid style={{ margin: "50px" }}>
                                <Grid.Col span={6}>
                                    <Image
                                        radius="md"
                                        src={jemsLogo}
                                        style={{ width: "80%" }}
                                    />
                                    <h1>Premium Map Creation/Editing Software that’s really good</h1>
                                    <Button>Get Started</Button>
                                </Grid.Col>
                                <Grid.Col span={6}>
                                    <Image
                                        radius="md"
                                        src={landingPic}
                                        style={{ width: "80%" }}
                                    />
                                </Grid.Col>
                            </Grid> */}
            </Text>
          </Center>
        </BackgroundImage>
      </Box>
    </>
  );
};

export default SplashScreen;
