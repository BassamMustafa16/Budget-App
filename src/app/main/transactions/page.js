"use client";
import AddTransactionButton from "./components/AddTransactionButton";
import TransactionCard from "./components/TransactionCard";
import AddTransactionModal from "./components/AddTransactionModal";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../contexts/DataContext";

import { useState, useEffect } from "react";

export default function TransactionsPage() {
  const { token } = useAuth();

  // State to store the list of transactions
  const { transactions, refetchTransactions } = useData();
  // State to control the visibility of the Add Transaction modal
  const [isShowModal, setIsShowModal] = useState(false);

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
      refetchTransactions(); // Refresh the transactions list
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
          token={token}
          setIsShowModal={setIsShowModal} // Function to close the modal
          fetchTransactions={refetchTransactions} // Refresh transactions list
        />
      )}
    </div>
  );
}
