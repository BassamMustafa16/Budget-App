import Navbar from "../../../components/Navbar";
import { DataProvider } from "./contexts/DataContext";

export default function RootLayout({ children }) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>
        <DataProvider>{children}</DataProvider>
      </main>
    </>
  );
}
