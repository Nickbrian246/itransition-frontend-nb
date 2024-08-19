import { EditCustomFields, SaveFieldsDataStatus } from "..";
import BooleanField from "../components/boolean-field";
import DateField from "../components/date-field";
import IntegerField from "../components/integer-field";
import FieldString from "../components/string-field";

export const fields = {
  STRING: (
    name: string,
    callback: (fieldData: EditCustomFields) => void,
    fieldStatus: SaveFieldsDataStatus
  ) => (
    <FieldString
      isEditable={false}
      name={name}
      gatherData={callback}
      fieldsStatus={fieldStatus}
    />
  ),
  INTEGER: (
    name: string,
    callback: (fieldData: EditCustomFields) => void,
    fieldStatus: SaveFieldsDataStatus
  ) => (
    <IntegerField
      isEditable={false}
      name={name}
      gatherData={callback}
      fieldsStatus={fieldStatus}
    />
  ),
  BOOLEAN: (
    name: string,
    callback: (fieldData: EditCustomFields) => void,
    fieldStatus: SaveFieldsDataStatus
  ) => (
    <BooleanField
      isEditable={false}
      name={name}
      gatherData={callback}
      fieldsStatus={fieldStatus}
    />
  ),
  DATE: (
    name: string,
    callback: (fieldData: EditCustomFields) => void,
    fieldStatus: SaveFieldsDataStatus
  ) => (
    <DateField
      isEditable={false}
      name={name}
      gatherData={callback}
      fieldsStatus={fieldStatus}
    />
  ),
};
