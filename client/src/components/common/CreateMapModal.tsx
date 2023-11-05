import { useDisclosure } from '@mantine/hooks';
import { Divider, Modal, Button, Textarea, TextInput, Text, Box, Select, rem, Group, Stack } from '@mantine/core';
import { FileDropZone } from './FileDropZone';

const CreateMapModal = () => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create Map" centered size="70%" >
                <Box style={{ margin: "20px" }}>
                    <Group>
                        <Box style={{ width: "40%" }}>
                            <Stack>
                                <TextInput
                                    label="Map Name"
                                    description="Enter a name to describe your map"
                                    placeholder="Map of Grand Line"
                                    style={{ width: "100%" }}
                                    data-autofocus withAsterisk />
                                <Textarea
                                    label="Map Description"
                                    description="Enter a description to describe your map"
                                    placeholder="This is a map of the Grand Line"
                                    style={{ width: "100%" }}
                                    variant="filled"

                                    data-autofocus withAsterisk />
                                <Select
                                    label="Visibility"
                                    placeholder="Public"
                                    data={['Public', 'Private']}
                                    style={{ width: "100%" }}
                                    withAsterisk
                                />
                            </Stack>
                        </Box>
                        <Divider orientation="vertical" />
                        <Box style={{ width: "55%" }}>
                            <Stack>
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
                                    style={{ width: "90%" }}
                                />
                            </Stack>
                        </Box>
                    </Group>
                </Box>
            </Modal>
            <Button onClick={open}>Open centered Modal</Button>
        </>
    );
}

export default CreateMapModal;