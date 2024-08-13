export type TypeCustomField = "STRING" | "INT" | "BOOLEAN" | "DATE";

export interface CustomField {
  collectionId: string;
  name: string;
  value: string;
  type: TypeCustomField;
}
