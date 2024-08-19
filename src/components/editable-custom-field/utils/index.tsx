import { EditCustomFields, SaveFieldsDataStatus } from "..";
import BooleanField from "../components/boolean-field";
import DateField from "../components/date-field";
import IntegerField from "../components/integer-field";
import FieldString from "../components/string-field";

export const fields = {
  STRING: (
    name: string,
    value: string,
    id: string,
    callback: (fieldData: EditCustomFields) => void,
    isEditable: boolean,
    handleDeleteItem: (fieldData: EditCustomFields) => void
  ) => (
    <FieldString
      handleDeleteItem={handleDeleteItem}
      value={value}
      isEditable={isEditable}
      id={id}
      name={name}
      gatherData={callback}
    />
  ),
  INTEGER: (
    name: string,
    value: string,
    id: string,
    callback: (fieldData: EditCustomFields) => void,
    isEditable: boolean,
    handleDeleteItem: (fieldData: EditCustomFields) => void
  ) => (
    <IntegerField
      handleDeleteItem={handleDeleteItem}
      value={value}
      id={id}
      isEditable={isEditable}
      name={name}
      gatherData={callback}
    />
  ),
  BOOLEAN: (
    name: string,
    value: string,
    id: string,
    callback: (fieldData: EditCustomFields) => void,
    isEditable: boolean,
    handleDeleteItem: (fieldData: EditCustomFields) => void
  ) => (
    <BooleanField
      handleDeleteItem={handleDeleteItem}
      value={value}
      isEditable={isEditable}
      id={id}
      name={name}
      gatherData={callback}
    />
  ),
  DATE: (
    name: string,
    value: string,
    id: string,
    callback: (fieldData: EditCustomFields) => void,
    isEditable: boolean,
    handleDeleteItem: (fieldData: EditCustomFields) => void
  ) => (
    <DateField
      handleDeleteItem={handleDeleteItem}
      isEditable={isEditable}
      name={name}
      id={id}
      value={value}
      gatherData={callback}
    />
  ),
};
