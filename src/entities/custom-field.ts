export type TypeCustomField = "STRING" | "INTEGER" | "BOOLEAN" | "DATE";

export interface CustomField {
  collectionId: string;
  name: string;
  type: TypeCustomField;
}

export interface CreateCustomFieldFromItem extends CustomField {
  id: string;
  value: string;
}
