import { CreateCustomFieldFromItem } from "@/entities/custom-field";
import React, { SetStateAction } from "react";
import { fields } from "./utils";

interface Props {
  groupOfFields: EditCustomFields[];
  setFieldData: React.Dispatch<SetStateAction<EditCustomFields[]>>;
  fieldsData: EditCustomFields[];
  isEditable: boolean;
}
type BooleanType = "true" | "false";
export interface EditCustomFields
  extends Omit<CreateCustomFieldFromItem, "collectionId"> {
  value: string | BooleanType;
}

export type SaveFieldsDataStatus = "SAVE" | "EDITING";

export default function EditableCustomField({
  groupOfFields,
  fieldsData,
  isEditable,
  setFieldData,
}: Props) {
  const gatherData = (fieldData: EditCustomFields) => {
    setFieldData((prev) => {
      const data = prev.find((field) => field.id === fieldData.id);
      if (data) {
        return prev.map((field) => {
          if (field.id === fieldData.id) {
            return { ...field, ...fieldData };
          }
          return field;
        });
      }
      return prev.concat(fieldData);
    });
  };
  const handleDeleteItem = (fieldData: EditCustomFields) => {
    setFieldData((prev) => prev.filter((f) => f.id !== fieldData.id));
  };

  return (
    <>
      {groupOfFields.map((field, index) => {
        return (
          <React.Fragment key={index}>
            {fields[field.type](
              field.name,
              field.value,
              field.id,
              gatherData,
              isEditable,
              handleDeleteItem
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
