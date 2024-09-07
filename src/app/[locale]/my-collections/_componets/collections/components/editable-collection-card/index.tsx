"use client";
import { deleteCollectionById } from "@/app/[locale]/my-collections/_services";
import CreateCollectionForm from "@/components/create-collection-form";
import UserOptions from "@/components/user-options";
import { User } from "@/entities/user";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux/redux";
import { timeFromNow } from "@/utils/date/date-distance";
import { Box, Card, Divider, Modal, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactMarkdown from "react-markdown";
import MetaInfo from "../meta-info";
import { CustomField } from "@/entities/custom-field";
import CustomFields from "@/components/custom-fields";
import EditableCustomField from "@/components/editable-custom-field";
import EmptyContent from "@/components/empty-content";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
interface Props {
  title: string;
  description: string;
  itemsCount: number;
  date: string;
  imgId: string | null;
  id: string;
  categoryId?: string;
  author: User;
  editedBy: User;
  isEdited: boolean;
  customFields?: CustomField[];
  handleRefreshCollections: () => void;
}
export default function EditableCollectionCard({
  date,
  description,
  imgId,
  itemsCount,
  title,
  id,
  categoryId,
  handleRefreshCollections,
  author,
  editedBy,
  isEdited,
  customFields,
}: Props) {
  const { locale } = useAppSelector((state) => state.locale);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const [fields, setFields] = useState<CustomField[]>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (customFields) {
      setFields(() => {
        if (customFields.length > 2) return customFields.slice(0, 2);
        return customFields;
      });
    }
  }, []);
  const handleDeleteItem = () => {
    deleteCollectionById(id)
      .then((res) => {
        handleRefreshCollections();
      })
      .catch((err) => {
        dispatch(
          setGlobalWarning({
            message: `${err}`,
            severity: "error",
          })
        );
      });
  };
  return (
    <Card
      sx={{
        position: "relative",
      }}
    >
      <Box sx={{ position: "absolute", right: "0" }}>
        <UserOptions
          handleDelete={handleDeleteItem}
          handleIsEditable={() => {
            setIsOpenModal(true);
          }}
        />
      </Box>
      <Link style={{ textDecoration: "none" }} href={`/collection/${id}`}>
        <Box
          sx={{
            padding: "10px",
            display: "flex",
            gap: "10px",
            flexWrap: {
              xs: "wrap",
              md: "nowrap",
            },
          }}
        >
          {/* {isUserOwner && (
          <UserOptions
            handleDelete={() => {}}
            handleIsEditable={() => {
              setIsEditable(true);
            }}
          />
        )} */}
          {imgId && (
            <Box
              sx={{
                position: "relative",
                width: "300px",
              }}
            >
              <Image
                style={{ borderRadius: "10px" }}
                width={300}
                height={200}
                alt="collection image"
                src={imgId}
              />
            </Box>
          )}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box>
              <Typography variant="subtitle2">{title}</Typography>
              <Typography variant="body2">
                <ReactMarkdown>{description}</ReactMarkdown>
              </Typography>
            </Box>
            <MetaInfo
              author={author.firstName}
              editedBy={editedBy.firstName}
              isEdited={isEdited}
              itemsCount={itemsCount}
              dateFrom={date}
              locale={locale}
            />
          </Box>
        </Box>
      </Link>
      <Divider />
      <Typography variant="subtitle2" align="center">
        {" "}
        {t("commons:fields")}
      </Typography>
      {fields && fields?.length > 0 && (
        <Box sx={{ padding: "10px" }}>
          <EditableCustomField
            //@ts-ignore
            groupOfFields={customFields}
            setFieldData={() => {}}
            isEditable={false}
          />
        </Box>
      )}
      {fields && fields.length === 0 && (
        <EmptyContent text={t("commons:noFields")} />
      )}
      <Modal
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <CreateCollectionForm
          handleRefreshCollections={handleRefreshCollections}
          handleCLoseModal={() => {
            setIsOpenModal(false);
          }}
          editableCollectionData={{
            categoryId: categoryId ?? null,
            description: description,
            id,
            imageId: imgId,
            name: title,
          }}
        />
      </Modal>
    </Card>
  );
}
