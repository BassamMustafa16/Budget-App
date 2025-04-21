import Navbar from "../../../components/Navbar";

export default function RootLayout({ children }) {
  return (
    <>
      <nav>
        <Navbar />
      </nav>
      <main>{children}</main>
    </>
  );
}
