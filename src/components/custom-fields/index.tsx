import {
  CreateCustomFieldFromItem,
  CustomField,
  TypeCustomField,
} from "@/entities/custom-field";
import React, { SetStateAction, useState } from "react";
import { fields } from "./utils";

interface Props {
  groupOfFields: CustomField[];
  setFieldData: React.Dispatch<SetStateAction<EditCustomFields[]>>;
  fieldsData: EditCustomFields[];
}
type BooleanType = "true" | "false";
export interface EditCustomFields
  extends Omit<CreateCustomFieldFromItem, "collectionId"> {
  value: string | BooleanType;
}

export type SaveFieldsDataStatus = "SAVE" | "EDITING";

export default function CustomFields({
  groupOfFields,
  fieldsData,
  setFieldData,
}: Props) {
  const [fieldsStatus, setFieldStatus] = useState<SaveFieldsDataStatus>("SAVE");

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

  return (
    <>
      {groupOfFields.map((field, index) => {
        return (
          <React.Fragment key={index}>
            {fields[field.type](field.name, gatherData)}
          </React.Fragment>
        );
      })}
    </>
  );
}
