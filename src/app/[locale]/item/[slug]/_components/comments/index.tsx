"use client";
import CustomTextArea from "@/components/custom-components/custom-text-area";
import { Comments as CommentsInterface } from "@/entities/comments";
import { useAppSelector } from "@/hooks/use-redux/redux";
import { timeFromNow } from "@/utils/date/date-distance";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import {
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import "dayjs/locale/es";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { GetLikes } from "../../_interfaces";
import { socket } from "@/lib/socket/socket";
import {
  CreateComment,
  createLike,
  disLike,
  getCommentsByItemId,
  getLIkes,
} from "./services";
interface Props {
  itemId: string;
}

export default function Comments({ itemId }: Props) {
  const [comments, setComments] = useState<CommentsInterface[]>([]);
  const [likes, setLikes] = useState<GetLikes | null>(null);
  const { locale } = useAppSelector((state) => state.locale);
  const { t } = useTranslation();
  const [text, setText] = useState<string>("");

  useEffect(() => {
    getComments();
    getLikes();
  }, [itemId]);

  useEffect(() => {
    socket.connect();
    socket.emit("commentsRoom", { itemId });

    socket.on("newComment", () => {
      getComments();
    });

    return () => {
      socket.off("newComment");
      socket.disconnect();
    };
  }, [itemId]);

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
        <Typography>{t("commons:comments")}</Typography>
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
          placeholder={t("commons:commentHere")}
        />
        <Button type="submit" disabled={text.length === 0} variant="contained">
          {t("commons:comment")}
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
                {timeFromNow(new Date(c.updatedAt), locale)}
              </Typography>
            </Box>
            <Typography variant="body2">{c.content}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
