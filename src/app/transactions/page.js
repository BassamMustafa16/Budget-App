"use client";
import AddTransactionButton from "./components/AddTransactionButton";
import TransactionCard from "./components/TransactionCard";
import AddTransactionModal from "./components/AddTransactionModal";

import { useState, useEffect } from "react";

export default function TransactionsPage() {
  const token = localStorage.getItem("token");
  // State to store the list of transactions
  const [transactions, setTransactions] = useState([]);

  // State to control the visibility of the Add Transaction modal
  const [isShowModal, setIsShowModal] = useState(false);

  // Function to fetch transactions from the API
  const fetchTransactions = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTransactions(data); // Update the state with fetched transactions
    } catch (err) {
      console.error("Error fetching transactions:", err);
    }
  };

  // Fetch transactions when the component is mounted
  useEffect(() => {
    fetchTransactions();
  }, []);

  // Function to handle the deletion of a transaction
  const handleDelete = async (transactionId) => {
    try {
      const res = await fetch(
        `http://localhost:3001/api/transactions/${transactionId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete transaction");

      alert("Transaction deleted!"); // Notify the user
      fetchTransactions(); // Refresh the transactions list
    } catch (err) {
      console.error("❌ Error deleting transaction:", err);
    }
  };

  return (
    <div>
      {/* Display transactions if available, otherwise show a message */}
      {transactions.length > 0 ? (
        <div className="flex flex-col gap-5 px-5 mt-5">
          {transactions.map((transaction, index) => (
            <TransactionCard
              transaction={transaction} // Pass transaction data to the card
              handleDelete={handleDelete} // Pass delete handler to the card
              key={index} // Use index as the key
            />
          ))}
        </div>
      ) : (
        <p className="text-center">There is no recorded transactions</p>
      )}

      {/* Button to open the Add Transaction modal */}
      <span
        className="fixed bg-beig bottom-10 right-3 z-10"
        onClick={() => setIsShowModal(true)}
      >
        <AddTransactionButton />
      </span>

      {/* Add Transaction modal */}
      {isShowModal && (
        <AddTransactionModal
          setIsShowModal={setIsShowModal} // Function to close the modal
          transactions={transactions} // Pass current transactions
          setTransactions={setTransactions} // Update transactions state
          fetchTransactions={fetchTransactions} // Refresh transactions list
        />
      )}
    </div>
  );
}
