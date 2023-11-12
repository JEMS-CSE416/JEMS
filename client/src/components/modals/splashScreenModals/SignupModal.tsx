import {
  Text,
  TextInput,
  PasswordInput,
  Image,
  Button,
  Group,
} from "@mantine/core";
import jemsLogo from "../../../assets/images/logo.png";
import "./css/splashScreenModals.css";
import SplashScreenModalTemplate from "./SplashScreenModalTemplate";
import { Link } from "react-router-dom";

interface SignupModalProps {
  onOpenLoginModal: () => void;
  onCloseSignupModal: () => void;
}
const SignupModal: React.FC<SignupModalProps> = ({
  onOpenLoginModal,
  onCloseSignupModal,
}) => {
  // Closes signup modal and opens login modal
  function handleCloseSignupOpenLoginModal() {
    onCloseSignupModal();
    onOpenLoginModal();
  }

  return (
    <>
      <SplashScreenModalTemplate onCloseSignupModal={onCloseSignupModal}>
        <Image src={jemsLogo} id="logo"></Image>
        <Text size="xl" fw={500} id="loginText">
          Signup!
        </Text>
        <br />

        <TextInput
          label="Email"
          required
          className="splashScreenInput"
          ta={"left"}
        />
        <br />

        <TextInput
          label="Display Name"
          required
          className="splashScreenInput"
          ta={"left"}
        />
        <br />

        <PasswordInput
          label="Password"
          required
          className="splashScreenInput"
          ta={"left"}
        />
        <br />

        <PasswordInput
          label="Confirm Password"
          required
          className="splashScreenInput"
          ta={"left"}
        />
        <br />

        <Group>
          <Text>Already have an account?</Text>
          <div id="cursorToFinger">
            <Text
              id="splashScreenModalRedirect"
              onClick={handleCloseSignupOpenLoginModal}
            >
              Login!
            </Text>
          </div>

          <div id="signupButton">
            <Link to="/home">
              <Button> Sell your soul </Button>
            </Link>
          </div>
        </Group>
      </SplashScreenModalTemplate>
    </>
  );
};

export default SignupModal;
