import React, { SetStateAction } from "react";
import CreateCustomCategory from "../add-custom-category";
import AutoComplete from "../auto-complete";
import { Categories as CategoriesInterface } from "@/entities/categories";
import { EditableCollection } from "../../interfaces";
import { Typography } from "@mui/material";
interface Props {
  isNewCategory: boolean;
  setIsNewCategory: React.Dispatch<SetStateAction<boolean>>;
  setCategorySelected: React.Dispatch<
    SetStateAction<CategoriesInterface | null>
  >;
  newCategoryCreated: (categories: CategoriesInterface) => void;
  editableCollectionData?: EditableCollection;
  categorySelected: CategoriesInterface | null;
  handleSelectCategory: (
    event: React.SyntheticEvent,
    value: CategoriesInterface | null
  ) => void;
  errors: Record<string, string>;
}
export default function Categories({
  isNewCategory,
  setCategorySelected,
  setIsNewCategory,
  newCategoryCreated,
  editableCollectionData,
  categorySelected,
  handleSelectCategory,
  errors,
}: Props) {
  return (
    <>
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
      {errors["category"] && (
        <Typography sx={{ color: "#ff9800" }} variant="caption">
          {errors["category"]}
        </Typography>
      )}
    </>
  );
}
