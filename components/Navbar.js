"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import NavbarElement from "./NavbarElement"

export default function Navbar() {
  const router = useRouter();
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName"));
  const elements = [
    {
      name: "Transactions",
      path: "/transactions",
    },
    {
      name: "Transfers",
      path: "/transfers",
    },
    {
      name: "Accounts",
      path: "/accounts",
    },
    {
      name: "Categories",
      path: "/categories",
    },
  ];

  const handleClick = () => {
    setFirstName(localStorage.getItem("firstName"));
    firstName ? router.push("/user/home") : router.push("/user/register");
  };
  return (
    <div className="flex flex-row items-center w-full overflow-auto text-beig bg-darkblue shadow-sm shadow-darkblue">
      <div className="flex flex-row items-center">
        <button onClick={handleClick}>{firstName ? firstName : "user"}</button>
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
