import { Categories } from "@/entities/categories";

export function categoriesAdapter(categories: Categories[]) {
  return categories.map((category) => {
    return { ...category, label: category.name };
  });
}
