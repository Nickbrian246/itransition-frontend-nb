"use client";
import {
  CustomButton,
  CustomCircularLoading,
  CustomInputLabel,
  CustomLink,
  CustomPasswordField,
  CustomText,
  CustomTextField,
} from "@/components/custom-components";
import { colors } from "@/constants";
import { ApiFailureResponse } from "@/types/api/api-response-interface";
// import { UserLoginType, LoginUserSchema } from "@/validations/auth";
import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { t } from "i18next";
import { ChangeEvent, FormEventHandler, useState } from "react";
import { ZodError } from "zod";
import { useTranslation } from "react-i18next";

export default function Login() {
  const [hidePassword, setHidePassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ZodError | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    date: new Date(),
  });
  const { t } = useTranslation();

  const handleClickShowPassword = () => setHidePassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleUserData = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // try {
    //   const data = LoginUserSchema.parse(userData);
    //   const res = await loginUser(data);
    //   logUser(res.data.userName, res.medaData.access_token);
    //   setIsLoading(false);
    // } catch (error) {
    //   setIsLoading(false);
    //   if (error instanceof ZodError) {
    //     setErrors(error);
    //   } else {
    //     const err = error as ApiFailureResponse;
    //     setErrorMessage(err.message);
    //   }
    // }
  };
  return (
    <Box
      sx={{
        minWidth: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: `2px solid ${colors.border}`,
        borderRadius: "10px",
        padding: "50px",
      }}
    >
      <CustomText
        textSize="titleLg"
        textColor="black"
        style={{ fontWeight: "bold" }}
      >
        {t("auth-Sign-In-Title")}
      </CustomText>
      {errorMessage && (
        <CustomText textAlign="center" textSize="textSm" textColor="redAlert">
          {errorMessage}
        </CustomText>
      )}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          position: "relative",
        }}
      >
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="EmailField">{t("Email")}</CustomInputLabel>
          <TextField
            onChange={handleUserData}
            name="email"
            id="EmailField"
            placeholder={t("placeholderEmail")}
          />
          {errors &&
            errors.issues
              .filter((err) => err.path[0] === "email")
              .map((e) => (
                <FormHelperText
                  key={e.message}
                  id={e.message}
                  sx={{
                    color: colors.redAlert,
                    fontSize: "12px",
                    margin: "0",
                  }}
                >
                  {e.message}
                </FormHelperText>
              ))}
        </Box>
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="passwordField">
            {t("auth-password")}
          </CustomInputLabel>
          <CustomPasswordField
            onChange={handleUserData}
            name="password"
            handleOnMouseDown={handleMouseDownPassword}
            handleShowPassword={handleClickShowPassword}
            hidePassword={hidePassword}
            id="passwordField"
            placeholder={t("auth-password")}
          />
          {errors &&
            errors.issues
              .filter((err) => err.path[0] === "password")
              .map((e) => (
                <FormHelperText
                  key={e.message}
                  id={e.message}
                  sx={{
                    color: colors.redAlert,
                    fontSize: "12px",
                    margin: "0",
                  }}
                >
                  {e.message}
                </FormHelperText>
              ))}
        </Box>

        <Button
          type="submit"
          disabled={
            !(userData.email.length > 3 && userData.password.length >= 1)
          }
          variant="contained"
        >
          {t("auth-login")}
        </Button>
        {isLoading && <CustomCircularLoading />}
      </form>
      <CustomLink href={"/auth/register"}>
        {t("auth-dont-have-account")}
      </CustomLink>
    </Box>
  );
}
