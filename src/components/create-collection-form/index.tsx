import {
  Box,
  TextField,
  Autocomplete,
  Typography,
  Button,
} from "@mui/material";
import React, {
  ChangeEvent,
  ChangeEventHandler,
  useEffect,
  useState,
} from "react";
import { CustomInputLabel } from "../custom-components";
import { CreateCollection as CreateCollectionInterface } from "./interfaces";
import AutoComplete from "./components/auto-complete";
import CustomFields from "./components/custom-fields";
import { useTranslation } from "react-i18next";
import { Custom } from "./interfaces";
import FileUploader from "./components/file-uploader";
import {
  CreateCollection,
  CreateCustomFIeldsByCollectionId,
  editCollectionById,
} from "./services";
import { Categories } from "@/entities/categories";
import { adapterForCustomFields } from "./utils";
import { Collections } from "@/entities/collections";
import MarkDownDescription from "./components/mark-down-description";
import CustomTextArea from "../custom-components/custom-text-area";
import CreateCustomCategory from "./components/add-custom-category";

interface EditableCollection
  extends Omit<Collections, "user" | "updatedAt" | "category" | "categoryId"> {
  categoryId: string | null;
}
interface Props {
  handleRefreshCollections: () => void;
  handleCLoseModal: () => void;
  editableCollectionData?: EditableCollection;
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
  editableCollectionData,
}: Props) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [categorySelected, setCategorySelected] = useState<Categories | null>(
    null
  );
  const [customFields, setCustomFields] = useState<Custom[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isNewCategory, setIsNewCategory] = useState<boolean>(false);
  const { t } = useTranslation();
  const [idCollectionCreated, setIdCollectionCreated] = useState<string | null>(
    null
  );
  const [collectionData, setCreateCollectionData] = useState<
    Omit<CreateCollectionInterface, "category" | "imageId" | "categoryId">
  >({
    description: "",
    name: "",
  });

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

  useEffect(() => {
    if (editableCollectionData) {
      setIsEditable(true);
      setCreateCollectionData((prev) => {
        return {
          ...prev,
          description: editableCollectionData.description,
          name: editableCollectionData.name,
        };
      });
    }
  }, [editableCollectionData]);
  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const name = e.target.name;

    setCreateCollectionData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setCreateCollectionData((prev) => {
      return {
        ...prev,
        ["description"]: event.target.value,
      };
    });
  };

  const handleSelectCategory = (
    event: React.SyntheticEvent,
    value: Categories | null
  ) => {
    if (!value) return;
    setCategorySelected(value);
    if (value.name === "other") setIsNewCategory(true);
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
  const handleEditCollection = () => {
    const data: CreateCollectionInterface = {
      category:
        categorySelected?.id ?? editableCollectionData?.categoryId ?? "",
      description: collectionData.description,
      name: collectionData.name,
      imageId: imgSrc ?? editableCollectionData?.imageId ?? null,
    };
    if (!editableCollectionData) return;
    editCollectionById(data, editableCollectionData?.id)
      .then((res) => {
        handleRefreshCollections();
        handleCLoseModal();
      })
      .catch((err) => console.log(err));
  };

  const newCategoryCreated = (category: Categories) => {
    setCategorySelected(category);
    setIsNewCategory(false);
  };

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
        {isEditable
          ? t("commons:editCollection")
          : t("commons:createCollection")}
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CustomInputLabel htmlFor="collectionName">
          {t("commons:name")}
        </CustomInputLabel>
        <TextField
          onChange={handleName}
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
        <CustomTextArea
          name="description"
          onChange={handleDescription}
          id="collectionName"
          placeholder={t("commons:description")}
          value={collectionData["description"]}
        />
        <MarkDownDescription text={collectionData["description"]} />
      </Box>
      <FileUploader setImgSrc={setImgSrc} />
      {isNewCategory ? (
        <CreateCustomCategory
          handleCancel={() => {
            setIsNewCategory(false);
            setCategorySelected(null);
          }}
          newCategoryCreated={newCategoryCreated}
        />
      ) : (
        <AutoComplete
          categoryId={
            editableCollectionData?.categoryId ?? categorySelected?.id ?? null
          }
          handleSelectCategory={handleSelectCategory}
        />
      )}
      {!isEditable && (
        <CustomFields
          customFields={customFields}
          setCustomFields={setCustomFields}
        />
      )}
      {isEditable ? (
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            onClick={handleEditCollection}
            disabled={
              !(
                collectionData.description.length !== 0 &&
                collectionData.name.length !== 0
              )
            }
            variant="contained"
          >
            {" "}
            {t("commons:saveChanges")}
          </Button>
          <Button
            sx={{ bgcolor: "red" }}
            onClick={() => {
              handleCLoseModal();
            }}
            variant="contained"
          >
            {" "}
            {t("commons:cancel")}
          </Button>
        </Box>
      ) : (
        <Button
          onClick={handleCrateCollection}
          disabled={
            !(
              collectionData.description.length !== 0 &&
              collectionData.name.length !== 0 &&
              !isNewCategory
            )
          }
          variant="contained"
        >
          {" "}
          {t("commons:createCollection")}
        </Button>
      )}
    </Box>
  );
}
