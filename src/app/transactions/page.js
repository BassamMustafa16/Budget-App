"use client";
import AddTransactionButton from "../../../components/AddTransactionButton";
import TransactionCard from "../../../components/TransactionCard";
import AddTransactionModal from "../../../components/AddTransactionModal";

import { useState } from "react";
export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const handleDelete = (transactionId) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  return (
    <div>
      {transactions.length > 0 ? (
        <div className="flex flex-col gap-5 px-5">
          {transactions.map((transaction, index) => (
            <TransactionCard
              transaction={transaction}
              handleDelete={handleDelete}
              key={index}
            />
          ))}
        </div>
      ) : (
        <p className="text-center">There is no recorded transactions</p>
      )}

      <span
        className="fixed bg-beig bottom-10 right-3 z-10"
        onClick={() => setIsShowModal(true)}
      >
        <AddTransactionButton />
      </span>
      {isShowModal && (
        <AddTransactionModal
          setIsShowModal={setIsShowModal}
          transactions={transactions}
          setTransactions={setTransactions}
        />
      )}
    </div>
  );
}
