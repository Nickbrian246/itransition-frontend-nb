enum TypeCustomField {
  "STRING",
  "INT",
  "BOOLEAN",
}

export interface CustomField {
  collectionId: string;
  name: string;
  value: string;
  type: TypeCustomField;
}
