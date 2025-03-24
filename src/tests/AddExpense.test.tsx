import { render, screen, fireEvent } from "@testing-library/react";
import { useClientStore } from "../store/clientStore";
import { vi } from "vitest";
import { AddExpense } from "../components/AddExpense";

// Mock the store
vi.mock("../store/clientStore");

describe("AddExpense", () => {
  const mockSetOpen = vi.fn();
  const mockAddExpense = vi.fn();

  beforeEach(() => {
    // Mock the store's addExpense function
    vi.mocked(useClientStore).mockReturnValue({
      addExpense: mockAddExpense,
    });
  });

  it("renders the dialog when open is true", () => {
    render(<AddExpense open={true} clientId={1} setOpen={mockSetOpen} />);

    // Check if the dialog title is rendered
    expect(screen.getByText("Add New Expense")).toBeInTheDocument();

    // Check if the form inputs are rendered
    expect(screen.getByLabelText("Deduction type")).toBeInTheDocument();
    expect(screen.getByLabelText("Expense Label")).toBeInTheDocument();
    expect(screen.getByLabelText("Amount")).toBeInTheDocument();

    // Check if the buttons are rendered
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add")).toBeInTheDocument();
  });

  it("updates the form inputs correctly", () => {
    render(<AddExpense open={true} clientId={1} setOpen={mockSetOpen} />);

    // Simulate changing the deduction type
    const deductionTypeInput = screen.getByLabelText("Deduction type");
    fireEvent.mouseDown(deductionTypeInput); // Open the dropdown
    const option = screen.getByRole("option", { name: "Deducted" });
    fireEvent.click(option); // Select the option
    expect(deductionTypeInput).toHaveTextContent("Deducted");

    // Simulate changing the expense label
    const labelInput = screen.getByRole("textbox", { name: "Expense Label" });
    fireEvent.change(labelInput, { target: { value: "Test Expense" } });
    expect(labelInput).toHaveValue("Test Expense");

    // Simulate changing the amount
    const amountInput = screen.getByRole("spinbutton", { name: "Amount" });
    fireEvent.change(amountInput, { target: { value: "100" } });
    expect(amountInput).toHaveValue(100);
  });

  it("disables the Add button when required fields are empty", () => {
    render(<AddExpense open={true} clientId={1} setOpen={mockSetOpen} />);

    // Initially, the Add button should be disabled
    const addButton = screen.getByText("Add");
    expect(addButton).toBeDisabled();

    // Fill in the required fields
    fireEvent.change(screen.getByRole("textbox", { name: "Expense Label" }), {
      target: { value: "Test Expense" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "Amount" }), {
      target: { value: "100" },
    });

    // Now, the Add button should be enabled
    expect(addButton).not.toBeDisabled();
  });

  it("calls addExpense and closes the dialog when the form is submitted", () => {
    render(<AddExpense open={true} clientId={1} setOpen={mockSetOpen} />);

    // Fill in the form
    const deductionTypeInput = screen.getByLabelText("Deduction type");
    fireEvent.mouseDown(deductionTypeInput); // Open the dropdown
    const option = screen.getByRole("option", { name: "Deducted" });
    fireEvent.click(option); // Select the option

    fireEvent.change(screen.getByRole("textbox", { name: "Expense Label" }), {
      target: { value: "Test Expense" },
    });
    fireEvent.change(screen.getByRole("spinbutton", { name: "Amount" }), {
      target: { value: "100" },
    });

    // Submit the form
    const addButton = screen.getByText("Add");
    fireEvent.click(addButton);

    // Check if addExpense was called with the correct data
    expect(mockAddExpense).toHaveBeenCalledWith(1, {
      id: expect.any(Number), 
      label: "Test Expense",
      amount: 100,
      deductedFrom: "Deducted",
    });

    // Check if the dialog was closed
    expect(mockSetOpen).toHaveBeenCalledWith(false);
  });
});
