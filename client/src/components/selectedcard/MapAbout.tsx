import "./css/mapAbout.css";
import { Text } from "@mantine/core";

const MapAbout = () => {
  return (
    <>
      <Text fw={700} size="lg" id="aboutMap">
        About Map
      </Text>
      <Text size="md" id="description">
        Taiwan, often referred to as the 'Heart of Asia,' is a captivating
        island nation depicted on this map. Situated in East Asia, it boasts an
        elongated shape with a length of approximately 394 kilometers (245
        miles) from north to south, and a width ranging from 144 kilometers (89
        miles) in the north to 64 kilometers (40 miles) in the south. Its
        distinctive outline is framed by the shimmering waters of the Taiwan
        Strait to the west and the vast expanse of the Pacific Ocean to the
        east.
      </Text>
    </>
  );
};

export default MapAbout;
