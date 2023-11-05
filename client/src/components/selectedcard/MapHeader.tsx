import "../css/mapHeader.css";
import { Text, Group, Image } from "@mantine/core";
import pencil from "../../assets/images/pencil.png"

const MapHeader = () => {
  return (
    <>
      <Text fw={700} size="sm" id="creationDate">
        Created 5 days ago
      </Text>
      <Text fw={700} size="lg" id="title">
        Best Places to Eat in The East Blue
      </Text>
      <Group id="edit">
        <Image src={pencil} id="editIcon"></Image>
        <Text size="xs" id="editText">
          Edit Map
        </Text>
      </Group>
    </>
  );
};

export default MapHeader;
