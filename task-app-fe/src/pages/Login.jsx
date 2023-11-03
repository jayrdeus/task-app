import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "../components/Typography";
import Textfield from "../components/Textfield";
import Button from "../components/Button";
import Link from '@mui/material/Link';
import { Grid } from "@mui/material";
import { loginAPI } from "../services/api";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
const defaultTheme = createTheme();
export default function Login() {
  const { login } = useAuth();
  const [notifcation, setNotification] = useState({
    error: false,
    errorMsg: "",
  });
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    try {
      const user = {
        email: data.get("email"),
        password: data.get("password"),
      };
      const res = await loginAPI(user);
      if (res.data.success) {
        login(res.data.data.token);
      } else {
        console.log(res.data);
        setNotification({
          error: true,
          errorMsg: res.data.message,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
        </Box>
        <Box component="form" onSubmit={handleClick} sx={{ mt: 1 }}>
          <Textfield
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            type="email"
          />
          <Textfield
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item >
              <Link href="/signup" variant="body2">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        {notifcation.error && (
          <Typography
            variant="body2"
            color="error"
            align="center"
            sx={{ mt: 2, mb: 2 }}
          >
            {notifcation.errorMsg}
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
}
