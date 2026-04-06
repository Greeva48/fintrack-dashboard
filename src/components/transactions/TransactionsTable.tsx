import { useState } from "react";
import { useFinanceStore } from "../../store/useFinanceStore";
import type { Transaction } from "../../store/useFinanceStore";

const inputClass =
  "w-full rounded-lg border border-gray-700 bg-[#020617] px-3 py-2 text-sm text-white outline-none transition-colors focus:border-indigo-500";

const ModalShell = ({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) => (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    onMouseDown={(e) => {
      if (e.target === e.currentTarget) onClose();
    }}
  >
    <div className="w-full max-w-md rounded-xl border border-gray-800 bg-[#0f172a] p-6">
      <h3 className="text-lg font-semibold text-white mb-5">{title}</h3>
      {children}
    </div>
  </div>
);

const TransactionForm = ({
  initial,
  onSubmit,
  onClose,
  submitLabel,
}: {
  initial: { date: string; amount: number; category: string; type: "income" | "expense" };
  onSubmit: (form: typeof initial) => void;
  onClose: () => void;
  submitLabel: string;
}) => {
  const [form, setForm] = useState(initial);

  return (
    <>
      <div className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Date</label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Amount</label>
          <input
            type="number"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: Number(e.target.value) })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Category</label>
          <input
            type="text"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-400 mb-1.5">Type</label>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value as "income" | "expense" })}
            className={inputClass}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          onClick={onClose}
          className="rounded-lg border border-gray-700 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5"
        >
          Cancel
        </button>
        <button
          onClick={() => onSubmit(form)}
          className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          {submitLabel}
        </button>
      </div>
    </>
  );
};

const TransactionsTable = () => {
  const { transactions, role, addTransaction, deleteTransaction, updateTransaction } =
    useFinanceStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editing, setEditing] = useState<Transaction | null>(null);
  const [adding, setAdding] = useState(false);

  const filtered = transactions.filter((t) => {
    const matchesSearch =
      t.category.toLowerCase().includes(search.toLowerCase()) ||
      t.type.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "all" || t.type === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center flex-1">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-[#020617] text-white px-3 py-2 rounded-lg border border-gray-700 w-full md:max-w-xs outline-none transition-colors focus:border-indigo-500"
          />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#020617] text-white px-3 py-2 rounded-lg border border-gray-700 outline-none"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        <div className="flex items-center gap-3">
          {role === "viewer" && (
            <span className="text-xs text-slate-500">Read-only mode</span>
          )}
          {role === "admin" && (
            <button
              onClick={() => setAdding(true)}
              className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-600"
            >
              + Add Transaction
            </button>
          )}
        </div>
      </div>

      <table className="w-full text-left border-collapse">
        <thead className="bg-[#020617] text-gray-400 text-sm sticky top-0">
          <tr>
            <th className="p-3">Date</th>
            <th className="p-3">Amount</th>
            <th className="p-3">Category</th>
            <th className="p-3">Type</th>
            {role === "admin" && <th className="p-3">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filtered.length === 0 ? (
            <tr>
              <td
                colSpan={role === "admin" ? 5 : 4}
                className="py-10 text-center text-gray-400"
              >
                No transactions found.
              </td>
            </tr>
          ) : (
            filtered.map((t) => (
              <tr
                key={t.id}
                className="border-b border-gray-800 transition-colors hover:bg-[#020617]"
              >
                <td className="p-3">{t.date}</td>
                <td
                  className={`p-3 font-medium ${
                    t.type === "income" ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}₹
                  {t.amount.toLocaleString("en-IN")}
                </td>
                <td className="p-3">{t.category}</td>
                <td className="p-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      t.type === "income"
                        ? "bg-emerald-400/10 text-emerald-400"
                        : "bg-red-400/10 text-red-400"
                    }`}
                  >
                    {t.type}
                  </span>
                </td>
                {role === "admin" && (
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setEditing(t)}
                        className="rounded-md border border-gray-700 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteTransaction(t.id)}
                        className="rounded-md border border-red-500/20 bg-red-500/10 px-2.5 py-1 text-xs font-medium text-red-400 transition-colors hover:bg-red-500/20"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {editing && (
        <ModalShell title="Edit Transaction" onClose={() => setEditing(null)}>
          <TransactionForm
            initial={{
              date: editing.date,
              amount: editing.amount,
              category: editing.category,
              type: editing.type,
            }}
            onSubmit={(form) => {
              updateTransaction(editing.id, form);
              setEditing(null);
            }}
            onClose={() => setEditing(null)}
            submitLabel="Save Changes"
          />
        </ModalShell>
      )}

      {adding && (
        <ModalShell title="Add Transaction" onClose={() => setAdding(false)}>
          <TransactionForm
            initial={{ date: "", amount: 0, category: "", type: "expense" }}
            onSubmit={(form) => {
              addTransaction(form);
              setAdding(false);
            }}
            onClose={() => setAdding(false)}
            submitLabel="Add Transaction"
          />
        </ModalShell>
      )}
    </>
  );
};

export default TransactionsTable;
