import "./css/homeScreen.css";
import { Text, Image, Stack, Button } from "@mantine/core";
import nothingHere from "../../assets/images/NothingHere.svg";
import CreateMapModal from "../modals/CreateMapModal";
import { useState } from "react";

const NothingHere = () => {
  const [createMapOpen, setCreateMapOpen] = useState(false);

  return (
    <>
      <Stack align="center" id="nothingHereStack" >
        <Image src={nothingHere} w={300} h={300} />
        <Text size="lg" fw={500} id="nothingHereText">
          Nothing here yet
        </Text>
        <Text size="sm" id="nothingHereText" c="dimmed" w={250}>
        You currently have no maps. Create a marvelous new map now!
        </Text>
        <Button variant="outline" color="gray"
          onClick={() => setCreateMapOpen(true)}>
          Create Map
        </Button>
      </Stack>
      <CreateMapModal opened={createMapOpen} onClose={() => setCreateMapOpen(false)}></CreateMapModal>
    </>
  );
};

export default NothingHere;
