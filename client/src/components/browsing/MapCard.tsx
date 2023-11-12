import { Card, Image, Text, Badge, Group, Button, Menu } from "@mantine/core";
import "./css/mapCard.css";
import ellipses from "../../assets/images/ellipses.png";
import React, { ReactNode } from "react";

type MapCardProps = {
  name?: string;
  isPrivate: boolean;
};

const MapCard: React.FC<MapCardProps> = ({ name, isPrivate }) => {
  return (
    <Card shadow="sm" padding="xl" radius="md" withBorder id="card">
      <Card.Section>
        <Image
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          height={150}
          alt="Norway"
        />
      </Card.Section>
      <Text fw={700} ta="left" id="mapTitle">
        {name}
      </Text>
      <Text size="9px" ta="left">
        Luffy • Created 5 minutes ago
      </Text>
      <Text size="10px" ta="left" id="mapDescription">
        Nom nom nom good food yum this is a great description nom nom nomdfad
        ....
      </Text>
      <Group justify="space-between" mt="md" mb="xs">
        {isPrivate ? (
          <Badge color="blue" variant="light" size="xs" ta="right">
            Private
          </Badge>
        ) : (
          <></>
        )}
        {/* <Image src={ellipses} height={20} id="ellipses"></Image> */}

        <div id="ellipses">
          <Menu
            shadow="md"
            width={200}
            trigger="hover"
            openDelay={100}
            closeDelay={400}
            position="right-start"
            offset={4}
          >
            <Menu.Target>
              <Button
                variant="subtle"
                size="compact-xs"
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <Image src={ellipses} height={20}></Image>
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Label>Application</Menu.Label> */}
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Download as PNG
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Download as JPG
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Download as JSON
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                Duplicate
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </div>
      </Group>
    </Card>
  );
};
function randomTest() {
  console.log("lool");
}
export default MapCard;
