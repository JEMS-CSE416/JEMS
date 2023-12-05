import { Modal, Button, Flex } from "@mantine/core";
import * as L from "leaflet";
import "leaflet-easyprint";
import { useContext, useEffect, useRef } from "react";
import {
  useEditContext,
  useEditDispatchContext,
  useLeafletMapContext,
  SetLeafletMapContext,
} from "../../context/EditContextProvider";

export function ExportMapModal() {
  const map = useLeafletMapContext();
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();


  const handlePrint = () => {
    if (map) {
      const printer = L.easyPrint({
        sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
        filename: 'MyMap',
        exportOnly: true,
        hideControlContainer: true
      }).addTo(map);
      printer.printMap('CurrentSize', 'MyMap');
    }
  };

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
          <ExportMapButton
            text="Export as Image"
            onClick={handlePrint}
          />
          <ExportMapButton text="Export as Project" />
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
