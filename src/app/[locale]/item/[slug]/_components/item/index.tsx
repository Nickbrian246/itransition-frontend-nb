"use client";
import { Box, Button, Card, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TagCard from "@/components/tag-card";
import { EditCustomFields } from "@/components/custom-fields";
import { ItemWithEditableCustomFields } from "../../_interfaces";
import EditableCustomField from "@/components/editable-custom-field";
import Comments from "../comments";
import UserOptions from "@/components/user-options";
import { useAppSelector } from "@/hooks/use-redux/redux";
import { getItemById, updateItemById } from "../../_services";
import CustomFields from "../custom-fields";
import Tags from "../tags";
import { Tag } from "@/entities/tags";

interface Props {
  slug: string;
}
export default function Item({ slug }: Props) {
  const [item, setItem] = useState<ItemWithEditableCustomFields | null>(null);
  const [fieldsEdited, setFieldsEdit] = useState<EditCustomFields[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const [isUserOwner, setIsUserOwner] = useState<boolean>(false);
  const [groupOfTags, setGroupTags] = useState<Tag[]>([]);
  const { email } = useAppSelector((state) => state.user.user);

  useEffect(() => {
    updateItem();
  }, [slug]);

  useEffect(() => {
    if (email === item?.author.email) {
      setIsUserOwner(true);
    } else {
      setIsUserOwner(false);
    }
  }, [item?.author.email, email]);

  const updateItem = () => {
    getItemById(slug)
      .then((res) => {
        setItem(res.data);
        setGroupTags(res.data.tag);
        setFieldsEdit(res.data.customFields);
      })
      .catch((err) => console.log(err));
  };

  const handleSaveEdit = () => {
    if (!item) return;
    const tagsIds = [];
    for (let tag of groupOfTags) {
      tagsIds.push(tag.id);
    }
    updateItemById(
      { name: item.name, customFields: fieldsEdited, tagsIds: tagsIds },
      item.id
    )
      .then((res) => {
        updateItem();
        setIsEditable(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Card
      sx={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          right: "0",
        }}
      >
        {isUserOwner && (
          <UserOptions
            handleDelete={() => {}}
            handleIsEditable={() => {
              setIsEditable(true);
            }}
          />
        )}
      </Box>
      <Typography align="center" variant="h5">
        {item?.name}
      </Typography>
      {item?.tag && (
        <Tags
          isEditable={isEditable}
          tags={item.tag}
          setTagsSelected={setGroupTags}
          tagsSelected={groupOfTags}
        />
      )}
      {fieldsEdited && (
        <CustomFields
          fieldsData={fieldsEdited}
          setFieldData={setFieldsEdit}
          isEditable={isEditable}
          groupOfFields={fieldsEdited}
        />
      )}
      {isEditable && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            sx={{ bgcolor: "red" }}
            onClick={() => {
              setIsEditable(false);
              updateItem();
            }}
            variant="contained"
          >
            cancelar
          </Button>
          <Button
            sx={{ bgcolor: "green" }}
            onClick={handleSaveEdit}
            variant="contained"
          >
            Guardar
          </Button>
        </Box>
      )}
      {item?.id && <Comments itemId={item.id} />}
    </Card>
  );
}
