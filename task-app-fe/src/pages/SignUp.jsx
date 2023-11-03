import React from 'react'

import Typography from "../components/Typography";

import Textfield from "../components/Textfield";
import Button from "../components/Button";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container, Grid, Box } from "@mui/material";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../services/api';
import { useState } from "react";
const defaultTheme = createTheme();
export default function SignUp() {
  const navigate = useNavigate();
  const [notifcation, setNotification] = useState({
    error: false,
    errorMsg: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({
      error: false,
      errorMsg: "",
    });
    try { 
      const data = new FormData(e.target);
      data.append('name',`${data.get('firstname')} ${data.get('lastName')}`)
      if (data.get('password') === data.get('confirm_password')) { 
        const res = await registerAPI(data);
        if (res.data.success) { 
          navigate('/');
        } else { 
          setNotification({
            error: true,
            errorMsg: res.data.message,
          });
        }
      } else { 
        setNotification({
          error: true,
          errorMsg: 'Password mismatch! Please try again',
        });
      }
    } catch(err) { 
      console.log(err)
    }
  }
  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Textfield
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Textfield
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="family-name"
              />
            </Grid>
            <Grid item xs={12}>
              <Textfield
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            <Grid item xs={12}>
              <Textfield
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <Grid item xs={12}>
              <Textfield
                required
                fullWidth
                name="confirm_password"
                label="Confirm password"
                type="password"
                id="confirm_password"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
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
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
  )
}
