import { Divider, Modal, Button, Textarea, TextInput, Box, Select, Group, Stack } from '@mantine/core';
import { FileDropZone } from './FileDropZone';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';

interface CreateMapModalProps {
    opened: boolean;
    onClose: () => void;
}

const CreateMapModal: React.FC<CreateMapModalProps> = ({ opened, onClose }) => {
    const form = useForm({
        initialValues: {
            creatorId: '652daf32e2225cdfeceea17f',
            mapName: 'hello',
            description: 'hi',
            creationDate: '2023-11-04T12:00:00Z',
            public: true,
            colorType: 'basic',
            displayStrings: true,
            displayNumerics: true,
            displayLegend: true,
            displayPointers: true,
            thumbnail: {
                "imageUrl": "https://example.com/thumbnail.jpg",
                "imageType": "jpg"
            },
            regions: {
                "dummyGroup": [
                    {
                        "regionName": "dummyName",
                        "coordinate": [
                            [0, 0],
                            [1, 1]
                        ],
                        "stringLabel": "dummyLabel",
                        "stringOffset": [0, 0],
                        "numericLabel": 0,
                        "numericUnit": "dummyUnit",
                        "color": "#eeeeee"
                    }
                ]
            },
            legend: {
                "colorLegend": {
                    "#000000": "black",
                    "#ffffff": "white"
                },
                "choroplethLegend": {
                    "#000000": 0,
                    "#ffffff": 10
                }
            },
            visibility: '',
            template: ''
        },

        validate: {
            mapName: (value) => {
                // You can add your map name validation logic here
                // Return `null` if it's valid, or an error message if it's invalid
                if (value.trim() === '') {
                    return 'Map name is required';
                }
                return null;
            },
            description: (value) => {
                // You can add your description validation logic here
                // Return `null` if it's valid, or an error message if it's invalid
                if (value.trim() === '') {
                    return 'Description is required';
                }
                return null;
            }
        },
    });

    const handleFormSubmit = async () => {
        console.log('Form values:', form.values);
        const req = {
            "map_file_content": {
                "creatorId": form.values.creatorId,
                "mapName": form.values.mapName,
                "description": form.values.description,
                "creationDate": form.values.creationDate,
                "public": form.values.public,
                "colorType": form.values.colorType,
                "displayStrings": form.values.displayStrings,
                "displayNumerics": form.values.displayNumerics,
                "displayLegend": form.values.displayLegend,
                "displayPointers": form.values.displayPointers,
                "thumbnail": form.values.thumbnail,
                "regions": form.values.regions,
                "legend": form.values.legend,
                "visibility": form.values.visibility,
                "template": form.values.template
            }
        };

        try {
            // Replace with your API endpoint
            const apiUrl = 'http://143.198.28.153:3000/api/maps';

            const response = await fetch(apiUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req),
            });

            if (response.ok) {
                const responseData = await response.json();
                console.log('Data updated successfully:', responseData);
            } else {
                console.error('Error updating data:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    return (
        <>
            <Modal opened={opened} onClose={onClose} title="Create Map" centered size="70%" >
                <Box style={{ margin: "20px" }}>
                    <form onSubmit={form.onSubmit((values) => handleFormSubmit())}>
                        <Group>
                            <Box style={{ width: "40%" }}>
                                <Stack justify="flex-start">
                                    <TextInput
                                        label="Map Name"
                                        description="Enter a name to describe your map"
                                        placeholder="Map of Grand Line"
                                        style={{ width: "100%" }}
                                        data-autofocus withAsterisk
                                        {...form.getInputProps('mapName')}
                                    />
                                    <Textarea
                                        label="Map Description"
                                        description="Enter a description to describe your map"
                                        placeholder="This is a map of the Grand Line"
                                        style={{ width: "100%" }}
                                        variant="filled"
                                        data-autofocus withAsterisk
                                        {...form.getInputProps('description')} />
                                    <Select
                                        label="Visibility"
                                        placeholder="Public"
                                        data={['Public', 'Private']}
                                        style={{ width: "100%" }}
                                        withAsterisk
                                        {...form.getInputProps('visibility')}
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
                                        {...form.getInputProps('template')}
                                    />
                                </Stack>
                            </Box>
                        </Group>

                        <Group justify="flex-end" mt="md">
                            <Button type="submit" onClick={onClose}>Submit</Button>
                        </Group>
                    </form>
                </Box>

            </Modal>
        </>
    );
}

export default CreateMapModal;