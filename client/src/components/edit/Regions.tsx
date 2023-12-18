import {
  ActionIcon,
  Flex,
  Stack,
  Title,
  Text,
  Button,
  ScrollArea,
  Group,
  CloseButton
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import React from "react";
import { EditPageAction, EditPageState, useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";
import { AddRegionModal } from "../modals/AddRegionModal";
import { IconCheck } from "@tabler/icons-react";
import { UndoableDeleteRegion, useUndoRedoContext } from "../../context/UndoRedo";

export default function Regions() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const addToUndoRedo = useUndoRedoContext();

  function handleDeleteGroup(groupName: string) {
    console.log("delete group", groupName)
    console.log(editPageState.map.regions)
    let regions = editPageState.map.regions;
    //grab the groupName and delete it from the map regions
    //delete regions[groupName]
    addToUndoRedo(new UndoableDeleteRegion(groupName, regions[groupName]))
    //console.log(regions, "after delete")
    //editPageState.map.regions = regions;
    // Update the edit page state
    //setEditPageState({ type: "update_map", map: editPageState.map });

    // Show a notification
    notifications.show({
      icon: <IconCheck />,
      title: `Deleted ${groupName} successfully`,
      message: 'Bye bye deleted group :O',
    });
  }

  return (
    <>
      <AddRegionModal />
      <Flex
        align="center"
        gap="xl"
        mb={20}
        style={{ justifyContent: 'space-between' }}
      >
        <Title order={3}> Regions </Title>

        <ActionIcon radius="xl"
          onClick={
            () => setEditPageState({ type: "change_modal", modal: "ADD_REGION" })
          }>
          <IconPlus size={15} />
        </ActionIcon>
      </Flex>

      <ScrollArea>
        <Stack align="flex-start" gap={10}>
          {
            Object.entries(editPageState.map.regions).map(
              ([groupName, regions]) => {
                return (
                  <>
                    <Group wrap="nowrap">
                      <CloseButton
                        onClick={() => handleDeleteGroup(groupName)}
                      />
                      <Title order={5} style={{ textAlign: "left" }}>{groupName}</Title>
                    </Group>
                    <Stack gap={0} w="100%">
                      {regions.map((region, i) =>

                        <RegionButton
                          groupName={groupName}
                          i={i}
                          editPageState={editPageState}
                          setEditPageState={setEditPageState}
                        />
                      )}
                    </Stack>
                  </>
                )
              }
            )
          }
        </Stack>
      </ScrollArea>

    </>
  )
}

function RegionButton(props: {
  groupName: string,
  i: number,
  editPageState: EditPageState,
  setEditPageState: React.Dispatch<EditPageAction>
}) {
  const groupName = props.groupName
  const i = props.i
  const editPageState = props.editPageState
  const setEditPageState = props.setEditPageState

  let variant = "subtle"
  if (groupName === editPageState.selectedRegion?.groupName &&
    i === editPageState.selectedRegion.i)
    variant = "filled"

  return (
    <>
      <Button
        variant={variant}
        color="black"
        fullWidth
        pl={15}
        justify="left"
        onClick={() => setEditPageState({
          type: "select_region",
          selectedRegion: {
            groupName: groupName,
            i: i,
            region: editPageState.map.regions[groupName][i],
          }
        })}
      >
        <Text>
          {editPageState.map.regions[groupName][i].regionName}
        </Text>
      </Button>
    </>
  )
}



