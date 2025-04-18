import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import DetailsButton from "./DetailsButton";

import { useState } from "react";

export default function AccountCard({ account, handleDelete }) {
  const [showDetails, setShowDetails] = useState(false);
  const formatNumber = (number) => (
    parseFloat(number).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
  return (
    <div className="flex flex-col items-center gap-2 relative border rounded-xl p-5 ">
      <span
        className="w-3 absolute right-5"
        onClick={() => handleDelete(account.id)}
      >
        <FontAwesomeIcon icon={faTrashCan} style={{ color: "#27445D" }} />
      </span>
      <h1 className="text-lg font-semibold text-center">{`${account.name}`}</h1>
      <h2 className="text-2xl font-semibold text-center">
        {`${formatNumber(account.current_credit)} EGP`}
      </h2>
      {showDetails && (
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col items-center">
            <h3>Total Expenses</h3>
            <p>{`${formatNumber(account.total_expenses)} EGP`}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3>Total Incomes</h3>
            <p>{`${formatNumber(account.total_incomes)} EGP`}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3>Total Ins</h3>
            <p>{`${formatNumber(account.total_transfer_in)} EGP`}</p>
          </div>
          <div className="flex flex-col items-center">
            <h3>Total Outs</h3>
            <p>{`${formatNumber(account.total_transfer_out)} EGP`}</p>
          </div>
        </div>
      )}

      <DetailsButton
        showdetails={showDetails}
        setShowDetails={setShowDetails}
      />
    </div>
  );
}
