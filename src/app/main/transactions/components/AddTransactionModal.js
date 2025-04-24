"use client";
import { useRef, useState, useEffect } from "react";
export default function AddTransactionModal({
  setIsShowModal,
  transactions,
  setTransactions,
  fetchTransactions,
}) {
  const dateInput = useRef();
  const categoryInput = useRef();
  const subcategoryInput = useRef();
  const typeInput = useRef();
  const accountInput = useRef();
  const amountInput = useRef();
  const labelInput = useRef();
  const descriptionInput = useRef();

  const [categories, setCategories] = useState([]); // Ensure categories is always an array
  const [subcategories, setSubcategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [accounts, setAccounts] = useState([]);

  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data); // Only set categories if the response is an array
        setSelectedCategory(data[0]);
      } else {
        console.error("Invalid categories response:", data);
        setCategories([]); // Fallback to an empty array
      }
    } catch (err) {
      console.log(`Error fetching categories - ${err}`);
      setCategories([]); // Fallback to an empty array in case of error
    }
  };

  const fetchSubcategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/api/subcategories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (Array.isArray(data)) {
        setSubcategories(data); // Only set subcategories if the response is an array
      } else {
        console.error("Invalid subcategories response:", data);
        setSubcategories([]); // Fallback to an empty array
      }
    } catch (err) {
      console.log(`Error fetching subcategories - ${err}`);
      setSubcategories([]); // Fallback to an empty array in case of error
    }
  };

  const fetchAccounts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:3001/api/accounts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (Array.isArray(data)) {
        setAccounts(data); // Only set accounts if the response is an array
      } else {
        console.error("Invalid accounts response:", data);
        setAccounts([]); // Fallback to an empty array
      }
    } catch (err) {
      console.error("Error fetching accounts:", err);
      setAccounts([]); // Fallback to an empty array in case of error
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
    fetchAccounts();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(
      categories.find((category) => category.name === event.target.value)
    ); // Update the selected category
    console.log(selectedCategory);
  };

  const handleClick = (event) => {
    // Check if the click is on the background (self) and not on child elements
    if (event.target === event.currentTarget) {
      setIsShowModal(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem("token");

    const date = dateInput.current.value;
    const category = categoryInput.current.value;
    const subcategory = subcategoryInput.current.value;
    const type = typeInput.current.value;
    const account = accountInput.current.value;
    const amount = parseFloat(amountInput.current.value).toFixed(2);
    const label = labelInput.current.value;
    const description = descriptionInput.current.value;

    const transactionData = {
      date,
      category,
      subcategory,
      type,
      account, // Use account directly instead of JSON.stringify(account)
      amount,
      label,
      description,
    };
    try {
      const res = await fetch("http://localhost:3001/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      if (!res.ok) throw new Error("Failed to add transaction");

      fetchTransactions();
    } catch (err) {
      console.error("❌ Error adding transaction:", err);
      alert("Error adding transaction. Please try again.");
    }

    // Close the modal after adding the transaction
    setIsShowModal(false);
  };

  // Get the current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero
    const day = String(today.getDate()).padStart(2, "0"); // Add leading zero
    return `${year}-${month}-${day}`;
  };

  return (
    <div
      style={{ backgroundColor: "rgba(39, 68, 93, 0.5)" }}
      className="fixed top-0 left-0 z-20 flex flex-col items-center justify-center p-5 w-screen h-screen"
      onClick={handleClick}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-beig rounded-2xl p-5"
      >
        {/* Data Input */}
        <label htmlFor="dateInput">Date:</label>
        <input
          type="date"
          id="dateInput"
          defaultValue={getCurrentDate()} // Set the current date as the default value
          ref={dateInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        ></input>
        {/* Category Input */}
        <label htmlFor="categoryInput">Category:</label>
        <select
          id="categoryInput"
          ref={categoryInput}
          onChange={handleCategoryChange}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        {/* Subcategory Input */}
        <label htmlFor="subcategoryInput">Subcategory:</label>
        <select
          id="subcategoryInput"
          ref={subcategoryInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          {subcategories
            .filter(
              (subcategory) => subcategory.category_id === selectedCategory.id
            )
            .map((subcategory) => (
              <option key={subcategory.id} value={subcategory.name}>
                {subcategory.name}
              </option>
            ))}
        </select>
        {/* Type Input */}
        <label htmlFor="typeInput">Expense/Income:</label>
        <select
          id="typeInput"
          ref={typeInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          <option value={"Expense"}>Expense</option>
          <option value={"Income"}>Income</option>
        </select>
        {/* Account Input */}
        <label htmlFor="accountInput">Account</label>
        <select
          id="accountInput"
          ref={accountInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          {accounts.map((account) => (
            <option key={account.id} value={JSON.stringify(account)}>
              {account.name}
            </option>
          ))}
        </select>
        {/* Amount Input */}
        <label htmlFor="amountInput">Amount:</label>
        <input
          type="number"
          step={0.01}
          id="amountInput"
          ref={amountInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
          required
        ></input>
        {/* Label Input */}
        <label htmlFor="labelInput">Label</label>
        <select
          id="labelInput"
          ref={labelInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          <option value={"Personal"}>Personal</option>
          <option value={"Home"}>Home</option>
        </select>
        {/* Description Input */}
        <label htmlFor="descriptionInput">description</label>
        <textarea
          id="descriptionInput"
          ref={descriptionInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        ></textarea>
        <div className="flex flex-row gap-2 justify-between">
          <button
            type="submit"
            className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3 flex-1"
          >
            Add
          </button>
          <button
            type="button"
            onClick={() => setIsShowModal(false)}
            className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3 flex-1"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
