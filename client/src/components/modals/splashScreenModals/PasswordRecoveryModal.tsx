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

interface PasswordRecoveryModalProps {
  onClosePasswordRecoveryModal: () => void;
  onOpenLoginModal: () => void;
}
const PasswordRecoveryModal: React.FC<PasswordRecoveryModalProps> = ({
  onClosePasswordRecoveryModal,
  onOpenLoginModal,
}) => {
  // closes password recovery modal and opens login modal
  function handleClosePasswordRecoveryOpenLoginModal() {
    onClosePasswordRecoveryModal();
    onOpenLoginModal();
  }

  return (
    <>
      <SplashScreenModalTemplate
        onClosePasswordRecoveryModal={onClosePasswordRecoveryModal}
      >
        <Image src={jemsLogo} id="logo"></Image>
        <Text size="xl" fw={500} id="loginText">
          Password Recovery
        </Text>
        <br />

        <TextInput
          label="Email"
          required
          className="splashScreenInput"
          ta={"left"}
        />
        <br />

        <PasswordInput
          label="New Password"
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
          <div id="cursorToFinger">
            <Text
              id="splashScreenModalRedirect"
              onClick={handleClosePasswordRecoveryOpenLoginModal}
            >
              Back to login
            </Text>
          </div>
          <Button
            onClick={handleClosePasswordRecoveryOpenLoginModal}
            id="loginButtonDiv"
          >
            Confirm
          </Button>
        </Group>
      </SplashScreenModalTemplate>
    </>
  );
};

export default PasswordRecoveryModal;
