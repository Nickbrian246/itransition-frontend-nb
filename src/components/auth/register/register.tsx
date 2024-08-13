"use client";
import {
  CustomCircularLoading,
  CustomInputLabel,
  CustomLink,
  CustomPasswordField,
  PasswordRules,
} from "@/components/custom-components";
import { usePasswordRules } from "@/hooks/use-password-rules/use-password-rules";
import { ApiFailureResponse } from "@/types/api/api-response-interface";

import { Box, Button, FormHelperText, TextField } from "@mui/material";
import { FormEventHandler, useEffect, useState } from "react";
import { ZodError } from "zod";

import { RegisterUser, RegisterUserSchema } from "@/validations";
import { Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { fields } from "./utils/fields";
import CustomContainer from "@/components/custom-components/custom-container";
import { registerUser } from "@/store/slices/auth/auth-thunk";
import { useAppDispatch, useAppSelector } from "@/hooks/use-redux/redux";
import { cleanAuthErrorMessage } from "@/store/slices/auth/auth-slice";

export default function Register() {
  const [isHidePassword, setIsHidePassword] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ZodError | null>(null);
  const dispatch = useAppDispatch();
  const authError = useAppSelector((state) => state.user.authError);
  const [userData, setUserData] = useState<RegisterUser>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const {
    hasMinLength,
    isDirty,
    atLeastOneUppercase,
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    validatePassword,
    setIsDirty,
  } = usePasswordRules();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (!authError.isActive) return;
    setErrorMessage(authError.message);

    const timer = setTimeout(() => {
      dispatch(cleanAuthErrorMessage());
    }, authError.duration);

    return () => clearTimeout(timer);
  }, [authError.isActive, authError.message, authError.duration, dispatch]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
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
    try {
      const user = RegisterUserSchema.parse(userData);
      dispatch(registerUser(user));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error instanceof ZodError) {
        setErrors(error);
      } else {
        const err = error as ApiFailureResponse;
        setErrorMessage(err.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <CustomContainer
        sx={{
          maxWidth: { xs: "300px", md: "600px" },
          maxHeight: "1000px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
          borderRadius: "10px",
          padding: {
            xs: "10px",
            sm: "40px",
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{ fontWeight: "bold", textAlign: "center" }}
        >
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
                type={field.htmlFor === "Email" ? "email" : "text"}
                onChange={handleInput}
                name={field.fieldName}
                id={field.htmlFor}
                placeholder={t(field.placeholder)}
              />

              {errors &&
                errors.issues
                  .filter((err) => err.path[0] === field.fieldName)
                  .map((e) => (
                    <FormHelperText
                      key={e.message}
                      id={field.htmlFor}
                      sx={{
                        fontSize: "12px",
                        margin: "0",
                      }}
                    >
                      {t(`${e.message}`)}
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
            <PasswordRules
              hasMinLength={hasMinLength}
              isDirty={isDirty}
              atLeastOneUppercase={atLeastOneUppercase}
              hasNoWhiteSpace={hasNoWhiteSpace}
              hasOneEspecialCharacter={hasOneEspecialCharacter}
            />
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
      </CustomContainer>
    </section>
  );
}
