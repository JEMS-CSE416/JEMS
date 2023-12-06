import { Modal, Button, Flex } from "@mantine/core";
import * as L from "leaflet";
import "leaflet-easyprint";
import { useContext, useEffect, useRef } from "react";
import {
  useEditContext,
  useEditDispatchContext,
  useLeafletMapContext,
  SetLeafletMapContext,
  useLeafLetMapPrinter,
} from "../../context/EditContextProvider";
import { downloadAsJEMS } from "../../utils/jemsExport";

export function ExportMapModal() {
  // const map = useLeafletMapContext();
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  // const printer = useLeafLetMapPrinter();

  // const handlePrint = () => {
  //   if (map && printer) {
  //     printer.printMap("A4Landscape", 'MyMap');
  //   }
  // };

  const handleDownloadAsJEMS = () => {
    downloadAsJEMS(editPageState.map);
  }

  return (
    <>
      <Modal
        id="export-modal"
        opened={editPageState.modal === "MAP_EXPORT"}
        onClose={() =>
          setEditPageState({ type: "change_modal", modal: "NONE" })
        }
        title="Export Map"
        centered
        size="70%"
      >
        <Flex justify="center" gap="xl" mb="md">
          <ExportMapButton text="Export as Image" onClick={undefined} />
          <ExportMapButton text="Export as Project" onClick={handleDownloadAsJEMS} />
        </Flex>
      </Modal>
    </>
  );
}

function ExportMapButton(props: { text: string; onClick?: () => void }) {
  return (
    <Button size="xl" variant="outline" radius="l" onClick={props.onClick}>
      {props.text}
    </Button>
  );
}
