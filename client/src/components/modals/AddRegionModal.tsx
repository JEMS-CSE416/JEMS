import {
  Modal,
  Button,
  Box,
  Group,
  Alert,
} from "@mantine/core";
import FileDropZone from "../common/FileDropZone";
import { useForm } from "@mantine/form";
import { useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";
import { useState } from "react";
import { getFileType, handleFileConversion, getRegions } from "../../utils/global_utils";
import { updateMap } from "../../api/MapApiAccessor";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";

// The base Settings modal with all the logic
function AddRegionModalBase() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const [file, setFile] = useState<File | null>(null);

  const handleFilesDrop = (droppedFiles: File) => {
    setFile(droppedFiles);
  };

  // Form state that we'll use as default values for now
  const form = useForm({
    initialValues: editPageState.map,
  });

  // This function adds new regions onto map.regions
  function regionUpdate(regionsToAdd: any, filename: string) {
    const existingRegions = editPageState.map.regions;

    // add new regions to existing regions
    const regions = {
      ...existingRegions,
      [filename]: regionsToAdd
    };

    // create a new map object
    const newMap = { ...editPageState.map, regions: regions };

    console.log(newMap, "updated newMap");
    setEditPageState({ type: "update_map", map: newMap });
  }

  const handleAdditionalFile = async () => {
    if (file) {
      // Get the file extension
      let fileExtension = getFileType(file.name);

      // Check the file type and handle accordingly
      if (fileExtension === "json") {
        const file_content = await file.text();
        const json_file = JSON.parse(file_content);

        if (json_file.map_file_content) {
          // Handles getting request when file uploaded is a JEMS JSON
          regionUpdate(json_file.map_file_content.regions, file.name);
        } else {
          // Handles getting request when file uploaded is converted to GeoJSON
          regionUpdate(getRegions(json_file), file.name);
        }
      } else {
        // Convert the file to geojson
        const geojson = await handleFileConversion(file);
        // Check if the conversion was successful
        if (!geojson) {
          console.error("File conversion failed");
          return;
        }
        regionUpdate(getRegions(geojson), file.name);
      }
    }
  }

  // This function is used to handle the form submission
  const handleFormSubmit = async () => {
    console.log("submitting form");
    console.log(form.values);

    // Update the edit page state
    handleAdditionalFile();

    try {
      // Update the map in the database
      const responseData = await updateMap({ map: editPageState.map });
      console.log("Map updated successfully:", responseData);

      // Show a notification
      notifications.show({
        icon: <IconCheck />,
        title: 'Your new file has been add!',
        message: 'Yay an updated map :D',
      });
    } catch (error) {
      console.log(error);

      // Show a notification
      notifications.show({
        icon: <IconX />,
        title: 'Error updating map :(',
        message: 'Please try again',
      });
    }

    // Close the modal
    setEditPageState({ type: "change_modal", modal: "NONE" })
  };

  // This function is used to display the file name after it's uploaded
  const previews = () => {
    if (file) {
      return (
        <div>
          <Alert
            color="blue"
            title="Uploaded File"
            style={{ marginBottom: "10px" }}
            withCloseButton
            onClose={() => setFile(null)}
            className="file-preview"
          >
            {file && <p>{file.name}</p>}
          </Alert>

        </div>
      );
    }
  };

  return (
    <>
      <Modal id="add-region-modal"
        opened={editPageState.modal === "ADD_REGION"}
        onClose={() => setEditPageState({ type: "change_modal", modal: "NONE" })}
        title="Add Region"
        centered size="70%"
      >
        <Box style={{ margin: "20px" }}>
          <form onSubmit={form.onSubmit((values) => handleFormSubmit())}>
            <FileDropZone fileUploadType="MAP_UPLOAD" onFilesDrop={handleFilesDrop} />
            {previews()}
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
export function AddRegionModal() {
  const editPageState = useEditContext();
  return (
    <>
      {editPageState.modal === "ADD_REGION" && <AddRegionModalBase />}
    </>
  )
}


