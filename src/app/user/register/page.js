"use client";
import { useRef } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for redirection
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function UserPage() {
  const formRef = useRef(null); // Define the formRef
  const router = useRouter(); // Initialize useRouter

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current); // Use formRef here
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:3001/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Registration successful!");
        formRef.current.reset(); // Clear the form
        router.push("/user/login"); // Redirect to login page
      } else {
        alert(result.error || "Registration failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-semibold">Register</h1>
      <form
        ref={formRef} // Attach the ref to the form
        onSubmit={handleSubmit}
        className="flex flex-col gap-5 items-center border rounded-2xl p-5"
      >
        <span className="w-7">
          <FontAwesomeIcon icon={faLock} />
        </span>
        <div className="flex flex-col gap-2">
          {/* First Name Input */}
          <label htmlFor="firstNameInput">First Name</label>
          <input
            required
            id="firstNameInput"
            name="first_name"
            type="text"
            placeholder="Enter your first name"
            className="border rounded-xl px-3 py-1 outline-none focus:border-2"
          ></input>
          <label htmlFor="lastNameInput">Last Name</label>
          {/* Last Name Input */}
          <input
            required
            id="lastNameInput"
            name="last_name"
            type="text"
            placeholder="Enter your last name"
            className="border rounded-xl px-3 py-1 outline-none focus:border-2"
          ></input>
          {/* User Name Input */}
          <label htmlFor="userNameInput">User Name</label>
          <input
            required
            id="userNameInput"
            name="username"
            type="text"
            placeholder="Enter your user name"
            className="border rounded-xl px-3 py-1 outline-none focus:border-2"
          ></input>
          {/* Email Name Input */}
          <label htmlFor="emailInput">Email</label>
          <input
            required
            id="emailInput"
            name="email"
            type="email"
            placeholder="Enter your user email"
            className="border rounded-xl px-3 py-1 outline-none focus:border-2"
          ></input>
          {/* Password Input */}
          <label htmlFor="passwordInput">Password</label>
          <input
            required
            id="passwordInput"
            name="password"
            type="password"
            placeholder="Enter your password"
            className="border rounded-xl px-3 py-1 outline-none focus:border-2"
          ></input>
        </div>
        <div className="flex flex-col gap-2 w-full px-2">
          <button
            type="submit"
            className="border px-3 py-1 rounded-2xl flex-1 cursor-pointer font-semibold"
          >
            Register
          </button>
          <p className="text-center">
            Or do you already have an account{" "}
            <Link
              className="underline underline-offset-4 font-semibold"
              href={"/user/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}
