import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useClientStore } from "../store/clientStore";

const StatusFilterModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { setSelectedStatus, selectedStatus } = useClientStore();

  const handleChange = (event: any) => {
    setSelectedStatus(event.target.value);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Medical Status</DialogTitle>
      <DialogContent>
        <FormControl fullWidth variant="outlined" sx={{ minWidth: 200, mt: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select value={selectedStatus} onChange={handleChange} label="Status">
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Active">Active</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
            <MenuItem value="In Progress">In Progress</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusFilterModal;
