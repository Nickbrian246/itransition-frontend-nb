"use client";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CustomInputLabel } from "../custom-components";
import {
  createItem,
  getCustomFieldsByCollectionId,
  crateItemsTags,
} from "./services";
import CustomFields, { EditCustomFields } from "../custom-fields";
import { CustomField } from "@/entities/custom-field";
import TagsSelector from "../tag-selector";
import { Tag } from "@/entities/tags";
import Modal from "@mui/material/Modal";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { Item } from "@/entities/item";

interface Props {
  collectionId: string;
  open: boolean;
  handleClose: () => void;
  updateData: () => void;
  itemOwnerId?: string;
}

const style = {};
export default function CreateItemModalForm({
  collectionId,
  handleClose,
  open,
  updateData,
  itemOwnerId,
}: Props) {
  const [name, setName] = useState<string>("");
  const [customFields, setCustomFields] = useState<CustomField[]>([]);
  const [fieldsData, setFieldData] = useState<EditCustomFields[]>([]);
  const [tagsSelected, setTagsSelected] = useState<Tag[]>([]);
  const [itemCreated, setItemCreated] = useState<Item>();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    getCustomFieldsByCollectionId(collectionId)
      .then((res) => setCustomFields(res.data))
      .catch((err) =>
        dispatch(
          setGlobalWarning({
            message: `${err}`,
            severity: "error",
          })
        )
      );
  }, [collectionId]);

  useEffect(() => {
    if (itemCreated && tagsSelected) {
      crateItemsTags({
        itemId: itemCreated.id,
        tagsIds: tagsSelected.map((t) => t.id),
      })
        .then((res) => {
          updateData();
          setTagsSelected([]);
          handleClose();
          dispatch(
            setGlobalWarning({
              severity: "success",
              message: t("commons:itemCreated"),
            })
          );
        })
        .catch((err) =>
          dispatch(
            setGlobalWarning({
              message: `${err}`,
              severity: "error",
            })
          )
        );
    }
  }, [itemCreated]);

  const handleCreateItem = () => {
    createItem({
      name: name,
      customFields: fieldsData,
      collectionId: collectionId,
      userId: itemOwnerId ?? null,
    })
      .then((res) => {
        setItemCreated(res.data);
      })
      .catch((err) =>
        dispatch(
          setGlobalWarning({
            message: `${err}`,
            severity: "error",
          })
        )
      );
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
