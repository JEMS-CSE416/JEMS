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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signup } from "../../../api/AuthApiAccesor";
import { useSetAuthContext } from "../../../context/AuthContextProvider";

interface SignUpState{
  email: string
  password: string
  password2: string
  displayName: string
  emailErr?: string
  passErr?: string
}

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

  const setAuthContext = useSetAuthContext();
  const navigate = useNavigate();
  const [signupState, setsignupState] = useState({email: "", password: "", password2: "", displayName: ""} as SignUpState)

  function handleSignUp() {

    // Check for email and pass nulling
    const errState = {...signupState} as SignUpState
    if(signupState.email === "")
      errState.emailErr = "Email is a required field"
    if(signupState.password === "")
      errState.passErr = "Password is a required field"
    if(signupState.password2 === "")
      errState.passErr = "Password is a required field"
    if(errState.passErr !== "" || errState.emailErr !== ""){
      setsignupState(errState);
      return
    }

    signup({
      email: signupState.email,
      password: signupState.password,
      displayName: signupState.displayName
    })
      .then(
        (json) => handleCloseSignupOpenLoginModal()
      ).catch(
        (err) => {
          console.log(err)
          if((err as string).includes('email') || (err as string).includes('password') )
            setsignupState({
                ...signupState,
                passErr: "Sorry, your username or password is incorrect. Please try again",
                emailErr: "Sorry, your username or password is incorrect. Please try again"
              });
          else
            console.log(err)
        }
        
      )

    
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
          error={signupState.emailErr ?? undefined}
          onChange={(e) => setsignupState({...signupState, email:e.currentTarget.value,  emailErr:""})}
        />
        <br />

        <TextInput
          label="Display Name"
          required
          className="splashScreenInput"
          ta={"left"}
          //error={signupState.emailErr ?? undefined}
          onChange={(e) => setsignupState({...signupState, displayName:e.currentTarget.value})}
        />
        <br />

        <PasswordInput
          label="Password"
          required
          className="splashScreenInput"
          ta={"left"}
          error={signupState.passErr ?? undefined}
          onChange={(e) => setsignupState({...signupState, password:e.currentTarget.value,  passErr:""})}
        />
        <br />

        <PasswordInput
          label="Confirm Password"
          required
          className="splashScreenInput"
          ta={"left"}
          error={signupState.passErr ?? undefined}
          onChange={(e) => setsignupState({...signupState, password2:e.currentTarget.value,  passErr:""})}
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

          <div id="loginButtonDiv">
              <Button> Signup </Button>
          </div>
        </Group>
      </SplashScreenModalTemplate>
    </>
  );
};

export default SignupModal;
