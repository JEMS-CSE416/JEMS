import {
  Text,
  PasswordInput,
  Image,
  Button,
  Group,
} from "@mantine/core";
import { isNotEmpty, useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { changePass } from "../../../api/AuthApiAccesor";
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

  const { id } = useParams();
  const form = useForm({
    initialValues: {
      password: '',
      confirmPass: ''
    },

    validate: {
      password: isNotEmpty('Password Cannot be empty'),
      confirmPass: (value) => ( form.values.password === value) 
        ? null
        : 'Passwords do not match'
    }

  }) as any;

  function onSubmit(values: any){
    console.log("submitting")
    changePass({
      resetId: id?? "",
      password: values.password,
    })
      .then(
        () => {
          console.log("attempting to close")
          notifications.show({
            icon: <IconCheck />,
            title: 'Password has been Changed',
            message: 'Please log in!',
          });
          handleClosePasswordRecoveryOpenLoginModal()
          }
      ).catch(
        (err) => {
          if(err as string !== undefined && ((err as string).includes('invalid'))){
            handleClosePasswordRecoveryOpenLoginModal()
            notifications.show({
              icon: <IconX />,
              title: 'Link is invalid',
              message: 'Please check your link!',
            });
            handleClosePasswordRecoveryOpenLoginModal()
          } else if(err as string !== undefined && ((err as string).includes('expired'))){
            notifications.show({
              icon: <IconX />,
              title: 'Link is expired',
              message: 'Please redo password reset!',
            });
            handleClosePasswordRecoveryOpenLoginModal()
          } else
            console.log("ERROR CHANGING PASSWORD: ", err)
        }
        
      )

  }
  

  return (
    <>
      <SplashScreenModalTemplate
        onClosePasswordRecoveryModal={onClosePasswordRecoveryModal}
      >
        <Image src={jemsLogo} id="logo"></Image>
        <Text size="xl" fw={500} className="loginText">
          Password Recovery
        </Text>
        <br />

        <form onSubmit={form.onSubmit((values: any) => {onSubmit(values)})}>
          {/*
            <TextInput
              label="Email"
              required
              className="splashScreenInput"
              ta={"left"}
            />
            <br />
          */}

          <PasswordInput
            label="New Password"
            required
            className="splashScreenInput"
            ta={"left"}
            {...form.getInputProps('password')}
          />
          <br />

          <PasswordInput
            label="Confirm Password"
            required
            className="splashScreenInput"
            ta={"left"}
            {...form.getInputProps('confirmPass')}
          />
          <br />

          <Group>
            <div className="cursorToFinger">
              <Text
                className="splashScreenModalRedirect"
                onClick={handleClosePasswordRecoveryOpenLoginModal}
              >
                Back to login
              </Text>
            </div>
            <Button
              className="loginButtonDiv"
              type="submit"
            >
              Confirm
            </Button>
          </Group>
        </form>
      </SplashScreenModalTemplate>
    </>
  );
};

export default PasswordRecoveryModal;
