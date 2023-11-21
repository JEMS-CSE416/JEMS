import { Divider, Modal, Button, Textarea, TextInput, Box, Select, Group, Stack, Grid, Alert } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import FileDropZone from "../common/FileDropZone";
import { geoJsonConvert, handleKml, handleZip } from "../../utils/geojson-convert";
import { getFileType } from "../../utils/global_utils";
import "./css/CreateMapModal.css";

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

  // This function handles the conversion based on the file type
  const handleFileConversion = async () => {
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
    console.log("getregions input", geojson)
    if (geojson && geojson.features) {
      let counter = 0;

      geojson.features.forEach((feature: any) => {
        // switchcase that will convert different features in different ways
        console.log("feature:", feature)
        switch(feature.geometry.type){
          case "Polygon":
            regions.push ({
                regionName: feature.properties.name || feature.properties.NAME,
                coordinates: feature.geometry.coordinates[0],
                stringLabel: "",
                stringOffset: [0],
                numericLabel: 0,
                numericUnit: "",
                color: "",
              })
            
            break;
          case "GeometryCollection":
            feature.geometry.geometries.forEach((geometry: any) =>{
              regions.push ({
                  regionName: "untitled region " + counter++,
                  coordinates: geometry.coordinates[0],
                  stringLabel: "",
                  stringOffset: [0],
                  numericLabel: 0,
                  numericUnit: "",
                  color: "",
                })
              })
            
            break;
          default:
            console.log("unsupported type:", feature);
        }

        });
    }
    console.log("Regions", regions)
    return regions;
  }

  // This function gets the color type based on the template
  const getColorType = (template: string) => {
    switch (template) {
      case "Color Label Map":
        return "COLOR";
      case "Choropleth Map":
        return "CHOROPLETH";
      default:
        return "NONE";
    }
  }

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
      console.log("req for geojson: ", req);
      return req;
    }
  }

  // Handle form submission and close the modal
  const handleFormSubmit = async () => {
    let req;

    if (file) {
      // Get the file extension
      let fileExtension = getFileType(file.name);

      // Check the file type and handle accordingly
      if (fileExtension === "json") {
        const file_content = await file.text();
        const json_file = JSON.parse(file_content);
        console.log("JSON_File Contents: ", json_file);

        if (json_file.map_file_content) {
          // Handles getting request when file uploaded is a JEMS JSON
          req = getJemsRequest(json_file);
        } else {
          // Handles getting request when file uploaded is converted to GeoJSON
          req = getGeoJsonRequest(json_file);
        }
        console.log("req for json: ", req);
      } else {
        // Convert the file to geojson
        const geojson = await handleFileConversion();
        console.log("converted geojson: ", geojson)
        // Check if the conversion was successful
        if (!geojson) {
          console.error("File conversion failed");
          return;
        }
        req = getGeoJsonRequest(geojson);
      }
    }

    console.log("Form values: ", form.values);
    console.log("PRINTING REQUEST");
    console.log(req);

    // Replace with your API endpoint
    const apiUrl = "http://localhost:443/api/maps";

    await fetch(apiUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req),
    })
      .then(async (res) => {
        if (res.ok) {
          const responseData = await res.json();
          console.log("Map created successfully:", responseData);
          onClose();
          navigate(`/edit/${responseData._id}`);
        } else {
          console.error("Error creating map:", res.status, res.statusText);
          onClose();
        }
      })
      .catch((err) => {
        console.error("Error updating data:", err);
        onClose();
      });
  };

  // Form state that we'll use as default values for now
  const form = useForm({
    //TO-DO: Update creatorId after auth is implemented
    initialValues: {
      creatorId: "652daf32e2225cdfeceea17f",
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
    if(file) {
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
                  style={{ width: "100%", marginBottom: "20px"}}
                  data-autofocus
                  withAsterisk 
                  {...form.getInputProps("mapName")}
                />
                <Textarea
                  label="Map Description"
                  description="Enter a description to describe your map"
                  placeholder="This is a map of the Grand Line"
                  style={{ width: "100%", marginBottom: "20px"}}
                  variant="filled"
                  data-autofocus
                  withAsterisk
                  {...form.getInputProps("description")}
                />
                <Select
                  label="Visibility"
                  data={["Public", "Private"]}
                  style={{ width: "100%", marginBottom: "20px"}}
                  withAsterisk
                  {...form.getInputProps("visibility")}
                />
              </Grid.Col>
              <Grid.Col span={7}>
                <FileDropZone onFilesDrop={handleFilesDrop}/>
                <Stack justify="space-between">
                  {previews()}
                </Stack>
                <Divider label="OR" labelPosition="center" style={{margin: "10px 0"}}/>
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
            {/* <Group>
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
                  <FileDropZone onFilesDrop={handleFilesDrop} />
                  <Stack justify="space-between">
                    {previews()}
                  </Stack>
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
            </Group> */}

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
