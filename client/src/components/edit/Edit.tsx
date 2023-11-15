import { AppShell, Box } from "@mantine/core";
import { useParams } from "react-router-dom";
import { EditContextProvider } from '../../context/EditContextProvider';
import Canvas from "./Canvas";
import EditNavBar from "./EditNavbar";
import Legend from "./Legend";
import Properties from "./Properties";
import Regions from "./Regions";

export default function Edit(){
  const { id } = useParams();
  return (
    <EditContextProvider map_id={id}>
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
          <Box pos="relative">
          <Legend/>
          </Box>
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


