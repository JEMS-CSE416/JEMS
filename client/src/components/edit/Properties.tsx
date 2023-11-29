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
} from "@mantine/core";
import {
  EditPageAction,
  EditPageState,
  useEditContext,
  useEditDispatchContext,
} from "../../context/EditContextProvider";
import { TemplateTypes } from "../../utils/enums";
import { useEffect, useState } from "react";

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

  const [colorState, setColorState] = useState(
    editPageState.selectedRegion?.region.color
  );

  const [ChoroplethColorRange, setChoroplethColorRange] = useState({
    min: "",
    max: "",
  });

  useEffect(() => {
    setGroupNameState(editPageState.selectedRegion?.groupName);
    setRegionNameState(editPageState.selectedRegion?.region.regionName);
    setStringLabelState(editPageState.selectedRegion?.region.stringLabel);
    setNumericLabelState(
      editPageState.selectedRegion?.region.numericLabel?.toString() ?? ""
    );
    setColorState(editPageState.selectedRegion?.region.color);
    // TODO add ChoroplethColorRange set state
  }, [editPageState.selectedRegion]);

  const handleRegionPropertyEditing = () => {
    console.log(
      "locking in group name from ",
      editPageState.selectedRegion!.groupName,
      "to ",
      groupNameState
    );
    setEditPageState({
      type: "update_selected_region_info",
      selectedRegion: {
        ...editPageState.selectedRegion!,
        region: {
          ...editPageState.selectedRegion!.region,
          regionName: regionNameState === "" ? "Untitled" : regionNameState!,
          stringLabel: stringLabelState!,
          numericLabel: numericLabelState.toString(),
          numericUnit: "WILL NOT USE PLEASE REMOVE THIS FIELD",
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
    <Box
      style={{
        textAlign: "left",
      }}
    >
      <Title order={3}> Map Properties </Title>

      <Stack pl={10} gap="sm" p="sm" className="mapProperties">
        <Select
          label="Map Type:"
          placeholder="Select a map type"
          value={editPageState.map.colorType}
          data={Object.values(TemplateTypes)}
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
          label="Numeric Label"
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
          label="String Label"
        />
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

              {editPageState.map.colorType === TemplateTypes.TEXT_LABEL_MAP && (
                <TextInput
                  label="String Label"
                  placeholder="String Label"
                  value={stringLabelState}
                  onChange={(event) => {
                    setStringLabelState(event.currentTarget.value);
                  }}
                />
              )}

              {editPageState.map.colorType ===
                TemplateTypes.NUMERIC_LABEL_MAP ||
                (editPageState.map.colorType === TemplateTypes.CHOROPLETH && (
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
                ))}

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
  );
}
