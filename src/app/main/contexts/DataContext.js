"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import { useAuth } from "@/app/context/AuthContext";
import { fetchWithAuth } from "@/app/utils/fetchWithAuth";
import useHandleLogout from "@/app/utils/useHandleLogout";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const { token } = useAuth();
  const handleLogout = useHandleLogout();

  const [accounts, setAccounts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const fetchData = useCallback(
    async (endpoint, setState) => {
      if (!token) return;
      try {
        const res = await fetchWithAuth(
          `http://localhost:3001/api/${endpoint}`,
          token,
          handleLogout
        );
        const data = await res.json();
        setState(data);
      } catch (err) {
        console.error(`Failed to fetch ${endpoint}:`, err);
      }
    },
    [token, handleLogout]
  );

  useEffect(() => {
    // Fetch all data only once when the component mounts
    const fetchAllData = async () => {
      if (!token) return; // Ensure token is available before fetching
      await Promise.all([
        fetchData("accounts", setAccounts),
        fetchData("categories", setCategories),
        fetchData("subcategories", setSubcategories),
        fetchData("transactions", setTransactions),
      ]);
    };

    fetchAllData();
  }, [token]); // Only re-run when the token changes

  return (
    <DataContext.Provider
      value={{
        accounts,
        categories,
        subcategories,
        transactions,
        refetchAccounts: () => fetchData("accounts", setAccounts),
        refetchCategories: () => fetchData("categories", setCategories),
        refetchSubcategories: () =>
          fetchData("subcategories", setSubcategories),
        refetchTransactions: () => fetchData("transactions", setTransactions),
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
