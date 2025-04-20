import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSquarePlus } from "@fortawesome/free-solid-svg-icons"; // Added import
import { library } from "@fortawesome/fontawesome-svg-core"; // Added import
library.add(faXmark, faSquarePlus);
export default function SubcategoryCard({
  category,
  subcategories,
  fetchSubcategories,
}) {
  const handleDelete = async (subcategoryId) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/subcategories/${subcategoryId}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Failed to delete subcategory");

      alert("Subcategory deleted!"); // Notify the user
      fetchSubcategories(); // Refresh the transactions list
    } catch (err) {
      console.error("❌ Error deleting subcategory:", err);
    }
  };
  return (
    <>
      {subcategories
        .filter((subcategory) => subcategory.category_id === category.id)
        .map((subcategory) => (
          <li key={subcategory.id} className="flex flex-row justify-between">
            <h3>{subcategory.name}</h3>
            <span onClick={() => handleDelete(subcategory.id)}>
              <FontAwesomeIcon icon="fa-solid fa-xmark" />
            </span>
          </li>
        ))}
    </>
  );
}
