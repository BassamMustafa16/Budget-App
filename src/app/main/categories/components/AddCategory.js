"use client";
import { useRef } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

export default function AddCategory({ fetchCategories }) {
  const addCategoryInput = useRef();
  const { token } = useAuth();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
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
        className="px-3 py-1 border border-[#27445d80] rounded-xl outline-none focus:border-2 focus:border-darkblue"
      ></input>
      <button
        type="submit"
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        <FontAwesomeIcon icon={faSquarePlus} />
      </button>
    </form>
  );
}
