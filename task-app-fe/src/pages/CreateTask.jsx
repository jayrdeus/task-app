import TextField from "../components/Textfield";
import { Container, Grid, Paper, Box } from "@mui/material";
import Typography from "../components/Typography";
import DatePicker from "../components/Datepicker";
import IconButton from "../components/IconButton";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import Button from "../components/Button";
import { createTask } from "../services/api";
import { useNavigate } from "react-router-dom";
import { useRef,useState } from "react";
import { useAuth } from "../hooks/useAuth";
import formatDate from "../utils/formatDate";
export default function CreateTask() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [files,setFiles] =useState([]);
  const dateRef = useRef();
  const handleBack = () => {
    navigate("/tasks");
  };
  const handleFileChange = (e) => { 
    if (e.target.files) {
        const _files = Array.from(e.target.files);

        const promises = _files.map(file => {
            return (new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.addEventListener('load', (ev) => {
                    resolve(ev.target.result);
                });
                reader.addEventListener('error', reject);
                reader.readAsDataURL(file);
            }))
        });

        Promise.all(promises).then(images => {
            console.log(images);
            setFiles(images);
        }, error => { console.error(error); });
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const input = new FormData(e.target);
      input.append('due_date',formatDate(dateRef.current.value));
      
      files.forEach(image => input.append('images[]',image));
      input.append('status_id',1);
      for (let pair of input.entries()) {
        console.log(pair[0]+ ', ' + pair[1]);
        }
      const res = await createTask(input, user);
      if (res.data.success) {
        navigate("/tasks");
      }
    } catch (err) {
      console.log(err);
      console.log(err.response);
    }
  };
  return (
    <>
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
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="description"
                  name="description"
                  label="Description"
                  fullWidth
                  autoComplete="description"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePicker
                  sx={{ width: "100% " }}
                  label="Due Date"
                  id="dueDate"
                  name="dueDate"
                  inputRef={dateRef}
                  defaultValue={new Date()}
                  minDate={new Date()}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="status"
                  name="status"
                  label="Status"
                  fullWidth
                  autoComplete="Status"
                  defaultValue="Todo"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" component="label" startIcon={<UploadFileIcon/>}>
                  Upload File
                  <input type="file" hidden accept="image/png, image/gif, image/jpeg" multiple onChange={handleFileChange}/>
                </Button>
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
                  <Grid item>
                    <IconButton
                      aria-label="create"
                      color="primary"
                      type="submit"
                    >
                      <SaveIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </>
  );
}
