"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./context/AuthContext";

export default function LoginPage() {
  const { saveToken } = useAuth();
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const formRef = useRef(null); // Define the formRef

  useEffect(() => {
    const storedFirstName = localStorage.getItem("firstName");
    if (storedFirstName) {
      setFirstName(storedFirstName);
    }
  }, []);
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(formRef.current); // Use formRef here
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("http://localhost:3001/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Login successful!");
        saveToken(result.token);
        localStorage.setItem("userId", result.userId);
        localStorage.setItem("firstName", result.firstName);
        setFirstName(localStorage.getItem("firstName"));
        router.push("/main/home");
      } else {
        alert(result.error || "Login failed");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      <h1 className="text-2xl font-semibold">Login</h1>
      {firstName ? (
        <div>
          <h2>{`Hello ${firstName}`}</h2>
        </div>
      ) : (
        <form
          ref={formRef} // Attach the ref to the form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 items-center border rounded-2xl p-5"
        >
          <span className="w-7">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <div className="flex flex-col gap-2">
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
              Login
            </button>
            <p className="text-center">
              {"Don't have an account ?"}
              <Link
                className="underline underline-offset-4 font-semibold"
                href={"/register"}
              >
                Register Now
              </Link>
            </p>
          </div>
        </form>
      )}
    </div>
  );
}
