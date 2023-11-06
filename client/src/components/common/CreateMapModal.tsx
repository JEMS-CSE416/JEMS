import { Divider, Modal, Button, Textarea, TextInput, Box, Select, Group, Stack } from '@mantine/core';
import { FileDropZone } from './FileDropZone';

interface CreateMapModalProps {
    opened: boolean;
    onClose: () => void;
}

const CreateMapModal: React.FC<CreateMapModalProps> = ({ opened, onClose }) => {
    return (
        <>
            <Modal opened={opened} onClose={onClose} title="Create Map" centered size="70%" >
                <Box style={{ margin: "20px" }}>
                    <Group>
                        <Box style={{ width: "40%" }}>
                            <Stack justify="flex-start">
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
                    <Button style={{float:"right", margin:"100px 0 30px 0"}}>Create Map</Button>
                </Box>
            </Modal>
        </>
    );
}

export default CreateMapModal;