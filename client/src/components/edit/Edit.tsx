import { AppShell } from "@mantine/core";
import { useParams } from "react-router-dom";
import { EditContextProvider } from '../../context/EditContextProvider';
import Canvas from "./Canvas";
import EditNavBar from "./EditNavbar";
import Regions from "./Regions";

export default function Edit(){
  const { id } = useParams();
  return (
    <EditContextProvider map_id={id}>
      <AppShell
        header={{height: 60, offset:true}}
        navbar={{width:225, breakpoint: 'sm'}}
        aside={{width:225, breakpoint: 'sm'}}
        padding="lg"
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
          Main
        </AppShell.Main>

        {/* Right element */}
        <AppShell.Aside zIndex={-1}>
          <h1>
            Test
          </h1>
        </AppShell.Aside>
      </AppShell>
    </EditContextProvider>
  );
}


