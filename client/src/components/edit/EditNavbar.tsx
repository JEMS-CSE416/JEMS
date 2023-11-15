import {
  Button,
  Flex,
  Text,
} from "@mantine/core";
import { useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";
import { BaseNavbar } from "../common/Navbar";
import {
  IconDeviceFloppy,
  IconShare2,
  IconSettings
} from "@tabler/icons-react";
import { ExportMapModal } from "../modals/ExportMapModal";
import { SettingsMapModal } from "../modals/SettingsMapModal";


/*
 * Edit navbar
 */
export default function EditNavBar(){
  const editState = useEditContext();

  return (
    <BaseNavbar
      modals= {
        <>
          <ExportMapModal/>
          <SettingsMapModal/>
        </>
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
  const setEditPageState = useEditDispatchContext() ;
  const iconSize = 20;

  return (
    <Flex
      gap="sm"
      justify="center"
    >
      <Button radius="xl" >
        <IconDeviceFloppy size={iconSize}/>
      </Button>
      <Button id="export-button" radius="xl" onClick={
          () => setEditPageState({ type:"change_modal", modal:"MAP_EXPORT" })
        }>
        <IconShare2 size={iconSize}/>
      </Button>
      <Button id="settings-button" radius="xl" onClick={
          () => setEditPageState({ type:"change_modal", modal:"MAP_SETTINGS" })
        }>
        <IconSettings size={iconSize}/>
      </Button>
    </Flex>
  )
}
