"use client";
import { Box, Card, Modal, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import { formatDistanceToNowStrict } from "date-fns";
import { es } from "date-fns/locale";
import Link from "next/link";
import UserOptions from "@/components/user-options";
import CreateCollectionForm from "@/components/create-collection-form";
import { Categories } from "@/entities/categories";
import { deleteCollectionById } from "@/app/[locale]/my-collections/_services";
interface Props {
  title: string;
  description: string;
  itemsCount: number;
  date: string;
  imgId: string | null;
  id: string;
  categoryId?: string;
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
}: Props) {
  const fechaPublicacion = new Date(date);
  const tiempoTranscurrido = formatDistanceToNowStrict(fechaPublicacion, {
    addSuffix: true,
    locale: es,
  });
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleDeleteItem = () => {
    deleteCollectionById(id)
      .then((res) => {
        console.log(res);

        handleRefreshCollections();
      })
      .catch((err) => {
        console.log(err);
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
              <Typography variant="body2">{description}</Typography>
            </Box>
            <Box
              sx={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}
            >
              <Typography variant="caption"> {itemsCount} items</Typography>
              <Typography variant="caption"> {tiempoTranscurrido} </Typography>
            </Box>
          </Box>
        </Box>
      </Link>
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
