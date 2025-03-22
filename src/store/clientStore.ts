import { create } from "zustand";
import { Client, ClientStore, Expense } from "../types/types";

const mockClients: Client[] = [
  {
    id: 1,
    name: "John Doe",
    doa: "2023-10-10",
    medicalStatus: "Stable",
    caseStatus: "Open",
    lawFirm: "Law & Associates",
  },
  {
    id: 2,
    name: "Jane Smith",
    doa: "2022-06-15",
    medicalStatus: "Critical",
    caseStatus: "Pending",
    lawFirm: "Legal Experts",
  },
  {
    id: 3,
    name: "Alice Johnson",
    doa: "2024-01-20",
    medicalStatus: "Recovering",
    caseStatus: "Closed",
    lawFirm: "Justice League",
  },
];

const mockExpenses: Record<number, Expense[]> = {
  1: [{ id: 101, label: "Surgery", amount: 5000, deductedFrom: "Insurance" }],
  2: [{ id: 102, label: "Medication", amount: 300, deductedFrom: "Personal" }],
  3: [
    {
      id: 103,
      label: "Physical Therapy",
      amount: 1000,
      deductedFrom: "Company Fund",
    },
  ],
};

export const useClientStore = create<ClientStore>((set) => ({
  clients: mockClients,
  expenses: mockExpenses,
  fetchClients: () => {},
  fetchExpenses: (clientId) => {},
  addExpense: (clientId, expense) => {
    set((state) => ({
      expenses: {
        ...state.expenses,
        [clientId]: [...(state.expenses[clientId] || []), expense],
      },
    }));
  },
  removeExpense: (clientId, expenseId) => {
    set((state) => ({
      expenses: {
        ...state.expenses,
        [clientId]: state.expenses[clientId].filter(
          (exp) => exp.id !== expenseId
        ),
      },
    }));
  },
  addClient: (client) => {
    set((state) => ({ clients: [...state.clients, client] }));
  },
}));
