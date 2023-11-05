import { useDisclosure } from '@mantine/hooks';
import { Divider, Modal, Button, Textarea, TextInput, Group, Text, Box, Select, rem, Flex } from '@mantine/core';
import { FileDropZone } from './FileDropZone';

const CreateMapModal = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create Map" centered size="70%" >
                <Box style={{margin:"20px"}}>
                <Flex
                    gap="xl"
                    justify="flex-start"
                    align="flex-start"
                    direction="row"
                    wrap="nowrap"
                >
                    <Box>
                        <Flex
                            gap="sm"
                            justify="flex-start"
                            align="flex-start"
                            direction="column"
                            wrap="nowrap"
                        >
                            <TextInput
                                label="Map Name"
                                description="Enter a name to describe your map"
                                placeholder="Map of Grand Line"
                                style={{ width: "400px" }}
                                data-autofocus withAsterisk />
                            <Textarea
                                label="Map Description"
                                description="Enter a description to describe your map"
                                placeholder="This is a map of the Grand Line"
                                variant="filled"
                                style={{ width: "400px" }}
                                data-autofocus withAsterisk />
                            <Select
                                label="Visibility"
                                placeholder="Public"
                                data={['Public', 'Private']}
                                style={{ width: "400px" }}
                                withAsterisk
                            />
                        </Flex>
                    </Box>
                    <Divider orientation="vertical" />
                    <Box>
                        <Flex
                            gap="sm"
                            justify="flex-start"
                            align="flex-start"
                            direction="column"
                            wrap="nowrap"
                        >
                            <FileDropZone />
                            <Select
                                label="Template"
                                data={[
                                    'String Label Map',
                                    'Color Label Map',
                                    'Numeric Label',
                                    'Choropleth Map',
                                    'Pointer Label'
                                ]}
                                style={{ width: "400px" }}

                            />
                        </Flex>
                    </Box>
                </Flex>
                </Box>
            </Modal>
            <Button onClick={open}>Open centered Modal</Button>
        </>
    );
}

export default CreateMapModal;