import { create } from "zustand";

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  category: string;
  type: "income" | "expense";
};

type State = {
  transactions: Transaction[];
  role: "admin" | "viewer";
  setRole: (role: "admin" | "viewer") => void;
  addTransaction: (data: Omit<Transaction, "id">) => void;
  deleteTransaction: (id: string) => void;
  updateTransaction: (id: string, data: Partial<Omit<Transaction, "id">>) => void;
};

export const useFinanceStore = create<State>((set) => ({
  transactions: [
    { id: "1", date: "2026-01-05", amount: 45000, category: "Salary", type: "income" },
    { id: "2", date: "2026-01-12", amount: 1200, category: "Food", type: "expense" },
    { id: "3", date: "2026-02-05", amount: 45000, category: "Salary", type: "income" },
    { id: "4", date: "2026-02-18", amount: 3200, category: "Shopping", type: "expense" },
    { id: "5", date: "2026-03-05", amount: 48000, category: "Salary", type: "income" },
    { id: "6", date: "2026-03-10", amount: 8500, category: "Freelance", type: "income" },
    { id: "7", date: "2026-03-14", amount: 950, category: "Travel", type: "expense" },
    { id: "8", date: "2026-03-20", amount: 2100, category: "Bills", type: "expense" },
    { id: "9", date: "2026-04-01", amount: 50000, category: "Salary", type: "income" },
    { id: "10", date: "2026-04-03", amount: 15000, category: "Investment", type: "income" },
    { id: "11", date: "2026-04-05", amount: 750, category: "Entertainment", type: "expense" },
    { id: "12", date: "2026-04-06", amount: 4200, category: "Bills", type: "expense" },
    { id: "13", date: "2026-04-07", amount: 1800, category: "Food", type: "expense" },
    { id: "14", date: "2026-04-08", amount: 6000, category: "Freelance", type: "income" },
  ],
  role: "admin",
  setRole: (role) => set({ role }),
  addTransaction: (data) =>
    set((state) => ({
      transactions: [
        ...state.transactions,
        { ...data, id: String(Date.now()) },
      ],
    })),
  deleteTransaction: (id) =>
    set((state) => ({
      transactions: state.transactions.filter((t) => t.id !== id),
    })),
  updateTransaction: (id, data) =>
    set((state) => ({
      transactions: state.transactions.map((t) =>
        t.id === id ? { ...t, ...data } : t
      ),
    })),
}));
