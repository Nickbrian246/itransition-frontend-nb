import React from "react";

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
interface Props {
  isEditable: Boolean;
}
export default function BooleanField({ isEditable }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="caption">helper text</Typography>
      <FormGroup>
        <FormControlLabel
          disabled
          control={<Checkbox defaultChecked />}
          label="simon"
        />
      </FormGroup>
    </Box>
  );
}
