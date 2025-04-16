"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarElement({ elementName, elementPath }) {
  const pathname = usePathname();
  const isActive = (path) => pathname === path;
  return (
      <Link
        className={`flex items-center w-full h-12 px-3 rounded hover:bg-gray-500 hover:text-gray-300 ${isActive(elementPath) ? 'bg-gray-500' : ''}`}
        href={elementPath}
      >
        <span className="ml-2 text-sm font-medium">{elementName}</span>
      </Link>
  );
}
