import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function TransactionCard({ transaction, handleDelete }) {
  return (
    <div className="flex flex-col gap-1 relative border rounded-xl p-5 ">
      <span
        className="aspect-square h-3 absolute right-5"
        onClick={() => handleDelete(transaction.id)}
      >
        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#27445D" }} />
      </span>
      <p className="text-2xl font-semibold">{`${transaction.amount} EGP`}</p>
      <p className="text-sm">{`${transaction.category} - ${transaction.subcategory}`}</p>
      <p className="text-sm">{`${transaction.type} - ${transaction.account_name}`}</p>
      <p className="text-sm">
        {new Date(transaction.date).toLocaleDateString("en-CA")}
      </p>
    </div>
  );
}
