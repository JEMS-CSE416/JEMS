import "./css/navBar.css";
import { Menu, Text, rem, Button, Group, Avatar, Image } from "@mantine/core";

import jemsLogo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import CreateMapModal from "../modals/CreateMapModal";
import {
  IconSettings,
  IconSearch,
  IconPhoto,
  IconMessageCircle,
  IconTrash,
  IconArrowsLeftRight,
} from "@tabler/icons-react";

const NavBar = () => {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <div id="navBar">
      <CreateMapModal opened={opened} onClose={close}></CreateMapModal>
      <Group>
        <Link to="/home">
          <Image src={jemsLogo} id="jemsLogo" />
        </Link>
        <input type="search" id="search" placeholder="Search"></input>
        <Button radius="xl" id="createMapButton" onClick={open}>
          + Create Map
        </Button>
        <Menu styles={{
          root:
        }}>
          <Menu.Target>
            <Avatar color="blue" radius="xl" id="profilePhoto">
              M
            </Avatar>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Application</Menu.Label>
            <Menu.Item
              leftSection={
                <IconSettings style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Settings
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconMessageCircle
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Messages
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconPhoto style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Gallery
            </Menu.Item>
            <Menu.Item
              leftSection={
                <IconSearch style={{ width: rem(14), height: rem(14) }} />
              }
              rightSection={
                <Text size="xs" c="dimmed">
                  ⌘K
                </Text>
              }
            >
              Search
            </Menu.Item>

            <Menu.Divider />

            <Menu.Label>Danger zone</Menu.Label>
            <Menu.Item
              leftSection={
                <IconArrowsLeftRight
                  style={{ width: rem(14), height: rem(14) }}
                />
              }
            >
              Transfer my data
            </Menu.Item>
            <Menu.Item
              color="red"
              leftSection={
                <IconTrash style={{ width: rem(14), height: rem(14) }} />
              }
            >
              Delete my account
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
        {/* <Avatar color="blue" radius="xl" id="profilePhoto">
          L
        </Avatar> */}
      </Group>
    </div>
  );
};

export default NavBar;
