import "../css/mapHeader.css";
import { Text, Group, Image, Avatar } from "@mantine/core";
import pencil from "../../assets/images/pencil.png";
import avatar from "../../assets/images/circle-letter-l.png";
import download from "../../assets/images/download.png";
import duplicate from "../../assets/images/copy.png";

const MapHeader = () => {
  return (
    <>
      <Text fw={500} size="sm" id="creationDate">
        Created 5 days ago
      </Text>
      <Text fw={700} size="xl" id="title">
        Best Places to Eat in The East Blue
      </Text>
      <Group id="edit">
        <Image src={pencil} id="editIcon"></Image>
        <Text size="xs" id="editText">
          Edit Map
        </Text>
      </Group>

      <Group>
        <Group>
          <Avatar src={avatar} alt="Jacob Warnhalter" radius="xl" />
          <div>
            <Text fw={500} size="sm" id="creatorName">
              @Luffy
            </Text>
            <Text size="xs" c="dimmed" id="numberMaps">
              10 maps
            </Text>
          </div>
        </Group>

        <Image src={download} id="downloadIcon"></Image>
        <Text size="xs" id="dowloadText">
          Download
        </Text>

        <Image src={duplicate} id="duplicateIcon"></Image>
        <Text size="xs" id="duplicateIcon">
          Duplicate
        </Text>
      </Group>
    </>
  );
};

export default MapHeader;
