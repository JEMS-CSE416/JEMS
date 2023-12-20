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
import { signup } from "../../../api/AuthApiAccesor";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

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

  const form = useForm({
    initialValues: {
      email: "",
      displayName: "",
      password: "",
      confirmPass: "",
    },

    validate: {
      email: isEmail("Invalid email"),
      displayName: isNotEmpty("Invalid displayName"),
      password: isNotEmpty("Password Cannot be empty"),
      confirmPass: (value) =>
        form.values.password === value ? null : "Passwords do not match",
    },
  }) as any;

  function handleSignUp(values: any) {
    if (values.displayName.length > 16) {
      form.setFieldError(
        "displayName",
        "Display name cannot be longer than 16 characters"
      );
    } else {
      signup({
        email: values.email,
        password: values.password,
        displayName: values.displayName,
      })
        .then((json) => {
          console.log("attempting to close");
          notifications.show({
            icon: <IconCheck />,
            title: "Your account has been created!",
            message: "Please log in!",
          });
          handleCloseSignupOpenLoginModal();
        })
        .catch((err) => {
          if (
            (err as string) !== undefined &&
            (err as string).includes("duplicate")
          ) {
            form.setFieldError(
              "email",
              "An account with this email exists already"
            );
          } else console.log(err);
        });
    }
  }

  return (
    <>
      <SplashScreenModalTemplate onCloseSignupModal={onCloseSignupModal}>
        <Image src={jemsLogo} id="logo"></Image>
        <Text size="xl" fw={500} className="loginText">
          Signup!
        </Text>
        <br />

        <form
          onSubmit={form.onSubmit((values: any) => {
            handleSignUp(values);
          })}
        >
          <TextInput
            label="Email"
            required
            className="splashScreenInput"
            id="signUpEmailInput"
            ta={"left"}
            {...form.getInputProps("email")}
          />
          <br />

          <TextInput
            label="Display Name"
            required
            className="splashScreenInput"
            id="signupDisplayNameInput"
            ta={"left"}
            {...form.getInputProps("displayName")}
          />
          <br />

          <PasswordInput
            label="Password"
            required
            className="splashScreenInput"
            id="signupPasswordInput"
            ta={"left"}
            {...form.getInputProps("password")}
          />
          <br />

          <PasswordInput
            label="Confirm Password"
            required
            className="splashScreenInput"
            id="signupConfirmPasswordInput"
            ta={"left"}
            {...form.getInputProps("confirmPass")}
          />
          <br />

          <Group>
            <Text>Already have an account?</Text>
            <div className="cursorToFinger">
              <Text
                className="splashScreenModalRedirect"
                onClick={handleCloseSignupOpenLoginModal}
                id="loginLink"
              >
                Login!
              </Text>
            </div>

            <div className="loginButtonDiv">
              <Button type="submit" id="signUpSubmitButton">
                {" "}
                Signup{" "}
              </Button>
            </div>
          </Group>
        </form>
      </SplashScreenModalTemplate>
    </>
  );
};

export default SignupModal;
