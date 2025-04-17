"use client";
import { useEffect, useState } from "react";
import AccountCard from "../../../components/AccountCard";
import AddAccountButton from "../../../components/AddAccountButton";
import AddAccountModal from "../../../components/AddAccountModal";

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);

  const fetchAccounts = async () => {
    try {
      const res = await fetch("http://localhost:3001/api/accounts");
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error("Error fetching accounts:", err);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);
  return (
    <div className="flex flex-col gap-3 p-5">
      <h1 className="text-2xl font-bold mb-4">Accounts</h1>
      <div className="flex flex-col gap-3">
        {accounts.map((account) => (
          <AccountCard key={account.name} account={account} />
        ))}
      </div>
      <AddAccountButton setIsShowModal={setIsShowModal} />
      {isShowModal && <AddAccountModal setIsShowModal={setIsShowModal} fetchAccounts={fetchAccounts} />}
    </div>
  );
}
