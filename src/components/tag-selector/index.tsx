"use client";
import { Tag } from "@/entities/tags";
import { Autocomplete, Box, TextField, Typography } from "@mui/material";
import React, { SetStateAction, useEffect, useState } from "react";
import { getTags } from "../tags-carousel/services";
import AddNewTag from "./component/add-new-tag";
import TagCardEditable from "./component/tag-card";
import { useTranslation } from "react-i18next";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { useRouter } from "next/navigation";

interface Props {
  setTagsSelected: React.Dispatch<SetStateAction<Tag[]>>;
  tagsSelected: Tag[];
}
export default function TagsSelector({ setTagsSelected, tagsSelected }: Props) {
  const [tags, setTags] = useState<Tag[]>([]);
  const [isSetNewTag, setIsSetNewTag] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    updateTags();
  }, []);

  const updateTags = () => {
    getTags()
      .then((res) =>
        setTags(
          res.data
            .map((tag) => {
              return { ...tag, label: tag.name };
            })
            .concat({ label: "Other", name: "other", id: "custom" })
        )
      )
      .catch((err: ErrorResponse<string>) => {
        dispatch(
          setGlobalWarning({
            message: t(`errors:${err.message}`),
            severity: "error",
          })
        );
        if (
          errorsRedirectToHome[err.message as keyof typeof errorsRedirectToHome]
        ) {
          router.replace("/");
        }
      });
  };

  const handleAddTags = (event: React.SyntheticEvent, value: Tag | null) => {
    if (value) {
      if (value.id === "custom") return setIsSetNewTag(true);
      setTagsSelected((prev) => {
        const prevExistence = prev.find((tag) => tag.id === value.id);
        if (prevExistence) return prev;
        return prev.concat(value);
      });
    }
  };

  const handleDeleteTags = (id: string) => {
    setTagsSelected((prev) => prev.filter((tag) => tag.id !== id));
  };

  const handleAddNewTag = (tag: Tag) => {
    setTagsSelected((prev) => prev.concat(tag));
    updateTags();
    setIsSetNewTag(false);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        mt: "10px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        {tagsSelected.length > 0 ? (
          tagsSelected.map((tag) => (
            <TagCardEditable
              id={tag.id}
              title={tag.name}
              handleDelete={handleDeleteTags}
              key={tag.id}
            />
          ))
        ) : (
          <Box sx={{ padding: "0px 10px" }}>
            <Typography>{t("commons:addCategories")}</Typography>{" "}
          </Box>
        )}
      </Box>

      {isSetNewTag ? (
        <AddNewTag AddNewTag={handleAddNewTag} />
      ) : (
        <Autocomplete
          onChange={handleAddTags}
          disablePortal
          id="combo-box-demo"
          options={tags}
          sx={{ width: "100%", maxWidth: "300px" }}
          renderInput={(params) => <TextField {...params} label="Tags" />}
        />
      )}
    </Box>
  );
}
