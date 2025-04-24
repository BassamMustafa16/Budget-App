import { useRef } from "react";

export default function AddAccountModal({ setIsShowModal, fetchAccounts }) {
  const accountNameInput = useRef();
  const initialCreditInput = useRef();

  const handleClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsShowModal(false);
    }
  };

  const handleSubmit = async (event) => {
    const token = localStorage.getItem("token");
    event.preventDefault();

    const name = accountNameInput.current.value.trim();
    const initial_credit = parseFloat(initialCreditInput.current.value);

    if (!name || isNaN(initial_credit)) {
      alert("Please fill in all fields correctly.");
      return;
    }

    const accountData = {
      name,
      initial_credit,
      total_expenses: 0,
      total_incomes: 0,
      total_transfer_out: 0,
      total_transfer_in: 0,
    };

    try {
      const res = await fetch("http://localhost:3001/api/accounts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(accountData),
      });

      if (!res.ok) throw new Error("Failed to add account");

      setIsShowModal(false); // Close modal on success
      fetchAccounts();
    } catch (err) {
      console.error("❌ Error adding account:", err);
      alert("Error adding account. Please try again.");
    }
  };

  return (
    <div>
      <div
        style={{ backgroundColor: "rgba(39, 68, 93, 0.5)" }}
        className="fixed top-0 left-0 z-20 flex flex-col items-center justify-center p-5 w-screen h-screen"
        onClick={handleClick}
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-beig rounded-2xl p-5"
        >
          <label htmlFor="accountNameInput">Account Name:</label>
          <input
            type="text"
            id="accountNameInput"
            placeholder="Please enter account name...."
            ref={accountNameInput}
            className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
          />
          <label htmlFor="initialCreditInput">Initial Credit:</label>
          <input
            id="initialCreditInput"
            ref={initialCreditInput}
            type="number"
            step="0.01"
            defaultValue="0.00"
            className="border rounded-lg outline-none focus:border-2 px-3 py-1 mb-3"
          />
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
    </div>
  );
}
