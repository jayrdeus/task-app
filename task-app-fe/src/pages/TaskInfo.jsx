import TextField from "../components/Textfield";
import { Container, Grid, Paper, Box } from "@mui/material";
import Typography from "../components/Typography";
import DatePicker from "../components/Datepicker";
import IconButton from "../components/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from "../components/Select";
import BackDrop from "../components/Backdrop";
import List from "../components/List";
import { getTask, getStatuses, updateTask } from "../services/api";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import formatDate from "../utils/formatDate";
export default function TaskInfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const toUpdate = location.pathname.split("/").includes("update")
  const [isUpdate, setIsUpdate] = useState(!toUpdate);
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { user } = useAuth();
  const [statuses, setStatuses] = useState([]);
  const [images, setImages] = useState([]);
  const [task, setTask] = useState({
    title: "",
    desc: "",
    dueDate: new Date(),
    status: 1,
    id: 0,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        id: task.id,
        title: task.title,
        description: task.desc,
        due_date: formatDate(task.dueDate),
        status_id: task.status,
      };
      const res = await updateTask(data, user);
      if (res.data.success) {
        navigate("/tasks");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleBack = async () => {
    navigate("/tasks");
  };
  const fetchTask = async () => {
    try {
      setLoading(true);
      const { data } = await getTask(id, user);
      const _status = await getStatuses(user);
      console.log(data);
      setStatuses(_status.data.data);
      setTask({
        id: data.data.task.id,
        title: data.data.task.title,
        desc: data.data.task.description,
        dueDate: new Date(data.data.task.due_date),
        status: data.data.task.status_id,
      });
      setImages(data.data.images);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };
  const handleDownloadImage = (index) => {
    const image = images[index];
    const downloadLink = document.createElement("a");
    const fileName = `${task.title}-${index}`;
    downloadLink.href = image;
    downloadLink.download = fileName;
    downloadLink.click();
  };
  useEffect(() => {
    fetchTask();
  }, []);
  return (
    <>
      {loading ? (
        <BackDrop open={loading} />
      ) : (
        <Box
          sx={{
            height: "auto",
            flexGrow: 1,
            overflow: "auto",
          }}
        >
          <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Paper
              variant="outlined"
              sx={{ my: { xs: 3, md: 3 }, p: { xs: 2, md: 3 } }}
            >
              <Typography variant="h6" gutterBottom>
                Task information
              </Typography>
              <Grid
                container
                spacing={3}
                component="form"
                onSubmit={handleSubmit}
              >
                <Grid item xs={12}>
                  <TextField
                    required
                    id="title"
                    name="title"
                    label="Title"
                    fullWidth
                    autoComplete="title"
                    value={task.title}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: isUpdate,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="desc"
                    name="desc"
                    label="Description"
                    fullWidth
                    autoComplete="description"
                    multiline
                    value={task.desc}
                    rows={4}
                    onChange={handleChange}
                    InputProps={{
                      readOnly: isUpdate,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <DatePicker
                    sx={{ width: "100% " }}
                    label="Due Date"
                    id="dueDate"
                    name="dueDate"
                    value={task.dueDate}
                    minDate={new Date()}
                    onChange={(newVal) => setTask({ ...task, dueDate: newVal })}
                    InputProps={{
                      readOnly: isUpdate,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Select
                    statuses={statuses}
                    val={task.status}
                    name="status"
                    id="status"
                    handleChange={handleChange}
                    inputProps={{ readOnly: isUpdate }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <List
                    images={images}
                    handleDownloadImage={handleDownloadImage}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justifyContent="space-between">
                    <Grid item>
                      <IconButton
                        aria-label="Back"
                        color="primary"
                        onClick={handleBack}
                      >
                        <ArrowBackIcon />
                      </IconButton>
                    </Grid>
                    {isUpdate ? (
                      <Grid item>
                        <IconButton
                          aria-label="create"
                          color="primary"
                          type="submit"
                        >
                          <SaveIcon />
                        </IconButton>
                      </Grid>
                    ) : (
                      ""
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Box>
      )}
    </>
  );
}
