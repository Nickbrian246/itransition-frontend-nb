import {
  Box,
  TextField,
  Autocomplete,
  Typography,
  Button,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import { CustomInputLabel } from "../custom-components";
import { CreateCollection as CreateCollectionInterface } from "./interfaces";
import AutoComplete from "./components/auto-complete";
import CustomFields from "./components/custom-fields";
import { useTranslation } from "react-i18next";
import { Custom } from "./interfaces";
import FileUploader from "./components/file-uploader";
import { CreateCollection, CreateCustomFIeldsByCollectionId } from "./services";
import { Categories } from "@/entities/categories";
import { adapterForCustomFields } from "./utils";

interface Props {
  handleRefreshCollections: () => void;
  handleCLoseModal: () => void;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  padding: "10px",
  width: "100%",
  maxWidth: "900px",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};
export default function CreateCollectionForm({
  handleCLoseModal,
  handleRefreshCollections,
}: Props) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [categorySelected, setCategorySelected] = useState<Categories>();
  const [customFields, setCustomFields] = useState<Custom[]>([]);
  const [idCollectionCreated, setIdCollectionCreated] = useState<string | null>(
    null
  );
  const { t } = useTranslation();
  const [collectionData, setCreateCollectionData] = useState<
    Omit<CreateCollectionInterface, "category">
  >({
    description: "",
    name: "",
  });

  const handleNameAndDescription = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;
    console.log(name);
    console.log(value);

    setCreateCollectionData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSelectCategory = (
    event: React.SyntheticEvent,
    value: Categories | null
  ) => {
    if (value) setCategorySelected(value);
  };
  const handleCrateCollection = () => {
    const data: CreateCollectionInterface = {
      category: categorySelected?.id ?? "",
      description: collectionData.description,
      name: collectionData.name,
      imageId: imgSrc,
    };
    CreateCollection(data)
      .then((res) => {
        setIdCollectionCreated(res.data.id);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (!idCollectionCreated) return;
    const adaptedFields = adapterForCustomFields(
      idCollectionCreated,
      customFields
    );
    CreateCustomFIeldsByCollectionId(adaptedFields)
      .then((res) => {
        handleRefreshCollections();
        handleCLoseModal();
      })
      .catch((err) => console.log(err));
  }, [idCollectionCreated]);
  return (
    <Box
      sx={{
        ...style,
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxHeight: "600px",
        overflow: "auto",
      }}
    >
      <Typography align="center" variant="h6">
        {t("commons:createCollection")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CustomInputLabel htmlFor="collectionName">
          {t("commons:name")}
        </CustomInputLabel>
        <TextField
          onChange={handleNameAndDescription}
          id="collectionName"
          name="name"
          placeholder={t("commons:collectionName")}
          value={collectionData["name"]}
          fullWidth
        />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CustomInputLabel htmlFor="collectionName">
          {t("commons:description")}
        </CustomInputLabel>
        <TextField
          name="description"
          fullWidth
          onChange={handleNameAndDescription}
          id="collectionName"
          placeholder={t("commons:description")}
          value={collectionData["description"]}
        />
      </Box>
      <FileUploader setImgSrc={setImgSrc} />
      <AutoComplete handleSelectCategory={handleSelectCategory} />
      <CustomFields
        customFields={customFields}
        setCustomFields={setCustomFields}
      />
      <Button
        onClick={handleCrateCollection}
        disabled={
          !(
            collectionData.description.length !== 0 &&
            collectionData.name.length !== 0
          )
        }
        variant="contained"
      >
        {" "}
        {t("commons:createCollection")}
      </Button>
    </Box>
  );
}
