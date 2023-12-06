import { NumberInput, Group, ColorSwatch } from "@mantine/core";
import { useEditContext } from "../../context/EditContextProvider";
import { useState } from "react";

interface LegendItemsProps {
    key: number;
    color: string;
    value: Number;
}
const LegendItems: React.FC<LegendItemsProps> = ({key, color, value}) =>{
  const editPageState = useEditContext();
  const [choroplethLegendValue, setChoroplethLegendValue] = useState('');
  return (
    <Group>
      <ColorSwatch
        color={color}
        mr={20}
        radius={"5px"}
      />
      <NumberInput
        variant="unstyled"
        placeholder={value.toString()}
        rightSectionWidth={"0px"}
        hideControls
      />
    </Group>
  );
}

function handleValueChange(event : Event) {
}

export default LegendItems;
