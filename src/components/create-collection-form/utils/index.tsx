import { CustomField } from "@/entities/custom-field";
import { Custom } from "../interfaces";

export function adapterForCustomFields(
  collectionId: string,
  customFields: Custom[]
): CustomField[] {
  return customFields.map((field) => {
    return {
      ...field,
      collectionId,
    };
  });
}
