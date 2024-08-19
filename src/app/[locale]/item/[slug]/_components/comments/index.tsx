import React, {
  ChangeEvent,
  FormEvent,
  FormEventHandler,
  useEffect,
  useState,
} from "react";
import CustomTextArea from "@/components/custom-components/custom-text-area";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/es";
import {
  CreateComment,
  createLike,
  disLike,
  getCommentsByItemId,
  getLIkes,
} from "./services";
import { Comments as CommentsInterface } from "@/entities/comments";
import dayjs from "dayjs";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { GetLikes } from "../../_interfaces";
interface Props {
  itemId: string;
}
dayjs.extend(relativeTime);
dayjs.locale("es");
export default function Comments({ itemId }: Props) {
  const [comments, setComments] = useState<CommentsInterface[]>([]);
  const [likes, setLikes] = useState<GetLikes | null>(null);

  const [text, setText] = useState<string>("");
  useEffect(() => {
    getComments();
    getLikes();
  }, []);

  const getComments = () => {
    getCommentsByItemId(itemId)
      .then((res) => setComments(res.data))
      .catch((err) => console.log(err));
  };
  const getLikes = () => {
    getLIkes(itemId)
      .then((res) => setLikes(res.data))
      .catch((err) => console.log(err));
  };

  const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleCreateComment = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CreateComment({ content: text, itemId })
      .then((res) => {
        setText("");
        getComments();
      })
      .catch((err) => console.log(err));
  };

  const handleCreateLike = () => {
    createLike(itemId)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleDislike = () => {
    disLike(itemId)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => console.log(err));
  };
  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>Comments</Typography>
        <Box>
          {likes && likes.didUserLikeIt ? (
            <IconButton onClick={handleDislike}>
              <ThumbUpIcon />
            </IconButton>
          ) : (
            <IconButton onClick={handleCreateLike}>
              <ThumbUpOutlinedIcon />
            </IconButton>
          )}

          <Typography variant="caption">{likes?.counter ?? "0"}</Typography>
        </Box>
      </Box>
      <form
        onSubmit={handleCreateComment}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "10px",
        }}
      >
        <CustomTextArea
          value={text}
          onChange={handleText}
          placeholder="comment here "
        />
        <Button type="submit" disabled={text.length === 0} variant="contained">
          Comentar
        </Button>
      </form>
      <Stack
        sx={{ height: { xs: "300px", md: "500px", overflow: "auto" } }}
        spacing={2}
        divider={<Divider orientation="horizontal" flexItem />}
      >
        {comments.map((c) => (
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: "3px" }}
            key={c.id}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="subtitle2">{c.user.firstName}</Typography>
              <Typography variant="caption">
                {dayjs(c.updatedAt).fromNow()}
              </Typography>
            </Box>
            <Typography variant="body2">{c.content}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
