import "./css/mapAbout.css";
import { Text } from "@mantine/core";
import { Map} from "../../utils/models/Map";


interface MapAboutProps {
  map: Map
}
const MapAbout = ({map}: MapAboutProps) => {
  return (
    <>
      <Text fw={700} size="lg" id="aboutMap">
        About Map
      </Text>
      <Text size="md" id="description">
        {map.description}
      </Text>
    </>
  );
};

export default MapAbout;
