import "../css/navBar.css";
import { Button, Group, Avatar, Image, Text } from "@mantine/core";
import jemsLogo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/circle-letter-l.png";

const NavBar = () => {
  return (
    <div id="navBar">
      <Group>
        <Image src={jemsLogo} id="jemsLogo" />
        <input type="search" id="search" placeholder="Search"></input>
        <Button radius="xl" id="createMapButton">
          + Create Map
        </Button>
        <Avatar src={avatar} alt={"avatar"} radius="xl" id="profilePhoto" />
      </Group>
    </div>
  );
};

export default NavBar;
