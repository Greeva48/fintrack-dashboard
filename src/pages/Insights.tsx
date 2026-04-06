import InsightsPanel from "../components/dashboard/Insights";
import BalanceChart from "../components/charts/BalanceChart";
import SpendingPieChart from "../components/charts/SpendingPieChart";

const Insights = () => {
  return (
    <>
      <InsightsPanel />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 transition hover:border-gray-700">
          <h2 className="text-sm font-medium text-slate-400 mb-4">
            Balance Trend
          </h2>
          <div className="h-[300px]">
            <BalanceChart />
          </div>
        </div>

        <div className="bg-[#0f172a] border border-gray-800 rounded-xl p-5 transition hover:border-gray-700">
          <h2 className="text-sm font-medium text-slate-400 mb-4">
            Spending by Category
          </h2>
          <div className="h-[300px] flex items-center">
            <SpendingPieChart />
          </div>
        </div>
      </div>
    </>
  );
};

export default Insights;
