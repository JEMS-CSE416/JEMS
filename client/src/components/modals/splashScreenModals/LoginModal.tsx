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
import { useState } from "react";
import { useSetAuthContext } from "../../../context/AuthContextProvider";
import { forgotPass, login } from "../../../api/AuthApiAccesor";
import { useNavigate } from "react-router-dom";

interface LoginModalProps {
  onCloseLoginModal: () => void;
  onOpenPasswordRecoveryModal: () => void;
  onOpenSignupModal: () => void;
}

interface LoginState{
  email: string
  password: string
  emailErr?: string
  passErr?: string
}


const LoginModal: React.FC<LoginModalProps> = ({
  onCloseLoginModal,
  onOpenPasswordRecoveryModal,
  onOpenSignupModal,
}) => {
  const setAuthContext = useSetAuthContext();
  const [loginState, setLoginState] = useState({email: "", password: ""} as LoginState)
  const navigate = useNavigate();

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

  function handleLogin() {
    // Check for email and pass nulling
    const errState = {...loginState} as LoginState
    if(loginState.email === "")
      errState.emailErr = "Email is a required field"
    if(loginState.password === "")
      errState.passErr = "Password is a required field"
    if(errState.passErr !== "" || errState.emailErr !== ""){
      setLoginState(errState);
      return
    }


    // Attempt login
    login({email: loginState.email, password: loginState.password})
      .then(
        (json) => {
          setAuthContext({user: json});
          navigate('/home/');
        }
      ).catch(
        (err) => {
          console.log(err)
          if((err as string).includes('email') || (err as string).includes('password') )
            setLoginState({
                ...loginState,
                passErr: "Sorry, your username or password is incorrect. Please try again",
                emailErr: "Sorry, your username or password is incorrect. Please try again"
              });
          else
            console.log(err)
        }
        
      )

    
  }

  function handleforgotPass() {
    // Check for email and pass nulling
    const errState = {...loginState} as LoginState
    if(loginState.email === "")
      errState.emailErr = "Email is a required field"
    if(errState.emailErr !== ""){
      setLoginState(errState);
      return
    }


    // Attempt login
    forgotPass(loginState.email)
      .then(
        () => {
          navigate('/');
        }
      ).catch(
        (err) => {
          console.log(err)
        }
        
      )
    onCloseLoginModal();

    
  }

  return (
    <>
      <SplashScreenModalTemplate onCloseLoginModal={onCloseLoginModal}>
        <Image src={jemsLogo} id="logo"></Image>
        <Text size="xl" fw={500} id="loginText">
          Login
        </Text>
        <br />
        <TextInput label="Email" required id="loginEmailInput" ta={"left"} 
          error={loginState.emailErr ?? undefined}
          onChange={(e) => setLoginState({...loginState, email:e.currentTarget.value,  emailErr:""})}
        />
        <br />
        <PasswordInput
          id="loginPasswordInput"
          label="Password"
          required
          className="loginPasswordInput"
          ta={"left"}
          error={loginState.passErr ?? undefined}
          onChange={(e) => setLoginState({...loginState, password:e.currentTarget.value, passErr:""})}
        />
        <div id="cursorToFinger">
          <Text
            onClick={handleforgotPass}
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
          <div id="loginButtonDiv">
            <Button onClick={() => handleLogin()} id="loginButton">Login</Button>
          </div>
        </Group>
      </SplashScreenModalTemplate>
    </>
  );
};
export default LoginModal;



