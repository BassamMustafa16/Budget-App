import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/app/context/AuthContext";
export default function SubcategoryCard({
  category,
  subcategories,
  fetchSubcategories,
}) {
  const { token } = useAuth();
  const handleDelete = async (subcategoryId) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/subcategories/${subcategoryId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </li>
        ))}
    </>
  );
}
