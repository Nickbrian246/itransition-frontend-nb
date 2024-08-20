import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { EditCustomFields, SaveFieldsDataStatus } from "../..";

interface Props {
  isEditable: Boolean;
  name: string;
  gatherData: (data: EditCustomFields) => void;
}
export default function DateField({
  isEditable,

  gatherData,
  name,
}: Props) {
  const [dateField, setDateField] = useState<EditCustomFields>({
    id: v4(),
    name,
    value: "",
    type: "DATE",
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      gatherData(dateField);
    }, 900);
    return () => clearTimeout(timer);
  }, [dateField]);

  const handleDateChange = (date: Dayjs | null) => {
    setDateField((prev) => ({
      ...prev,
      value: date ? date.toISOString() : "",
    }));
  };
  return (
    <>
      <DemoContainer components={["DatePicker"]}>
        <DatePicker onChange={handleDateChange} label={name} />
      </DemoContainer>
    </>
  );
}
