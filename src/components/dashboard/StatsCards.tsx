import { useFinanceStore } from "../../store/useFinanceStore";

const formatCurrency = (value: number) => `₹${value.toLocaleString("en-IN")}`;

const StatsCards = () => {
  const { transactions } = useFinanceStore();

  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income - expenses;

  const cards = [
    {
      title: "Total Balance",
      value: formatCurrency(balance),
      trend: "+8.2%",
      isPositive: true,
    },
    {
      title: "Income",
      value: formatCurrency(income),
      trend: "+12.5%",
      isPositive: true,
    },
    {
      title: "Expenses",
      value: formatCurrency(expenses),
      trend: "-5.1%",
      isPositive: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
      {cards.map((card) => (
        <div
          key={card.title}
          className="flex flex-col justify-between rounded-xl border border-gray-800 bg-[#0f172a] p-5 transition hover:border-gray-700 hover:scale-[1.02]"
        >
          <p className="text-sm font-medium text-slate-400">{card.title}</p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-white">
            {card.value}
          </p>
          <span
            className={`mt-2 inline-block text-xs font-medium ${
              card.isPositive ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {card.trend} from last month
          </span>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
