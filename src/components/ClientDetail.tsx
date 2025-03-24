import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useClientStore } from "../store/clientStore";
import { Tabs, Tab, Box, Typography, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { AddExpense } from "./AddExpense";

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>();
  const clientId = Number(id);
  const { clients, expenses, fetchExpenses, removeExpenses } = useClientStore();
  const client = clients.find((c) => c.id === clientId);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedExpenses, setSelectedExpenses] = useState<number[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchExpenses(clientId);
  }, [clientId, fetchExpenses]);

  const handleDeleteSelected = (
    clientId: number,
    selectedExpenses: number[]
  ) => {
    removeExpenses(clientId, selectedExpenses);
    setSelectedExpenses([]);
  };

  const columns: GridColDef[] = [
    {
      field: "label",
      renderHeader: () => <strong>Label</strong>,
      width: 500,
      editable: false,
    },
    {
      field: "amount",
      renderHeader: () => <strong>Amount</strong>,
      renderCell: (params) => `$${params.value}`,
      width: 500,
      editable: false,
    },
    {
      field: "deductedFrom",
      renderHeader: () => <strong>Deducted Type</strong>,
      renderCell: (params) => params.value,
      width: 500,
      editable: false,
    },
  ];
  const rows = expenses[clientId];

  return (
    <>
      <Box>
        <Tabs
          value={tabIndex}
          onChange={(_, newIndex) => setTabIndex(newIndex)}
        >
          <Tab label="Client Details" />
          <Tab label="Expenses" />
        </Tabs>
        {tabIndex === 0 && (
          <Box sx={{ padding: 1 }}>
            <Typography variant="body1">
              <strong>Client Name:</strong> {client?.name}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Birth:</strong> {client?.dateOfBirth}
            </Typography>
            <Typography variant="body1">
              <strong>Date of Incident:</strong> {client?.dateOfIncident}
            </Typography>
            <Typography variant="body1">
              <strong>Law Firm:</strong> {client?.lawFirm}
            </Typography>
          </Box>
        )}
        {tabIndex === 1 && (
          <Box>
            <Box
              sx={{ display: "flex", justifyContent: "end", margin: "10px" }}
            >
              <Button sx={{ margin: "5px" }} onClick={() => setOpenModal(true)}>
                Add Expense
              </Button>
              <Button
                sx={{ margin: "5px" }}
                onClick={() => handleDeleteSelected(clientId, selectedExpenses)}
                variant="contained"
                color="error"
                disabled={selectedExpenses.length === 0}
              >
                Delete Selected
              </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
              <DataGrid
                rows={rows}
                columns={columns}
                checkboxSelection
                onRowSelectionModelChange={(ids) =>
                  setSelectedExpenses(ids as number[])
                }
                disableRowSelectionOnClick
                disableColumnSorting
                disableColumnFilter
                disableColumnMenu
                disableColumnSelector
                disableColumnResize
              />
            </Box>
          </Box>
        )}
      </Box>
      {openModal && (
        <AddExpense
          clientId={clientId}
          open={openModal}
          setOpen={setOpenModal}
        />
      )}
    </>
  );
};

export default ClientDetail;
