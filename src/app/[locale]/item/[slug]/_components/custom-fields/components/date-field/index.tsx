import React from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Typography } from "@mui/material";
interface Props {
  isEditable: Boolean;
}
export default function DateField({ isEditable }: Props) {
  return (
    <>
      {isEditable ? (
        <>
          <Typography variant="caption">helper text</Typography>
          <DatePicker label="Basic date picker" />
        </>
      ) : (
        <>
          <Typography variant="caption">helper text</Typography>
          <Typography variant="caption">05/23/2332</Typography>
        </>
      )}
    </>
  );
}
