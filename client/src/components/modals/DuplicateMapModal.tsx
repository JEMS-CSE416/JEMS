import {
  Modal,
  Button,
  Box,
  TextInput,
  Stack,
  Select,
  Textarea,
} from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";
import { Map } from "../../utils/models/Map";

interface DuplicateMapModalProps {
  opened: boolean;
  onClose: () => void;
  map?: Map;
}

// The base duplicate map modal with all the logic
const DuplicateMapModalBase: React.FC<DuplicateMapModalProps> = ({
  opened,
  onClose,
  map,
}) => {
  const form = useForm({
    initialValues: {
      mapName: "",
      description: "",
      visibility: "",
    },

    validate: {
      mapName: (value) => {
        if (value.trim() === "") {
          return "Map name is required";
        }
        return null; // Return `null` if it's valid, or an error message if it's invalid
      },
      description: (value) => {
        if (value.trim() === "") {
          return "Description is required";
        }
        return null; // Return `null` if it's valid, or an error message if it's invalid
      },
    },
  });

  const handleMakeCopy = async () => {
    // console.log("Form values:", form.values);
    // console.log("Map to duplicate:", map);
    /*
    REPLACE THIS LOGIC WITH API ACCESSOR FOR DUPLICATION
    */
    try {
      const data = {
        map_id: map?._id,
        map_name: form.values.mapName,
        description: form.values.description,
        public: (form.values.visibility == "Public" ? true : false),
      };

      // Replace with your API endpoint
      const response = await fetch(
        "https://dev-jems-api.miguelmaramara.com/api/maps/duplicate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer 652daf32e2225cdfeceea14f", // TODO: replace with actual session token
          },
          body: JSON.stringify(data),
        }
      );
    } catch (error) {
      console.error("Error duplicating map:", error);
    }

    /*
    REPLACE THIS LOGIC WITH API ACCESSOR FOR DUPLICATION
    */

    onClose();
    notifications.show({
      icon: <IconCheck />,
      title: "Your map has been duplicated!",
      message: "You can now edit your new map at: https://jems.app/",
    });
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={onClose}
        title="Duplicate Map"
        centered
        size="lg"
      >
        <form onSubmit={form.onSubmit((values) => handleMakeCopy())}>
          <Box>
            <Stack justify="flex-start">
              <TextInput
                label="Map Name"
                description="Enter a name to describe your map"
                placeholder="Copy of Best places to eat in the East Blue"
                style={{ width: "100%" }}
                data-autofocus
                withAsterisk
                {...form.getInputProps("mapName")}
              />
              <Textarea
                label="Map Description"
                description="Enter a description to describe your new map"
                placeholder="This is a map of the Grand Line"
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
            <Stack style={{ marginTop: "30px" }}>
              <Button
                id="duplicate-modal-submit-button"
                type="submit"
                style={{ marginLeft: "auto" }}
              >
                Make copy
              </Button>
            </Stack>
          </Box>
        </form>
      </Modal>
    </>
  );
};

// wrap it in a conditional loading
const DuplicateMapModal: React.FC<DuplicateMapModalProps> = ({
  opened,
  onClose,
  map,
}) => {
  return (
    <>
      {opened && (
        <DuplicateMapModalBase opened={opened} onClose={onClose} map={map} />
      )}
    </>
  );
};

export default DuplicateMapModal;
