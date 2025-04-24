"use client";
import { useState, useEffect } from "react";
import AddCategory from "./components/AddCategory";
import CategoryCard from "./components/CategoryCard";

export default function CategoriesPage() {
  const token = localStorage.getItem("token");
  const [categories, setCategories] = useState([]);
  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-5">
      <h1 className="text-2xl font-semibold">Categories</h1>
      <ul className="flex flex-col gap-2">
        {categories.map((category, index) => (
          <CategoryCard key={category.id} category={category} />
        ))}
        <AddCategory fetchCategories={fetchCategories} />
      </ul>
    </div>
  );
}
