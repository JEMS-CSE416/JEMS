import React from "react";
import { Modal, Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons-react";

interface DeleteMapModalProps {
  opened: boolean;
  onClose: () => void;
}

const DeleteMapModal: React.FC<DeleteMapModalProps> = ({ opened, onClose }) => {
  const handleConfirm = () => {
    onClose();
    notifications.show({
      icon: <IconCheck />,
      title: 'Your map has been deleted!',
      message: 'Bye bye map :(',
    })
  }

  return (
    <>
      <Modal opened={opened} onClose={onClose} title="Delete Map?" centered size="auto">
        <Group justify="space-between">
          <Button variant="light" onClick={onClose}>
            Delete
          </Button>
          <Button variant="filled" onClick={handleConfirm}>
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default DeleteMapModal;
