"use client";
import { EditCustomFields } from "@/components/custom-fields";
import UserOptions from "@/components/user-options";
import { Tag } from "@/entities/tags";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux/redux";
import { Box, Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { ItemWithEditableCustomFields } from "../../_interfaces";
import {
  deleteItemById,
  getItemById,
  getTagsByItemId,
  updateItemById,
} from "../../_services";
import Comments from "../comments";
import CustomFields from "../custom-fields";
import Tags from "../tags";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";

interface Props {
  slug: string;
}
export default function Item({ slug }: Props) {
  const [item, setItem] = useState<ItemWithEditableCustomFields | null>(null);
  const [fieldsEdited, setFieldsEdit] = useState<EditCustomFields[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isUserOwner, setIsUserOwner] = useState<boolean>(false);
  const [groupOfTags, setGroupTags] = useState<Tag[]>([]);
  const { email, role } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    updateItem();
  }, [slug]);

  useEffect(() => {
    if (email === item?.author.email || role === "ADMIN") {
      setIsUserOwner(true);
    } else {
      setIsUserOwner(false);
    }
  }, [email, item, role]);

  // useEffect(() => {
  //   if (!item) return;
  //   getTagsByItemId(item.id)
  //     .then((res) => console.log(res.data.tag))
  //     .catch((err) => console.log(err));
  // }, [item]);

  const updateItem = () => {
    getItemById(slug)
      .then((res) => {
        setItem(res.data);
        setGroupTags(res.data.tags.map((t) => t.tag));
        setFieldsEdit(res.data.customFields);
      })
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

  const handleSaveEdit = () => {
    if (!item) return;
    const tagsIds = [];
    for (let tag of groupOfTags) {
      tagsIds.push(tag.id);
    }
    updateItemById(
      {
        name: item.name,
        customFields: fieldsEdited,
        tagsIds: tagsIds,
      },
      item.id
    )
      .then((res) => {
        updateItem();
        setIsEditable(false);
      })
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

  const handleDeleteItem = () => {
    deleteItemById(slug)
      .then((res) => {
        router.back();
      })
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
            handleDelete={handleDeleteItem}
            handleIsEditable={() => {
              setIsEditable(true);
            }}
          />
        )}
      </Box>
      <Typography align="center" variant="h5">
        {item?.name}
      </Typography>
      {item?.tags && (
        <Tags
          isEditable={isEditable}
          tags={item.tags.map((t) => t.tag)}
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
            {t("commons:cancel")}
          </Button>
          <Button
            sx={{ bgcolor: "green" }}
            onClick={handleSaveEdit}
            variant="contained"
          >
            {t("commons:save")}
          </Button>
        </Box>
      )}
      {item?.id && <Comments itemId={item.id} />}
    </Card>
  );
}
