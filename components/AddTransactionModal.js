"use client";
import { useRef, useState } from "react";
import categories from "../data/categories"
export default function AddTransactionModal({
  setIsShowModal,
  transactions,
  setTransactions,
}) {
  const dateInput = useRef();
  const categoryInput = useRef();
  const subcategoryInput = useRef();
  const typeInput = useRef();
  const accountInput = useRef();
  const amountInput = useRef();

  const [selectedCategory, setSelectedCategory] = useState("Food & Drinks");
  
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value); // Update the selected category
  };

  const handleClick = (event) => {
    // Check if the click is on the background (self) and not on child elements
    if (event.target === event.currentTarget) {
      setIsShowModal(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const transaction = {
      id: Date.now(),
      amount: parseFloat(amountInput.current.value).toFixed(2),
      category: categoryInput.current.value,
      subcategory: subcategoryInput.current.value,
      type: typeInput.current.value,
      account: accountInput.current.value,
      date: dateInput.current.value,
    };

    // Add the new transaction to the transactions array
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);

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
        <label htmlFor="dateInput">Date:</label>
        <input
          type="date"
          id="dateInput"
          defaultValue={getCurrentDate()} // Set the current date as the default value
          ref={dateInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        ></input>
        <label htmlFor="categoryInput">Category:</label>
        <select
          id="categoryInput"
          ref={categoryInput}
          onChange={handleCategoryChange}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          {categories.map((category) => (
            <option key={category.category} value={category.category}>
              {category.category}
            </option>
          ))}
        </select>
        <label htmlFor="subcategoryInput">Subcategory:</label>
        <select
          id="subcategoryInput"
          ref={subcategoryInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          {categories
            .find((category) => category.category === selectedCategory)
            .subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
        </select>
        <label htmlFor="typeInput">Expense/Income:</label>
        <select
          id="typeInput"
          ref={typeInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          <option value={"Expense"}>Expense</option>
          <option value={"Income"}>Income</option>
        </select>
        <label htmlFor="accountInput">Account</label>
        <select
          id="accountInput"
          ref={accountInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
        >
          <option value={"Cash"}>Cash</option>
          <option value={"Ahly"}>Ahly</option>
        </select>
        <label htmlFor="amountInput">Amount:</label>
        <input
          type="number"
          step={0.01}
          id="amountInput"
          ref={amountInput}
          className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
          required
        ></input>
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
