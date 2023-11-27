import {
  ColorSwatch,
  Paper,
  Space,
  Stack,
  TextInput,
  Title,
} from "@mantine/core";
import {
  EditPageAction,
  EditPageState,
  useEditContext,
  useEditDispatchContext,
  ColorTypes,
} from "../../context/EditContextProvider";

export default function Legend() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  return (
    <>
      {
        editPageState.map.displayLegend &&
        <Paper
          shadow="xl"
          withBorder
          p="lg"
          pos="absolute"
          right={15}
          bottom={15}
          style={{ zIndex: 1000000 }}
          radius="l"
        >
          <Title order={3} style={{ textAlign: "left" }}>
            {" "}
            Legend
          </Title>

          <Stack pl={10} gap="xs" p="sm">
            <TextInput
              size="md"
              placeholder="Label"
              leftSection={
                <>
                  <ColorSwatch radius="md" color="#009790" />
                  <Space w="md" />
                </>
              }
              variant="unstyled"
            />
            <TextInput
              size="md"
              placeholder="Label"
              leftSection={
                <>
                  <ColorSwatch radius="md" color="#ab92bc" />
                  <Space w="md" />
                </>
              }
              variant="unstyled"
            />

            <TextInput
              size="md"
              placeholder="Label"
              leftSection={
                <>
                  <ColorSwatch radius="md" color="#bcab92" />
                  <Space w="md" />
                </>
              }
              variant="unstyled"
            />
          </Stack>
        </Paper>
      }
    </>
  );
}
