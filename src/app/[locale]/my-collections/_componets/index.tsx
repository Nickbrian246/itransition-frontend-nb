"use client";
import CreateCollectionForm from "@/components/create-collection-form";
import EmptyContent from "@/components/empty-content";
import { Collections as CollectionInterface } from "@/entities/collections";
import { useAppSelector } from "@/hooks/use-redux/redux";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Box, Button, Modal } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FilterKeys,
  FilterOrder as FilterOrderInterface,
} from "../_interfaces";
import { getCollectionsByUserId, getMyCollections } from "../_services";
import { filterByType } from "../_utils/filter-by";
import MyCollections from "./collections";
import FilterOptionsMenu from "./filter-options-menu";
import FilterOrder from "./filter-order";
import Skeleton from "./skeleton";
import CsvButton from "./csv-btn";
import { useDispatch } from "react-redux";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";

interface Props {
  userId?: string;
}
export default function Collections({ userId }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { t } = useTranslation();
  const [filterKey, setFilterKey] = useState<FilterKeys>("items");
  const [filterOrder, setFilterOrder] = useState<FilterOrderInterface>("ASC");
  const { role } = useAppSelector((state) => state.user.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [collections, setCollections] = useState<CollectionInterface[] | null>(
    null
  );

  useEffect(() => {
    handleRefreshCollections();
  }, []);

  const handleOpenModal = () => {
    setIsOpenModal(true);
  };

  const handleRefreshCollections = () => {
    if (userId) {
      if (role !== "ADMIN") return router.replace("/");
      getCollectionsByUserId(userId)
        .then((res) => setCollections(res.data))
        .catch((err: ErrorResponse<string>) => {
          dispatch(
            setGlobalWarning({
              message: t(`errors:${err.message}`),
              severity: "error",
            })
          );
          if (
            errorsRedirectToHome[
              err.message as keyof typeof errorsRedirectToHome
            ]
          ) {
            router.replace("/");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      getMyCollections()
        .then((res) => setCollections(res.data))
        .catch((err: ErrorResponse<string>) => {
          dispatch(
            setGlobalWarning({
              message: t(`errors:${err.message}`),
              severity: "error",
            })
          );
          if (
            errorsRedirectToHome[
              err.message as keyof typeof errorsRedirectToHome
            ]
          ) {
            router.replace("/");
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleFilter = () => {
    if (!collections) return;
    const data = filterByType(filterKey, filterOrder, collections);
    setCollections(data);
  };

  return (
    <Box sx={{ marginTop: "20px" }}>
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          mb: "30px",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {collections !== null && collections.length !== 0 && (
          <Box sx={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
            <FilterOptionsMenu key={filterKey} setKey={setFilterKey} />
            <FilterOrder
              filterOrder={filterOrder}
              setFilterOrder={setFilterOrder}
            />
            <Button variant="contained" onClick={handleFilter}>
              {t("commons:filter")}
            </Button>
            <CsvButton collection={collections} />
          </Box>
        )}

        <Button
          onClick={handleOpenModal}
          sx={{ display: "flex", gap: "10px" }}
          variant="contained"
        >
          <AddCircleOutlineOutlinedIcon sx={{ color: "white" }} />
          {collections !== null && collections.length !== 0
            ? t("commons:add")
            : t("commons:createNewCollection")}
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
        {collections !== null && collections.length === 0 && (
          <EmptyContent text={t("commons:noCollections")} />
        )}
      </Box>
      <Modal
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
        open={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      >
        <CreateCollectionForm
          userId={userId}
          handleRefreshCollections={handleRefreshCollections}
          handleCLoseModal={() => {
            setIsOpenModal(false);
          }}
        />
      </Modal>
    </Box>
  );
}
