"use client";
import { useEffect, useState } from "react";
import AccountCard from "./components/AccountCard";
import AddAccountButton from "./components/AddAccountButton";
import AddAccountModal from "./components/AddAccountModal";
import { useAuth } from "../../context/AuthContext";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const { token } = useAuth();

  const fetchAccounts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/accounts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:3001/api/accounts/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete account");
      alert("Account deleted!");
      fetchAccounts();
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
          fetchAccounts={fetchAccounts}
        />
      )}
    </div>
  );
}
