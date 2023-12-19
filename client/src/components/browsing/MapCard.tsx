import { Card, Image, Text, Badge, Group, Button, Menu } from "@mantine/core";
import "./css/mapCard.css";
import React from "react";
import { IconDots } from "@tabler/icons-react";
import { Map } from "../../utils/models/Map";
import { useNavigate } from "react-router-dom";
import { downloadAsJEMS } from "../../utils/jemsExport";
import { formatDate } from "../../utils/global_utils";
import { getUser } from "../../api/UserApiAccesor";
import { get } from "cypress/types/lodash";
import { User } from "../../utils/models/User";

type MapCardProps = {
  name?: string;
  creatorId: string;
  description?: string;
  isPrivate?: boolean;
  id: string;
  map: Map;
  duplicateAction?: () => void;
};

const MapCard: React.FC<MapCardProps> = ({
  name,
  creatorId,
  description,
  isPrivate,
  id,
  map,
  duplicateAction,
}) => {
  const [mapCreatorUser, setMapCreatorUser] = React.useState<User>();
  const navigate = useNavigate();

  const handleDownloadAs = (format: "PNG" | "JPEG" | "JEMS") => {
    console.log("Download as:", format);
    if (format === "JEMS") {
      downloadAsJEMS(map!);
    } else {
      // downloadAsImage(format);
    }
  };

  // Fetches the map creator's User Object
  const fetchMapCreator = async () => {
    try {
      const mapCreatorUser = await getUser(creatorId);
      setMapCreatorUser(mapCreatorUser);
    } catch (error) {
      console.error(error);
    }
  };
  fetchMapCreator();

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
      style={{ height: "300px" }}
    >
      <Card.Section>
        <Image
          src={
            map && map.thumbnail.imageUrl
              ? map.thumbnail.imageUrl
              : "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
          }
          height={150}
          alt="Norway"
        />
      </Card.Section>
      {name!.length > 26 ? (
        <Text fw={700} ta="left" id="mapTitle">
          {name?.slice(0, 27) + "..."}
        </Text>
      ) : (
        <Text fw={700} ta="left" id="mapTitle">
          {name}
        </Text>
      )}
      <Text size="9px" ta="left">
        {mapCreatorUser?.displayName} •{" "}
        {formatDate(map?.creationDate ?? "2023-11-20T02:57:13.344+00:00")}
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
              <Button
                variant="subtle"
                size="compact-xs"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              >
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
