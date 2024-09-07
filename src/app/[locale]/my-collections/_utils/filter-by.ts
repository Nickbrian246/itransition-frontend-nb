import { Collections } from "@/entities/collections";
import { FilterOrder, FilterKeys } from "../_interfaces";
export const filterByType = (
  type: FilterKeys,
  filterOrder: FilterOrder,
  collections: Collections[]
) => {
  if (!collections) return null;
  const collectionsData = [...collections];
  if (type === "items") {
    return collectionsData.sort((a, b) => {
      const aLength = a.items?.length ?? 0;
      const bLength = b.items?.length ?? 0;
      return filterOrder === "ASC" ? aLength - bLength : bLength - aLength;
    });
  }
  if (type === "updatedAt") {
    return collectionsData.sort((a, b) => {
      return filterOrder === "ASC"
        ? new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
        : new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime();
    });
  }
  return collections;
};
