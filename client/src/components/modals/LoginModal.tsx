import {
  Modal,
  Text,
  TextInput,
  PasswordInput,
  Image,
  Button,
} from "@mantine/core";
import React from "react";
import jemsLogo from "../../assets/images/logo.png";

interface LoginModalProps {
  opened: boolean;
  onClose: () => void;
}
const LoginModal: React.FC<LoginModalProps> = ({ opened, onClose }) => {
  return (
    <>
      <Modal opened={opened} onClose={onClose} centered>
        <Image src={jemsLogo}></Image>
        <Text>Login</Text>
        <TextInput label="Email" required />
        <PasswordInput label="Password" required />
        <Button> Login </Button>
        <Text>Forgot your password?</Text>
        <Text>Don't have an account?</Text>
        <Text>Sign up!</Text>
      </Modal>
    </>
  );
};

export default LoginModal;
