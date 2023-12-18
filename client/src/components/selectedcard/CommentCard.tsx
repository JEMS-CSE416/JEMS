import { Text, Avatar, Group, Spoiler, Stack, Title } from "@mantine/core";
import "./css/commentCard.css";
import { Comment } from "../../utils/models/Comment";
import { formatDate } from "../../utils/global_utils";
import { Box } from "@mantine/core";

type CommentCardProps = {
  comment: Comment;
};

export const CommentCard: React.FC<CommentCardProps> = ({ comment }) => {
  return (
    <Box>
      <Group gap="lg" className="commentsContainer">
        <Avatar color="blue" radius="xl">
          {comment.displayName[0].toUpperCase()}
        </Avatar>
        <Box>
          <Group gap="xs" justify="left" grow preventGrowOverflow={false} wrap="nowrap">
            <Title order={6} c={"blue"}>{comment.displayName}</Title>
            <Text size="sm" c="dimmed">
              {formatDate(comment?.creationDate ?? "2023-11-20T02:57:13.344+00:00")}
            </Text>
          </Group>
          <Spoiler
            maxHeight={43}
            showLabel="Show more >"
            hideLabel="Hide"
            className="commentSpoiler"
            style={{ width: "100%" }}
          >
            <Text size="sm" className="commentText">
              {comment.content}
            </Text>
          </Spoiler>
        </Box>
      </Group>
    </Box>
  );
}
