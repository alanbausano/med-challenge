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
  clients: Client[];
  expenses: Record<number, Expense[]>;
  fetchClients: () => void;
  fetchExpenses: (clientId: number) => void;
  addExpense: (clientId: number, expense: Expense) => void;
  removeExpense: (clientId: number, expenseId: number) => void;
  addClient: (client: Client) => void;
}
