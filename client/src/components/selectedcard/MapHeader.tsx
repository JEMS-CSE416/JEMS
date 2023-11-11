import "./css/mapHeader.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import DownloadMapModal from "../modals/DownloadMapModal"
import DuplicateMapModal from "../modals/DuplicateMapModal";
import DeleteMapModal from "../modals/DeleteMapModal";
import { Text, Group, Avatar, Button } from "@mantine/core";
import { IconEdit, IconDownload, IconCopy, IconTrash } from "@tabler/icons-react";

const MapHeader = () => {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [duplicateModalOpen, setDuplicateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <Text fw={500} size="sm" id="creationDate">
        Created 5 days ago
      </Text>
      <Text fw={700} size="xl" id="title">
        Best Places to Eat in The East Blue
      </Text>
      <Group id="edit">
        <Link to="/edit" style={{ marginLeft: "auto" }}>
          <Button
            leftSection={<IconEdit size={14} />}
            variant="subtle" color="gray"
          >
            Edit Map
          </Button>
        </Link>
        <Button
          leftSection={<IconTrash size={14} />}
          variant="subtle" color="gray"
          onClick={() => setDeleteModalOpen(true)}>
          Delete
        </Button>
      </Group>

      <Group>
        <Group>
          <Avatar color="blue" radius="xl">L</Avatar>
          <div>
            <Text fw={500} size="sm" id="creatorName">
              @Luffy
            </Text>
            <Text size="xs" c="dimmed" id="numberMaps">
              10 maps
            </Text>
          </div>
        </Group>
        <Group style={{ marginLeft: "auto" }}>
          <Button
            leftSection={<IconDownload size={14} />}
            variant="subtle" color="gray"
            onClick={() => setDownloadModalOpen(true)}>
            Download
          </Button>

          <Button
            leftSection={<IconCopy size={14} />}
            variant="subtle" color="gray"
            onClick={() => setDuplicateModalOpen(true)}>
            Duplicate
          </Button>
        </Group>
      </Group>
      <DownloadMapModal opened={downloadModalOpen} onClose={() => setDownloadModalOpen(false)}></DownloadMapModal>
      <DuplicateMapModal opened={duplicateModalOpen} onClose={() => setDuplicateModalOpen(false)}></DuplicateMapModal>
      <DeleteMapModal opened={deleteModalOpen} onClose={() => setDeleteModalOpen(false)}></DeleteMapModal>

    </>
  );
};

export default MapHeader;
