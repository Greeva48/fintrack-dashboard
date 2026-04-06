import { useFinanceStore } from "../../store/useFinanceStore";

const Insights = () => {
  const { transactions } = useFinanceStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const highestExpense = transactions
    .filter((t) => t.type === "expense")
    .sort((a, b) => b.amount - a.amount)[0];

  return (
    <div className="bg-[#0f172a] p-5 rounded-xl shadow text-white">
      <h2 className="text-lg font-semibold mb-4">
        Insights
      </h2>

      <div className="space-y-2 text-gray-300">
        <p>
          Total Income: ₹{income.toLocaleString()}
        </p>
        <p>
           Total Expenses: ₹{expenses.toLocaleString()}
        </p>
        {highestExpense && (
          <p>
             Highest Expense: {highestExpense.category} (₹
            {highestExpense.amount.toLocaleString()})
          </p>
        )}
      </div>
    </div>
  );
};

export default Insights;