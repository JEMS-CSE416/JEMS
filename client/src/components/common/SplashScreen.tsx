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
import LoginModal from "../modals/LoginModal";
import { useDisclosure } from '@mantine/hooks';


const SplashScreen = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <>
    <LoginModal opened={opened} onClose={close}/>
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
                        <Button id="splash-button" onClick={open}>Get Started</Button>
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
            </Text>
          </Center>
        </BackgroundImage>
      </Box>
    </>
  );
};

export default SplashScreen;