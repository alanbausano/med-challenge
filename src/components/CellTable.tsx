import { TableCell } from "@mui/material";

export const CellTable = (props: { title: string }) => {
  return <TableCell sx={{ fontWeight: "bold" }}>{props.title}</TableCell>;
};
