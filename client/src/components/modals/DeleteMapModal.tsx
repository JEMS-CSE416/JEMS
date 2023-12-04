import React from "react";
import { Modal, Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { deleteMap } from "../../api/MapApiAccessor";
import { useSelectedMap } from "../hooks/useSelectedMap";

interface DeleteMapModalProps {
  opened: boolean;
  onClose: () => void;
}

const DeleteMapModal: React.FC<DeleteMapModalProps> = ({ opened, onClose }) => {
  const selectedMap = useSelectedMap();
  const navigate = useNavigate();

  const handleConfirm = async () => {
    const mapId = selectedMap._id.toString();
   
    try {
      await deleteMap(mapId)
      navigate('/home');
      notifications.show({
        icon: <IconCheck />,
        title: 'Your map has been deleted!',
        message: 'Bye bye map :(',
      });
    } catch (err) {
      console.log(err);
      notifications.show({
        icon: <IconX />,
        title: 'Error deleting map',
        message: 'Please try again',
      });
    }
    onClose();
  }

  return (
    <>
      <Modal id="delete-modal" opened={opened} onClose={onClose} title="Delete Map?" centered size="auto">
        <Group justify="space-between">
          <Button variant="light" onClick={onClose} id="delete-modal-cancel-button">
            Cancel
          </Button>
          <Button variant="filled" onClick={handleConfirm} id="delete-modal-confirm-button">
            Confirm
          </Button>
        </Group>
      </Modal>
    </>
  );
}

export default DeleteMapModal;
