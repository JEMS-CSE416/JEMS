import { Modal, Button, Group } from "@mantine/core";
import React from "react";

interface DeleteMapModalProps {
    opened: boolean;
    onClose: () => void;
  }

const DeleteMapModal: React.FC<DeleteMapModalProps> =({opened, onClose}) => {
  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Delete Map?" centered size="auto">
        <Group justify="space-between">
          <Button variant="light">Delete</Button>
          <Button variant="filled">Confirm</Button>
        </Group>
      </Modal>
    </>
  );
}

export default DeleteMapModal;
