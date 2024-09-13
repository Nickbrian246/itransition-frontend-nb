"use client";
import { CustomField } from "@/entities/custom-field";
import { Item } from "@/entities/item";
import { Tag } from "@/entities/tags";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { Box, TextField, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ZodError } from "zod";
import { CustomInputLabel } from "../custom-components";
import CustomModal from "../custom-components/custom-modal";
import CustomFields, { EditCustomFields } from "../custom-fields";
import TagsSelector from "../tag-selector";
import ActionsButtons from "./components/actions-btns";
import {
  crateItemsTags,
  createItem,
  getCustomFieldsByCollectionId,
} from "./services";
import { CreateItemSchema } from "./validations/create-item";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    const data = validateItem();
    if (!data) return;
    createItem({
      name: data.name,
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

  const validateItem = () => {
    try {
      const data = CreateItemSchema.parse({
        name: name,
        tagsIds: tagsSelected.map((t) => t.id),
      });
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        const e = error.issues.reduce((acc, issues) => {
          //@ts-ignore
          acc[issues.path[0]] = issues.message;
          return acc;
        }, {});
        return setErrors(e);
      }
      throw error;
    }
  };
  return (
    <CustomModal open={open} handleClose={handleClose}>
      <Box>
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
          {errors["name"] && (
            <Typography sx={{ color: "#ff9800" }} variant="caption">
              {errors["name"]}
            </Typography>
          )}
        </form>
        <Box>
          <TagsSelector
            setTagsSelected={setTagsSelected}
            tagsSelected={tagsSelected}
          />
          {errors["tagsIds"] && (
            <Typography sx={{ color: "#ff9800" }} variant="caption">
              {errors["tagsIds"]}
            </Typography>
          )}
        </Box>
        <ActionsButtons
          handleClose={handleClose}
          handleCreateItem={handleCreateItem}
        />
      </Box>
    </CustomModal>
  );
}
