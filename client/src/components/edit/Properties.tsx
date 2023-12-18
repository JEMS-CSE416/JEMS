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
import { UndoableChangeMapProp, useUndoRedoContext } from "../../context/UndoRedo";

export default function Properties() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  const addToUndoStack = useUndoRedoContext();
  console.log(editPageState);
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

  const [hueState, setHueState] = useState(editPageState.map.legend.choroplethLegend.hue);

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
    setHueState(editPageState.map.legend.choroplethLegend.hue);
    if (
      editPageState.map.legend.choroplethLegend.min &&
      editPageState.map.legend.choroplethLegend.max
    ) {
      setChoroplethColorRange({
        min: {
          value: editPageState.map.legend.choroplethLegend.min.toString(),
          color: ChoroplethColorRange.min.color,
        },
        max: {
          value: editPageState.map.legend.choroplethLegend.max.toString(),
          color: ChoroplethColorRange.max.color,
        },
      });
    }
  }, [editPageState]);

  const handleRegionPropertyEditing = () => {
    setEditPageState({
      type: "update_selected_region_info",
      map: {
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          choroplethLegend: {
            ...editPageState.map.legend.choroplethLegend,
            hue: hueState,
          },
        },
      },
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

    console.log(editPageState);
  };

  // Function that updates state for Map Properties
  const handleMapPropertyEditing = () => {
    setEditPageState({
      type: "update_choropleth_legend",
      map: {
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          choroplethLegend: {
            ...editPageState.map.legend.choroplethLegend,
            hue: hueState,
          },
        },
      },
    });

    console.log(editPageState);
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
                addToUndoStack(new UndoableChangeMapProp(
                  { colorType: value as TemplateTypes},
                  { colorType: editPageState.map.colorType},
                ));
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
              addToUndoStack(new UndoableChangeMapProp(
                { displayLegend: event.currentTarget.checked},
                { displayLegend: editPageState.map.displayLegend},
              ));
              //setEditPageState({
                //type: "update_map",
                //map: {
                  //...editPageState.map,
                  //displayLegend: event.currentTarget.checked,
                //},
              //});
            }}
            labelPosition="left"
            label="Legend"
          />

          <Switch
            checked={editPageState.map.displayNumerics}
            onChange={(event) => {
              addToUndoStack(new UndoableChangeMapProp(
                { displayNumerics: event.currentTarget.checked},
                { displayNumerics: editPageState.map.displayNumerics},
              ));
              //setEditPageState({
                //type: "update_map",
                //map: {
                  //...editPageState.map,
                  //displayNumerics: event.currentTarget.checked,
                //},
              //});
            }}
            labelPosition="left"
            label="Show Numeric Label"
          />

          <Switch
            checked={editPageState.map.displayStrings}
            onChange={(event) => {
              addToUndoStack(new UndoableChangeMapProp(
                { displayStrings: event.currentTarget.checked},
                { displayStrings: editPageState.map.displayStrings},
              ));
              //setEditPageState({
                //type: "update_map",
                //map: {
                  //...editPageState.map,
                  //displayStrings: event.currentTarget.checked,
                //},
              //});
            }}
            labelPosition="left"
            label="Show Text Label"
          />

          <Switch
            checked={editPageState.map.displayPointers}
            onChange={(event) => {
              addToUndoStack(new UndoableChangeMapProp(
                { displayPointers: event.currentTarget.checked},
                { displayPointers: editPageState.map.displayPointers},
              ));
              //setEditPageState({
                //type: "update_map",
                //map: {
                  //...editPageState.map,
                  //displayPointers: event.currentTarget.checked,
                //},
              //});
            }}
            labelPosition="left"
            label="Allow Text Label Pointing"
          />

          {editPageState.map.colorType === TemplateTypes.CHOROPLETH && (
            <>
              <ColorInput
                label="Hue"
                placeholder="#000000"
                value={hueState}
                onChange={setHueState}
              />
            </>
          )}

          {!editPageState.selectedRegion ? (
            <Button onClick={handleMapPropertyEditing} radius="xl">
              Done
            </Button>
          ) : (
            <></>
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
