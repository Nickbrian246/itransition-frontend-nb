"use client";
import LatestCollections from "@/components/collections/components/collections/latest-collections";
import { Collections as CollectionInterface } from "@/entities/collections";
import { Autocomplete, Box, Button, Modal, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { getMyCollections } from "../_services";
import Skeleton from "./skeleton";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useTranslation } from "react-i18next";
import CreateCollectionForm from "@/components/create-collection-form";

export default function Collections() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const [collections, setCollections] = useState<CollectionInterface[] | null>(
    null
  );
  useEffect(() => {
    getMyCollections()
      .then((res) => setCollections(res.data))
      .catch((res) => console.log(res))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleRefreshCollections = () => {
    getMyCollections()
      .then((res) => setCollections(res.data))
      .catch((res) => console.log(res))
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Box>
      <Button
        onClick={handleOpenModal}
        sx={{ display: "flex", gap: "10px" }}
        variant="contained"
      >
        <AddCircleOutlineOutlinedIcon sx={{ color: "white" }} />
        {t("commons:add")}
      </Button>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {isLoading || collections === null ? (
          <Skeleton />
        ) : (
          <LatestCollections collections={collections} />
        )}
      </Box>
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
        />
      </Modal>
    </Box>
  );
}
