import {
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  TextField,
  Typography,
  DialogActions,
  Button,
} from "@mui/material";
import { useClientStore } from "../store/clientStore";
import { Dispatch, FC, SetStateAction, useState } from "react";

interface AddExpenseProps {
  open: boolean;
  clientId: number;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const AddExpense: FC<AddExpenseProps> = ({
  open,
  clientId,
  setOpen,
}) => {
  const [newExpense, setNewExpense] = useState<{
    label: string;
    amount: string;
    deductedFrom: string | undefined;
  }>({
    label: "",
    amount: "",
    deductedFrom: "",
  });
  const { addExpense } = useClientStore();
  const handleAddExpense = () => {
    addExpense(clientId, {
      id: Date.now(),
      label: newExpense.label,
      amount: Number(newExpense.amount),
      deductedFrom: newExpense.deductedFrom,
    });
    setOpen(false);
    setNewExpense({ label: "", amount: "", deductedFrom: "" });
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add New Expense</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ marginTop: "10px" }}
          fullWidth
          select
          label="Deduction type"
          value={newExpense.deductedFrom}
          onChange={(e) =>
            setNewExpense({
              ...newExpense,
              deductedFrom: e.target.value,
            })
          }
        >
          <MenuItem value="Deducted">Deducted</MenuItem>
          <MenuItem value="Not Deducted">Not Deducted</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="Expense Label"
          value={newExpense.label}
          onChange={(e) =>
            setNewExpense({ ...newExpense, label: e.target.value })
          }
          margin="normal"
        />
        <TextField
          fullWidth
          label="Amount"
          type="number"
          value={newExpense.amount}
          onChange={(e) =>
            setNewExpense({ ...newExpense, amount: e.target.value })
          }
          slotProps={{
            input: {
              startAdornment: <Typography>$</Typography>,
            },
          }}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleAddExpense}
          disabled={!newExpense.label || !newExpense.amount}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};
