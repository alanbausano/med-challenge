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
  TablePagination,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useClientStore } from "../store/clientStore";
import useDebounce from "../hooks/useDebounce";
import { SearchOutlined } from "@mui/icons-material";
import { CellTable } from "./CellTable";
import StatusFilter from "./StatusFilter";

const Dashboard = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const { filteredClients, setSearchQuery } = useClientStore();
  const [showFilter, setShowFilter] = useState(false);
  const debouncedSearchTerm = useDebounce(search, 300);
  const navigate = useNavigate();

  useEffect(() => {
    setSearchQuery(debouncedSearchTerm);
    setPage(0);
  }, [debouncedSearchTerm, setSearchQuery]);

  const handleRowClick = (id: number) => {
    navigate(`/client/${id}`);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleShowFilter = () => {
    setPage(0);
    setShowFilter(!showFilter);
  };

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
          <Button variant="contained" onClick={() => handleShowFilter()}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredClients
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((client) => (
                <TableRow
                  key={client.id}
                  onClick={() => handleRowClick(client.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{client.name}</TableCell>
                  <TableCell>{client.doa}</TableCell>
                  <TableCell>{client.medicalStatus}</TableCell>
                  <TableCell>{client.caseStatus}</TableCell>
                  <TableCell>{client.lawFirm}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={filteredClients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <StatusFilter open={showFilter} onClose={() => setShowFilter(false)} />
    </Box>
  );
};

export default Dashboard;
