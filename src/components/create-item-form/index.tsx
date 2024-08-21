"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CustomInputLabel } from "../custom-components";
import { createItem, getCustomFieldsByCollectionId } from "./services";
import CustomFields, { EditCustomFields } from "../custom-fields";
import { CustomField } from "@/entities/custom-field";
import TagsSelector from "../tag-selector";
import { Tag } from "@/entities/tags";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";

interface Props {
  collectionId: string;
  open: boolean;
  handleClose: () => void;
  updateData: () => void;
}

const style = {};
export default function CreateItemModalForm({
  collectionId,
  handleClose,
  open,
  updateData,
}: Props) {
  const [name, setName] = useState<string>("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [fieldsData, setFieldData] = useState<EditCustomFields[]>([]);
  const [tagsSelected, setTagsSelected] = useState<Tag[]>([]);
  const { t } = useTranslation();

  useEffect(() => {
    getCustomFieldsByCollectionId(collectionId)
      .then((res) => setCustomFields(res.data))
      .catch((err) => console.log(err));
  }, [collectionId]);

  const handleCreateItem = () => {
    const tags: string[] = [];
    for (let tag of tagsSelected) {
      tags.push(tag.id);
    }
    createItem({
      name: name,
      tagsIds: tags,
      customFields: fieldsData,
      collectionId: collectionId,
    })
      .then((res) => {
        updateData();
        setTagsSelected([]);
        handleClose();
      })
      .catch((err) => console.log(err));
  };
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute" as "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          minWidth: "300px",
          width: {
            xs: "90%",
            md: "1000px",
          },
          maxHeight: "600px",
          overflow: "auto",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" align="center">
          {t("commons:createItem")}
        </Typography>
        <form style={{ width: "100%" }}>
          <CustomInputLabel id="name">{t("commons:name")}</CustomInputLabel>
          <TextField fullWidth id="name" onChange={handleName} />
          <CustomFields
            groupOfFields={customFields}
            fieldsData={fieldsData}
            setFieldData={setFieldData}
          />
        </form>
        <TagsSelector
          setTagsSelected={setTagsSelected}
          tagsSelected={tagsSelected}
        />
        <Button
          sx={{ marginTop: "20px" }}
          variant="contained"
          onClick={handleCreateItem}
        >
          {" "}
          {t("commons:createItem")}
        </Button>
      </Box>
    </Modal>
  );
}
