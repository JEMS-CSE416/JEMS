import "../css/mapHeader.css"
import { Text } from "@mantine/core";

const MapHeader = () => {
  return (
    <>
        <Text fw={700} size="sm" id="creationDate">Created 5 days ago</Text>
        <Text fw={700} size="lg" id="title">Best Places to Eat in The East Blue</Text>
    </>
  );
};

export default MapHeader;
