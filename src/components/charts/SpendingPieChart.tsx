import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

interface SpendingCategory {
  name: string;
  value: number;
  color: string;
}

const data: SpendingCategory[] = [
  { name: "Food", value: 8500, color: "#818cf8" },
  { name: "Travel", value: 6200, color: "#34d399" },
  { name: "Bills", value: 9800, color: "#fbbf24" },
  { name: "Shopping", value: 5400, color: "#f87171" },
  { name: "Entertainment", value: 4300, color: "#38bdf8" },
];

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

const total = data.reduce((sum, d) => sum + d.value, 0);

const CustomTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { payload: SpendingCategory }[];
}) => {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;
  const pct = ((item.value / total) * 100).toFixed(1);

  return (
    <div className="rounded-lg border border-white/[0.06] bg-slate-900 px-3 py-2 text-sm shadow-xl">
      <p className="text-slate-400">{item.name}</p>
      <p className="font-medium text-white">
        {formatCurrency(item.value)}{" "}
        <span className="text-slate-500">({pct}%)</span>
      </p>
    </div>
  );
};

const SpendingPieChart = () => {
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div className="h-52 w-52 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {data.map((item) => {
          const pct = ((item.value / total) * 100).toFixed(1);
          return (
            <div key={item.name} className="flex items-center gap-2 text-sm">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-slate-300">{item.name}</span>
              <span className="text-slate-500">{pct}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SpendingPieChart;
