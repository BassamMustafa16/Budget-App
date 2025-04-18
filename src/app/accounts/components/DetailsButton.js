export default function DetailsButton({ showdetails, setShowDetails }) {
  return (
    <button
      onClick={() =>
        showdetails ? setShowDetails(false) : setShowDetails(true)
      }
      className="border px-3 py-1 rounded-full font-semibold shadow-xl cursor-pointer w-30"
    >
      {showdetails ? "Show Less" : "Show More"}
    </button>
  );
}
