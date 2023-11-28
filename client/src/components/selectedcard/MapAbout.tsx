import "./css/mapAbout.css";
import { Text } from "@mantine/core";
import { useSelectedMap } from "../selectedcard/SelectedCardPage";


const MapAbout = () => {
  const selectedMap = useSelectedMap();

  return (
    <>
      <Text fw={700} size="lg" id="aboutMap">
        About Map
      </Text>
      <Text size="md" id="description">
        {selectedMap.description}
      </Text>
    </>
  );
};

export default MapAbout;
