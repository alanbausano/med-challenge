export interface Client {
  id: number;
  name: string;
  doa: string;
  medicalStatus: string;
  caseStatus: string;
  lawFirm: string;
}

export interface Expense {
  id: number;
  label: string;
  amount: number;
  deductedFrom: string;
}

export interface ClientStore {
  filteredClients: Client[];
  expenses: Record<number, Expense[]>;
  clients: Client[];
  searchQuery: string;
  selectedStatus: string;
  setSearchQuery: (query: string) => void;
  setSelectedStatus: (status: string) => void;
  applyFilters: () => void;
  fetchExpenses: (clientId: number) => void;
  addExpense: (clientId: number, expense: Expense) => void;
  removeExpense: (clientId: number, expenseId: number) => void;
  addClient: (client: Client) => void;
}

export type MedicalStatus = "Active" | "Pending" | "In Progress" | undefined;
