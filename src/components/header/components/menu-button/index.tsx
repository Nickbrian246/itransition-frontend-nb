"use client";
import { CustomIconButton } from "@/components/custom-components";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

export default function MenuButton() {
  return (
    <CustomIconButton
      sx={{
        borderRadius: "30%",
      }}
      title="Menu"
    >
      <MenuOutlinedIcon />
    </CustomIconButton>
  );
}
