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

interface LoginModalProps {
  onCloseLoginModal: () => void;
  onOpenPasswordRecoveryModal: () => void;
  onOpenSignupModal: () => void;
}
const LoginModal: React.FC<LoginModalProps> = ({
  onCloseLoginModal,
  onOpenPasswordRecoveryModal,
  onOpenSignupModal,
}) => {
  // closes login modal and opens password recovery modal
  function handleCloseLoginOpenPasswordRecoveryModal() {
    onCloseLoginModal();
    onOpenPasswordRecoveryModal();
  }

  // closes login modal and opens signup modal
  function handleCloseLoginOpenSignUpModal() {
    onCloseLoginModal();
    onOpenSignupModal();
  }

  return (
    <>
      <SplashScreenModalTemplate onCloseLoginModal={onCloseLoginModal}>
        <Image src={jemsLogo} id="logo"></Image>
        <Text size="xl" fw={500} id="loginText">
          Login
        </Text>
        <br />
        <TextInput label="Email" required id="loginEmailInput" ta={"left"} />
        <br />
        <PasswordInput
          label="Password"
          required
          className="loginPasswordInput"
          ta={"left"}
        />
        <div id="cursorToFinger">
          <Text
            onClick={handleCloseLoginOpenPasswordRecoveryModal}
            ta={"left"}
            id="splashScreenModalRedirect"
          >
            Forgot your password?
          </Text>
        </div>

        <br />

        <Group>
          <Text>Don't have an account?</Text>
          <div id="cursorToFinger">
            <Text
              id="splashScreenModalRedirect"
              onClick={handleCloseLoginOpenSignUpModal}
            >
              Sign up!
            </Text>
          </div>
          <div id="loginButton">
            <Link to={"/home"}>
              <Button onClick={checkFields}>Login</Button>
            </Link>
          </div>
        </Group>
      </SplashScreenModalTemplate>
    </>
  );
};
function checkFields() {
  const email = document.getElementById("loginEmailInput");
  const pass = document.getElementById("loginPasswordInput");
}
export default LoginModal;
