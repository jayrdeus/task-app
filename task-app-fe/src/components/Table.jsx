import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import IconButton from "./IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";

import VisibilityIcon from '@mui/icons-material/Visibility';
export default function TableComponent({ tasks,handleDialog,handleEditTask,handleViewTask}) {
  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Due</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks &&
            tasks.data?.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.due_date}</TableCell>
                <TableCell>{task.status.name}</TableCell>
                <TableCell>
                    <IconButton
                    aria-label="view"
                    color="primary"
                    onClick={() => {handleViewTask(task.id)}}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    aria-label="update"
                    color="success"
                    onClick={() => {handleEditTask(task.id)}}
                  >
                    <CreateIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="error"
                    onClick={(e) => {handleDialog(task)}}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      
    </>
  );
}
