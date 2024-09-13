import { Categories as CategoriesInterface } from "@/entities/categories";
import { useAppDispatch } from "@/hooks/use-redux/redux";
import { setGlobalWarning } from "@/store/slices/global-warning/slice";
import { ErrorResponse } from "@/types/api/api-error.interface";
import { errorsRedirectToHome } from "@/utils/errors-actions/errors";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ZodError } from "zod";
import ActionsButtons from "./components/action-btns";
import Categories from "./components/categories";
import CustomFields from "./components/custom-fields";
import Description from "./components/description";
import FileUploader from "./components/file-uploader";
import NameField from "./components/name-field";
import {
  CollectionDataFrom,
  CreateCollection as CreateCollectionInterface,
  Custom,
  EditableCollection,
  UpdateCollection,
} from "./interfaces";
import {
  CreateCollection,
  CreateCustomFIeldsByCollectionId,
  editCollectionById,
} from "./services";
import { adapterForCustomFields } from "./utils";
import { CreateCollectionSchema } from "./validations/create-collection";
import GlobalWarning from "../global-warning";

interface Props {
  handleRefreshCollections: () => void;
  handleCLoseModal: () => void;
  editableCollectionData?: EditableCollection;
  userId?: string;
}

export default function CreateCollectionForm({
  handleCLoseModal,
  handleRefreshCollections,
  editableCollectionData,
  userId,
}: Props) {
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [customFields, setCustomFields] = useState<Custom[]>([]);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [isNewCategory, setIsNewCategory] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [localWarning, setLocalWarning] = useState<{ message: string } | null>(
    null
  );
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [categorySelected, setCategorySelected] =
    useState<CategoriesInterface | null>(null);
  const [idCollectionCreated, setIdCollectionCreated] = useState<string | null>(
    null
  );
  const [collectionData, setCreateCollectionData] =
    useState<CollectionDataFrom>({
      description: "",
      name: "",
    });
  const router = useRouter();

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
        dispatch(
          setGlobalWarning({
            message: t("commons:collectionCreated"),
            severity: "success",
          })
        );
      })
      .catch((err: ErrorResponse<string>) => {
        dispatch(
          setGlobalWarning({
            message: t("commons:collectionCreated"),
            severity: "error",
          })
        );
        if (
          errorsRedirectToHome[err.message as keyof typeof errorsRedirectToHome]
        ) {
          router.replace("/");
        }
      });
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
    value: CategoriesInterface | null
  ) => {
    if (!value) return;
    setCategorySelected(value);
    if (value.name === "other") setIsNewCategory(true);
  };

  const validateMandatoryFields = () => {
    try {
      const data = CreateCollectionSchema.parse({
        category: categorySelected?.id ?? "",
        description: collectionData.description,
        name: collectionData.name,
      });
      return data;
    } catch (error) {
      if (error instanceof ZodError) {
        const e = error.issues.reduce((acc, issue) => {
          //@ts-ignore
          acc[issue.path[0]] = issue.message;
          return acc;
        }, {});
        return setErrors(e);
      }
    }
  };

  const handleCrateCollection = () => {
    const mandatoryFields = validateMandatoryFields();
    if (!mandatoryFields) return;
    const data: CreateCollectionInterface = {
      category: mandatoryFields.category,
      description: mandatoryFields.description,
      name: mandatoryFields.name,
      imageId: imgSrc,
      userId: userId ?? null,
    };
    CreateCollection(data)
      .then((res) => {
        setIdCollectionCreated(res.data.id);
      })
      .catch((err: ErrorResponse<string>) => {
        setLocalWarning({
          message: t(`errors:${err.message}`),
        });
        if (
          errorsRedirectToHome[err.message as keyof typeof errorsRedirectToHome]
        ) {
          router.replace("/");
        }
      });
  };

  const handleEditCollection = () => {
    const mandatoryFields = validateMandatoryFields();
    if (!mandatoryFields) return;

    const data: UpdateCollection = {
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
        dispatch(
          setGlobalWarning({
            message: t("commons:collectionEdited"),
            severity: "success",
          })
        );
      })
      .catch((err: ErrorResponse<string>) => {
        setLocalWarning({
          message: t(`errors:${err.message}`),
        });
        if (
          errorsRedirectToHome[err.message as keyof typeof errorsRedirectToHome]
        ) {
          router.replace("/");
        }
      });
  };

  const newCategoryCreated = (category: CategoriesInterface) => {
    setCategorySelected(category);
    setIsNewCategory(false);
    dispatch(
      setGlobalWarning({
        message: t("commons:newCategoryCreated"),
        severity: "success",
      })
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        maxHeight: "650px",
        overflow: "auto",
        padding: "8px",
        position: "relative",
      }}
    >
      {localWarning && <GlobalWarning message="hola" severity="error" />}
      <Typography align="center" variant="h6">
        {isEditable
          ? t("commons:editCollection")
          : t("commons:createCollection")}
      </Typography>
      <NameField
        collectionData={collectionData}
        errors={errors}
        handleName={handleName}
      />
      <Description
        collectionData={collectionData}
        errors={errors}
        handleDescription={handleDescription}
      />
      <FileUploader setImgSrc={setImgSrc} />
      <Categories
        categorySelected={categorySelected}
        handleSelectCategory={handleSelectCategory}
        isNewCategory={isNewCategory}
        newCategoryCreated={newCategoryCreated}
        setCategorySelected={setCategorySelected}
        setIsNewCategory={setIsNewCategory}
        editableCollectionData={editableCollectionData}
        errors={errors}
      />
      {!isEditable && (
        <CustomFields
          customFields={customFields}
          setCustomFields={setCustomFields}
        />
      )}
      <ActionsButtons
        collectionData={collectionData}
        handleCLoseModal={handleCLoseModal}
        handleCrateCollection={handleCrateCollection}
        handleEditCollection={handleEditCollection}
        isEditable={isEditable}
      />
    </Box>
  );
}
