import {
  Paper,
  Stack,
  TextInput,
  Title,
  ScrollArea,
  Box,
  NumberInput,
  Group,
  ColorSwatch,
} from "@mantine/core";
import {
  EditPageAction,
  EditPageState,
  useEditContext,
  useEditDispatchContext,
} from "../../context/EditContextProvider";
import { TemplateTypes } from "../../utils/enums";
import { Map, Region, Legend as legend } from "../../utils/models/Map";
import { useEffect, useState } from "react";
import LegendItems from "./LegendItems";

export default function Legend() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();

  useEffect(() => {
    ChoroplethLegend({ editPageState: editPageState });
  }, [editPageState]);

  return (
    <Box>
      {editPageState.map.displayLegend && (
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
            {editPageState.map.colorType === TemplateTypes.CHOROPLETH && (
              <ChoroplethLegend editPageState={editPageState} />
            )}
            {editPageState.map.colorType === TemplateTypes.COLOR && (
              <ColorLegend />
            )}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}

export function ColorLegend() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();

  const initialLegend = editPageState.map.legend.colorLegend;
  // const [legend, setLegend] = useState(initialLegend);

  // TODO: update state every change is computationally intensive
  const handleLabelChange = (color: string, newLabel: string) => {
    // setLegend((prevLegend) => ({ ...prevLegend, [color]: newLabel }));

    setEditPageState({
      type: "update_color_legend",
      map: {
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          colorLegend: {
            ...editPageState.map.legend.colorLegend,
            [color]: newLabel,
          },
        },
      },
    });
  };

  return (
    <>
      <ScrollArea style={{ height: 200, width: 150 }}>
        {editPageState.getUniqueColors().map((color, index) => (
          <Box
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <ColorSwatch color={color} mr={20} />
            <TextInput
              value={editPageState.map.legend.colorLegend[color] ?? ""}
              onChange={(event) =>
                handleLabelChange(color, event.currentTarget.value)
              }
            />
          </Box>
        ))}
      </ScrollArea>
    </>
  );
}

export function ChoroplethLegend({
  editPageState,
}: {
  editPageState: EditPageState;
}) {
  const items = Object.entries(
    editPageState.map.legend.choroplethLegend?.items || {}
  );

  return (
    <div>
      <ScrollArea style={{ maxHeight: 200, overflowY: "auto" }}>
        {items.map(([color, value], index) => (
          <Group>
            <ColorSwatch color={color} mr={20} radius={"5px"} />
            <NumberInput
              variant="unstyled"
              placeholder={value.toString()}
              rightSectionWidth={"0px"}
              hideControls
            />
          </Group>
        ))}
      </ScrollArea>
    </div>
  );
}
