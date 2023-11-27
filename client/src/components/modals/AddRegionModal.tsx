import {
  Modal,
  Button,
  Textarea,
  TextInput,
  Box,
  Select,
  Group,
  Alert,
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

  // This function is used to handle the form submission
  const handleFormSubmit = async () => {
    console.log("submitting form");
    console.log(form.values);
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


