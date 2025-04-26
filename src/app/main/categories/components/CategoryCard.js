import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons";

import SubcategoryCard from "./SubcategoryCard";
import AddSubcategory from "./AddSubcategory";
export default function CategoryCard({
  category,
  subcategories,
  fetchSubcategories,
}) {
  const [showSubcategories, setShowSubcategories] = useState(false);

  const handleClick = (event) => {
    setShowSubcategories(!showSubcategories);
    if (event.target === event.currentTarget) {
    }
  };

  return (
    <li className="flex flex-col gap-2 border border-[#27445d80] rounded-xl p-3">
      <h2
        onClick={handleClick}
        className="flex flex-row justify-between w-full font-semibold"
      >
        <span>{category.name}</span>
        <span
          className={`transition-transform duration-500 ${
            showSubcategories && "rotate-180"
          }`}
        >
          <FontAwesomeIcon icon={faCircleChevronDown} />
        </span>
      </h2>
      <ul
        className={`flex flex-col gap-1 overflow-hidden transition-max-height duration-500 ease-in-out ${
          showSubcategories ? "max-h-screen" : "max-h-0"
        } px-5`}
      >
        <SubcategoryCard
          category={category}
          subcategories={subcategories}
          fetchSubcategories={fetchSubcategories}
        />
        <AddSubcategory
          category={category}
          fetchSubcategories={fetchSubcategories}
        />
      </ul>
    </li>
  );
}
