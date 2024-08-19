import React, { ChangeEvent, useEffect, useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { EditCustomFields, SaveFieldsDataStatus } from "../..";
import dayjs, { Dayjs } from "dayjs";
import { v4 } from "uuid";

interface Props {
  isEditable: Boolean;
  name: string;
  gatherData: (data: EditCustomFields) => void;
  fieldsStatus: SaveFieldsDataStatus;
}
export default function DateField({
  isEditable,
  fieldsStatus,
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
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={["DatePicker"]}>
          <DatePicker onChange={handleDateChange} label={name} />
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}
