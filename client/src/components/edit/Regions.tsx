import { 
  ActionIcon,
  Flex,
  Stack,
  Title,
  Text,
  Button
} from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useEditContext } from "../../context/EditContextProvider";


export default function Regions(){
  const editPageState = useEditContext();
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
                    {regions.map((region) =>
                      <Button
                        variant="subtle"
                        color="black"
                        fullWidth
                        pl={15}
                        justify="left"
                      > 
                        <Text>
                          {region.regionName}
                        </Text>
                      </Button>
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
