import { CustomInputLabel } from "@/components/custom-components";
import { Box, TextField, Typography } from "@mui/material";
import React from "react";
interface Props {
  isEditable: Boolean;
}
export default function IntegerField({ isEditable }: Props) {
  return (
    <>
      {isEditable ? (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="label">hola</CustomInputLabel>
          <TextField id="label" placeholder="Write here " type="number" />
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="caption">helper text</Typography>
          <Typography variant="body1">44</Typography>
        </Box>
      )}
    </>
  );
}
