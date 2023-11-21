import { Card, Image, Text, Badge, Group, Button, Menu } from "@mantine/core";
import "./css/mapCard.css";
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { IconDots } from "@tabler/icons-react";
import { Map } from "../../utils/models/Map";
import { useNavigate } from "react-router-dom";

type MapCardProps = {
  name?: string;
  description?: string;
  isPrivate?: boolean;
  id?: string;
  map?: Map;
  duplicateAction?: () => void;
  downloadAs?: (format: "PNG" | "JPEG" | "JEMS") => void;
};

const MapCard: React.FC<MapCardProps> = ({
  name,
  description,
  isPrivate,
  id,
  map,
  duplicateAction,
  downloadAs,
}) => {
  const navigate = useNavigate();

  // splices the createdAt string to show how long ago was it made.
  // for example: 2023-10-16T21:46:26.858+00:00 -> Created 5 minutes ago
  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const formattedDate = formatDistanceToNow(date, { addSuffix: true });
    return `Created ${formattedDate}`;
  }

  return (
    <Card
      id={id}
      shadow="sm"
      padding="xl"
      radius="md"
      withBorder
      className="card"
    >
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
        Luffy • {formatDate(map?.creationDate ?? "")}
      </Text>
      <Text size="10px" ta="left" id="mapDescription" lineClamp={4}>
        {description}
      </Text>
      <Group justify="space-between" mt="md" mb="xs">
        {isPrivate ? (
          <Badge color="blue" variant="light" size="xs" ta="right">
            Private
          </Badge>
        ) : (
          <></>
        )}

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
              <Button variant="subtle" size="compact-xs" onClick={
                (e)=> {
                  e.preventDefault();
                  e.stopPropagation();
                }
                }>
                <IconDots
                  height={20}
                  color="black"
                  style={{ cursor: "pointer" }}
                />
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              {/* <Menu.Label>Application</Menu.Label> */}
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                  downloadAs?.("PNG");
                }}
              >
                Download as PNG
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                  downloadAs?.("JPEG");
                }}
              >
                Download as JPG
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                  downloadAs?.("JEMS");
                }}
              >
                Download as JEMS
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                  duplicateAction?.();
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

export default MapCard;
