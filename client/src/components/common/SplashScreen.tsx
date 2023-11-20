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
import LoginModal from "../modals/splashScreenModals/LoginModal";
import PasswordRecoveryModal from "../modals/splashScreenModals/PasswordRecoveryModal";
import SignupModal from "../modals/splashScreenModals/SignupModal";
import { useState } from "react";

const SplashScreen = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openPasswordRecoveryModal, setOpenPasswordRecoveryModal] =
    useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  // Handles opening and closing login modal
  function handleOpenLoginModal() {
    setOpenLoginModal(true);
  }

  function handleCloseLoginModal() {
    setOpenLoginModal(false);
  }

  // Handles opening and closing password recovery modal
  function handleOpenPasswordRecoveryModal() {
    setOpenPasswordRecoveryModal(true);
  }

  function handleClosePasswordRecoveryModal() {
    setOpenPasswordRecoveryModal(false);
  }

  // Handles opening and closing signup modal
  function handleOpenSignupModal() {
    setOpenSignupModal(true);
  }

  function handleCloseSignupModal() {
    setOpenSignupModal(false);
  }

  return (
    <>
    {/* MODALS */}
      {openLoginModal ? (
        <LoginModal
          onCloseLoginModal={handleCloseLoginModal}
          onOpenPasswordRecoveryModal={handleOpenPasswordRecoveryModal}
          onOpenSignupModal={handleOpenSignupModal}
        />
      ) : (
        <></>
      )}
      {openPasswordRecoveryModal ? (
        <PasswordRecoveryModal
          onClosePasswordRecoveryModal={handleClosePasswordRecoveryModal}
          onOpenLoginModal={handleOpenLoginModal}
        />
      ) : (
        <></>
      )}
      {openSignupModal ? (
        <SignupModal
          onOpenLoginModal={handleOpenLoginModal}
          onCloseSignupModal={handleCloseSignupModal}
        />
      ) : (
        <></>
      )}
      {/* END OF MODALS */}

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
                      <Button id="splash-button" onClick={handleOpenLoginModal}>
                        Get Started
                      </Button>
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
