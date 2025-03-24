import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useClientStore } from "../store/clientStore";
import useDebounce from "../hooks/useDebounce";
import { SearchOutlined } from "@mui/icons-material";
import { CellTable } from "./CellTable";
import StatusFilter from "./StatusFilter";

const Dashboard = () => {
  const [search, setSearch] = useState("");
  const { filteredClients, setSearchQuery } = useClientStore();
  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 300);

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
  }, [debouncedSearchTerm, setSearchQuery]);

  return (
    <Box>
      <TableContainer component={Paper}>
        <Box
          sx={{
            display: "flex",
            padding: "15px",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">Clients</Typography>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search clients"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlined />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              borderRadius: "50%",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            padding: "15px",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="contained"
            onClick={() => setShowFilter(!showFilter)}
          >
            Filter Clients
          </Button>
          <Button variant="contained">+ Add Client</Button>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <CellTable title={"Name"} />
              <CellTable title={"DOA"} />
              <CellTable title={"Medical Status"} />
              <CellTable title={"Case Status"} />
              <CellTable title={"Law firm"} />
              <CellTable title={"Actions"} />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients.map((client) => (
              <TableRow key={1}>
                <TableCell>{client.name}</TableCell>
                <TableCell>{client.doa}</TableCell>
                <TableCell>{client.medicalStatus}</TableCell>
                <TableCell>{client.caseStatus}</TableCell>
                <TableCell>{client.lawFirm}</TableCell>
                <TableCell>
                  <Button
                    component={Link}
                    to={`/client/${client.id}`}
                    variant="contained"
                    color="primary"
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StatusFilter open={showFilter} onClose={() => setShowFilter(false)} />
    </Box>
  );
};

export default Dashboard;
