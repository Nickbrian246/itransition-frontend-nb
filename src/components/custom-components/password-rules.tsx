import { List, ListItem } from "@mui/material";
import { CustomText } from "./custom-text";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
interface Props {
  isDirty: boolean;
  hasMinLength: boolean;
}
export function PasswordRules({ hasMinLength, isDirty }: Props) {
  return (
    <List component="div" sx={{ display: "flex " }}>
      <ListItem sx={{ padding: "0px", gap: "3px" }}>
        <CustomText
          textSize="textSm"
          textColor={
            isDirty ? (hasMinLength ? "greenSuccess" : "redAlert") : "textBlue"
          }
        >
          * Password must contain at least one character.{" "}
        </CustomText>
        {hasMinLength && <CheckCircleOutlineIcon color="success" />}
      </ListItem>
    </List>
  );
}
