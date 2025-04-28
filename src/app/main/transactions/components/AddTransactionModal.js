"use client";
import { useRef, useState, useEffect } from "react";
import { useData } from "../../contexts/DataContext";
export default function AddTransactionModal({
  token,
  setIsShowModal,
  fetchTransactions,
}) {
  const formRef = useRef(null);

  const { categories, subcategories, accounts } = useData();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(
      categories.find((category) => category.name === event.target.value)
    ); // Update the selected category
  };

  const handleClick = (event) => {
    // Check if the click is on the background (self) and not on child elements
    if (event.target === event.currentTarget) {
      setIsShowModal(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current); // Use formRef here
    const transactionData = Object.fromEntries(formData.entries());

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
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex flex-col bg-beig rounded-2xl p-5"
      >
        {/* Data Input */}
        <label htmlFor="dateInput">Date:</label>
        <input
          type="date"
          name="date"
          id="dateInput"
          defaultValue={getCurrentDate()} // Set the current date as the default value
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        ></input>
        {/* Category Input */}
        <label htmlFor="categoryInput">Category:</label>
        <select
          id="categoryInput"
          name="category"
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
          name="subcategory"
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
          name="type"
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          <option value={"Expense"}>Expense</option>
          <option value={"Income"}>Income</option>
        </select>
        {/* Account Input */}
        <label htmlFor="accountInput">Account</label>
        <select
          id="accountInput"
          name="account"
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
          name="amount"
          type="number"
          step={0.01}
          id="amountInput"
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
          required
        ></input>
        {/* Label Input */}
        <label htmlFor="labelInput">Label</label>
        <select
          name="label"
          id="labelInput"
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          <option value={"Personal"}>Personal</option>
          <option value={"Home"}>Home</option>
        </select>
        {/* Description Input */}
        <label htmlFor="descriptionInput">description</label>
        <textarea
          id="descriptionInput"
          name="description"
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
