import { 
  ActionIcon,
  Flex,
  Stack,
  Title,
  Text,
  Button
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { group } from "console";
import React from "react";
import { EditPageAction, EditPageState, useEditContext, useEditDispatchContext } from "../../context/EditContextProvider";


export default function Regions(){
  const editPageState = useEditContext();
  const setEditPageState = useEditDispatchContext();
  return (
    <>
      <Flex
        align="center"
        gap="xl"
        mb={20}
        style={{justifyContent: 'space-between' }}
      >
        <Title order={3}> Regions </Title>
      
        <ActionIcon radius="xl">
          <IconPlus size={15}/>
        </ActionIcon>
      </Flex>

      <Stack align="flex-start"  gap={10}>
        {
          Object.entries(editPageState.map.regions).map(
            ([groupName, regions]) => {
              return (
                <>
                  <Title order={5} >{groupName}</Title>
                  <Stack gap={0} w="100%">
                    {regions.map((region, i) => 

                        <RegionButton
                            groupName={groupName}
                            i={i}
                            editPageState={editPageState}
                            setEditPageState={setEditPageState}
                            />
                    )}
                  </Stack>
                </>
              )
            }
          ) 
        }
      </Stack>

    </>
  )
  
}


function RegionButton ( props:{
    groupName: string,
    i: number,
    editPageState: EditPageState,
    setEditPageState: React.Dispatch<EditPageAction>
}){
    const groupName = props.groupName
    const i = props.i
    const editPageState = props.editPageState
    const setEditPageState = props.setEditPageState

 

    let variant = "subtle"
    if(groupName === editPageState.selectedRegion?.groupName &&
        i === editPageState.selectedRegion.i)
        variant = "filled"





   return <Button
        variant={variant}
        color="black"
        fullWidth
        pl={15}
        justify="left"
        onClick= {() => setEditPageState({
            type: "select_region",
            selectedRegion:{
                groupName: groupName,
                i: i,
                region: editPageState.map.regions[groupName][i],
            }
        })}
        
    > 
        <Text>
            {editPageState.map.regions[groupName][i].regionName}
        </Text>
    </Button>
}



