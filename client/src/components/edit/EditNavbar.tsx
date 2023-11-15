import {
  Text,
} from "@mantine/core";
import { useEditContext } from "../../context/EditContextProvider";
import { BaseNavbar } from "../common/Navbar";


export default function EditNavBar(){
  const editState = useEditContext();

  return (
    <BaseNavbar
      modals= {
        <div/>
      }
      center_component={
        <MapTitle name={editState.map.mapName}/>
      }
      right_component={ <div/> }
    />
  )
};

function MapTitle(props: {name: string}){
  return(
    <Text fw={700} size="xl" id="homePageHeader" >
      {props.name}
    </Text>
  )
}
