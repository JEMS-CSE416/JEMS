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
import { useSetAuthContext } from "../../../context/AuthContextProvider";
import { forgotPass, login } from "../../../api/AuthApiAccesor";
import { useNavigate } from "react-router-dom";
import { isEmail, isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

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
  const setAuthState = useSetAuthContext();
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      email: '',
      password: ''
    },

    validate: {
      email: isEmail('Invalid email'),
      password: isNotEmpty('Password Cannot be empty'),
    }

  });

  // closes login modal and opens signup modal
  function handleCloseLoginOpenSignUpModal() {
    onCloseLoginModal();
    onOpenSignupModal();
  }

  function handleLogin(values: any) {

    // Attempt login
    login({email: values.email, password: values.password})
      .then(
        // HACK: just update user schema
        (json: any) => {
          const loggedUser = {user:{
            _id: json.id,
            email: json.email,
            displayName: json.displayname
          }}
          setAuthState({...loggedUser});
          navigate('/home/');
        }
      ).catch(
        (err) => {
          console.log(err)
          if(err as string !== undefined && ((err as string).includes('email') || (err as string).includes('password'))){
            form.setFieldError("email", "Username or password is invalid");
            form.setFieldError("password", "Username or password is invalid");
          } else
            console.log(err)
        }
        
      )

    
  }

  function handleforgotPass() {
    // Check for email and pass nulling
    if(form.values.email === ""){
      form.setFieldError('email', 'Invalid Email')
      return
    } else if(!form.isValid('email')) {
      form.setFieldError('email', 'Value must be an email')
      return
    }
    
    // Attempt login
    forgotPass(form.values.email)
      .then(
        () => {
          notifications.show({
            icon: <IconCheck />,
            title: 'Password change initiated!',
            message: 'Check your email :)',
          });
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
        <Text size="xl" fw={500} className="loginText">
          Login
        </Text>
        <br />
        <form onSubmit={form.onSubmit((values) => {handleLogin(values)})}>
          <TextInput label="Email" required id="loginEmailInput" ta={"left"} 
            //onChange={(e) => setLoginState({...loginState, email:e.currentTarget.value,  emailErr:""})}
            {...form.getInputProps('email')}
          />
          <br />
          <PasswordInput
            id="loginPasswordInput"
            label="Password"
            required
            className="loginPasswordInput"
            ta={"left"}
            {...form.getInputProps('password')}
          />
          <div className="cursorToFinger">
            <Text
              onClick={handleforgotPass}
              ta={"left"}
              className="splashScreenModalRedirect"
              id="forgotPasswordLink"
            >
              Forgot your password?
            </Text>
          </div>

          <br />

          <Group>
            <Text>Don't have an account?</Text>
            <div className="cursorToFinger">
              <Text
                className="splashScreenModalRedirect"
                onClick={handleCloseLoginOpenSignUpModal}
                id="signUpLink"
              >
                Sign up!
              </Text>
            </div>
            <div className="loginButtonDiv">
              <Button type="submit" id="loginButton">Login</Button>
            </div>
          </Group>
        </form>
      </SplashScreenModalTemplate>
    </>
  );
};
export default LoginModal;



