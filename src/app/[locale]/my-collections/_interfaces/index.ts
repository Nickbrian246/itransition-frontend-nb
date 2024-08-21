import { Collections } from "@/entities/collections";

export type FilterOrder = "ASC" | "DES";
export type FilterKeys = keyof Pick<Collections, "items" | "updatedAt">;
