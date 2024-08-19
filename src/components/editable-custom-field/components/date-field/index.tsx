import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import { EditCustomFields } from "../..";
import { Box, IconButton } from "@mui/material";
import CustomDeleteIconButton from "@/components/custom-components/custom-delete-icon-button";

interface Props {
  isEditable: Boolean;
  name: string;
  value: string;
  id: string;
  gatherData: (data: EditCustomFields) => void;
  handleDeleteItem: (fieldData: EditCustomFields) => void;
}
export default function DateField({
  isEditable,
  value,
  id,
  gatherData,
  name,
  handleDeleteItem,
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

  useEffect(() => {
    if (value && id)
      setDateField((prev) => {
        return { ...prev, value, id };
      });
  }, [value, id]);

  const handleDateChange = (date: Dayjs | null) => {
    setDateField((prev) => ({
      ...prev,
      value: date ? date.toISOString() : "",
    }));
  };
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer
          sx={{ display: "flex", gap: "10px" }}
          components={["DatePicker"]}
        >
          <DatePicker
            disabled={!isEditable}
            onChange={handleDateChange}
            label={name}
            value={dayjs(dateField["value"])}
          />
          {isEditable && (
            <Box>
              {" "}
              <CustomDeleteIconButton
                handleClick={() => {
                  handleDeleteItem(dateField);
                }}
              />
            </Box>
          )}
        </DemoContainer>
      </LocalizationProvider>
    </>
  );
}
