import { useState } from "react";

export function usePasswordRules() {
  const [isDirty, setIsDirty] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasNoWhiteSpace, setHasNoWhiteSpace] = useState<boolean>(false);
  const [hasOneEspecialCharacter, setHasOneEspecialCharacter] =
    useState<boolean>(false);
  const [atLeastOneUppercase, setAtLeastOneUppercase] =
    useState<boolean>(false);
  const [atLeastOneNumber, SetAtLeastOneNumber] = useState<boolean>(false);

  const validatePassword = (password: string) => {
    setHasMinLength(password.length > 8);

    setHasNoWhiteSpace(!/\s/.test(password));

    setHasOneEspecialCharacter(/[!@#$%^&*(),.?":{}|<>]/.test(password));

    setAtLeastOneUppercase(/[A-Z]/.test(password));

    SetAtLeastOneNumber(/[0-9]/.test(password));
  };

  return {
    hasMinLength,
    isDirty,
    validatePassword,
    setIsDirty,
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    atLeastOneUppercase,
    atLeastOneNumber,
  };
}
