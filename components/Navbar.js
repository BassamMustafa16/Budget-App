"use client";
import NavbarElement from "./NavbarElement";

export default function Navbar() {
  const elements = [
    {
      name: "Dashboard",
      path: "/",
    },
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
