"use client";
import { useRouter } from "next/navigation";
export default function HomePage() {
  const router = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("firstName");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    router.push("/");
  };
  return (
    <div>
      <button onClick={handleLogOut}>Log out</button>
    </div>
  );
}
