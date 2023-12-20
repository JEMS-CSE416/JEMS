import { Button, Flex, Text } from "@mantine/core";
import {
  useEditContext,
  useEditDispatchContext,
  useLeafletMapContext,
} from "../../context/EditContextProvider";
import { BaseNavbar } from "../common/Navbar";
import {
  IconDeviceFloppy,
  IconShare2,
  IconSettings,
} from "@tabler/icons-react";
import { ExportMapModal } from "../modals/ExportMapModal";
import { SettingsMapModal } from "../modals/SettingsMapModal";
import { updateMap } from "../../api/MapApiAccessor";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import L from "leaflet";
import "leaflet-easyprint";

/*
 * Edit navbar
 */
export default function EditNavBar() {
  const editState = useEditContext();

  return (
    <BaseNavbar
      modals={
        <>
          <ExportMapModal />
          <SettingsMapModal />
        </>
      }
      center_component={<MapTitle name={editState.map.mapName} />}
      right_component={<EditNavButtons />}
    />
  );
}

function MapTitle(props: { name: string }) {
  if (props.name.length >= 45) {
    const mapName = props.name.slice(0, 46);
    return (
      <Text fw={700} size="xl" id="homePageHeader">
        {mapName + "..."}
      </Text>
    );
  }
  return (
    <Text fw={700} size="xl" id="homePageHeader">
      {props.name}
    </Text>
  );
}

function EditNavButtons() {
  const editState = useEditContext();
  async function CallUpdateMap() {
    try {
      const map = await updateMap({ map: editState.map });

      // Show a notification
      notifications.show({
        icon: <IconCheck />,
        title: "Your map has been saved!",
        message: "A map never to be lost again!",
      });
    } catch (error) {
      console.log(error);
      // Show a notification
      notifications.show({
        icon: <IconX />,
        title: "Error updating map",
        message: "Please try again",
      });
    }
  }
  const setEditPageState = useEditDispatchContext();
  const iconSize = 20;

  return (
    <Flex gap="sm" justify="center">
      <Button radius="xl" onClick={CallUpdateMap}>
        <IconDeviceFloppy size={iconSize} />
      </Button>
      <Button
        id="export-button"
        radius="xl"
        onClick={() =>
          setEditPageState({ type: "change_modal", modal: "MAP_EXPORT" })
        }
      >
        <IconShare2 size={iconSize} />
      </Button>
      <Button
        id="settings-button"
        radius="xl"
        onClick={() =>
          setEditPageState({ type: "change_modal", modal: "MAP_SETTINGS" })
        }
      >
        <IconSettings size={iconSize} />
      </Button>
    </Flex>
  );
}
