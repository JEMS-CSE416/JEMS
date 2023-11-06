import { Text, Avatar, Group, Spoiler } from "@mantine/core";
import "../css/commentCard.css";

export function CommentCard() {
  return (
    <Group gap="xs" style={{ width: "90%" }} id="commentsContainer">
      <Avatar
        src="https://images.unsplash.com/photo-1624298357597-fd92dfbec01d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80"
        alt="Jacob Warnhalter"
        radius="xl"
      />
      <Group gap="xs" justify="center">
        <Text size="sm">Jacob Warnhalter</Text>
        <Text size="sm" c="dimmed">
          10 minutes ago
        </Text>
      </Group>
      <Spoiler
        maxHeight={43}
        showLabel="Show more >"
        hideLabel="Hide"
        id="commentSpoiler"
      >
        <Text pl={53} size="sm" id="commentText">
          This map really highlights Taiwan's diverse geography and strategic
          location in the region! Sike Lmao this sucks. This Pokémon likes to
          lick its palms that are sweetened by being soaked in honey. Teddiursa
          concocts its own honey by blending fruits and pollen collected by
          Beedrill. Blastoise has water spouts that protrude from its shell. The
          water spouts are very accurate.
        </Text>
      </Spoiler>
    </Group>
  );
}
