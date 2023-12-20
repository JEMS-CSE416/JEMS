import "./css/mapHeader.css";
import { Link } from "react-router-dom";
import { downloadAsJEMS } from "../../utils/jemsExport";
import DuplicateMapModal from "../modals/DuplicateMapModal";
import DeleteMapModal from "../modals/DeleteMapModal";
import { Text, Group, Avatar, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Map } from "../../utils/models/Map";
import { User } from "../../utils/models/User";
import {
  IconEdit,
  IconDownload,
  IconCopy,
  IconTrash,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { formatDate } from "../../utils/global_utils";

interface MapHeaderProps {
  map: Map;
  mapUser: User;
}
const MapHeader = ({ map, mapUser }: MapHeaderProps) => {
  const { isLoggedIn, user } = useAuth();

  // the duplicate modal state
  const [duplicateModalOpened, setDuplicateModal] = useDisclosure(false);
  // the delete modal state
  const [deleteModalOpened, setDeleteModal] = useDisclosure(false);

  return (
    <>
      {/* Show duplicate modal when needed */}
      <DuplicateMapModal
        opened={duplicateModalOpened}
        onClose={setDuplicateModal.close}
      />

      {/* Show delete modal when needed */}
      {deleteModalOpened && (
        <DeleteMapModal
          opened={deleteModalOpened}
          onClose={setDeleteModal.close}
        ></DeleteMapModal>
      )}

      <Text fw={500} size="sm" id="creationDate">
        {formatDate(map?.creationDate ?? "2023-11-20T02:57:13.344+00:00")}
      </Text>
      <Text fw={700} size="xl" id="title">
        {map.mapName}
      </Text>
      {user && map.creatorId === user._id && (
        <Group id="edit">
          <Link to={`/edit/${map._id}`} style={{ marginLeft: "auto" }}>
            <Button
              leftSection={<IconEdit size={14} />}
              variant="subtle"
              color="gray"
              id="edit-button"
            >
              Edit Map
            </Button>
          </Link>
          <Button
            leftSection={<IconTrash size={14} />}
            variant="subtle"
            color="gray"
            onClick={setDeleteModal.open}
            id="delete-button"
          >
            Delete
          </Button>
        </Group>
      )}

      <Group>
        <Group>
          <Avatar color="blue" radius="xl">
            {mapUser.displayName[0].toUpperCase()}
          </Avatar>
          <div>
            <Text fw={500} size="sm" id="creatorName">
              @{mapUser.displayName}
            </Text>
          </div>
        </Group>
        <Group style={{ marginLeft: "auto" }}>
          <Button
            leftSection={<IconDownload size={14} />}
            variant="subtle"
            color="gray"
            onClick={() => downloadAsJEMS(map)}
            id="download-button"
          >
            Download JEMS Project
          </Button>

          <Button
            leftSection={<IconCopy size={14} />}
            variant="subtle"
            color="gray"
            onClick={setDuplicateModal.open}
            id="duplicate-button"
          >
            Duplicate
          </Button>
        </Group>
      </Group>
    </>
  );
};

export default MapHeader;
