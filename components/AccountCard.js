export default function AccountCard({account}) {

  return (
    <div
      className="flex flex-col gap-1 relative border rounded-xl p-5 "
    >
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
