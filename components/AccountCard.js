import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function AccountCard({ account, handleDelete }) {
  return (
    <div className="flex flex-col gap-1 relative border rounded-xl p-5 ">
      <span className="w-3 absolute right-5" onClick={() => handleDelete(account.id)}>
        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#27445D" }} />
      </span>
      <p className="text-lg font-semibold text-center">{`${account.name}`}</p>
      <p className="text-2xl font-semibold text-center">
        {`${parseFloat(account.current_credit).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} EGP`}
      </p>
    </div>
  );
}
