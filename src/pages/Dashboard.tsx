import StatsCards from "../components/dashboard/StatsCards";
import InsightsPanel from "../components/dashboard/Insights";
import BalanceChart from "../components/charts/BalanceChart";
import SpendingPieChart from "../components/charts/SpendingPieChart";
import TransactionsTable from "../components/transactions/TransactionsTable";

const Dashboard = () => {
  return (
    <>
      <StatsCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 transition hover:border-gray-700">
          <h2 className="text-sm font-medium text-slate-400 mb-4">
            Balance Overview
          </h2>
          <div className="h-[300px]">
            <BalanceChart />
          </div>
        </div>

        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 transition hover:border-gray-700">
          <h2 className="text-sm font-medium text-slate-400 mb-4">
            Spending Breakdown
          </h2>
          <div className="h-[300px] flex items-center">
            <SpendingPieChart />
          </div>
        </div>
      </div>

      <InsightsPanel />

      <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 transition hover:border-gray-700">
        <h2 className="text-sm font-medium text-slate-400 mb-4">
          Recent Transactions
        </h2>
        <div className="overflow-x-auto w-full rounded-lg overflow-hidden">
          <TransactionsTable />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
