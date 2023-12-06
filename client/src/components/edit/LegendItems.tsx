import { NumberInput, Group, ColorSwatch } from "@mantine/core";
import { useEditContext } from "../../context/EditContextProvider";

interface LegendItemsProps {
    key: number;
    color: string;
    value: Number;
}
const LegendItems: React.FC<LegendItemsProps> = ({key, color, value}) =>{
  const editPageState = useEditContext();

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
        onChange={(event) => handleValueChange(1)}
        rightSectionWidth={"0px"}
        hideControls
      />
    </Group>
  );
}

function handleValueChange(value: number) {}

export default LegendItems;
