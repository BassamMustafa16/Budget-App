import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronDown } from "@fortawesome/free-solid-svg-icons"; // Added import

import { library } from "@fortawesome/fontawesome-svg-core"; // Added import
library.add(faCircleChevronDown); // Add icon to library

export default function CategoryCard({ category }) {
  const [subcategories, setSubcategories] = useState([]);
  const [showSubcategories, setShowSubcategories] = useState(false);
  const fetchSubcategories = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/subcategories");
      const data = await res.json();
      setSubcategories(data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  useEffect(() => {
    fetchSubcategories();
  }, []);

  const handleClick = (event) => {
    setShowSubcategories(!showSubcategories);
    if (event.target === event.currentTarget) {
      console.log("Clicked");
    }
  };
  return (
    <li onClick={handleClick} className="flex flex-col gap-2">
      <h2 className="flex flex-row justify-between w-full font-semibold">
        <span>{category.name}</span>
        <span
          className={`transition-transform duration-500 ${
            showSubcategories && "rotate-180"
          }`}
        >
          <FontAwesomeIcon icon="fa-circle-chevron-down" />
        </span>
      </h2>
      <ul
        className={`overflow-hidden transition-max-height duration-500 ease-in-out ${
          showSubcategories ? "max-h-screen" : "max-h-0"
        } px-5`}
      >
        {subcategories
          .filter((subcategory) => subcategory.category_id === category.id)
          .map((subcategory) => (
            <li key={subcategory.id}>{subcategory.name}</li>
          ))}
      </ul>
    </li>
  );
}
