"use client";
import { useState, useEffect } from "react";

export default function AddTransactionButton() {
  const [buttonText, setButtonText] = useState("+");

  useEffect(() => {
    const updateButtonText = () => {
      const width = window.innerWidth;
      if (width >= 1028) {
        setButtonText("Add Transaction");
      } else if (width >= 768) {
        setButtonText("Add");
      } else {
        setButtonText("+");
      }
    };

    updateButtonText(); // Set initial state
    window.addEventListener("resize", updateButtonText);

    return () => {
      window.removeEventListener("resize", updateButtonText);
    };
  }, []);

  return (
    <button className="border-2 max-sm:aspect-square max-sm:w-10 md:px-3 md:py-1 rounded-full text-2xl font-semibold shadow-xl cursor-pointer">
      {buttonText}
    </button>
  );
}
