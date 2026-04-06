import TransactionsTable from "../components/transactions/TransactionsTable";

const Transactions = () => {
  return (
    <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5">
      <h2 className="text-sm font-medium text-slate-400 mb-4">
        All Transactions
      </h2>
      <div className="overflow-x-auto w-full rounded-lg overflow-hidden">
        <TransactionsTable />
      </div>
    </div>
  );
};

export default Transactions;
