export interface Client {
  id: number;
  name: string;
  doa: string;
  dateOfBirth: string;
  dateOfIncident: string;
  medicalStatus: string;
  caseStatus: string;
  lawFirm: string;
}

export interface Expense {
  id: number;
  label: string;
  amount: number;
  deductedFrom: string | undefined;
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
  removeExpenses: (clientId: number, expenseId: Array<number>) => void;
  addClient: (client: Client) => void;
}

export type MedicalStatus = "Active" | "Pending" | "In Progress" | undefined;
