import "./css/Properties.css";
import {
  Stack,
  Title,
  Box,
  Divider,
  TextInput,
  Switch,
  ColorInput,
  NumberInput,
  SegmentedControl,
} from "@mantine/core";
import {
  EditPageAction,
  EditPageState,
  useEditContext,
  useEditDispatchContext,
  ColorTypes,
} from "../../context/EditContextProvider";

export default function Properties() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  return (
    <Box
      style={{
        textAlign: "left",
      }}
    >
      <Title order={3}> Map Properties </Title>

      <Stack pl={10} gap="sm" p="sm" className="mapProperties">
        <SegmentedControl
          value={editPageState.map.colorType}
          onChange={(value) => {
            setEditPageState( { type: "update_map", map: {...editPageState.map, colorType: value}} );
          }}
          data={[
            { label: "None", value: `${ColorTypes.NONE}` },
            { label: "Choropleth", value: `${ColorTypes.CHOROPLETH}` },
            { label: "Color", value: `${ColorTypes.COLOR}` },
          ]}
        />

        <Switch defaultChecked labelPosition="left" label="Legend" />

        <Switch defaultChecked labelPosition="left" label="Numeric Label" />

        <Switch defaultChecked labelPosition="left" label="String Label" />
      </Stack>

      <Divider my="md" />
      <Title order={3}> Region Properties </Title>
      <Stack pl={10} gap="xs" p="sm">
        <TextInput label="Group Name" placeholder="Group Name" />

        <TextInput label="Region Name" placeholder="Region Name" />

        <TextInput label="String Label" placeholder="String Label" />

        <TextInput label="Numeric Label" placeholder="Numeric Label" />

        <NumberInput label="Numeric Units" placeholder="Numeric Units" />

        <ColorInput label="Input label" placeholder="#000000" />
      </Stack>
    </Box>
  );
}
