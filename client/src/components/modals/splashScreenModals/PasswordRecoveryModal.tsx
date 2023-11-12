import { Text, TextInput, PasswordInput, Image, Button } from "@mantine/core";
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

        <TextInput label="Email" required className="splashScreenInput" ta={"left"} />
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

        <Button
          id="loginButton"
          onClick={handleClosePasswordRecoveryOpenLoginModal}
        >
          {" "}
          Confirm{" "}
        </Button>
      </SplashScreenModalTemplate>
    </>
  );
};

export default PasswordRecoveryModal;
