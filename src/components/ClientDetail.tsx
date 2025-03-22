// src/pages/ClientPage.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClientStore } from "../store/clientStore";
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  const { clients, expenses, fetchExpenses, addExpense, removeExpense } =
    useClientStore();
  const client = clients.find((c) => c.id === clientId);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    fetchExpenses(clientId);
  }, [clientId, fetchExpenses]);

  if (!client) return <Typography>Client not found</Typography>;

  return (
    <Box>
      <Typography variant="h4">{client.name}'s Details</Typography>
      <Tabs value={tabIndex} onChange={(_, newIndex) => setTabIndex(newIndex)}>
        <Tab label="Client Details" />
        <Tab label="Expenses" />
      </Tabs>
      {tabIndex === 0 && (
        <Box>
          <Typography>Date of Admission: {client.doa}</Typography>
          <Typography>Medical Status: {client.medicalStatus}</Typography>
          <Typography>Case Status: {client.caseStatus}</Typography>
          <Typography>Law Firm: {client.lawFirm}</Typography>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box>
          <Button
            onClick={() =>
              addExpense(clientId, {
                id: Date.now(),
                label: "New Expense",
                amount: 100,
                deductedFrom: "Funds",
              })
            }
          >
            Add Expense
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Label</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Deducted From</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {expenses[clientId]?.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.label}</TableCell>
                    <TableCell>${expense.amount}</TableCell>
                    <TableCell>{expense.deductedFrom}</TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        onClick={() => removeExpense(clientId, expense.id)}
                      >
                        Remove
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default ClientDetail;
