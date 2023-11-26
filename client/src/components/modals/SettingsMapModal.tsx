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
import { useState, useEffect } from "react";
import { uploadImage, getImage, deleteImage} from "../../api/SpacesApiAccessor";
import { getFileType } from "../../utils/global_utils";

// The base Settings modal with all the logic
function SettingsMapModalBase() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();

  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (file) {
      console.log(file);
    }
  }, [file]);

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
    // You can add your form submission logic here
    // For now, we'll just log the form values
    console.log(form.values);
    if (file) {
      // Set the file path in the DO space with the creatorId and mapId
      const filePath = `map_images/${form.values.creatorId}/${form.values._id}`;
      
      // Upload the image to the DO space
      const imageUrl = await uploadImage(file, filePath);

      // Update the map image url in the database
      editPageState.map.thumbnail.imageUrl = imageUrl;
      editPageState.map.thumbnail.imageType = getFileType(imageUrl);
      
      console.log(editPageState.map, "updated editPageState.map");
      
      setEditPageState({ type: "update_map", map: editPageState.map});
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
    }
  };

  const handleImageGet = () => {
    const imageURL = 'apple.png'
    deleteImage(imageURL).then((res) => {
      console.log(res);
    }
    );
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
                  placeholder="Public"
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


