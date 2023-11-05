import { Center, Box, Group, Stack } from '@mantine/core';
import { CommentCard } from './CommentCard';

const Comments = () => {
    return (
        <>
            <Center>
                <Group justify="center" grow>
                    <Box style={{ width: "40%" }}>
                        <Stack 
                            h={500}
                            bg="var(--mantine-color-blue-light)"
                            align="center"
                            justify="space-around">
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                        </Stack>
                    </Box>
                    <Box style={{ width: "40%" }}>
                        <Stack 
                            h={500}
                            bg="var(--mantine-color-blue-light)"
                            align="center"
                            justify="space-around">
                            <CommentCard />
                            <CommentCard />
                            <CommentCard />
                        </Stack>
                    </Box>
                </Group>
            </Center>

        </>
    );
}

export default Comments;