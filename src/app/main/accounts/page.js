"use client";
import { useState } from "react";
import AccountCard from "./components/AccountCard";
import AddAccountButton from "./components/AddAccountButton";
import AddAccountModal from "./components/AddAccountModal";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../contexts/DataContext";

export default function Accounts() {
  const { accounts, refetchAccounts } = useData();
  const [isShowModal, setIsShowModal] = useState(false);

  const { token } = useAuth();

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/accounts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete account");
      alert("Account deleted!");
      refetchAccounts();
    } catch (err) {
      console.error("❌ Error deleting account:", err);
    }
  };

  return (
    <div className="flex flex-col gap-3 p-5">
      <h1 className="text-2xl font-bold mb-4">Accounts</h1>
      <div className="flex flex-col gap-3">
        {accounts.map((account) => (
          <AccountCard
            key={account.name}
            account={account}
            handleDelete={handleDelete}
          />
        ))}
      </div>
      <AddAccountButton setIsShowModal={setIsShowModal} />
      {isShowModal && (
        <AddAccountModal
          token={token}
          setIsShowModal={setIsShowModal}
          fetchAccounts={refetchAccounts}
        />
      )}
    </div>
  );
}
