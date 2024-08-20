import { EditCustomFields } from "..";
import BooleanField from "../components/boolean-field";
import DateField from "../components/date-field";
import IntegerField from "../components/integer-field";
import FieldString from "../components/string-field";

export const fields = {
  STRING: (name: string, callback: (fieldData: EditCustomFields) => void) => (
    <FieldString isEditable={false} name={name} gatherData={callback} />
  ),
  INTEGER: (name: string, callback: (fieldData: EditCustomFields) => void) => (
    <IntegerField isEditable={false} name={name} gatherData={callback} />
  ),
  BOOLEAN: (name: string, callback: (fieldData: EditCustomFields) => void) => (
    <BooleanField isEditable={false} name={name} gatherData={callback} />
  ),
  DATE: (name: string, callback: (fieldData: EditCustomFields) => void) => (
    <DateField isEditable={false} name={name} gatherData={callback} />
  ),
};
