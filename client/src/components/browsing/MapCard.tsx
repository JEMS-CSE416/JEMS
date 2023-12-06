import { Card, Image, Text, Badge, Group, Button, Menu } from "@mantine/core";
import "./css/mapCard.css";
import React from "react";
import { IconDots } from "@tabler/icons-react";
import { Map } from "../../utils/models/Map";
import { useNavigate } from "react-router-dom";
import { downloadAsJEMS } from "../../utils/jemsExport";
import { formatDate } from "../../utils/global_utils";

type MapCardProps = {
  name?: string;
  description?: string;
  isPrivate?: boolean;
  id: string;
  map: Map;
  duplicateAction?: () => void;
};

const MapCard: React.FC<MapCardProps> = ({
  name,
  description,
  isPrivate,
  id,
  map,
  duplicateAction,
}) => {
  const navigate = useNavigate();

  const handleDownloadAs = (format: "PNG" | "JPEG" | "JEMS") => {
    console.log("Download as:", format);
      if(format === "JEMS"){
        downloadAsJEMS(map!);
      } else {
        // downloadAsImage(format);
      }
  }

  return (
    <Card
      id={id}
      shadow="sm"
      padding="xl"
      radius="md"
      withBorder
      className="card cursor-pointer"
      onClick={(e) => {
        // e.stopde
        navigate(`/map/${id}`, { state: map });
      }}
      style={{height: "300px"}}
    >
      <Card.Section>
        <Image
          src={map && map.thumbnail.imageUrl ? map.thumbnail.imageUrl : "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"}
          height={150}
          alt="Norway"
        />
      </Card.Section>
      <Text fw={700} ta="left" id="mapTitle">
        {name}
      </Text>
      <Text size="9px" ta="left">
        Luffy • {formatDate(map?.creationDate ?? "2023-11-20T02:57:13.344+00:00")}
      </Text>
      <Text size="10px" ta="left" id="mapDescription" lineClamp={3}>
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
                  e.stopPropagation();
                  handleDownloadAs("PNG");
                }}
              >
                Download as PNG
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
                Download as JPG
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDownloadAs("JEMS");
                }}
              >
                Download as JEMS
              </Menu.Item>
              <Menu.Item
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
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
