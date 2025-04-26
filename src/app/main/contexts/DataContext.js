"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useAuth } from "@/app/context/AuthContext";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { token } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  // Fetch functions with token dependency
  const fetchAccounts = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3001/api/accounts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setAccounts(data);
    } catch (err) {
      console.error("Failed to fetch accounts:", err);
    }
  }, [token]);

  const fetchCategories = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3001/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  }, [token]);

  const fetchSubcategories = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3001/api/subcategories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setSubcategories(data);
    } catch (err) {
      console.error("Failed to fetch subcategories:", err);
    }
  }, [token]);

  const fetchTransactions = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3001/api/transactions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    }
  }, [token]);

  // Initial load
  useEffect(() => {
    const fetchAllData = async () => {
      await Promise.all([
        fetchAccounts(),
        fetchCategories(),
        fetchSubcategories(),
        fetchTransactions(),
      ]);
    };

    fetchAllData();
  }, [fetchAccounts, fetchCategories, fetchSubcategories, fetchTransactions]);

  return (
    <DataContext.Provider
      value={{
        accounts,
        categories,
        subcategories,
        transactions,
        refetchAccounts: fetchAccounts,
        refetchCategories: fetchCategories,
        refetchSubcategories: fetchSubcategories,
        refetchTransactions: fetchTransactions,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
