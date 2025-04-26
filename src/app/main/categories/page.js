"use client";
import AddCategory from "./components/AddCategory";
import CategoryCard from "./components/CategoryCard";
import { useData } from "../contexts/DataContext";

export default function CategoriesPage() {
  const { categories, subcategories, refetchCategories, refetchSubcategories } =
    useData();

  return (
    <div className="flex flex-col gap-2 p-5">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <ul className="flex flex-col gap-5 items-center">
        {categories.map((category, index) => (
          <CategoryCard
            key={category.id}
            category={category}
            subcategories={subcategories}
            fetchSubcategories={refetchSubcategories}
          />
        ))}
        <AddCategory fetchCategories={refetchCategories} />
      </ul>
    </div>
  );
}
