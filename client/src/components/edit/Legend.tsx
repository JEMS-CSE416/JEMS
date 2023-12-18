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
  Button,
  Text,
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
import { notifications } from "@mantine/notifications";
import { IconX } from "@tabler/icons-react";
import { valid } from "chroma-js";
import "./css/Legend.css";
import { useLegendContext } from "../../context/LegendContextProvider";
import { use } from "chai";

export default function Legend() {
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  // User input for the choropleth legend
  const [newLegendInput, setNewLegendInput] = useState<Map<number, string>>(
    new Map<number, string>()
  );
  const { legendSubmit, setLegendSubmit } = useLegendContext();
  const { validChoroplethLegend, setvalidChoroplethLegend } =
    useLegendContext();

  useEffect(() => {
    ChoroplethLegend({
      editPageState: editPageState,
      setEditPageState: setEditPageState,
      legendSubmit: legendSubmit,
      setLegendSubmit: setLegendSubmit,
      newLegendInput: newLegendInput,
      setNewLegendInput: setNewLegendInput,
      validChoroplethLegend: validChoroplethLegend,
      setvalidChoroplethLegend: setvalidChoroplethLegend,
    });
    <ChoroplethLegend
      editPageState={editPageState}
      setEditPageState={setEditPageState}
      legendSubmit={legendSubmit}
      setLegendSubmit={setLegendSubmit}
      newLegendInput={newLegendInput}
      setNewLegendInput={setNewLegendInput}
      validChoroplethLegend={validChoroplethLegend}
      setvalidChoroplethLegend={setvalidChoroplethLegend}
    />;
  }, [editPageState, validChoroplethLegend]);

  // When user changes color type, reset legend to default
  useEffect(() => {
    setvalidChoroplethLegend(true);
    setLegendSubmit(false);
  }, [editPageState.map.colorType]);

  let invalidLegendEditing =
    editPageState.map.colorType === TemplateTypes.CHOROPLETH
      ? "invalidChoroplethLegend"
      : "invalidColorLegend";
  let legendEditingClassName =
    editPageState.map.colorType === TemplateTypes.CHOROPLETH
      ? "choroplethLegendEditing"
      : "colorLegendEditing";
  let legendClassName =
    editPageState.map.colorType === TemplateTypes.CHOROPLETH
      ? "choroplethLegend"
      : "colorLegend";
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
          className={
            validChoroplethLegend
              ? legendSubmit
                ? legendEditingClassName
                : legendClassName
              : invalidLegendEditing
          }
        >
          <Title order={3} style={{ textAlign: "left" }}>
            {" "}
            Legend
          </Title>

          <Stack pl={10} gap="xs" p="sm">
            {editPageState.map.colorType === TemplateTypes.CHOROPLETH && (
              <ChoroplethLegend
                editPageState={editPageState}
                setEditPageState={setEditPageState}
                legendSubmit={legendSubmit}
                setLegendSubmit={setLegendSubmit}
                newLegendInput={newLegendInput}
                setNewLegendInput={setNewLegendInput}
                validChoroplethLegend={validChoroplethLegend}
                setvalidChoroplethLegend={setvalidChoroplethLegend}
              />
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
  setEditPageState,
  legendSubmit,
  setLegendSubmit,
  newLegendInput,
  setNewLegendInput,
  validChoroplethLegend,
  setvalidChoroplethLegend,
}: {
  editPageState: EditPageState;
  setEditPageState: React.Dispatch<EditPageAction>;
  legendSubmit: boolean;
  setLegendSubmit: React.Dispatch<React.SetStateAction<boolean>>;
  newLegendInput: Map<number, string>;
  setNewLegendInput: React.Dispatch<React.SetStateAction<Map<number, string>>>;
  validChoroplethLegend: boolean;
  setvalidChoroplethLegend: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const items = Object.entries(
    editPageState.map.legend.choroplethLegend?.items || {}
  );

  return (
    <div>
        {items.map(([color, value], index) => (
          <Group wrap="nowrap">
            <ColorSwatch color={color} mr={20} radius={"5px"} />
            <Text size="md">{">"}=</Text>
            <NumberInput
              variant="unstyled"
              placeholder={value.toString()}
              value={value.toString()}
              hideControls
              withErrorStyles={validChoroplethLegend}
              disabled={index == 0 || index == items.length - 1}
              onChange={(value) => {
                setNewLegendInput(newLegendInput.set(index, value.toString()));
                setLegendSubmit(true);
              }}
              onClick={() => setLegendSubmit(true)}
              className="choroplethLegendNumberInput"
            />
          </Group>
        ))}
        {legendSubmit ? (
          <Button
            type="submit"
            onClick={() =>
              handleLegendItemsSubmit(
                editPageState,
                setEditPageState,
                legendSubmit,
                setLegendSubmit,
                newLegendInput,
                setNewLegendInput,
                validChoroplethLegend,
                setvalidChoroplethLegend
              )
            }
          >
            Submit
          </Button>
        ) : (
          <></>
        )}
    </div>
  );
}

function handleLegendItemsSubmit(
  editPageState: EditPageState,
  setEditPageState: React.Dispatch<EditPageAction>,
  legendSubmit: boolean,
  setLegendSubmit: React.Dispatch<React.SetStateAction<boolean>>,
  newLegendInput: Map<number, string>,
  setNewLegendInput: React.Dispatch<React.SetStateAction<Map<number, string>>>,
  validChoroplethLegend: boolean,
  setvalidChoroplethLegend: React.Dispatch<React.SetStateAction<boolean>>
) {
  //Get choropleth legend items from editPageState
  const items = Object.entries(
    editPageState.map.legend.choroplethLegend?.items || {}
  );

  //Replace each index of legend items state with corresponding value from sortedNewLegend
  let valid = true;
  let prev: Number = 0;
  items.forEach(([color, value], index) => {
    let numberNewLegendInput = Number(newLegendInput.get(index));
    if (
      newLegendInput.get(index) === undefined ||
      newLegendInput.get(index) === ""
    ) {
      // if user did not input a value for this index
      if (index == 0) {
        items[index][1] = value;
        prev = items[index][1];
      } else if (items[index][1] >= prev) {
        valid = false;
      } else if (valid) {
        items[index][1] = value;
        prev = items[index][1];
      }
    } else {
      // if user did input a value for this index
      if (index == 0) {
        prev = numberNewLegendInput;
        items[index][1] = numberNewLegendInput;
      } else if (numberNewLegendInput >= Number(prev)) {
        valid = false;
      } else if (valid) {
        // stop populating items if legend is invalid
        prev = numberNewLegendInput;
        items[index][1] = numberNewLegendInput;
      }
    }
  });

  if (!valid) {
    setvalidChoroplethLegend(false);
    notifications.show({
      icon: <IconX />,
      title: "Updating Legend failed :(",
      message: "Legend values must be in DESCENDING order!",
    });
  } else {
    setvalidChoroplethLegend(true);
    setLegendSubmit(false);
    setNewLegendInput(new Map<number, string>());
    setEditPageState({
      type: "update_choropleth_legend",
      map: {
        ...editPageState.map,
        legend: {
          ...editPageState.map.legend,
          choroplethLegend: {
            ...editPageState.map.legend.choroplethLegend,
            items: Object.fromEntries(items),
          },
        },
      },
    });
  }
}
