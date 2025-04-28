"use client";
import { useRouter } from "next/navigation";

export default function useHandleLogout() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("firstName");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/");
  };

  return handleLogout;
}
