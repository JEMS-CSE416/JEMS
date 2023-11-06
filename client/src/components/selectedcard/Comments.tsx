import { Center, Box, Group, Stack, Text, Avatar } from "@mantine/core";
import { CommentCard } from "./CommentCard";
import "../css/comments.css";
import avatar from "../../assets/images/circle-letter-l.png";

const Comments = () => {
  return (
    <>
      <Text fw={700} size="lg" id="commentsText">
        Comments
      </Text>
      <Group justify="center" id="inputCommentRow">
        <Avatar src={avatar}></Avatar>
        <input
          type="text"
          placeholder="Add a comment..."
          id="inputComment"
        ></input>
      </Group>
      <Center id="comments">
        <Group justify="center" grow>
          <Box style={{ width: "40%" }}>
            <Stack
              h={500}
              align="center"
              justify="space-around"
            >
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </Stack>
          </Box>
          <Box style={{ width: "40%" }}>
            <Stack
              h={500}
              align="center"
              justify="space-around"
            >
              <CommentCard />
              <CommentCard />
              <CommentCard />
            </Stack>
          </Box>
        </Group>
      </Center>
    </>
  );
};

export default Comments;