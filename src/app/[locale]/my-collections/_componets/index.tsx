"use client";
import CreateCollectionForm from "@/components/create-collection-form";
import { Collections as CollectionInterface } from "@/entities/collections";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Button, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getMyCollections } from "../_services";
import FilterOptionsMenu from "./filter-options-menu";
import Skeleton from "./skeleton";

import {
  FilterKeys,
  FilterOrder as FilterOrderInterface,
} from "../_interfaces";
import { filterByType } from "../_utils/filter-by";
import MyCollections from "./collections";
import FilterOrder from "./filter-order";
export default function Collections() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const [collections, setCollections] = useState<CollectionInterface[] | null>(
    null
  );
  const [filterKey, setFilterKey] = useState<FilterKeys>("items");
  const [filterOrder, setFilterOrder] = useState<FilterOrderInterface>("ASC");

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

  const handleFilter = () => {
    if (!collections) return;
    const data = filterByType(filterKey, filterOrder, collections);
    setCollections(data);
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          mb: "30px",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ display: "flex", gap: "20px" }}>
          <FilterOptionsMenu key={filterKey} setKey={setFilterKey} />
          <FilterOrder
            filterOrder={filterOrder}
            setFilterOrder={setFilterOrder}
          />
          <Button variant="contained" onClick={handleFilter}>
            Filtrar
          </Button>
        </Box>
        <Button
          onClick={handleOpenModal}
          sx={{ display: "flex", gap: "10px" }}
          variant="contained"
        >
          <AddCircleOutlineOutlinedIcon sx={{ color: "white" }} />
          {t("commons:add")}
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {isLoading || collections === null ? (
          <Skeleton />
        ) : (
          <MyCollections
            handleRefreshCollections={handleRefreshCollections}
            collections={collections}
          />
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
