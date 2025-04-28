"use client";
import { useState, useEffect } from "react";
import NavbarElement from "./NavbarElement";

export default function Navbar() {
  const [firstName, setFirstName] = useState("");
  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);
  const elements = [
    {
      name: firstName,
      path: "/main/home",
    },
    {
      name: "Transactions",
      path: "/main/transactions",
    },
    {
      name: "Transfers",
      path: "/main/transfers",
    },
    {
      name: "Accounts",
      path: "/main/accounts",
    },
    {
      name: "Categories",
      path: "/main/categories",
    },
  ];

  return (
    <div className="flex flex-row items-center w-full overflow-auto text-beig bg-darkblue shadow-sm shadow-darkblue">
      <div className="flex flex-row items-center">
        {elements.map((element, index) => (
          <NavbarElement
            elementName={element.name}
            elementPath={element.path}
            key={index}
            name={element}
          />
        ))}
      </div>
    </div>
  );
}
