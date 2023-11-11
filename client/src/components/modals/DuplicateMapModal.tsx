import { Modal, Button, Group, Box, TextInput, Stack, Select, Divider, Textarea } from "@mantine/core";
import React from "react";
import { useForm } from "@mantine/form";

interface DuplicateMapModalProps {
  opened: boolean;
  onClose: () => void;
}

const DuplicateMapModal: React.FC<DuplicateMapModalProps> = ({ opened, onClose }) => {
  const form = useForm({
    initialValues: {
      mapName: '',
      description: '',
      visibility: '',
    },

    validate: {
      mapName: (value) => {
        if (value.trim() === "") {
          return "Map name is required";
        }
        return null;         // Return `null` if it's valid, or an error message if it's invalid
      },
      description: (value) => {
        if (value.trim() === "") {
          return "Description is required";
        }
        return null;         // Return `null` if it's valid, or an error message if it's invalid
      },
    },
  });

  return (
    <>
      <Modal opened={opened} onClose={onClose}
        title="Duplicate Map" centered size="lg">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
            <Stack style={{marginTop: "30px" }}>
              <Button type="submit" onClick={onClose} style={{marginLeft: "auto" }}>
                Submit
              </Button>
            </Stack>
          </Box>
        </form>
      </Modal>
    </>
  );
}

export default DuplicateMapModal;
