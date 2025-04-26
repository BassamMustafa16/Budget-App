import { useRef } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquarePlus } from "@fortawesome/free-solid-svg-icons";

export default function AddSubcategory({ category, fetchSubcategories }) {
  const addSubcategoryInput = useRef();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/api/subcategories/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          subcategoryName: addSubcategoryInput.current.value,
          categoryId: category.id,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Unknown error");
      }
      addSubcategoryInput.current.value = "";
      fetchSubcategories();
      console.log("Subcategory added successfully");
    } catch (err) {
      console.log(`Subcategory addition failed - ${err.message}`);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="relative w-fit">
      <input
        required
        ref={addSubcategoryInput}
        maxLength={20}
        type="text"
        placeholder="Add subcategory"
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
