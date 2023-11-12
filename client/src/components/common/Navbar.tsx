import "./css/navBar.css";
import {
  Menu,
  Text,
  rem,
  Button,
  Group,
  Avatar,
  Image,
  Box,
} from "@mantine/core";
import jemsLogo from "../../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";
import CreateMapModal from "../modals/CreateMapModal";
import {
  IconLogout,
  IconMap,
  // IconSettings,
  // IconSearch,
  // IconPhoto,
  // IconMessageCircle,
  // IconTrash,
  // IconArrowsLeftRight,
} from "@tabler/icons-react";
import { useState } from "react";

const NavBar = () => {
  // This is the hook that allows us to navigate to different pages
  const navigate = useNavigate();

  // This is the hook that controls the search bar
  const [search, setSearch] = useState("");

  // User that we get from the backend.
  // For now we'll pretend we have it hardcoded here
  const user = {
    name: "Michelle Man",
    avatar: "https://avatars.githubusercontent.com/u/132554",
  };

  // This is the function that will be called when the user clicks on the logout button
  const handelLogOut = () => {
    console.log("logging out");
  };

  // This is the function that will be called when the user presses enter on the search bar
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      console.log("searching for: " + search);

      if (search === "") return;

      // This is how we navigate to /maps/search with each query.
      // the reason for {state: forceRefresh: true} is because we want
      // to force a refresh of the page incase the user just wants to recieve
      // new updagtes on the results
      navigate("/maps/search/" + search, { state: { forceRefresh: true } });
    }
  };

  // This is the hook that controls the modal
  // Open is responsible for opening the modal
  // Close is responsible for closing the modal
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <div id="navBar">
      {/* show modal if opened */}
      {opened && (
        /* This is the modal that will open when the user clicks on the create map*/
        <CreateMapModal opened={opened} onClose={close}></CreateMapModal>
      )}

      {/* This is the actual navbar */}
      <Group>
        {/* logo */}
        <Link to="/home">
          <Image src={jemsLogo} id="jemsLogo" />
        </Link>

        {/* search bar */}
        <input
          type="search"
          id="search"
          placeholder="Search"
          onKeyDown={handleKeyPress}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* create map button */}
        <Button radius="xl" id="createMapButton" onClick={open}>
          + Create Map
        </Button>

        {/* user profile */}
        <Box id="user-profile">
          <Menu>
            <Menu.Target>
              <Avatar color="blue" radius="xl" className="cursor-pointer">
                {user.name.charAt(0)}
              </Avatar>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>
                <Text size="xl" lh="xl" c="#36454F">
                  Hello, {user.name}
                </Text>
              </Menu.Label>
              <Menu.Divider />
              <Menu.Label>Account Management</Menu.Label>
              <Link to="/myMaps" className="text-no-underline">
                <Menu.Item
                  leftSection={
                    <IconMap style={{ width: rem(14), height: rem(14) }} />
                  }
                >
                  <Text>Your Maps</Text>
                </Menu.Item>
              </Link>
              <Menu.Item
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
                onClick={handelLogOut}
              >
                Logout
              </Menu.Item>

              {/* <Menu.Item
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
              </Menu.Item> */}

              {/* <Menu.Divider />

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
              </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </Box>
      </Group>
    </div>
  );
};

export default NavBar;
