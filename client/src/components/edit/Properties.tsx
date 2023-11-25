import './css/Properties.css'
import { 
  Stack,
  Title,
  Box,
  Divider,
  TextInput,
  Switch,
  ColorInput,
  NumberInput,
} from "@mantine/core";
import { useEditContext } from "../../context/EditContextProvider";


export default function Properties(){
  const editPageState = useEditContext();
  return (
    <Box
      style={{
        textAlign:"left"
      }}
    >
      <Title order={3}> Map Properties </Title>

        <Stack
          pl={10}
          gap="sm"
          p="sm"
          className='mapProperties'
        >
          <Switch
            defaultChecked
            labelPosition="left"
            label="Color Map"
          />

          <Switch
            defaultChecked
            labelPosition="left"
            label="Choropleth Map"
          />

          <Switch
            defaultChecked
            labelPosition="left"
            label="Legend"
          />

          <Switch
            defaultChecked
            labelPosition="left"
            label="Numeric Label"
          />

          <Switch
            defaultChecked
            labelPosition="left"
            label="String Label"
          />

        </Stack>
      
      <Divider my="md"/>
      <Title order={3}> Region Properties </Title>
        <Stack pl={10} gap="xs" p="sm">
          <TextInput
                label="Group Name"
                placeholder="Group Name"
              />

          <TextInput
                label="Region Name"
                placeholder="Region Name"
              />

          <TextInput
                label="String Label"
                placeholder="String Label"
              />

          <TextInput
                label="Numeric Label"
                placeholder="Numeric Label"
              />

          <NumberInput
                label="Numeric Units"
                placeholder="Numeric Units"
              />

          <ColorInput
                label="Input label"
                placeholder="#000000"
              />

        </Stack>
    </Box>
  )
  
}
