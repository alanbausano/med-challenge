import { create } from "zustand";
import { ClientStore } from "../types/types";
import { mockExpenses } from "../mocks/expensesMock";
import { mockClients } from "../mocks/clientMocks";

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

  removeExpenses: (clientId: number, expenseIds: Array<number>) => {
    set((state) => ({
      expenses: {
        ...state.expenses,
        [clientId]: state.expenses[clientId].filter(
          (exp) => !expenseIds.includes(exp.id)
        ),
      },
    }));
  },
  addClient: (client) => {
    set((state) => ({ filteredClients: [...state.filteredClients, client] }));
  },
}));
