import { Expense } from "../types/types";

export const mockExpenses: Record<number, Expense[]> = {
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
