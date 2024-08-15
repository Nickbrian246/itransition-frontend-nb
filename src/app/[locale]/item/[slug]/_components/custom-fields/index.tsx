import { TypeCustomField } from "@/entities/custom-field";
import React from "react";
import BooleanField from "./components/boolean-field";
import IntegerField from "./components/integer-field";
import FieldString from "./components/string-field";
import DateField from "./components/date-field";
interface Props {
  type: TypeCustomField;
}
export default function CustomFields() {
  const array: { type: TypeCustomField }[] = [
    { type: "STRING" },
    { type: "STRING" },
    { type: "STRING" },
    { type: "INT" },
    { type: "INT" },
    { type: "INT" },
    { type: "BOOLEAN" },
    { type: "BOOLEAN" },
    { type: "BOOLEAN" },
    { type: "DATE" },
    { type: "DATE" },
    { type: "DATE" },
  ];

  const fields = {
    STRING: <FieldString isEditable={false} />,
    INT: <IntegerField isEditable={false} />,
    BOOLEAN: <BooleanField isEditable={false} />,
    DATE: <DateField isEditable={false} />,
  };
  return (
    <>
      {array.map((type, index) => {
        return <React.Fragment key={index}>{fields[type.type]}</React.Fragment>;
      })}
    </>
  );
}
