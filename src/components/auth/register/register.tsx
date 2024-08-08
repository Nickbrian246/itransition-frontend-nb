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

import { Box, FormHelperText } from "@mui/material";
import { FormEventHandler, useState } from "react";
import { ZodError } from "zod";

import { fields } from "./utils/fields";
import { useTranslation } from "react-i18next";

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
  return (
    <Box
      sx={{
        minWidth: "400px",
        maxWidth: "600px",
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        border: `2px solid ${colors.border}`,
        borderRadius: "10px",
        padding: "40px",
      }}
    >
      <CustomText
        textSize="titleLg"
        textColor="black"
        style={{ fontWeight: "bold", textAlign: "center" }}
      >
        {t("auth-register")}
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
            <CustomTextField
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

        <CustomButton
          type="submit"
          disabled={!hasMinLength}
          variant="contained"
          textSize="textSm"
        >
          {t("auth-register")}
        </CustomButton>
        {isLoading && <CustomCircularLoading />}
      </form>
      <CustomLink href={"/auth/login"}>{t("auth-have-account")}</CustomLink>
    </Box>
  );
}
