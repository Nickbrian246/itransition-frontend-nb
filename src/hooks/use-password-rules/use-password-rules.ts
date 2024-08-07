import { useState } from "react";

export function usePasswordRules() {
  const [isDirty, setIsDirty] = useState(false);
  const [hasMinLength, setHasMinLength] = useState(false);
  const [hasNoWhiteSpace, setHasNoWhiteSpace] = useState<boolean>(false);
  const [hasOneEspecialCharacter, setHasOneEspecialCharacter] =
    useState<boolean>(false);
  const [atLeastOneUppercase, setAtLeastOneUppercase] =
    useState<boolean>(false);

  const validatePassword = (password: string) => {
    setHasMinLength(password.length > 1);

    setHasNoWhiteSpace(!/\s/.test(password));

    setHasOneEspecialCharacter(/[!@#$%^&*(),.?":{}|<>]/.test(password));

    setAtLeastOneUppercase(/[A-Z]/.test(password));
  };

  return {
    hasMinLength,
    isDirty,
    validatePassword,
    setIsDirty,
    hasNoWhiteSpace,
    hasOneEspecialCharacter,
    atLeastOneUppercase,
  };
}
