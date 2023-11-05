import "../css/navBar.css";
import { Button, Group, Avatar, Image } from "@mantine/core";
import jemsLogo from "../../assets/images/logo.svg";
import avatar from "../../assets/images/circle-letter-l.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div id="navBar">
      <Group>
        <Link to="/home">
          <Image src={jemsLogo} id="jemsLogo" />
        </Link>
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
