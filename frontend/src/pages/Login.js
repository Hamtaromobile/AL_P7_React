import * as React from "react";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Navigation from "../components/Navigation";
import { useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      light: "#FFB6C1",
      main: "#FFD7D7",
      dark: "#F08080",
      contrastText: "#000",
    },
    secondary: {
      light: "#D3D3D3",
      main: "#778899",
      dark: "#4E5166",
      contrastText: "#fff",
    },
    status: {
      danger: "#FD2D01",
    },
  },
});

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [allowSendEmail, setAllowSendEmail] = useState(false);
  const [allowSendPassword, setAllowSendPassword] = useState(false);
  const [errorAxios, setErrorAxios] = useState(false);
  let [dataErrorAxios, setDataErrorAxios] = useState("");
  const [dataResAxios, setDataResAxios] = useState("");
  const [dataIdUser, setDataIdUser] = useState("");

  //const [loginData, setLoginData] = useState([]);

  const emailOnChange = (e) => {
    setEmail(e.target.value);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value)) {
      setAllowSendEmail(false);
    } else {
      setAllowSendEmail(true);
    }
  };

  const passwordOnChange = (e) => {
    setPassword(e.target.value);
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&,.;:!^¨*])[A-Za-z\d!@#$%^&,.;:!^¨*]{8,30}$/.test(
        e.target.value
      )
    ) {
      setAllowSendPassword(false);
    } else {
      setAllowSendPassword(true);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email);
    if (allowSendEmail && allowSendPassword) {
      alert("axios post");
      const dataLogin = {
        email: email,
        password: password,
      };
      if (dataResAxios.status === 200) {
        (window.location.href = "/Welcome" + "?id=" + dataIdUser).load();
      }
      axios
        .post("http://localhost:3001/api/auth/Login", dataLogin)
        .then((res) => {
          setDataResAxios(res);
          setDataIdUser(res.data.userId);

          console.log("res", res.data.userId);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    /*const data = new FormData(event.currentTarget);*/
  };

  return (
    <ThemeProvider theme={theme}>
      <Navigation />
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
            Login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              value={email}
              onChange={(e) => emailOnChange(e)}
              className="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              color="secondary"
            />

            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => passwordOnChange(e)}
              color="secondary"
            />
            <div>
              {!errorAxios && (
                <Typography color="#FD2D01">
                  {dataErrorAxios.valueOf}
                </Typography>
              )}
            </div>

            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!allowSendPassword || !allowSendEmail ? true : false}
            >
              Login
            </Button>

            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" color="secondary">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/Signup" variant="body2" color="secondary">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
