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
  Grid,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import FileDropZone from "../common/FileDropZone";
import { getFileType } from "../../utils/global_utils";
import {
  geoJsonConvert,
  handleKml,
  handleZip,
} from "../../utils/geojson-convert";
import "./css/CreateMapModal.css";
import { createMap } from "../../api/MapApiAccessor";
import { TemplateTypes } from "../../utils/enums";
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import stringTemplate from "../../utils/templates/stringTemplate.json";
import colorTemplate from "../../utils/templates/colorTemplate.json";

interface CreateMapModalProps {
  opened: boolean;
  onClose: () => void;
}

// The base create map modal with all the logic
const CreateMapModalBase: React.FC<CreateMapModalProps> = ({
  opened,
  onClose,
}) => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [selectedValue, setSelectedValue] = useState<string|null>();

  // This function handles the file drop & sets the file state
  const handleFilesDrop = (droppedFile: File) => {
    setFile(droppedFile);
  };

  // This function handles the conversion based on the file type
  const handleFileConversion = async (file: File) => {
    if (file) {
      try {
        // Get the file extension
        let fileExtension = getFileType(file.name);
        let geojson;
        // Check the file type and handle accordingly
        if (fileExtension === "kml") {
          // Convert KML to GeoJSON
          geojson = await handleKml(file);
        } else if (fileExtension === "zip") {
          // Handle ZIP file
          geojson = await handleZip(file);
        } else {
          // Convert to GeoJSON
          geojson = await geoJsonConvert(file);
        }
        return geojson;
      } catch (error) {
        // Log any errors
        console.log(error);
      }
    }
  };

  // This function parses and grabs regions properties from GeoJSON
  const getRegions = (geojson: any) => {
    let regions = [] as any[];
    if (geojson && geojson.features) {
      let counter = 0;

      geojson.features.forEach((feature: any) => {
        // switchcase that will convert different features in different ways
        switch (feature.geometry.type) {
          case "Polygon":
            regions.push({
              regionName: feature.properties.name || feature.properties.NAME,
              coordinates: feature.geometry.coordinates[0],
              stringLabel: "",
              stringOffset: [0],
              numericLabel: "",
              numericUnit: "",
              color: "#8eb8fa", // default color
            });
            break;
          case "MultiPolygon":
            feature.geometry.coordinates.forEach((coordinates: any) => {
              regions.push({
                regionName: feature.properties.name || feature.properties.NAME,
                coordinates: coordinates[0],
                stringLabel: "",
                stringOffset: [0],
                numericLabel: "",
                numericUnit: "",
                color: "#8eb8fa", // default color
              });
            });
            break;
          case "GeometryCollection":
            feature.geometry.geometries.forEach((geometry: any) => {
              regions.push({
                regionName: "untitled region " + counter++,
                coordinates: geometry.coordinates[0],
                stringLabel: "",
                stringOffset: [0],
                numericLabel: "",
                numericUnit: "",
                color: "#8eb8fa", // default color
              });
            });

            break;
          default:
            console.log("unsupported type:", feature);
        }
      });
    }
    return regions;
  };

  // This function gets the color type based on the template
  const getColorType = () => {
    console.log(selectedValue);
    switch (selectedValue) {
      case "String Label Map":
        return TemplateTypes.TEXT_LABEL_MAP;
      case "Color Label Map":
        return TemplateTypes.COLOR;
      case "Numeric Label":
        return TemplateTypes.NUMERIC_LABEL_MAP;
      case "Choropleth Map":
        return TemplateTypes.CHOROPLETH;
      case "Pointer Label":
        return TemplateTypes.POINT_LABEL_MAP;
      default:
        return TemplateTypes.NONE;
    }
  };

  // This function gets the request body for JEMS JSON
  function getJemsRequest(jemsjson: any) {
    const content = jemsjson.map_file_content;
    // Create the request body
    const req = {
      map_file_content: {
        mapName: form.values.mapName,
        description: form.values.description,
        creationDate: new Date().toISOString(),
        public: content.public,
        template: content.template,
        colorType: getColorType(),
        displayStrings: selectedValue == "String Label Map" ? true : content.displayStrings,
        displayNumerics: content.displayNumerics,
        displayLegend: content.displayLegend,
        displayPointers: content.displayPointers,
        thumbnail: content.thumbnail,
        regions: content.regions,
        legend: content.legend,
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
          mapName: form.values.mapName,
          description: form.values.description,
          creationDate: new Date().toISOString(),
          public: form.values.visibility === "Public" ? true : false,
          template: form.values.template,
          colorType: getColorType(),
          displayStrings: false,
          displayNumerics: false,
          displayLegend: false,
          displayPointers: false,
          thumbnail: {
            imageUrl:
              "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80",
            imageType: "avif",
          },
          regions: {
            [filename]: getRegions(geojson),
          },
          legend: {
            colorLegend: {},
            choroplethLegend: {},
          },
        },
      };
      return req;
    }
  }

  function getEmptyMap() {
    const req = {
      map_file_content: {
        mapName: form.values.mapName,
        description: form.values.description,
        creationDate: new Date().toISOString(),
        public: form.values.visibility === "Public" ? true : false,
        template: form.values.template,
        colorType: getColorType(),
        displayStrings: false,
        displayNumerics: false,
        displayLegend: false,
        displayPointers: false,
        thumbnail: {
          imageUrl: "",
          imageType: "",
        },
        regions: {},
        legend: {
          colorLegend: {},
          choroplethLegend: {},
        },
      },
    };
    return req;
  }

  const createRequest = async () => {
    let req;
    if (file) {
      // A file was dropped in meaning template was not selected
      setSelectedValue(null);

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
    else if (selectedValue) { // If file does not exist, check if a template was selected
      switch (selectedValue) {
        case "String Label Map":
          req = getJemsRequest(stringTemplate);
          break;
        case "Color Label Map":
          req = getJemsRequest(colorTemplate);
          break;
        // TODO: TO BE IMPLEMENTED
        case "Numeric Label":
        case "Choropleth Map":
        case "Pointer Label":
        default:
          console.log(selectedValue + " currently not supported");
          break;
      } 
    }else {
      // create an empty map
      req = getEmptyMap();
    }
    return req;
  };

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
      // check if there user dropped in a file
      if (!file) {
        // Show error notification
        notifications.show({
          icon: <IconX />,
          title: "Error creating map",
          message: "Drop a file or select a template!",
        });
      }
    }
  };

  // Form state that we'll use as default values for now
  const form = useForm({
    initialValues: {
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
      <Modal
        id="create-map-modal"
        opened={opened}
        onClose={onClose}
        title="Create Map"
        centered
        size="70%"
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
                <FileDropZone
                  fileUploadType="MAP_UPLOAD"
                  onFilesDrop={handleFilesDrop}
                />
                <Stack justify="space-between">{previews()}</Stack>
                <Divider
                  label="OR"
                  labelPosition="center"
                  style={{ margin: "10px 0" }}
                />
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
                  onChange={(selectedValue) =>
                    setSelectedValue(selectedValue)
                  }
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
    <>{opened && <CreateMapModalBase opened={opened} onClose={onClose} />}</>
  );
};

export default CreateMapModal;
