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
import { useState } from "react";

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

export function ChoroplethLegend() {
  const gradientId = "gradient";
  const maxColor = "blue";
  const minColor = "green";

  return (
    <Paper>
      <Group justify="center">
        <span>Max:</span>
        <NumberInput
          hideControls
          style={{ width: "20%" }}
          size="sm"
          variant="unstyled"
          placeholder="1000"
        />
      </Group>
      <svg width="50" height="100%">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: maxColor }} />
            <stop offset="100%" style={{ stopColor: minColor }} />
          </linearGradient>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill={`url(#${gradientId})`}
        />
      </svg>
      <Group justify="center">
        <span>Min:</span>
        <NumberInput
          hideControls
          style={{ width: "20%" }}
          size="sm"
          variant="unstyled"
          placeholder="0"
        />
      </Group>
    </Paper>
  );
}

export default function Legend() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();

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
              <ChoroplethLegend />
            )}
            {editPageState.map.colorType === TemplateTypes.COLOR && (
            <>
              <ColorLegend />
              </>
            )}
          </Stack>
        </Paper>
      )}
    </Box>
  );
}
