import {
  Modal,
  Button,
  Textarea,
  TextInput,
  Box,
  Select,
  Group,
  Image,
  AspectRatio,
  Grid,
} from "@mantine/core";
import FileDropZone from "../common/FileDropZone";
import { useForm } from "@mantine/form";
import { useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";
import { useState } from "react";
import { uploadImage } from "../../api/SpacesApiAccessor";
import { getFileType } from "../../utils/global_utils";
import { updateMap } from "../../api/MapApiAccessor";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

// The base Settings modal with all the logic
function SettingsMapModalBase() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const [file, setFile] = useState<File>();

  const handleFilesDrop = (droppedFiles: File) => {
    setFile(droppedFiles);
  };

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

  // This function is used to handle the form submission
  const handleFormSubmit = async () => {
    if (file) {
      // Set the file path in the DO space with the creatorId and mapId
      const filePath = `map_images/${form.values.creatorId}/${form.values._id}`;

      // Upload the image to the DO space
      const imageUrl = await uploadImage(file, filePath);

      // Update the edit page state 
      editPageState.map.mapName = form.values.mapName;
      editPageState.map.description = form.values.description;
      editPageState.map.public = form.values.visibility === "Public" ? true : false;
      editPageState.map.thumbnail.imageUrl = imageUrl;
      editPageState.map.thumbnail.imageType = getFileType(imageUrl);

      console.log(editPageState.map, "updated editPageState.map");
      setEditPageState({ type: "update_map", map: editPageState.map });

      try {
        // Update the map in the database
        const responseData = await updateMap({ map: editPageState.map });
        console.log("Map updated successfully:", responseData);

        // Show a notification
        notifications.show({
          icon: <IconCheck />,
          title: 'Your map has been updated!',
          message: 'Yay an updated map :D',
        });
      } catch (error) {
        console.log(error);

        // Show a notification
        notifications.show({
          icon: <IconX />,
          title: 'Error updating map',
          message: 'Please try again',
        });
      }

      // Close the modal
      setEditPageState({ type: "change_modal", modal: "NONE" })
    }
  };

  // This function is used to display the image preview after the user uploads an image
  const previews = () => {
    if (file) {
      return (
        <Image
          src={URL.createObjectURL(file)}
          radius="md"
          alt="Norway"
        />
      );
    } else if (editPageState.map.thumbnail.imageUrl) {
      return (
        <Image
          src={editPageState.map.thumbnail.imageUrl}
          radius="md"
          alt="Norway"
        />
      );
    }
  };

  return (
    <>
      <Modal id="settings-modal"
        opened={editPageState.modal === "MAP_SETTINGS"}
        onClose={() => setEditPageState({ type: "change_modal", modal: "NONE" })}
        title="Create Map"
        centered size="70%"
      >
        <Box style={{ margin: "20px" }}>
          <form onSubmit={form.onSubmit((values) => handleFormSubmit())}>
            <Grid gutter="xl">
              <Grid.Col span={5}>
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
                  defaultValue={editPageState.map.public ? "Public" : "Private"}
                  data={["Public", "Private"]}
                  style={{ width: "100%" }}
                  withAsterisk
                  {...form.getInputProps("visibility")}
                />
              </Grid.Col>
              <Grid.Col span={7}>
                <FileDropZone fileUploadType="IMAGE_UPLOAD" onFilesDrop={handleFilesDrop} />
                <AspectRatio ratio={20 / 9}>
                  {previews()}
                </AspectRatio>
              </Grid.Col>
            </Grid>
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
export function SettingsMapModal() {
  const editPageState = useEditContext();
  return (
    <>
      {editPageState.modal === "MAP_SETTINGS" && <SettingsMapModalBase />}
    </>
  )
}


