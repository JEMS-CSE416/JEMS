import "./css/Properties.css";
import {
  Stack,
  Title,
  Text,
  Center,
  Box,
  Divider,
  TextInput,
  Switch,
  ColorInput,
  NumberInput,
  SegmentedControl,
  Paper,
  Button,
  Select,
  Group,
  ScrollArea,
} from "@mantine/core";
import {
  EditPageAction,
  EditPageState,
  useEditContext,
  useEditDispatchContext,
} from "../../context/EditContextProvider";
import { TemplateTypes } from "../../utils/enums";
import { useEffect, useState } from "react";
import { set } from "cypress/types/lodash";

export default function Properties() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();

  const [groupNameState, setGroupNameState] = useState(
    editPageState.selectedRegion?.groupName
  );

  const [regionNameState, setRegionNameState] = useState(
    editPageState.selectedRegion?.region.regionName
  );

  const [stringLabelState, setStringLabelState] = useState(
    editPageState.selectedRegion?.region.stringLabel
  );

  const [numericLabelState, setNumericLabelState] = useState<string | number>(
    editPageState.selectedRegion?.region.numericLabel?.toString() ?? ""
  );

  const [unitsState, setUnitsState] = useState("");

  const [colorState, setColorState] = useState(
    editPageState.selectedRegion?.region.color
  );
  const [ChoroplethColorRange, setChoroplethColorRange] = useState<{
    min: { value: string; color: string };
    max: { value: string; color: string };
  }>({
    min: { value: "", color: "#000000" },
    max: { value: "", color: "#FFFFFF" },
  });

  useEffect(() => {
    setGroupNameState(editPageState.selectedRegion?.groupName);
    setRegionNameState(editPageState.selectedRegion?.region.regionName);
    setStringLabelState(editPageState.selectedRegion?.region.stringLabel);
    setNumericLabelState(
      editPageState.selectedRegion?.region.numericLabel?.toString() ?? ""
    );
    setUnitsState(editPageState.selectedRegion?.region.numericUnit ?? "");
    setColorState(editPageState.selectedRegion?.region.color);
  }, [editPageState.selectedRegion]);

  const handleRegionPropertyEditing = () => {
    setEditPageState({
      type: "update_selected_region_info",
      selectedRegion: {
        ...editPageState.selectedRegion!,
        region: {
          ...editPageState.selectedRegion!.region,
          regionName: regionNameState === "" ? "Untitled" : regionNameState!,
          stringLabel: stringLabelState!,
          numericLabel: numericLabelState.toString(),
          numericUnit: unitsState,
          color:
            colorState === ""
              ? editPageState.selectedRegion!.region.color
              : colorState!,
        },
        groupName:
          groupNameState === ""
            ? editPageState.selectedRegion!.groupName
            : groupNameState!,
      },
    });
  };

  return (
    <ScrollArea>
      <Box
        style={{
          textAlign: "left",
        }}
      >
        <Title order={3}> Map Properties </Title>

        <Stack pl={10} gap="sm" p="sm" className="mapProperties">
          <Select
            label="Map Style"
            placeholder="Select a map type"
            value={editPageState.map.colorType}
            data={[
              TemplateTypes.NONE,
              TemplateTypes.COLOR,
              TemplateTypes.CHOROPLETH,
            ]}
            allowDeselect={false}
            onChange={(value) => {
              if (value !== null) {
                setEditPageState({
                  type: "update_map",
                  map: {
                    ...editPageState.map,
                    colorType: value as TemplateTypes,
                  },
                });
              }
            }}
          />

          <Switch
            checked={editPageState.map.displayLegend}
            onChange={(event) => {
              setEditPageState({
                type: "update_map",
                map: {
                  ...editPageState.map,
                  displayLegend: event.currentTarget.checked,
                },
              });
            }}
            labelPosition="left"
            label="Legend"
          />

          <Switch
            checked={editPageState.map.displayNumerics}
            onChange={(event) => {
              setEditPageState({
                type: "update_map",
                map: {
                  ...editPageState.map,
                  displayNumerics: event.currentTarget.checked,
                },
              });
            }}
            labelPosition="left"
            label="Show Numeric Label"
          />

          <Switch
            checked={editPageState.map.displayStrings}
            onChange={(event) => {
              setEditPageState({
                type: "update_map",
                map: {
                  ...editPageState.map,
                  displayStrings: event.currentTarget.checked,
                },
              });
            }}
            labelPosition="left"
            label="Show Text Label"
          />

          <Switch
            checked={editPageState.map.displayPointers}
            onChange={(event) => {
              setEditPageState({
                type: "update_map",
                map: {
                  ...editPageState.map,
                  displayPointers: event.currentTarget.checked,
                },
              });
            }}
            labelPosition="left"
            label="Allow Text Label Pointing"
          />

          {editPageState.map.colorType === TemplateTypes.CHOROPLETH && (
            <>
              <Group>
                <ColorInput
                  label="Max"
                  placeholder="#000000"
                  value={ChoroplethColorRange.max.color}
                  withPicker={true}
                  format="rgba"
                  onChange={(value: string) => {
                    setChoroplethColorRange((prevState) => ({
                      ...prevState,
                      max: { ...prevState.max, color: value },
                    }));
                  }}
                />
                <NumberInput
                  value={ChoroplethColorRange.max.value}
                  placeholder="Max Value"
                  hideControls
                  w="45%"
                  onChange={(value: string | number) => {
                    setChoroplethColorRange((prevState) => ({
                      ...prevState,
                      max: { ...prevState.max, value: value.toString() },
                    }));
                  }}
                />
              </Group>

              <Group>
                <ColorInput
                  label="Min"
                  placeholder="#000000"
                  value={ChoroplethColorRange.min.color}
                  withPicker={true}
                  onChange={(value: string) => {
                    setChoroplethColorRange((prevState) => ({
                      ...prevState,
                      min: { ...prevState.min, color: value },
                    }));
                  }}
                />
                <NumberInput
                  value={ChoroplethColorRange.min.value}
                  onChange={(value: string | number) => {
                    setChoroplethColorRange((prevState) => ({
                      ...prevState,
                      max: { ...prevState.min, value: value.toString() },
                    }));
                  }}
                  placeholder="Min Value"
                  hideControls
                  w="45%"
                />
              </Group>
            </>
          )}
        </Stack>

        <Divider my="md" />
        <>
          {editPageState.selectedRegion && (
            <>
              <Title order={3}>
                Region: {editPageState.selectedRegion?.region.regionName}
              </Title>
              <Title order={6} c="RGB(181,186,191)">
                Group: {editPageState.selectedRegion?.groupName}
              </Title>
              <Stack pl={10} gap="xs" p="sm">
                <Title order={6}> Region Properties </Title>
                <Center></Center>

                <TextInput
                  label="Group Name"
                  placeholder="Group Name"
                  value={groupNameState}
                  onChange={(event) => {
                    setGroupNameState(event.currentTarget.value);
                  }}
                />

                <TextInput
                  label="Region Name"
                  placeholder="Region Name"
                  value={regionNameState}
                  onChange={(event) => {
                    setRegionNameState(event.currentTarget.value);
                  }}
                />

                <TextInput
                  label="Text Label"
                  placeholder="Text Label"
                  value={stringLabelState}
                  onChange={(event) => {
                    setStringLabelState(event.currentTarget.value);
                  }}
                />

                <NumberInput
                  hideControls
                  label="Numeric Label"
                  placeholder="100, 250, etc."
                  value={numericLabelState}
                  onChange={(value) => {
                    console.log(value);
                    setNumericLabelState(value);
                  }}
                />

                <TextInput
                  label="Units"
                  placeholder="Population, apples, acres, etc."
                  value={unitsState}
                  onChange={(event) => {
                    setUnitsState(event.currentTarget.value);
                  }}
                />

                {editPageState.map.colorType === TemplateTypes.COLOR && (
                  <ColorInput
                    label="Color"
                    placeholder="#000000"
                    value={colorState}
                    onChange={setColorState}
                  />
                )}

                <Button onClick={handleRegionPropertyEditing} radius="xl">
                  Done
                </Button>
              </Stack>
            </>
          )}
        </>
      </Box>
    </ScrollArea>
  );
}
