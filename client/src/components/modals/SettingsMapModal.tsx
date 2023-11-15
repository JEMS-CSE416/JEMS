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
} from "@mantine/core";
import { FileDropZone } from "../common/FileDropZone";
import { useForm } from "@mantine/form";
import { useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";

export function SettingsMapModal(){
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();

  // Form state that we'll use as default values for now
  const form = useForm({
    initialValues: {
      creatorId: "652daf32e2225cdfeceea17f",
      mapName: "",
      description: "",
      creationDate: "2023-11-04T12:00:00Z",
      public: true,
      colorType: "basic",
      displayStrings: true,
      displayNumerics: true,
      displayLegend: true,
      displayPointers: true,
      thumbnail: {
        imageUrl: "https://example.com/thumbnail.jpg",
        imageType: "jpg",
      },
      regions: {
        dummyGroup: [
          {
            regionName: "dummyName",
            coordinate: [
              [0, 0],
              [1, 1],
            ],
            stringLabel: "dummyLabel",
            stringOffset: [0, 0],
            numericLabel: 0,
            numericUnit: "dummyUnit",
            color: "#eeeeee",
          },
        ],
      },
      legend: {
        colorLegend: {
          "#000000": "black",
          "#ffffff": "white",
        },
        choroplethLegend: {
          "#000000": 0,
          "#ffffff": 10,
        },
      },
      visibility: "",
      template: "",
    },

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
                    placeholder="Map of Grand Line"
                    style={{ width: "100%" }}
                    data-autofocus
                    withAsterisk
                    {...form.getInputProps("mapName")}
                  />
                  <Textarea
                    label="Map Description"
                    description="Enter a description to describe your map"
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
              </Box>
              <Divider orientation="vertical" />
              <Box style={{ width: "55%" }}>
                <Stack>
                  <FileDropZone />
                  <Select
                    label="Template"
                    data={[
                      "String Label Map",
                      "Color Label Map",
                      "Numeric Label",
                      "Choropleth Map",
                      "Pointer Label",
                    ]}
                    style={{ width: "90%" }}
                    {...form.getInputProps("template")}
                  />
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
