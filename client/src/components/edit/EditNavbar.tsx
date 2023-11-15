import {
  Button,
  Flex,
  Space,
  Text,
} from "@mantine/core";
import { useEditContext } from "../../context/EditContextProvider";
import { BaseNavbar } from "../common/Navbar";
import {
  IconDeviceFloppy,
  IconShare2,
  IconSettings
} from "@tabler/icons-react";


export default function EditNavBar(){
  const editState = useEditContext();

  return (
    <BaseNavbar
      modals= {
        <div/>
      }
      center_component={
        <MapTitle name={editState.map.mapName}/>
      }
      right_component={ <EditNavButtons/> }
    />
  )
};

function MapTitle(props: {name: string}){
  return(
    <Text fw={700} size="xl" id="homePageHeader" >
      {props.name}
    </Text>
  )
}

function EditNavButtons(){
  const iconSize = 20;
  return (
    <Flex
      gap="sm"
      justify="center"
    >
      <Button radius="xl" id="createMapButton" /*onClick={}*/>
        <IconDeviceFloppy size={iconSize}/>
      </Button>
      <Button radius="xl" id="createMapButton" /*onClick={}*/>
        <IconShare2 size={iconSize}/>
      </Button>
      <Button radius="xl" id="createMapButton" /*onClick={}*/>
        <IconSettings size={iconSize}/>
      </Button>
    </Flex>
  )
}
