import {
  Divider,
  Modal,
  Button,
  Textarea,
  TextInput,
  Box,
  Select,
  Group,
  Stack,
  Image,
  AspectRatio,
} from "@mantine/core";
import { FileDropZone } from "../common/FileDropZone";
import { useForm } from "@mantine/form";
import { useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";

// The base Settings modal with all the logic
function SettingsMapModalBase(){
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();

  // Form state that we'll use as default values for now
  const form = useForm({
    initialValues: editPageState.map,
    validate: {
      mapName: (value) => {
        // You can add your map name validation logic here
        // Return `null` if it's valid, or an error message if it's invalid
        if (value.trim() === "") {
          return "Map name is required";
        }
        return null;
      },
      description: (value) => {
        // You can add your description validation logic here
        // Return `null` if it's valid, or an error message if it's invalid
        if (value.trim() === "") {
          return "Description is required";
        }
        return null;
      },
    },
  });

  return (
    <>
      <Modal id="settings-modal"
        opened={editPageState.modal === "MAP_SETTINGS"}
        onClose={() => setEditPageState({type:"change_modal", modal:"NONE"})}
        title="Create Map"
        centered size="70%"
      >
        <Box style={{ margin: "20px" }}>
          <form>
            <Group>
              <Box style={{ width: "40%" }}>
                <Stack justify="flex-start">
                  <TextInput
                    label="Map Name"
                    description="Enter a name to describe your map"
                    placeholder={editPageState.map.mapName}
                    style={{ width: "100%" }}
                    data-autofocus
                    withAsterisk
                    {...form.getInputProps("mapName")}
                  />
                  <Textarea
                    label="Map Description"
                    description="Enter a description to describe your map"
                    placeholder={editPageState.map.description}
                    style={{ width: "100%" }}
                    variant="filled"
                    data-autofocus
                    withAsterisk
                    {...form.getInputProps("description")}
                  />
                  <Select
                    label="Visibility"
                    placeholder="Public"
                    data={["Public", "Private"]}
                    style={{ width: "100%" }}
                    withAsterisk
                    {...form.getInputProps("visibility")}
                  />
                </Stack>
              </Box>
              <Divider orientation="vertical" />
              <Box style={{ width: "55%" }}>
                <Stack>
                  <FileDropZone />
                    <AspectRatio ratio={20/9}>
                    <Image
                      src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
                      radius="md"
                      alt="Norway"
                    />
                    </AspectRatio>
                </Stack>
              </Box>
            </Group>

            <Group justify="flex-end" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
};


// wrap it in a conditional loading 
export function SettingsMapModal(){
  const editPageState = useEditContext();
  return(
    <>
      { editPageState.modal === "MAP_SETTINGS" && <SettingsMapModalBase/>}
    </>
  )
}


