import { AppShell } from "@mantine/core";
import {  useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContextProvider";
import { EditContextProvider, useEditContext } from '../../context/EditContextProvider';
import Canvas from "./Canvas";
import EditNavBar from "./EditNavbar";
import Properties from "./Properties";
import Regions from "./Regions";

export default function Edit(){
  const { id } = useParams();

  return (
    <EditContextProvider map_id={id}>
      <ProtectEdit/>
      <AppShell
        header={{height: 60, offset:true}}
        navbar={{width:225, breakpoint: 'sm'}}
        aside={{width:275, breakpoint: 'sm'}}
        padding={0}
      >
        {/* Top element */}
        <AppShell.Header>
          <EditNavBar/>
        </AppShell.Header>

        {/* Left element */}
        <AppShell.Navbar
          zIndex={-1}
          p="lg"
        >
          <Regions/>
        </AppShell.Navbar>

        {/* Middle element */}
        <AppShell.Main>
          <Canvas/>
        </AppShell.Main>

        {/* Right element */}
        <AppShell.Aside
          zIndex={-1}
          p="lg"
        >
          <Properties/>
        </AppShell.Aside>
      </AppShell>
    </EditContextProvider>
  );
}


function ProtectEdit(){
  const auth = useAuthContext();
  const editPageState = useEditContext();
  const navigate = useNavigate();
  
  if(auth.user?._id != editPageState.map.creatorId)
    navigate('/', {state:{err401: true}})
  return <></>;
}
