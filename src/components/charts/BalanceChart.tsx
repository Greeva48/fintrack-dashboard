import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface BalanceData {
  date: string;
  balance: number;
}

const data: BalanceData[] = [
  { date: "Jan", balance: 45000 },
  { date: "Feb", balance: 52000 },
  { date: "Mar", balance: 48000 },
  { date: "Apr", balance: 61000 },
  { date: "May", balance: 55000 },
  { date: "Jun", balance: 67000 },
  { date: "Jul", balance: 72000 },
  { date: "Aug", balance: 69000 },
  { date: "Sep", balance: 78000 },
  { date: "Oct", balance: 85000 },
  { date: "Nov", balance: 92000 },
  { date: "Dec", balance: 124500 },
];

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-white/[0.06] bg-slate-900 px-3 py-2 text-sm shadow-xl">
      <p className="text-slate-400">{label}</p>
      <p className="font-medium text-white">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

const BalanceChart = () => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            vertical={false}
          />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
            dx={-4}
            width={50}
          />
          <Tooltip content={<CustomTooltip />} cursor={false} />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#818cf8"
            strokeWidth={2}
            dot={false}
            activeDot={{
              r: 4,
              fill: "#818cf8",
              stroke: "#020617",
              strokeWidth: 2,
            }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceChart;
