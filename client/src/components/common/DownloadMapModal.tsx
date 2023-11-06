import { useDisclosure } from "@mantine/hooks";
import { Modal, Button, Group } from "@mantine/core";
import "../css/downloadMapModal.css"

interface DownloadMapModalProps {
    opened: boolean;
    onClose: () => void;
  }

const DownloadMapModal: React.FC<DownloadMapModalProps> =({opened, onClose}) => {
  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Save As" centered>
        <Group justify="space-between">
          <Button variant="light" id="saveAsButton">PNG</Button>
          <Button variant="light" id="saveAsButton">JPG</Button>
          <Button variant="light" id="saveAsButton">JSON</Button>
        </Group>
      </Modal>
    </>
  );
}

export default DownloadMapModal;
