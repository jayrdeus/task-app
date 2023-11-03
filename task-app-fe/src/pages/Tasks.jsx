import { useEffect, useState } from "react";
import Table from "../components/Table";
import { getTasks, removeTask, searchTask } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { Container, Grid, Paper, Box } from "@mui/material";
import { debounce } from "lodash";
import IconButton from "../components/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Dialog from "../components/Dialog";
import BackDrop from "../components/Backdrop";
import TextField from "../components/Textfield";
export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState({});
  const [open, setOpen] = useState(false);
  const controller = new AbortController();
  const navigate = useNavigate();
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getTasks(user);
      setTasks(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchTask = debounce(async (val) => {
    try {
      const data = { title: val };
      if (val) { 
        const res = await searchTask(data, user, controller);
        setTasks(res.data.data);
      } else { 
        fetchData();
      }
    } catch (err) {
      console.log(err);
    } finally {
      controller.abort();
    }
  }, 3000);
  useEffect(() => {
    fetchData();
  }, []);
  const handleDialog = (task) => {
    if (task) {
      setTask(task);
    }
    setOpen(!open);
  };
  const handleRemoveTask = async () => {
    try {
      const res = await removeTask(task, user);
      console.log(res);
      if (res.data.success) {
        fetchData();
        setTask(null);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setTask(null);
      setOpen(false);
    }
  };
  const handleSearchChange = (e) => { 
    fetchTask(e.target.value);
  }
  const handleAddTask = () => {
    navigate("/tasks/create");
  };
  const handleEditTask = (id) => {
    navigate(`update/${id}`);
  };
  const handleViewTask = (id) => {
    navigate(`info/${id}`);
  };
  const handleChangePage = () => {};
  return (
    <>
      {loading ? (
        <BackDrop open={loading} />
      ) : (
        <>
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
                  {tasks && (
                    <>
                      <Box
                        component="span"
                        m={1}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <TextField
                          id="searchTitle"
                          name="searchTitle"
                          label="Search via Title"
                          onChange={handleSearchChange}
                        />
                        <IconButton
                          aria-label="create"
                          color="primary"
                          onClick={handleAddTask}
                        >
                          <AddIcon />
                        </IconButton>
                      </Box>
                      <Table
                        tasks={tasks}
                        handleDialog={handleDialog}
                        handleEditTask={handleEditTask}
                        handleViewTask={handleViewTask}
                      />
                    </>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Container>
          <Dialog
            open={open}
            handleDialog={handleDialog}
            handleRemoveTask={handleRemoveTask}
            task={task}
          />
        </>
      )}
    </>
  );
}
