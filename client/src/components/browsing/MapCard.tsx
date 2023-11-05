import { Card, Image, Text, Badge, Group } from "@mantine/core";
import "../css/mapCard.css";
import ellipses from "../../assets/images/ellipses.png";

type MapCardProps = {
  private: boolean;
};

function MapCard(props: MapCardProps) {
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder id="card">
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={140}
          alt="Norway"
        />
      </Card.Section>
      <Text fw={700} ta="left" id="mapTitle">
        Best Places to Eat in the East Sea
      </Text>
      <Text size="9px" ta="left">
        Luffy • Created 5 minutes ago
      </Text>
      <Text size="10px" ta="left" id="mapDescription">
        Nom nom nom good food yum this is a great description nom nom nomdfad
        ....
      </Text>
      <Group justify="space-between" mt="md" mb="xs">
        {props.private ? (
          <Badge color="blue" variant="light" size="xs" ta="right">
            Private
          </Badge>
        ) : (
          <></>
        )}

        <Image src={ellipses} height={20} id="ellipses"></Image>
      </Group>
    </Card>
  );
}

export default MapCard;
