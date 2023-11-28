import {
  Modal,
  Button,
  Flex,
} from "@mantine/core";
import { useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";

export function ExportMapModal(){
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  return (
    <>
      <Modal id="export-modal"
        opened={editPageState.modal === "MAP_EXPORT"}
        onClose={() => setEditPageState({type:"change_modal", modal:"NONE"})}
        title="Export Map"
        centered size="70%"
      >
        <Flex
          justify="center"
          gap="xl"
          mb="md"
        >
          <ExportMapButton text="Export as PNG"/>
          <ExportMapButton text="Export as JPEG"/>
          <ExportMapButton text="Export as Project"/>
        </Flex>
      </Modal>
    </>
  );
};

function ExportMapButton(props: {text: string}){
  return (
    <Button size="xl" variant="outline" radius="l">
      {props.text}
    </Button>
  )
}
