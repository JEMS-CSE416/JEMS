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
import { IconCheck, IconX } from "@tabler/icons-react";
import { useSelectedMap } from "../hooks/useSelectedMap";
import { Map } from "../../utils/models/Map";
import { duplicateMap } from "../../api/MapApiAccessor";
import { useNavigate } from "react-router-dom";

interface DuplicateMapModalProps {
  opened: boolean;
  onClose: () => void;
}

// The base duplicate map modal with all the logic
const DuplicateMapModalBase: React.FC<DuplicateMapModalProps> = ({
  opened,
  onClose,
}) => {
  const selectedMap = useSelectedMap();
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

  const navigate = useNavigate();

  const handleMakeCopy = async (map: Map) => {
    try {
      const data = {
        mapId: map._id.toString(),
        mapName: form.values.mapName,
        description: form.values.description,
        isPublic:
          form.values.visibility.toString() == "Public" ? "true" : "false",
      };
      await duplicateMap(data);
      notifications.show({
        icon: <IconCheck />,
        title: "Your map has been duplicated!",
        message: "Horray a new map :)",
      });
      navigate("/home");
    } catch (error) {
      console.error("Error duplicating map:", error);
      notifications.show({
        icon: <IconX />,
        title: "Error duplicating map!",
        message: "Please try again!",
      });
    }

    onClose();
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
        <form onSubmit={form.onSubmit((values) => handleMakeCopy(selectedMap))}>
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
}) => {
  return (
    <>{opened && <DuplicateMapModalBase opened={opened} onClose={onClose} />}</>
  );
};

export default DuplicateMapModal;
