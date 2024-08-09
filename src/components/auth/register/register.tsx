"use client";
import {
  CustomButton,
  CustomCircularLoading,
  CustomInputLabel,
  CustomLink,
  CustomPasswordField,
  CustomText,
  CustomTextField,
  PasswordRules,
} from "@/components/custom-components";
import { colors } from "@/constants";
import { usePasswordRules } from "@/hooks/use-password-rules/use-password-rules";
import { ApiFailureResponse } from "@/types/api/api-response-interface";

import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { ZodError } from "zod";

import { fields } from "./utils/fields";
import { useTranslation } from "react-i18next";
import { Typography, InputLabel } from "@mui/material";

export default function Register() {
  const [isHidePassword, setIsHidePassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { hasMinLength, isDirty, validatePassword, setIsDirty } =
    usePasswordRules();
  const [errors, setErrors] = useState<ZodError | null>(null);
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    password: "",
    position: "",
    date: new Date(),
  });

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name.toLowerCase();
    const value = e.target.value;
    if (name === "password") validatePassword(value);
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClickShowPassword = () => setIsHidePassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // try {
    //   const user = RegisterUserSchema.parse(userData);
    //   const res = await registerUser(user);
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
  // border: `2px solid ${colors.textGrayDarkMode}`,
  return (
    <Box
      sx={{
        minWidth: "400px",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",

        background: `${colors.backGroundDarkModeGrayBox}`,
        borderRadius: "10px",
        padding: "40px",
      }}
    >
      <Typography variant="h1" sx={{ fontWeight: "bold", textAlign: "center" }}>
        {t("auth-register")}
      </Typography>
      {errorMessage && (
        <Typography textAlign="center" variant="caption" color="red">
          {errorMessage}
        </Typography>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "4px",
          position: "relative",
        }}
      >
        {fields.map((field) => (
          <Box
            key={field.htmlFor}
            sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >
            <CustomInputLabel htmlFor={field.htmlFor}>
              {t(field.name)}
            </CustomInputLabel>
            <TextField
              required={true}
              type={field.htmlFor === "Email" ? "email" : "text"}
              onChange={handleInput}
              name={field.name}
              id={field.htmlFor}
              placeholder={t(field.placeholder)}
            />

            {errors &&
              errors.issues
                .filter((err) => err.path[0] === field.name.toLowerCase())
                .map((e) => (
                  <FormHelperText
                    key={e.message}
                    id={field.htmlFor}
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
        ))}
        <Box sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
          <CustomInputLabel htmlFor="passwordField">
            {t("auth-password")}
          </CustomInputLabel>
          <CustomPasswordField
            handleOnMouseDown={handleMouseDownPassword}
            hidePassword={isHidePassword}
            handleShowPassword={handleClickShowPassword}
            onFocus={() => {
              validatePassword(userData["password"] as string);
              setIsDirty(true);
            }}
            name="password"
            onChange={handleInput}
            value={userData["password"]}
            id="passwordField"
            placeholder={t("auth-password")}
          />
          <PasswordRules hasMinLength={hasMinLength} isDirty={isDirty} />
        </Box>

        <Button
          sx={{ fontWeight: "500" }}
          type="submit"
          disabled={!hasMinLength}
          variant="contained"
        >
          {t("auth-register")}
        </Button>
        {isLoading && <CustomCircularLoading />}
      </form>
      <CustomLink href={"/auth/login"}>{t("auth-have-account")}</CustomLink>
    </Box>
  );
}