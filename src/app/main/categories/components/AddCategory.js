import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons"; // Added import
import { library } from "@fortawesome/fontawesome-svg-core"; // Added import
library.add(faSquarePlus); // Add icon to library

export default function AddCategory({ fetchCategories }) {
  const addCategoryInput = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/api/categories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryName: addCategoryInput.current.value,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Unknown error");
      }
      addCategoryInput.current.value = "";
      fetchCategories();
      console.log("Category added successfully");
    } catch (err) {
      console.log(`Category addition failed - ${err.message}`);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="relative w-fit">
      <input
        required
        ref={addCategoryInput}
        maxLength={20}
        type="text"
        placeholder="Add Category"
        className="px-3 py-1 border rounded-lg outline-none focus:border-2"
      ></input>
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <FontAwesomeIcon icon="fa-solid fa-square-plus" />
      </button>
    </form>
  );
}
