import { Divider, Modal, Button, Textarea, TextInput, Box, Select, Group, Stack, Grid, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FileDropZone from "../common/FileDropZone";
import { getFileType, getColorType, getRegions, handleFileConversion } from "../../utils/global_utils";
import "./css/CreateMapModal.css";
import { createMap } from "../../api/MapApiAccessor";

interface CreateMapModalProps {
  opened: boolean;
  onClose: () => void;
}

// The base create map modal with all the logic
const CreateMapModalBase: React.FC<CreateMapModalProps> = ({ opened, onClose }) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);

  // This function handles the file drop & sets the file state
  const handleFilesDrop = (droppedFile: File) => {
    setFile(droppedFile);
  };

  // This function gets the request body for JEMS JSON
  function getJemsRequest(jemsjson: any) {
    const content = jemsjson.map_file_content;
    // Create the request body
    const req = {
      map_file_content: {
        creatorId: form.values.creatorId,
        mapName: form.values.mapName,
        description: form.values.description,
        creationDate: new Date().toISOString(),
        public: content.public,
        template: content.template,
        colorType: content.colorType,
        displayStrings: content.displayStrings,
        displayNumerics: content.displayNumerics,
        displayLegend: content.displayLegend,
        displayPointers: content.displayPointers,
        thumbnail: content.thumbnail,
        regions: content.regions,
        legend: content.legend
      },
    };
    return req;
  }

  // This function gets the request body for GeoJSON
  function getGeoJsonRequest(geojson: any) {
    if (file) {
      const filename = file.name;
      // Create the request body
      const req = {
        map_file_content: {
          creatorId: form.values.creatorId,
          mapName: form.values.mapName,
          description: form.values.description,
          creationDate: new Date().toISOString(),
          public: form.values.visibility === "Public" ? true : false,
          template: form.values.template,
          colorType: getColorType(form.values.template),
          displayStrings: false,
          displayNumerics: false,
          displayLegend: false,
          displayPointers: false,
          thumbnail: {
            imageUrl: "",
            imageType: "",
          },
          regions: {
            [filename]: getRegions(geojson),
          },
          legend: {
            colorLegend: {
            },
            choroplethLegend: {
            }
          }
        },
      };
      return req;
    }
  }

  const createRequest = async () => {
    let req;
    if (file) {
      // Get the file extension
      let fileExtension = getFileType(file.name);

      // Check the file type and handle accordingly
      if (fileExtension === "json") {
        const file_content = await file.text();
        const json_file = JSON.parse(file_content);

        if (json_file.map_file_content) {
          // Handles getting request when file uploaded is a JEMS JSON
          req = getJemsRequest(json_file);
        } else {
          // Handles getting request when file uploaded is converted to GeoJSON
          req = getGeoJsonRequest(json_file);
        }
      } else {
        // Convert the file to geojson
        const geojson = await handleFileConversion(file);
        // Check if the conversion was successful
        if (!geojson) {
          console.error("File conversion failed");
          return;
        }
        req = getGeoJsonRequest(geojson);
      }
    }
    return req;
  }

  // Handle form submission and close the modal
  const handleFormSubmit = async () => {
    const req = await createRequest();

    // Create the map
    try {
      const responseData = await createMap(req);
      console.log("Map created successfully:", responseData);
      onClose();
      navigate(`/edit/${responseData._id}`);
    } catch (err) {
      console.error("Error creating map:", err);
      onClose();
    }
  };

  // Form state that we'll use as default values for now
  const form = useForm({
    //TO-DO: Update creatorId after auth is implemented
    initialValues: {
      creatorId: "652daf32e2225cdfeceea14f",
      mapName: "",
      description: "",
      visibility: "",
      template: "",
      convertedGeoJson: "",
    },

    validate: {
      mapName: (value) => {
        // Return `null` if it's valid, or an error message if it's invalid
        if (value.trim() === "") {
          return "Map name is required";
        }
        return null;
      },
      description: (value) => {
        // Return `null` if it's valid, or an error message if it's invalid
        if (value.trim() === "") {
          return "Description is required";
        }
        return null;
      },
    },
  });

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
      <Modal id="create-map-modal" opened={opened}
        onClose={onClose} title="Create Map"
        centered size="70%"
      >
        <Box style={{ margin: "20px" }}>
          <form onSubmit={form.onSubmit((values) => handleFormSubmit())}>
            <Grid gutter="xl">
              <Grid.Col span={5}>
                <TextInput
                  label="Map Name"
                  description="Enter a name to describe your map"
                  placeholder="Map of Grand Line"
                  style={{ width: "100%", marginBottom: "20px" }}
                  data-autofocus
                  withAsterisk
                  {...form.getInputProps("mapName")}
                />
                <Textarea
                  label="Map Description"
                  description="Enter a description to describe your map"
                  placeholder="This is a map of the Grand Line"
                  style={{ width: "100%", marginBottom: "20px" }}
                  variant="filled"
                  data-autofocus
                  withAsterisk
                  {...form.getInputProps("description")}
                />
                <Select
                  label="Visibility"
                  data={["Public", "Private"]}
                  style={{ width: "100%", marginBottom: "20px" }}
                  withAsterisk
                  {...form.getInputProps("visibility")}
                />
              </Grid.Col>
              <Grid.Col span={7}>
                <FileDropZone fileUploadType="MAP_UPLOAD" onFilesDrop={handleFilesDrop} />
                <Stack justify="space-between">
                  {previews()}
                </Stack>
                <Divider label="OR" labelPosition="center" style={{ margin: "10px 0" }} />
                <Select
                  label="Template"
                  data={[
                    "String Label Map",
                    "Color Label Map",
                    "Numeric Label",
                    "Choropleth Map",
                    "Pointer Label",
                  ]}
                  disabled={file ? true : false}
                  style={{ width: "90%" }}
                  {...form.getInputProps("template")}
                />
              </Grid.Col>
            </Grid>
            <Group justify="flex-end" mt="xl">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>
    </>
  );
};

// wrap it in a conditional loading
const CreateMapModal: React.FC<CreateMapModalProps> = ({ opened, onClose }) => {
  return (
    <>
      {
        opened && <CreateMapModalBase opened={opened} onClose={onClose} />
      }
    </>
  )
}

export default CreateMapModal;
