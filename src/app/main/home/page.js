"use client";
import useHandleLogout from "@/app/utils/useHandleLogout";

export default function HomePage() {
  const handleLogout = useHandleLogout();

  return (
    <div>
      <button onClick={handleLogout}>Log out</button>
    </div>
  );
}
