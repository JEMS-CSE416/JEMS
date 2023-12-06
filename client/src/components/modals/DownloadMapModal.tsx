import { Modal, Button, Group } from "@mantine/core";
import "./css/downloadMapModal.css";
import React from "react";
import {
  useLeafLetMapPrinter,
  useLeafletMapContext,
} from "../../context/EditContextProvider";
import { downloadAsJEMS } from "../../utils/jemsExport";
import { Map } from "../../utils/models/Map";

interface DownloadMapModalProps {
  opened: boolean;
  onClose: () => void;
  map: Map
}

const DownloadMapModal: React.FC<DownloadMapModalProps> = ({
  opened,
  onClose,
  map
}) => {
  // const printer = useLeafLetMapPrinter();
  // const map = useLeafletMapContext();

  // const handlePrint = () => {
  //   console.debug("printer:", printer);
  //   console.debug("map:", map);
  //   if (map && printer) {
  //     printer.printMap("Current", "MyMap");
  //   }
  // };

  const handleDownloadAsJEMS = () => {
    downloadAsJEMS(map);
  }
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
            JPEG
          </Button>
          <Button variant="light" id="saveAsButton" onClick={handleDownloadAsJEMS}>
            JSON
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default DownloadMapModal;
