import { create } from "zustand";
import { Client, ClientStore, Expense } from "../types/types";

const mockClients: Client[] = [
  {
    id: 1,
    name: "John Doe",
    doa: "2023-10-10",
    medicalStatus: "In Progress",
    caseStatus: "Open",
    lawFirm: "Law & Associates",
  },
  {
    id: 2,
    name: "Jane Smith",
    doa: "2022-06-15",
    medicalStatus: "Pending",
    caseStatus: "Pending",
    lawFirm: "Legal Experts",
  },
  {
    id: 3,
    name: "Alice Johnson",
    doa: "2024-01-20",
    medicalStatus: "Active",
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

export const useClientStore = create<ClientStore>((set, get) => ({
  expenses: mockExpenses,
  clients: mockClients,
  filteredClients: mockClients,
  searchQuery: "",
  selectedStatus: "",

  setSearchQuery: (query: any) => {
    set({ searchQuery: query });
    get().applyFilters();
  },

  setSelectedStatus: (status) => {
    set({ selectedStatus: status });
    get().applyFilters();
  },

  applyFilters: () => {
    const { clients, searchQuery, selectedStatus } = get();

    const filtered = clients.filter((client) => {
      const matchesSearch = client.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      const matchesStatus =
        !selectedStatus || client.medicalStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });

    set({ filteredClients: filtered });
  },
  fetchExpenses: (_clientId: any) => {},
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
    set((state) => ({ filteredClients: [...state.filteredClients, client] }));
  },
}));
