import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/ui/Sidebar";
import Topbar from "./components/ui/Topbar";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-[#020617] text-white">
        <Sidebar />

        <div className="flex-1 min-w-0">
          <Topbar />

          <main className="p-6 max-w-7xl mx-auto w-full space-y-8">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/insights" element={<Insights />} />
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
