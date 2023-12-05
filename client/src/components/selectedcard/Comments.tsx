import { Center, Box, Group, Stack, Text, Avatar, TextInput, ActionIcon, Grid, Loader } from "@mantine/core";
import { CommentCard } from "./CommentCard";
import "./css/comments.css";
import { useAuth } from "../hooks/useAuth";
import { IconSend } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { createComment, getComments } from "../../api/CommentsApiAccessor";
import { Map } from "../../utils/models/Map";
import { Comment } from "../../utils/models/Comment";
import { useLoadingData } from "../hooks/useLoadingData";
import NothingHere from "../common/NothingHere";

interface CommentsProps {
  map: Map
}

const Comments = ({ map }: CommentsProps) => {
  const { user } = useAuth();
  const [comment, setComment] = useState('');
  const [commentList, setCommentsList] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const cardSpan = { base: 12, sm: 6, md: 6, lg: 6, xl: 6 };

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const fetchedComments = await getComments({ mapId: map._id });
      setCommentsList(fetchedComments);
    } catch (err) {
      console.error("Error fetching comments:", err);
    }
    setLoading(false);
  };

  const handleNewComment = async () => {
    console.log("new comment")
    if (user) {
      console.log(user, "user")
      const req = {
        commenterId: user._id,
        displayName: user.displayName,
        mapId: map._id,
        content: comment
      }

      try {
        console.log("Creating comment with request:", req);
        const responseData = await createComment(req);
        console.log("Comment created successfully:", responseData);
        fetchComments();
      } catch (err) {
        console.error("Error creating comment:", err);
      }
    }
    setComment(''); // Clear the text input field
  };

  return (
    <>
      <Text fw={700} size="lg" style={{textAlign: 'left', marginTop: "20px"}}>
        Comments
      </Text>
      <Group justify="center" id="inputCommentRow">
        <Avatar color="blue" radius="xl" id="profilePhoto">
          {user && user.displayName[0].toUpperCase()}
        </Avatar>
        <TextInput
          placeholder="Add a comment..."
          id="inputComment"
          variant="unstyled"
          radius="xs"
          style={{ width: "90%" }}
          value={comment}
          onChange={(event) => setComment(event.currentTarget.value)}
          onKeyDown={async (e) => { if (e.key === "Enter") { await handleNewComment() } }}
          rightSection={
            <ActionIcon variant="transparent"
              color="blue" radius="xl" size="xl"
              onClick={async (e) => await handleNewComment()}>
              <IconSend />
            </ActionIcon>}
        ></TextInput>
      </Group >
      <Box id="comments">
        {loading ? ( <Loader color="blue" />
        ) : (
          <Stack style={{ textAlign: "left" }}>
            {commentList?.map((comment) => {
              return (
                  <CommentCard comment={comment} />
              );
            })}
          </Stack>
        )}
      </Box>
    </>
  );
};

export default Comments;
