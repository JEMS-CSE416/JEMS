import { Modal, Button, Group } from "@mantine/core";
import "./css/downloadMapModal.css";
import React from "react";
import { useLeafLetMapPrinter, useLeafletMapContext } from "../../context/EditContextProvider";

interface DownloadMapModalProps {
  opened: boolean;
  onClose: () => void;
}

const DownloadMapModal: React.FC<DownloadMapModalProps> = ({
  opened,
  onClose,
}) => {
  const printer = useLeafLetMapPrinter();
  const map = useLeafletMapContext();

  const handlePrint = () => {
    console.debug("printer:", printer);
    console.debug("map:", map);
    if (map && printer) {
      printer.printMap("Current", 'MyMap');
    }
  };

  return (
    <>
      <Modal
        id="download-modal"
        opened={opened}
        onClose={onClose}
        title="Save As"
        centered
      >
        <Group justify="space-between">
          <Button variant="light" id="saveAsButton">
            PNG
          </Button>
          <Button variant="light" id="saveAsButton">
            JSON
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default DownloadMapModal;
