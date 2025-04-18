export default function AddAccountButton({ setIsShowModal }) {
  return (
    <button
      onClick={() => setIsShowModal(true)}
      className="border px-3 py-1 rounded-full text-2xl font-semibold shadow-xl cursor-pointer"
    >
      Add Account
    </button>
  );
}
