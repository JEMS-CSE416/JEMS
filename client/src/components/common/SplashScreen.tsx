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
import { useRef, useState } from "react";
import { IconX } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useLocation } from "react-router-dom";

const SplashScreen = (props?: {passReset?: boolean;}) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openPasswordRecoveryModal, setOpenPasswordRecoveryModal] =
    useState(false);
  const [openSignupModal, setOpenSignupModal] = useState(false);

  // Failed attempt to limit to only one render
  //const firstRender = useRef(true);
  //if(firstRender){
    //firstRender.current = false;
    //console.log("here")
  //}

  const location = useLocation();
  if(location.state?.err404)
    notifications.show({
      icon: <IconX />,
      title: 'Error 404! Page not found!',
      message: 'Please Check your url :(',
    });
  if(location.state?.err401)
    notifications.show({
      icon: <IconX />,
      title: 'Error 401! You aren\'t Authenicated!',
      message: 'Please login :(',
    });

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
                        Premium Map Creation/Editing Software that’s really good!!!
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
