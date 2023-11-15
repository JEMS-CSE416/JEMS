import "./css/navBar.css";
import {
  Menu,
  Text,
  rem,
  Button,
  Avatar,
  Image,
  Box,
  Grid,
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
import { ReactNode, useState } from "react";

interface NavbarProps{
  modals: ReactNode;
  center_component: ReactNode;
  right_component: ReactNode;
}

/*
 * Modularized Navbar that EditNavbar will cal in order to reuse the styling
 * elements of the original navbar
 */
export function BaseNavbar(props: NavbarProps){

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

  return (
    <div id="navBar">
      {/* show modal if opened */}
      {props.modals}
      {/* This is the actual navbar */}
      <Grid align="center">
        {/* logo */}
        <Grid.Col span="content">
          <Box>
            <Link to="/home">
              <Image src={jemsLogo} id="jemsLogo" />
            </Link>
          </Box>
        </Grid.Col>


        {/* Spacing componenet*/}
        <Grid.Col span={2.5}/>

        {/* search bar  or center_component*/}
        <Grid.Col span="auto">
          <Box style={{ textAlign: "center" }}>
            {props.center_component}
          </Box>
        </Grid.Col>

        {/* create map button  or right_component*/}
        <Grid.Col span={2.5}>
          <Box style={{ textAlign: "left" }}>
            {props.right_component}
          </Box>
        </Grid.Col>

        {/* user profile */}
        <Grid.Col span='content'>
          <Box
            id="user-profile"
            style={{display: "flex", justifyContent: "flex-end", paddingRight: "20px"}}
          >
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
              </Menu.Dropdown>
            </Menu>
          </Box>
        </Grid.Col>
      </Grid>
    </div>
  );
}


/*
 * This is the default Navbar for most pages.
 * It has calls the modularized BaseNavbar and inputs the data required for
 *  a generalized navbar
 */
export default function NavBar(){
  // This is the hook that controls the modal
  // Open is responsible for opening the modal
  // Close is responsible for closing the modal
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <BaseNavbar
      modals= {
        /* This is the modal that will open when the user clicks on the create map*/
        <CreateMapModal opened={opened} onClose={close}></CreateMapModal>
      }
      center_component={<SearchBar/>}
      right_component={<CreateMap open={open}/>}
    />
  )
};

function SearchBar() {
  // This is the hook that controls the search bar
  const [search, setSearch] = useState("");

  // This is the hook that allows us to navigate to different pages
  const navigate = useNavigate();

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
  return (
    <input
      type="search"
      id="search"
      placeholder="Search"
      onKeyDown={handleKeyPress}
      onChange={(e) => setSearch(e.target.value)}
    />
  )
}

function CreateMap(props: any){
  return (
    <Box
      ta="right"
    >
      <Button radius="xl" id="createMapButton" onClick={props.open}>
        + Create Map
      </Button>
    </Box>
  );
}

