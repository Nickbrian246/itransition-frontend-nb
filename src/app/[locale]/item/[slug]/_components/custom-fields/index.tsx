import EditableCustomField, {
  EditCustomFields,
} from "@/components/editable-custom-field";
import { CreateCustomFieldFromItem } from "@/entities/custom-field";
import { Stack } from "@mui/material";
import React, { SetStateAction } from "react";
interface Props {
  groupOfFields: EditCustomFields[];
  setFieldData: React.Dispatch<SetStateAction<EditCustomFields[]>>;
  fieldsData: EditCustomFields[];
  isEditable: boolean;
}
export default function CustomFields({
  fieldsData,
  groupOfFields,
  isEditable,
  setFieldData,
}: Props) {
  return (
    <Stack spacing={2}>
      <EditableCustomField
        groupOfFields={groupOfFields}
        setFieldData={setFieldData}
        fieldsData={fieldsData}
        isEditable={isEditable}
      />
    </Stack>
  );
}
