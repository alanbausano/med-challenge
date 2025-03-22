import React, { useState } from "react";
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
} from "@mui/material";
import { Link } from "react-router-dom";
import { useClientStore } from "../store/clientStore";

const Dashboard = () => {
  const { clients } = useClientStore();
  const [search, setSearch] = useState("");

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Box>
      <TextField
        label="Search"
        variant="outlined"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>DOA</TableCell>
              <TableCell>Medical Status</TableCell>
              <TableCell>Case Status</TableCell>
              <TableCell>Law Firm</TableCell>
              <TableCell>Actions</TableCell>
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
    </Box>
  );
};

export default Dashboard;
